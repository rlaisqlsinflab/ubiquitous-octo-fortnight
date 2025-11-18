import type { HeadingLevels as Level } from '@inflearn/editor';

export function setHeadingLevels(
  html: string,
  changeLevels: {
    from: Level[];
    to: Level;
  }[]
) {
  const parser = new DOMParser();
  const $root = parser.parseFromString(html, 'text/html');

  changeLevels.forEach(({ from, to }) => {
    const targetHeadings = from.map((level) => `h${level}`);
    const headings = $root.querySelectorAll(targetHeadings.join(','));

    headings.forEach(($heading) => {
      if (!isHTMLHeadingElement($heading)) {
        return;
      }

      const $changedHeading = changeHeadingLevel($heading, to);

      if ($heading.parentNode instanceof Element) {
        $heading.parentNode.replaceChild($changedHeading, $heading);
      }
    });
  });

  return $root.body.innerHTML;
}

function changeHeadingLevel($target: HTMLHeadingElement, level: Level) {
  const $resultHeading = document.createElement(`h${level}`);
  $resultHeading.innerHTML = $target.innerHTML;

  const attributes = Array.from($target.attributes);

  attributes.forEach((attribute) => {
    $resultHeading.setAttribute(attribute.name, attribute.value);
  });

  return $resultHeading;
}

function isHTMLHeadingElement(element: Element): element is HTMLHeadingElement {
  return element.tagName.startsWith('H');
}
