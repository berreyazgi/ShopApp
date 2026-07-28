/**
 * Button.js
 * Reusable Button component.
 *
 * Usage:
 *   import { createButton } from '../Button/Button.js';
 *   const btn = createButton({
 *     label: 'Keşfet',
 *     variant: 'primary',
 *     size: 'md',
 *     onClick: () => navigate('/kategoriler'),
 *   });
 *   container.appendChild(btn.element);
 */

/**
 * @typedef {'primary' | 'secondary' | 'ghost' | 'outline' | 'white'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 *
 * @param {{
 *   label: string,
 *   variant?: ButtonVariant,
 *   size?: ButtonSize,
 *   icon?: HTMLElement,
 *   iconPosition?: 'left' | 'right',
 *   disabled?: boolean,
 *   type?: string,
 *   ariaLabel?: string,
 *   className?: string,
 *   onClick?: (event: MouseEvent) => void,
 * }} options
 * @returns {{ element: HTMLButtonElement, destroy: () => void }}
 */
export function createButton(options = {}) {
  const {
    label,
    variant      = 'primary',
    size         = 'md',
    icon,
    iconPosition = 'left',
    disabled     = false,
    type         = 'button',
    ariaLabel,
    className    = '',
    onClick,
  } = options;

  // ── Create element ──────────────────────────────────────────────────────
  const button = document.createElement('button');
  button.type      = type;
  button.className = `btn btn--${variant} btn--${size}${className ? ` ${className}` : ''}`;
  button.disabled  = disabled;

  if (ariaLabel) button.setAttribute('aria-label', ariaLabel);

  // ── Content ─────────────────────────────────────────────────────────────
  function render() {
    button.innerHTML = '';

    if (icon && iconPosition === 'left') button.appendChild(icon);

    if (label) {
      const span = document.createElement('span');
      span.textContent = label;
      button.appendChild(span);
    }

    if (icon && iconPosition === 'right') button.appendChild(icon);
  }

  // ── Events ──────────────────────────────────────────────────────────────
  function handleClick(event) {
    if (disabled) return;
    onClick?.(event);
  }

  button.addEventListener('click', handleClick);

  function destroy() {
    button.removeEventListener('click', handleClick);
  }

  render();

  return { element: button, destroy };
}
