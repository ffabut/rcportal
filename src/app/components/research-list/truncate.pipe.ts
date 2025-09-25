import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true, // Angular 15+ standalone pipe
  pure: true
})
export class TruncatePipe implements PipeTransform {
  /**
   * Truncate a string to `limit` characters in a word-safe way.
   *
   * @param value  The input string
   * @param limit  Max characters before truncation (default 100)
   * @param suffix Suffix to append when truncated (default "…")
   * @param wordSafe If true, cut at the last whitespace before limit (default true)
   */
  transform(
    value: string | null | undefined,
    limit: number = 100,
    suffix: string = '…',
    wordSafe: boolean = true
  ): string {
    const text = (value ?? '').toString();

    if (limit <= 0 || text.length <= limit) {
      // No truncation needed
      return text;
    }

    // Take a hard slice first
    let slice = text.slice(0, limit);

    if (wordSafe) {
      // Try to backtrack to the last whitespace so we don’t cut a word
      const lastWs = slice.search(/\s(?!.*\s)/) >= 0
        ? slice.lastIndexOf(' ')
        : -1;

      if (lastWs > 0) {
        slice = slice.slice(0, lastWs);
      }
    }

    // Trim any trailing whitespace/punctuation before adding the suffix
    slice = slice.replace(/[\s.,;:!?-]*$/, '');

    return slice.length < text.length ? slice + suffix : slice;
  }
}
