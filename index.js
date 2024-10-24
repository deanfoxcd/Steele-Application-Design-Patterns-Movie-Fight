const OMDB_KEY = '2bfc8721';
const OMDB_URL = `http://www.omdbapi.com/`;

const fetchData = async (searchTerm) => {
  const response = await axios.get(OMDB_URL, {
    params: {
      apikey: OMDB_KEY,
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const input = document.querySelector('input');

// This function basically allows us to delay any other function we pass in as an argument
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const onInput = (e) => {
  fetchData(e.target.value), 1000;
};

input.addEventListener('input', debounce(onInput, 750));
