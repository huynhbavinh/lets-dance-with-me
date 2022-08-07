"use strict";
const html = document.getElementById('html');

const title = document.getElementById('title');
const model = document.getElementById('vinh');
const overview = document.getElementById('overview');
const isReady = document.getElementById('isReady');
const scoreEle = document.getElementById('score');
let rotate = 0;
let isLeft = false;
let falling = 0;
let isStopAutoFall = false;
let gravityCallback;
let countingScoreCallback;
let score = 1;
popupWelcome();

function popupWelcome() {
    if (confirm("Are you readyyy!")) {
        document.getElementById('myAudio').autoplay = true;
        overview.style.display = 'block';
    } else {
        popupWelcome();
    }
}
function popupEndGame(unFocused =false) {
    html.removeEventListener('click',()=>{
        console.log('end focus')
    })
    if(unFocused){
        alert(' Bạn chưa tập trung rùi, thử lại nhé!')
        window.location.reload()
    } else {
        clearInterval(countingScoreCallback);
        clearInterval(gravityCallback);
        const level = score > 1111 
            ? 'Bạn đã vượt mặt 76% người chơi'
            :  'Cần cố gắng hơn'
        const msg = `Ọc Ọc Ọc
        Your score: ${score}
        Your Ranking: ${level}`
        window.location.reload()
        alert(msg);
    }
}

function keepHeadUp(isKeyDown) {
    if (!isStopAutoFall) {
        isStopAutoFall = true;
        clearInterval(isFalling);
        rotate = falling;
    }
    if (isKeyDown.keyCode === 39) {
        vinh.style.transform = `rotate(${rotate}deg)`
        rotate += 1;
        isLeft = false;
    } else if (isKeyDown.keyCode === 37) {
        vinh.style.transform = `rotate(${rotate}deg)`
        rotate -= 1;
        isLeft = true;
    }
    gravity();
}

function fall() {
    falling += 1;
    vinh.style.transform = `rotate(${falling}deg)`
    if ((falling === 95 || falling === -95)) {
        popupEndGame();
    }
}

function gravity() {
    gravityCallback = setInterval(() => {
        if (isLeft) {
            rotate -= 3;
            vinh.style.transform = `rotate(${rotate}deg)`
        } else {
            rotate += 3;
            vinh.style.transform = `rotate(${rotate}deg)`
        }
        // conditions to end the game
        if ((rotate > 95 || rotate < -95)) {
            popupEndGame();
        }
        countingScore();
        scoreEle.innerHTML = `Your score: ${score}`;
    }, 100)
}

function countingScore(){
    countingScoreCallback = setInterval(()=>{
        score += 1;
    },1000)
}

title.addEventListener('keydown', (event) => {
    if(event.keyCode === 39 || event.keyCode === 37){
        keepHeadUp(event)
    }
})

html.addEventListener('click',()=>{
    title.focus();
    console.log('focuse?')
})

const isFalling = setInterval(() => {
    fall();
}, 50)


