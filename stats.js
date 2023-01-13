const {createApp} = Vue

createApp({
    data(){
        return{
            list: undefined,
            object: undefined,
            percentages: [],
            capacity: [],
            upcomingEvents: [],
            pastEvents: [],
            organizedList: undefined
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then(info =>{
                this.object = info
                this.list = info.events
                this.pastEvents = this.list.filter(x => this.object.currentDate > x.date)
                this.percentages = this.organizeList(this.pastEvents)
                this.capacity = this.sortCapacity(this.list)
                this.upcomingEvents =this.list.filter(x => this.object.currentDate < x.date)
                console.log(this.upcomingEvents)
    })
        },
    methods: {
        organizeList: function(array){
            let organizedList = []
            array.forEach(x => {
                x.percentage = (x.assistance ?? x.estimate)/x.capacity*100
                organizedList.push(x)
            })
            organizedList.sort((a,b) => b.percentage - a.percentage)
            return organizedList
        },
        sortCapacity: function(array){
            let sorted = array.sort((a,b) => b.capacity -a.capacity)
            return sorted
        }
    }
    }).mount("#app")