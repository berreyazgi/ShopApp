/**
 * loginValidation.js
 * Client-side validation rules for the Login form.
 *
 * Returns an array of field errors. An empty array means valid.
 *
 * NOTE: This is a UX helper only.
 * Backend validation remains the authoritative security check.
 */

import { VALIDATION_MESSAGES } from '../constants/authConstants.js';
import {
  isNonEmpty,
  isValidEmail,
  createFieldError,
} from './validationHelpers.js';

// ─── Individual Field Validators ───────────────────────────────────────────

/**
 * @param {string} email
 * @returns {{ field: string, message: string }|null}
 */
function validateEmail(email) {
  if (!isNonEmpty(email)) {
    return createFieldError('email', VALIDATION_MESSAGES.EMAIL_REQUIRED);
  }
  if (!isValidEmail(email)) {
    return createFieldError('email', VALIDATION_MESSAGES.EMAIL_INVALID);
  }
  return null;
}

/**
 * @param {string} password
 * @returns {{ field: string, message: string }|null}
 */
function validatePassword(password) {
  if (!isNonEmpty(password)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRED);
  }
  return null;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Validates the login form data.
 *
 * @param {{ email: string, password: string }} data
 * @returns {{ field: string, message: string }[]} Array of errors. Empty = valid.
 */
export function validateLoginForm(data) {
  const errors = [];

  const emailError    = validateEmail(data.email ?? '');
  const passwordError = validatePassword(data.password ?? '');

  if (emailError)    errors.push(emailError);
  if (passwordError) errors.push(passwordError);

  return errors;
}

/**
 * Validates a single login field by name.
 * Used for on-blur validation of individual inputs.
 *
 * @param {string} fieldName
 * @param {string} value
 * @returns {{ field: string, message: string }|null}
 */
export function validateLoginField(fieldName, value) {
  switch (fieldName) {
    case 'email':    return validateEmail(value);
    case 'password': return validatePassword(value);
    default:         return null;
  }
}
