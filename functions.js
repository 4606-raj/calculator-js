function getHistory() {
	return document.getElementById("history-value").innerText;
}

function printHistory(num) {
	document.getElementById('history-value').innerText=num;
}

function getOutput() {
	return document.getElementById('output-value').innerText;
}

// displays text on output part.
function printOutput(num) {
	// checks if text overflows. 
	if (num < reverseNumberFormat('10,000,000,000,000,000')) {

		if (num === '') {
			document.getElementById('output-value').innerText = '';
		}
		else {
			document.getElementById('output-value').innerText=getFormattedNumber(num);
		}
	}
	else {
		document.getElementById('output-value').innerText = 'limit exceeded !!'
	}
}

function getFormattedNumber(num) {

	// so that str functions can work.
	num = String(num);

	// when backspace is pressed on negetive value.
	if (num == '-') {
		return '';
	}

	// when '.' on first place.
	if (num == '.') {
		return 0+num;
	}

	// to handle decimal at last index.
	if (num[num.length - 1] == '.') {

		var n = Number(num);
		var value = n.toLocaleString("en");
		return String(value) + '.';
	}

	// to handle decimal point values and format it in Locale-string.
	if (num.indexOf('.') != -1) {
		mantissa = num.substr(0, num.indexOf('.'));									// breaking number from 0 to decimal point.
		mantissa = reverseNumberFormat(mantissa);									// conveting to normal form to remove commas.
		fractional = num.substr(num.indexOf('.'), num.length - 1);					// breaking number from decimal point to end.

		var n = Number(mantissa);
		var value = n.toLocaleString("en");
		value = String(value);														// to add both parts together to display.
		return value + fractional;
	}

	// just formats the number into Locale-string.
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

// removes commas from number, for calculation etc.
function reverseNumberFormat(num) {
	if (num[num.length - 1] == '.') {												// handling decimal point at end.
		return num;
	}
		return Number(num.replace(/,/g, ''));
}

// handling operators.
var operator = document.getElementsByClassName('operator');

for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function() {
		
		// if clear btn is pressed.
		if (this.id == 'clear') {
			printOutput('');
			printHistory('');
		}

		// if backspace btn in pressed.
		if (this.id == 'backspace') {
			output = reverseNumberFormat(getOutput()).toString();					// converting normal form to string.
			output = output.substr(0, output.length - 1);							// removing last character from the string.
			printOutput(output);
		}
		
		// handling other operators.
		else {
			var output = getOutput();
			var history = getHistory();
			
			// when history has some value to calculate.
			if (output == '' && history != '') {
				
				// checking the last character in history area, if it is an operator.
				if (isNaN(history[history.length - 1])) {
					history = history.substr(0, history.length - 1);				// removing operator at last place in history.
				}
			}
			
			// calculting if either output or history area has some values.
			if (output != '' || history != '') {
				output = output == '' ? output : reverseNumberFormat(output);		// if output has nothing, rev. fun. will return 0, which is added to history if operator is changed.
				history = history + output;
				
				// handling '='.
				if (this.id == '=') {
					var result = eval(history);										// calculating expression in history.
					printOutput(result);
					printHistory('');
				}

				// handling other arithmetic operatiors.
				else {
					history = history + this.id; 									// add operator at end in history, changes the last operator as it was removed.
					printHistory(history);
					printOutput('');
				}
			}
		}
	})
}

// handling number inputs.
var number = document.getElementsByClassName('number');

for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function() {
		var output = reverseNumberFormat(getOutput());							// getting previous text in output area.
		
		// to ensure the text is number, or last character is decimal point.
		if (output != NaN || output[output.length - 1] == '.') {
			output = output + this.id;											// concatinating character to previous text.					
			printOutput(output);												// printing new text to output.
		}
	})
}