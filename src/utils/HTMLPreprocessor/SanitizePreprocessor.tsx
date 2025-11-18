/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Preprocessor from './Preprocessor';
import { sanitize } from '../sanitize/sanitize';

export class SanitizePreprocessor extends Preprocessor {
  exec($element: HTMLElement) {
    const html = $element.innerHTML;
    const sanitizedHTML = sanitize(html);

    $element.innerHTML = sanitizedHTML;

    return $element;
  }

  protected preprocessCallback(): void {
    //
  }
}
