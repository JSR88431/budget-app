$(document).ready(function () {

  $("#submitUser").on("click", function (event) {
<<<<<<< HEAD
    event.preventDefault();

    var newUser = {
      firstName: $("#first").val().trim(),
      lastName: $("#last").val().trim(),
      username: $("#username").val().trim(),
      password: $("#password").val().trim(),
    };

    $.post("/api/user", newUser)
      .then(function (data) {
=======
      event.preventDefault();
  
      var newUser = {
        firstName:$("#first").val().trim(),
        lastName:$("#last").val().trim(),
        username: $("#username").val().trim(),
        password: $("#password").val().trim(),
      };

  
      $.post("/api/user", newUser)
      .then(function(data){
>>>>>>> 98e3b7b1b53493e2b520f273b8fe3535f1de0a71
        console.log(data);
      })
    // redirect();
  });

  // function redirect(){
  //   alert("New User Added");
  //   window.location.href = "/expenses";
  // }



  $("#login").on("click", function (event) {
    event.preventDefault();
    var login = {
      username: $("#username").val(),
      password: $("#password").val()
    }
    $.post("/login", login)
      .then(function(data){
        data.redirect("/expenses");
      })
  });

  });