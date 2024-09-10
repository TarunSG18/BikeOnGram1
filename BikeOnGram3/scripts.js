document.addEventListener('DOMContentLoaded', () => {
   
  if (window.location.pathname.includes('product.html')) {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');

    const products = {
      'mountain-bike': {
        name: 'KTM Duke 390(2023)',
        price: '₹3,46,000',
        description: '1 cylinder 399cc engine producing 46bhp power and 39n/m torque @8500rpm',
        image: 'duke.jpeg'
      },
      'road-bike': {
        name: 'Bajaj Pulsar 400Z(2024)',
        price: '₹2,30,000',
        description: '1 cylinder 373cc engine producing 40bhp power and 35n/m torque @6500rpm',
        image: 'ns.jpeg'
      },
      'electric-bike': {
        name: 'TVS Apache RTR 310(2023)',
        price: '₹2,65,000',
        description: '1 cylinder 312.2cc engine producing 35.6bhp power and 28.7n/m torque @6650rpm',
        image: 'rtr.jpeg'
      }
    };

    const productData = products[product];
    if (productData) {
      document.getElementById('product-image').src = productData.image;
      document.getElementById('product-name').textContent = productData.name;
      document.getElementById('product-price').textContent = productData.price;
      document.getElementById('product-description').textContent = productData.description;

      document.getElementById('add-to-cart').addEventListener('click', () => {
        addToCart(productData);
      });
    } else {
      document.querySelector('.product-details').innerHTML = '<p>Product not found.</p>';
    }
  }


  if (window.location.pathname.includes('checkout.html')) {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsContainer.appendChild(li);
      });
    } else {
      cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
    }

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const payment = document.getElementById('payment').value;

      alert(`Order placed!\nName: ${name}\nAddress: ${address}\nPayment Method: ${payment}`);
     
      localStorage.removeItem('cart');
    });
  }
});


function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}


function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
