const form = document.getElementById('form')
let name1 = document.getElementById('name1') 
let name2 = document.getElementById('name2') 
let error1 = document.getElementById('error1')
let error2 = document.getElementById('error2')
const section1 = document.querySelector('.form')
const section2 = document.querySelector('.game')
let error = false
let Players = {
    player1 : '',
    player2 : ''
}

form.addEventListener('submit', (e) => {
    
    
    if(!name1.value ){
        error1.innerText = 'Please enter The first name'
        error = true
    }else{
        error1.innerText = ''
        error = false
    }
    if(!name2.value){
        error2.innerText = 'Please enter The second name'
        error = true
    }else{
        error2.innerText = ''
        error = false
    }
   
    if(name1.value || name2.value){
        Players.player1 = name1.value
        Players.player2 = name2.value
        let names = JSON.stringify(Players)
        localStorage.setItem('Players',names)
        
        let namesLoacl = JSON.parse(localStorage.getItem('Players'))
        console.log(namesLoacl)

        section1.style.display = 'none'
        section2.style.display = "flex" 

        
    }
    
        e.preventDefault();
    
})

