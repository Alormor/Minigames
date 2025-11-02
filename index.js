// COLOR HUNT
/*
Objective: Click the right square
Interface: 4 colored squares (HTML)
JS: show the text "Click on red"

Correct click → Correct message
Incorrect click → Error message
Events: click
*/
window.onload = ()=>{
    beginHuntColor();
    beginChangingButton();
    beginPressKey();
    beginReflexGame();
    beginNumberHunt();
    beginSimonSays();
}

function beginHuntColor(){
    let tableCH = document.getElementById("tableCH");
    let chosenColor;
    let myMessage = document.getElementById("message");
    myMessage.innerHTML = "Guess!";

    let generatedColor = generateColor();

    tableCH.addEventListener("click", (e) =>{
        chosenColor = e.target.id;
        if(chosenColor==generatedColor)
        {
            myMessage.innerHTML = "Correct, next one!";
            generatedColor=generateColor();
        }
        else
            myMessage.innerHTML = "You failed :("
    })   
}

function generateColor(){
    let myColor = document.getElementById("chooseColor");
    let colorArray = ["red", "blue", "yellow", "green"];
    let generatedColor=colorArray[Math.floor(Math.random()*(4))];
    myColor.innerHTML = "Click on "+generatedColor;

    return generatedColor+"CH";
    
}


// CHANGING BUTTON
/*
Objective: Make a button change color or text when hovering or clicking.
Interface: Just one big button.
JS:
    - mouseover: change color
    - mouseout: return to original color.
    - click: chnage text ("You clicked me!").

Event: mouseover, mouseout, click
*/
function beginChangingButton(){
    let myButton = document.getElementById("button");
    myButton.innerHTML = "Come over here!";

    myButton.addEventListener("mouseover", (e) =>{
        myButton.style.backgroundColor="purple";
        myButton.innerHTML = "You are hovering!";
    });

    myButton.addEventListener("mouseout", (e) =>{
        myButton.style.backgroundColor="aqua";
        myButton.innerHTML = "Come over here!";
    });

    myButton.addEventListener("click", (e) =>{
        myButton.style.backgroundColor="red";
        myButton.innerHTML = "You clicked me!";
    });
}


// PRESS THE RIGHT KEY
/*
Objective: Press the right key
Interface: Text that says "Press the A key".
JS: Detect the pressed key and if it's correct.
Events: keydown
*/
function beginPressKey(){

    let myInstruction = document.getElementById("instruction");
    let generatedKey=generateKey();
    myInstruction.innerHTML = "Press "+generatedKey;

        document.addEventListener("keydown", (e) =>{
            if(generatedKey==e.key.toUpperCase())
            {
                generatedKey=generateKey();
                myInstruction.innerHTML = "Press "+generatedKey;
            }
        })
}

function generateKey(){
    let keys="QWERTYUIOPASDFGHJKLZXCVBNM";
    let rNum = Math.floor(Math.random()*(keys.length));
    return keys.substring(rNum, rNum+1);
}


// REFLEX GAME
/*
Objective: Click inside the circle only when the color changes.
Interface: A centered circle.
JS:
    - Every 2-5 seconds the circle changes from grey to green.
    - If the user clicks when its green → "Quick refelxes!".
    - If the user clicks before → "Too soon".
Events: click, setTimeout
*/

let startTime, endTime, timeDiff, rNum, myCircle;
function beginReflexGame(){
    let myMessage = document.getElementById("messageReflex");

    myCircle = document.getElementById("circle");
    rNum = Math.floor(Math.random()*(6000-2000)+2000);
    myMessage.innerHTML = "Wait for circle to turn red";
    
    setTimeout(changeColor, rNum);
    myCircle.addEventListener("click", (e) =>{
        if(myCircle.style.backgroundColor == "red"){
            endTime = new Date();
            timeDiff = (endTime-startTime)/1000;
            myCircle.style.backgroundColor = "grey";
            myMessage.innerHTML = timeDiff<2?"Quick reflexes! You took " +timeDiff+" seconds.":
            "Too slow! You took "+timeDiff+" seconds.";
        }
        else
            myMessage.innerHTML = "Too soon";
        
        setTimeout(changeColor, rNum);
    })
}

function changeColor(){
    myCircle.style.backgroundColor = "red";
    rNum = Math.floor(Math.random()*(6000-2000)+2000);
    startTime = new Date();
}


