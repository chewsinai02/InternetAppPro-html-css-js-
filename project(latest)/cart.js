var products = [
    { name: 'Product 1', price: 1, image: 'product1.jpg' },
    { name: 'Product 2', price: 2, image: 'product2.jpg' },
    { name: 'Product 3', price: 3, image: 'product3.jpg' },
    { name: 'Product 4', price: 4, image: 'product4.jpg' },
    { name: 'Product 5', price: 5, image: 'product5.jpg' },
    { name: 'Product 6', price: 6, image: 'product6.jpg' },
    { name: 'Product 7', price: 7, image: 'product2.jpg' },
    { name: 'Product 8', price: 8, image: 'product8.jpg' },
    { name: 'Product 9', price: 9, image: 'product9.jpg' },
    { name: 'Product 10', price: 10, image: 'product10.jpg' },
    { name: 'Product 11', price: 11, image: 'product11.jpg' },
    { name: 'Product 12', price: 12, image: 'product12.jpg' },
    { name: 'Product 13', price: 13, image: 'product13.jpg' },
    { name: 'Product 14', price: 14, image: 'product14.jpg' },
    { name: 'Product 15', price: 15, image: 'product15.jpg' },
    { name: 'Product 16', price: 16, image: 'product16.jpg' },
    { name: 'Product 17', price: 17, image: 'product17.jpg' },
    { name: 'Product 18', price: 18, image: 'product18.jpg' },
    { name: 'Product 19', price: 19, image: 'product19.jpg' },
    { name: 'Product 20', price: 20, image: 'product20.jpg' },
    { name: 'Product 21', price: 21, image: 'product21.jpg' },
    { name: 'Product 22', price: 22, image: 'product22.jpg' },
    { name: 'Product 23', price: 23, image: 'product23.jpg' },
    { name: 'Product 24', price: 24, image: 'product24.jpg' },
    // Add more products here
];

function updateCartIcon() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItemCount = document.getElementById('cartItemCount');
    var cartItemCount2 = document.getElementById('cartItemCount2');
    var totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemCount.innerText = totalItems;
    cartItemCount2.innerText = totalItems;
}

function addToCart(name, price, image) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        var item = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    //alert('Item added to cart!');
}

function updateQuantity(name, change) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += change;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); //update shopping cart and total 
}

function clearCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("You can't clear the cart when it's empty! Press ok to go shopping page.");
        window.location.href = "shopNow.html"; // Redirect to shopnow.html
    }else {
        localStorage.removeItem('cart');
        updateCart(); // update shopping cart and total
        }
}

function checkout() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = cart.reduce((total,item) => total + (item.price * item.quantity),0);

    localStorage.setItem("cartTotal",totalAmount);

        if (cart.length === 0) {
            alert("Your cart is empty. Add items to cart first.");
        } else {
            window.location.href = "payment.html";
                // Add logic here to handle checkout, such as jumping to the checkout page or sending cart data to the backend and others 
        }
}

function updateCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartList = document.getElementById('cartList');
    var total = document.getElementById('total');
    var totalAmount = 0;

    cartList.innerHTML = '';
    cart.forEach(function(item) {
        var listItem = document.createElement('section');
        listItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="card-body" style="float: left;">
                    <img src="${item.image}" class="img-fluid product-img" alt="${item.name}">
                </div>
                <div class="col-md-4"></div>
                <br/>
                <h3>${item.name}</h3>
                <p>Price: RM ${item.price}</p><br/>
                <span  style="float: left;">Quantity: ${item.quantity}&nbsp;&nbsp;&nbsp;</span><br/>
                <button class="btn btn-danger btn-xs" onclick="updateQuantity('${item.name}', 1)">+</button>&nbsp;
                <button class="btn btn-danger btn-xs" onclick="updateQuantity('${item.name}', -1)">-</button><br/><br/>
                <p>Subtotal: RM ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div><br>

        `;
        cartList.appendChild(listItem);
        totalAmount += item.price * item.quantity;
    });

    total.innerText = totalAmount.toFixed(2);
}

updateCartIcon();
updateCart();

function completePayment() {
    // Show payment modal
    var modal = document.getElementById('paymentModal');
    modal.style.display = 'block';
}

function confirmPayment() {
    // Perform actual payment processing
    
    // After successful payment, redirect to payment confirmation page
    window.location.href = "successful.html";
}

function closeModal() {
    var modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    var modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}