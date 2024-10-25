import { debounce, onMovieSelect, fetchData } from './helpers.js';
import { root, movieTemplate } from './markup.js';

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsBlock = document.querySelector('.dropdown-content');

const onInput = async (e) => {
  try {
    const movies = await fetchData(e.target.value);
    console.log(movies);

    if (!movies.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    resultsBlock.innerHTML = '';
    dropdown.classList.add('is-active');

    movies.forEach((mov) => {
      const option = document.createElement('a');
      const imgSrc = mov.Poster === 'N/A' ? '' : mov.Poster;

      option.classList.add('dropdown-item');
      option.innerHTML = `
    <img src="${imgSrc}"/>
    ${mov.Title}
    `;

      option.addEventListener('click', () => {
        input.value = mov.Title;
        dropdown.classList.remove('is-active');
        onMovieSelect(mov.imdbID);
      });
      resultsBlock.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
};

input.addEventListener('input', debounce(onInput, 750));
document.addEventListener('click', (e) => {
  if (!root.contains(e.target)) dropdown.classList.remove('is-active');
});
