import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, forkJoin } from 'rxjs';
import { expand, filter, reduce, catchError, tap, shareReplay } from 'rxjs/operators';
import { environment } from './environments/environment';

export interface ResearchItem {
  id: number;
  type: string;
  title: string;
  thumb: string;
  'default-page': string;
  keywords: string[];
  created: string;
  last_modified: number;
  status: string;
  doi: {
    id: string;
    url: string;
  };
  published: string;
  published_in: Array<{
    id: number;
    name: string;
    name_short: string;
  }>;
  license: string;
  author: {
    id: number;
    name: string;
    orcid: string | null;
  };
  abstract: string;
}

export interface RCmapResearchResponse {
  hyperlinks: string[]; // We do not care much
  ids: number; 
  meta: ResearchItem;
  pages: any; // We do not care much
  text: any; // We do not care much
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  private apiUrl = `${environment.apiBaseUrl}/portal/search-result`;

  // CACHE
  private allItems$?: Observable<ResearchItem[]>;
  private cacheKey?: string;
  private cacheExpiresAt = 0;
  private rcItems$?: Observable<RCmapResearchResponse[]>;
  private rcCacheExpiresAt = 0;
  private readonly TTL_MS = 5 * 60_000; // cache for 5 minutes (tune as needed)
  // end CACHE

  constructor(private http: HttpClient) { }

  /** Fetch a single research item by ID */
  private fetchItemById(id: number): Observable<RCmapResearchResponse> {
    const url = `${environment.singleExpoUrl}/rcjson/expo/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.get<RCmapResearchResponse>(url, { headers }).pipe(
      catchError(err => {
        console.error(`Failed to load research item with id ${id}:`, err);
        return EMPTY;
      })
    );
  }

  /** Fetch a single page */
  private fetchPage(page: number, limit = 30): Observable<ResearchItem[]> {
    console.log("Fetching page", page)
    const params = {
      resulttype: 'research',
      format: 'json',
      limit: String(limit),
      portal: `${environment.ffaradID}`,
      page: String(page),
    };

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<ResearchItem[]>(this.apiUrl, { params, headers });
  }

  /** Fetch ALL pages by walking until the API stops returning items */
  loadAll(limit = 30, maxPages = 10): Observable<ResearchItem[]> {
    return this.fetchPage(0, limit).pipe(
      // keep fetching while previous page looked "full"
      expand((items, pageIndex) => {
        const nextPage = pageIndex + 1;
        return items.length === limit && nextPage < maxPages
          ? this.fetchPage(nextPage, limit)
          : EMPTY; // stop
      }),
      // drop any empty terminal emission (when total is an exact multiple of limit)
      filter(items => items.length > 0),
      // flatten into one array
      reduce((all, items) => all.concat(items), [] as ResearchItem[]),
      tap(response => console.log('API Response:', response)),
      catchError(err => {
        console.error('Failed to load research items:', err);
        throw err;
      })
    );
  }


  /** Public API with cache */
  getAllResearchItems(limit = 30, maxPages = 10): Observable<ResearchItem[]> {
    const key = `${limit}|${maxPages}|${environment.ffaradID}`;
    const now = Date.now();

    // Serve from cache if present and fresh
    if (this.allItems$ && this.cacheKey === key && now < this.cacheExpiresAt) {
      return this.allItems$;
    }

    // (Re)build cache
    this.cacheKey = key;
    this.cacheExpiresAt = now + this.TTL_MS;
    this.allItems$ = this.loadAll(limit, maxPages).pipe(
      // cache and replay to future subscribers, even when there are no subscribers
      shareReplay({ bufferSize: 1, refCount: false })
    );

    return this.allItems$;
  }

  /** Fetch research items by specific IDs */
  getResearchItemsByIds(ids: number[]): Observable<RCmapResearchResponse[]> {
    const now = Date.now();

    // Serve from cache if present and fresh
    if (this.rcItems$ && now < this.rcCacheExpiresAt) {
      return this.rcItems$;
    }

    // (Re)build cache by fetching all items in parallel and combining
    this.rcCacheExpiresAt = now + this.TTL_MS;
    this.rcItems$ = forkJoin(
      ids.map(id => this.fetchItemById(id))
    ).pipe(
      filter(items => items.length > 0),
      tap(response => console.log('RC Items Response:', response)),
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError(err => {
        console.error('Failed to load RC research items:', err);
        return EMPTY;
      })
    );

    return this.rcItems$;
  }

  /** Manual invalidation of the cache (call after a mutation, filter change, etc.) */
  invalidateAll(): void {
    this.allItems$ = undefined;
    this.cacheKey = undefined;
    this.cacheExpiresAt = 0;
  }

  /** Manual invalidation of RC items cache */
  invalidateRCItems(): void {
    this.rcItems$ = undefined;
    this.rcCacheExpiresAt = 0;
  }
}
