// Initial array of topics (Cartoon Characters)
var topics = ["Tazmanian Devil", "Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Tweety", "Foghorn Leghorn", "Porky Pig", "Gossamer", "Lola Bunny", "Marvin the Martian", "Pepé Le Pew"];
var isInitialized = false;

function renderButtons() {

    // Deleting the buttons prior to adding new buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("topic");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    };

    
    if (!isInitialized) {

        // need to add a container around the form to properly space
        $("#more-buttons-form").wrap('<div class="container">');

        // add a break after the label so that the input box appears under the label
        $("label").after("<br>");

        // add a break after the input tags for spacing
        $("input").after("<br>");

        isInitialized = true;
    
    };

};

// Found this function on W3 schools - https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
function capital_letter(str) {
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
};

// 
function displayGIFs() {

    // empty out the gif section if already populated
    $("#gifs-appear-here").empty();

    var topic = $(this).attr("data-name");
    var apiKey = "M3ooN7nN7X3rVj16iZAjKOSp3CVkmDev"
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=cartoon+" + topic + "&limit=10&offset=0&rating=G&lang=en";

    // 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        var results = response.data
        // console.log(results);

        for (var i = 0; i < results.length; i++) {

            var imageDiv = $("<div>");
            imageDiv.addClass("stills");
            var cardTitle = $("<p>");
            cardTitle.text("Rating:  " + results[i].rating.toUpperCase());
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_small_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
            topicImage.attr("data-state", "still");
            topicImage.addClass("gif");
            topicImage.addClass("img-thumbnail");
            imageDiv.append(cardTitle);
            imageDiv.append(topicImage);
            
            $("#gifs-appear-here").prepend(imageDiv.append(topicImage));

        };

    });

};

// code taken from Activity 15-PausingGifs
function animateGIFs() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

// This function handles events where one button is clicked
$("#add-button").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#button-input").val().trim();

    // after grabbing the information, remove it from the page 
    $("#button-input").val("");

    // Capitalize the first letter of every word in the string
    topic = capital_letter(topic.toLowerCase());
    
    //  Make Sure the topic doesn't already exist before adding it to the array
    if (topics.indexOf(topic) === -1) {
        
        // The topic from the textbox is then added to our array
        topics.push(topic);
    };

    // calling renderButtons which handles the processing of our topic array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "topic"
$(document).on("click", ".topic", displayGIFs);

// Adding click event listeners for all the images with class of "gif"
$(document).on("click", ".gif", animateGIFs);


// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();