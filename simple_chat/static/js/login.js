/**
 * Performs asynchronous login actions.
 */
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


/**
 * Handles different actions based on the response status.
 */
async function responseAction() {
    if (response.status == 200) await setReceivedFaultMessage();
    if (response.status == 200 && responseString.error == 'none') window.location.href = responseString.url;
    else if (response.status == 403) await setFaultMessageUnauthorized();
    else setFaultMessage();
    setResponseValues();
}


/**
 * The function sends a login request using the POST method to the '/login/' endpoint.
 */
async function sendLoginRequest() {
    response = await fetch('/login/', {
        method: 'POST',
        body: fd
    });
}



/**
 * The above code contains various functions related to handling responses, creating form data,
 * validating login form inputs, and displaying error messages.
 */
async function resetResponseValues() {
    response = 'unset';
    responseStatus = 999;
    responseStatusText = 'unset';
    receivedFaultMessage = 'unset';
    responseString = 'unset';
}


/**
 * The above code snippet contains JavaScript functions related to handling responses, creating form
 * data, logging out, and retrieving a CSRF token.
 */
async function setResponseValues() {
    responseStatus = response.status;
    responseStatusText = response.statusText;
}


/**
 * The function "setReceivedFaultMessage" asynchronously sets the value of the "receivedFaultMessage"
 * variable by extracting the "error" property from the JSON response.
 */
async function setReceivedFaultMessage() {
    responseString = await response.json();
    receivedFaultMessage = await responseString.error;
}


/**
 * The function creates a FormData object and appends CSRF token, username, and password values to it.
 */
async function createFormData() {
    fd = new FormData();
    fd.append('csrfmiddlewaretoken', await getToken());
    fd.append('username', username.value);
    fd.append('password', password.value);
}


/**
 * The above function is an asynchronous JavaScript function that logs the user out by sending a POST
 * request to the '/logout/' endpoint with a CSRF token and then redirects the user to the response
 * URL.
 */
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



/**
 * The function `getToken` retrieves the value of a CSRF token from a form field.
 */
async function getToken() {
    let tokenField = document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    return token;
}


/**
 * The function checks if the entered username is valid by ensuring it does not contain special
 * characters and is at least 5 characters long.
 */
function checkEnteredValuesUsername() {
    mainLoginWarning.innerHTML = '';
    usernameValid = false;
    const allowedCharacters = /[^a-zA-Z0-9\s]/;
    username.value = username.value.trim();
    if (allowedCharacters.test(username.value)) setWarningUsernameSpecialCharacters();
    else if (username.value.length < 5) setWarningUsernameToShortLength()
    else disableUsernameWarning();
    setBtnDisabledValue();
}


/**
 * The function sets a warning message for the username field if it contains special characters.
 */
function setWarningUsernameSpecialCharacters() {
    uWarning.style.display = 'flex';
    uWarning.innerHTML = '*Es sind keine Sonderzeichen erlaubte!';
}


/**
 * The function sets a warning message for the username field if it is too short.
 */
function setWarningUsernameToShortLength() {
    uWarning.style.display = 'flex';
    uWarning.innerHTML = '*Der Benutzername muss mindestens 5 Zeichen lang sein!';
}


/**
 * The function disables the display of a warning message for invalid usernames.
 */
function disableUsernameWarning() {
    uWarning.style.display = 'none';
    usernameValid = true;
}


/**
 * The function checks if the entered password meets certain criteria and displays a warning message if
 * it doesn't.
 */
function checkEnteredValuesPassword() {
    mainLoginWarning.innerHTML = '';
    passwordValid = false;
    const notAllowed = /[<>]/;
    const minLength = 6;
    if (notAllowed.test(password.value)) setWarningForbiddenSpecialCharacters();
    else if (password.value.length < minLength) setWarningPasswordToShortLength()
    else disablePasswordWarning();
    setBtnDisabledValue();
}


/**
 * The function sets a warning message and displays it if the special characters < or > are used.
 */
function setWarningForbiddenSpecialCharacters() {
    pWarning.style.display = 'flex';
    pWarning.innerHTML = '*Das Sonderzeichen < oder > ist nicht erlaubt!';
}


/**
 * The function sets a warning message to be displayed if the password entered is too short.
 */
function setWarningPasswordToShortLength() {
    pWarning.style.display = 'flex';
    pWarning.innerHTML = '*Das Passwort muss mindestens 6 Zeichen lang sein!';
}


/**
 * The function disables the display of a password warning and sets a variable to indicate that the
 * password is valid.
 */
function disablePasswordWarning() {
    pWarning.style.display = 'none';
    passwordValid = true;
}


/**
 * The function sets the disabled value of a button based on the validity of a username and password.
 */
function setBtnDisabledValue() {
    if (usernameValid && passwordValid) loginDisabled = false;
    else loginDisabled = true;
    sendBtn.disabled = loginDisabled;
}


/**
 * The function "activatedLoadingScreen" displays the loading screen by setting the style of the
 * loading element to "display: flex".
 */
function activatedLoadingScreen() {
    loading.style = 'display: flex';
}


/**
 * The function "deactivatedLoadingScreen" hides the loading screen by setting the display property to
 * "none".
 */
function deactivatedLoadingScreen() {
    loading.style = 'display: none';
}


/**
 * The function "resetForm" resets the values of the username and password fields and disables the send
 * button.
 */
function resetForm() {
    usernameValid = false;
    passwordValid = false;
    username.value = '';
    password.value = '';
    sendBtn.disabled = true;
}


/**
 * The function sets a fault message for unauthorized access and resets a form.
 */
async function setFaultMessageUnauthorized() {
    resetForm();
    mainLoginWarning.innerHTML = '*Unbefugter Zugriffsversuch! Zugriff Verweigert !';
    deactivatedLoadingScreen();
}


/**
 * The function sets the main fault message, resets a form, updates a login warning message, and
 * deactivates a loading screen.
 */
function setFaultMessage() {
    mainFaultMessage = receivedFaultMessage;
    resetForm();
    mainLoginWarning.innerHTML = mainFaultMessage;
    deactivatedLoadingScreen();
}


/**
 * The function sets a server error fault by resetting a form, displaying a warning message, and
 * deactivating a loading screen.
 */
function setServerErrorFault() {
    resetForm();
    mainLoginWarning.innerHTML = '*Keine Verbindung zum Server!';
    deactivatedLoadingScreen();
}