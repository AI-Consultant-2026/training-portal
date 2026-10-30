import { CountryCode } from "../constants/countries";

// Inline SVG flags (2026-10-30, from the homepage redesign mockup's Flag component), 3:2.
// Always shown beside the country's name, so they're decorative to screen readers.
const FLAG_BODIES: Record<CountryCode, string> = {
  NG: '<rect width="10" height="20" fill="#008751"/><rect x="10" width="10" height="20" fill="#FFFFFF"/><rect x="20" width="10" height="20" fill="#008751"/>',
  ZA:
    '<rect width="30" height="10" fill="#E03C31"/><rect y="10" width="30" height="10" fill="#001489"/>' +
    '<path d="M0,0 L12,10 L30,10 M0,20 L12,10" fill="none" stroke="#FFFFFF" stroke-width="6.67" stroke-linejoin="miter"/>' +
    '<path d="M0,0 L12,10 L30,10 M0,20 L12,10" fill="none" stroke="#007749" stroke-width="4" stroke-linejoin="miter"/>' +
    '<polygon points="0,2.6 8.88,10 0,17.4" fill="#FFB81C"/><polygon points="0,3.47 7.84,10 0,16.53" fill="#000000"/>',
  KE:
    '<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="6" fill="#000000"/><rect y="7" width="30" height="6" fill="#BB0000"/><rect y="14" width="30" height="6" fill="#006600"/>' +
    '<line x1="11" y1="3" x2="19" y2="17" stroke="#FFFFFF" stroke-width="0.6"/><line x1="19" y1="3" x2="11" y2="17" stroke="#FFFFFF" stroke-width="0.6"/>' +
    '<ellipse cx="15" cy="10" rx="3" ry="6" fill="#000000"/><ellipse cx="15" cy="10" rx="1.8" ry="6" fill="#BB0000"/><ellipse cx="15" cy="10" rx="0.5" ry="1.6" fill="#FFFFFF"/>',
  GH:
    '<rect width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FCD116"/><rect y="13.33" width="30" height="6.67" fill="#006B3F"/>' +
    '<polygon points="15,6.7 15.76,8.95 18.14,8.98 16.24,10.4 16.94,12.67 15,11.3 13.06,12.67 13.76,10.4 11.86,8.98 14.24,8.95" fill="#000000"/>',
};

export function flagSvg(code: CountryCode, className = "flag"): string {
  return `<svg class="${className}" viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">${FLAG_BODIES[code]}</svg>`;
}
