const rows = document.querySelector('.rows');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelected = document.getElementById('movie');

let ticketPrice = +movieSelected.value; // parseInt

populateUI();

function calculatePrice() {
  const numberOfSelectedSeats = document.querySelectorAll(
    '.row .seat.selected'
  );
  const seatsIndex = [...numberOfSelectedSeats].map((seat) => [
    [...seats].indexOf(seat),
  ]);
  localStorage.setItem('selectedSeatsIndex', JSON.stringify(seatsIndex));
  count.innerText = numberOfSelectedSeats.length;
  total.innerText = `$${numberOfSelectedSeats.length * ticketPrice}`;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
  console.log(selectedSeats.length);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  if (localStorage.getItem('movieIndex') !== null) {
    movieSelected.selectedIndex = localStorage.getItem('movieIndex');
  }
}

movieSelected.addEventListener('change', (e) => {
  ticketPrice = e.target;
  localStorage.setItem('movieIndex', e.target.selectedIndex);
  localStorage.setItem('moviePrice', e.target.value);
  calculatePrice();
});

rows.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    calculatePrice();
  }
});

calculatePrice();
