import { dropdownRender } from './markup.js';
import { fetchData, debounce } from './helpers.js';

export const createAutoComplete = function ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  onFetchData,
}) {
  root.innerHTML = dropdownRender;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsBlock = root.querySelector('.dropdown-content');

  const onInput = async (e) => {
    try {
      const items = await fetchData(e.target.value);
      //   console.log(items);

      if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
      }

      resultsBlock.innerHTML = '';
      dropdown.classList.add('is-active');

      items.forEach((item) => {
        const option = document.createElement('a');

        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');
          input.value = inputValue(item);
          onOptionSelect(item.imdbID);
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
};
