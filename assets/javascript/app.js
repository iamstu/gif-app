var searchTerm ="";
var apiKey = "F7O0JincFn8dCCobvfN2I80xj14GvuX2";
var gifButtons =["dogs", "cats", "ferrets", "pigs"]

console.log("working")


//click function for the buttons that are made by search button
$("#button-area").on("click", ".gif-btn", function(){
    event.preventDefault();
    //grab the value of button and pass it to the url for the ajax call
    var buttonValue = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=F7O0JincFn8dCCobvfN2I80xj14GvuX2&limit=10";
    console.log("still working");
    console.log(buttonValue);
    //call ajax
    $("#gif-area").empty();
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //for loop creating an area for the rating and the gif for each item returned
        for (var i = 0; i < response.data.length; i++){
        console.log(i);
        var newDiv = $("<div>").append($("<p>").text("Rating: " + response.data[i].rating));
        
        $("#gif-area").prepend(newDiv);
        newDiv.append($("<img>").attr({ 
            //a list of attrs making a still(default) form of gif and an animated form to be toggled
            src: response.data[i].images.fixed_height_still.url,
            "data-still": response.data[i].images.fixed_height_still.url,
            "data-animated": response.data[i].images.fixed_height.url,
            "data-state": "still",
            //give it a class for future toggle function
            class: "gif"
            }
        ));
        };
    });
});

//click event for search function to make a button
$("form").on("click", "#add-gif", function(){
    event.preventDefault();
    //grab value of search area
    searchTerm = $("#gif-input").val();
    //if the value of the search area has no length then no button will be made
    if (searchTerm.length > 0){
    //add button to button array
    gifButtons.push(searchTerm);
    //call function to make buttons
    buttonCreation();
    //reset text area
    $("#gif-input").val("");
    }
});

function buttonCreation(){
    //reset area to prevent excess button stacking
    $("#button-area").empty();
    //loop to remake all buttons with new buttons
    for (var i = 0; i < gifButtons.length; i++){
        $("#button-area").append($("<button>").attr("class", "gif-btn btn btn-info").text(gifButtons[i]));
    }
}

//click event to change animation status of gifs
$("#gif-area").on("click", ".gif", function(){
    //grab the state and see which it is, then change it to the other and set the state to match
    var state = $(this).attr("data-state");
    if( state === "still"){
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
});
//call button function to make buttons on load
buttonCreation();