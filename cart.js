let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: 0,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + ' добавлен в корзину');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
    alert('Товар удален из корзины');
}

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity < 1) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartModal();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? 'inline' : 'none';
    }
}

function updateCartModal() {
    const container = document.getElementById('cart-items');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Корзина пуста</p>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                    Перейти к товарам
                </button>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    cart.forEach(item => {
        const imagePath = item.image || 'https://via.placeholder.com/60x60/2c3e50/ffffff?text=Товар';
        
        html += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${imagePath}" 
                             alt="${item.name}" 
                             class="img-fluid rounded"
                             style="height: 60px; object-fit: cover;"
                             onerror="this.src='https://via.placeholder.com/60x60/2c3e50/ffffff?text=Товар'">
                    </div>
                    <div class="col-7">
                        <div class="fw-bold">${item.name}</div>
                        <div class="text-muted small">Цена договорная</div>
                    </div>
                    <div class="col-2">
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-1 text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getCartText() {
    if (cart.length === 0) {
        return 'Корзина пуста';
    }
    
    let text = 'Заказ с сайта КамПромДеталь:\n\n';
    cart.forEach((item, index) => {
        text += `${index + 1}. ${item.name} - ${item.quantity} шт\n`;
    });
    
    text += `\nВсего позиций: ${cart.length}`;
    text += `\n\nПожалуйста, свяжитесь для уточнения деталей заказа.`;
    
    return text;
}

function closeModal() {
    const modal = document.getElementById('cartModal');
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
    
    if (backdrop) {
        backdrop.remove();
    }
    
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары перед оформлением заказа.');
        return;
    }
    
    const cartText = getCartText();
    const telegramUrl = `https://t.me/KamPromDetal_bot?text=${encodeURIComponent(cartText)}`;
    
    window.open(telegramUrl, '_blank');
    
    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    
    closeModal();
    
    alert('Заказ отправлен в Telegram');
}

document.addEventListener('DOMContentLoaded', function() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', updateCartModal);
        
        cartModal.addEventListener('hidden.bs.modal', function() {
            closeModal();
        });
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-close') || 
            e.target.classList.contains('btn-secondary') && 
            e.target.closest('.modal-footer')) {
            setTimeout(closeModal, 50);
        }
    });
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.checkout = checkout;
window.closeModal = closeModal;