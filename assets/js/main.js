let username = localStorage.getItem('username');
let password = localStorage.getItem('password');
(()=>{
    
    console.log(username, password);
    if (username == null || password == null) {
        
        location.assign("./login.html");
    }

})();
document.getElementById("username").innerText = username;
var product_container = document.querySelector(".product-container");
(()=>{
    fetch("https://fakestoreapi.com/products")
    .then(response=>response.json())
    .then(response=>
    {
        for(let data of response){
            let productDetails =  `
            <div class="product-card" onclick="showProduct(${data.id})">
                <div class="product-image">
                    <img src="${data.image}" alt="no-images" />
                </div>
                <div class="product-title">
                    <p>${data.title}</p>
                    <p>Price: $ ${data.price} /-</p>
                </div>
            </div>
            `
            product_container.innerHTML+=(productDetails);

        }
    })
    .catch(error=>console.log(error));
})();

const showProduct = (productid) => {
    console.log(productid);
    location.assign("./product.html?productid="+productid);
}
const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    location.assign("./login.html");
}

document.querySelector("#search").addEventListener("click", ()=>{
    let serachItem = document.querySelector("#search-box");
    if(serachItem.value=="")
        return;
    product_container.innerHTML="";
    fetch("https://fakestoreapi.com/products")
    .then(response=>response.json())
    .then(response=>
    {
        for(let data of response){
            let title=data.title.toLowerCase();
            if(title.match(serachItem.value.toLowerCase())){
                let productDetails =  `
                <div class="product-card" onclick="showProduct(${data.id})">
                    <div class="product-image">
                        <img src="${data.image}" alt="no-images" />
                    </div>
                    <div class="product-title">
                        <p>${data.title}</p>
                        <p>Price: $ ${data.price} /-</p>
                    </div>
                </div>
                `
                product_container.innerHTML+=(productDetails);
            }
        }
    })
    .catch(error=>console.log(error));
});
const togleNavbar = () => {
    if(document.querySelector('.menu').style.display == 'none'){
        document.querySelector('.menu').style.display = 'flex';
    }else
    {
        document.querySelector('.menu').style.display = 'none'
    }
}

