let landing = {
    init: function() {
        let productsContainer = document.querySelector('#products');
        let productOrder = document.querySelector('.select-product-wrapper')

        let products = [{
                    name: 'pineapple',
                    imgUrl: './img/product_1.png',
                    price: 8.50,
                    olrPrice: 19.00,
                    currency: '$'
                },
                {
                    name: 'berries',
                    imgUrl: './img/product_2.png',
                    price: 8.50,
                    olrPrice: 19.00,
                    currency: '$'
                },
                {
                    name: 'grapefruit',
                    imgUrl: './img/product_3.png',
                    price: 8.50,
                    olrPrice: 19.00,
                    currency: '$'
                },
                {
                    name: 'apple',
                    imgUrl: './img/product_4.png',
                    price: 8.50,
                    olrPrice: 19.00,
                    currency: '$'
                }
            ]
            .map(p => new Product(p, productsContainer));




        const shoppingCart = new ShoppingCart(productOrder, products);

        [...document.querySelectorAll('.img-cart')].forEach(e => {
            e.addEventListener('click', function(event) {
                shoppingCart.open();
            })
        })

        document.querySelector('.overlay').addEventListener('click', function(e) {
            shoppingCart.close()
        })
        document.querySelector('.order__header').addEventListener('click', function(e) {
            shoppingCart.close()
        })

    },



}
landing.init();


function SelectItem(select) {
    let itemsBlock = select.querySelector('.items-wrapper')
    let itemActive = select.querySelector('.active')
    let isOpened = false;


    for (let i = 0; i < 51; i++) {
        let div = document.createElement("div")
        div.classList.add('item')

        let p = document.createElement("p")
        p.innerText = i
        p.classList.add('item_view')

        let newBlock = itemsBlock.appendChild(div)
        newBlock.appendChild(p)
    }

    itemActive.addEventListener('click', function(e) {
        if (!itemsBlock.classList.contains('items-wrapper_opened')) {
            itemsBlock.classList.add('items-wrapper_opened')
            isOpened = true
        } else {
            itemsBlock.classList.remove('items-wrapper_opened')
            isOpened = false
        }

    })

    // close select, when user clicks ourside of select
    document.addEventListener('click', function(e) {
        if (e.target !== itemActive) {
            itemsBlock.classList.remove('items-wrapper_opened')
            isOpened = false
        }
    })

    itemsBlock.addEventListener('click', function(e) {
        if (e.target.classList.contains('item_view')) {
            let item = e.target.textContent
            itemActive.innerText = item
        }
    })

    return {
        isOpened: function(e) {
            return isOpened
        },
        getValue: function(e) {
            return itemActive.innerText
        }
    }

}

function Product(product, productsContainer) {

    // render product
    const div = document.createElement('div');
    div.className = 'product_wrapper';
    div.innerHTML = `<h3 class="product__name">${product.name}</h3>
    <img class="product__img" src="${product.imgUrl}" alt="product">

    <div class="product-decription">
        <p class="product-decription__sale">offerta limitata -50%</p>
        <p class="product-decription__price">${product.currency}${product.price.toFixed(2)}<span>${product.olrPrice.toFixed(2)}${product.currency}</span></p>
        <div class="cart-wrapper">
            <div class="drop">
                <div class="active drop__one-item">0</div>
                <div class="items-wrapper">
                </div>
            </div>
            <img class='img-cart' src="./img/cart.svg" alt="cart">
        </div>
    </div>
`;

    productsContainer.appendChild(div);



    const quantitySelect = new SelectItem(div.querySelector('.drop'))

    return {
        product: product,

        getQuantity: function() {
            return +quantitySelect.getValue();
        }
    };
}


function ShoppingCart(container, products) {

    return {
        open: function() {
            products.filter(p => p.getQuantity() > 0)
                .forEach(p => {
                    const div = document.createElement('div');
                    div.className = 'select-product';
                    div.innerHTML = `<img class="select-product__img" src="${p.product.imgUrl}" alt="product">
                <div class="select-product__wrapper-desc">
                    <p class="select-product__desc">
                        offerta
                    </p>
                    <p class="select-product__desc">
                        fizzyslim con sapore di
                    </p>
                    <p class="select-product__desc select-product__name">
                    ${p.product.name}
                    </p>
            
                    <div class="select-product_wrapper-add">
                        <p class="select-product__desc select-product__desc_b ">
                            qta: <span class="select-product__descselect-product__desc select-product__desc_b   select-product__quantity">${p.getQuantity()}</span>
                        </p>
            
                        <p class="select-product__price">${p.product.currency}${(p.product.price * p.getQuantity()).toFixed(2)}</p>
                    </div>
            
                </div>`
                    container.appendChild(div)
                })

            var count = products.map(p => {
                return p.product.price * p.getQuantity()

            }).reduce((curr, acum) => {
                return curr + acum
            })
            document.querySelector('.count').innerText = count.toFixed(2)

            document.querySelector('.order_wrapper').classList.add('order-visible');
            document.querySelector('.overlay').classList.add('overlay-visible')
        },

        close: function() {
            container.innerHTML = ''
            document.querySelector('.order_wrapper').classList.remove('order-visible');
            document.querySelector('.overlay').classList.remove('overlay-visible')

        }
    };
}