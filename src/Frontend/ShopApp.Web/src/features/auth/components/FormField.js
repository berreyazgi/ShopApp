/**
 * FormField.js
 * Reusable form field component.
 *
 * Renders a label + input + optional helper text + error area.
 * Handles aria-invalid and aria-describedby associations automatically.
 *
 * Usage:
 *   import { createFormField } from './FormField.js';
 *   const field = createFormField({ id: 'email', name: 'email', label: 'E-posta' });
 *   form.appendChild(field.element);
 *   field.setError('Geçerli bir e-posta girin.');
 *   field.clearError();
 *   field.destroy();
 */

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{
 *   id:           string,
 *   name:         string,
 *   type?:        string,
 *   label:        string,
 *   placeholder?: string,
 *   value?:       string,
 *   autocomplete?:string,
 *   required?:    boolean,
 *   inputmode?:   string,
 *   helperText?:  string,
 *   errorMessage?:string,
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
export function createFormField(options = {}) {
  const {
    id,
    name,
    type         = 'text',
    label,
    placeholder  = '',
    value        = '',
    autocomplete,
    required     = false,
    inputmode,
    helperText,
    errorMessage,
    onInput,
    onBlur,
  } = options;

  const errorId  = `${id}-error`;
  const helperId = `${id}-helper`;

  const cleanupFns = [];

  // ── Build DOM ────────────────────────────────────────────────────────────

  const wrapper = document.createElement('div');
  wrapper.className = 'form-field';

  // Label
  const labelEl = document.createElement('label');
  labelEl.htmlFor   = id;
  labelEl.className = 'form-field__label';
  labelEl.textContent = label;
  if (required) {
    const star = document.createElement('span');
    star.className = 'form-field__required';
    star.setAttribute('aria-hidden', 'true');
    star.textContent = ' *';
    labelEl.appendChild(star);
  }

  // Input
  const input = document.createElement('input');
  input.id          = id;
  input.name        = name;
  input.type        = type;
  input.className   = 'form-field__input';
  input.placeholder = placeholder;
  input.value       = value;
  input.required    = required;

  if (autocomplete) input.autocomplete = autocomplete;
  if (inputmode)    input.inputMode    = inputmode;

  // Describe by error or helper
  const describedBy = [helperText ? helperId : '', errorId].filter(Boolean).join(' ');
  if (describedBy) input.setAttribute('aria-describedby', describedBy);

  // Error message element (always in DOM for aria-describedby to work)
  const errorEl = document.createElement('span');
  errorEl.id        = errorId;
  errorEl.className = 'form-field__error';
  errorEl.setAttribute('aria-live', 'polite');
  errorEl.hidden    = !errorMessage;
  if (errorMessage) {
    errorEl.textContent = errorMessage;
    input.setAttribute('aria-invalid', 'true');
  }

  // Optional helper text
  let helperEl = null;
  if (helperText) {
    helperEl = document.createElement('span');
    helperEl.id          = helperId;
    helperEl.className   = 'form-field__helper';
    helperEl.textContent = helperText;
  }

  wrapper.appendChild(labelEl);
  wrapper.appendChild(input);
  if (helperEl) wrapper.appendChild(helperEl);
  wrapper.appendChild(errorEl);

  // ── Events ──────────────────────────────────────────────────────────────

  if (onInput) {
    const handleInput = (e) => onInput(e.target.value, e);
    input.addEventListener('input', handleInput);
    cleanupFns.push(() => input.removeEventListener('input', handleInput));
  }

  if (onBlur) {
    const handleBlur = (e) => onBlur(e.target.value, e);
    input.addEventListener('blur', handleBlur);
    cleanupFns.push(() => input.removeEventListener('blur', handleBlur));
  }

  // ── Public API ───────────────────────────────────────────────────────────

  function setError(message) {
    errorEl.textContent = message;
    errorEl.hidden      = false;
    input.setAttribute('aria-invalid', 'true');
    wrapper.classList.add('form-field--error');
  }

  function clearError() {
    errorEl.textContent = '';
    errorEl.hidden      = true;
    input.removeAttribute('aria-invalid');
    wrapper.classList.remove('form-field--error');
  }

  function getValue() {
    return input.value;
  }

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  return { element: wrapper, input, setError, clearError, getValue, destroy };
}
