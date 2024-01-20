let fd = new FormData();
let response = 'unset';
let responseStatus = 999;
let responseStatusText = 'unset';
let receivedFaultMessage = 'unset';
let responseString = 'unset';
let passwordValid = false;
let usernameValid = false;
let loginDisabled = true;
let mainFaultMessage = '';

let setChannelId;


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


// Message hinzufügen

let responseM;
let responseStringM;
let counter = 0;
let json;


/**
 * Sends a POST request to the chat server to save the new message.
 * Get a JSON response with the saved message Data.
 * 
 * @returns {Promise<void>} A Promise that resolves once the message is sent.
 */
async function sendMessage(channel_id) {
    setChannelId = channel_id;
    document.getElementById('sendMessageBtn').disabled = true;
    let message = messageInput.value;
    addNewMessage(message);
    let fd = getFormDataM();
    try {
        responseM = await fetch('/chat/', {
            method: 'POST',
            body: fd
        });
        responseStringM = await responseM.json();
        json = await JSON.parse(responseStringM);
        responseReceivedM(json.fields.text);
    } catch (e) {
        console.error('An error occurred', e);
    }
}


/**
 * Constructs FormData object with message and CSRF token.
 * 
 * @returns {FormData} A FormData object containing message and CSRF token.
 */
function getFormDataM() {
    let data = new FormData();
    tokenField = document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    data.append('textmessage', messageInput.value);
    data.append('channel_id', setChannelId);
    data.append('csrfmiddlewaretoken', token);
    messageInput.value = '';
    return data;
}


/**
 * Generates a timestamp string in the format '[Month. Day, Year] :'.
 * 
 * @returns {string} A string representing the generated timestamp.
 */
function getTimestamp() {
    newDate = new Date();
    mouth = newDate.toString().slice(4, 7);
    day = newDate.getDate();
    year = newDate.getFullYear();
    timeStampString = '[' + mouth + '. ' + day + ', ' + year + '] ';
    return timeStampString;
}


/**
 * Adds a new message with a timestamp to the Frontend element.
 * 
 * @param {string} message - The message to be displayed.
 */
function addNewMessage(message) {
    const messageElement = document.createElement('div');
    const day = new Date();
    const hours = day.getHours();
    const minutes = day.getMinutes();
    const clockString = hours + ':' + minutes;


    messageElement.innerHTML += `
    <div class="chatLoggedUserMessageOuter">
        <div class="chatLoggedUserMessageMain">
        <div class="chatLoggedUserMessageBubble">
            <i>${message}</i>
            <span class="loggedUserMessageClockTimeContainer">
              ${clockString} Uhr 
              <span class="material-symbols-outlined loggedUserAllDone">
                done_all
              </span>
            </span>
        </div>
        <div class="loggedUserMessageInfo">
            <span class="grey">[${getTimestamp()}]</span>
            <span class="grey">${clockString}]</span> 
            <span style="color: #3F51B5;"><b>${username.innerHTML}</b></span>
        </div>
    </div>`;
    document.getElementById('frontMessage').appendChild(messageElement);
    counter++;
}


/**
 * Called when a response is received.
 * Removes the 'waiting' class from an element with the corresponding ID.
 * Replace the Frontend generated message with the backend response message.
 * 
 * @param {string} message - The backend response message.
 */
function responseReceivedM(message) {
    // id = 'message' + (counter - 1).toString();
    // document.getElementById(id).classList.remove('waiting');
    // id.innerHTML = `
    //     <span class="grey">${getTimestamp()}</span> ${username.innerHTML}: <i>${message}</i>
    // `;
}



function validateSendMessageBtn() {
    let message = messageInput.value;
    if (message.trim().length > 0) {
        document.getElementById('sendMessageBtn').disabled = false;
    } else {
        document.getElementById('sendMessageBtn').disabled = true;
    }
};





async function createChannel(){
    let channelData = new FormData();
    channelData.append('csrfmiddlewaretoken', await getToken());
    channelData.append('chat_name', channelName.value);
    try {
        closeChannelCreationMenu();
        channelName.value = '';
        responseM = await fetch('/create_chat/', {
            method: 'POST',
            body: channelData
        });
        let responseChannelname= await responseM.json();
        let jsonChannelmessage = await JSON.parse(responseChannelname);
        console.log(jsonChannelmessage);
    } catch (e) {
        console.error('An error occurred', e);
    }

}


function openChannelCreationMenu() {
    document.getElementById('channelCreationMenu').style.display = 'flex';
}

function closeChannelCreationMenu() {
    document.getElementById('channelCreationMenu').style.display = 'none';
}


async function loadChannel(channelId) {
    
    window.location.href = `http://127.0.0.1:8000/chat/?channel_id=${channelId}`;
    setChannelId = channelId;
    // try {
    //     const response = await fetch(`/chat/?channel_id=${channelId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': await getToken(),
    //         },
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Server returned ${response.status} ${response.statusText}`);
    //     }

    //     // Angenommen, die Antwort enthält HTML-Inhalt; aktualisiere den Inhalt der aktuellen Seite
    //     const responseData = await response.text();
    //     // document.body.innerHTML = responseData;
    // } catch (e) {
    //     console.error('Ein Fehler ist aufgetreten', e);
    // }
}


async function ladeChatMitIdVier() {
    // Erstelle eine FormData-Instanz und füge den Parameter channel_id=4 hinzu
    const formData = new FormData();
    formData.append('channel_id', 4);

    // Ersetze dies durch deinen CSRF-Token-Wert
    const csrfToken = await getToken();

    // Ersetze die URL durch deine tatsächliche Django-URL
    const url = '/chat/';

    // Verwende Fetch, um die Daten zu laden
    fetch(url + new URLSearchParams(formData), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Füge deinen CSRF-Token zum Header hinzu
            'X-CSRFToken': csrfToken,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Laden des Chats');
        }
        return response.json();
    })
    .then(data => {
        // Die Antwort enthält die geladenen Chat-Nachrichten
        console.log(data);
        // Hier kannst du den HTML-Code aktualisieren, um die Nachrichten anzuzeigen
        // z.B. document.getElementById('chat-container').innerHTML = data;
    })
    .catch(error => {
        console.error('Fehler beim Laden des Chats:', error);
    });
}