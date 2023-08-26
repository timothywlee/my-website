export default function decorate(block) {
  block.style.display = 'none';
  const link = block.querySelector('.button.primary');
  let jsonPath = '';
  let data = [];

  async function checkForJson() {
    if (link) {
      jsonPath = link.getAttribute('href');
      const response = await fetch(jsonPath);

      if (response.ok) {
        const jsonData = await response.json();
        data = jsonData?.data;
        return true;
      } else {
        console.error("Failed to fetch JSON data");
        return false;
      }
    }
  }

  function modifyHTML() {
    // Remove the existing inner HTML
    block.innerHTML = '';

    // Create a new div element with the class "articles-container"
    const articlesContainer = document.createElement('div');
    articlesContainer.className = 'articles-container';

    // Create a new ul element
    const list = document.createElement('ul');

    data.forEach(item => {
      const liElement = document.createElement('li');
      liElement.className = 'article-item';

      const divElement = document.createElement('div');

      const aElement = document.createElement('a');
      aElement.href = item.Url;
      aElement.textContent = item.Title;

      divElement.appendChild(aElement);
      liElement.appendChild(divElement);

      // Append the liElement to the ul element
      list.appendChild(liElement);
    });

    // Append the ul element to the articles container
    articlesContainer.appendChild(list);

    // Append the new div element to the articles block
    block.appendChild(articlesContainer);
    block.style.display = '';

  }

  async function initialize() {
    const hasData = await checkForJson();
    
    /*if data is true, continue decorating block*/
    if (hasData) {
      modifyHTML();
    }
  }

  initialize();
};