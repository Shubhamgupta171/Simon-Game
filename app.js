let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is start");
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function usrflash(btn) {
    btn.classList.add("usrflash");
    setTimeout(function () {
        btn.classList.remove("usrflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    // Choosing random button
    let rndmidx = Math.floor(Math.random() * 4);
    let randomcolor = btns[rndmidx];
    let rndmbtn = document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    console.log(gameseq);
    gameflash(rndmbtn);
    btnflash(rndmbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        // If the current input matches the game sequence at the same index
        if (userseq.length === gameseq.length) {
            // If the current index is the last index of the game sequence
            setTimeout(levelup, 1000);
        }
    } else {

        h2.innerText = `Game over! Your Score was ${level}. Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "rgb(113, 223, 236)";
        }, 150);
       
           
        
        reset();
    }
}

function btnpress() {
    let btn = this;
    btnflash(btn);
    usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor); // Add the color to userseq
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq.length = 0;
    userseq.length = 0;
    level = 0;
    // h2.innerText = 'Press any key to start';
}


function gameflash(btn) {
    let i = 0;
    let flashInterval = setInterval(function () {
        btnflash(btn);
        if (i++ >= gameseq.length) {
            clearInterval(flashInterval);
        }
    }, 500);
}
