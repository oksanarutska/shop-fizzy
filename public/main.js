let landing = {
    init: function() {
        this.itemsBlock = document.querySelector('.items-wrapper')
        this.itemActive = document.querySelector('.active')
        console.log(this.itemsList)
        for (let i = 0; i < 51; i++) {
            let div = document.createElement("div")
            div.setAttribute('data-price', i)
            div.classList.add('item')
            let newBlock = this.itemsBlock.appendChild(div)
            let p = document.createElement("p")
            p.innerText = i
            p.classList.add('item_view')
            newBlock.appendChild(p)
        }
        this.itemsList = document.querySelectorAll('.items-wrapper div')

        this.showItems()
        this.selectItem()

    },
    showItems: function() {
        this.itemActive.addEventListener('click', function(e) {
            this.itemsBlock.classList.toggle('showDrop')

        }.bind(this))

        document.addEventListener('click', function(e) {
            // console.log(e.target)
            if (e.target.classList.contains('active') || e.target.classList.contains('item') || e.target.classList.contains('item_view')) {

            } else {
                this.itemsBlock.classList.remove('showDrop')
            }
        }.bind(this))


    },

    selectItem: function() {
        this.itemsBlock.addEventListener('click', function(e) {
            console.log(e.target)
            if (e.target.classList.contains('item_view')) {
                let item = e.target.textContent
                this.itemActive.innerText = item
            }



        }.bind(this))

    }



}
landing.init();