/**
 * AboutPage.js — Hakkımızda Page Component
 *
 * Static frontend presentation page showcasing the boutique's story,
 * mission, store location with an embedded Google Maps iframe, boutique feature cards,
 * and service advantages.
 *
 * Exported as default so the router can import it dynamically.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AboutPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'about-page';
  const destroyFns = [];

  function render() {
    // ── 1. Hero Section ─────────────────────────────────────────────────────
    const heroSection = document.createElement('section');
    heroSection.className = 'about-hero';
    heroSection.setAttribute('aria-label', 'Hakkımızda Giriş');
    heroSection.innerHTML = `
      <div class="container">
        <div class="about-hero__card">
          <div class="about-hero__bg" aria-hidden="true"></div>
          <div class="about-hero__overlay" aria-hidden="true"></div>
          <div class="about-hero__content">
            <span class="about-hero__badge">Butik Moda & Tasarım</span>
            <h1 class="about-hero__title">Hakkımızda</h1>
            <p class="about-hero__desc">
              Modayı daha fazla insana ulaştırmak için buradayız.
              Özel tasarımlı butik ürünleri, modern bir alışveriş deneyimiyle
              sizinle buluşturuyoruz.
            </p>
            <div class="about-hero__actions">
              <a href="/urunler" class="btn btn--primary btn--lg about-hero__cta">
                <span>Alışverişe Başla</span>
                <span class="about-hero__cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    element.appendChild(heroSection);

    // ── 2. Boutique Story Section ───────────────────────────────────────────
    const storySection = document.createElement('section');
    storySection.className = 'about-story';
    storySection.setAttribute('aria-label', 'Butiğimizin Hikâyesi');
    storySection.innerHTML = `
      <div class="container">
        <div class="about-story__grid">
          <div class="about-story__content">
            <span class="about-section-label">Özgün & Seçkin</span>
            <h2 class="about-section-title">Butiğimizin Hikâyesi</h2>
            <div class="about-story__text">
              <p>
                ShopApp, butik modaya ve özgün tasarımlara duyduğumuz tutkuyla kuruldu.
                Tek tipleşen giyim dünyasında fark yaratmak; kaliteli kumaşları, zarif
                kesimleri ve çağdaş çizgileri bir araya getirerek müşterilerimize
                kendilerini özel hissettirecek koleksiyonlar sunmak en büyük hedefimiz oldu.
              </p>
              <p>
                Ankara'daki butik mağazamızda yakaladığımız samimi müşteri bağı ve özenli
                hizmet anlayışını, dijital dünyanın hızı ve erişilebilirliğiyle harmanladık.
                Her bir ürünümüz, tasarım aşamasından dolabınıza ulaşana kadar titiz bir
                kalite kontrol sürecinden geçer.
              </p>
              <p>
                Bugün, yerel bir butik enerjisini ve samimiyetini koruyarak Türkiye'nin dört
                bir yanındaki moda tutkunlarına ilham vermeye ve gardıroplara değer katmaya
                devam ediyoruz.
              </p>
            </div>
          </div>
          <div class="about-story__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="ShopApp Butik Mağaza İç Mekanı ve Koleksiyonlar"
              class="about-story__img"
              loading="lazy"
            >
            <div class="about-story__image-badge">
              <span class="about-story__badge-number">100%</span>
              <span class="about-story__badge-label">Özel Butik Tasarımlar</span>
            </div>
          </div>
        </div>
      </div>
    `;
    element.appendChild(storySection);

    // ── 3. Mission & Location Cards Row ─────────────────────────────────────
    const cardsSection = document.createElement('section');
    cardsSection.className = 'about-cards-section';
    cardsSection.setAttribute('aria-label', 'Misyon ve Konum');

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'container';

    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'about-cards__grid';

    // Misyonumuz Card
    const missionCard = document.createElement('div');
    missionCard.className = 'about-card about-card--mission';
    missionCard.innerHTML = `
      <div class="about-card__header">
        <div class="about-card__icon-wrap about-card__icon-wrap--accent" id="mission-icon-slot"></div>
        <div>
          <span class="about-card__tag">Değerlerimiz</span>
          <h2 class="about-card__title">Misyonumuz</h2>
        </div>
      </div>
      <div class="about-card__body">
        <p class="about-card__desc">
          Yalnızca butik mağazamıza özel, özenle seçilmiş moda ürünlerini;
          farklı şehirlerdeki müşterilerle, kolay ve modern bir alışveriş
          deneyimiyle buluşturmak.
        </p>
        <ul class="about-mission-list" role="list">
          <li class="about-mission-item">
            <span class="about-mission-item__bullet" aria-hidden="true">✓</span>
            <span>Özgün ve sınırlı sayıda üretilen butik parçalar</span>
          </li>
          <li class="about-mission-item">
            <span class="about-mission-item__bullet" aria-hidden="true">✓</span>
            <span>Şeffaf ve güvenilir müşteri odaklı hizmet</span>
          </li>
          <li class="about-mission-item">
            <span class="about-mission-item__bullet" aria-hidden="true">✓</span>
            <span>Hızlı teslimat ve kesintisiz alışveriş konforu</span>
          </li>
        </ul>
      </div>
    `;
    const missionIcon = missionCard.querySelector('#mission-icon-slot');
    if (missionIcon) missionIcon.appendChild(createIcon('star', { size: 24 }));
    cardsGrid.appendChild(missionCard);

    // Konumumuz Card
    const locationCard = document.createElement('div');
    locationCard.className = 'about-card about-card--location';
    locationCard.innerHTML = `
      <div class="about-card__header">
        <div class="about-card__icon-wrap about-card__icon-wrap--secondary" id="location-icon-slot"></div>
        <div>
          <span class="about-card__tag">Bizi Ziyaret Edin</span>
          <h2 class="about-card__title">Konumumuz</h2>
        </div>
      </div>
      <div class="about-card__body">
        <div class="about-location-meta">
          <span class="about-location-meta__pin" aria-hidden="true">📍</span>
          <span class="about-location-meta__text">Konum: <strong>Ankara, Türkiye</strong></span>
        </div>
        <div class="about-map-container">
          <iframe
            src="https://maps.google.com/maps?q=Ankara%2C+T%C3%BCrkiye&t=&z=13&ie=UTF8&iwloc=&output=embed"
            class="about-map-iframe"
            title="ShopApp mağaza konumu - Ankara, Türkiye"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
    const locationIcon = locationCard.querySelector('#location-icon-slot');
    if (locationIcon) locationIcon.appendChild(createIcon('tag', { size: 24 }));
    cardsGrid.appendChild(locationCard);

    cardsContainer.appendChild(cardsGrid);
    cardsSection.appendChild(cardsContainer);
    element.appendChild(cardsSection);

    // ── 4. Boutique Feature Cards ───────────────────────────────────────────
    const featuresSection = document.createElement('section');
    featuresSection.className = 'about-features-section';
    featuresSection.setAttribute('aria-label', 'Butik Özelliklerimiz');

    const featuresContainer = document.createElement('div');
    featuresContainer.className = 'container';

    const featuresHeader = document.createElement('div');
    featuresHeader.className = 'about-features-header';
    featuresHeader.innerHTML = `
      <span class="about-section-label">Ayrıcalıklar</span>
      <h2 class="about-section-title">ShopApp Deneyimi</h2>
    `;
    featuresContainer.appendChild(featuresHeader);

    const featuresGrid = document.createElement('div');
    featuresGrid.className = 'about-features__grid';

    const featureCards = [
      {
        icon: 'star',
        iconColor: '#0071e3',
        bgColor: 'rgb(0 113 227 / 8%)',
        title: 'Özel Butik Ürünleri',
        desc: 'Yalnızca mağazamıza özel, sınırlı sayıda ve özgün parçalar.',
      },
      {
        icon: 'truck',
        iconColor: '#34c759',
        bgColor: 'rgb(52 199 89 / 10%)',
        title: 'Türkiye Geneline Erişim',
        desc: "Ankara'daki butik deneyimini artık tüm Türkiye'ye taşıyoruz.",
      },
      {
        icon: 'shield',
        iconColor: '#ff9f0a',
        bgColor: 'rgb(255 159 10 / 10%)',
        title: 'Modern Alışveriş Deneyimi',
        desc: 'Kolay, güvenli ve keyifli bir alışveriş deneyimi sunuyoruz.',
      },
    ];

    featureCards.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'about-feature-card';

      const iconBox = document.createElement('div');
      iconBox.className = 'about-feature-card__icon';
      iconBox.style.color = item.iconColor;
      iconBox.style.backgroundColor = item.bgColor;
      iconBox.appendChild(createIcon(item.icon, { size: 28 }));

      const titleEl = document.createElement('h3');
      titleEl.className = 'about-feature-card__title';
      titleEl.textContent = item.title;

      const descEl = document.createElement('p');
      descEl.className = 'about-feature-card__desc';
      descEl.textContent = item.desc;

      card.appendChild(iconBox);
      card.appendChild(titleEl);
      card.appendChild(descEl);
      featuresGrid.appendChild(card);
    });

    featuresContainer.appendChild(featuresGrid);
    featuresSection.appendChild(featuresContainer);
    element.appendChild(featuresSection);

  }

  function destroy() {
    element.innerHTML = '';
  }

  render();

  return { element, destroy };
}
