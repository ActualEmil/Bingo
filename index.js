const HTMLboard = document.getElementsByTagName("td");

var arrayBoard  = [[], [], [], [], []];

for (let i = 0; i < document.getElementsByTagName("tr").length; i++) {
	let children = document.getElementsByTagName("tr")[i].getElementsByTagName("td");
	for (let j = 0; j < children.length; j++) {
		arrayBoard[i][j] = children[j];
	}
}

console.log(arrayBoard);

var toggleHighlight = (e) => {
	e.target.classList.toggle("highlighted");
	if (checkForBingo() == true) {
		console.log("BINGO")
	}
}

var checkForBingo = () => {
	// Check row
	for (let i = 0; i < arrayBoard.length; i++) {
		let rowIsBingo = true;
		for (let j = 0; j < arrayBoard[i].length; j++) {
			if (arrayBoard[i][j].className != "highlighted") {
				rowIsBingo = false;
				break;
			}
		}
		if (rowIsBingo) {
			return true;
		}
	}

	//check column

	for (let i = 0; i < arrayBoard.length; i++) {
		let columnIsBingo = true;
		for (let j = 0; j < arrayBoard[i].length; j++) {
			if (arrayBoard[j][i].className != "highlighted") {
				columnIsBingo = false;
				break;
			}
		}
		if (columnIsBingo) {
			return true;
		}
	}
	return false;
}

var randint = (limit) => {
	return Math.floor(Math.random() * limit);
}

var entries = ["TGVguy", "Soeone grinding the Ores romute", "Complaints about Historically Inaccurate", "Stupid train suggestion", "Train deletes itself before spawning",
"Someone complains about @everyone", "Rokerige Joe", "Someone Complains about signals", "LIGHTS", "Shiiba posts M Hund", "TTTE Roleplay", "Someone asks when the next update is",
"Big Dean", "Clock talks about NS 4000", "UnionPacificGuy is retarded in-game", "Cheeselined", "Traffic jam at Zand", "Someone spams whistles", "Missing sounds",
"Shitty bugreport without F9 screen", "Robin tells someone to boost", "Someone crashes into Zand", "Class 15", "Kid raging about stealing signals"];

console.log(entries.length);

for (let i = 0; i < HTMLboard.length; i++) {
	if (i == 12) continue; // skips functionality for the center square
	HTMLboard[i].addEventListener("click", toggleHighlight);
	let index = randint(entries.length);
	HTMLboard[i].innerText = entries[index];
	entries.splice(index, 1)
}