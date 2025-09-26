import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateSentences',
  standalone: true,
  pure: true
})
export class TruncateSentencesPipe implements PipeTransform {
  /**
   * Truncate a string at the last full sentence before `limit`.
   *
   * @param value   The input string
   * @param limit   Max characters before truncation (default 200)
   * @param suffix  Suffix to append when truncated (default "…")
   */
  transform(
    value: string | null | undefined,
    limit: number = 200,
    suffix: string = '…'
  ): string {
    const text = (value ?? '').toString();

    if (limit <= 0 || text.length <= limit) {
      return text;
    }

    // Hard slice
    let slice = text.slice(0, limit);

    // Look for the last sentence-ending punctuation in the slice
    const lastPunct = Math.max(
      slice.lastIndexOf('.'),
      slice.lastIndexOf('!'),
      slice.lastIndexOf('?')
    );

    if (lastPunct !== -1) {
      // Cut at the punctuation
      slice = slice.slice(0, lastPunct + 1);
    } else {
      // If no sentence ending found, fall back to word boundary
      const lastSpace = slice.lastIndexOf(' ');
      if (lastSpace > 0) {
        slice = slice.slice(0, lastSpace);
      }
    }

    // Clean up trailing whitespace
    slice = slice.trim();

    return slice.length < text.length ? slice + suffix : slice;
  }
}
