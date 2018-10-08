$(document).ready(function () {

  $("#submitUser").on("click", function (event) {
    event.preventDefault();

    var newUser = {
      firstName: $("#first").val().trim(),
      lastName: $("#last").val().trim(),
      username: $("#username").val().trim(),
      password: $("#password").val().trim(),
      budget: $("#starterMoney").val().trim(),

    };

    $.post("/api/user", newUser)
      .then(function (data) {
        console.log(data);
      })
    redirect();
  });

  function redirect(){
    alert("New User Added");
    window.location.href = "/expenses";
  }



  $("#login").on("click", function (event) {
    event.preventDefault();
    var login = {
      username: $("#userTwo").val().trim(),
      password: $("#passTwo").val().trim()
    }
    console.log(login);
    $.post("/login", login)
      .then(function(data){
        console.log(data);
      })
  });

  });