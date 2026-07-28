/**
 * ProductListPage.js — Products Feature Stub
 */
export default function ProductListPage() {
  const element = document.createElement('div');
  element.className = 'page-placeholder';
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Ürünler</h1><p style="color:var(--color-secondary);margin-top:.5rem">Ürünler modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
