const {createApp} = Vue

createApp({
    data(){
        return{
            list: undefined,
            stringInicial: undefined,
            parametroUrl: undefined,
            id: undefined,
            eventoBuscado: []
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then(info =>{
                this.list = info
                this.stringInicial = location.search
                this.parametroUrl= new URLSearchParams(this.stringInicial)
                this.id = this.parametroUrl.get("id")
                console.log(this.id)
                this.eventoBuscado = this.list.events.find(x => x._id == this.id )})
    }
}).mount("#app")
