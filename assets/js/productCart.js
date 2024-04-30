let username = localStorage.getItem('username');
let password = localStorage.getItem('password');
(()=>{
    
    console.log(username, password);
    if (username == null || password == null) {
        
        location.assign("./login.html");
    }

})();
document.getElementById("username").innerText = username;



const existsData = JSON.parse(localStorage.getItem(`${username}`));
console.log(existsData);
var product_container = document.querySelector(".product-container");
(()=>{
    fetch("https://fakestoreapi.com/products")
    .then(response=>response.json())
    .then(response=>
    {
        for(let pid of existsData){
            console.log(pid);
            for(let data of response){
                if(pid == data.id){
                    console.log(pid);
                    console.log(data.id);
                    console.log(data.title);
                    
                    let productDetails =  `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${data.image}" alt="no-images" />
                        </div>
                        <div class="product-title">
                            <p>${data.title}</p>
                            <p>Price: $ ${data.price} /-</p>
                            <button onclick="deleteCartProduct(${data.id})">Remove</button>
                        </div>
                    </div>
                    `
                    product_container.innerHTML+=(productDetails);
                }
    
            }
        }
        
    })
    .catch(error=>console.log(error));
})();

console.log(existsData);
const deleteCartProduct = (id) => {
    
    console.log(existsData);
    for(let i = 0; i < existsData.length; i++) {
        console.log(existsData[i]);
        if(existsData[i] === id) {
            existsData.splice(i, 1); 
        }
    }
    localStorage.setItem(`${username}`,JSON.stringify(existsData));
    console.log(existsData);
    alert("Item removed from cart..");
    location.reload();
}
const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    location.assign("./login.html");
}
const togleNavbar = () => {
    if(document.querySelector('.menu').style.display == 'none'){
        document.querySelector('.menu').style.display = 'flex';
    }else
    {
        document.querySelector('.menu').style.display = 'none'
    }
}
