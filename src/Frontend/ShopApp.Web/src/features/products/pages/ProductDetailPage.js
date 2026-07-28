/**
 * ProductDetailPage.js — Products Feature Stub
 */
export default function ProductDetailPage({ params }) {
  const element = document.createElement('div');
  element.className = 'page-placeholder';
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Ürün Detayı</h1><p style="color:var(--color-secondary);margin-top:.5rem">Ürün ID: ${params?.productId ?? '-'}</p></div>`;
  return { element, destroy: () => {} };
}
