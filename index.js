let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('bx-x,');
    navbar.classList.toggle('active');
};




const sr = ScrollReveal({
    origin:'top',
    distance:'40px',
    duration:1000,
    reset:true

});

ScrollReveal().reveal('.home,.container6,.service,.join-us,.movie-reviews,.search-movies');


// Sample movie review data
const movieReviews = [
    {
        title: "Friday the 13th",
        image: "poster.jpg",
        rating: "9.3",
        review: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        title: "Halloween",
        image: "poster2.jpg",
        rating: "9.2",
        review: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
        title: "Scream",
        image: "poster3.jpg",
        rating: "9.0",
        review: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham."
    }
];

// Function to render movie reviews
function renderMovieReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = '';

    movieReviews.forEach(review => {
        const card = document.createElement('div');
        card.classList.add('review-card');

        const image = document.createElement('img');
        image.src = review.image;

        const title = document.createElement('h3');
        title.textContent = review.title;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${review.rating}`;

        const reviewText = document.createElement('p');
        reviewText.textContent = review.review;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(rating);
        card.appendChild(reviewText);

        reviewsContainer.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', renderMovieReviews);

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');


async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display search results
function displayResults(results) {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.textContent = 'No results found.';
        return;
    }

    results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        `;
        resultsContainer.appendChild(movieElement);
    });
}

// Event listener for search button click
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a movie title.');
        return;
    }

    const results = await searchMovies(query);
    displayResults(results);
});

