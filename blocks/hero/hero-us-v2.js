import { loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * Hero V2 (US-023 Intact Hero Banner, model hero-v2): one field per authored part instead of the
 * single rich text of the V1 hero. Rows follow the hero-v2 model order (classes_* fields are block
 * classes, *Alt / *Text fields are grouped into their image / link cell).
 */
const ROWS = ['desktopImage', 'tabletImage', 'mobileImage', 'video', 'mobileVideo', 'tag', 'pretitle',
  'title', 'description', 'buttons', 'phoneLabel', 'phoneNumber', 'textLink', 'scrollText', 'closingText'];

const IMAGE_VARIANTS = ['center-on-image', 'center-on-solid', 'left-on-image', 'in-container', 'half',
  'center-full-width-image', 'simple-with-image'];
const REVERSED = ['left-on-image', 'center-on-image', 'in-container'];
const LEFT_BY_DEFAULT = ['left-on-image', 'half'];
const DARK_BACKGROUNDS = ['bg-dark', 'bg-red', 'bg-burgundy', 'bg-teal'];

const PHONE_ICON = '<svg class="hero-phone-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>';

const text = (cell) => cell?.textContent.trim() || '';
const isEmpty = (cell) => !cell || (!text(cell) && !cell.querySelector('img, a[href], picture'));

/** element of a single-value cell holding the UE instrumentation (the cell or its wrapped <p>) */
function instrumented(cell) {
  return cell.querySelector('[data-aue-prop]') || cell;
}

/** new element with the text / instrumentation of a text cell */
function fromText(cell, tag, className) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text(cell);
  moveInstrumentation(instrumented(cell), el);
  return el;
}

/** cell kept as is (rich text: the UE rich text instrumentation sits on the cell) */
function keepCell(cell, className) {
  cell.classList.add(className);
  return cell;
}

/** AC-08: nearest authored image per breakpoint, preferring a larger one */
function resolveImages(cells) {
  const img = (cell) => cell?.querySelector('img');
  const desktop = img(cells.desktopImage);
  const tablet = img(cells.tabletImage);
  const mobile = img(cells.mobileImage);
  return {
    desktop: desktop || tablet || mobile,
    tablet: tablet || desktop || mobile,
    mobile: mobile || tablet || desktop,
    source: desktop || tablet || mobile,
  };
}

/** AC-NFR-01 / AC-14: breakpoint-matched <picture>, high fetch priority, not lazy */
function buildPicture(images, alt, decorative) {
  const picture = document.createElement('picture');
  [['(width >= 1024px)', images.desktop], ['(width >= 744px)', images.tablet]].forEach(([media, img]) => {
    const source = document.createElement('source');
    source.media = media;
    source.srcset = img.getAttribute('src');
    picture.append(source);
  });
  const img = document.createElement('img');
  img.src = images.mobile.getAttribute('src');
  img.alt = decorative ? '' : alt;
  img.loading = 'eager';
  img.setAttribute('fetchpriority', 'high');
  img.decoding = 'async';
  moveInstrumentation(images.source, img);
  picture.append(img);
  return picture;
}

const videoHref = (cell) => cell?.querySelector('a[href]')?.getAttribute('href') || text(cell) || '';

/** AC-07, AC-13, AC-15: decorative background video over the fallback image */
function buildVideo(block, media, cells) {
  const desktopSrc = videoHref(cells.video);
  const mobileSrc = videoHref(cells.mobileVideo);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData;
  if ((!desktopSrc && !mobileSrc) || reduced || saveData) return;
  const isMobile = window.matchMedia('(width < 744px)').matches;
  let src = desktopSrc;
  if (isMobile) src = block.classList.contains('desktop-video-on-mobile') ? desktopSrc : mobileSrc;
  if (!src) return;
  const video = document.createElement('video');
  video.className = 'hero-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.setAttribute('aria-hidden', 'true');
  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/mp4';
  video.append(source);
  media.append(video);
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'hero-video-toggle';
  const labels = { pause: block.dataset.pauseLabel || 'Pause background video', play: block.dataset.playLabel || 'Play background video' };
  const sync = () => { toggle.setAttribute('aria-label', video.paused ? labels.play : labels.pause); toggle.classList.toggle('is-paused', video.paused); };
  toggle.addEventListener('click', () => { if (video.paused) video.play(); else video.pause(); sync(); });
  // the fallback image stays the LCP element: start the video once the page has loaded
  const start = () => video.play().then(sync).catch(sync);
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
  sync();
  block.append(toggle);
}

/** button group (US-034 i-button-group): bold paragraph = label, up to 3 buttons */
function buildButtons(cell) {
  const group = document.createElement('div');
  group.className = 'hero-button-group';
  moveInstrumentation(cell, group);
  const label = [...cell.children].find((p) => p.tagName === 'P' && !p.querySelector('a') && p.querySelector('strong'));
  if (label) {
    label.classList.add('hero-group-label');
    group.append(label);
  }
  const row = document.createElement('div');
  row.className = 'hero-buttons';
  [...cell.querySelectorAll('p.button-wrapper')].slice(0, 3).forEach((p) => row.append(p));
  if (row.children.length) group.append(row);
  return group;
}

