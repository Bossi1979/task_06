fd = new FormData();



function login() {
    fd.FormData = new FormData(document.getElementById("loginForm"));


}


async function logout() {
    fd = new FormData();
    fd.append('csrfmiddlewaretoken', await getToken());
    try {
        let response = await fetch('/logout/', {
            method: 'POST',
            body: fd
        });
        console.log(response);
        window.location.href = response.url;
    } catch (error) {
        console.log(error);
    }
}



async function getToken(){
    let tokenField =  document.getElementsByName('csrfmiddlewaretoken');
    let token = tokenField[0].value;
    return token;
}