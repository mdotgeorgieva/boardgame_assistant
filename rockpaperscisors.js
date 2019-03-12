//Variables

let rps = document.getElementById('rpsChoose');
let rpsSavedNumber;
let rpsResults = [];
let playerName;
let elements = document.getElementsByClassName('playerName');
let nameList = [];
let winnerList = [];
let submitName;
let savedName;

//Save number of players

let rpsNumber = function(){
	let rpsNumberValue = document.getElementById('rpsNumber').selectedIndex;
	rpsSavedNumber =document.getElementsByClassName('numberOfPlayers')[rpsNumberValue].value;
	return rpsSavedNumber;
}

//Promtp for names

let addInput = function() {
	rpsNumber();
	let addName = document.getElementById('rspNames');
	for (let i = 0; i < rpsSavedNumber; i++){
		playerName = document.createElement("input");
		playerName.setAttribute("type", "text");
		playerName.setAttribute("name", "playerName");
		playerName.setAttribute("class", "playerName");
		playerName.setAttribute("id", "playerName" + i);
		playerName.setAttribute("placeholder", "Име на участник")
		addName.appendChild(playerName);
	}

	submitName = document.createElement("button");
	submitName.setAttribute("id", "submitName");
	let buttonText = document.createTextNode("Потвърди");
	submitName.appendChild(buttonText);
	addName.appendChild(submitName);
}

//Remove unput fields

let removeInput = function(){
	while(elements.length > 0){
		elements[0].parentNode.removeChild(elements[0]);
	}
	submitName.remove();
}

// Randomizer

let random= function(){
	let randomNumber = Math.floor(Math.random() * (4-1) + 1)
	rpsResults.push(randomNumber);
	console.log(rpsResults);
}

function rpsRandomizer(){
	for(let i = 0; i<rpsSavedNumber; i++){
		random();
	}
}

//Onclick

rps.onclick = function(){
	rpsNumber();
	if(elements.length>0){
		removeInput();
		addInput();
	}
	else{
		addInput();
	}

	//Submmit and save names to array
	let names = document.getElementById('submitName');
	names.onclick = function(){
		for(let i = 0; i < rpsSavedNumber; i++){
			savedName = document.getElementById("playerName" + i).value;
			nameList.push(savedName);
			console.log(nameList);
		}

		//randomize results
		rpsRandomizer();

		//logical operator
		while (rpsResults.length > 1){
			if(rpsResults.includes(1) && rpsResults.includes(2) && rpsResults.includes(3)){
				rpsResults= [];
				rpsRandomizer();
			} 

			else{
				let i = 0;
				rpsResults.forEach(function(e){
					e === 1? rpsResults.includes(3)? console.log(nameList[i] + " губи") : winnerList.push(nameList[i]) 
					:e ===2? rpsResults.includes(1)? console.log(nameList[i] + " губи") : winnerList.push(nameList[i]) 
					:rpsResults.includes(2)? console.log(nameList[i] + " губи") : winnerList.push(nameList[i]) 
					i++
				})
				nameList = winnerList;	
			} 
			if(winnerList.length === 1){
				console.log(winnerList[0] + " печели")
			}
			rpsSavedNumber = nameList.length;
			rpsResults= [];
			winnerList = [];
			rpsRandomizer();
		}
	}
}