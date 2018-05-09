var searchTerm ="";
var apiKey = "F7O0JincFn8dCCobvfN2I80xj14GvuX2";
var gifButtons =["dogs", "cats", "ferrets", "pigs"]

console.log("working")



$("#button-area").on("click", ".gif-btn", function(){
    event.preventDefault();
    var buttonValue = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=F7O0JincFn8dCCobvfN2I80xj14GvuX2&limit=3";
    console.log("still working");
    console.log(buttonValue);
    $("#gif-area").empty();
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i = 0; i < response.data.length; i++){
        console.log(i);
        var newDiv = $("<div>").append($("<p>").text("Rating: " + response.data[i].rating));
        // console.log(newDiv);
        $("#gif-area").prepend(newDiv);
        newDiv.append($("<img>").attr({ 
            src: response.data[i].images.fixed_height_still.url,
            "data-still": response.data[i].images.fixed_height_still.url,
            "data-animated": response.data[i].images.fixed_height.url,
            "data-state": "still",
            class: "gif"
            }
        ));
        };
    });
});

$("form").on("click", "#add-gif", function(){
    event.preventDefault();
    searchTerm = $("#gif-input").val();
    if (searchTerm.length > 0){
    gifButtons.push(searchTerm);
    buttonCreation();
    }
});

function buttonCreation(){
    $("#button-area").empty();

    for (var i = 0; i < gifButtons.length; i++){
        $("#button-area").append($("<button>").attr("class", "gif-btn").text(gifButtons[i]));
    }
}

$("#gif-area").on("click", ".gif", function(){
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

buttonCreation();