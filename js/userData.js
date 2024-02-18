var nick
var dif
var avatar

function setUserData(nickname, dificulty,avatar){
    sessionStorage.setItem('nickname',nickname.value)
    sessionStorage.setItem('dificulty',dificulty.options[dificulty.selectedIndex].value)
    sessionStorage.setItem('avatar',avatar.src)
}

function getUserData(){
    nick = sessionStorage.getItem('nickname')
    dif = sessionStorage.getItem('dificulty')
    avatar = sessionStorage.getItem('avatar')
}

function checkData(){
    if (nick == null || dif == null){
        sessionStorage.setItem('error', 'complete correctamente el formulario')
        return false
    }
    return true
}

function usersRegistries(nick){
    let historyStorage = localStorage.getItem('oHistory');
    let history;    
    if (historyStorage==null){
        history = [];
    } else{
        history = JSON.parse(historyStorage);
    }

    let registryUser={
        user: nick.value,
        date: Date.now(),
    }

    history.push(registryUser);
    localStorage.setItem('oHistory', JSON.stringify(history))
}