function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Загрузка...</span></div></div>';

    fetch('api/products.php')
        .then(response => response.json())
        .then(products => {
            if (products.error) {
                container.innerHTML = `<div class="alert alert-danger">Ошибка загрузки товаров: ${products.error}</div>`;
                return;
            }

            if (products.length === 0) {
                container.innerHTML = '<div class="text-center">Нет товаров</div>';
                return;
            }

            container.innerHTML = '';
            products.forEach(product => {
                const productHTML = `
                    <div class="col-lg-4 col-md-6">
                        <div class="card product-card h-100 fade-in">
                            <div class="position-relative">
                                <img src="${product.image || 'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Нет+фото'}" 
                                     class="card-img-top product-img" 
                                     alt="${product.name}"
                                     onerror="this.src='https://via.placeholder.com/400x300/2c3e50/ffffff?text=Нет+фото'">
                                <span class="position-absolute top-0 end-0 m-2 badge ${product.in_stock ? 'bg-success' : 'bg-warning'}">
                                    ${product.in_stock ? 'В наличии' : 'Под заказ'}
                                </span>
                                <span class="position-absolute top-0 start-0 m-2 badge bg-primary">
                                    ${product.category}
                                </span>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text flex-grow-1">${product.description || ''}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <div class="product-price fw-bold text-primary">${product.price_text}</div>
                                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                        <i class="fas fa-cart-plus me-1"></i>
                                        ${product.in_stock ? 'В корзину' : 'Заказать'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += productHTML;
            });
        })
        .catch(error => {
            container.innerHTML = `<div class="alert alert-danger">Ошибка загрузки: ${error.message}</div>`;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('cartModal'));
            modal.show();
        });
    }
});

window.addToCart = addToCart;
