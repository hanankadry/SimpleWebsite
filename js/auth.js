var username = localStorage.getItem('sessionUserName');
if (username == null) {
    location.replace("https://" + location.hostname + '/index.html');
}