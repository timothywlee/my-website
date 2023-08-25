export default function decorate(block) {
  const hasDotsClass = block.classList.contains('dots');
  const hasNavMenuClass = block.classList.contains('navmenu');
  const hasAutoPlayClass = block.classList.contains('autoplay');

  const leftArrowEntity = '\u2190'; 
  const rightArrowEntity = '\u2192'; 

  let buttons;
  let tabContainer;
  let arrowLeft;
  let arrowRight;
  let autoplayInterval;
  let tabs = [];
  let selectedTabIndex = 0;

  function createDots() {
    buttons = document.createElement('div');
    buttons.className = 'carousel-buttons';
  }

  function createNavMenu() {
    tabContainer = document.createElement('div');
    tabContainer.className = 'carousel-tabs';
    arrowLeft = document.createElement('button');
    arrowLeft.className = 'carousel-arrow-left';
    arrowLeft.textContent = leftArrowEntity;
    arrowRight = document.createElement('button');
    arrowRight.className = 'carousel-arrow-right';
    arrowRight.textContent = rightArrowEntity;
    tabContainer.append(arrowLeft);
  }

  function initNavMenuEventListeners() {
    arrowLeft.addEventListener('click', () => {
      selectedTabIndex = (selectedTabIndex - 1 + tabs.length) % tabs.length;
      tabs[selectedTabIndex].click();
    });

    arrowRight.addEventListener('click', () => {
      selectedTabIndex = (selectedTabIndex + 1) % tabs.length;
      tabs[selectedTabIndex].click();
    });
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      selectedTabIndex = (selectedTabIndex + 1) % tabs.length;
      tabs[selectedTabIndex].click();
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  if (hasDotsClass || (!hasDotsClass && !hasNavMenuClass)) {
    createDots();
  }

  if (hasNavMenuClass && !hasDotsClass) {
    createNavMenu();
  }

  /* Loop through each child row of the "block" */
  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    let tabTitle = '';

    /* Add the carousel classes to each child element of the row */
    classes.forEach((e, j) => {
      row.children[j].classList.add(`carousel-${e}`);
      
      if (row.children[j].classList.contains("carousel-image")) {
        const secondChild = row.children[j].children[1];
        if (secondChild) {
          tabTitle = secondChild.textContent;
          secondChild.classList.add("tab-title");
          secondChild.style.display = "none";
        }
      }
    });

    /* Create dots navigation */
    if (hasDotsClass || (hasDotsClass && hasNavMenuClass) || (!hasDotsClass && !hasNavMenuClass)) {      
      const button = document.createElement('button');
      button.title = 'Carousel Nav';
      if (!i) button.classList.add('selected');
      button.addEventListener('click', () => {
        selectedTabIndex = i;
        block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
        [...buttons.children].forEach((r) => r.classList.remove('selected'));
        button.classList.add('selected');

        tabs[selectedTabIndex].click(); // Trigger tab click when dot is clicked
      });

      buttons.append(button);
      block.parentElement.append(buttons);
      tabs.push(button); // Add button to tabs array

    }

    /* Create nav menu */
    if (hasNavMenuClass && !hasDotsClass) {
      const tab = document.createElement('div');
      tab.classList.add('navmenu-tab');
      tab.textContent = `${tabTitle}`;

      if (!i) tab.classList.add('active');

      tab.addEventListener('click', () => {
        selectedTabIndex = i;
        block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });

        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
      });

      tabs.push(tab);
      tabContainer.append(tab);
      block.parentElement.classList.add('show-nav');
    }
  });

  if (hasNavMenuClass && !hasDotsClass) {
    initNavMenuEventListeners();
    block.parentElement.append(tabContainer);
    tabContainer.append(arrowRight);
  }

  if (hasAutoPlayClass) {
    startAutoplay();

    /* Pause autoplay when hovering over the carousel */
    block.addEventListener('mouseover', stopAutoplay);

    /* Resume autoplay when mouse leaves the carousel */
    block.addEventListener('mouseout', startAutoplay);
  }
}

/*
  Remaining tasks for completion;
    1. If more than 3 slides, add a horizontal scrollbar
    2. Images in mobile need to be different (not responsive since banner image is too large)
*/