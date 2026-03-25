const products = [
    {
        id: 1,
        name: "Задвижка ЗМС 65/210:350",
        category: "Задвижки",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar1.jpg",
        description: "Задвижка муфтовая стальная, Ду 65, Ру 210/350",
        inStock: true
    },
    {
        id: 2,
        name: "Кран шаровый КШД 65/210/350",
        category: "Краны шаровые",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar2.jpg",
        description: "Кран шаровый Ду 65, Ру 210/350, полнопроходной",
        inStock: true
    },
    {
        id: 3,
        name: "Задвижка дисковая ЗД, ЗДШ 65/210/350",
        category: "Задвижки",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar3.jpg",
        description: "Задвижка дисковое затвор, Ду 65, Ру 210/350",
        inStock: true
    },
    {
        id: 4,
        name: "Задвижка ЗКЛ 50/16/40",
        category: "Задвижки",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar4.jpg",
        description: "Задвижка клиновая литая, Ду 50, Ру 16/40",
        inStock: true
    },
    {
        id: 5,
        name: "Клапан обратный КОП 80/40",
        category: "Клапаны",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar5.jpg",
        description: "Клапан обратный подъемный, Ду 80, Ру 40",
        inStock: true
    },
    {
        id: 6,
        name: "Ремни клиновые С(В) 4000",
        category: "Ремни",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar6.jpg",
        description: "Ремень клиновой С(В) 4000, комплект 10 шт",
        inStock: true
    },
    {
        id: 7,
        name: "Сальник устьевой СУСГ 2-32-73",
        category: "Сальники",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar7.jpg",
        description: "Сальник устьевой для фонтанной арматуры",
        inStock: true
    },
    {
        id: 8,
        name: "Вентиля угловые 50/140/210",
        category: "Вентили",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar8.jpg",
        description: "Вентиль угловой, Ду 50, Ру 140/210",
        inStock: true
    },
    {
        id: 9,
        name: "Манжета СУСГ",
        category: "Уплотнения",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar9.jpg",
        description: "Манжета для сальника устьевого СУСГ",
        inStock: true
    },
    {
        id: 10,
        name: "Арматура устьевая 65/140/210/350",
        category: "Арматура",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar10.jpg",
        description: "Комплект устьевой арматуры, Ду 65",
        inStock: false
    },
    {
        id: 11,
        name: "Арматура фонтанная 65/140/210/350",
        category: "Арматура",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar11.jpg",
        description: "Фонтанная арматура, Ду 65, Ру 140/210/350",
        inStock: false
    },
    {
        id: 12,
        name: "Краны шаровые Ду 200/300/16/40",
        category: "Краны шаровые",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar12.jpg",
        description: "Кран шаровый, Ду 200-300, Ру 16/40",
        inStock: true
    },
    {
        id: 13,
        name: "Штанги вращатель Ш 81-170",
        category: "Буровое оборудование",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar13.jpg",
        description: "Штанга вращателя буровой установки",
        inStock: true
    },
    {
        id: 14,
        name: "Клапан СППК 50/80/100/16/40",
        category: "Клапаны",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar14.jpg",
        description: "Клапан предохранительный СППК",
        inStock: true
    },
    {
        id: 15,
        name: "Блок бокс металлический",
        category: "Блок-боксы",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar15.jpg",
        description: "Металлический блок-бокс для оборудования",
        inStock: true
    },
    {
        id: 16,
        name: "Блок боксы",
        category: "Блок-боксы",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar16.jpg",
        description: "Блок-боксы различной комплектации",
        inStock: true
    },
    {
        id: 17,
        name: "Фланцы устьевые",
        category: "Фланцы",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar17.jpg",
        description: "Фланцы устьевые для нефтегазового оборудования",
        inStock: true
    },
    {
        id: 18,
        name: "Задвижка ЗКЛ 100/16/40",
        category: "Задвижки",
        priceText: "Цена договорная",
        price: 0,
        image: "images/tovar18.jpg",
        description: "Задвижка клиновая литая, Ду 100, Ру 16/40",
        inStock: true
    }
];

function loadProducts() {
    const container = document.getElementById('products-container');
    
    if (!container) {
        return;
    }
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="card product-card h-100 fade-in">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}" 
                             onerror="this.src='https://via.placeholder.com/400x300/2c3e50/ffffff?text=${encodeURIComponent(product.name)}'">
                        <span class="position-absolute top-0 end-0 m-2 badge ${product.inStock ? 'bg-success' : 'bg-warning'}">
                            ${product.inStock ? 'В наличии' : 'Под заказ'}
                        </span>
                        <span class="position-absolute top-0 start-0 m-2 badge bg-primary">
                            ${product.category}
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div class="product-price fw-bold text-primary">${product.priceText}</div> 
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus me-1"></i>
                                ${product.inStock ? 'В корзину' : 'Заказать'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
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
