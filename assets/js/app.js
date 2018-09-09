$(document).ready(function () {
  // Initial array of giphy
  var gifNames = ["pug", "bulldog", "beagle", "poodle", "chihuahua", "chow chow", "shih tzu", "akita"];



  // Function for displaying giphy data

  function displaygiphyInfo() {

    var giphy = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uobT4cNfVLLrab1olJJFhxHlzU6ifiHC&q=" + giphy + "&limit=10&offset=0&rating=G&lang=en";
    //var queryURL = api + apiKey + query;


    // Creating an AJAX call for the specific giphy button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      console.log(response);

      var results = response.data;

      for (var t = 0; t < results.length; t++) {

        // Creating a div to hold the giphy
        var giphyDiv = $("<div class='holder img-thumbnail'>");


        // Storing the rating data
        var rating = response.data[t].rating;

        console.log(rating);

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        giphyDiv.append(pOne);

        // Displaying the images
        var image = $("<img>");
        image.attr("src", response.data[t].images.original_still.url);
        image.attr("data-still", response.data[t].images.original_still.url);
        image.attr("data-animate", response.data[t].images.original.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");
        giphyDiv.append(image);


        $('#giphys-view').prepend(giphyDiv);

      }
    });
  }



  function renderButtons() {

    // Deleting the giphys prior to adding new giphys
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of giphys

    for (var i = 0; i < gifNames.length; i++) {

      // Then dynamicaly generating buttons for each giphy in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of giphy-btn to our button
      a.addClass("giphy-btn btn btn-info");
      // Adding a data-attribute
      a.attr("data-name", gifNames[i]);
      // Providing the initial button text
      a.text(gifNames[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);


    }
  }

  function imageChangeState() {

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }



  // Add more subject button
  $("#add-giphy").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var giphy = $("#giphy-input").val().trim();

    // Adding giphy from the textbox to our array
    if (giphy.length !== 0) {
      gifNames.push(giphy);
    };

    // Calling renderButtons which handles the processing of our giphy array
    renderButtons();
  });



  // Adding a click event listener to all elements with a class of "giphy-btn"
  $(document).on("click", ".giphy-btn", displaygiphyInfo);
  $(document).on("click", ".gif", imageChangeState);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();



});


