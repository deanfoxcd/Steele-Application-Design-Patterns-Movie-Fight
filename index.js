import { onMovieSelect, fetchData } from './helpers.js';
import { createAutoComplete } from './autocomplete.js';

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
