import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ResearchItem {
  id: number;
  type: string;
  title: string;
  thumb: string;
  default_page: string;
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

  getResearchItems(): Observable<ResearchItem[]> {
    console.log('Fetching research items...');
    const params = {
      resulttype: 'research',
      format: 'json',
      limit: '2500',
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