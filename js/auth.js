var username = localStorage.getItem('sessionUserName');
var baseURL = localStorage.getItem('baseURL');
if (username == null) {
    if (baseURL == '127.0.0.1:5500') {
        location.replace('http:/' + baseURL);
    } else {
        location.replace("https:/" + baseURL)
    }
}