/**
 * AuthForm.js
 * Shared form container with loading state, server error display,
 * submit management, and event cleanup.
 *
 * Responsibilities:
 *  - Wraps a <form> element
 *  - Manages loading state (disables submit, shows spinner text)
 *  - Displays server-level alerts via the Alert component
 *  - Provides a clean onSubmit callback interface
 *  - Prevents duplicate submissions
 *  - Cleans up all listeners on destroy()
 *
 * Composition over inheritance — pages compose AuthForm with
 * their own field components rather than subclassing.
 *
 * Usage:
 *   import { createAuthForm } from './AuthForm.js';
 *   const form = createAuthForm({
 *     id: 'login-form',
 *     submitLabel: 'Giriş Yap',
 *     onSubmit: async (formData) => { ... },
 *   });
 *   container.appendChild(form.element);
 *   form.appendField(someField.element);
 *   form.setServerError('E-posta adresi veya şifre hatalı.');
 *   form.destroy();
 */

import { createAlert } from '../../../shared/components/Alert/Alert.js';

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{
 *   id:             string,
 *   submitLabel:    string,
 *   loadingLabel?:  string,
 *   onSubmit:       (formData: FormData) => Promise<void>,
 *   noValidate?:    boolean,
 * }} options
 * @returns {{
 *   element:         HTMLFormElement,
 *   fieldsContainer: HTMLDivElement,
 *   appendField:     (el: HTMLElement) => void,
 *   setLoading:      (loading: boolean) => void,
 *   setServerError:  (message: string) => void,
 *   clearServerError:() => void,
 *   destroy:         () => void,
 * }}
 */
export function createAuthForm(options = {}) {
  const {
    id,
    submitLabel   = 'Devam Et',
    loadingLabel  = 'Yükleniyor...',
    onSubmit,
    noValidate    = true,
  } = options;

  let isSubmitting = false;
  const cleanupFns = [];

  // ── Elements ─────────────────────────────────────────────────────────────

  const form = document.createElement('form');
  form.id          = id;
  form.className   = 'auth-form';
  form.noValidate  = noValidate;

  // Server-error alert (hidden until needed)
  const serverAlert = createAlert({ type: 'error', dismissible: false });
  form.appendChild(serverAlert.element);

  // Fields container — caller appends fields here
  const fieldsContainer = document.createElement('div');
  fieldsContainer.className = 'auth-form__fields';
  form.appendChild(fieldsContainer);

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type      = 'submit';
  submitBtn.id        = `${id}-submit`;
  submitBtn.className = 'auth-form__submit btn btn--primary btn--lg';
  submitBtn.textContent = submitLabel;

  // Accessible loading announcement
  const liveRegion = document.createElement('span');
  liveRegion.className = 'sr-only';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');

  form.appendChild(submitBtn);
  form.appendChild(liveRegion);

  // ── Loading State ─────────────────────────────────────────────────────────

  /**
   * Toggles the form's loading state.
   * Disables the submit button and updates accessible announcements.
   * @param {boolean} loading
   */
  function setLoading(loading) {
    isSubmitting = loading;
    submitBtn.disabled    = loading;
    submitBtn.textContent = loading ? loadingLabel : submitLabel;
    submitBtn.classList.toggle('btn--loading', loading);
    liveRegion.textContent = loading ? loadingLabel : '';
  }

  // ── Server Error ──────────────────────────────────────────────────────────

  function setServerError(message) {
    serverAlert.setMessage(message);
  }

  function clearServerError() {
    serverAlert.clear();
  }

  // ── Submit Handling ───────────────────────────────────────────────────────

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return; // Guard against duplicate submissions.

    clearServerError();

    const formData = new FormData(form);

    if (typeof onSubmit === 'function') {
      try {
        await onSubmit(formData);
      } catch (err) {
        console.error('[AuthForm] Unhandled error in onSubmit:', err);
        setServerError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        setLoading(false);
      }
    }
  };

  form.addEventListener('submit', handleSubmit);
  cleanupFns.push(() => form.removeEventListener('submit', handleSubmit));

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Appends a field element to the fields container.
   * @param {HTMLElement} el
   */
  function appendField(el) {
    fieldsContainer.appendChild(el);
  }

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
    serverAlert.destroy();
  }

  return {
    element:         form,
    fieldsContainer,
    appendField,
    setLoading,
    setServerError,
    clearServerError,
    destroy,
  };
}
