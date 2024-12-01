// inputs
var loginUserEmail = document.getElementById('login-user-email');
var loginUserPass = document.getElementById('login-user-password');
var signupUserName = document.getElementById('signup-user-name');
var signupUserEmail = document.getElementById('signup-user-email');
var signupUserPass = document.getElementById('signup-user-password');

// path
var path = location.href.split('/');
var baseURL = '';
for (let i = 2; i < path.length - 1; i++) {
  baseURL += '/' + path[i]
};
console.log(baseURL);
localStorage.setItem("baseURL", baseURL);

// check store
var users = [];
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  var users = JSON.parse(localStorage.getItem("users"));
}

// display username in home
var username = localStorage.getItem('sessionUserName');
if (username != null) {
  document.getElementById('welcome-user').innerHTML = "Welcome " + username;
}

// check if email exists
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

// signup function
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

// login function
function logIn() {
  if (loginUserEmail.value == "" || loginUserPass.value == "") {
    document.getElementById('login-err-msg').innerHTML = `<span class="text-danger m-3">all inputs are required</span>`;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (loginUserEmail.value == users[i].email && loginUserPass.value == users[i].pass) {
        localStorage.setItem("sessionUserName", users[i].name);
        if (baseURL == '127.0.0.1:5500') {
          location.replace('http:/' + baseURL + '/home.html');
        } else {
          location.replace('https:/' + baseURL + '/home.html')
        }
      } else {
        document.getElementById('login-err-msg').innerHTML = `<span class="text-danger m-3">incorrect email or password</span>`;
      }
    }
  }
}

// logout
function logOut() {
  localStorage.removeItem("sessionUserName");
}