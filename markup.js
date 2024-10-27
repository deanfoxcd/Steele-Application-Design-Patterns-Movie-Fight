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

// root.innerHTML = `
// <label>
// <b>Search For a Movie</b>
// </label>
//   <input class="input" />
//   <div class="dropdown">
//     <div class="dropdown-menu">
//       <div class="dropdown-content results"></div>
//     </div>
//   </div>
// </label>
// `;

export const movieTemplate = function (movieDetails) {
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
<article class="notification is-primary">
<p class="title">${movieDetails.Awards}</p>
<p class="subtitle">Awards</p>
</article>

<article class="notification is-primary">
<p class="title">${movieDetails.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>

<article class="notification is-primary">
<p class="title">${movieDetails.Metascore}</p>
<p class="subtitle">Critics' Rating</p>
</article>

<article class="notification is-primary">
<p class="title">${movieDetails.imdbRating}</p>
<p class="subtitle">Viewer Rating</p>
</article>

<article class="notification is-primary">
  <p class="title">${movieDetails.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
</article>
    `;
};
