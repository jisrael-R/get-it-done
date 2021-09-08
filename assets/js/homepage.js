var getUserRepos = function(user){
   
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayRepos(data,user);
            });
        } else{
            alert("Error: GitHub User Not Found");
        }
        
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");

    });
};
getUserRepos();

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var formSubmitHandler = function(event){
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username)
        nameInputEl.value = "";
    } else{
        alert("Please enter a GitHub username");
    }
    
};
userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm){
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent= searchTerm;

    for (var i = 0; i<repos.length; i++){
        var repoName = repos[i].owner.login + "/" + repos[i].name;
         var repoEL = document.createElement("div");
         repoEL.classList = "list-item flex-row justify-space-between align-center";

         var titleEl = document.createElement("span");
         titleEl.textContent = repoName;

         repoEL.appendChild(titleEl);
         
         //   status Element
         var statuEL = document.createElement("span");
         statuEL.classList = "flex-row align-center";

         if(repos[i].open_issues_count > 0){
             statuEL.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";;

         } else {
             statuEL.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";

             repoEL.appendChild(statuEL);
         }

         repoContainerEl.appendChild(repoEL);
    }
}