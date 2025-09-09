import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private apiUrl = `https://www.researchcatalogue.net/portal/search-result`;

  constructor(private http: HttpClient) { }

  getResearchItems(): Observable<ResearchItem[]> {
    console.log('Fetching research items...');
    const params = {
      //resulttype: 'research',
      format: 'json',
      limit: '30',
      //portal: '13', // for now 13=Sonic Studies, later 2535275=FFA BUT
      page: '0'
    };

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<ResearchItem[]>(this.apiUrl, { 
      params,
      headers
    }).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
} 