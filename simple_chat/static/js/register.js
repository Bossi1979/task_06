let rUsernameValid = false;  
let rPasswordValid = false;
let rCPasswordValid = false;
let pIdenticalValid = false;


/**
 * The code contains three functions for validating a username, password, and confirm password fields
 * in a form.
 */
function rUsernameValidation() {
    rUsernameValid = false; 
    const allowedCharacters = /[^a-zA-Z0-9\s]/;
    rUsername.value = rUsername.value.trim();
    if (allowedCharacters.test(rUsername.value)) rSetWarningUsernameSpecialCharacters();
    else if (rUsername.value.length < 5) rSetWarningUsernameToShortLength()
    else rDisableUsernameWarning();
    rSetBtnDisabledValue();
}


/**
 * The function performs password validation by checking for forbidden special characters and minimum
 * length, and updates the warning messages and button disabled state accordingly.
 */
function passwordValidation() {
    rPasswordValid = false;
    if (rNotAllowedSpecialCharacters()) rSetWarningForbiddenSpecialCharacters();
    else if (rPasswordToShortLength()) rSetWarningPasswordToShortLength();
    else rDisablePasswordWarning();
    rSetBtnDisabledValue();
}


/**
 * The function `confirmPasswordValidation` checks if the confirmed password meets certain criteria and
 * updates the UI accordingly.
 */
function confirmPasswordValidation() {
    rCPasswordValid = false;
    pIdenticalValid = false;
    if (rCNotAllowedSpecialCharacters()) rCSetWarningForbiddenSpecialCharacters();
    else if (rCPasswordToShortLength()) rCSetWarningPasswordToShortLength();
    else if (!cPasswordIdentical()) setWarningNotIdentical()
    else rCDisablePasswordWarning();
    rSetBtnDisabledValue();
}


/**
 * The function "resetEnteredValues" clears the values of three input fields.
 */
function resetEnteredValues() {
    rUsername.value = '';
    rPassword.value = '';
    rConfirmPassword.value = '';
}


/**
 * The function "disableRegisterBtn" disables the register button.
 */
function disableRegisterBtn() {
    registerBtn.disabled = true;
}


/**
 * The function enables a register button by setting its disabled property to false.
 */
function enableRegisterBtn() {
    registerBtn.disabled = false;
}



/**
 * The function sets a warning message for the username field if it contains special characters.
 */
function rSetWarningUsernameSpecialCharacters() {
    uRWarning.style.display = 'flex';
    uRWarning.innerHTML = '*Es sind keine Sonderzeichen erlaubte!';
    rUsernameValid = false;
}

/**
 * The function sets a warning message for the username field if it is too short.
 */
function rSetWarningUsernameToShortLength() {
    uRWarning.style.display = 'flex';
    uRWarning.innerHTML = '*Der Benutzername muss mindestens 5 Zeichen lang sein!';
    rUsernameValid = false;
}


/**
 * The function disables the display of a warning message for invalid usernames.
 */
function rDisableUsernameWarning() {
    uRWarning.style.display = 'none';
    rUsernameValid = true;
}


/**
 * The function sets the disabled value of a button based on the validity of a username and password.
 */
function rSetBtnDisabledValue() {
    if (rUsernameValid && rPasswordValid && rCPasswordValid && pIdenticalValid) enableRegisterBtn();
    else disableRegisterBtn();
}


/**
 * Checks if the password contains special characters that are not allowed.
 *
 * @returns {boolean} True if the password contains not allowed special characters, otherwise false.
 */
function rNotAllowedSpecialCharacters() {
    const notAllowed = /[<>]/;
    return notAllowed.test(rPassword.value);
}


/**
 * The function checks if the length of a password is shorter than a specified minimum length.
 * 
 * @returns a boolean value indicating whether the length of the password is less than the minimum
 * length (6 characters) or not.
 */
function rPasswordToShortLength() {
    const minLength = 6;
    return rPassword.value.length < minLength;
}


/**
 * The function sets a warning message and displays it if the special characters < or > are used.
 */
function rSetWarningForbiddenSpecialCharacters() {
    rPWarning.style.display = 'flex';
    rPWarning.innerHTML = '*Das Sonderzeichen < oder > ist nicht erlaubt!';
}


/**
 * The function sets a warning message to be displayed if the password entered is too short.
 */
function rSetWarningPasswordToShortLength() {
    rPWarning.style.display = 'flex';
    rPWarning.innerHTML = '*Das Passwort muss mindestens 6 Zeichen lang sein!';
}


/**
 * The function disables the display of a password warning and sets a variable to indicate that the
 * password is valid.
 */
function rDisablePasswordWarning() {
    rPWarning.style.display = 'none';
    rPasswordValid = true;
}


/**
 * Checks if the password contains special characters that are not allowed.
 *
 * @returns {boolean} True if the password contains not allowed special characters, otherwise false.
 */
function rCNotAllowedSpecialCharacters() {
    const notAllowed = /[<>]/;
    return notAllowed.test(rCPassword.value);
}


/**
 * The function sets a warning message and displays it if the special characters < or > are used.
 */
function rCSetWarningForbiddenSpecialCharacters() {
    rCPWarning.style.display = 'flex';
    rCPWarning.innerHTML = '*Das Sonderzeichen < oder > ist nicht erlaubt!';
}


/**
 * The function checks if the length of a password is shorter than a specified minimum length.
 * 
 * @returns a boolean value indicating whether the length of the password is less than the minimum
 * length (6 characters) or not.
 */
function rCPasswordToShortLength() {
    const minLength = 6;
    return rCPassword.value.length < minLength;
}


/**
 * The function sets a warning message to be displayed if the password entered is too short.
 */
function rCSetWarningPasswordToShortLength() {
    rCPWarning.style.display = 'flex';
    rCPWarning.innerHTML = '*Das Passwort muss mindestens 6 Zeichen lang sein!';
}


/**
 * The function disables the display of a password warning and sets a variable to indicate that the
 * password is valid.
 */
function rCDisablePasswordWarning() {
    rCPWarning.style.display = 'none';
    rCPasswordValid = true;
    pIdenticalValid = true;
}



/**
 * The function checks if the value of the "rCPassword" input field is not identical to the value of
 * the "rCPassword" input field.
 * 
 * @returns a boolean value indicating whether the value of the "rCPassword" input field is not
 * identical to itself.
 */
function cPasswordIdentical(){
    return rCPassword.value == rPassword.value;
}


/**
 * The function sets a warning message if the confirmation password does not match the password.
 */
function setWarningNotIdentical(){
    rCPWarning.style.display = 'flex';
    rCPWarning.innerHTML = '*Das Bestätigungspasswort entspricht nicht dem Passwort!';
}

