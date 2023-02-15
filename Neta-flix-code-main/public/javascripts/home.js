const main = document.querySelector('.main');
const featured = document.getElementById('featured');
const banner = document.getElementById('banner');


fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err =>  console.log(err));

}



const makeCategoryElement = (category, data) => { 
    main.innerHTML += `
    <div class="movie-list">

        <button class="pre-btn"><img src="img/pre.png" alt=""></button>

        <h1 class="movie-category">${category.split("_").join(" ")}</h1>

        <div class="movie-container" id="${category}">

        </div>

        <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>

    </div>
    `;
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
    })
}
const movie_selector = () => {

fetch(`${movie_trending_http}` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    rand = Math.floor(Math.random() * 20) 
    makebg(data.results[rand])

})
}

movie_selector()

const makebg = ( data) => {
    banner.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;

   featured.innerHTML += `<div class="w-90" onclick="location.href = '/${data.id}'">
   <h3 onclick="location.href = '/${data.id}'><span class="n">N</span>Movies</h3>
   <h2>${data.original_title}</h2>
   <h3>${data.release_date}</h3>
   <p>
      ${data.overview.substring(0, 200) + '...'}
   </p>
   </div>`
   
    
}