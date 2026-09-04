import { workTitleVtName } from "../../lib/workTitle";

export { workTitleVtName };

/**
 * Card → work detail. Native View Transitions are not used: wrapping
 * `router.push` in `document.startViewTransition` times out on heavy work
 * pages, and skipping the transition throws AbortError into the Next overlay.
 */
export function navigateWithViewTransition(
  router: { push: (href: string) => void },
  href: string,
  _reduce: boolean
) {
  router.push(href);
}
