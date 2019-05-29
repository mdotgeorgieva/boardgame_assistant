//Varialbles

const diceImage = document.getElementById("diceImg");
const rpsImage = document.getElementById("rpsImg");

const diceSection = document.getElementById("diceSection");
const rpsSection = document.getElementById("rpsSection");

//Toggle "hidden"
diceImage.onclick = () => {
    if(rpsSection.classList.contains("hidden") == false){
        diceSection.classList.toggle("hidden");
    }
    diceSection.classList.toggle("hidden");
}

rpsImage.onclick = () => {
    if(diceSection.classList.contains("hidden") == false){
        diceSection.classList.toggle("hidden");
    }
    rpsSection.classList.toggle("hidden");
}
