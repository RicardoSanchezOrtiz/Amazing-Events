const { createApp } = Vue

createApp({
    data(){
        return{
            list: undefined,
            categories: undefined,
            searchValue: "",
            checked: [],
            selection: []
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then(info =>{
                this.list = info.events.filter(x => x.date > info.currentDate)
                this.categories = new Set(this.list.map(x => x.category))
                this.selection = this.list
            })
    },
    methods: {
        doubleFilter: function(){
            let searchFilter = this.list.filter( x => x.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            let checkFilter = searchFilter.filter( x => this.checked.includes(x.category) || this.checked.length == 0)
            console.log(checkFilter)
            this.selection = checkFilter
        }
    }
}).mount("#app")