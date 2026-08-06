/**
 * RegisterPage.js
 * Registration page — uses AuthLayout + AuthForm + reusable field components.
 *
 * This page:
 *  1. Renders the registration form with first/last name, email, password,
 *     confirm-password, password strength indicator, terms & marketing checkboxes.
 *  2. Runs client-side validation on submit and on blur.
 *  3. Calls authService.register() (stub — no real API call yet).
 *  4. Handles loading state, validation errors, and server error display.
 *
 * SPA lifecycle contract:
 *  export default function RegisterPage({ params }) → { element, destroy }
 *  The router calls destroy() when navigating away.
 *
 * FUTURE INTEGRATION:
 *  When authService.register() is implemented:
 *  1. On success, navigate to home or an email-verification page.
 *  2. authStore.setAuthenticated() will be called inside authService.
 *  3. Remove the placeholder success comment below.
 */

import { createAuthLayout }        from '../components/AuthLayout.js';
import { createAuthForm }          from '../components/AuthForm.js';
import { createFormField }         from '../components/FormField.js';
import { createPasswordField }     from '../components/PasswordField.js';
import { createPasswordStrength }  from '../components/PasswordStrength.js';
import { createSocialLoginButtons } from '../components/SocialLoginButtons.js';
import {
  validateRegisterForm,
  validateRegisterField,
} from '../validation/registerValidation.js';
import { register, mapAuthError }   from '../services/authService.js';
import { AUTH_ROUTES, FIELD_IDS }   from '../constants/authConstants.js';
import { navigate }                 from '../../../app/router.js';

// ─── Page ──────────────────────────────────────────────────────────────────

