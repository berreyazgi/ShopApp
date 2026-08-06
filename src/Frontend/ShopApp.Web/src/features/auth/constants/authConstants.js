/**
 * authConstants.js
 * Centralized constants for the authentication feature.
 *
 * All magic strings, route paths, and configuration values used
 * across the auth module live here. Never hardcode these values
 * directly in components or pages.
 */

// ─── Auth Status Values ────────────────────────────────────────────────────

/** Possible values for authStore.status */
export const AUTH_STATUS = Object.freeze({
  UNKNOWN:       'unknown',
  ANONYMOUS:     'anonymous',
  AUTHENTICATED: 'authenticated',
});

// ─── Route Paths ───────────────────────────────────────────────────────────

export const AUTH_ROUTES = Object.freeze({
  LOGIN:          '/giris',
  REGISTER:       '/kayit',
  FORGOT_PASSWORD: '/sifremi-unuttum',
  RESET_PASSWORD: '/sifre-sifirla',
  VERIFY_EMAIL:   '/email-dogrula',
  HOME:           '/',
});

// ─── Password Rules ────────────────────────────────────────────────────────

/**
 * Password strength rules used by both the PasswordStrength component
 * and registerValidation.js.
 *
 * NOTE: These are frontend-only quality hints.
 * Backend validation remains the authoritative security check.
 */
export const PASSWORD_RULES = Object.freeze({
  MIN_LENGTH:       8,
  REQUIRES_UPPER:   /[A-Z]/,
  REQUIRES_LOWER:   /[a-z]/,
  REQUIRES_NUMBER:  /[0-9]/,
  REQUIRES_SPECIAL: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/,
});

/** Labels shown in the PasswordStrength component */
export const PASSWORD_RULE_LABELS = Object.freeze([
  { key: 'minLength',      label: 'En az 8 karakter' },
  { key: 'hasUpper',       label: 'En az bir büyük harf' },
  { key: 'hasLower',       label: 'En az bir küçük harf' },
  { key: 'hasNumber',      label: 'En az bir rakam' },
  { key: 'hasSpecial',     label: 'En az bir özel karakter' },
]);

/** Human-readable strength levels */
export const PASSWORD_STRENGTH = Object.freeze({
  WEAK:   { score: 0, label: 'Zayıf',  className: 'strength--weak' },
  MEDIUM: { score: 3, label: 'Orta',   className: 'strength--medium' },
  STRONG: { score: 5, label: 'Güçlü',  className: 'strength--strong' },
});

// ─── Validation Messages ────────────────────────────────────────────────────

export const VALIDATION_MESSAGES = Object.freeze({
  // Common
  EMAIL_REQUIRED:       'E-posta adresi zorunludur.',
  EMAIL_INVALID:        'Geçerli bir e-posta adresi girin.',
  PASSWORD_REQUIRED:    'Şifre alanı zorunludur.',
  // Login
  LOGIN_FAILED:         'E-posta adresi veya şifre hatalı.',
  // Register
  FIRST_NAME_REQUIRED:  'Ad alanı zorunludur.',
  LAST_NAME_REQUIRED:   'Soyad alanı zorunludur.',
  PASSWORD_MIN_LENGTH:  'Şifre en az 8 karakter olmalıdır.',
  PASSWORD_REQUIRES_UPPER:   'Şifre en az bir büyük harf içermelidir.',
  PASSWORD_REQUIRES_LOWER:   'Şifre en az bir küçük harf içermelidir.',
  PASSWORD_REQUIRES_NUMBER:  'Şifre en az bir rakam içermelidir.',
  PASSWORD_REQUIRES_SPECIAL: 'Şifre en az bir özel karakter içermelidir.',
  CONFIRM_PASSWORD_REQUIRED: 'Şifre tekrarı zorunludur.',
  PASSWORDS_DO_NOT_MATCH:    'Şifreler eşleşmiyor.',
  TERMS_REQUIRED:       'Üyelik koşullarını kabul etmelisiniz.',
  // Server errors
  EMAIL_ALREADY_IN_USE:   'Bu e-posta adresi zaten kullanılıyor.',
  ACCOUNT_LOCKED:         'Hesabınız geçici olarak kilitlendi.',
  UNEXPECTED_ERROR:       'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
});

// ─── Form Field IDs ────────────────────────────────────────────────────────

/** Stable IDs used by FormField / PasswordField for label associations. */
export const FIELD_IDS = Object.freeze({
  LOGIN_EMAIL:            'login-email',
  LOGIN_PASSWORD:         'login-password',
  LOGIN_REMEMBER_ME:      'login-remember-me',
  REGISTER_FIRST_NAME:    'register-first-name',
  REGISTER_LAST_NAME:     'register-last-name',
  REGISTER_EMAIL:         'register-email',
  REGISTER_PASSWORD:      'register-password',
  REGISTER_CONFIRM:       'register-confirm-password',
  REGISTER_TERMS:         'register-terms',
  REGISTER_MARKETING:     'register-marketing',
});
