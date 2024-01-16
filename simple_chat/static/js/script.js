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


/**
 * Performs asynchronous login actions.
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns {Promise<void>}
 */
async function setResponseValues() {
    responseStatus = response.status;
    responseStatusText = response.statusText;
}


/**
 * The function "setReceivedFaultMessage" asynchronously sets the value of the "receivedFaultMessage"
 * variable by extracting the "error" property from the JSON response.
 * 
 * @returns {Promise<void>}
 */
async function setReceivedFaultMessage() {
    responseString = await response.json();
    receivedFaultMessage = await responseString.error;
}


/**
 * The function creates a FormData object and appends CSRF token, username, and password values to it.
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns {Promise<void>}
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
 * 
 * @returns The value of the CSRF token.
 */
async function getToken() {
    let tokenField = document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    return token;
}
