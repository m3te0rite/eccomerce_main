// Fetch the product data from the JSON file
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    displayProductCards(products);
  })
  .catch(error => console.error('Error fetching product data:', error));

function displayProductCards(products) {
  const category = document.body.dataset.category;
  const filteredProducts = products.filter(product => product.category === category);

  const productsContainer = document.getElementById('shop-content');
  productsContainer.innerHTML = ''; // Clear any existing content

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-box');
    productCard.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="product-img">
      <h2 class="product-title">${product.name}</h2>
      <span class="price">$${product.price}</span>
      <i class="bx bx-shopping-bag add-cart"></i>
    `;
    productsContainer.appendChild(productCard);
  });
}

function sortProducts() {
  const sortValue = document.getElementById('sort').value;
  const shopContent = document.getElementById('shop-content');
  const products = Array.from(shopContent.getElementsByClassName('product-box'));

  products.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.price').innerText.replace('$', ''));
    const priceB = parseFloat(b.querySelector('.price').innerText.replace('$', ''));
    
    if (sortValue === 'low-to-high') {
      return priceA - priceB;
    } else if (sortValue === 'high-to-low') {
      return priceB - priceA;
    } else {
      return 0;
    }
  });

  // Clear and re-append sorted products
  shopContent.innerHTML = '';
  products.forEach(product => shopContent.appendChild(product));
}

function displayProductDetails(products) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products.find(p => p.id == productId);

  if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `$${product.price}`;
    const imagesContainer = document.getElementById('product-images');
    product.images.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      imagesContainer.appendChild(img);
    });
  } else {
    console.error('Product not found');
  }
}