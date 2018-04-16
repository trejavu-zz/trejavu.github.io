// var randomNumberBetween0and19 = Math.floor(Math.random() * 20);
var SORT = function(list){
	var functions = [];
	var numberArray;

	function animate(){
		if (functions.length){
			setTimeout(function(){
				var arguments = functions.splice(0, 1)[0];
				swapDivNumbers(arguments[0], arguments[1], arguments[2], arguments[3]);
				animate();}, 600);
		}
	}

	function executePass(arrayOfNumbers){
		var swapNecessary = false;
		for (var i = 0; i < arrayOfNumbers.length - 1; i ++){
			var firstIndex1 = i;
			var secondIndex1 = i + 1;
			var numberOne = arrayOfNumbers[i];
			var numberTwo = arrayOfNumbers[i + 1];
			console.log(arrayOfNumbers.toString());
			console.log("number" + i);
			console.log("number" + (i+1));
			if (numberOne > numberTwo) {
				arrayOfNumbers[i] = numberTwo;
				arrayOfNumbers[i + 1] = numberOne;
				functions.push([i, i+1, numberOne, numberTwo]);
				swapNecessary = true;
				// createNumberDivs(arrayOfNumbers);
			}
		}

		if (swapNecessary){
			return arrayOfNumbers;
		} else {
			return swapNecessary;
		}
	}

	function swapDivNumbers(firstIndex, secondIndex, numberOne, numberTwo){
		console.log(firstIndex + " " + secondIndex + " " + numberOne + " " + numberTwo);
		var divNumber1 = document.getElementById("number" + firstIndex);
		var divNumber2 = document.getElementById("number" + secondIndex);
		var div1TopPosition = divNumber1.offsetTop;
		var div1LeftPosition = divNumber1.offsetLeft;
		var div2TopPosition = divNumber2.offsetTop;
		var div2LeftPosition = divNumber2.offsetLeft;

		yDiff = div1TopPosition - div2TopPosition;
		xDiff = div1LeftPosition - div2LeftPosition;
		var position1VerticalShift = "";
		var position2VerticalShift = "";
		var position1HorizontalShift = "";
		var position2HorizontalShift = "";

		if (yDiff < 0) {
			var shift = yDiff * -1;
			position1VerticalShift += "+=" + shift + "px";
			position2VerticalShift += "-=" + shift + "px"; 
		} else if (yDiff > 0) {
			var shift = yDiff
			position1VerticalShift += "-=" + shift + "px";
			position2VerticalShift += "+=" + shift + "px";
		}

		if (xDiff < 0) {
			var shift = xDiff * -1;
			position1HorizontalShift += "+=" + shift + "px";
			position2HorizontalShift += "-=" + shift + "px"; 
		} else if (xDiff > 0) {
			var shift = xDiff
			position1HorizontalShift += "-=" + shift + "px";
			position2HorizontalShift += "+=" + shift + "px";
		}

		if (position1VerticalShift && position1HorizontalShift){
			$("#number" + firstIndex).animate({left: position1HorizontalShift, top: position1VerticalShift});
			$("#number" + secondIndex).animate({left: position2HorizontalShift, top: position2VerticalShift});
		}else if (position1VerticalShift){
			$("#number" + firstIndex).animate({top: position1VerticalShift});
			$("#number" + secondIndex).animate({top: position2VerticalShift});

		}else if (position1HorizontalShift){
			$("#number" + firstIndex).animate({left: position1HorizontalShift});
			$("#number" + secondIndex).animate({left: position2HorizontalShift});

		}
		divNumber1.id = "number" + secondIndex;
		divNumber2.id = "number" + firstIndex;

	}
	var sortArray = executePass(list);
	while(sortArray){
		sortArray = executePass(sortArray);
	}
	animate();
}


function randomWholeNum(begin, end) {
  end += 1;
  return Math.floor(Math.random() * end) + begin;
}

function generateRandomNumberSet(desiredSize, begin, end) {
	var randomNumberSet = [];
	for (var i = 0; i < desiredSize; i++){
		randomNumberSet.push(randomWholeNum(begin, end));
	}

	return randomNumberSet;
}

function createNumberDivs(numberArray){
	var numberDiv = document.getElementById("numberContainer");
		numberDiv.innerHTML = "";
		for(var i = 0; i < numberArray.length; i++){
			var innerDiv = document.createElement('div');
			innerDiv.id = "number" + i;
			innerDiv.className = "numberblock";
			innerDiv.innerHTML = numberArray[i];
			numberDiv.appendChild(innerDiv);
		}
}

function receiveElements() {
	var arraySize = parseInt(document.getElementById("arraySize").value);
	var begin = parseInt(document.getElementById("begin").value);
	var end = parseInt(document.getElementById("end").value);

	if (arraySize && begin && end){
		numberArray = generateRandomNumberSet(arraySize, begin, end);
		createNumberDivs(numberArray);
	} else {
		window.alert("Please enter numbers in each box.");
	}	
}

function sortElements() {
	if(numberArray){
		new SORT(numberArray);
	}else{
		window.alert("You need to create the number list first.");
	}
}