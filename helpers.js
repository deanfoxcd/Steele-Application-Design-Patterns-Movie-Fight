import { OMDB_KEY, OMDB_URL } from './config.js';
import { movieTemplate } from './markup.js';

export const fetchData = async (searchTerm) => {
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

let movieLeft;
let movieRight;
export const onMovieSelect = async function (movieId, summary, position) {
  const selectedMovie = await axios.get(OMDB_URL, {
    params: {
      apikey: OMDB_KEY,
      i: movieId,
    },
  });
  summary.innerHTML = movieTemplate(selectedMovie.data);

  position === 'left'
    ? (movieLeft = selectedMovie.data)
    : (movieRight = selectedMovie.data);

  if (movieLeft && movieRight) {
    runComparison(movieLeft, movieRight);
  }
};

const runComparison = function () {
  const leftSummary = document.querySelectorAll('#left-summary .notification');
  const rightSummary = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSummary.forEach((leftStat, i) => {
    const rightStat = rightSummary[i];

    const leftValue = parseFloat(leftStat.dataset.value);
    const rightValue = parseFloat(rightStat.dataset.value);

    if (leftValue > rightValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};

// This function basically allows us to delay any other function we pass in as an argument
export const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
