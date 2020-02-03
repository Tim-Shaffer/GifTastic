// --------------------------------------------------------------------------------------
//  GLOBAL VARIABLES
// --------------------------------------------------------------------------------------
// Initial array of topics (Cartoon Characters)
var topics = ["Tazmanian Devil", "Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Tweety", "Foghorn Leghorn", "Porky Pig", "Gossamer", "Lola Bunny", "Marvin the Martian", "Pepé Le Pew"];

// initialize a variable to control whether or not the container should be added around the add-button area
var isInitialized = false;

// initialize a variable to hold the current offset for the ajax call so more gifs can be added later
var offset = 0;

// initialize an array to hold the instruction lines for the initial page load
var instructions = ["Welcome to Gif-Tastic",
    "Click on any of the above Cartoon Characters to display some GIFs",
    "When the GIFs are available, click on them to animate and then again to stop the animation", 
    "Enter a new Cartoon Character to the right and Click the 'Add New' button to add your own character to the list",
    "Double-clicking on a GIF will move that GIF into a Favorites Section"];

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

        // display the instructions on the initial load 
        showInstructions(0);

        // add the col-sm-8 class to the gifs-appear-here div
        $("#gifs-appear-here").addClass("col-sm-8")
        
        // wrap the gifs-appear-here id with a row div
        $("#gifs-appear-here").wrap('<div class="row mx-0">');

        // add a break after the label so that the input box appears under the label
        $("label").after("<br>");

        // add a break after the input tags for spacing
        $("input").after("<br>");

        // add section to hold favorites populated on a double-click
        var favSectionID = $("<div>");

        // add an id to the section
        favSectionID.attr("id", "fav-section");

        // add some html to format the heading with how to populate the section
        favSectionID.html('<br><h5>Double Click An Image to Add<br>Favorites Here</h5>');

        // add a container class and border around the fav-section
        favSectionID.addClass("container border border-secondary");

        // create a local variable for the more-buttons-form id
        var moreButtonsID = $("#more-buttons-form")

        // add the col-sm-4 class to the form
        moreButtonsID .addClass("col-sm-4");
        
        // append the more-buttons element to the row class - there is only 1!
        $(".row").append(moreButtonsID);

        // append the fav-section to the more-buttons section so they appear in the same columns
        moreButtonsID.append(favSectionID);

        // hide the fav-section until there are images available to add to it!
        favSectionID.hide();

        // add a container class around the row 
        $(".row").wrap('<div class="container mx-0">')

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

    // show the new section to hold favorites
    $("#fav-section").show();

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
    addButton.addClass("btn btn-warning");
    // add the text to label the button
    addButton.text("Add More GIFs");

    // append the button element to the 'gifs-appear-here' div
    $("#gifs-appear-here").append(addButton);

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
    
    // append the favorite image to the fav-section
    $("#fav-section").append(imgID);

};
// --------------------------------------------------------------------------------------
// end of the dblClickFav() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to show the instructions for the page into a Jumbotron
// --------------------------------------------------------------------------------------
function showInstructions() {

    // make sure to start with a clear section for the display
    $('#gifs-appear-here').empty();

    // set a variable to the gifs-appear-here section to use that section for the instructions
    var display = $('#gifs-appear-here');
    // add the jumbotron and bg-white classes for spacing and display
    display.addClass("jumbotron bg-white");
    // create a welcome tag 
    var welcome = $("<h1>");
    // add the display-4 and text-primary classes
    welcome.addClass("display-4 text-primary");
    // add the welcome message - the first message in the instructions array
    welcome.text(instructions[0]);
    // add a line in between the welcome and the rest of the instructions
    welcome.append('<hr class="my-4">');
    // append the welcome message to the display div
    display.append(welcome);

    // set a variable for the unordered list of messages
    var listTag = $("<ul>");
    // loop through the remaining instructions
    for (i=1; i < instructions.length; i++) {
        // create a new listItemTag
        var listItemTag = $("<li>");
        // add the text-info class to the listItemTag
        listItemTag.addClass("text-info");
        // add the instruction from the array to the text
        listItemTag.text(instructions[i]);
        // add the list item to the unordered list
        listTag.append(listItemTag);
        // add the updated list to the display div
        display.append(listTag);
    };

};
// --------------------------------------------------------------------------------------
// end of the showInstructions() function
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

