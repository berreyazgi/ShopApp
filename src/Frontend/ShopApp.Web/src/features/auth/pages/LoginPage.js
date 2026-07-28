/**
 * LoginPage.js — Auth Feature Stub
 * Implement the login form UI and call authService.login() here.
 */
export default function LoginPage() {
  const element = document.createElement('div');
  element.className = 'page-placeholder';
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Giriş Yap</h1><p style="color:var(--color-secondary);margin-top:.5rem">Auth modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
