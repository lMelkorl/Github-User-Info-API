class UI{
    constructor(){
        this.profile = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastusers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname"); 
    }
    clearInput(){
        this.inputField.value = "";
    }
    showGithubProfile(user){
        this.profile.innerHTML = `<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${user.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong>${user.name}</strong></div>
             <hr>
             <div id="bio">${user.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">
                      Followers <span class="badge badge-light">${user.followers}</span>
                </button>
                <button class="btn btn-info">
                     Followed  <span class="badge badge-light">${user.following}</span>
                  </button>
                <button class="btn btn-danger">
                    Repos <span class="badge badge-light">${user.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${user.lovation}</a>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="email">${user.email}</span>
                        
                    </li>
                    
                </div>
                   
                
          </div>
    </div>`  
    }
    showGithubRepos(repos){
        this.repoDiv.innerHTML = "";

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
            <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Stars  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forks  <span class="badge badge-light" id ="repoFork">${repo.forks}</span>
                            </button>
                    
                        </div>
                </div>

                </div>
            `
        })

    }
    addSearchedUsersToUI(username){
        let users = Storage.getAllUsersFromStorage();

        if(users.indexOf(username) === -1){
            //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li> 
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;

            this.lastusers.appendChild(li);
        }
    }

    clearAllSearchedFromUI(){
        while(this.lastusers.firstElementChild !== null){
            this.lastusers.removeChild(this.lastusers.firstElementChild);
        }
    }
    alerts(type,content){
        const field = document.getElementById("github-form");
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`
        alert.textContent = content;

        field.appendChild(alert);

        setTimeout(function(){
            alert.remove();
        },2000)
    }
}