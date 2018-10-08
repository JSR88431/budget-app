$(document).ready(function() {
    // blogContainer holds all of our posts
    var expenseContainer = $(".expenses-container");
    var expenseCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleExpenseDelete);
    $(document).on("click", "button.edit", handleExpenseEdit);
    // Variable to hold our accounts
  var expense;
  // The code below handles the case where we want to get blog posts for a specific User
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getExpenses();
  }
  // This function grabs posts from the database and updates the view
  function getExpenses(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/account" + userId, function(data) {
      console.log("Account", data);
      account = data;
      if (!expense || !expense.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
}
// This function does an API call to delete posts
function deleteExpense(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/expense/" + id
    })
      .then(function() {
        getExpense(expenseCategorySelect.val());
      });
  }
  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    expenseContainer.empty();
    var expenseToAdd = [];
    for (var i = 0; i < expense.length; i++) {
      expenseToAdd.push(createNewRow(expense[i]));
    }
    expenseContainer.append(expenseToAdd);
  }
  // This function constructs a post's HTML
  function createNewRow(expense) {
    var formattedDate = new Date(expense.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newexpenseCard = $("<div>");
    newexpenseCard.addClass("card");
    var newexpenseCardHeading = $("<div>");
    newexpenseCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newExpenseTitle = $("<h2>");
    var newExpenseDate = $("<small>");
    var newExpenseUser = $("<h5>");
    newExpenseUser.text("Written by: " + Expense.User.name);
    newExpenseUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newExpenseCardBody = $("<div>");
    newExpenseCardBody.addClass("card-body");
    var newExpenseBody = $("<p>");
    newExpenseTitle.text(Expense.title + " ");
    newExpenseBody.text(Expense.body);
    newExpenseDate.text(formattedDate);
    newExpenseTitle.append(newExpenseDate);
    newExpenseCardHeading.append(deleteBtn);
    newExpenseCardHeading.append(editBtn);
    newExpenseCardHeading.append(newExpenseTitle);
    newExpenseCardHeading.append(newExpenseUser);
    newExpenseCardBody.append(newExpenseBody);
    newExpenseCard.append(newExpenseCardHeading);
    newExpenseCard.append(newExpenseCardBody);
    newExpenseCard.data("Expense", Expense);
    return newExpenseCard;
  }
  // This function figures out which post we want to delete and then calls deletePost
  function handleExpenseDelete() {
    var currentExpense = $(this)
      .parent()
      .parent()
      .data("Expense");
    deleteExpense(currentExpense.id);
  }
  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleExpenseEdit() {
    var currentExpense = $(this)
      .parent()
      .parent()
      .data("Expense");
    window.location.href = "/cms?expense_id=" + currentExpense.id;
  }
  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Expense #" + id;
    }
    expenseContainer.empty();
    // var messageH2 = $("<h2>");
    // messageH2.css({ "text-align": "center", "height": "10px" });
    // messageH2.html("No added accounts yet" + partial + ", navigate <a href='/cms.html" + query +
    // "'>here</a> in order to add one.");
    // expenseContainer.append(messageH2);
  }
  
});