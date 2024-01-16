fd = new FormData();
response = 'unset';
let responseStatus = 999;
let responseStatusText = 'unset';
let receivedFaultMessage = 'unset';
let responseString = 'unset';
let passwordValid = false;
let usernameValid = false;
let loginDisabled = true;
let mainFaultMessage = '';


async function login() {
    activatedLoadingScreen();
    await resetResponseValues();
    await createFormData();
    try {
        response = await fetch('/login/', {
            method: 'POST',
            body: fd
        });
        await responseAction();
    } catch (error) { setServerErrorFault(); };
}


async function responseAction() {
    if (response.status == 200) await setReceivedFaultMessage();
    if (response.status == 200 && responseString.error == 'none') window.location.href = responseString.url;
    else if (response.status == 403) await setFaultMessageUnauthorized();
    else setFaultMessage();
    setResponseValues();
}


async function sendLoginRequest() {
    response = await fetch('/login/', {
        method: 'POST',
        body: fd
    });
}


async function resetResponseValues() {
    response = 'unset';
    responseStatus = 999;
    responseStatusText = 'unset';
    receivedFaultMessage = 'unset';
    responseString = 'unset';
}


async function setResponseValues() {
    responseStatus = response.status;
    responseStatusText = response.statusText;
}

async function setReceivedFaultMessage() {
    responseString = await response.json();
    receivedFaultMessage = await responseString.error;
    console.log(receivedFaultMessage, responseString);

}


async function createFormData() {
    fd = new FormData();
    fd.append('csrfmiddlewaretoken', await getToken());
    fd.append('username', username.value);
    fd.append('password', password.value);
}


async function logout() {
    fd = new FormData();
    fd.append('csrfmiddlewaretoken', await getToken());
    try {
        let response = await fetch('/logout/', {
            method: 'POST',
            body: fd
        });
        window.location.href = response.url;
    } catch (error) {
        console.log('Fehler: ', error);
    }
}



async function getToken() {
    let tokenField = document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    return token;
}


// Login Form validation

function checkEnteredValuesUsername() {
    mainLoginWarning.innerHTML = '';
    usernameValid = false;
    const allowedCharacters = /[^a-zA-Z0-9\s]/;
    username.value = username.value.trim();
    if (allowedCharacters.test(username.value)) {
        uWarning.style.display = 'flex';
        uWarning.innerHTML = '*Es sind keine Sonderzeichen erlaubte!';
    } else if (username.value.length < 5) {
        uWarning.style.display = 'flex';
        uWarning.innerHTML = '*Der Benutzername muss mindestens 5 Zeichen lang sein!';
    } else {
        uWarning.style.display = 'none';
        usernameValid = true;
    }
    setBtnDisabledValue();
}


function checkEnteredValuesPassword() {
    mainLoginWarning.innerHTML = '';
    passwordValid = false;
    const notAllowed = /[<>]/;
    const minLength = 6;
    const maxLength = 32;
    if (notAllowed.test(password.value)) {
        pWarning.style.display = 'flex';
        pWarning.innerHTML = '*Das Sonderzeichen < oder > ist nicht erlaubt!';
    } else if (password.value.length < minLength) {
        pWarning.style.display = 'flex';
        pWarning.innerHTML = '*Das Passwort muss mindestens 6 Zeichen lang sein!';
    } else {
        pWarning.style.display = 'none';
        passwordValid = true;
    }
    setBtnDisabledValue();
}


function setBtnDisabledValue() {
    if (usernameValid && passwordValid) loginDisabled = false;
    else loginDisabled = true;
    sendBtn.disabled = loginDisabled;
}

function activatedLoadingScreen() {
    loading.style = 'display: flex';
}

function deactivatedLoadingScreen() {
    loading.style = 'display: none';
}


function resetForm() {
    usernameValid = false;
    passwordValid = false;
    username.value = '';
    password.value = '';
    sendBtn.disabled = true;
}


async function setFaultMessageUnauthorized() {
    resetForm();
    mainLoginWarning.innerHTML = '*Unbefugter Zugriffsversuch! Zugriff Verweigert !';
    deactivatedLoadingScreen();
}


function setFaultMessage() {
    mainFaultMessage = receivedFaultMessage;
    resetForm();
    mainLoginWarning.innerHTML = mainFaultMessage;
    deactivatedLoadingScreen();
}


function setServerErrorFault() {
    resetForm();
    mainLoginWarning.innerHTML = '*Keine Verbindung zum Server!';
    deactivatedLoadingScreen();
}