/**
 * @param {{ params?: object }} context
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function RegisterPage() {
  const cleanupFns = [];

  // ── Field components ───────────────────────────────────────────────────

  const firstNameField = createFormField({
    id:           FIELD_IDS.REGISTER_FIRST_NAME,
    name:         'firstName',
    type:         'text',
    label:        'Ad',
    placeholder:  'Adınızı girin',
    autocomplete: 'given-name',
    required:     true,
    onBlur: (value) => {
      const err = validateRegisterField('firstName', value);
      err ? firstNameField.setError(err.message) : firstNameField.clearError();
    },
    onInput: () => firstNameField.clearError(),
  });

  const lastNameField = createFormField({
    id:           FIELD_IDS.REGISTER_LAST_NAME,
    name:         'lastName',
    type:         'text',
    label:        'Soyad',
    placeholder:  'Soyadınızı girin',
    autocomplete: 'family-name',
    required:     true,
    onBlur: (value) => {
      const err = validateRegisterField('lastName', value);
      err ? lastNameField.setError(err.message) : lastNameField.clearError();
    },
    onInput: () => lastNameField.clearError(),
  });

  const emailField = createFormField({
    id:           FIELD_IDS.REGISTER_EMAIL,
    name:         'email',
    type:         'email',
    label:        'E-posta adresi',
    placeholder:  'ornek@email.com',
    autocomplete: 'email',
    inputmode:    'email',
    required:     true,
    onBlur: (value) => {
      const err = validateRegisterField('email', value);
      err ? emailField.setError(err.message) : emailField.clearError();
    },
    onInput: () => emailField.clearError(),
  });

  // Password strength indicator
  const strengthIndicator = createPasswordStrength();
  cleanupFns.push(() => strengthIndicator.destroy());

  const passwordField = createPasswordField({
    id:           FIELD_IDS.REGISTER_PASSWORD,
    name:         'password',
    label:        'Şifre',
    placeholder:  'Güçlü bir şifre oluşturun',
    autocomplete: 'new-password',
    required:     true,
    onInput: (value) => {
      passwordField.clearError();
      strengthIndicator.update(value);
      // Re-validate confirm if it's already been touched
      if (confirmPasswordField.input.value) {
        const err = validateRegisterField(
          'confirmPassword',
          confirmPasswordField.input.value,
          { password: value }
        );
        err ? confirmPasswordField.setError(err.message) : confirmPasswordField.clearError();
      }
    },
    onBlur: (value) => {
      const err = validateRegisterField('password', value);
      err ? passwordField.setError(err.message) : passwordField.clearError();
    },
  });

  // Insert strength indicator after the password field element
  passwordField.element.appendChild(strengthIndicator.element);

  const confirmPasswordField = createPasswordField({
    id:           FIELD_IDS.REGISTER_CONFIRM,
    name:         'confirmPassword',
    label:        'Şifre Tekrarı',
    placeholder:  'Şifrenizi tekrar girin',
    autocomplete: 'new-password',
    required:     true,
    onBlur: (value) => {
      const err = validateRegisterField(
        'confirmPassword',
        value,
        { password: passwordField.input.value }
      );
      err ? confirmPasswordField.setError(err.message) : confirmPasswordField.clearError();
    },
    onInput: () => confirmPasswordField.clearError(),
  });

  // ── Name fields in a row ───────────────────────────────────────────────

  const nameRow = document.createElement('div');
  nameRow.className = 'auth-form__name-row';
  nameRow.appendChild(firstNameField.element);
  nameRow.appendChild(lastNameField.element);

  // ── Terms checkbox ─────────────────────────────────────────────────────

  const termsWrapper = document.createElement('div');
  termsWrapper.className = 'auth-form__checkbox-group';

  const termsLabel = document.createElement('label');
  termsLabel.className = 'auth-checkbox-label';
  termsLabel.htmlFor   = FIELD_IDS.REGISTER_TERMS;

  const termsCheckbox = document.createElement('input');
  termsCheckbox.type      = 'checkbox';
  termsCheckbox.id        = FIELD_IDS.REGISTER_TERMS;
  termsCheckbox.name      = 'terms';
  termsCheckbox.className = 'auth-checkbox';
  termsCheckbox.required  = true;
  termsCheckbox.setAttribute('aria-describedby', 'terms-error');

  const termsText = document.createElement('span');
  termsText.innerHTML = `<a href="/sozlesme" class="auth-link">Üyelik Sözleşmesi</a>'ni ve
    <a href="/gizlilik" class="auth-link">Gizlilik Politikası</a>'nı okudum ve kabul ediyorum.`;

  termsLabel.appendChild(termsCheckbox);
  termsLabel.appendChild(termsText);

  const termsError = document.createElement('span');
  termsError.id        = 'terms-error';
  termsError.className = 'form-field__error';
  termsError.setAttribute('aria-live', 'polite');
  termsError.hidden    = true;

  termsWrapper.appendChild(termsLabel);
  termsWrapper.appendChild(termsError);

  // ── Marketing opt-in checkbox (optional) ──────────────────────────────

  const marketingWrapper = document.createElement('div');
  marketingWrapper.className = 'auth-form__checkbox-group';

  const marketingLabel = document.createElement('label');
  marketingLabel.className = 'auth-checkbox-label';
  marketingLabel.htmlFor   = FIELD_IDS.REGISTER_MARKETING;

  const marketingCheckbox = document.createElement('input');
  marketingCheckbox.type      = 'checkbox';
  marketingCheckbox.id        = FIELD_IDS.REGISTER_MARKETING;
  marketingCheckbox.name      = 'marketingOptIn';
  marketingCheckbox.className = 'auth-checkbox';

  const marketingText = document.createElement('span');
  marketingText.textContent = 'Kampanya ve yeni ürün duyurularını almak istiyorum.';

  marketingLabel.appendChild(marketingCheckbox);
  marketingLabel.appendChild(marketingText);
  marketingWrapper.appendChild(marketingLabel);

  // ── Auth form ──────────────────────────────────────────────────────────

  const authForm = createAuthForm({
    id:           'register-form',
    submitLabel:  'Hesap Oluştur',
    loadingLabel: 'Hesap oluşturuluyor...',
    onSubmit: async (formData) => {
      // 1. Read values
      const firstName       = (formData.get('firstName')       ?? '').toString().trim();
      const lastName        = (formData.get('lastName')        ?? '').toString().trim();
      const email           = (formData.get('email')           ?? '').toString().trim();
      const password        = (formData.get('password')        ?? '').toString();
      const confirmPassword = (formData.get('confirmPassword') ?? '').toString();
      const terms           = formData.get('terms') === 'on';
      const marketingOptIn  = formData.get('marketingOptIn') === 'on';

      // 2. Client-side validation
      const errors = validateRegisterForm({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        terms,
      });

      if (errors.length > 0) {
        applyErrors(errors);
        focusFirstError();
        return;
      }

      // 3. Loading state
      authForm.setLoading(true);
      authForm.clearServerError();

      try {
        // 4. Call service stub (no API call yet)
        const result = await register({
          firstName,
          lastName,
          email,
          password,
          marketingOptIn,
        });

        if (result?.success) {
          // FUTURE: navigate to home or email verification page.
          // TODO: navigate(AUTH_ROUTES.HOME);
          console.info('[RegisterPage] Register success stub. Navigation will be added with backend.');
        } else {
          authForm.setServerError(
            'Kayıt başarılı olduğunda bu mesaj kaldırılacak. Servis henüz entegre edilmemiştir.'
          );
        }
      } catch (err) {
        authForm.setServerError(mapAuthError(err));
      } finally {
        authForm.setLoading(false);
      }
    },
  });

  // Append all fields
  authForm.appendField(nameRow);
  authForm.appendField(emailField.element);
  authForm.appendField(passwordField.element);
  authForm.appendField(confirmPasswordField.element);
  authForm.appendField(termsWrapper);
  authForm.appendField(marketingWrapper);
  cleanupFns.push(() => authForm.destroy());

  // ── Layout ─────────────────────────────────────────────────────────────

  const layout = createAuthLayout({
    title:           'ShopApp hesabınızı oluşturun',
    subtitle:        'Yeni ürünleri keşfetmek ve siparişlerinizi yönetmek için kayıt olun.',
    formElement:     authForm.element,
    sideTitle:       'ShopApp dünyasına katılın',
    sideDescription: 'Size özel önerileri keşfedin, favorilerinizi kaydedin ve siparişlerinizi kolayca yönetin.',
    sideImage:       'src/assets/images/auth/register-cover.webp',
    footerText:      'Zaten hesabınız var mı? ',
    footerLinkLabel: 'Giriş Yap',
    footerLinkPath:  AUTH_ROUTES.LOGIN,
  });

  cleanupFns.push(() => layout.destroy());

  // ── Validation helpers ─────────────────────────────────────────────────

  const fieldMap = {
    firstName:       firstNameField,
    lastName:        lastNameField,
    email:           emailField,
    password:        passwordField,
    confirmPassword: confirmPasswordField,
  };

  function applyErrors(errors) {
    Object.values(fieldMap).forEach((f) => f.clearError());
    // Reset terms error
    termsError.textContent = '';
    termsError.hidden      = true;
    termsCheckbox.removeAttribute('aria-invalid');

    errors.forEach((err) => {
      if (err.field === 'terms') {
        termsError.textContent = err.message;
        termsError.hidden      = false;
        termsCheckbox.setAttribute('aria-invalid', 'true');
        return;
      }
      const field = fieldMap[err.field];
      if (field) field.setError(err.message);
    });
  }

  function focusFirstError() {
    const order = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'terms'];
    for (const key of order) {
      if (key === 'terms') {
        if (termsCheckbox.getAttribute('aria-invalid') === 'true') {
          termsCheckbox.focus();
          break;
        }
        continue;
      }
      const field = fieldMap[key];
      if (field?.input?.getAttribute('aria-invalid') === 'true') {
        field.input.focus();
        break;
      }
    }
  }

  // ── Destroy ────────────────────────────────────────────────────────────

  function destroy() {
    cleanupFns.slice().reverse().forEach((fn) => fn());
    cleanupFns.length = 0;
    Object.values(fieldMap).forEach((f) => f.destroy?.());
  }

  return { element: layout.element, destroy };
}
