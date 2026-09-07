/**
 * AdminPagination.js — Dynamic Reusable Pagination
 *
 * Renders page controls and record summary.
 * Updates dynamically when supplied pagination data changes.
 */

/**
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   totalItems: number,
 *   pageSize?: number,
 *   onPageChange: (page: number) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) {
  const container = document.createElement('div');
  container.className = 'admin-pagination';

  // Summary Text
  const summary = document.createElement('div');
  summary.className = 'admin-pagination__summary';

  if (totalItems === 0) {
    summary.textContent = 'Kayıt bulunamadı';
  } else {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    summary.textContent = `Toplam ${totalItems} kayıttan ${start} - ${end} gösteriliyor`;
  }
  container.appendChild(summary);

  // Page Buttons
  const pagesWrap = document.createElement('div');
  pagesWrap.className = 'admin-pagination__pages';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'admin-pagination__btn';
  prevBtn.textContent = '‹ Önceki';
  prevBtn.disabled = currentPage <= 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1 && typeof onPageChange === 'function') onPageChange(currentPage - 1);
  });
  pagesWrap.appendChild(prevBtn);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.type = 'button';
    pageBtn.className = `admin-pagination__btn${i === currentPage ? ' admin-pagination__btn--active' : ''}`;
    pageBtn.textContent = String(i);
    const pageNum = i;
    pageBtn.addEventListener('click', () => {
      if (pageNum !== currentPage && typeof onPageChange === 'function') onPageChange(pageNum);
    });
    pagesWrap.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'admin-pagination__btn';
  nextBtn.textContent = 'Sonraki ›';
  nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages && typeof onPageChange === 'function') onPageChange(currentPage + 1);
  });
  pagesWrap.appendChild(nextBtn);

  container.appendChild(pagesWrap);
  return container;
}
