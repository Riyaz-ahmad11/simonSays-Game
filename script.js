let gameSequence = [];
let index = 0;
let level = 0;
let maxScore = 0;

let  boxes = document.querySelectorAll('.box');
let h3 = document.querySelector('h3');

function playGameOver(){
    document.querySelector("#gameOver").play();
}
function playClickSound(){
    document.querySelector('#clickSound').play();
}


function flashScoreCard(){
    let scoreDiv = document.querySelector(".score");
    scoreDiv.style.right="70px";

    scoreDiv.firstElementChild.innerHTML=`Highest Score :&nbsp;&nbsp; <bold style="color:blue ">${maxScore}</bold>`;

    scoreDiv.firstElementChild.nextElementSibling.innerHTML=`Current Score :&nbsp;&nbsp; <bold style="color:blue">${level}</bold>`;
}
function removeScoreCard(){
    let scoreDiv = document.querySelector(".score");
    scoreDiv.style.right="-350px";
}
function gameOver(){
    playGameOver();

    document.body.style.backgroundColor = "red";
    
    let color="white";
    let idInterval =  setInterval(()=>{
        document.body.style.backgroundColor=color;
        if(color == "white") color = "red";
        else color = "white";
    },100);

    setTimeout(()=>{
        clearInterval(idInterval);
    },500);
    
    h3.innerHTML=`<bold style="color:red">Wrong Move</bold>! Game Over!<br>click any Box to <bold style="color:green">Play Again</bold>`;
    
    maxScore = Math.max(maxScore , level);
    flashScoreCard();

    level = 0;
    gameSequence =[];
}

function nextLevel(){
    
    let nextBoxNumber = Math.floor(Math.random()*4) +1;
    let nextBoxId = `box${nextBoxNumber}`;
    let nextBox = document.querySelector(`#${nextBoxId}`);
     
    let originalColor = nextBox.style.backgroundColor;
 
    nextBox.style.backgroundColor="white";
    setTimeout(()=>{
        nextBox.style.backgroundColor=originalColor;
    },100);


    level++;
    index = 0;  // traverse on new level from start
    
    gameSequence.push(nextBoxNumber);

   setTimeout(()=>{
    h3.innerHTML=`level ${level}`;
   },200);

}

for(let box of boxes){
    box.addEventListener('click',(e)=>{

      

        let originalColor = box.style.backgroundColor;

        box.style.backgroundColor ="white";

        setTimeout(()=>{
            box.style.backgroundColor =originalColor;
        },100);

        let boxNumber = Number.parseInt(e.target.id[3]);

        if(level == 0){
            playClickSound(); 
            index = 0;
            gameSequence.push(boxNumber);
            level++;
            h3.innerHTML=`level ${level}`;

            removeScoreCard();  // when rePlays remove the scoreCard
        }
        else{

            if(gameSequence[index++] != boxNumber){
               gameOver();
            }
            else{
                playClickSound(); // to paly only when u r going good , dont play if out
            }
            if(index == gameSequence.length ){
              setTimeout(nextLevel , 600);
            }
        
        }
    });
}