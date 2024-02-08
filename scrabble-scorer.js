// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
function initialPrompt() {
  let answer = input.question("Let's play some scrabble! Enter a word:");
  return answer;
};

function simpleScorer(inputWord){
  
  let totalScore = 0;
  for(i = 0; i <inputWord.length; i++){
    totalScore = totalScore + 1;
  }
  return totalScore;
};

function  vowelBonusScorer(inputWord){
  inputWord = inputWord.toUpperCase();
  let totalBonusScore = 0 ;
  for (i = 0; i < inputWord.length; i++){
    let vowels = ["A","E","I","O","U"];
    if(vowels.includes(inputWord[i])){
      totalBonusScore = totalBonusScore + 3;
    }
    else{
      totalBonusScore = totalBonusScore + 1;
    }
  
  }
  return totalBonusScore;
};


function scrabbleScorer(word){
  word = word.toLowerCase();
	let letterPoints = 0;
  newPointStructure = transform(oldPointStructure);
 
	for (let i = 0; i < word.length; i++) {
 
	  for (item in newPointStructure) {
 
		 if (item.includes(word[i])) {
			letterPoints = Number(letterPoints) + Number(newPointStructure[item]);
		 }
 
	  }
	}
	return letterPoints;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction : simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction : vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction : scrabbleScorer
  }
];

function scorerPrompt(inputWord) {
let i = 0;
let score = 0;

let gameTypeAnswer = Number(input.question(`Which scoring algorithm would you like to use?
0 ${scoringAlgorithms[0].name}  ${scoringAlgorithms[0].description}
1 ${scoringAlgorithms[1].name} ${scoringAlgorithms[1].description}
2 ${scoringAlgorithms[2].name} ${scoringAlgorithms[2].description}`))


    while (i < 1){  

      if(gameTypeAnswer <= 2 && !NaN) {
        // Where i left of got stuck on this need a nap v.v
       score = scoringAlgorithms[gameTypeAnswer].scorerFunction(inputWord);
         i++;
      } 


      else{
        gameTypeAnswer = Number(input.question("invalid input please choose 0, 1, or 2"));
      }
    }
    return score
};

function transform(oldPointStructure) {
  let newPointObject = {};

  for (i = 0 ; i < 11 ; i++){
    for (item in oldPointStructure){
      
      newPointObject[String(oldPointStructure[item][i]).toLowerCase()] = Number(item);
    }
  }
  delete newPointObject.undefined;
return newPointObject
};

let newPointStructure = transform(oldPointStructure);

// {
// "A" : 1,
// "B" : 3,
// "C" : 3,
// "D" : 2,
// "E" : 1,
// "F" : 4,
// "G" : 2,
// "H" : 4,
// "I" : 1,
// "J" : 8,
// "K" : 5,
// "L" : 1,
// "M" : 3,
// "N" : 1,
// "O" : 1,
// "P" : 3,
// "Q" : 10,
// "R" : 1,
// "S" : 1,
// "T" : 1,
// "U" : 1,
// "V" : 4,
// "W" : 4,
// "X" : 8,
// "Y" : 4,
// "Z" : 10,

// };
// Added to repush

function runProgram() {
   let answer = initialPrompt();
   let score  = scorerPrompt(answer);
console.log("Score for " + answer +" is " + score);
  //  let score = oldScrabbleScorer(answer);
  //  let pointValue = simpleScorer(answer);
  //  let bonusPointValue = vowelBonusScorer(answer);

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
