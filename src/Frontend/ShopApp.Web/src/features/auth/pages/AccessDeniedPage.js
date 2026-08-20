export default function AccessDeniedPage() {
  const element = document.createElement('section');
  element.className = 'not-found-page';
  element.innerHTML = '<p class="not-found-code">403</p><h2>Bu sayfaya erişim yetkiniz yok</h2><p>Oturumunuz açık, ancak bu işlem için gerekli role sahip değilsiniz.</p><a class="auth-link" href="/">Ana sayfaya dön</a>';
  return { element, destroy() {} };
}
