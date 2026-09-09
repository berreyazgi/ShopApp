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

  // Missing-requirements alert box — lists only the unmet rules.
  // Reuses the shared alert visual language (icon, colored border/background).
  const missingBox = document.createElement('div');
  missingBox.className = 'alert alert--warning password-strength__missing';
  missingBox.hidden = true;
  missingBox.setAttribute('role', 'alert');
  missingBox.setAttribute('aria-live', 'polite');
  missingBox.setAttribute('aria-atomic', 'true');

  const missingIcon = document.createElement('span');
  missingIcon.className = 'alert__icon';
  missingIcon.setAttribute('aria-hidden', 'true');
  missingIcon.textContent = '⚠';

  const missingBody = document.createElement('div');
  missingBody.className = 'alert__message';

  const missingTitle = document.createElement('p');
  missingTitle.className = 'password-strength__missing-title';
  missingTitle.textContent = 'Şifreniz şu gereksinimleri karşılamalıdır:';

  const missingList = document.createElement('ul');
  missingList.className = 'password-strength__missing-list';

  missingBody.appendChild(missingTitle);
  missingBody.appendChild(missingList);
  missingBox.appendChild(missingIcon);
  missingBox.appendChild(missingBody);

  wrapper.appendChild(barRow);
  wrapper.appendChild(rulesList);
  wrapper.appendChild(missingBox);

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

    // Missing-requirements alert — only the unmet rules, dynamically listed.
    const missingRules = PASSWORD_RULE_LABELS.filter((rule) => !ruleResults[rule.key]);
    if (missingRules.length > 0) {
      missingList.innerHTML = '';
      missingRules.forEach((rule) => {
        const li = document.createElement('li');
        li.textContent = rule.label;
        missingList.appendChild(li);
      });
      missingBox.hidden = false;
    } else {
      missingBox.hidden = true;
      missingList.innerHTML = '';
    }
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
    missingBox.hidden = true;
    missingList.innerHTML = '';
  }

  function destroy() {
    // No external listeners to remove.
  }

  reset();
  return { element: wrapper, update, destroy };
}
