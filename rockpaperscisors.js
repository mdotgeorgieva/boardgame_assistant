//Variables

let rps = document.getElementById('rpsChoose');
let rpsSavedNumber;
let rpsResults = [];
let playerName;
let inputs = document.getElementsByClassName('playerName');
let playerResult;
let displayResults= document.getElementById('rspResults');
let nameList = [];
let winnerList = [];
let submitName;
let savedName;
let j = 1;

//Save number of players

let rpsNumber = () => {
	let rpsNumberValue = document.getElementById('rpsNumber').selectedIndex;
	rpsSavedNumber =document.getElementsByClassName('numberOfPlayers')[rpsNumberValue].value;
	return rpsSavedNumber;
}

//Promtp for names

let addInput = () => {
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

//Remove input fields

let removeInput = () => {
	while(inputs.length > 0){
		inputs[0].parentNode.removeChild(inputs[0]);
	}
	submitName.remove();
}


// Randomizer

let random = () => {
	let randomNumber = Math.floor(Math.random() * (4-1) + 1)
	rpsResults.push(randomNumber);
	console.log(rpsResults);
}

let rpsRandomizer = () => {
	for(let i = 0; i < rpsSavedNumber; i++){
		random();
	}
}

let printResult = (x) => {
	playerResult = document.createElement("p");
	playerResult.setAttribute("class", "playerResults")
	if (rpsResults[x] === 1){
		playerResult.innerHTML = nameList[x] + " избра камък";
		displayResults.appendChild(playerResult);
	}else if (rpsResults[x] === 2){
		playerResult.innerHTML = nameList[x] + " избра ножица";
		displayResults.appendChild(playerResult);
	}else {
		playerResult.innerHTML = nameList[x] +  " избра хартия";
		displayResults.appendChild(playerResult);
	}
}

//Logical operator

let findWinner = () => {
	while (rpsResults.length > 1){
		displayResults.append(document.createTextNode("Рунд " + j))

		if(rpsResults.includes(1) && rpsResults.includes(2) && rpsResults.includes(3)){
			for (let i = 0; i < rpsSavedNumber; i++){
				printResult(i);
			}
			rpsResults= [];
			j++
		}

		else{
			let i = 0;
			rpsResults.forEach(function(e){
				e === 1? rpsResults.includes(3)? printResult(i)
												: (printResult(i), winnerList.push(nameList[i])) 
				:e ===2? rpsResults.includes(1)? printResult(i) 
												: (printResult(i), winnerList.push(nameList[i])) 
				:rpsResults.includes(2)? printResult(i) 
												: (printResult(i), winnerList.push(nameList[i])) 
				i++
			})
			nameList = winnerList;
			j++	
		} 
		if(winnerList.length === 1){
			console.log(winnerList[0] + " печели")
			displayResults.append(document.createTextNode(winnerList[0] + " печели"));
		}
		rpsSavedNumber = nameList.length;
		rpsResults= [];
		winnerList = [];
		rpsRandomizer(); 
	}
}

//Onclick

rps.onclick = () => {
	rpsNumber();
	if(inputs.length>0){
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
		findWinner();

	
	}
} 