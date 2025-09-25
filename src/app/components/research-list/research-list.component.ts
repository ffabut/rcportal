import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchService, ResearchItem } from '../../services/research.service';
//import { TruncatePipe } from './truncate.pipe';
import { TruncateSentencesPipe } from './truncate-sentences.pipe';

@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule, TruncateSentencesPipe],
  template: `
<div class="app-research-list">
  <div class="rc-expositions">
    <h2>Published in RC Journals</h2>

  </div>

  <div class="ffa-expositions">
    <div class="section-title">
      <h2>FFA Research in Art and Design</h2>
      <div class="subtitle">ISSN: 1234-5678</div>
    </div>

    <div class="research-list">
      <div *ngFor="let item of researchItems" class="research-item" (click)="openInNewTab(item['default-page'])">
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

        <!-- Probably unused
        <div class="bottom">
          <div class="keywords" *ngIf="item.keywords.length">
            <span *ngFor="let keyword of item.keywords" class="keyword">
              {{ keyword }}
            </span>
          </div>
          <a [href]="item['default-page']" target="_blank" class="read-more">Read more</a>
        </div>
        -->
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
  researchItems: ResearchItem[] = [];

  constructor(private researchService: ResearchService) {}

  ngOnInit() {
    this.researchService.getResearchItems().subscribe({
      next: (items) => {
        this.researchItems = items;
      },
      error: (error) => {
        console.error('Error fetching research items:', error);
      }
    });
  }

  openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener');
  }
} 