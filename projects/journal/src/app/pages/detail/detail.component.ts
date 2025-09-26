import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import type { ResearchItem } from '../../../../../../shared/research.service';
import { FooterComponent } from '../../components/footer/footer.component'

@Component({
  standalone: true,
  imports: [CommonModule, FooterComponent],
  styleUrl: './detail.component.scss',
  template: `
<header class="detail">
  <div>Exposition</div>
  <a href="">Back to previous page</a>
</header>
<div class="article-detail">
  <ng-container *ngIf="item; else minimal">
    <div class="left">
      <img *ngIf="item.thumb" [src]="item.thumb" [alt]="item.title" class="thumbnail">
      <button type="button" class="exit-btn" (click)="openOnPublisher(item['default-page'])">
        OPEN EXPOSITION
      </button>
    </div>
    <div class="right">
      <h1>{{ item.title }}</h1>
      <div class="author">{{ item.author.name }}</div>
      <div class="date" *ngIf="item.created?.length">Published: {{item.created}}</div>
      <p class="abstract" *ngIf="item.abstract">{{ item.abstract }}</p>

      <p class="tags" *ngIf="item.keywords?.length">
        {{ item.keywords!.join(', ') }}
      </p>

      <div class="published_at">
        <div class="journal">FFA Research in Art and Design</div>
        <div class="issn">ISSN: 1234-5678</div>
      </div>

      <div class="doi">
        DOI: <a href="{{item.doi.url}}">{{item.doi.url}}</a>
      </div>
      <div class="cite">
        Cite:
        <span class="citation">as this</span>
      </div>
    </div>
  </ng-container>

  <ng-template #minimal>
    <h1>Article {{ articleId }}</h1>
    <p>We couldn’t load extra details for this article in this view.</p>
  </ng-template>
</div>

<app-footer></app-footer>
`})

export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articleId!: string;
  item: ResearchItem | undefined;

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('articleId') ?? '';

    // Prefer item passed via navigation state (no extra HTTP call needed)
    // Works when navigating from the list; on hard reload it may be undefined.
    const stateItem = (this.router.getCurrentNavigation()?.extras.state as any)?.item
                   ?? (history.state as any)?.item;
    if (stateItem) this.item = stateItem as ResearchItem;
  }

  openOnPublisher(url: string): void {
    window.open(url, '_blank', 'noopener');
  }
}
