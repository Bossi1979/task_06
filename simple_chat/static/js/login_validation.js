/**
 * The function checks if the entered username is valid by ensuring it does not contain special
 * characters and is at least 5 characters long.
 * 
 * @ returns {void}
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
 * 
 * @ returns {void}
 */
function setWarningUsernameSpecialCharacters() {
    uWarning.style.display = 'flex';
    uWarning.innerHTML = '*Es sind keine Sonderzeichen erlaubte!';
}


/**
 * The function sets a warning message for the username field if it is too short.
 * 
 * @ returns {void}
 */
function setWarningUsernameToShortLength() {
    uWarning.style.display = 'flex';
    uWarning.innerHTML = '*Der Benutzername muss mindestens 5 Zeichen lang sein!';
}


/**
 * The function disables the display of a warning message for invalid usernames.
 * 
 * @ returns {void}
 */
function disableUsernameWarning() {
    uWarning.style.display = 'none';
    usernameValid = true;
}


/**
 * The function checks if the entered password meets certain criteria and displays a warning message if
 * it doesn't.
 * 
 * @ returns {void}
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
 * 
 * @ returns {void}
 */
function setWarningForbiddenSpecialCharacters() {
    pWarning.style.display = 'flex';
    pWarning.innerHTML = '*Das Sonderzeichen < oder > ist nicht erlaubt!';
}


/**
 * The function sets a warning message to be displayed if the password entered is too short.
 * 
 * @ returns {void}
 */
function setWarningPasswordToShortLength() {
    pWarning.style.display = 'flex';
    pWarning.innerHTML = '*Das Passwort muss mindestens 6 Zeichen lang sein!';
}


/**
 * The function disables the display of a password warning and sets a variable to indicate that the
 * password is valid.
 * 
 * @ returns {void}
 */
function disablePasswordWarning() {
    pWarning.style.display = 'none';
    passwordValid = true;
}


/**
 * The function sets the disabled value of a button based on the validity of a username and password.
 * 
 * @ returns {void}
 */
function setBtnDisabledValue() {
    if (usernameValid && passwordValid) loginDisabled = false;
    else loginDisabled = true;
    sendBtn.disabled = loginDisabled;
}


/**
 * The function "activatedLoadingScreen" displays the loading screen by setting the style of the
 * loading element to "display: flex".
 * 
 * @ returns {void}
 */
function activatedLoadingScreen() {
    loading.style = 'display: flex';
}


/**
 * The function "deactivatedLoadingScreen" hides the loading screen by setting the display property to
 * "none".
 * 
 * @ returns {void}
 */
function deactivatedLoadingScreen() {
    loading.style = 'display: none';
}


/**
 * The function "resetForm" resets the values of the username and password fields and disables the send
 * button.
 * 
 * @ returns {void}
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
 * 
 * @ returns {void}
 */
async function setFaultMessageUnauthorized() {
    resetForm();
    mainLoginWarning.innerHTML = '*Unbefugter Zugriffsversuch! Zugriff Verweigert !';
    deactivatedLoadingScreen();
}


/**
 * The function sets the main fault message, resets a form, updates a login warning message, and
 * deactivates a loading screen.
 * 
 * @ returns {void}
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
 * 
 * @ returns {void}
 */
function setServerErrorFault() {
    resetForm();
    mainLoginWarning.innerHTML = '*Keine Verbindung zum Server!';
    deactivatedLoadingScreen();
}