// NUMBER HUNT
/*
Objective: Pick the number that appears in the message.
Interface: Several numbers from 1 to 9.
JS:
    - Show "Click number x".
    - Validate the number by clicking.
Events: click
*/
function beginNumberHunt(){
    let table = document.getElementById("tableNH");
    let chosenNumber;
    let myMessage = document.getElementById("messageNH");
    let myCell;

    let generatedNumber;

    myMessage.innerHTML = "Guess!";
    generatedNumber=generateNumber();
    myCell = document.getElementById(generatedNumber);

    table.addEventListener("click", (e) =>{
        chosenNumber = e.target.id;
        if(chosenNumber==generatedNumber)
        {
            myCell = document.getElementById(generatedNumber);
            myCell.style.borderColor="black";
            myMessage.innerHTML = "Correct, next one!";
            generatedNumber=generateNumber();
        }
        else
            myMessage.innerHTML = "You failed :("

    })   
}

function randomNumber(){
    return  Math.floor(Math.random()*(9)+1);
}

function generateNumber(){
    let myNumber = document.getElementById("chooseNumber");
    let generatedNumber=randomNumber();
    let myCell = document.getElementById(generatedNumber);

    myNumber.innerHTML = "Click number "+generatedNumber;
    myCell.style.borderColor="blue";

    return generatedNumber;
    
}


// SIMON SAYS
/*
Objective: Repeat color sequence.
Interface: 4 button colors.
JS:
    - Show a color that "flashes".
    - User must click on that color.
    - If the sequences is correct, moves to next level.
Events: click, setTimeout
*/
let colors = ["red", "blue", "yellow", "green"];
let sequence=[];
let timer, timerDelay;

function beginSimonSays(){
    let table = document.getElementById("tableSS");
    let myBtn = document.getElementById("start");
    let myMessage = document.getElementById("messageSS");
    let myLevel = document.getElementById("level");
    let mySolution = document.getElementById("solution");
    let counter = 0;
    let level = 0;
    let highscore = 0;
    let canClick = false;
    let chosenCell;

    myLevel.innerHTML = "No level";
    myMessage.innerHTML = "Press Start to play";

    myBtn.addEventListener("click", (e)=> {
        mySolution.innerHTML = "";
        // Set the timers and the sequence to default values
        if(level==0){
            sequence.length = 0;
            timer = 2000;
            timerDelay = 800;
        // Decrease the timer every 5 levels
        }else if(level%5==0){
            timer-=500;
            timerDelay-=200;
        }

        canClick = false; // Disable table
        level++;
        myLevel.innerHTML = "Level "+level+" - Highscore: "+highscore;
        myMessage.innerHTML = "&#128338; Wait for sequence to end, pay attention!";
        myBtn.innerHTML = "Wait";
        myBtn.disabled = true; // Disable button

        generateColorSS();
        showSequence(sequence);

        setTimeout(() => {
            canClick = true; // Enable table
            myMessage.innerHTML = "&#128064; Click in the same order";
            myBtn.innerHTML = "Next";
        }, sequence.length * timer);
    });

    table.addEventListener("click", (e) =>{
        let check = true;
        if(!canClick) check = false; // If true, table can be clicked on

        if (e.target.tagName !== "TD") check = false; // Checks a cell has been clicked.

        if(check){
            chosenCell = e.target.id;
            // Check the chosen cell id with the value saved in the sequence.
            // If same, raise the counter and continue
            if(chosenCell == sequence[counter]){
                myMessage.innerHTML = "&#9989; Correct, next one!";
                counter++;
            // If different, you've lost and reset everything.
            }else{
                myBtn.disabled = false;
                myMessage.innerHTML = "&#10060; You failed";
                myBtn.innerHTML = "Reset";
                mySolution.innerHTML = "Solution: "+sequence;
                counter = 0;
                level = 0;
                canClick = false; // Disable table
            }

            // Once the counter reaches the end of the sequence, move to next level
            if(counter >= sequence.length){
                highscore=level>highscore?level:highscore;
                myBtn.disabled = false; // Enable button
                counter = 0;
                canClick = false; // Disable table
                if(level == 20) // Level 20 is the last one
                {
                    myMessage.innerHTML = "&#127881; Congratulations, you've beaten the game!";
                    myBtn.innerHTML = "Reset";
                    level = 0;
                }
                else
                    myMessage.innerHTML = (level%5==0 && level!=0)? "&#9989; Correct sequence! Next level will increase the speed!":
                        "&#9989; Correct sequence! Move to next level";
            }
        }
    });
}

function generateColorSS(){
    let generatedColor;
    generatedColor=colors[Math.floor(Math.random()*(4))];
    sequence.push(generatedColor);
}

function showSequence(sequence){
    let myCell;
    sequence.forEach((cell, i) => {
        // Turning color on
        setTimeout(() => {
            myCell = document.getElementById(cell);
            myCell.style.opacity = "50%";
        }, i * timer);

        // Turning color off
        setTimeout(() => {
            myCell = document.getElementById(cell);
            myCell.style.opacity = "100%";
        }, i * timer + timerDelay);
    });
}