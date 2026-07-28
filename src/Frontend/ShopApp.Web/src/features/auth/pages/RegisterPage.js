/**
 * RegisterPage.js — Auth Feature Stub
 * Implement the registration form UI and call authService.register() here.
 */
export default function RegisterPage() {
  const element = document.createElement('div');
  element.className = 'page-placeholder';
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Kayıt Ol</h1><p style="color:var(--color-secondary);margin-top:.5rem">Auth modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
