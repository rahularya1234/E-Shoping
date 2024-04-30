let username = localStorage.getItem('username');
let password = localStorage.getItem('password');
(()=>{
    
    console.log(username, password);
    if (username == null || password == null) {
        
        location.assign("./login.html");
    }

})();
document.getElementById("username").innerText = username;
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const productid = urlParams.get('productid')
console.log(productid);
(()=>{
    fetch('https://fakestoreapi.com/products/'+productid)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        // for(let data of response){
            let product_container = `
            <div class="product-header">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${data.image}" alt="no-images" />
                    </div>
                    <div class="product-title">
                        <p> ${data.title}</p>
                        <p>Price : ${data.price}</p>
                    </div>
                </div>
            </div>
            <div class="product-description">
                <div class="details">
                    <h3>Title : ${data.title}</h3>
                    <p>Price : ${data.price}</p>
                    <p>Rating: </p>
                    <button onclick="addToCart(${data.id})"><i class="fa-solid fa-cart-arrow-down"></i> Add to cart</button>
                </div>
                <div class="description">
                    <p>${data.description}</p>
                </div>
            </div>
            `
            document.querySelector(".product-container").innerHTML = product_container;
        
    })
    .catch(err=>console.log(err))
})();
const existsData = JSON.parse(localStorage.getItem(username)) || [];
if(existsData == null){
    const arr = [];
    localStorage.setItem(username, JSON.stringify(arr));
}

console.log(existsData);
const cartData = [];
const addToCart = (id) => {
    existsData.push(id);
    localStorage.setItem(`${username}`,JSON.stringify(existsData));
    alert("Added to cart");
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