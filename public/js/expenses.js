$(document).ready(function() {
  var newAmount = $("input.amount");
  var newDescription = $("input.description");
  var newContainer = $(".expenses-container");
  $(document).on("click", "button.delete", deleteExpenses);
  $(document).on("submit", "#expenses-form", insertExpenses);

  var expenses = [];

  getExpenses();

  function initializeRows() {
    newContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < expenses.length; i++) {
      rowsToAdd.push(createNewRow(expenses[i]));
    }
    newContainer.prepend(rowsToAdd);
  }

  function getExpenses() {
    $.get("/api/expenses", function(data) {
      expenses = data;
      initializeRows();
    });
  }

  function deleteExpenses(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/expenses/" + id
    }).then(getExpenses);
  }

  function createNewRow(expenses) {
    var $newInputRow = $(
      [
        "<li class='list-group-item expenses-item'>",
        "<span>",
        expenses.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", expenses.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("expenses", expenses);
    return $newInputRow;
  }

  function insertExpenses(event) {
    event.preventDefault();
    var expenses = {
      amount: newAmount.val().trim(),
      description: newDescription.val().trim()
      
    };

    $.post("/api/expenses", expenses, getExpenses);
    newAmount.val("");
    newDescription.val("");
  }
});