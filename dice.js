//Variables

let savedType;
let savedNumber;
let rollDice = document.getElementById('choose');
let results = [];

//Save number of dice

let chooseNumber = function() {
	let numberValue = document.getElementById('diceNumber').selectedIndex;
	savedNumber = document.getElementsByClassName('numberOfDice')[numberValue].value;
	return savedNumber;
}

//Save type of die

let chooseType = function() {
	let typeValue = document.getElementById('diceType').selectedIndex;
	savedType = document.getElementsByClassName('typeOfDie')[typeValue].value;
	return savedType;
}

//Pick a number

let randomizer = function() {
		let randomNumber = Math.floor(Math.random() * savedType + 1);
		results.push(randomNumber);
		console.log(results);
		return results;
	}


//Display results



//Onclick

rollDice.onclick = function() {
	chooseNumber();
	chooseType();
	for(let i = 0; i < savedNumber; i++){
		randomizer();
	}
	results = [];
} 
