const nickname = document.getElementById("nick")
const dificulty = document.getElementById("dif")
const form = document.getElementById("form")
const error = document.getElementById("error")

const avatarItems = document.getElementsByClassName("avatar-item")
const avatarImage = document.getElementById("avatarImage")

let item

function submitData(event){
    if(nickname.value.match(/(?<!\S)[0-9]/) || nickname.value == ""){
        event.preventDefault()
        nickname.focus
        error.innerText = "El nickname es inválido"
        return
    } else if(dificulty.value == 0){
        event.preventDefault()
        error.innerText = "Escoge una dificultad"
        return
    }
    usersRegistries(nickname);
    setUserData(nickname, dificulty, avatarImage)

}

function movingImage(e){
    item = e.target
    console.log("hola")
}

function changeImage(){
    avatarImage.src = item.src
}


function main(){
    form.addEventListener('submit',submitData)
    for(item of avatarItems){
        item.addEventListener('dragstart', movingImage)
    }

    if(sessionStorage.getItem('error') != null){
        error.innerText = sessionStorage.getItem('error')
        sessionStorage.removeItem('error')
    }
    
    avatarImage.addEventListener('dragover',e =>{e.preventDefault()})
    avatarImage.addEventListener('drop', changeImage)
}

document.addEventListener('DOMContentLoaded', main)