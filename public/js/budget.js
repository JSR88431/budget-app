$("#create").click(function(event) {
  event.preventDefault();
  $(".modal").addClass("is-active");  
});

$("#cancel").click(function() {
  $(".modal").removeClass("is-active");  
});

$(".delete").click(function() {
  $(".modal").removeClass("is-active");  
});


// $("#find").click(function(event) {
// event.preventDefault();
//   $(".modal").addClass("is-active");  
// });

// $("#cancelTWO").click(function() {
//   $(".modal").removeClass("is-active");  
// });

// $(".delete").click(function() {
//   $(".modal").removeClass("is-active");  
// });

