// selecting all required elemens 
const singlePlayerBox = document.querySelector(".single-player-box"),
    selectXBtn = singlePlayerBox.querySelector(".playerX"),
    selectOBtn = singlePlayerBox.querySelector(".playerO"),// this will select the playerO class element inside of the single-player-box
    playboard = document.querySelector(".playboard");

const ModeBox = document.querySelector(".player-type-box");
const singlePlayer = ModeBox.querySelector(".single-player");
const twoPlayer = document.querySelector(".two-player");
const twoPlayerBox = document.querySelector(".two-player-box");
const tPXbtn = document.querySelector(".tpX");
const tPObtn = document.querySelector(".tpO");
const players = document.querySelector(".players");
const allbox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box"),
 wonText = resultBox.querySelector(".won-text"),
 replayBtn = resultBox.querySelector("button");
// this will help in switching to the next card

// once the window loaded
window.onload = ()=>{ 
singlePlayer.addEventListener('click',()=>{
    ModeBox.classList.add("hide"); 
    singlePlayerBox.classList.add("show");
    singlePlayerfunc();
});

twoPlayer.addEventListener('click',()=>{
    ModeBox.classList.add("hide") ;
    playboard.classList.add("show");

    twoPlayerfunc();
});


}
replayBtn.onclick = ()=>{
    window.location.reload(); // reload the current page
}



function singlePlayerfunc(){
    selectXBtn.onclick = () => {
        playboard.classList.add("show");
        singlePlayerBox.classList.remove("show");
    }
    selectOBtn.onclick = () => {
        singlePlayerBox.classList.remove("show");
        playboard.classList.add("show");
        players.setAttribute("class", "players active player");
    }

    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick", "clickedBox(this)");
    }
    // console.log(clickedBox)
    let playerXicon = "✖️";
    let playerOicon = "⭕";
    let playerSign = "X"; // suppose player will be x
    let runBot = true;

    // user click function 
        clickedBox = (elements)=>{ // there is a bug in this line i will fix it later
        if(players.classList.contains("player")){
            elements.innerHTML= `<li style="list-style:none;font-size:60px; cursor:default;">${playerOicon}</li>`;
            players.classList.add("active");
            playerSign = "O";//if player will be O then we'll change the sign 
            elements.setAttribute("id", playerSign);
            
        } 
        else{
            elements.innerHTML= `<li style="list-style:none;font-size:60px; cursor:default;">${playerXicon}</li>`; 
            players.classList.add("active");
            elements.setAttribute("id", playerSign);
        }
        selectWinner();// calling winner function
        playboard.style.pointerEvents = "none"; // once user select then user can't select any other box until box selected
        elements.style.pointerEvents = "none";// once the user clicked on the element will not able to clicked on it again

        let randomDelay = ((Math.random() * 1000) + 200).toFixed();// the toFixed() method gives integer value
        // console.log(randomDelay);
        setTimeout(() => {
            bot(runBot);
        }, randomDelay);
     }

//    bot click func

function bot(){
  if(runBot){
      //first change the playerSign so if user has x value in id then bot will have o
      playerSign = "O";
      let array = []; // creating empty array we'll store unselected box in this array
      for (let i = 0; i < allbox.length; i++) {
          if(allbox[i].childElementCount == 0){ //if span has no any child element
                    array.push(i);//inserting unclicked or  unselected boxes inside array means that span has no children or content
                    // console.log(`${i} has no children or content`);// to check see the console
                   }
  
          }
  
  
          let randomBox = array[Math.floor(Math.random() * array.length)];// getting random index from array so bot will select random unselected box
          // console.log(randomBox)
          
          if(array.length > 0){
              if(players.classList.contains("player")){
                  allbox[randomBox].innerHTML= `<li style="list-style:none;font-size:60px; cursor:default;">${playerXicon}</li>`;
                  players.classList.remove("active");
                  playerSign = "X";// if user is O then box id value will be x
                  allbox[randomBox].setAttribute("id", playerSign);
                  
              } 
              else{
                  allbox[randomBox].innerHTML= `<li style="list-style:none;font-size:60px; cursor:default;">${playerOicon}</li>`; 
                  players.classList.remove("active");
                  allbox[randomBox].setAttribute("id", playerSign);
              }
              selectWinner();
          }
          allbox[randomBox].style.pointerEvents = "none"; // once the user clicked on the element will not able to clicked on it again
          playboard.style.pointerEvents = "auto";
          playerSign = "X"; // passing the x value
  }
}

