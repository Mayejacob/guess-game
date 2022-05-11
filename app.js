// Game Instructions:
// - players must guess a number betweeen a min and max
// - player get a certain amount of guesses
// - notify player of guesses remaining
// - notify the player of the correct answer if loose
// - let player choose to play again

// game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

// assign min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        // set message
        setMessage(`Please enter a number  between ${min} and ${max}`, 'red');
    }

    // check if won
    if(guess === winningNum){
        // game over - won
       gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }else{
        // wrong number
        guessesLeft -= 1;
        if(guessesLeft === 0){
            // game over - loss
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            
        }else{
            // game continuess - answer wrong

            // change border color
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            // tell user its wrong answer
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});


// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    // dissable input
    guessInput.disabled = true;
    guessInput.value ='';
    // change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // set message
    setMessage(msg);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className +=  'play-again';
}

// get wininning number
function getRandomNum(min, max){
    // generate random number between min and max
   return Math.floor(Math.random()*(max-min+1)+min);
}
// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

