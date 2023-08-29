export default function decorate(block) {
  const linkCardsBlock = block;

  // Get all the individual link cards
  const cardElements = linkCardsBlock.querySelectorAll('div[data-block-name="link-cards"] > div');

  cardElements.forEach(card => {
    const buttonContainer = card.querySelector('.button-container');
    const imageContainer = card.querySelector('picture');
    const link = buttonContainer.querySelector('a');

    const itemDiv = document.createElement('div');
    const itemImgDiv = document.createElement('div');
    const itemContentDiv = document.createElement('div'); // New div to wrap itemImgDiv and itemTitleP
    const itemTitleP = document.createElement('p');

    itemDiv.classList.add('item');
    itemImgDiv.classList.add('item-img');
    itemTitleP.classList.add('item-title');

    itemTitleP.textContent = link.title;

    // Remove classes from link
    while (link.classList.length > 0) {
      link.classList.remove(link.classList.item(0));
    }

    itemImgDiv.appendChild(imageContainer);
    itemContentDiv.appendChild(itemImgDiv);
    itemContentDiv.appendChild(itemTitleP);

    // Wrap the itemContentDiv with the link element
    link.textContent = '';
    link.appendChild(itemContentDiv);

    // Remove the existing content from the card
    card.textContent = '';

    // Append the link element to the itemDiv
    itemDiv.appendChild(link);
    
    // Replace the original card with the new itemDiv
    card.parentNode.replaceChild(itemDiv, card);
  });
}