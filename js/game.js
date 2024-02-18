const gameContainer = document.getElementById("game")

let selectedRandImages = []
let matchCards = []
let numCard = 0

let hasFlippedCard = false
let blockCards = true
let firstCard
let intervalID

//User Data in Game
function completeUserData(){
    document.getElementById("nick").value = nick
    document.getElementById("avatarImg").src = avatar
    document.getElementById("clicks").value = 3*parseInt(dif**2)
}

//random integer
function randint(max){
    return Math.floor(Math.random()*max)
}

function resetBoard(){
    location.reload()
}

function resetGame(){
    const cardsDivs = document.getElementsByClassName("container-item");
    for(cardiv of cardsDivs){
        cardiv.classList.add("flip")
    }
    setTimeout(resetBoard, 1000)
}

function unflip(secCard, firCard){
    secCard.classList.add("flip")
    firCard.classList.add("flip")
    blockCards = false
}

//flip cards
function flipCards(){
    if(blockCards) return
    for(let i of this.classList){
        if(i === "reset"){
            blockCards = true
            resetGame()
        }
    }
    
    document.getElementById("clicks").value -= 1

    if(hasFlippedCard && !(this.id === firstCard.id)){
        
        if(this.childNodes[1].src === firstCard.childNodes[1].src){
            this.classList.remove("flip")
            firstCard = undefined
            hasFlippedCard = false
            matchCards.push(numCard, numCard+1)
            if(matchCards.length >= (Math.pow(dif,2)-1)){
                clearInterval(intervalID)
                endGame(0)
            }
            numCard += 2
            return
        } else{
            this.classList.remove("flip")
            blockCards = true
            setTimeout(unflip, 1000, this, firstCard)
            firstCard = undefined
            hasFlippedCard = false
            return
        }
    }
    
    this.classList.remove("flip")
    fistCardClicking = true
    if(!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
        return
    }

}

//show cards to the player at the start of the game

function showCards(arrayOfCards){
    for(cards of arrayOfCards){
        cards.classList.remove("flip")
    }
}

function hideCards(arrayOfCards){
    for(cards of arrayOfCards){
        cards.classList.add("flip")
    }
}

//draw cards in the game
function drawGameCards(){
    gameContainer.style.gridTemplateColumns = `repeat(${dif}, 1fr)`
    gameContainer.style.gridTemplateRows = `repeat(${dif}, 1fr)`
    let items = "";
    let numItems = Math.pow(parseInt(dif),2)
    let divID = 0
    for(let i=0; i<(numItems/2)-1; i++){
        randImage = randint(24);
        while(selectedRandImages.includes(randImage)){
            randImage = randint(24);
        }
        items+= `<div id="${divID}" class="container-item flip" style="order:${randint(12)}" draggable="false">
        <img src="images/cards/fruit${randImage}.png"></div></div>
        <div id="${divID+1}" class="container-item flip" style="order:${randint(12)}" draggable="false">
        <img src="images/cards/fruit${randImage}.png"></div></div>`
        selectedRandImages.push(randImage)
        divID += 2
    }

    items+= `<div class="container-item flip reset" style="order:${randint(12)}" draggable="false">
        <img src="images/cards/reset.png"></div></div>`

    gameContainer.innerHTML = items
    
    const divItems = document.getElementsByClassName("container-item");
    for(cards of divItems){
        cards.addEventListener('click', flipCards);
    }

    setTimeout(showCards,500, divItems)
    setTimeout(hideCards,1000,divItems)
    blockCards=false
}

function countdown(){
    let time = parseInt(document.getElementById("time").value)-1
    document.getElementById("time").value = time

    if(time == 0){
        clearInterval(intervalID)
        endGame(1)
    }
}

function gameCounter(){
    //set time by dificult
    document.getElementById("time").value = (2 * parseInt(dif)**2) + 2
    intervalID = setInterval(countdown, 1000);
}

function endGame(state){
    const message = document.getElementById("message")
    
    document.getElementById("game").style.zIndex = "1";
    
    document.getElementById("endGame").style.zIndex = "2";
    document.getElementById("endGame").classList.add("end-game-color")
    
    const restartBtn = document.getElementById("restart")
    restartBtn.addEventListener('click', (e)=> location.reload())

    switch(state){
        case 0:
            message.innerText = "¡Ganaste!"
            break;
        case 1:
            message.innerText = "Perdiste..."
            break;
    }
}

getUserData()
completeUserData()
if(!checkData()){
    location="index.html"
}
drawGameCards()
gameCounter()