// work on select winner

function getId(idname){
    return document.querySelector(".box" + idname).id;// returning id name
}

function checkId(val1, val2, val3, sign){
    if(getId(val1)== sign && getId(val2)== sign && getId(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if (checkId(1,2,3,playerSign)|| checkId(4,5,6,playerSign)|| checkId(7,8,9,playerSign)|| checkId(1,4,7,playerSign)|| checkId(2,5,8,playerSign)|| checkId(3,6,9,playerSign) || checkId(1,5,9,playerSign) || checkId(3,5,7,playerSign)){
        // console.log(playerSign, " is the winner")
        // once match won by someone then stop the bot
        runBot = false;
        bot(runBot);

        // we'll delay to show result box
        setTimeout(() => {
            playboard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
    }else {
        // if the match has drawn
        // first we'll check all id.. if all span has id and no one won the game then we'll draw the game
        if( getId(1) != "" &&   getId(2) != "" &&  getId(3) != "" &&  getId(4) != "" &&  getId(5) != "" &&  getId(6) != "" &&  getId(7) != "" &&  getId(8) != "" &&  getId(9) != "" ){
            runBot = false;
            bot(runBot);
                // we'll delay to show result box
        setTimeout(() => {
            playboard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.textContent = "Match has been drawn!";
        }
    }
}


}



function twoPlayerfunc(){

    
    let playerXicon = "✖️";
    let playerOicon = "⭕";
    let playerSign;


   let currentPlayer = `<li style="list-style:none;font-size:60px; cursor:default;">${playerXicon}</li>`;
   let nextPlayer = `<li style="list-style:none;font-size:60px; cursor:default;">${playerOicon}</li>`
   let playerTurn = currentPlayer;
     
    const startGame = () =>{
        allbox.forEach(cell =>{ 
            cell.addEventListener('click', (e)=>{ 
                e.target.innerHTML = playerTurn;
                if(checkWin()){
                    playboard.style.pointerEvents = 'none';
                    setTimeout(() => {
                        playboard.classList.remove("show");
                        resultBox.classList.add("show");
                        if(playerSign === 'O'){
                            wonText.innerHTML = `Player <p>X</p> won the game!`
                            
                        }
                        else{
                            wonText.innerHTML = `Player <p>O</p> won the game!`
                        }
                    }, 800);
                   
                }
                else if(checkTie()){
                    setTimeout(() => {
                    playboard.classList.remove("show");
                    resultBox.classList.add("show");
                    wonText.textContent = "Match has been drawn!";
                    },800);
                    
                }
                else{
                    changePlayerturn();
                }
            }, {once :true})
        })
    }
    
    // console.log(allbox[0])
   function changePlayerturn(){
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
        players.classList.add("active");
        playerSign = "X";
    }
    else{
        playerTurn = currentPlayer;
        players.classList.remove("active");
        playerSign = "O"
    }

}

// console.log(allbox)
// function to check win 

const checkWin = () =>{
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i= 0 ;i<winningConditions.length;i++){
        const [pos1, pos2, pos3] = winningConditions[i];
        if( allbox[pos1].textContent !=='' && allbox[pos1].textContent === allbox[pos2].textContent && allbox[pos2].textContent === allbox[pos3].textContent){
            return true;// this will break the loop
        }
    }
    return false;

}

const checkTie =()=>{
    let emptyCellsCount = 0;
    allbox.forEach(cell=>{
        if (cell.textContent == ""){
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();// ye check karega ki cell mera empty hai or checkwin condition not gate of the condition 
}

// call start game function
startGame();

}


// // playboard.addEventListener('click',()=>{},{once: true})// this {once: true } will help in when you clicked a cell one time then you will not able click on it again

