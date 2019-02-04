// function to catch something with ID
function getEl(x) {
	return document.getElementById(x);
}


submitbtn = document.querySelector(".submit");

var testForm = document.querySelector(".mngez-questbody");
var regForm = document.querySelector(".mngez-registerpage");


// Questions List  // we can push more questions in the future with extensible methods
var questionList = [
	['where does Ageuro play ?', 'Liverpool', 'ManCity', 'Arsenal', "B"],
	['where does Salah play ?', 'Liverpool', 'ManCity', 'Arsenal', "A"],
	['where does Obamyang play ?', 'Liverpool', 'ManCity', 'Arsenal', "C"],
	['where does Mane play ?', 'Liverpool', 'ManCity', 'Arsenal', "A"],
	['where does Firmino play ?', 'Liverpool', 'ManCity', 'Arsenal', "A"],
	['where does Ayoubi play ?', 'Liverpool', 'ManCity', 'Arsenal', "C"],
	['where does VanDijk play ?', 'Liverpool', 'ManCity', 'Arsenal', "A"],
	['where does Mahrez play ?', 'Liverpool', 'ManCity', 'Arsenal', "B"]

];

// Generate Random Questions  "Unique Random"
var rndom = new Array();
var randomQuestion = function () {
	while (rndom.length < 5) {
		var r = (questionList[Math.ceil(Math.random() * questionList.length - 1)]); // -1 because it may push 8, which is undefined because the index is from 0 to 7 only :D
		if (rndom.indexOf(r) === -1) rndom.push(r);  // push "unique" Random Questions

	}
}
randomQuestion();



// start my Magic from here
var pos = 0, filled = 0, current = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0, skippedlist = [];

// rendering the question
function renderQuestion() {
	test = getEl("test");
	if (pos >= rndom.length) {
		if (filled < rndom.length && skippedlist.length > 0) {
		    missed = skippedlist.shift();
		    current = missed;
			getEl("test_status").innerHTML = "Question " + (missed + 1) + " of " + rndom.length;
			question = rndom[missed][0];
			chA = rndom[missed][1];
			chB = rndom[missed][2];
			chC = rndom[missed][3];
			test.innerHTML = "<h3>" + question + "</h3>";
			test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";  // += to add all to the HTML of test
			test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";   // if only = not += , it will add the last html
			test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br><br>";
			test.innerHTML += "<button class='mngez-next' onclick='checkAnswer()'>Submit</button>";
			test.innerHTML += "<button class='mngez-skip' onclick='skipAnswer()'>Skip</button>";

		}
		else {
			test.innerHTML = "<h2>You got " + correct + " of " + rndom.length + " questions correct</h2>";
			getEl("test_status").innerHTML = "Test Completed";
			pos = 0;  // reset
			correct = 0;   // reset
			filled = 0;
			return false;
		}
	}
	else {
		current = pos;
		getEl("test_status").innerHTML = "Question " + (pos + 1) + " of " + rndom.length;
		question = rndom[pos][0];
		chA = rndom[pos][1];
		chB = rndom[pos][2];
		chC = rndom[pos][3];
		test.innerHTML = "<h3>" + question + "</h3>";
		test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";  // += to add all to the HTML of test
		test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";   // if only = not += , it will add the last html
		test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br><br>";
		test.innerHTML += "<button class='mngez-next' onclick='checkAnswer()'>Submit</button>";
		test.innerHTML += "<button class='mngez-skip' onclick='skipAnswer()'>Skip</button>";
	}
};
renderQuestion();

function skipAnswer() {
	if (pos < rndom.length) { // multi skip not allowed
		skippedlist.push(pos);       
		pos++;  // move on the next question
		renderQuestion();
	}

}


// i had a problem that my stupid Form refreshes the page once i click on submit button
// so, i have to stop this refresh of the page once i click submit, so my event of the submit starts rendering the questions
document.querySelector(".myForm").addEventListener("submit", function (e) {
	e.preventDefault();  // stops refreshing the page when submitting the fucking form
});

// validation function on submit of the form
submitbtn.addEventListener("click", function (e) {
	var err = Array();
	if (getEl("usr_login").value.length < 4) err.push("* UserName must be at least 4 (letters) long");
	if (getEl("usr_login").value.length > 32) err.push("* Login must be less than 32 letters long");
	if (!getEl("usr_login").value.match(/^([a-zA-Z0-9_\-])+$/)) err.push("* Invalid Login format");
	if (getEl("usr_password").value.length < 8) err.push("* Password should be at least 8 letters long");
	if (getEl("usr_password").value.length > 32) err.push("* Password should be less than 32 letters long");
	if (!getEl("usr_email").value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) err.push("* Valid e-mail required");
	if (getEl("usr_password").value.length != getEl("usr_password2").value.length) err.push("* Passwords do not match");
	if (err.length > 0) { alert('Please fix errors below:\n\n' + err.join('\n')); return false; }
	else {
		// i shouldn't depened on the following, because once the event happened(onclick),
		// the below code will done and vanish once the event finished
		/*
		var regForm = document.querySelector(".mngez-registerpage");
		regForm.style.display = "none";
		testForm.style.display = "block";
	*/

		// so, instead i will inject an active{display:block} class in the html itself

		regForm.classList.add("hidden");
		testForm.classList.remove("hidden");
		testForm.classList.add("active");
		return true;

	}
});

// checking the answers   // this function will be called once the submit button clicked
function checkAnswer() {
	choices = document.getElementsByName("choices");   // catch all choices in a collection
	for (var i = 0; i < choices.length; i++) {
		if (choices[i].checked) {
			choice = choices[i].value;    // i store the value of the checked in a variable called choice
			if (choice == rndom[current][4]) {    //if the choice equals the right answer( i store it in the 4th position of my array)
				correct++;
			
		}
	}
}




	for (var i = 0; i < choices.length; i++) {
		if (choices[i].checked) {
			filled++;
			pos++;  // move on the next question
			renderQuestion();
		}
	}

}
