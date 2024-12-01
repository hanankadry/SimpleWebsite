var loginUserEmail = document.getElementById('login-user-email');
var loginUserPass = document.getElementById('login-user-password');
var signupUserName = document.getElementById('signup-user-name');
var signupUserEmail = document.getElementById('signup-user-email');
var signupUserPass = document.getElementById('signup-user-password');


var path = location.pathname.split('/');
var baseURL = '';
for (let i = 0; i < path.length - 1; i++) {
  baseURL += '/' + path[i]
};

var username = localStorage.getItem('sessionUserName');
if (username) {
  document.getElementById('welcome-user').innerHTML = "Welcome " + username;
}

var users = [];
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  var users = JSON.parse(localStorage.getItem("users"));
}

function emailExists() {
  if (users.length == 0) {
    return false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (signupUserEmail.value.toLowerCase() == users[i].email.toLowerCase()) {
        return true;
      };
    };
  }
}

function signUp() {
  if (signupUserName.value == "" || signupUserEmail.value == "" || signupUserPass.value == "") {
    document.getElementById('signup-err-msg').innerHTML = `<span class="text-danger m-3">all inputs are required</span>`;
  } else {
    var user = {
      name: signupUserName.value,
      email: signupUserEmail.value,
      pass: signupUserPass.value
    };
    if (emailExists()) {
      document.getElementById('signup-err-msg').innerHTML = `<span class="text-danger m-3">email already exists</span>`;
    } else {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      document.getElementById('signup-err-msg').innerHTML = `<span class="text-success m-3">success</span>`;
    }
  }
}


function logIn() {
  if (loginUserEmail.value == "" || loginUserPass.value == "") {
    document.getElementById('login-err-msg').innerHTML = `<span class="text-danger m-3">all inputs are required</span>`;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (loginUserEmail.value == users[i].email && loginUserPass.value == users[i].pass) {
        document.getElementById('login-err-msg').innerHTML = `<span class="text-success m-3">success</span>`;
        localStorage.setItem("sessionUserName", users[i].name);
        if (baseURL == '/') {
          location.replace('http://' + location.hostname + '/home.html');
        } else {
          location.replace(baseURL + '/home.html');
        }
      } else {
        document.getElementById('login-err-msg').innerHTML = `<span class="text-danger m-3">incorrect email or password</span>`;
      }
    }
  }
}

function logOut() {
  localStorage.removeItem("sessionUserName");
}