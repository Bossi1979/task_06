let responseC;

function openChannelCreationMenu() {
    document.getElementById('channelCreationMenu').style.display = 'flex';
}

function closeChannelCreationMenu() {
    channelName.value = '';
    document.getElementById('channelCreationMenu').style.display = 'none';

}


async function loadChannel(channelId) {
    window.location.href = `http://127.0.0.1:8000/chat/?channel_id=${channelId}`;
}


async function createChannel() {
    let channelData = new FormData();
    channelData.append('csrfmiddlewaretoken', await getToken());
    channelData.append('chat_name', channelName.value);
    try {
        closeChannelCreationMenu();
        channelName.value = '';
        responseC = await fetch('/create_chat/', {
            method: 'POST',
            body: channelData
        });
        let responseChannelname = await responseC.json();
        let jsonChannelmessage = await JSON.parse(responseChannelname);
        addChannelName(jsonChannelmessage);
    } catch (e) {
        alert('Der neue Channel konnte nicht erstellt werden!');
    }
}


function checkChannelNameValidity() {
    let enteredName = channelName.value;
    if (enteredName.trim().length >= 5 && enteredName.length <= 20) {
        cCWarning.style.display = 'none';
        document.getElementById('channelCBtn').disabled = false;
    } else {
        let warningText = 'Der Name muss muss mindestens 5 Zeichen lang sein!';
        cCWarning.innerHTML = warningText;
        cCWarning.style.display = 'flex';
        document.getElementById('channelCBtn').disabled = true;
    }
}


async function addChannelName(channelData){
    chatList.innerHTML += `<span class="mdl-navigation__link"  onclick="loadChannel(${channelData.pk})">${channelData.fields.chat_name}</span>`;
}