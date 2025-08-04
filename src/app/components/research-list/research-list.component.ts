import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchService, ResearchItem } from '../../services/research.service';

@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="research-list">
      <div *ngFor="let item of researchItems" class="research-item">
        
          <img *ngIf="item.thumb" [src]="item.thumb" [alt]="item.title" class="thumbnail">
          <h2>{{ item.title }}</h2>
          <p class="author">By {{ item.author.name }}</p>
          <p class="publication" *ngIf="item.published_in?.length">
            in:
            <span *ngFor="let pub of item.published_in; let last = last">
              {{ pub.name }}{{ !last ? ', ' : '' }}
            </span>
          </p>
          <p class="abstract">{{ item.abstract }}</p>
          <div class="keywords" *ngIf="item.keywords.length">
            Keywords:
            <span *ngFor="let keyword of item.keywords" class="keyword">
              {{ keyword }}
            </span>
          </div>
          <a [href]="item['default-page']" target="_blank" class="read-more">Read more</a>

      </div>
    </div>
  `})
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
} 