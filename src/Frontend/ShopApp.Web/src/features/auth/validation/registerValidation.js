/**
 * registerValidation.js
 * Client-side validation rules for the Register form.
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
  hasMinLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecialChar,
  createFieldError,
} from './validationHelpers.js';

// ─── Individual Field Validators ───────────────────────────────────────────

function validateFirstName(value) {
  if (!isNonEmpty(value)) {
    return createFieldError('firstName', VALIDATION_MESSAGES.FIRST_NAME_REQUIRED);
  }
  return null;
}

function validateLastName(value) {
  if (!isNonEmpty(value)) {
    return createFieldError('lastName', VALIDATION_MESSAGES.LAST_NAME_REQUIRED);
  }
  return null;
}

function validateEmail(value) {
  if (!isNonEmpty(value)) {
    return createFieldError('email', VALIDATION_MESSAGES.EMAIL_REQUIRED);
  }
  if (!isValidEmail(value)) {
    return createFieldError('email', VALIDATION_MESSAGES.EMAIL_INVALID);
  }
  return null;
}

function validatePassword(value) {
  if (!isNonEmpty(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRED);
  }
  if (!hasMinLength(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
  }
  if (!hasUppercase(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRES_UPPER);
  }
  if (!hasLowercase(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRES_LOWER);
  }
  if (!hasNumber(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRES_NUMBER);
  }
  if (!hasSpecialChar(value)) {
    return createFieldError('password', VALIDATION_MESSAGES.PASSWORD_REQUIRES_SPECIAL);
  }
  return null;
}

function validateConfirmPassword(value, password) {
  if (!isNonEmpty(value)) {
    return createFieldError('confirmPassword', VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED);
  }
  if (value !== password) {
    return createFieldError('confirmPassword', VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }
  return null;
}

function validateTerms(checked) {
  if (!checked) {
    return createFieldError('terms', VALIDATION_MESSAGES.TERMS_REQUIRED);
  }
  return null;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Validates the full registration form data.
 *
 * @param {{
 *   firstName:       string,
 *   lastName:        string,
 *   email:           string,
 *   password:        string,
 *   confirmPassword: string,
 *   terms:           boolean,
 * }} data
 * @returns {{ field: string, message: string }[]} Array of errors. Empty = valid.
 */
export function validateRegisterForm(data) {
  const errors = [];

  const checks = [
    validateFirstName(data.firstName ?? ''),
    validateLastName(data.lastName ?? ''),
    validateEmail(data.email ?? ''),
    validatePassword(data.password ?? ''),
    validateConfirmPassword(data.confirmPassword ?? '', data.password ?? ''),
    validateTerms(!!data.terms),
  ];

  for (const error of checks) {
    if (error) errors.push(error);
  }

  return errors;
}

/**
 * Validates a single register field by name.
 * Used for on-blur validation of individual inputs.
 *
 * @param {string} fieldName
 * @param {string|boolean} value
 * @param {{ password?: string }} [context]  — Pass the current password when validating confirmPassword.
 * @returns {{ field: string, message: string }|null}
 */
export function validateRegisterField(fieldName, value, context = {}) {
  switch (fieldName) {
    case 'firstName':       return validateFirstName(value);
    case 'lastName':        return validateLastName(value);
    case 'email':           return validateEmail(value);
    case 'password':        return validatePassword(value);
    case 'confirmPassword': return validateConfirmPassword(value, context.password ?? '');
    case 'terms':           return validateTerms(!!value);
    default:                return null;
  }
}
