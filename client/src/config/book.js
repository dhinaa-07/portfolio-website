export const BOOK_TITLE = 'AntiGravity';

export const pages = [
  { path: '/', name: 'Cover', chapter: 'Preface', label: 'Cover' },
  { path: '/about', name: 'About', chapter: 'I', label: 'The Author' },
  { path: '/journey', name: 'Journey', chapter: 'II', label: 'Experience' },
  { path: '/works', name: 'Works', chapter: 'III', label: 'Portfolio' },
  { path: '/craft', name: 'Craft', chapter: 'IV', label: 'Skills' },
  { path: '/contact', name: 'Contact', chapter: 'V', label: 'Correspondence' },
];

export const pathOrder = Object.fromEntries(pages.map((p, i) => [p.path, i]));

export const totalPages = pages.length;

export function getPageIndex(pathname) {
  if (pathname.startsWith('/works/')) return pathOrder['/works'];
  return pathOrder[pathname] ?? 0;
}

export function getPageMeta(pathname) {
  if (pathname.startsWith('/works/')) {
    return { ...pages[pathOrder['/works']], isCaseStudy: true };
  }
  return pages.find((p) => p.path === pathname) ?? pages[0];
}

export function getAdjacentPages(pathname) {
  const index = getPageIndex(pathname);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;
  return { prev, next, index, pageNumber: index + 1 };
}
