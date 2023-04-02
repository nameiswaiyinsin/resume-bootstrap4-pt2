function fetchGitHubInformation(event) {

    //storing our username to the id gh-username and allowing it to have a value to be inputted, and changing html content with jquery
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a Github username</h2>`);
        return;
    }

    //displaying the loader
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..."/>
        </div>`);

    
    //making a promise (to retrieve some information from the Github API)
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)  //in the $.when() promise, pass the getJSON() function with the address of the github api
    ).then(
        function(response) {          //then display that userData in #gh-user-data div
            var userData = response;  //response is our first argument that came back from our getJSON argument and we will store it in a variable userData.
            $("#gh-user-data").html(userInformationHTML(userData));   //then using jquery we can call the #gh-user-data to call the results of another function called userInformationHTML() and userData as the argument in it
        }, function(errorResponse) {     //add a function that takes an errorResponse here in case the above code doesnt work out
            if (errorResponse.status === 404) {        //if the errorResponse.status is Page not found404, then the #gh-user-data HTML will be set (by jquery) to display "no info found..."
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {      //otherwise, if the error that comes back is not 404, then the errorResponse will be set to the JSON response that we got back, set by jquery on line 30 + 31
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse}.responseJSON.message</h2>`);  //now this is all set out in the DOM, but not displaying on the web browser screen
            }
        });
}