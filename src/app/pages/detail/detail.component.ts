import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import type { ResearchItem } from '../../services/research.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="article-detail">
  <ng-container *ngIf="item; else minimal">
    <h1 class="title">{{ item.title }}</h1>
    <p class="byline">{{ item.author?.name }}</p>

    <p class="where" *ngIf="item.published_in?.length">
      <strong>Published in:</strong>
      <span *ngFor="let pub of item.published_in; let last = last">
        {{ pub.name }}{{ !last ? ', ' : '' }}
      </span>
    </p>

    <p class="abstract" *ngIf="item.abstract">{{ item.abstract }}</p>

    <button type="button" class="exit-btn" (click)="openOnPublisher()">
      Open on publisher site
    </button>
  </ng-container>

  <ng-template #minimal>
    <h1>Article {{ articleId }}</h1>
    <p>We couldn’t load extra details for this article in this view.</p>
    <button type="button" class="exit-btn" (click)="openOnPublisher()">
      Open on publisher site
    </button>
  </ng-template>
</div>
`,
  styles: [`
.article-detail { padding: 1rem; }
.title { margin: 0 0 .25rem; }
.byline { opacity: .8; margin: 0 0 1rem; }
.exit-btn { margin-top: 1rem; }
`]
})
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

  openOnPublisher(): void {
    const url = `/${this.articleId}`; // external target format: {domain}/{article-id}
    window.open(url, '_blank', 'noopener');
  }
}
