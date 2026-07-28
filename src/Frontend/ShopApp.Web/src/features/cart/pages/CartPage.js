/**
 * CartPage.js — Cart Feature Stub
 */
export default function CartPage() {
  const element = document.createElement('div');
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Sepetim</h1><p style="color:var(--color-secondary);margin-top:.5rem">Sepet modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
