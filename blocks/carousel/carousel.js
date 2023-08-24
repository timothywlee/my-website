export default function decorate(block) {
  // Check if the outermost parent of "block" has the class "dots" and "nav-menu"
  const hasDotsClass = block.classList.contains('dots');
  const hasNavMenuClass = block.classList.contains('nav-menu');
  const hasAutoPlayClass = block.classList.contains('autoplay');
  let buttons;
  let tabContainer; // For storing the tab container element

  if (hasDotsClass || (!hasDotsClass && !hasNavMenuClass)) {
    // Add buttons only if "hasDotsClass" is true
    buttons = document.createElement('div');
    buttons.className = 'carousel-buttons';
  }

  if (hasNavMenuClass) {
    // Add tab container only if "hasNavMenuClass" is true
    tabContainer = document.createElement('div');
    tabContainer.className = 'carousel-tabs';
  }

  // Loop through each child row of the "block"
  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];

    // Add the carousel classes to each child element of the row
    classes.forEach((e, j) => {
      row.children[j].classList.add(`carousel-${e}`);
    });

    if (hasDotsClass || (hasDotsClass && hasNavMenuClass) || (!hasDotsClass && !hasNavMenuClass)) {      
      /* buttons */
      const button = document.createElement('button');
      button.title = 'Carousel Nav';
      if (!i) button.classList.add('selected');
      button.addEventListener('click', () => {
        block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
        [...buttons.children].forEach((r) => r.classList.remove('selected'));
        button.classList.add('selected');
      });

      buttons.append(button);

      block.parentElement.append(buttons);
    }

    if (hasNavMenuClass && !hasDotsClass) {
      /* tabs */
      const tab = document.createElement('div');
      tab.textContent = `Tab ${i + 1}`;
      tab.addEventListener('click', () => {
        block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      });

      tabContainer.append(tab);
      block.parentElement.classList.add('show-nav')
      block.parentElement.append(tabContainer);
    }
  });
}