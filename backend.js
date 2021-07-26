
var bsize = 10;
var snakes = []
var ladders = []
var numSnakesLadders = 10 //number of snakes and ladders on board at one time (each)
var turn = "p1"
var p1 = 0
var p2 = 0
var items;

function resetGame(){
    p1 = 0
    p2 = 0
    snakes = []
    ladders = []
    document.getElementById("roll").disabled = false;

    for(var i = 0; i < items.length; i++){
        items[i].style.backgroundColor = "white"
    }
    
    generateSnakesLadders();
}

function roll(){
    number = Math.floor((Math.random() * 6) + 1);
    
    if(turn == "p1"){
        var oldPos = 1
        if(p1 > 0){ //p1 > 0 prevents uncaught type error (oldPos can't be 0 whenever it's called)
            oldPos = p1 //temporary storage of last positon
        }
        
        p1 += number

        if(p1 == p2){ //same spot
            document.getElementById(p1).style.backgroundColor = "green";
            if(p2 == oldPos){ //p2 still at old spot
                document.getElementById(oldPos).style.backgroundColor = "red";
            } else { //p2 not at old spot
                document.getElementById(oldPos).style.backgroundColor = "white";
            }
        } else {
            if(p2 == oldPos){
                document.getElementById(oldPos).style.backgroundColor = "red";
            } else {
                document.getElementById(oldPos).style.backgroundColor = "white";
            }
            
            if(p1 >= 100){
                document.getElementById(100).style.backgroundColor = "blue";
                alert("Congradulations, Player 1! You won with a score of: " + p1)
                document.getElementById("roll").disabled = true
            } else {
                document.getElementById(p1).style.backgroundColor = "blue";
            }
        }
        
        turn = "p2"
    } else if(turn = "p2"){
        var oldPos = 1
        if(p2 > 0){
            oldPos = p2
        }
        
        p2 += number

        if(p1 == p2){
            document.getElementById(p2).style.backgroundColor = "green";
            if(p2 == oldPos){
                document.getElementById(oldPos).style.backgroundColor = "red";
            } else {
                document.getElementById(oldPos).style.backgroundColor = "white";
            }
        } else {
            if(p1 == oldPos){
                document.getElementById(oldPos).style.backgroundColor = "blue";
            } else {
                document.getElementById(oldPos).style.backgroundColor = "white";
            }
            
            if(p2 >= 100){
                document.getElementById(100).style.backgroundColor = "red";
                alert("Congradulations, Player 2! You won with a score of: " + p2)
                document.getElementById("roll").disabled = true
            } else {
                document.getElementById(p2).style.backgroundColor = "red";
            }
        }
        
        turn = "p1"
    }
}

function generateSnakesLadders(){
    for(var i=0; i<10; i++){
        while(snakes.length <= numSnakesLadders){
            var snake = Math.floor((Math.random() * (100-30)+30));
            if(snakes.includes(snake)){ //duplicate, generating new number
                while(snakes.includes(snake)){ //keeps regenerating until snake is not already in snakes
                    snake = Math.floor((Math.random() * (70-1)+1));
                }
                snakes.push(snake)
                break;
            } else {
                snakes.push(snake)
                break;
            }
        }

        while(ladders.length <= numSnakesLadders){
            var ladder = Math.floor((Math.random() * (70-1)+1));
            if(snakes.includes(ladder) | ladders.includes(ladder)){
                while(snakes.includes(ladder) | ladders.includes(ladder)){
                    ladder = Math.floor((Math.random() * (70-1)+1));
                }
                ladders.push(ladder)
                break;
            } else {
                ladders.push(ladder)
                break;
            }
        }
    }

    console.log("Snakes (" + snakes.length + "): " + snakes)
    console.log("Ladders (" + ladders.length + "): " + ladders)
}

function generate() {
    var container = document.createElement('div');
    container.className = 'grid-container';
    
    container.style.gridTemplateColumns = "repeat(" + bsize + ", 1fr)"
    document.body.appendChild(container);

    for(var i=100; i>0; i--){
        var div = document.createElement('div');
        div.className = 'grid-item';
        div.id = i;
        div.innerHTML = i
        container.appendChild(div);
    }

    items = document.querySelectorAll(".grid-item")

    generateSnakesLadders();

    console.log("Snakes (" + snakes.length + "): " + snakes)
    console.log("Ladders (" + ladders.length + "): " + ladders)
}

generate();
