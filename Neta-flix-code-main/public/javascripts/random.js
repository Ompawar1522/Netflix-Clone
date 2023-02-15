window.onpaint = setStars();

movies = document.querySelectorAll('.movie-box');
randomise = document.querySelector('#randomise');
resultBox = document.querySelector('#result-box');
watch= document.querySelector('.watch');
watchedList = localStorage.getItem('watchedList');
stars = document.getElementById('stars');

// updatedWatchList = [];
// if (watchedList != "") {
//     watchedList = JSON.parse(watchedList);

//     watchedList.forEach(watched => {
//         movies.forEach(movie => {
//             if (movie.id == watched) {
//                 movie.classList.add('watched');
//             }
//         });
//         updatedWatchList.push(watched);
//     });
// }

function setStars() {
    gsap.set('#stars > *',{ scale: 0, y: -32, transformOrigin: "50% 50%" });
}



movies.forEach(movie => {
    movie.addEventListener('click', ()=> {
        if (movie.classList.contains('watched')) {
            movie.classList.remove('watched');
            // updatedWatchList = updatedWatchList.filter(e => e !== movie.id);
        } else {
            movie.classList.add('watched');
            // updatedWatchList.push(movie.id)
        }
        
        // localStorage.setItem("watchedList", JSON.stringify(updatedWatchList));
    });
});

const randomiseMovie = (movies) => {
    var random = Math.floor((Math.random() * movies.length));

    resultBox.innerHTML = movies[random].innerHTML;
    
}

const starburst = () => {
    gsap.fromTo('#stars > *', { scale: 0.05, y: -32, x: 0 }, { 
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        scale: 0,
        duration: 2
     });
  gsap.fromTo('#result-box', { scale: 0, transformOrigin: "50% 50%" }, 
    { scale: 1, transformOrigin: "50% 50%" });
}


randomise.addEventListener('click', () => {
    var movies = document.querySelectorAll('.movie-box:not(.watched)');

    randomiseMovie(movies);
    starburst();
});

