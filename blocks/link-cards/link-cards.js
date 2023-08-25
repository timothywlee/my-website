export default function decorate(block) {
  // Get the parent container element
  const linkCardsBlock = block;

  // Get all the individual card elements
  const cardElements = linkCardsBlock.querySelectorAll('div[data-block-name="link-cards"] > div');

  // Loop through each card element and modify its structure
  cardElements.forEach(card => {
    // Get the necessary elements within the card
    const buttonContainer = card.querySelector('.button-container');
    const imageContainer = card.querySelector('picture');
    const link = buttonContainer.querySelector('a');

    // Create new elements for the modified structure
    const itemDiv = document.createElement('div');
    const itemImgDiv = document.createElement('div');
    const itemContentDiv = document.createElement('div'); // New div to wrap itemImgDiv and itemTitleP
    const itemTitleP = document.createElement('p');

    // Add appropriate classes to the new elements
    itemDiv.classList.add('item');
    itemImgDiv.classList.add('item-img');
    itemTitleP.classList.add('item-title');

    // Assign the title 
    itemTitleP.textContent = link.title;

    // Remove classes from link
    while (link.classList.length > 0) {
      link.classList.remove(link.classList.item(0));
    }

    // Move the imageContainer into the itemImgDiv
    itemImgDiv.appendChild(imageContainer);

    // Append itemImgDiv and itemTitleP to the new itemContentDiv
    itemContentDiv.appendChild(itemImgDiv);
    itemContentDiv.appendChild(itemTitleP);

    // Wrap the itemContentDiv with the link element
    link.textContent = '';
    link.appendChild(itemContentDiv);

    // Remove the existing content from the card
    card.textContent = '';

    // Append the link element to the itemDiv
    itemDiv.appendChild(link);

    // Append the modified itemDiv to the card
    card.parentNode.replaceChild(itemDiv, card); // Replace the original card with the new itemDiv
  });
}