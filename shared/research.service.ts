import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { expand, filter, reduce, catchError, tap } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  private apiUrl = `${environment.apiBaseUrl}/portal/search-result`;

  constructor(private http: HttpClient) { }

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
  getAllResearchItems(limit = 30, maxPages = 10): Observable<ResearchItem[]> {
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
}
