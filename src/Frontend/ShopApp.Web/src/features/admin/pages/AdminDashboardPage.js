/** AdminDashboardPage.js — Admin Feature Stub */
export default function AdminDashboardPage() {
  const element = document.createElement('div');
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Yönetim Paneli</h1><p style="color:var(--color-secondary);margin-top:.5rem">Admin modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
