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
      // getMoney();
    redirect();
  });

  function redirect(){
    alert("New User Added");
    window.location.href = "/expenses";
  }

  var moneyLeft = $("#starterMoney");


  // function getMoney() {
  //   $.get("/api/money", function(data) {
  //     var rowsToAdd = [];
  //     for (var i = 0; i < data.length; i++) {
  //       rowsToAdd.push(createMoneyRow(data[i]));
  //     }
  //     renderMoneyList(rowsToAdd);
  //     moneyLeft.val("");
  //     console.log(moneyLeft);
  //   });
  // }

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