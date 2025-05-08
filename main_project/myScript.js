let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCart();
}

function updateCartUI() {
  const cartItemsElement = document.querySelector('.cart-items');
  const cartTotalElement = document.querySelector('.cart-total');
  const cartCountElement = document.querySelector('.cart-count');
  
  if (cartItemsElement) {
    cartItemsElement.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span>${(item.price * item.quantity).toFixed(2)} MAD</span>
        <button class="remove-item" data-name="${item.name}">×</button>
      `;
      cartItemsElement.appendChild(itemElement);
      total += item.price * item.quantity;
    });
    
    if (cartTotalElement) {
      cartTotalElement.textContent = `Total: ${total.toFixed(2)} MAD`;
    }
  }
  
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Initialize cart UI on page load
window.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  
  // Handle add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const container = e.target.closest('.container');
      const product = {
        name: container.querySelector('.text').firstChild.textContent.trim(),
        price: parseFloat(container.querySelector('.text br').nextSibling.textContent.replace(' MAD', '').trim())
      };
      addToCart(product);
    });
  });
  
  // Handle remove item buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      removeFromCart(e.target.dataset.name);
    }
  });
});

window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 500);
});