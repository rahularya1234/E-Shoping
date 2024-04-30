const showLoginPage = () =>{
    document.querySelector("#login-card").style.display = "flex";
    document.querySelector("#signup-card").style.display = "none";
}
const showSignupPage = () => {
    //alert("Please enter your");
    document.querySelector("#login-card").style.display = "none";
    document.querySelector("#signup-card").style.display = "flex";
}

// if already login , page redirect to index page
(()=>{
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    if (username || password) {
        location.assign("./index.html");
    }
})();

//signup Button Handler
// const existsData = JSON.parse(localStorage.getItem("userData"));

// function storeInLocalStorage(item, keyAndvalue) {
//     if (localStorage.getItem(item) == null) {
//      localStorage.setItem(item, JSON.stringify(keyAndvalue));
//      return;
//   }

//   var oldData = JSON.parse(localStorage.getItem(item)) || [];
//   var arr=[];
//   arr.push(oldData)
//  arr.push(keyAndvalue);
//  return;
// }


const existsData = JSON.parse(localStorage.getItem("userData")) || [];
if(existsData == null){
    const arr = [];
    localStorage.setItem("userData", JSON.stringify(arr));
}
document.querySelector("#signup_button").addEventListener('click', (e) => {
    e.preventDefault();
    let fullname = document.getElementById("fullname");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("cpassword");
    console.log(validateForm(fullname, username, password, confirm_password));
    if(validateForm(fullname, username, password, confirm_password)){
        const data={
            fullName: fullname.value,
            username: username.value,
            password: password.value,
        }
        existsData.push(data);
        localStorage.setItem("userData", JSON.stringify(existsData));
        // storeInLocalStorage("userData", data);
        fullname.value ="";
        username.value ="";
        password.value ="";
        confirm_password.value ="";
        document.querySelector('.login-label').innerHTML = "user added successfully...";
        document.querySelector('.login-label').style.color = 'green';
    }
    
});


// Signup form validation 
const validateForm = (...form) => {
    //console.log(form);
    var paswd =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    let password = "";
    var error_msg=document.querySelector("#error-msg");
    for(let field of form){
        
        if(field.value == "")
        {
            return false;
        }
        if(field.id == "username")
        {
            console.log(field.value);
            if(!field.value.match(" ")){
                if(field.value.length>=8)
                {
                    
                    if(field.value == field.value.toLowerCase()){
                        field.style.border="1px solid green";
                    }
                    else
                    {
                        field.style.border="1px solid red";
                        document.querySelector('.login-label').innerHTML = "A minimum 8 characters username contains without space. all characters should be in lowercase letter and number are required.";
                        document.querySelector('.login-label').style.color = "red";
                        return false;
                    }
                }else
                {
                    field.style.border="1px solid red";
                    document.querySelector('.login-label').innerHTML = "A minimum 8 characters username contains without space. all characters should be in lowercase letter and number are required.";
                    document.querySelector('.login-label').style.color = "red";
                    return false;
                }
            }else
            {
                field.style.border="1px solid red";
                document.querySelector('.login-label').innerHTML = "A minimum 8 characters username contains without space. all characters should be in lowercase letter and number are required.";
                document.querySelector('.login-label').style.color = "red";
                return false;
            }
            for(let d of existsData){
                if(field.value==d.username){
                    
                    document.querySelector('.login-label').innerHTML = "user already exists...";
                    document.querySelector('.login-label').style.color = 'red';
                    field.style.border="1px solid red";
                    return false;
                }else
                {
                    document.querySelector('.login-label').innerHTML = "";
                    document.querySelector('.login-label').style.color = 'green';
                }
            }
            
        }
        if(field.id == "password" )
        {
            console.log(field.value);
            if(field.value.match(paswd)) 
            { 
                field.style.border="1px solid green";
                password=field.value;
            }
            else
            { 
                field.style.border="1px solid red";
                document.querySelector('.login-label').innerHTML = "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number & symboll are required.";
                document.querySelector('.login-label').style.color = "red";
                return false;
            }
        }
        if(field.id == "cpassword" )
        {
            console.log(field.value);
            if(field.value===password) 
            { 
                field.style.border="1px solid green";
            }
            else
            { 
                field.style.border="1px solid red";
                return false;
            }
        }

    }
    return true;
};

//login Button Handler
document.querySelector('#login_button').addEventListener('click', (e) => {
    e.preventDefault();
    let login_username = document.getElementById("login_username");
    let login_password = document.getElementById("loin_password");
    if(loginValidate(login_username.value, login_password.value)){
        localStorage.setItem("username", login_username.value);
        localStorage.setItem("password", login_password.value);
        location.assign("./index.html");
    }
});

//login form control
const loginValidate = (username, password) => {
    console.log(existsData);
    for(let data of existsData){
        console.log(data.fullName);
        console.log(username);
        console.log(data.username);
        if(username == data.username && password == data.password){
            document.querySelector('.login_err').innerHTML = "login successfully...";
            document.querySelector('.login_err').style.color = 'green';
            console.log("successfully logged");
            return true;
        }
    }
    document.querySelector('.login_err').innerHTML = "invalid user and password...";
    document.querySelector('.login_err').style.color = 'red';
    return false;
};





