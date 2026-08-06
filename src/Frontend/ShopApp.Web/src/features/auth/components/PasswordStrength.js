/**
 * PasswordStrength.js
 * Displays a visual password strength indicator and requirement checklist.
 *
 * This is a UI feedback component only.
 * It does NOT replace backend password policy enforcement.
 *
 * Usage:
 *   import { createPasswordStrength } from './PasswordStrength.js';
 *   const strength = createPasswordStrength();
 *   container.appendChild(strength.element);
 *   strength.update('MyP@ssw0rd');
 *   strength.destroy();
 */

import { evaluatePasswordRules } from '../validation/validationHelpers.js';
import { PASSWORD_RULE_LABELS, PASSWORD_STRENGTH } from '../constants/authConstants.js';

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @returns {{
 *   element: HTMLDivElement,
 *   update:  (password: string) => void,
 *   destroy: () => void,
 * }}
 */
export function createPasswordStrength() {
  const wrapper = document.createElement('div');
  wrapper.className = 'password-strength';
  wrapper.setAttribute('aria-live', 'polite');
  wrapper.setAttribute('aria-atomic', 'true');

  // Strength bar
  const barContainer = document.createElement('div');
  barContainer.className = 'password-strength__bar-container';
  barContainer.setAttribute('aria-hidden', 'true');

  const segments = Array.from({ length: 5 }, () => {
    const seg = document.createElement('span');
    seg.className = 'password-strength__segment';
    barContainer.appendChild(seg);
    return seg;
  });

  const labelEl = document.createElement('span');
  labelEl.className = 'password-strength__label';

  // Rules list
  const rulesList = document.createElement('ul');
  rulesList.className = 'password-strength__rules';
  rulesList.setAttribute('aria-label', 'Şifre gereksinimleri');

  const ruleItems = PASSWORD_RULE_LABELS.map((rule) => {
    const li = document.createElement('li');
    li.className = 'password-strength__rule';
    li.dataset.key = rule.key;

    const iconEl = document.createElement('span');
    iconEl.className = 'password-strength__rule-icon';
    iconEl.setAttribute('aria-hidden', 'true');

    const textEl = document.createElement('span');
    textEl.textContent = rule.label;

    li.appendChild(iconEl);
    li.appendChild(textEl);
    rulesList.appendChild(li);
    return { li, iconEl, key: rule.key };
  });

  const barRow = document.createElement('div');
  barRow.className = 'password-strength__bar-row';
  barRow.appendChild(barContainer);
  barRow.appendChild(labelEl);

  wrapper.appendChild(barRow);
  wrapper.appendChild(rulesList);

  // ── Update ──────────────────────────────────────────────────────────────

  /**
   * Re-evaluates the given password and updates the UI.
   * @param {string} password
   */
  function update(password) {
    if (!password) {
      reset();
      return;
    }

    const rules = evaluatePasswordRules(password);
    const { passedCount } = rules;

    // Determine strength level
    let strength;
    if (passedCount >= PASSWORD_STRENGTH.STRONG.score) {
      strength = PASSWORD_STRENGTH.STRONG;
    } else if (passedCount >= PASSWORD_STRENGTH.MEDIUM.score) {
      strength = PASSWORD_STRENGTH.MEDIUM;
    } else {
      strength = PASSWORD_STRENGTH.WEAK;
    }

    // Update segments
    segments.forEach((seg, i) => {
      seg.className = 'password-strength__segment';
      if (i < passedCount) {
        seg.classList.add(`password-strength__segment--${strength.className.split('--')[1]}`);
      }
    });

    // Update label
    labelEl.textContent = strength.label;
    labelEl.className = `password-strength__label password-strength__label--${strength.className.split('--')[1]}`;

    // Update screen reader text
    wrapper.setAttribute('aria-label', `Şifre gücü: ${strength.label}`);

    // Update rule items
    const ruleResults = {
      minLength:  rules.minLength,
      hasUpper:   rules.hasUpper,
      hasLower:   rules.hasLower,
      hasNumber:  rules.hasNumber,
      hasSpecial: rules.hasSpecial,
    };

    ruleItems.forEach(({ li, iconEl, key }) => {
      const passed = ruleResults[key];
      li.classList.toggle('password-strength__rule--passed', passed);
      li.classList.toggle('password-strength__rule--failed', !passed);
      iconEl.textContent = passed ? '✓' : '○';
    });
  }

  function reset() {
    segments.forEach((seg) => {
      seg.className = 'password-strength__segment';
    });
    labelEl.textContent = '';
    labelEl.className   = 'password-strength__label';
    ruleItems.forEach(({ li, iconEl }) => {
      li.className  = 'password-strength__rule';
      iconEl.textContent = '○';
    });
  }

  function destroy() {
    // No external listeners to remove.
  }

  reset();
  return { element: wrapper, update, destroy };
}
