let landing = {
    init: function() {
        this.itemsBlock = document.querySelector('.items-wrapper')
        this.itemActive = document.querySelector('.active')
        console.log(this.itemsList)
        for (let i = 1; i < 50; i++) {
            var div = document.createElement("div")
            div.innerText = i
            div.setAttribute('data-price', i)
            div.classList.add('item')
            this.itemsBlock.appendChild(div)
        }
        this.itemsList = document.querySelectorAll('.items-wrapper div')

        this.showItems()
        this.selectItem()

    },
    showItems: function() {
        this.itemActive.addEventListener('click', function(e) {
            this.itemsBlock.classList.toggle('showDrop')

        }.bind(this))

    },

    selectItem: function() {
        this.itemsBlock.addEventListener('click', function(e) {
            console.log(e.target)
            let item = e.target
            this.itemActive.innerHTML = ''
            this.itemActive.appendChild(item)

        }.bind(this))

    }



}
landing.init()