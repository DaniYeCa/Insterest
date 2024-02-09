import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>The gallery</h1>
  <div id="exploreContainer">
    <div class="InputContainer">
      <input placeholder="flowers, morning..." id="input" class="input" name="text" type="text">
    </div>      
  </div>
  <div id="imageContainer" class="container"></div>
  <footer>
    <div class="footer-content">
      <p>&copy; 2024 The gallery</p>
      <p>Created by <a target="_blank" href="https://www.linkedin.com/in/daniel-yepes-carrillo/>A">Daniel yepes</a></p>
    </div>
  </footer>
`;

const KEY = 'vVjaPjWYb_zYnrwj3oQYCN4IShMto-Wv9WTuqkQ7_ns';

const imageContainer = document.getElementById('imageContainer');
const inputValue = document.getElementById('input');
const exploreContainer = document.getElementById('exploreContainer');

const buttonExplore = document.createElement('button');
buttonExplore.textContent = "search";
buttonExplore.classList.add('exploreButton');
const buttonReset = document.createElement('button');
buttonReset.textContent = "Inicio";
buttonReset.classList.add('resetButton');
exploreContainer.appendChild(buttonExplore);
exploreContainer.appendChild(buttonReset);

const exploreImages = async () => {
  const REQUEST = inputValue.value;
  const PATH = `https://api.unsplash.com/search/photos?&per_page=50&query=${REQUEST}&client_id=${KEY}`;

  try {
    const response = await fetch(PATH);
    const data = await response.json();
    showingImages(data.results);
  } catch (error) {
    console.log('error');
  }
};

const showingImages = (images) => {
  imageContainer.innerHTML = '';

  if (images.length === 0) {
    const alertMessage = document.createElement('h3');
    alertMessage.textContent = "No se encontraron imagenes relacionadas";
    alertMessage.classList.add('alert-message');
    imageContainer.appendChild(alertMessage);
  } else {
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.urls.regular;
      imageContainer.appendChild(imgElement);
    });
  }
};


const resetContent = () => {
  inputValue.value = 'random-image';
  exploreImages();
};


buttonExplore.addEventListener('click', exploreImages);
buttonReset.addEventListener('click', resetContent);

window.addEventListener('DOMContentLoaded', () => {
  inputValue.value = 'random-image';
  exploreImages();
});