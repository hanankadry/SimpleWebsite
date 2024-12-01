var username = localStorage.getItem('sessionUserName');
if (username == null) {
    location.replace("http://" + location.hostname + '/index.html');
}