const board = document.getElementsByTagName("td");
const HTMLrows = document.getElementsByTagName("tr");

var bord  = [[], [], [], [], []];

for (let i = 0; i < HTMLrows.length; i++) {
	let children = HTMLrows[i].getElementsByTagName("td");
	for (let j = 0; j < children.length; j++) {
		bord[i][j] = children[j];
	}
}

console.log(bord);

var toggleHighlight = (e) => {
	e.target.classList.toggle("highlighted");
	if (checkForBingo() == true) {
		console.log("BINGO")
	}
}

var checkForBingo = () => {
	// Check row
	for (let i = 0; i < bord.length; i++) {
		let rowIsBingo = true;
		for (let j = 0; j < bord[i].length; j++) {
			if (bord[i][j].className != "highlighted") {
				rowIsBingo = false;
				break;
			}
		}
		if (rowIsBingo) {
			return true;
		}
	}

	//check column

	for (let i = 0; i < bord.length; i++) {
		let columnIsBingo = true;
		for (let j = 0; j < bord[i].length; j++) {

			if (bord[j][i].className != "highlighted") {

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

var entries = ["TGVguy", "Someone grinding the Ores route", "Complaints about Historically Inaccurate", "Train deletes itself before spawning",
"Someone complains about @everyone", "Rokerige Joe", "Someone Complains about signals", "LIGHTS", "TTTE Roleplay"];


for (let i = 0; i < board.length; i++) {
	if (i == 12) continue; // skips functionality for the center square
	board[i].addEventListener("click", toggleHighlight);
	board[i].innerText = entries[randint(entries.length)];
}