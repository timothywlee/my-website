export default function decorate(block) {
  [...block.children].forEach((row) => [...row.children].forEach((elem) => {
    // add teaser class for each entry
    elem.classList.add('teaser');
    if (elem.querySelector('.cta-list')) {
      elem.classList.add('with-cta-list');
    }
    // give p containing the image a specific class of 'image'
    const picture = elem.querySelector('picture');
    if (picture && picture.closest('p')) picture.closest('p').classList.add('image');

    // give all the remaining p a specific class of 'text'
    elem.querySelector('p:not(.image, .button-container)')?.classList.add('text');

    // give cta's link(s) a specific class name
    const ctaLinks = elem.querySelectorAll('.button-container a.button');
    ctaLinks.forEach((cta) => {
      cta.classList.remove('primary');
      cta.classList.add('secondary');
    });
  }));
}