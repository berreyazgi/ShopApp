/** ProfilePage.js — Profile Feature Stub */
export default function ProfilePage() {
  const element = document.createElement('div');
  element.innerHTML = `<div class="container" style="padding-top:4rem;text-align:center"><h1>Profilim</h1><p style="color:var(--color-secondary);margin-top:.5rem">Profil modülü geliştirme aşamasında.</p></div>`;
  return { element, destroy: () => {} };
}
