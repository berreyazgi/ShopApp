/**
 * ProductDetailPage.js — Product Detail Page
 *
 * Loads a real product (Urun) plus its UrunTur variants and each variant's
 * UrunOzellik properties from the backend, lets the customer pick a value
 * for every property (Beden, Renk, or any arbitrary property name — nothing
 * is hardcoded), resolves that selection to exactly one UrunTur, and adds it
 * to the authenticated customer's active Sepet.
 *
 * Property values and available combinations come entirely from the
 * UrunTur/UrunOzellik data the backend returns — no combination is ever
 * invented client-side, and no urunTurId is ever generated on the frontend.
 *
 * Exported as default so the router can import it dynamically.
 */

import { getProductById, getRelatedProducts } from '../services/productsService.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';
import { createAlert } from '../../../shared/components/Alert/Alert.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { isAuthenticated } from '../../auth/state/authStore.js';
import { navigate } from '../../../app/router.js';
import { getOrCreateActiveCart, addCartItem } from '../../cart/services/cartService.js';

// ─── Variant resolution helpers (pure — no DOM) ─────────────────────────────

/**
 * Derives the ordered list of property groups (e.g. Beden, Renk, ...) and
 * every distinct value seen across all variants, from the variants
 * themselves — nothing is hardcoded.
 * @param {Array} variants
 * @returns {{ name: string, values: string[] }[]}
 */
function buildPropertyGroups(variants) {
  const order = [];
  const valuesByName = new Map();

  variants.forEach((variant) => {
    variant.properties.forEach((prop) => {
      if (!valuesByName.has(prop.name)) {
        valuesByName.set(prop.name, new Set());
        order.push(prop.name);
      }
      valuesByName.get(prop.name).add(prop.value);
    });
  });

  return order.map((name) => ({ name, values: Array.from(valuesByName.get(name)) }));
}

function variantMatchesSelection(variant, selected, requiredNames) {
  return requiredNames.every((name) =>
    variant.properties.some((p) => p.name === name && p.value === selected[name]));
}

/** Returns the single UrunTur matching the full selection, or null if incomplete/no match. */
function resolveVariant(variants, selected, requiredNames) {
  if (requiredNames.some((name) => !selected[name])) return null;
  return variants.find((v) => variantMatchesSelection(v, selected, requiredNames)) ?? null;
}

/** Whether `candidateValue` for `groupName` is still reachable given the rest of the current selection. */
function isValueReachable(variants, selected, groupName, candidateValue, requiredNames) {
  const trial = { ...selected, [groupName]: candidateValue };
  return variants.some((v) => variantMatchesSelection(v, trial, requiredNames));
}

// ─── DOM helpers ─────────────────────────────────────────────────────────

function createImage(imageUrl, alt) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

function createGalleryPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.width = '100%';
  placeholder.style.height = '100%';
  placeholder.style.color = 'var(--color-tertiary)';
  placeholder.appendChild(createIcon('image', { size: 48 }));
  return placeholder;
}

function createBreadcrumbs(productName) {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'product-breadcrumbs';
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');

  const container = document.createElement('div');
  container.className = 'container';

  const list = document.createElement('ol');
  list.className = 'product-breadcrumbs__list';
  list.innerHTML = `
    <li><a href="/" class="product-breadcrumbs__link">ShopApp</a></li>
    <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
    <li><a href="/kategoriler" class="product-breadcrumbs__link">Kategoriler</a></li>
    <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
    <li><a href="/urunler" class="product-breadcrumbs__link">Ürünler</a></li>
    <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
  `;

  const currentSep = document.createElement('li');
  currentSep.className = 'product-breadcrumbs__current';
  currentSep.setAttribute('aria-current', 'page');
  currentSep.textContent = productName;
  list.appendChild(currentSep);

  container.appendChild(list);
  breadcrumbs.appendChild(container);
  return breadcrumbs;
}

