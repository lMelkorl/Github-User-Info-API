const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clear = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users")

const github = new GitHub();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clear.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        //hata mesajı
        ui.alerts("danger","Please fill in the Username.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.alerts("danger","no such user found.");
            }
            else{
                ui.addSearchedUsersToUI(username)
                Storage.addAllUsersFromStorage(username);
                ui.showGithubProfile(response.user);
                ui.showGithubRepos(response.repo);
                ui.alerts("success","profile found successfully.");
            }
        })
        .catch(err => console.log(err));
    }
    ui.clearInput()
    e.preventDefault();
}
function clearAllSearched(){

if(confirm("are you sure ?")){
Storage.clearAllUsersFromStorage();
ui.clearAllSearchedFromUI();
}

}
function getAllSearched(){
let users = Storage.getAllUsersFromStorage();

let result="";

users.forEach(user => {
    result += `<li class="list-group-item">${user}</li>`
})

lastUsers.innerHTML = result;

}