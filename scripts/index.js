const addToCart = async (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.includes(id)) {
    cart.push(id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  await updateCartUI();
};

const removeFromCart = async (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((itemId) => itemId !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  await updateCartUI();

  const addBtn = document.querySelector(`button[onclick*='addToCart(${id})']`);
  if (addBtn) {
    addBtn.disabled = false;
    addBtn.classList.remove("opacity-50", "cursor-not-allowed");
    addBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add`; // Reset text
  }
};

const updateCartUI = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-items-text").innerText = cart.length + " Items";

  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  let subtotal = 0;

  const cartItemsList = document.getElementById("cart-items-list");
  cartItemsList.innerHTML = "";

  for (const id of cart) {
    const product = products.find((p) => p.id === id);

    if (product) {
      subtotal += product.price;

      const item = document.createElement("div");
      item.classList.add("flex", "justify-between", "items-center");

      item.innerHTML = `
      <span class="text-sm truncate">${product.title}</span>
      <div class="flex gap-2 items-center">
        <span class="text-sm font-bold">$${product.price.toFixed(2)}</span>
        <button class="btn btn-xs btn-error">Remove</button>
      </div>
    `;

      const removeBtn = item.querySelector("button");
      removeBtn.addEventListener("click", () => removeFromCart(product.id));

      cartItemsList.appendChild(item);
    }
  }

  document.getElementById("cart-subtotal").innerText =
    "Subtotal: $" + subtotal.toFixed(2);
};

const manageSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const loadCategories = () => {
  fetch(`https://fakestoreapi.com/products/categories`)
    .then((response) => response.json())
    .then((data) => displayCategories(data))
    .catch((error) => console.error("Error fetching categories:", error));
};

const loadProductsByCategory = (category) => {
  manageSpinner(true);
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => response.json())
    .then((data) => displayProducts(data))
    .catch((error) =>
      console.error("Error fetching products by category:", error),
    );
};

const loadProductsDetails = (productId) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((data) => displayProductDetails(data))
    .catch((error) => console.error("Error fetching product details:", error));
};

const loadTopRatedProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    const topRated = products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 3);

    displayTopRatedProducts(topRated);
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categoryContainer.innerHTML = "";

  for (const category of categories) {
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = `
    <button onclick="loadProductsByCategory(&quot;${category}&quot;)" class="btn btn-xs text-xs  md:text-base sm:btn-sm md:btn-md btn-outline btn-primary">${category.toUpperCase()}</button> `;
    categoryContainer.appendChild(categoryBtn);
  }
};

const displayProducts = (products) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  for (const product of products) {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
        <div class="card  shadow-md border border-base-200">
  
  <!-- Image -->
  <figure class="px-4 pt-4 bg-base-200">
    <img
      src=${product.image}
      alt="Product Image"
      class="rounded-xl h-48 p-4"
    />
  </figure>

  <div class="card-body p-4 space-y-2">
    
    <!-- Category + Rating -->
    <div class="flex justify-between items-center text-xs">
      <span class="badge badge-outline badge-primary">
        ${product.category}
      </span>
      <div class="flex items-center gap-1 text-warning">
        ⭐ <span class="text-base-content text-xs">${product.rating.rate} (${product.rating.count})</span>
      </div>
    </div>

    <!-- Title -->
    <h2 class="card-title text-sm font-semibold leading-tight line-clamp-1">
      ${product.title}
    </h2>

    <!-- Price -->
    <p class="text-lg font-bold text-base-content">
      $${product.price}
    </p>

    <!-- Buttons -->
    <div class="flex gap-5 pt-2">
      <button onclick="loadProductsDetails(${product.id})" class="btn btn-sm btn-outline flex-1">
        <i class="fa-regular fa-eye"></i> Details
      </button>

      <button onclick="addToCart(${product.id}); this.disabled=true; this.classList.add('opacity-50','cursor-not-allowed'); alert('${product.title.replace(/'/g, "\\'")} has been added to your cart!')" class="btn btn-sm btn-primary flex-1" ${JSON.parse(localStorage.getItem("cart") || "[]").includes(product.id) ? "disabled class='btn btn-sm btn-primary flex-1 opacity-50 cursor-not-allowed'" : ""}>
        <i class="fa-solid fa-cart-shopping"></i> Add
      </button>
    </div>

  </div>
