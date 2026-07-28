/**
 * dom.js
 * Lightweight DOM utility functions.
 * Keeps direct DOM manipulation out of components where possible.
 */

/**
 * Shorthand for document.querySelector with optional scope.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element|null}
 */
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

/**
 * Shorthand for document.querySelectorAll, returns an Array.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element[]}
 */
export function qsAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/**
 * Creates a DOM element with optional attributes and children.
 *
 * @param {string} tag
 * @param {{ [key: string]: string }} [attrs]
 * @param {(string | Node)[]} [children]
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'innerHTML') {
      el.innerHTML = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}

/**
 * Clears all child nodes from an element.
 * @param {HTMLElement} el
 */
export function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * Adds an image-load error class for graceful fallback.
 * @param {HTMLImageElement} img
 */
export function handleImageError(img) {
  img.addEventListener('error', () => {
    img.classList.add('img-error');
    img.setAttribute('alt', img.getAttribute('alt') || '');
  });
}

/**
 * Returns true if the element is currently visible in the viewport.
 * @param {Element} el
 * @returns {boolean}
 */
export function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top    >= 0 &&
    rect.left   >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right  <= (window.innerWidth  || document.documentElement.clientWidth)
  );
}
