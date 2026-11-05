import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import initFooter from './footer-behavior.js';

/**
 * Server-rendered footer of an AEM Experience Fragment (intact/components/footer): the
 * `.footer-inner` of the XF variation content.
 * @param {string} path XF variation path
 * @returns {Promise<Element|null>}
 */
async function loadExperienceFragment(path) {
  try {
    const resp = await fetch(`${path.replace(/\.html$/, '')}.content.html?wcmmode=disabled`);
    if (!resp.ok) return null;
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    const inner = doc.querySelector('.footer-inner');
    return inner ? document.adoptNode(inner) : null;
  } catch {
    return null;
  }
}

/**
 * Fallback without an Experience Fragment (e.g. aem.page): the EDS footer fragment, unstyled.
 * @param {string} footerPath fragment path
 * @returns {Promise<Element|null>}
 */
async function loadFooterFragment(footerPath) {
  const fragment = await loadFragment(footerPath);
  if (!fragment) return null;
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-fallback';
  while (fragment.firstElementChild) wrapper.append(fragment.firstElementChild);
  return wrapper;
}

/**
 * Intact footer: the footer Experience Fragment (AEM footer component) set in the `footer`
 * metadata. Markup already server-rendered in the block (template structure) is only bound.
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  let inner = block.querySelector('.footer-inner');
  if (!inner) {
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta
      ? new URL(footerMeta, window.location).pathname
      : `${window.location.pathname.replace(/\/[^/]*$/, '')}/footer`;
    inner = (footerPath.includes('/experience-fragments/') && await loadExperienceFragment(footerPath))
      || await loadFooterFragment(footerPath);
    block.textContent = '';
    if (!inner) return;
    block.append(inner);
  }
  initFooter(inner);
}
