$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var userInput = $("#user-name");
    var userList = $("tbody");
    var userContainer = $(".user-container");
    var moneyLeft = $("#starterMoney");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#user-form", handleUserFormSubmit);
    $(document).on("click", ".delete-user", handleDeleteButtonPress);
    

  
    // Getting the initial list of Users
    getUsers();
  
    // A function to handle what happens when the form is submitted to create a new User
    function handleUserFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!userInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertUser({
        user: userInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getAuthors upon completion
    function upsertUser(userData) {
      $.post("/api/user", userData)
        .then(getUsers);
    }
  
    // Function for creating a new list row for authors
    function createUserRow(userData) {
      var newTr = $("<tr>");
      newTr.data("user", userData);
      newTr.append("<td>" + userData.firstName + "</td>");
      newTr.append("<td><a href='/expenses.html?author_id=" + userData.id + "'>Go to Expenses</a></td>");
      newTr.append("<td><a href='/cms.html?author_id=" + userData.id + "'>Log New Expense</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Account</a></td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getUsers() {
      $.get("/api/user", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createUserRow(data[i]));
        }
        renderUserList(rowsToAdd);
        userInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderUserList(rows) {
      userList.children().not(":last").remove();
      userContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        userList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Account User before you can add Expenses.");
      userContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("author");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/user/" + id
      })
        .then(getUsers);
    }
    


});
  