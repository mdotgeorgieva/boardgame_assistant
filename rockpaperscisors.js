//Variables

let rps = document.getElementById('rpsChoose');
let rpsDynamicNumber;
let rpsSavedNumber;
let rpsResults = [];
let playerName;
let addName = document.getElementById('rspNames');
let inputs = document.getElementsByClassName('playerName');
let playerResult;
let displayResults= document.getElementById('rspResults');
let dynamicNameList = [];
let nameList=[];
let winnerList = [];
let submitName;
let continueGame;
let savedName;
let roundCounter = 1;
let rpsWinners = [];
let losersArray;

//Save number of players

let rpsNumber = () => {
	let rpsNumberValue = document.getElementById('rpsNumber').selectedIndex;
	rpsDynamicNumber =document.getElementsByClassName('numberOfPlayers')[rpsNumberValue].value;
	rpsSavedNumber = rpsDynamicNumber;
	return rpsDynamicNumber;
}

//Promtp for names

let addInput = () => {
	
	for (let i = 0; i < rpsDynamicNumber; i++){
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

	continueGame = document.createElement("button");
	continueGame.setAttribute("id", "continueGame");
	let buttonTextContinue = document.createTextNode("Продължи");
	continueGame.appendChild(buttonTextContinue);
	addName.appendChild(continueGame);
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

let rpsRandomizer = (x) => {
	for(let i = 0; i < x; i++){
		random();
	}
}

let printResult = (x) => {
	playerResult = document.createElement("p");
	playerResult.setAttribute("class", "playerResults")
	if (rpsResults[x] === 1){
		playerResult.innerHTML = dynamicNameList[x] + " избра камък";
		displayResults.appendChild(playerResult);
	}else if (rpsResults[x] === 2){
		playerResult.innerHTML = dynamicNameList[x] + " избра ножица";
		displayResults.appendChild(playerResult);
	}else {
		playerResult.innerHTML = dynamicNameList[x] +  " избра хартия";
		displayResults.appendChild(playerResult);
	}
}

let printWinners = (arr) => {
	let rpsPlaces;
	arr.forEach((e) => {
		rpsPlaces = document.createElement('p');
		rpsPlaces.setAttribute('class', 'rpsPlaces');
		displayResults.appendChild(rpsPlaces);
		rpsPlaces.append(document.createTextNode(e + " е на " + (arr.indexOf(e) + 1) + " място"));
	})
}


//Logical operator

let findWinner = () => {

	while (dynamicNameList.length != 1){
		displayResults.append(document.createTextNode("Рунд " + roundCounter))

		if(rpsResults.includes(1) && rpsResults.includes(2) && rpsResults.includes(3)){
			for (let i = 0; i < rpsDynamicNumber; i++){
				printResult(i);
			}
			rpsResults= [];
			roundCounter++
		}

		else{
			let i = 0;
			rpsResults.forEach((e) => {
				e === 1? rpsResults.includes(3)? printResult(i)
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				:e ===2? rpsResults.includes(1)? printResult(i) 
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				:rpsResults.includes(2)? printResult(i) 
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				i++
			})
			dynamicNameList = winnerList;
			roundCounter++	
		} 
		
		rpsDynamicNumber = dynamicNameList.length;
		rpsResults= [];
		winnerList = [];
		rpsRandomizer(rpsDynamicNumber); 
	}

	if(dynamicNameList.length === 1){
		console.log(dynamicNameList[0] + " печели")
		displayResults.append(document.createTextNode(dynamicNameList[0] + " печели"));
		rpsResults = [];

		
	}
}

let keepOnPlaying = (arr) => {
	let index = arr.indexOf(dynamicNameList[0]);
	let rpsWinner = arr.splice(index, 1);
	rpsWinners.push(rpsWinner);
	console.log(rpsWinners);
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
	names.onclick = () => {
		displayResults.innerHTML = '';
		dynamicNameList = [];
		for(let i = 0; i < rpsSavedNumber; i++){
			savedName = document.getElementById("playerName" + i).value;
			dynamicNameList.push(savedName);
		}
		nameList = dynamicNameList;
		rpsDynamicNumber = rpsSavedNumber;

		//randomize results
		rpsRandomizer(rpsDynamicNumber);

		//logical operator
		findWinner();

		//Continue game

		losersArray = nameList;
	
		continueGame.onclick = () => {

			if(losersArray.length == 1){
				rpsWinners.push(losersArray[0]);
				console.log(rpsWinners);
			}

			while(displayResults.firstChild){
				displayResults.removeChild(displayResults.firstChild);
			}

			keepOnPlaying(losersArray);
			
			if(losersArray.length == 1){
				rpsWinners.push(losersArray[0]);
				printWinners(rpsWinners);
			}
			
			else {
				rpsRandomizer(losersArray.length);

				dynamicNameList = losersArray;

				findWinner();
			}
		}
	}
} 