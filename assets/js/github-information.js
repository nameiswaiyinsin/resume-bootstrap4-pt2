function userInformationHTML(user) {         //2. calling this function when our promise resolves, which allows us to see it displayed on the browser
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url} target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`
        
}




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
        $.getJSON(`https://api.github.com/users/${username}`) //in the $.when() promise, pass the getJSON() function with the address of the github api
        $.getJSON(`https://api.github.com/users/${username}/repos`) //3a. list the repositories for that individual user
    ).then(
        function (firstResponse, secondResponse) { //then display that userData in #gh-user-data div   //3b. since we have 2 promises above, then we need to pass the two responses are the arguments
            var userData = firstResponse[0]; //response is our first argument that came back from our getJSON argument and we will store it in a variable userData.    //3c. firstResponse is now stored in userData
            var repoData = secondResponse[0];    //3d. secondResponse is now stored in repoData as it lists the repositories for the individual user we want to retrieve information from
            $("#gh-user-data").html(userInformationHTML(userData)); //then using jquery we can call the #gh-user-data to call the results of another function called userInformationHTML() and userData as the argument in it
            $("#gh-repo-data").html(repoInformationHTML(repoData));  //3e. 
        },
        function (errorResponse) { //add a function that takes an errorResponse here in case the above code doesnt work out
            if (errorResponse.status === 404) { //if the errorResponse.status is Page not found404, then the #gh-user-data HTML will be set (by jquery) to display "no info found..."
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else { //otherwise, if the error that comes back is not 404, then the errorResponse will be set to the JSON response that we got back, set by jquery on line 30 + 31
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`); //now this is all set out in the DOM, but not displaying on the web browser screen
            }
        });
}