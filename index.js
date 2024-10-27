import { onMovieSelect, fetchData } from './helpers.js';
import { root } from './markup.js';
import { createAutoComplete } from './autocomplete.js';

// const input = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsBlock = document.querySelector('.dropdown-content');

// const onInput = async (e) => {
//   try {
//     const movies = await fetchData(e.target.value);
//     console.log(movies);

//     if (!movies.length) {
//       dropdown.classList.remove('is-active');
//       return;
//     }

//     resultsBlock.innerHTML = '';
//     dropdown.classList.add('is-active');

//     movies.forEach((mov) => {
//       const option = document.createElement('a');
//       const imgSrc = mov.Poster === 'N/A' ? '' : mov.Poster;

//       option.classList.add('dropdown-item');
//       option.innerHTML = `
//     <img src="${imgSrc}"/>
//     ${mov.Title}
//     `;

//       option.addEventListener('click', () => {
//         dropdown.classList.remove('is-active');
//         input.value = mov.Title;
//         onMovieSelect(mov.imdbID);
//       });
//       resultsBlock.appendChild(option);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

const autocompleteConfig = {
  renderOption: (mov) => {
    const imgSrc = mov.Poster === 'N/A' ? '' : mov.Poster;
    return `
          <img src="${imgSrc}"/>
          ${mov.Title}
          (${mov.Year})
          `;
  },

  inputValue(mov) {
    return mov.Title;
  },
  onFetchData(searchTerm) {
    fetchData(searchTerm);
  },
};

createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(mov) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(mov, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(mov) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(mov, document.querySelector('#right-summary'), 'right');
  },
});
