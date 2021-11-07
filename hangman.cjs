// splash screen + welcome user + congrats

// implement case-insensitive

// bonus allow user to guess whole word

(function () {
  let wordArray = [
    "wonderland",
    "arbitrary",
    "birthday",
    "firefighter",
    "paraphrase",
    "dictionary",
  ];

  const randWord = wordArray[Math.floor(Math.random() * wordArray.length)];

  const validLetter = /^[A-Za-z]$/;

  let guessedLetters = new Set();

  let showWord = "";

  const prompt = require("prompt-sync")();

  let win = false;

  let turns = 10;

  const refreshShowWord = () => {
    //refresh the shown word according to the guessed letters so far
    showWord = "";
    for (l in randWord) {
      if (guessedLetters.has(randWord.charAt(l))) {
        showWord += randWord.charAt(l);
      } else {
        showWord += "*";
      }
    }
    return showWord;
  };

  const showTurn = (turns) => {
    if (turns > 1) {
      console.log("<<< ", showWord, " >>>");
      console.log("You have " + turns + " guesses left :)", "\n");
    } else if (turns == 1) {
      console.log("<<< ", showWord, " >>>");
      console.log("Last guess.. Think, mcfly, think!", "\n");
    } else {
      console.log("Sorry, no more guesses left. The word was ", randWord);
    }
  };

  let figlet = require("figlet");

  const guessedEntireWord = (turns) => {
    console.log(
      figlet.textSync("NOICE!", {
        font: "speed",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
    console.log(
      "\n",
      "You guessed ",
      showWord,
      " in ",
      10 - turns,
      " turns!",
      "\n"
    );
  };

  refreshShowWord();

  console.log(
    figlet.textSync("HANGMAN!", {
      font: "speed",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );

  console.log("\n", "Can you guess what is ", showWord, " in 10 turns?");

  while (win == false && turns > 0) {
    let guess = prompt("press a key to guess! ", "\n");

    guess = guess.toLowerCase();

    if (guess.length == randWord.length) {
      //user tried to guess the whole word
      if (guess == randWord) {
        showWord = randWord;

        guessedEntireWord(turns);
        turns = 0;
      } else {
        turns -= 1;
        console.log("That's not the word your'e looking for..");
        showTurn(turns);
      }
    } else if (validLetter.test(guess)) {
      // the guess is a valid letter

      if (!guessedLetters.has(guess)) {
        //user guessed a new letter

        guessedLetters.add(guess);

        if (randWord.includes(guess)) {
          //user guessed a correct letter

          refreshShowWord();

          if (showWord.includes("*")) {
            turns -= 1;
            console.log("good guess!!");
            showTurn(turns);
          } else {
            //win!! no more asterisk
            win = true;
            console.log(
              "Congratulations!! You guessed the word: ",
              showWord,
              ". Well done! And Thanks for playing!"
            );
          }
        } else {
          //user guessed an incorrect letter
          turns -= 1;

          if (turns > 0) {
            console.log(
              "nope.. there's no ",
              guess,
              "in ",
              showWord,
              ". try a different letter."
            );
          }
          showTurn(turns);
        }
      } else {
        //user already guessed that letter before
        console.log("you already guessed that letter, try another one.");
        showTurn(turns);
      }
    } else {
      //invalid char
      console.log("invalid character, try guessing a letter..");
      showTurn(turns);
    }
  }
})();
