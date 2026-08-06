/**
 * PasswordField.js
 * Password input with visibility toggle.
 *
 * Composes createFormField internally and adds a keyboard-accessible
 * show/hide button. Does NOT use inline onclick.
 *
 * Usage:
 *   import { createPasswordField } from './PasswordField.js';
 *   const field = createPasswordField({ id: 'login-password', label: 'Şifre' });
 *   form.appendChild(field.element);
 *   field.setError('Şifre zorunludur.');
 *   field.clearError();
 *   const value = field.getValue();
 *   field.destroy();
 */

import { createFormField } from './FormField.js';

// ─── SVG icons (inline — no external dependency) ───────────────────────────

const SVG_EYE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  width="18" height="18" aria-hidden="true">
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696
    10.75 10.75 0 0 1-19.876 0"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`;

const SVG_EYE_OFF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  width="18" height="18" aria-hidden="true">
  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696
    4.153 4.153 0 0 1-.904 1.652M14.522 14.522A3 3 0 0 1 9 12a3.17 3.17 0 0
    1 .5-1.647M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65
    m0 0a3 3 0 0 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
</svg>`;

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{
 *   id:           string,
 *   name:         string,
 *   label:        string,
 *   placeholder?: string,
 *   autocomplete?:string,
 *   required?:    boolean,
 *   helperText?:  string,
 *   onInput?:     (value: string, event: Event) => void,
 *   onBlur?:      (value: string, event: Event) => void,
 * }} options
 * @returns {{
 *   element:    HTMLDivElement,
 *   input:      HTMLInputElement,
 *   setError:   (message: string) => void,
 *   clearError: () => void,
 *   getValue:   () => string,
 *   destroy:    () => void,
 * }}
 */
export function createPasswordField(options = {}) {
  const {
    id,
    name,
    label,
    placeholder  = '',
    autocomplete = 'current-password',
    required     = true,
    helperText,
    onInput,
    onBlur,
  } = options;

  // Build the base field
  const field = createFormField({
    id,
    name,
    type:        'password',
    label,
    placeholder,
    autocomplete,
    required,
    helperText,
    onInput,
    onBlur,
  });

  // Wrap the input in a relative-positioned container for the toggle button
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'password-field__input-wrapper';

  // Move input into wrapper
  field.input.parentNode.insertBefore(inputWrapper, field.input);
  inputWrapper.appendChild(field.input);

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'password-field__toggle';
  toggleBtn.setAttribute('aria-label', 'Şifreyi göster');
  toggleBtn.innerHTML = SVG_EYE;

  let isVisible = false;
  const cleanupFns = [];

  const handleToggle = () => {
    isVisible = !isVisible;
    field.input.type = isVisible ? 'text' : 'password';
    toggleBtn.innerHTML = isVisible ? SVG_EYE_OFF : SVG_EYE;
    toggleBtn.setAttribute('aria-label', isVisible ? 'Şifreyi gizle' : 'Şifreyi göster');
  };

  toggleBtn.addEventListener('click', handleToggle);
  cleanupFns.push(() => toggleBtn.removeEventListener('click', handleToggle));

  inputWrapper.appendChild(toggleBtn);

  // ── Extend destroy ───────────────────────────────────────────────────────

  const originalDestroy = field.destroy.bind(field);

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
    originalDestroy();
  }

  return {
    element:    field.element,
    input:      field.input,
    setError:   field.setError,
    clearError: field.clearError,
    getValue:   field.getValue,
    destroy,
  };
}
