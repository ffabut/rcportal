import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { ResearchService, ResearchItem } from '../../services/research.service';
import { TruncateSentencesPipe } from './truncate-sentences.pipe';
import { environment } from '../../../environments/environment';
//import { TruncatePipe } from './truncate.pipe';


@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule, TruncateSentencesPipe, RouterModule],
  template: `
<div class="app-research-list">
  <div class="keywords">
    <span *ngFor="let entry of keywordEntries"
          [ngStyle]="{ 'font-size.px': entry.size }"
          class="keyword">
      {{ entry.key }}
    </span>
  </div>

  <div class="rc-expositions">
    <div class="section-title">
      <h2>Published in RC Journals</h2>
    </div>

    <div class="research-list">
      <div *ngFor="let item of itemsRC" class="research-item" (click)="goToArticleDetail(item)">
        <img *ngIf="item.thumb" [src]="item.thumb" [alt]="item.title" class="thumbnail">
        <div class="details">
          <h3>
            <span class="author">{{ item.author.name }}</span> <br/>
            <span class="article-title">{{ item.title }}</span>
          </h3>
          <p class="where" *ngIf="item.published_in?.length">
            <span *ngFor="let pub of item.published_in; let last = last">
              {{ pub.name }}{{ !last ? ', ' : '' }}
            </span>
          </p>
          <p class="abstract">
            {{ item.abstract | truncateSentences:500:' […]' }}
          </p>
        </div>
      </div>
    </div>
  
  </div>


  <div class="ffa-expositions">
    <div class="section-title">
      <h2>FFA Research in Art and Design</h2>
      <div class="subtitle">ISSN: 1234-5678</div>
    </div>

    <div class="research-list">
      <div *ngFor="let item of itemsFFARD" class="research-item" (click)="goToArticleDetail(item)">
        <img *ngIf="item.thumb" [src]="item.thumb" [alt]="item.title" class="thumbnail">
        <div class="details">
          <h3>
            <span class="author">{{ item.author.name }}</span> <br/>
            <span class="article-title">{{ item.title }}</span>
          </h3>
          
          <p class="where" *ngIf="item.published_in?.length">
            <span *ngFor="let pub of item.published_in; let last = last">
              {{ pub.name }}{{ !last ? ', ' : '' }}
            </span>
          </p>

          <p class="abstract">
            {{ item.abstract | truncateSentences:500:' […]' }}
          </p>
        </div>
      </div>
    </div>

  </div>

  <div class="projects-current">
    <h2>Projects Current</h2>
  </div>
  
  <div class="projects-previous">
    <h2>Projects Previous</h2>
  </div>

</div>
`
})

export class ResearchListComponent implements OnInit {
  itemsRC: ResearchItem[] = [];
  itemsFFARD: ResearchItem[] = [];
  keywordEntries: { key: string; count: number; size: number }[] = [];
  constructor(
    private researchService: ResearchService,
    private router: Router          
  ){}

  ngOnInit() {
    this.researchService.getAllResearchItems().subscribe({
      next: (items: ResearchItem[]) => {
        // SPLIT THE ITEMS BASED ON WHERE IT HAS BEEN PUBLISHED
        this.itemsFFARD = items.filter(item =>
          item.published_in?.some(pub => pub.id === environment.ffaradID)
        );
        this.itemsRC = items.filter(item =>
          !item.published_in?.some(pub => pub.id === environment.ffaradID)
        );

        // COUNT KEYWORDS
        const counts = items.reduce((acc, i) => {
          i.keywords?.forEach(k => acc[k] = (acc[k] || 0) + 1);
          return acc;
        }, {} as Record<string, number>);

        const entries = Object.entries(counts).map(([key, count]) => ({ key, count }));
        const countsArr = entries.map(e => e.count);
        if (countsArr.length === 0) {
          this.keywordEntries = [];
          return;
        }

        const min = Math.min(...countsArr);
        const max = Math.max(...countsArr);
        this.keywordEntries = entries.map(e => ({
          ...e,
          size: this.scale(e.count, min, max, 16, 28),
        }));
      },
      error: (error) => {
        console.error('Error fetching research items:', error);
      }
    });
  }

  openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener');
  }

  goToArticleDetail(article: ResearchItem): void {
    this.router.navigate(['/id', article.id], { state: { item: article } }); // internal nav, no full reload
  }

  private scale(value: number, min: number, max: number, outMin: number, outMax: number): number {
    if (max === min) return (outMin + outMax) / 2; // all counts equal
    return outMin + ((value - min) * (outMax - outMin)) / (max - min);
  }
}
