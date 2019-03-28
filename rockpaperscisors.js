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

//Remove input fields

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

//Get pic

function rpsPic(arr, y, z){
	let x = document.createElement("img")
		if(arr[z] == 1){
			x.setAttribute("src", "rock.png");
			document.getElementById(y).appendChild(x);
		}
		else if(arr[z] == 2){
			x.setAttribute("src", "paper.png");
			document.getElementById(y).appendChild(x); 
		}
		else{
			x.setAttribute("src", "scissors.png");
			document.getElementById(y).appendChild(x);
		}
}

//Create divs

let addDiv = function(x){
	let newDiv = document.getElementById('rspResults');
	let playerResult;
	
		playerResult = document.createElement("div");
		playerResult.setAttribute("type", "text");
		playerResult.setAttribute("name", "playerResult");
		playerResult.setAttribute("class", "playerResult");
		playerResult.setAttribute("id", "playerResult" + x);
		newDiv.appendChild(playerResult);
}

//Logical operator

let findWinner = function(){
	while (rpsResults.length > 1){
		if(rpsResults.includes(1) && rpsResults.includes(2) && rpsResults.includes(3)){
			rpsResults= [];
			rpsRandomizer();
		} 

		else{
			let i = 0;
			rpsResults.forEach(function(e){
				e === 1? rpsResults.includes(3)? (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i)) 
												: (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i), winnerList.push(nameList[i]))
				:e ===2? rpsResults.includes(1)? (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i)) 
												: (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i), winnerList.push(nameList[i])) 
				:rpsResults.includes(2)? (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i))
										 		: (addDiv(i), rpsPic(rpsResults, "playerResult" + i, i), winnerList.push(nameList[i])) 
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
		findWinner();
	}
} 