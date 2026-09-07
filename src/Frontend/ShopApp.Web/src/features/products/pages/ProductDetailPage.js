/**
 * ProductDetailPage.js — Product Detail Page
 * Shows image gallery, product info, options, related products, and description.
 *
 * Renders whatever product object productsService supplies for the current
 * :productId route param — the page owns no permanent product catalogue.
 *
 * JS Functionality:
 *  - Thumbnail click → updates main image
 *  - Quantity +/- buttons
 *  - Color swatch selection
 *
 * Exported as default so the router can import it dynamically.
 */

import { getProductById, getRelatedProducts } from '../services/productsService.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';

// ─── Helpers ───────────────────────────────────────────────────────────────

function createImage(imageUrl, alt) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

function createBreadcrumbs(productName) {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'product-breadcrumbs';
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
  breadcrumbs.innerHTML = `
    <div class="container">
      <ol class="product-breadcrumbs__list">
        <li><a href="/" class="product-breadcrumbs__link">ShopApp</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li><a href="/kategoriler" class="product-breadcrumbs__link">Kategoriler</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li><a href="/urunler" class="product-breadcrumbs__link">Ürünler</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li class="product-breadcrumbs__current" aria-current="page">${productName}</li>
      </ol>
    </div>
  `;
  return breadcrumbs;
}

