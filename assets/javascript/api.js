// --------------------------------------------------------------------------------------
//  GLOBAL VARIABLES
// --------------------------------------------------------------------------------------
// Initial array of topics (Cartoon Characters)
var topics = ["Tazmanian Devil", "Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Tweety", "Foghorn Leghorn", "Porky Pig", "Gossamer", "Lola Bunny", "Marvin the Martian", "Pepé Le Pew"];

// initialize a variable to control whether or not the container should be added around the add-button area
var isInitialized = false;

// initialize a variable to hold the current offset for the ajax call so more gifs can be added later
var offset = 0;

// --------------------------------------------------------------------------------------
// function to generate the 'topic' buttons from the array of topics (from Class Activities 07-MovieButtonLayout)
// --------------------------------------------------------------------------------------
function renderButtons() {

    // Deleting the buttons prior to adding new buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        var a = $("<button>");
        // adding bootstrap class for styling
        a.addClass("topic btn btn-secondary");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // Adding the button to the page
        $("#buttons-view").append(a);
    };

    
    // for layout and moving the more-buttons-form section to the right side, wrap a container around the form
    if (!isInitialized) {

        // add a container class around the form
        $("#more-buttons-form").wrap('<div class="container">');

        // add a break after the label so that the input box appears under the label
        $("label").after("<br>");

        // add a break after the input tags for spacing
        $("input").after("<br>");

        // add section to hold favorites populated on a double-click
        var favSectionID = $("<div>");
        favSectionID.attr("id", "fav-section");
        favSectionID.html('<br><h6>Double Click An Image to Add Favorites Here</h6>');

        $("#more-buttons-form").append(favSectionID);

        // update the variable so that this if statement doesn't run every time and continue to add containers
        isInitialized = true;
    
    };

};
// --------------------------------------------------------------------------------------
// end of the renderButtons() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to capitalize the text before putting it into the array
// Found this function on W3 schools - https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
// --------------------------------------------------------------------------------------
function capital_letter(str) {
    // separate the str parameter into pieces based on the 'space' separator
    str = str.split(" ");

    // traverse the string pieces and convert the first character of each word to Upper Case and then concatenate the rest of the string.
    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    // return the capitalize string put back together with the 'space' separator.
    return str.join(" ");
};
// --------------------------------------------------------------------------------------
// end of the capital_letter() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function that is run for the initial request of GIFs
// --------------------------------------------------------------------------------------
function initialDisplay() {
    //  make sure the offset is set to 0 since this is a new set of images
    offset = 0;
    
    // empty out the gif section if already populated
    $("#gifs-appear-here").empty();

    // initialize a local variable to hold the name of the topic to pass to the api request
    var topic = $(this).attr("data-name");

    // call the function that links to the API with a specific topic
    displayGIFs(topic);

};
// --------------------------------------------------------------------------------------
// end of the initialDisplay() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function that runs for the additional requests of GIFs
// --------------------------------------------------------------------------------------
function additionalDisplay() {
    // initialize a local variable to hold the name of the topic to pass to the api request
    var topic = $(this).attr("data-name");

    // increment the offset by 10 so the next set of 10 GIFs will be returned from Giphy
    offset +=10;

    // call the function that links to the API with a specific topic
    displayGIFs(topic);

};
// --------------------------------------------------------------------------------------
// end of the additionalDisplay() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function that completes the ajax call to Giphy with the topic passed in the call
// --------------------------------------------------------------------------------------
function displayGIFs(topic) {

    // set the API key for the app
    var apiKey = "M3ooN7nN7X3rVj16iZAjKOSp3CVkmDev"
    // establish the query with the apiKey, the topic passed into the function, and the global offset variable
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic + "&limit=10&offset=" + offset + "&rating=PG-13&lang=en";

    // call the API with the query setup and the 'GET' method (from Class Activities 13-ButtonTriggeredAJAX)
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        // initialize a local variable to contain the results from the AJAX call
        
        var results = response.data

        // loop through the results and create the html elements for the returned images
        for (var i = 0; i < results.length; i++) {

            // create new div element for the GIF
            var imageDiv = $("<div>");
            // add a 'stills' class to allow for styling to be consistent for all images
            imageDiv.addClass("stills");
            
            // create a new img element
            var topicImage = $("<img />");
            // add the necessary attributes to display the GIF as a still and be able to swap between animate and still via a separate function
            topicImage.attr({
                "src": results[i].images.fixed_height_small_still.url,
                "data-still": results[i].images.fixed_height_small_still.url,
                "data-animate": results[i].images.fixed_height_small.url,
                "data-state": "still"
            });
            // add the bootstrap class for media responsiveness
            topicImage.addClass("gif img-thumbnail");

            // create a new div element for the Rating Information to appear under the image
            var imageCaption = $("<div>"); 
            // update the Rating text based on the data provided from the API
            imageCaption.text("Rating:  " + results[i].rating.toUpperCase());
            // add bootstrap classes to center the text and allow for styling
            imageCaption.addClass("caption text-center");
            
            // append the image element within the div element
            imageDiv.append(topicImage);
            // add the caption div after the image element
            topicImage.after(imageCaption);
            
            // append all the pieces of the GIF within the existing 'gifs-appear-here' div
            $("#gifs-appear-here").append(imageDiv);

        };

        // call the function to create an 'add button' with the current topic
        addButton(topic);

    });

};
// --------------------------------------------------------------------------------------
// end of the displayGIFs() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to create a button to allow for more GIFs to be added when clicked 
// --------------------------------------------------------------------------------------
function addButton(topic) {
    // add button to request more images - remove it first if it already exists so it won't be duplicated
    $("#add-more").remove();

    // create a new button element
    var addButton = $("<button>");
    // add the appropriate attributes to allow the button to function and contain the data of the current topic
    addButton.attr({
        "type": "button",
        "id": "add-more",
        "data-name": topic
    });

    // add bootstrap classes to the button
    addButton.addClass("btn btn-secondary");
    // add the text to label the button
    addButton.text("Add More GIFs");

    // add the button element after the 'gifs-appear-here' div
    $("#gifs-appear-here").after(addButton);

};
// --------------------------------------------------------------------------------------
// end of the addButton() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to play or stop the GIFs when the image is clicked (from Class Activities 15-PausingGifs)
// --------------------------------------------------------------------------------------
function animateGIFs() {
    // initialize a local variable to the current state of the image element
    var state = $(this).attr("data-state");

    // if the GIF is still, animate it
    if (state === "still") {
        $(this).attr({
            "src": $(this).attr("data-animate"),
            "data-state": "animate"
        })
    } 
    // the GIG is animated so it should be stopped 
    else {
        $(this).attr({
            "src": $(this).attr("data-still"),
            "data-state": "still"
        })
    }
};
// --------------------------------------------------------------------------------------
// end of the animateGIFs() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// This function handles events where the "add-button" button is clicked  (from Class Activities 07-MovieButtonLayout)
// --------------------------------------------------------------------------------------
$("#add-button").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box and trim the spaces
    var topic = $("#button-input").val().trim();

    // after grabbing the information, remove it from the page 
    $("#button-input").val("");

    // Capitalize the first letter of every word in the string.  Make it lowercase first to keep the look consistent.
    topic = capital_letter(topic.toLowerCase());
    
    //  Make Sure the topic doesn't already exist before adding it to the array
    if (topics.indexOf(topic) === -1) {
        
        // The topic from the textbox is then added to our array
        topics.push(topic);
    };

    // calling renderButtons which handles the processing of our topic array
    renderButtons();

});
// --------------------------------------------------------------------------------------
// end of function triggered with the add button
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function called on double click to move the image into the favorites section
// --------------------------------------------------------------------------------------
function dblClickFav() {
    // build a copy of the image to then append to a favorites section.
    var imgID = $(this);
    // change the class from stills to favs so the double click will not apply
    imgID.removeClass("stills").addClass("favs");

    // find the div with the class="caption" 
    var captionID = $(this.children[1]);
    // change the bootstrap class from text-center to text-right to align the caption to the right
    captionID.removeClass("text-center").addClass("text-right");
    
    // append the favorite image to the fav-section
    $("#fav-section").append(imgID);

};
// --------------------------------------------------------------------------------------
// end of the dblClickFav() function
// --------------------------------------------------------------------------------------

// Adding click event listeners to all elements with a class of "topic"
$(document).on("click", ".topic", initialDisplay);

// Adding click event listeners for all the images with class of "gif"
$(document).on("click", ".gif", animateGIFs)

// setting up a double click event listener to add image to a favorites section.
$(document).on("dblclick", ".stills", dblClickFav);

// Adding click event listeners for the add-more GIFs button
$(document).on("click", "#add-more", additionalDisplay);

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();

