const getUserBtn = document.getElementById('get-user-button')
const saveUserBtn =document.getElementById('save-users-button')
const users = document.getElementsByClassName('user')

const URL = "https://randomuser.me/api/"
let userData;

async function displayRandomUser() {
    const response = await fetch(URL)
    return await response.json()
}

function addUser(){
    displayRandomUser()
        .then(data => {
            console.log(data.results[0])
            displayUser(data.results[0])
        })
        .catch(error => console.log("Error: " + error))
}

function displayUser(data){
    const image = document.createElement('img')
    image.setAttribute('alt','user image')
    image.classList.add('photo')
    image.setAttribute('src',data.picture.large)

    const name = document.createElement('h2')
    name.innerText = data.name.first + " " + data.name.last;
    name.classList.add('name')

    const emailPara = document.createElement('p')
    emailPara.innerText = "Email: " + data.email
    emailPara.classList.add('email')

    const passwordPara = document.createElement('p')
    passwordPara.innerText = "Password: " + data.login.password
    passwordPara.classList.add('password')

    const genderPara = document.createElement('p')
    genderPara.innerText = "Gender: " + data.gender
    genderPara.classList.add('gender')

    const phonePara = document.createElement('p')
    phonePara.innerText = "Phone: " + data.phone
    phonePara.classList.add('phone')

    const locationPara = document.createElement('p')
    locationPara.innerText = "Location: " + data.location.city + ", " + data.location.country
    locationPara.classList.add('location')

    const birthdayPara = document.createElement('p')
    birthdayPara.innerText = "Birthday: " + new Date(data.dob.date).toLocaleDateString()
    birthdayPara.classList.add('birthday')

    const user = document.createElement('div')
    user.classList.add('user')

    user.append(name)
    user.append(emailPara)
    user.append(passwordPara)
    user.append(locationPara)
    user.append(genderPara)
    user.append(phonePara)
    user.append(birthdayPara)
    user.append(image)
    document.body.append(user)
}

const savedItems = JSON.parse(localStorage.getItem('users'));

if(savedItems == null){
    addUser();
}else{
    displaySavedUsers();
}

function saveUser(){
    const itemsArray = Array.from(users).map(item => item.innerHTML);
    window.localStorage.setItem('users',JSON.stringify(itemsArray))
    displaySavedUsers()
}

function displaySavedUsers(){
    const header = document.createElement('h3')
    header.innerText = "Saved Users"
    const storedUsers = window.localStorage.getItem('users')
    const users =  JSON.parse(storedUsers)
    console.log(users)
    document.body.append(header)
    users.forEach(user => {
        const saved = document.createElement('div')
        saved.classList.add('saved')
        saved.innerHTML = user
        document.body.append(saved)
    })
}

getUserBtn.addEventListener('click', addUser )

saveUserBtn.addEventListener("click", saveUser)