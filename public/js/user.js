$(document).ready(function () {

$("#submitUser").on("click", function (event) {
    event.preventDefault();

    var newUser = {
      username: $("#username").val().trim(),
      password: $("#password").val().trim(),
      money: $("#moneyAmount").val().trim()
    };

    $.post("/api/user", newUser)
    .then(function(data){
      console.log("New User Added " + data);
    })
  });









  
});