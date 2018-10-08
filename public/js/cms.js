$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var descriptionInput = $("#body");
  var amountInput = $("#title");
  var form = $("#expenses");
  var userSelect = $("#user");
  // Adding an event listener for when the form is submitted
  $(form).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var accountId;
  var userId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?account_id=") !== -1) {
    userId = url.split("=")[1];
    getExpenseData(accountId, "post");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?user_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getUser();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!amountInput.val().trim() || !descriptionInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newExpense = {
      amount: amountInput
        .val()
        .trim(),
      description: descriptionInput
        .val()
        .trim(),
      userId: userSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newExpense.id = expenseId;
      updateExpense(newExpense);
    }
    else {
      submitExpense(newExpense);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitExpense(expense) {
    $.post("/api/expenses", expense, function() {
      window.location.href = "/expense";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getExpenseData(id, type) {
    var queryUrl;
    switch (type) {
    case "expense":
      queryUrl = "/api/expense/" + id;
      break;
    case "user":
      queryUrl = "/api/user/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.userId || data.id);
        // If this post exists, prefill our cms forms with its data
        amountInput.val(data.amount);
        descriptionInput.val(data.description);
        userId = data.UserId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getUser() {
    $.get("/api/user", renderUserList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the author options in the dropdown
  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.userName);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updateExpense(post) {
    $.ajax({
      method: "PUT",
      url: "/api/expenses",
      data: post
    })
      .then(function() {
        window.location.href = "/expenses";
      });
  }
});