/**
 * Renders the full product detail UI for a supplied product object.
 * @param {import('../data/productData.js').ProductDetail} product
 * @param {import('../data/productData.js').RelatedProduct[]} relatedProducts
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
function renderProductDetail(product, relatedProducts) {
  const element = document.createElement('div');

  let quantity = 1;
  const cleanupFns = [];

  element.appendChild(createBreadcrumbs(product.name));

  // ── Main Product Area (two-column)
  const container = document.createElement('div');
  container.className = 'container';

  const main = document.createElement('section');
  main.className = 'pdp-main';

  // ── Left: Gallery
  const gallery = document.createElement('div');
  gallery.className = 'pdp-gallery';

  const mainImage = document.createElement('div');
  mainImage.className = 'pdp-gallery__main';
  mainImage.appendChild(createImage(product.imageUrls[0], product.name));

  const thumbRow = document.createElement('div');
  thumbRow.className = 'pdp-gallery__thumbs';

  product.imageUrls.forEach((imageUrl, i) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'pdp-gallery__thumb' + (i === 0 ? ' pdp-gallery__thumb--active' : '');
    thumb.setAttribute('aria-label', `Görsel ${i + 1}`);
    thumb.appendChild(createImage(imageUrl, `${product.name} görsel ${i + 1}`));

    const onClick = () => {
      mainImage.innerHTML = '';
      mainImage.appendChild(createImage(imageUrl, product.name));
      thumbRow.querySelectorAll('.pdp-gallery__thumb').forEach((t, j) => {
        t.classList.toggle('pdp-gallery__thumb--active', j === i);
      });
    };

    thumb.addEventListener('click', onClick);
    cleanupFns.push(() => thumb.removeEventListener('click', onClick));
    thumbRow.appendChild(thumb);
  });

  gallery.appendChild(mainImage);
  gallery.appendChild(thumbRow);
  main.appendChild(gallery);

  // ── Right: Product Info
  const info = document.createElement('div');
  info.className = 'pdp-info';

  const title = document.createElement('h1');
  title.className = 'pdp-info__title';
  title.textContent = product.name;
  info.appendChild(title);

  const modelText = document.createElement('p');
  modelText.className = 'pdp-info__subtitle';
  modelText.textContent = `Model: ${product.model}`;
  info.appendChild(modelText);

  const sizeText = document.createElement('p');
  sizeText.className = 'pdp-info__subtitle';
  sizeText.textContent = `Beden: ${product.defaultSize}`;
  info.appendChild(sizeText);

  const price = document.createElement('div');
  price.className = 'pdp-info__price';
  price.textContent = formatPrice(product.price);
  info.appendChild(price);

  // Options
  const options = document.createElement('div');
  options.className = 'pdp-options';

  const sizeGroup = document.createElement('div');
  const sizeLabel = document.createElement('label');
  sizeLabel.className = 'pdp-option__label';
  sizeLabel.setAttribute('for', 'pdp-size-select');
  sizeLabel.textContent = 'Beden Seçin';

  const sizeSelect = document.createElement('select');
  sizeSelect.className = 'pdp-option__select';
  sizeSelect.id = 'pdp-size-select';
  product.sizes.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    if (s === product.defaultSize) opt.selected = true;
    sizeSelect.appendChild(opt);
  });
  sizeGroup.appendChild(sizeLabel);
  sizeGroup.appendChild(sizeSelect);
  options.appendChild(sizeGroup);

  // Color Swatches
  const colorGroup = document.createElement('div');
  const colorLabel = document.createElement('span');
  colorLabel.className = 'pdp-option__label';
  colorLabel.textContent = 'Renk:';
  colorGroup.appendChild(colorLabel);

  const colorRow = document.createElement('div');
  colorRow.className = 'pdp-colors';

  product.colors.forEach((c, i) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'pdp-color-swatch' + (i === 0 ? ' pdp-color-swatch--active' : '');
    swatch.setAttribute('aria-label', c.name);
    swatch.title = c.name;

    const inner = document.createElement('span');
    inner.className = 'pdp-color-swatch__inner';

    if (c.secondary) {
      const half1 = document.createElement('span');
      half1.className = 'pdp-color-swatch__half';
      half1.style.backgroundColor = c.bg;
      const half2 = document.createElement('span');
      half2.className = 'pdp-color-swatch__half';
      half2.style.backgroundColor = c.secondary;
      inner.appendChild(half1);
      inner.appendChild(half2);
    } else {
      inner.style.backgroundColor = c.bg;
    }

    swatch.appendChild(inner);

    const onClick = () => {
      colorRow.querySelectorAll('.pdp-color-swatch').forEach((s, j) => {
        s.classList.toggle('pdp-color-swatch--active', j === i);
      });
    };
    swatch.addEventListener('click', onClick);
    cleanupFns.push(() => swatch.removeEventListener('click', onClick));
    colorRow.appendChild(swatch);
  });

  colorGroup.appendChild(colorRow);
  options.appendChild(colorGroup);

  // Quantity Selector
  const qtyGroup = document.createElement('div');
  const qtyLabel = document.createElement('span');
  qtyLabel.className = 'pdp-option__label';
  qtyLabel.textContent = 'Adet';
  qtyGroup.appendChild(qtyLabel);

  const qtyWrap = document.createElement('div');
  qtyWrap.className = 'pdp-qty';

  const minusBtn = document.createElement('button');
  minusBtn.type = 'button';
  minusBtn.className = 'pdp-qty__btn';
  minusBtn.textContent = '−';
  minusBtn.setAttribute('aria-label', 'Adet azalt');
  minusBtn.disabled = true;

  const qtyValue = document.createElement('span');
  qtyValue.className = 'pdp-qty__value';
  qtyValue.textContent = '1';

  const plusBtn = document.createElement('button');
  plusBtn.type = 'button';
  plusBtn.className = 'pdp-qty__btn';
  plusBtn.textContent = '+';
  plusBtn.setAttribute('aria-label', 'Adet artır');

  const onMinus = () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
      minusBtn.disabled = quantity <= 1;
    }
  };
  const onPlus = () => {
    if (quantity < 99) {
      quantity++;
      qtyValue.textContent = quantity;
      minusBtn.disabled = quantity <= 1;
    }
  };

  minusBtn.addEventListener('click', onMinus);
  plusBtn.addEventListener('click', onPlus);
  cleanupFns.push(() => {
    minusBtn.removeEventListener('click', onMinus);
    plusBtn.removeEventListener('click', onPlus);
  });

  qtyWrap.appendChild(minusBtn);
  qtyWrap.appendChild(qtyValue);
  qtyWrap.appendChild(plusBtn);
  qtyGroup.appendChild(qtyWrap);
  options.appendChild(qtyGroup);

  info.appendChild(options);

  // Action Buttons
  const actions = document.createElement('div');
  actions.className = 'pdp-actions';

  const addToCartBtn = document.createElement('button');
  addToCartBtn.type = 'button';
  addToCartBtn.className = 'pdp-action-btn pdp-action-btn--primary';
  addToCartBtn.textContent = 'Sepete Ekle';

  const buyNowBtn = document.createElement('button');
  buyNowBtn.type = 'button';
  buyNowBtn.className = 'pdp-action-btn pdp-action-btn--secondary';
  buyNowBtn.textContent = 'Hemen Al';

  actions.appendChild(addToCartBtn);
  actions.appendChild(buyNowBtn);
  info.appendChild(actions);

  main.appendChild(info);
  container.appendChild(main);

  // ── Lower Content Area
  const lower = document.createElement('div');
  lower.className = 'pdp-lower';

  // Related Products
  const relatedSection = document.createElement('section');
  const relatedTitle = document.createElement('h2');
  relatedTitle.className = 'pdp-related__title';
  relatedTitle.textContent = 'Benzer Ürünler';
  relatedSection.appendChild(relatedTitle);

  const relatedGrid = document.createElement('div');
  relatedGrid.className = 'pdp-related__grid';

  relatedProducts.forEach((rp) => {
    const card = document.createElement('div');
    card.className = 'pdp-related-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'pdp-related-card__image';
    imgWrap.appendChild(createImage(rp.imageUrl, rp.name));

    const rpInfo = document.createElement('div');
    rpInfo.className = 'pdp-related-card__info';

    const rpName = document.createElement('span');
    rpName.className = 'pdp-related-card__name';
    rpName.textContent = rp.name;

    const rpVariant = document.createElement('span');
    rpVariant.className = 'pdp-related-card__variant';
    rpVariant.textContent = rp.variant;

    const rpPrice = document.createElement('span');
    rpPrice.className = 'pdp-related-card__price';
    rpPrice.textContent = formatPrice(rp.price);

    rpInfo.appendChild(rpName);
    rpInfo.appendChild(rpVariant);
    rpInfo.appendChild(rpPrice);
    card.appendChild(imgWrap);
    card.appendChild(rpInfo);
    relatedGrid.appendChild(card);
  });

  relatedSection.appendChild(relatedGrid);
  lower.appendChild(relatedSection);

  // Product Description
  const descSection = document.createElement('section');
  const descCard = document.createElement('div');
  descCard.className = 'pdp-desc-card';

  const descTitle = document.createElement('h2');
  descTitle.className = 'pdp-desc__title';
  descTitle.textContent = 'Ürün Açıklaması';

  const descText = document.createElement('p');
  descText.className = 'pdp-desc__text';
  descText.textContent = product.description;

  const specsTitle = document.createElement('h3');
  specsTitle.className = 'pdp-desc__specs-title';
  specsTitle.textContent = 'Teknik Özellikler:';

  const specsList = document.createElement('ul');
  specsList.className = 'pdp-desc__specs';
  product.specs.forEach((spec) => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsList.appendChild(li);
  });

  descCard.appendChild(descTitle);
  descCard.appendChild(descText);
  descCard.appendChild(specsTitle);
  descCard.appendChild(specsList);
  descSection.appendChild(descCard);
  lower.appendChild(descSection);

  container.appendChild(lower);
  element.appendChild(container);

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  return { element, destroy };
}

// ─── Page Component ───────────────────────────────────────────────────────

/**
 * @param {{ params: { productId?: string } }} options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function ProductDetailPage({ params } = {}) {
  const element = document.createElement('div');
  element.className = 'product-detail-page';

  let currentDestroy = null;
  const contentArea = document.createElement('div');
  contentArea.appendChild(createLoadingState({ message: 'Ürün yükleniyor...' }));
  element.appendChild(contentArea);

  async function load() {
    try {
      const [product, relatedProducts] = await Promise.all([
        getProductById(params?.productId),
        getRelatedProducts(),
      ]);

      contentArea.innerHTML = '';

      if (!product) {
        contentArea.appendChild(createEmptyState({
          icon: 'search',
          title: 'Ürün Bulunamadı',
          description: 'Bu ürün mevcut değil veya kaldırılmış olabilir.',
          actionLabel: 'Ürünlere Dön',
          onAction: () => { window.location.href = '/urunler'; },
        }));
        return;
      }

      const detail = renderProductDetail(product, relatedProducts);
      currentDestroy = detail.destroy;
      contentArea.appendChild(detail.element);
    } catch (error) {
      contentArea.innerHTML = '';
      contentArea.appendChild(createErrorState({
        title: 'Ürün yüklenemedi',
        message: error?.message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        onRetry: load,
      }));
      console.error('[ProductDetailPage] load failed:', error);
    }
  }

  load();

  function destroy() {
    currentDestroy?.();
    currentDestroy = null;
  }

  return { element, destroy };
}
