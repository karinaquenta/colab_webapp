document.addEventListener('DOMContentLoaded', () => {
  const catInfoContainer = document.getElementById('cat-info');
  const loadImageButton = document.getElementById('load-image');

const fetchCatInfo = () => {
  const api_key = 'live_WffqgT0ktSumnSYSuymvgqk2uqsHLEYLQSFTsi1aVv8SlZrxSmCkvBnRQbCxdQZq';

  const randomOrder = 'RAND';
  const hasBreeds = 1;

  fetch(`https://api.thecatapi.com/v1/images/search?order=${randomOrder}&has_breeds=${hasBreeds}`, {
    method: 'GET',
    headers: {
      'x-api-key': api_key
    }
  }) 
    .then(response => response.json())
    .then(catInfo => {
      catInfoContainer.innerHTML = '';

      if (catInfo.length === 0) {
        console.error('No cat data found');
        return;
      }

        const firstCat = catInfo[0];  

        const imageElement = document.createElement('img');
        imageElement.src = firstCat.url;
        
        
        const breedElement = document.createElement('p');
        breedElement.innerHTML = `Type of Cat: ${firstCat.breeds.map(breed => breed.name).join(', ')}`;

        const heightElement = document.createElement('p');
        heightElement.innerHTML = `Temperament:</br> ${firstCat.breeds.map(breed => breed.temperament).join(', ')}`;

        const catInfoDiv = document.createElement('div');
        catInfoDiv.appendChild(imageElement);
        catInfoDiv.appendChild(breedElement);
        catInfoDiv.appendChild(heightElement);

        catInfoContainer.appendChild(catInfoDiv);
      })
      .catch(error => {
      console.error('Error fetching cat info:', error);
    });
};

  loadImageButton.addEventListener('click', fetchCatInfo);
});