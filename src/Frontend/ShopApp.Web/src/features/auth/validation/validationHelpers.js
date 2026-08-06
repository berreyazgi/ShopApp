/**
 * validationHelpers.js
 * Reusable primitive validation functions.
 *
 * These helpers are pure functions with no DOM or module side effects.
 * They are consumed by loginValidation.js and registerValidation.js.
 */

import { PASSWORD_RULES } from '../constants/authConstants.js';

// ─── Type Helpers ──────────────────────────────────────────────────────────

/**
 * Returns true if the value is a non-empty string after trimming.
 * @param {string} value
 * @returns {boolean}
 */
export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Returns true if the value is a syntactically valid email address.
 * NOTE: This is a frontend quality check only.
 * Backend validation remains the authoritative check.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
  // RFC 5322 simplified pattern — intentionally permissive for UX.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim());
}

/**
 * Returns true if the password meets the minimum length requirement.
 * @param {string} value
 * @returns {boolean}
 */
export function hasMinLength(value) {
  return value.length >= PASSWORD_RULES.MIN_LENGTH;
}

/**
 * Returns true if the password contains at least one uppercase letter.
 * @param {string} value
 * @returns {boolean}
 */
export function hasUppercase(value) {
  return PASSWORD_RULES.REQUIRES_UPPER.test(value);
}

/**
 * Returns true if the password contains at least one lowercase letter.
 * @param {string} value
 * @returns {boolean}
 */
export function hasLowercase(value) {
  return PASSWORD_RULES.REQUIRES_LOWER.test(value);
}

/**
 * Returns true if the password contains at least one numeric digit.
 * @param {string} value
 * @returns {boolean}
 */
export function hasNumber(value) {
  return PASSWORD_RULES.REQUIRES_NUMBER.test(value);
}

/**
 * Returns true if the password contains at least one special character.
 * @param {string} value
 * @returns {boolean}
 */
export function hasSpecialChar(value) {
  return PASSWORD_RULES.REQUIRES_SPECIAL.test(value);
}

// ─── Password Rule Checker ─────────────────────────────────────────────────

/**
 * Evaluates all password rules against the given value.
 *
 * @param {string} value
 * @returns {{
 *   minLength:   boolean,
 *   hasUpper:    boolean,
 *   hasLower:    boolean,
 *   hasNumber:   boolean,
 *   hasSpecial:  boolean,
 *   passedCount: number,
 * }}
 */
export function evaluatePasswordRules(value) {
  const minLength  = hasMinLength(value);
  const hasUpper   = hasUppercase(value);
  const hasLower   = hasLowercase(value);
  const hasNum     = hasNumber(value);
  const hasSpecial = hasSpecialChar(value);

  const passedCount = [minLength, hasUpper, hasLower, hasNum, hasSpecial]
    .filter(Boolean).length;

  return {
    minLength,
    hasUpper,
    hasLower,
    hasNumber:  hasNum,
    hasSpecial,
    passedCount,
  };
}

// ─── Error Object Helpers ──────────────────────────────────────────────────

/**
 * Creates a typed validation error object.
 *
 * @param {string} field   - The form field name.
 * @param {string} message - The human-readable error message.
 * @returns {{ field: string, message: string }}
 */
export function createFieldError(field, message) {
  return { field, message };
}