</div>

    `;
    cardContainer.appendChild(productCard);

    manageSpinner(false);
  }
};

const displayProductDetails = (product) => {
  const productDetailsContainer = document.getElementById(
    "product-details-container",
  );

  productDetailsContainer.innerHTML = `
    <div class="relative">

        <div class="card card-side flex-col md:flex-row">

            <!-- Product Image -->
            <figure class="p-4 md:w-1/3">
                <img 
                    src="${product.image}" 
                    alt="${product.title}" 
                    class="rounded-xl w-full h-64 object-contain bg-base-200 p-4"
                />
            </figure>

            <!-- Product Info -->
            <div class="card-body md:w-2/3">

                <!-- Title -->
                <h2 class="card-title text-xl font-bold pr-8">
                    ${product.title}
                </h2>

                <!-- Category -->
                <div>
                    <span class="badge badge-primary badge-outline capitalize">
                        ${product.category}
                    </span>
                </div>

                <!-- Description -->
                <p class="text-sm text-base-content/80 mt-2">
                    ${product.description}
                </p>

                <!-- Rating -->
                <div class="flex items-center gap-2 mt-2">
                    <div class="rating rating-sm">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            (i) => `
                            <input type="radio" class="mask mask-star-2 bg-orange-400"
                            ${i <= Math.round(product.rating.rate) ? "checked" : ""} disabled />
                        `,
                          )
                          .join("")}
                    </div>
                    <span class="text-sm opacity-70">
                        ${product.rating.rate} (${product.rating.count} reviews)
                    </span>
                </div>

                <!-- Price and Actions -->
                <div class="card-actions justify-between items-center mt-4 flex-wrap gap-2">

                    <span class="text-2xl font-bold text-primary">
                        $${product.price}
                    </span>

                    <div onclick="addToCart(${product.id})" class="flex gap-2">
                        <button onclick="addToCart(${product.id}); this.disabled=true; this.classList.add('opacity-50','cursor-not-allowed'); alert('${product.title.replace(/'/g, "\\'")} has been added to your cart!')" class="btn btn-sm btn-primary flex-1" ${JSON.parse(localStorage.getItem("cart") || "[]").includes(product.id) ? "disabled class='btn btn-sm btn-primary flex-1 opacity-50 cursor-not-allowed'" : ""}>
                            <i class="fa-solid fa-cart-shopping"></i> Add
                        </button>

                        <button class="btn btn-primary btn-sm">
                           <i class="fa-solid fa-dollar-sign"></i> Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

  document.getElementById("product_details").showModal();
};

const displayTopRatedProducts = (products) => {
  const container = document.getElementById("top-rated-container");
  container.innerHTML = "";

  for (const product of products) {
    const productCard = document.createElement("div");

    productCard.innerHTML = `
      
      <div class="card shadow-md border border-base-200">

        <!-- Image -->
        <figure class="px-4 pt-4 bg-base-200">
          <img
            src="${product.image}"
            alt="Product Image"
            class="rounded-xl h-48 p-4 object-contain"
          />
        </figure>

        <div class="card-body p-4 space-y-2">
          
          <!-- Category + Rating -->
          <div class="flex justify-between items-center text-xs">

            <span class="badge badge-outline badge-primary capitalize">
              ${product.category}
            </span>

            <div class="flex items-center gap-1 text-warning">
              ⭐ 
              <span class="text-base-content text-xs">
                ${product.rating.rate} (${product.rating.count})
              </span>
            </div>

          </div>

          <!-- Title -->
          <h2 class="card-title text-sm font-semibold leading-tight truncate">
            ${product.title}
          </h2>

          <!-- Price -->
          <p class="text-lg font-bold text-base-content">
            $${product.price}
          </p>

          <!-- Buttons -->
          <div class="flex gap-5 pt-2">

            <button 
              onclick="displayProductDetails(${JSON.stringify(product).replace(/"/g, "&quot;")})"
              class="btn btn-sm btn-outline flex-1">
              <i class="fa-regular fa-eye"></i> Details
            </button>

            <button onclick="addToCart(${product.id}); this.disabled=true; this.classList.add('opacity-50','cursor-not-allowed'); alert('${product.title.replace(/'/g, "\\'")} has been added to your cart!')" class="btn btn-sm btn-primary flex-1">
              <i class="fa-solid fa-cart-shopping"></i> Add
            </button>

          </div>

        </div>

      </div>

    `;

    container.appendChild(productCard);
  }
};

updateCartUI();
loadCategories();
loadTopRatedProducts();
