const state = {
  view:{
    square: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values:{
    timerID: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions:{
    timerID: setInterval(randomSquare, 1000),
    countDownTimerID: setInterval(countDown, 1000),
  }
};

function countDown(){
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  
  if(state.values.currentTime <= 0){
    clearInterval(state.actions.countDownTimerID)
    clearInterval(state.actions.timerID);
    alert('GAME OVER! SEU RESULTADO FINAL FOI: ' + state.values.result);
  }
}

function playSound(audioName){
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function randomSquare(){
  state.view.square.forEach((square) =>{
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.square[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
  state.view.square.forEach((square) => {
    square.addEventListener('mousedown',() => {
      if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit');
      }
    });
  });
}

function initialize(){
  addListenerHitBox();
}

initialize();