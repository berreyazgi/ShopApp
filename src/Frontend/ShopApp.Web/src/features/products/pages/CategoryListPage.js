/**
 * CategoryListPage.js — Products Feature Stub
 */
export default function CategoryListPage() {
  const element = document.createElement('div');
  element.className = 'page-placeholder';
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Kategoriler</h1><p style="color:var(--color-secondary);margin-top:.5rem">Kategoriler modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
