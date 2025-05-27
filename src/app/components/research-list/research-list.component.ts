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
        <div class="research-item-content">
          <h2>{{ item.title }}</h2>
          <p class="author">By {{ item.author.name }}</p>
          <p class="abstract">{{ item.abstract }}</p>
          <div class="keywords" *ngIf="item.keywords.length">
            <span *ngFor="let keyword of item.keywords" class="keyword">
              {{ keyword }}
            </span>
          </div>
          <a [href]="item.default_page" target="_blank" class="read-more">Read more</a>
        </div>
        <img *ngIf="item.thumb" [src]="item.thumb" [alt]="item.title" class="thumbnail">
      </div>
    </div>
  `,
  styles: [`
    .research-list {
      display: grid;
      gap: 2rem;
      padding: 2rem;
    }

    .research-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      padding: 1.5rem;
      border: 1px solid #eee;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .research-item-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .author {
      color: #666;
      font-style: italic;
    }

    .abstract {
      color: #444;
      line-height: 1.6;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .keyword {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      color: #666;
    }

    .read-more {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .read-more:hover {
      background: #0056b3;
    }

    .thumbnail {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .research-item {
        grid-template-columns: 1fr;
      }

      .thumbnail {
        width: 100%;
        height: 200px;
      }
    }
  `]
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
} 