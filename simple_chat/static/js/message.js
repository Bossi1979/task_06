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
    activatedLoadingScreen();
    setChannelId = channel_id;
    document.getElementById('sendMessageBtn').disabled = true;
    let message = messageInput.value;
    const clockString = await createClockString();
    addNewMessage(message, clockString);
    let fd = getFormDataM(clockString);
    try {
        responseM = await fetch('/chat/', {
            method: 'POST',
            body: fd
        });
        responseStringM = await responseM.json();
        json = await JSON.parse(responseStringM);
        deactivatedLoadingScreen();

    } catch (e) {
        deactivatedLoadingScreen();
        responseReceivedFailed();
        alert('Ihre Nachricht konnte nicht gespeichert werden.');
    }
}


/**
 * The function creates a string representing the current time in the format "HH:MM".
 * 
 * @returns a string representing the current time in the format "HH:MM".
 */
async function createClockString() {
    const day = new Date();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    if (hours.toString().length == 1) hours = '0' + hours.toString();
    if (minutes.toString().length == 1) minutes = '0' + minutes.toString();
    const clockString = hours + ':' + minutes;
    return clockString;
}


/**
 * Constructs FormData object with message and CSRF token.
 * 
 * @returns {FormData} A FormData object containing message and CSRF token.
 */
function getFormDataM(clockString) {
    let data = new FormData();
    tokenField = document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    data.append('textmessage', messageInput.value);
    data.append('channel_id', setChannelId);
    data.append('created_time', clockString);
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
function addNewMessage(message, clockString) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML += `
    <div class="chatLoggedUserMessageOuter">
        <div class="chatLoggedUserMessageMain">
        <div class="chatLoggedUserMessageBubble">
            <i>${message}</i>
            <span class="loggedUserMessageClockTimeContainer">
              ${clockString} Uhr 
              <span class="material-symbols-outlined loggedUserAllDone" id='messageStatus${counter}'>
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
    scrollToBottom();
}


/**
 * Called when a response is received.
 * Removes the 'waiting' class from an element with the corresponding ID.
 * Replace the Frontend generated message with the backend response message.
 * 
 * @param {string} message - The backend response message.
 */
function responseReceivedFailed(message) {
    document.getElementById(`messageStatus${counter - 1}`).innerHTML = 'cancel';
    document.getElementById(`messageStatus${counter - 1}`).classList.add('messageFailed');
}


/**
 * The function checks if the message input is not empty and enables or disables the send message
 * button accordingly.
 */
function validateSendMessageBtn() {
    let message = messageInput.value;
    if (message.trim().length > 0) {
        document.getElementById('sendMessageBtn').disabled = false;
    } else {
        document.getElementById('sendMessageBtn').disabled = true;
    }
}


/**
 * The scrollToBottom function scrolls the page to the bottom smoothly.
 */
function scrollToBottom() {
    scrollMark.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}