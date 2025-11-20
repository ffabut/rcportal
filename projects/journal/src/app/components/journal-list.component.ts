import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { ResearchService, ResearchItem } from '../../../../../shared/research.service';
import { TruncateSentencesPipe } from '../../../../../shared/truncate-sentences.pipe';
import { environment } from '../../../../../shared/environments/environment';

@Component({
  selector: 'app-journal-list',
  standalone: true,
  imports: [CommonModule, TruncateSentencesPipe, RouterModule],
  template: `
<div class="app-journal-list">
  <div class="keywords">
    <span *ngFor="let entry of keywordEntries"
          [ngStyle]="{ 'font-size.px': entry.size }"
          class="keyword">
      {{ entry.key }}
    </span>
  </div>

  <div class="research-expositions">
    <div class="section-title">
      <h2>Research Expositions</h2>
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

  <div class="research-reports">
    <h2>Research Reports</h2>
  </div>

</div>
`
})

export class JournalListComponent implements OnInit {
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