/**
 * Renders the full product detail UI for a supplied product object.
 * @param {any} product
 * @param {any[]} relatedProducts
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
function renderProductDetail(product, relatedProducts) {
  const element = document.createElement('div');
  const cleanupFns = [];

  const variants = product.variants ?? [];
  const propertyGroups = buildPropertyGroups(variants);
  const requiredNames = propertyGroups.map((g) => g.name);

  /** @type {Record<string, string>} */
  const selected = {};
  // If there's exactly one variant, its properties are the only possible
  // selection — pre-fill it so the customer doesn't have to click through
  // a single-option selector.
  if (variants.length === 1) {
    variants[0].properties.forEach((p) => { selected[p.name] = p.value; });
  }

  let quantity = 1;
  let addToCartPending = false;

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

  const images = product.images ?? [];
  if (images.length > 0) {
    mainImage.appendChild(createImage(images[0], product.name));
  } else {
    mainImage.appendChild(createGalleryPlaceholder());
  }

  const thumbRow = document.createElement('div');
  thumbRow.className = 'pdp-gallery__thumbs';

  if (images.length > 1) {
    images.forEach((imageUrl, i) => {
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
  }

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

  if (product.brand || product.categoryName) {
    const subtitle = document.createElement('p');
    subtitle.className = 'pdp-info__subtitle';
    subtitle.textContent = [product.brand, product.categoryName].filter(Boolean).join(' · ');
    info.appendChild(subtitle);
  }

  const price = document.createElement('div');
  price.className = 'pdp-info__price';
  info.appendChild(price);

  const stockNotice = document.createElement('p');
  stockNotice.className = 'pdp-info__subtitle';
  info.appendChild(stockNotice);

  // Options — one <select> per property group, built entirely from the
  // OzellikAd/OzellikDeger values the backend returned.
  const options = document.createElement('div');
  options.className = 'pdp-options';

  const groupSelects = new Map();

  propertyGroups.forEach((group) => {
    const groupWrap = document.createElement('div');
    const label = document.createElement('label');
    label.className = 'pdp-option__label';
    label.setAttribute('for', `pdp-option-${group.name}`);
    label.textContent = group.name;
    groupWrap.appendChild(label);

    const select = document.createElement('select');
    select.className = 'pdp-option__select';
    select.id = `pdp-option-${group.name}`;

    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = 'Seçiniz';
    select.appendChild(placeholderOpt);

    group.values.forEach((value) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });

    if (selected[group.name]) select.value = selected[group.name];

    const onChange = () => {
      if (select.value) selected[group.name] = select.value;
      else delete selected[group.name];
      refreshAvailability();
      updatePriceAndStock();
    };
    select.addEventListener('change', onChange);
    cleanupFns.push(() => select.removeEventListener('change', onChange));

    groupWrap.appendChild(select);
    options.appendChild(groupWrap);
    groupSelects.set(group.name, select);
  });

  /** Disables option values that can no longer resolve to any variant given the rest of the current selection. */
  function refreshAvailability() {
    propertyGroups.forEach((group) => {
      const select = groupSelects.get(group.name);
      Array.from(select.options).forEach((opt) => {
        if (!opt.value) return; // placeholder always enabled
        opt.disabled = !isValueReachable(variants, selected, group.name, opt.value, requiredNames);
      });
    });
  }

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

  const qtyValue = document.createElement('span');
  qtyValue.className = 'pdp-qty__value';
  qtyValue.textContent = '1';

  const plusBtn = document.createElement('button');
  plusBtn.type = 'button';
  plusBtn.className = 'pdp-qty__btn';
  plusBtn.textContent = '+';
  plusBtn.setAttribute('aria-label', 'Adet artır');

  let maxQuantity = 1;

  function setQuantity(next) {
    quantity = Math.max(1, Math.min(next, maxQuantity));
    qtyValue.textContent = String(quantity);
    minusBtn.disabled = quantity <= 1;
    plusBtn.disabled = quantity >= maxQuantity;
  }

  const onMinus = () => setQuantity(quantity - 1);
  const onPlus = () => setQuantity(quantity + 1);
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

  // Feedback area (incomplete selection / out of stock / success / error)
  const feedbackContainer = document.createElement('div');
  info.appendChild(feedbackContainer);

  function showFeedback(type, message) {
    feedbackContainer.innerHTML = '';
    if (!message) return;
    const alert = createAlert({ type, message, dismissible: true });
    feedbackContainer.appendChild(alert.element);
  }

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

  /** Resolves the current variant, updates price/stock messaging and gates quantity/add-to-cart. */
  function updatePriceAndStock() {
    if (variants.length === 0) {
      price.textContent = formatPrice(product.price);
      stockNotice.textContent = 'Bu ürün şu anda satışa sunulmamış.';
      maxQuantity = 1;
      setQuantity(1);
      addToCartBtn.disabled = true;
      buyNowBtn.disabled = true;
      return;
    }

    const variant = resolveVariant(variants, selected, requiredNames);

    if (!variant) {
      price.textContent = formatPrice(product.price);
      stockNotice.textContent = requiredNames.length > 0
        ? 'Lütfen ürün seçeneklerini tamamlayın.'
        : 'Bu ürün için uygun bir seçenek bulunamadı.';
      maxQuantity = 1;
      setQuantity(1);
      addToCartBtn.disabled = true;
      buyNowBtn.disabled = true;
      return;
    }

    price.textContent = formatPrice(product.price + variant.priceDelta);

    const purchasable = variant.isActive && variant.stock > 0;
    if (!variant.isActive) {
      stockNotice.textContent = 'Bu ürün varyantı artık satışta değil.';
    } else if (variant.stock <= 0) {
      stockNotice.textContent = 'Tükendi.';
    } else if (variant.stock <= 5) {
      stockNotice.textContent = `Son ${variant.stock} adet.`;
    } else {
      stockNotice.textContent = '';
    }

    maxQuantity = purchasable ? variant.stock : 1;
    setQuantity(Math.min(quantity, maxQuantity));
    addToCartBtn.disabled = !purchasable;
    buyNowBtn.disabled = !purchasable;
  }

  function setAddToCartLoading(isLoading) {
    addToCartPending = isLoading;
    addToCartBtn.textContent = isLoading ? 'Ekleniyor...' : 'Sepete Ekle';
    updatePriceAndStock();
    if (isLoading) {
      addToCartBtn.disabled = true;
      buyNowBtn.disabled = true;
    }
  }

  async function handleAddToCart({ goToCartAfter = false } = {}) {
    if (addToCartPending) return;
    showFeedback(null, null);

    if (!isAuthenticated()) {
      navigate('/giris?returnTo=' + encodeURIComponent(window.location.pathname));
      return;
    }

    const variant = resolveVariant(variants, selected, requiredNames);
    if (!variant) {
      showFeedback('warning', 'Lütfen ürün seçeneklerini tamamlayın.');
      return;
    }
    if (!variant.isActive || variant.stock <= 0) {
      showFeedback('warning', 'Seçtiğiniz varyant şu anda mevcut değil.');
      return;
    }

    setAddToCartLoading(true);
    try {
      const cart = await getOrCreateActiveCart();
      await addCartItem(cart.id, { urunTurId: variant.id, urunMiktar: quantity });

      if (goToCartAfter) {
        navigate('/sepet');
        return;
      }

      feedbackContainer.innerHTML = '';
      const successAlert = createAlert({ type: 'success', message: 'Sepete eklendi.', dismissible: true });
      const goToCartLink = document.createElement('a');
      goToCartLink.href = '/sepet';
      goToCartLink.className = 'auth-link';
      goToCartLink.style.marginLeft = 'var(--space-2)';
      goToCartLink.textContent = 'Sepete Git';
      successAlert.element.querySelector('.alert__message')?.appendChild(goToCartLink);
      feedbackContainer.appendChild(successAlert.element);
    } catch (error) {
      showFeedback('error', error?.message || 'Sepete ürün eklenemedi.');
    } finally {
      setAddToCartLoading(false);
    }
  }

  const onAddToCart = () => handleAddToCart({ goToCartAfter: false });
  const onBuyNow = () => handleAddToCart({ goToCartAfter: true });
  addToCartBtn.addEventListener('click', onAddToCart);
  buyNowBtn.addEventListener('click', onBuyNow);
  cleanupFns.push(() => {
    addToCartBtn.removeEventListener('click', onAddToCart);
    buyNowBtn.removeEventListener('click', onBuyNow);
  });

  main.appendChild(info);
  container.appendChild(main);

  // ── Lower Content Area
  const lower = document.createElement('div');
  lower.className = 'pdp-lower';

  // Related Products — only rendered when the backend actually returns some.
  if (relatedProducts.length > 0) {
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
      rpVariant.textContent = rp.variant ?? '';

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
  }

  // Product Description
  const descSection = document.createElement('section');
  const descCard = document.createElement('div');
  descCard.className = 'pdp-desc-card';

  const descTitle = document.createElement('h2');
  descTitle.className = 'pdp-desc__title';
  descTitle.textContent = 'Ürün Açıklaması';

  const descText = document.createElement('p');
  descText.className = 'pdp-desc__text';
  descText.textContent = product.description || 'Bu ürün için açıklama bulunmuyor.';

  descCard.appendChild(descTitle);
  descCard.appendChild(descText);
  descSection.appendChild(descCard);
  lower.appendChild(descSection);

  container.appendChild(lower);
  element.appendChild(container);

  // Initial state
  refreshAvailability();
  updatePriceAndStock();

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
