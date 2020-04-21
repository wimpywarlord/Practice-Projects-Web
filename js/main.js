const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = movieSelect.value;

// SET MOV IE DATA FUNCTION , SAVE SELECTED MOVIE INDEX
function setMovieData(movieIndex, moviePrice) {
    // console.log(movieIndex, moviePrice);
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update Total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // copy selected seats into arr
    // Map through array
    // return new array of indexes

    let seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    // console.log(seatsIndex);

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    // console.log(selectedSeats);
    const selectedSeatsCount = selectedSeats.length;

    // console.log(selectedSeatsCount);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// GET DATA FROM LOCAL STORAGE AND POPULATE UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// MOVIE SELECT EVENT
movieSelect.addEventListener("change", (event) => {
    ticketPrice = event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
});

container.addEventListener("click", function (e) {
    // console.log(e.target);
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();
