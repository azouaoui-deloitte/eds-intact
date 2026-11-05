/**
 * Hero (Figma i-hero > .intact-hero-lockup > i-button-group).
 * Rows: image, text (heading, optional group label, buttons, optional phone line).
 * @param {Element} block
 */
export default function decorate(block) {
  block.classList.add('reversed');
  const [imageRow, textRow] = [...block.children];
  imageRow?.classList.add('hero-media');
  const content = textRow?.firstElementChild;
  if (!content) return;
  textRow.classList.add('hero-lockup');

  const buttons = [...content.querySelectorAll(':scope > p.button-wrapper')];
  if (buttons.length) {
    const group = document.createElement('div');
    group.className = 'hero-button-group';
    const label = buttons[0].previousElementSibling;
    if (label && label.tagName === 'P' && !label.classList.contains('button-wrapper')) {
      label.classList.add('hero-group-label');
      group.append(label);
    }
    const row = document.createElement('div');
    row.className = 'hero-buttons';
    buttons[0].before(group);
    row.append(...buttons);
    group.append(row);
    const phone = group.nextElementSibling;
    if (phone && phone.tagName === 'P') phone.classList.add('hero-phone');
  }
}
