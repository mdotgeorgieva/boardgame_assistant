//Variables

let savedType;
let savedNumber;
const rollDice = document.getElementById('choose');
let diceResults = [];
const diceDisplayResults = document.getElementById('diceResults');

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
		diceResults.push(randomNumber);
		console.log(diceResults);
		return diceResults;
	}


//Display results

let diceDivs = (x) => {
	let diceDiv = document.createElement('div');
	diceDiv.setAttribute('id', 'diceResult' + x);
	diceDiv.setAttribute('class', 'diceResult');
	diceDisplayResults.appendChild(diceDiv);
}

let dicePrintResults = (x) =>{
	let dicePlayerResult = document.createElement('img');
	dicePlayerResult.setAttribute('class', 'diceImage')
	let y = document.getElementById('diceResult' + x)
	switch(diceResults[x]){
		case 1:
		dicePlayerResult.setAttribute('src', 'images/dice/one.svg');
		y.appendChild(dicePlayerResult);
		break;

		case 2:
		dicePlayerResult.setAttribute('src', 'images/dice/two.svg');
		y.appendChild(dicePlayerResult);
		break;

		case 3:
		dicePlayerResult.setAttribute('src', 'images/dice/three.svg');
		y.appendChild(dicePlayerResult);
		break;

		case 4:
		dicePlayerResult.setAttribute('src', 'images/dice/four.svg');
		y.appendChild(dicePlayerResult);
		break;

		case 5:
		dicePlayerResult.setAttribute('src', 'images/dice/five.svg');
		y.appendChild(dicePlayerResult);
		break;

		case 6:
		dicePlayerResult.setAttribute('src', 'images/dice/six.svg');
		y.appendChild(dicePlayerResult);
		break;
	}
}

//Onclick

rollDice.onclick = function() {
	chooseNumber();
	chooseType();
	for(let i = 0; i < savedNumber; i++){
		randomizer();
		diceDivs(i);
		dicePrintResults(i);
	}
	diceResults = [];
} 
