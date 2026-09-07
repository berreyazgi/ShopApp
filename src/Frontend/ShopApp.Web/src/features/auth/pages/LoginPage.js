/**
 * LoginPage.js
 * Login page — uses AuthLayout + AuthForm + reusable field components.
 *
 * This page:
 *  1. Renders the login form with email, password, remember-me, and forgot-password.
 *  2. Runs client-side validation on submit and on blur.
 *  3. Calls authService.login() and establishes the authenticated session.
 *  4. Handles loading state, validation errors, and server error display.
 *  5. Includes social login UI placeholders.
 *
 * SPA lifecycle contract:
 *  export default function LoginPage({ params }) → { element, destroy }
 *  The router calls destroy() when navigating away.
 *
 * FUTURE INTEGRATION:
 *  When authService.login() is implemented:
 *  1. On success, call navigate(AUTH_ROUTES.HOME) or the pre-navigation route.
 *  2. authStore.setAuthenticated() will already be called inside authService.
 *  3. Remove the placeholder success comment below.
 */

import { createAuthLayout }       from '../components/AuthLayout.js';
import { createAuthForm }         from '../components/AuthForm.js';
import { createFormField }        from '../components/FormField.js';
import { createPasswordField }    from '../components/PasswordField.js';
import { createSocialLoginButtons } from '../components/SocialLoginButtons.js';
import { validateLoginForm, validateLoginField } from '../validation/loginValidation.js';
import { login }                  from '../services/authService.js';
import { mapAuthError }           from '../services/authService.js';
import { AUTH_ROUTES, FIELD_IDS } from '../constants/authConstants.js';
import { saveRememberMe }         from '../../../shared/utils/storage.js';
import { navigate }               from '../../../app/router.js';

// ─── Page ──────────────────────────────────────────────────────────────────

/**
 * @param {{ params?: object }} context
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function LoginPage() {
  const cleanupFns = [];

  // ── Field components ───────────────────────────────────────────────────

  const emailField = createFormField({
    id:           FIELD_IDS.LOGIN_EMAIL,
    name:         'email',
    type:         'email',
    label:        'E-posta adresi',
    placeholder:  'ornek@email.com',
    autocomplete: 'email',
    inputmode:    'email',
    required:     true,
    onBlur: (value) => {
      const err = validateLoginField('email', value);
      err ? emailField.setError(err.message) : emailField.clearError();
    },
    onInput: () => emailField.clearError(),
  });

  const passwordField = createPasswordField({
    id:           FIELD_IDS.LOGIN_PASSWORD,
    name:         'password',
    label:        'Şifre',
    placeholder:  'Şifrenizi girin',
    autocomplete: 'current-password',
    required:     true,
    onBlur: (value) => {
      const err = validateLoginField('password', value);
      err ? passwordField.setError(err.message) : passwordField.clearError();
    },
    onInput: () => passwordField.clearError(),
  });

  // ── Remember Me + Forgot Password row ─────────────────────────────────

  const rememberRow = document.createElement('div');
  rememberRow.className = 'auth-form__row auth-form__row--space-between';

  //label oluşturup metin atıyor
  const rememberLabel = document.createElement('label');
  rememberLabel.className = 'auth-checkbox-label';
  rememberLabel.htmlFor   = FIELD_IDS.LOGIN_REMEMBER_ME;

  //checkbox oluşturup label içine ekliyor
  const rememberCheckbox = document.createElement('input');
  rememberCheckbox.type      = 'checkbox';
  rememberCheckbox.id        = FIELD_IDS.LOGIN_REMEMBER_ME;
  rememberCheckbox.name      = 'rememberMe';
  rememberCheckbox.className = 'auth-checkbox';

  const rememberText = document.createElement('span');
  rememberText.textContent = 'Beni hatırla';

  rememberLabel.appendChild(rememberCheckbox);
  rememberLabel.appendChild(rememberText);

  const forgotLink = document.createElement('a');
  forgotLink.href      = AUTH_ROUTES.FORGOT_PASSWORD;
  forgotLink.className = 'auth-link auth-link--small';
  forgotLink.textContent = 'Şifremi unuttum';

  rememberRow.appendChild(rememberLabel);
  rememberRow.appendChild(forgotLink);

  // ── Auth form ──────────────────────────────────────────────────────────

  let authFormInstance = null; // store reference for setServerError access

  const authForm = createAuthForm({
    id:           'login-form',
    submitLabel:  'Giriş Yap',
    loadingLabel: 'Giriş yapılıyor...',
    onSubmit: async (formData) => {
      // 1. Read values from FormData
      const email    = (formData.get('email')    ?? '').toString().trim();
      const password = (formData.get('password') ?? '').toString();
      const remember = formData.get('rememberMe') === 'on';

      // 2. Client-side validation
      const errors = validateLoginForm({ email, password });

      if (errors.length > 0) {
        applyErrors(errors);
        focusFirstError();
        return; // Do not call service.
      }

      // 3. Loading state
      authForm.setLoading(true);
      authForm.clearServerError();

      try {
        const result = await login({ email, password });

        // 5. Save UI preference
        saveRememberMe(remember);

        if (result?.success) {
          const returnTo = new URLSearchParams(window.location.search).get('returnTo');
          navigate(returnTo?.startsWith('/') ? returnTo : AUTH_ROUTES.HOME);
        }
      } catch (err) {
        authForm.setServerError(mapAuthError(err));
      } finally {
        authForm.setLoading(false);
      }
    },
  });

  authFormInstance = authForm;

  // Append fields
  authForm.appendField(emailField.element);
  authForm.appendField(passwordField.element);
  authForm.appendField(rememberRow);
  cleanupFns.push(() => authForm.destroy());

  // ── Social login ───────────────────────────────────────────────────────

  const socialButtons = createSocialLoginButtons();
  authForm.fieldsContainer.appendChild(socialButtons.element);
  cleanupFns.push(() => socialButtons.destroy());

  // ── Layout ────────────────────────────────────────────────────────────

  const layout = createAuthLayout({
    title:           'Tekrar hoş geldiniz',
    subtitle:        'Hesabınıza giriş yaparak alışverişinize devam edin.',
    formElement:     authForm.element,
    sideTitle:       'Alışverişinize kaldığınız yerden devam edin',
    sideDescription: 'Favorilerinize, sepetinize ve siparişlerinize tek bir hesapla erişin.',
    sideImage:       'src/assets/images/auth/login-cover.webp',
    footerText:      'Hesabınız yok mu? ',
    footerLinkLabel: 'Hesap Oluştur',
    footerLinkPath:  AUTH_ROUTES.REGISTER,
  });

  cleanupFns.push(() => layout.destroy());

  // ── Validation error helpers ──────────────────────────────────────────

  const fieldMap = {
    email:    emailField,
    password: passwordField,
  };

  function applyErrors(errors) {
    // Clear all first
    Object.values(fieldMap).forEach((f) => f.clearError());

    errors.forEach((err) => {
      const field = fieldMap[err.field];
      if (field) field.setError(err.message);
    });
  }

  function focusFirstError() {
    const order = ['email', 'password'];
    for (const key of order) {
      const field = fieldMap[key];
      if (field?.input?.getAttribute('aria-invalid') === 'true') {
        field.input.focus();
        break;
      }
    }
  }

  // ── Destroy ──────────────────────────────────────────────────────────

  function destroy() {
    // Cleanup in reverse order of creation
    cleanupFns.slice().reverse().forEach((fn) => fn());
    cleanupFns.length = 0;
    emailField.destroy();
    passwordField.destroy();
  }

  return { element: layout.element, destroy };
}
