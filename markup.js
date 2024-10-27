export const root = document.querySelector('.autocomplete');

export const dropdownRender = `
<label>
<b>Search</b>
</label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
</label>
`;

export const movieTemplate = function (movieDetails) {
  const dollars = Number(movieDetails.BoxOffice.slice(1).replaceAll(',', ''));
  const metaScore = Number(movieDetails.Metascore);
  const imdbScore = parseFloat(movieDetails.imdbRating);
  const imdbNumVotes = Number(movieDetails.imdbVotes.replaceAll(',', ''));

  // My solution
  const awards = movieDetails.Awards.split(' ')
    .filter(Number)
    .map((awd) => Number(awd))
    .reduce((acc, curr) => acc + curr, 0);

  // Course Solution
  //   const awards = movieDetails.Awards.split(' ').reduce((acc, curr) => {
  //     const value = parseInt(curr);

  //     if (isNaN(value)) return acc;
  //     else return acc + value;
  //   }, 0);

  return `
    <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${movieDetails.Poster}" alt="${movieDetails.Title} poster" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1>${movieDetails.Title}</h1>
      <h4>${movieDetails.Genre}</h4>
      <p>${movieDetails.Plot}</p>
    </div>
  </div>
</article>
<article data-value=${awards} class="notification is-primary">
<p class="title">${movieDetails.Awards}</p>
<p class="subtitle">Awards</p>
</article>

<article data-value=${dollars} class="notification is-primary">
<p class="title">${movieDetails.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>

<article data-value=${metaScore} class="notification is-primary">
<p class="title">${movieDetails.Metascore}</p>
<p class="subtitle">Critics' Rating</p>
</article>

<article data-value=${imdbScore} class="notification is-primary">
<p class="title">${movieDetails.imdbRating}</p>
<p class="subtitle">Viewer Rating</p>
</article>

<article data-value=${imdbNumVotes} class="notification is-primary">
  <p class="title">${movieDetails.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
</article>
    `;
};
