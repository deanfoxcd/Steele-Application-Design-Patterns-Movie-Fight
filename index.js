import { debounce } from './helpers.js';
import { OMDB_KEY, OMDB_URL } from './config.js';

const fetchData = async (searchTerm) => {
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        apikey: OMDB_KEY,
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  } catch (err) {
    console.error(err);
  }
};

const input = document.querySelector('input');

const onInput = async (e) => {
  try {
    const movies = await fetchData(e.target.value);
    console.log(movies);
    movies.forEach((mov) => {
      const div = document.createElement('div');

      div.innerHTML = `
    <img src="${mov.Poster}"/>
    <h1>${mov.Title}</h1>
    `;
      document.querySelector('#target').appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
};

input.addEventListener('input', debounce(onInput, 750));
