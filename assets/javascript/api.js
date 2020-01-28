// Initial array of topics
var topics = ["Tazmanian Devil", "Bugs Bunny", "Daffy Duck", "Elmer Fudd"];

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
    }
};

// Found this function on W3 schools - https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
function capital_letter(str) {
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
};

// This function handles events where one button is clicked
$("#add-button").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#button-input").val().trim();

    // Capitalize the first letter of every word in the string
    topic = capital_letter(topic);
    
    //  Make Sure the topic doesn't already exist befor adding it to the array
    if (topics.indexOf(topic) === -1) {
        
        // The topic from the textbox is then added to our array
        topics.push(topic);
    };

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();