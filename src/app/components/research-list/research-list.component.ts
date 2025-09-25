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
    <div class="section-title">
      <h2>Published in RC Journals</h2>
    </div>

    <div class="research-list">
      <div *ngFor="let item of itemsRC" class="research-item" (click)="openInNewTab(item['default-page'])">
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
      <div *ngFor="let item of itemsFFARD" class="research-item" (click)="openInNewTab(item['default-page'])">
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
  ffardID: number = 11; // TODO: Change this to actual ID of FFARD journal, now Academy Vienna

  constructor(private researchService: ResearchService) {}

  ngOnInit() {
    this.researchService.getAllResearchItems().subscribe({
      next: (items: ResearchItem[]) => {
        // SPLIT THE ITEMS BASED ON WHERE IT HAS BEEN PUBLISHED
        this.itemsFFARD = items.filter(item =>
          item.published_in?.some(pub => pub.id === 11)
        );
        this.itemsRC = items.filter(item =>
          !item.published_in?.some(pub => pub.id === 11)
        );
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
