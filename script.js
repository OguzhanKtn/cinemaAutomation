const container = document.querySelector(".container");
const count = document.getElementById("count");
const movie = document.getElementById("movie");
const cost = document.getElementById("cost");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click",function(e){

if(movie.value==""){
    window.alert("Please select a movie");
}else if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected");
        
        calculateTotal();
        
    }
});

movie.addEventListener("change",function(e){

    calculateTotal();
})

function calculateTotal(){
    let selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    })

    seats.forEach(function(seat){
        seatsArr.push(seat);
    })  

    let selectedSeatIndex = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    let costAmount = selectedSeatCount * movie.value;
    cost.innerText = costAmount;

    saveToLocalStorage(selectedSeatIndex);
    
}

function saveToLocalStorage(index){
    localStorage.setItem("selectedSeats",JSON.stringify(index));
    localStorage.setItem("selectedMovie",movie.selectedIndex);
}

function getFromLocalStorage(){

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    seats.forEach(function(seat,index){
        if(selectedSeats.indexOf(index) > -1){
            seat.classList.add("selected");
        }
    })

       
    

    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovie"));

    if(selectedMovieIndex != null){
        movie.selectedIndex = selectedMovieIndex;
    }

    
}