import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import initHeader from './header-behavior.js';

/**
 * Server-rendered header of an AEM Experience Fragment (intact/components/header): the
 * `.nav-wrapper` of the XF variation content.
 * @param {string} path XF variation path
 * @returns {Promise<Element|null>}
 */
async function loadExperienceFragment(path) {
  try {
    const resp = await fetch(`${path.replace(/\.html$/, '')}.content.html?wcmmode=disabled`);
    if (!resp.ok) return null;
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    const wrapper = doc.querySelector('.nav-wrapper');
    return wrapper ? document.adoptNode(wrapper) : null;
  } catch {
    return null;
  }
}

/**
 * Fallback without an Experience Fragment (e.g. aem.page): the EDS nav fragment content, unstyled.
 * @param {string} navPath fragment path
 * @returns {Promise<Element|null>}
 */
async function loadNavFragment(navPath) {
  const fragment = await loadFragment(navPath);
  if (!fragment) return null;
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-fallback';
  wrapper.append(nav);
  return wrapper;
}

/**
 * Intact header: the header Experience Fragment (AEM header component) set in the `nav`
 * metadata. Markup already server-rendered in the block (template structure) is only bound.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  let nav = block.querySelector('nav#nav');
  if (!nav) {
    const navMeta = getMetadata('nav');
    const navPath = navMeta
      ? new URL(navMeta, window.location).pathname
      : `${window.location.pathname.replace(/\/[^/]*$/, '')}/nav`;
    const wrapper = (navPath.includes('/experience-fragments/') && await loadExperienceFragment(navPath))
      || await loadNavFragment(navPath);
    block.textContent = '';
    if (!wrapper) return;
    block.append(wrapper);
    nav = wrapper.querySelector('nav#nav');
  }
  initHeader(nav);
}
