let responseC;


/**
 * The function "openChannelCreationMenu" displays the channel creation menu by changing the display
 * style to "flex".
 */
function openChannelCreationMenu() {
    document.getElementById('channelCreationMenu').style.display = 'flex';
}

/**
 * The function closeChannelCreationMenu clears the value of a channel name input field and hides a
 * channel creation menu.
 */
function closeChannelCreationMenu() {
    channelName.value = '';
    document.getElementById('channelCreationMenu').style.display = 'none';
}


/**
 * The function `loadChannel` redirects the user to a chat page with the specified channel ID.
 * 
 * @param channelId - The channelId parameter is the unique identifier of a channel. It is used to
 * specify which channel to load in the chat application.
 */
async function loadChannel(channelId) {
    window.location.href = `http://127.0.0.1:8000/chat/?channel_id=${channelId}`;
}


/**
 * The above function is an asynchronous function that creates a new channel by sending a POST request
 * to a server endpoint and handling the response.
 */
async function createChannel() {
    let channelData = await createChannelData();
    try {
        closeChannelCreationMenu();
        channelName.value = '';
        responseC = await fetch('/create_chat/', {
            method: 'POST',
            body: channelData
        });
        addChannelName(responseC);
    } catch (e) {
        alert('Der neue Channel konnte nicht erstellt werden!');
    }
}


/**
 * The function creates a FormData object with a CSRF token and a chat name.
 * 
 * @returns a FormData object that contains the CSRF token and the chat name.
 */
async function createChannelData(){
    let channelData = new FormData();
    channelData.append('csrfmiddlewaretoken', await getToken());
    channelData.append('chat_name', channelName.value);
    return channelData;
}


/**
 * The function checks if the entered channel name is valid by ensuring it has a length between 5 and
 * 20 characters.
 */
function checkChannelNameValidity() {
    let enteredName = channelName.value;
    if (nameLengthInLimit(enteredName)) {
        cCWarning.style.display = 'none';
        document.getElementById('channelCBtn').disabled = false;
    } else {
        let warningText = 'Der Name muss muss mindestens 5 Zeichen lang sein!';
        cCWarning.innerHTML = warningText;
        cCWarning.style.display = 'flex';
        document.getElementById('channelCBtn').disabled = true;
    }
}


/**
 * The function checks if the length of the entered name, after removing leading and trailing spaces,
 * is between 5 and 20 characters.
 * 
 * @param enteredName - The parameter "enteredName" is a string representing a name that is entered by
 * the user.
 * @returns a boolean value. It will return true if the length of the enteredName (after trimming any
 * leading or trailing whitespace) is greater than or equal to 5 and less than or equal to 20.
 * Otherwise, it will return false.
 */
function nameLengthInLimit(enteredName) {
    return enteredName.trim().length >= 5 && enteredName.length <= 20;
}


/**
 * The function adds a channel name to a chat list in HTML.
 * 
 * @param channelData - An object containing the data of a channel. It has the following properties:
 */
async function addChannelName(responseC){
    let responseChannelname = await responseC.json();
    let channelData = await JSON.parse(responseChannelname);
    chatList.innerHTML += `<span class="mdl-navigation__link channelList"  onclick="loadChannel(${channelData.pk})">${channelData.fields.chat_name}</span>`;
    await loadChannel(channelData.pk);
}