/** phone CTA: label, fixed icon and number in a single tel: link */
function buildPhone(labelCell, numberCell) {
  const number = text(numberCell);
  const p = document.createElement('p');
  p.className = 'hero-phone';
  const a = document.createElement('a');
  a.href = `tel:${number.replace(/[^\d+]/g, '').replace(/^(?!\+)/, '+1').replace(/^\+1(1\d{10})$/, '+$1')}`;
  a.innerHTML = PHONE_ICON;
  if (labelCell && text(labelCell)) a.append(fromText(labelCell, 'span', 'hero-phone-label'), ' ');
  a.append(fromText(numberCell, 'span', 'hero-phone-number'));
  p.append(a);
  return p;
}

export default async function decorate(block) {
  const cssLoaded = loadCSS(`${window.hlx.codeBasePath}/blocks/hero/hero-us-v2.css`);
  // the variant value carries the V2 marker (AEM turns spaces of a class value into hyphens)
  [...block.classList].filter((c) => c.endsWith('-us-v2')).forEach((c) => {
    block.classList.remove(c);
    block.classList.add(c.slice(0, -'-us-v2'.length), 'us-v2');
  });
  const cells = {};
  [...block.children].forEach((row, i) => {
    if (ROWS[i]) cells[ROWS[i]] = row.firstElementChild || row;
  });
  const rows = [...block.children];
  const has = (c) => block.classList.contains(c);
  if (has('simple-with-image')) block.classList.add('simple-with-illustration');
  const variant = IMAGE_VARIANTS.concat('simple').find(has) || 'left-on-image';
  if (!has(variant)) block.classList.add(variant);
  // AC-05: alignment default by variant, authored value wins
  if (!has('align-left') && !has('align-center')) block.classList.add(LEFT_BY_DEFAULT.includes(variant) ? 'align-left' : 'align-center');
  if (!['title-display', 'title-h1', 'title-h2'].some(has)) block.classList.add('title-display');
  const dark = DARK_BACKGROUNDS.some(has);
  if (REVERSED.includes(variant) || dark) block.classList.add('reversed');

  // media
  const media = document.createElement('div');
  media.className = 'hero-media';
  const images = resolveImages(cells);
  const decorative = has('decorative');
  if (images.source && variant !== 'simple') {
    media.append(buildPicture(images, images.source.getAttribute('alt') || '', decorative));
    buildVideo(block, media, cells);
  } else {
    block.classList.add('no-image');
    // eslint-disable-next-line no-console
    if (variant !== 'simple' && !videoHref(cells.video)) console.warn('hero (us-v2): image variant without media', variant, block.dataset.aueResource || '');
  }

  // lockup (AC-01: empty fields leave no element)
  const lockup = document.createElement('div');
  lockup.className = 'hero-lockup';
  const content = document.createElement('div');
  lockup.append(content);
  const pretitleH1 = has('pretitle-h1') && !isEmpty(cells.pretitle);
  if (has('show-tag') && !isEmpty(cells.tag)) content.append(fromText(cells.tag, 'p', 'hero-tag'));
  if (!isEmpty(cells.pretitle)) content.append(fromText(cells.pretitle, pretitleH1 ? 'h1' : 'p', 'hero-pretitle'));
  if (!isEmpty(cells.title)) {
    // AC-09 / AC-03: h1 unless the pretitle is the page heading; titleSize only styles it (AC-06)
    const heading = document.createElement(pretitleH1 ? 'h2' : 'h1');
    heading.className = 'hero-title';
    const source = cells.title.querySelector('h1, h2, h3, p') || cells.title;
    heading.innerHTML = source.innerHTML;
    heading.querySelectorAll('em').forEach((em) => em.classList.add('hero-emphasis'));
    moveInstrumentation(cells.title, heading);
    content.append(heading);
  }
  if (!isEmpty(cells.description)) content.append(keepCell(cells.description, 'hero-description'));
  if (has('show-buttons') && !isEmpty(cells.buttons)) content.append(buildButtons(cells.buttons));
  if (!isEmpty(cells.phoneNumber)) content.append(buildPhone(cells.phoneLabel, cells.phoneNumber));
  const link = cells.textLink?.querySelector('a[href]');
  if (link) {
    const p = document.createElement('p');
    p.className = 'hero-text-link';
    link.className = 'hero-text-link-a';
    moveInstrumentation(cells.textLink, link);
    p.append(link);
    content.append(p);
  }
  if (!isEmpty(cells.scrollText)) content.append(fromText(cells.scrollText, 'p', 'hero-scroll'));
  if (!isEmpty(cells.closingText)) content.append(keepCell(cells.closingText, 'hero-closing'));

  rows.forEach((row) => row.remove());
  block.prepend(media, lockup);
  // empty state: nothing renderable is suppressed on publish (author keeps the placeholder)
  if (!content.children.length && !images.source && !block.dataset.aueResource) {
    block.closest('.section')?.classList.add('hero-empty');
    block.remove();
  }
  await cssLoaded;
}
