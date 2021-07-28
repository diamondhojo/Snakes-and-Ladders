
var bsize = 10;
var snakes = []
var ladders = []
var numSnakesLadders = 8 //number of snakes and ladders on board at one time (each)
var player = 1
var p1 = 0
var p2 = 0
var items;

function resetGame(){
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function roll(){
    number = Math.floor((Math.random() * 6) + 1);
    
    if(player == 1){
        var oldPos = 1
        if(p1 > 0){ //p1 > 0 prevents uncaught type error (oldPos can't be 0 whenever it's called)
            oldPos = p1 //temporary storage of last positon
        }
        
        p1 += number
        if(snakes.includes(p1)){
            p1 = p1-+ 10
            console.log("snakes")
            document.getElementById("label").innerHTML = "Snake! -10pts"
        } else if(ladders.includes(p1)){
            p1 = p1 + 10
            console.log("ladder")
            document.getElementById("label").innerHTML = "Ladder! +10pts"
        } else {
            document.getElementById("label").innerHTML = ""
        }

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
        
        player = 2
    } else if(player = 2){
        var oldPos = 1
        if(p2 > 0){
            oldPos = p2
        }
        
        p2 += number

        if(snakes.includes(p2)){
            p2 = p2-+ 10
            console.log("snakes")
            document.getElementById("label").innerHTML = "Snake! -10pts"
        } else if(ladders.includes(p2)){
            p2 = p2 + 10
            console.log("ladder")
            document.getElementById("label").innerHTML = "Ladder! +10pts"
        } else {
            document.getElementById("label").innerHTML = ""
        }

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
        
        player = 1
    }
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

    for(var i=0; i<numSnakesLadders; i++){
        while(snakes.length <= numSnakesLadders){
            var snake = random(11, 99) //between 11 and 99 (both inclusively)
            if(snakes.includes(snake)){ //duplicate, generating new number
                while(snakes.includes(snake)){ //keeps regenerating until snake is not already in snakes
                    snake = random(11, 99)
                }
                //items[snake].style.backgroundColor = "red" //for testing; shows location of each snake/ladder
                snakes.push(snake)
                break;
            } else {
                //items[snake].style.backgroundColor = "red"
                snakes.push(snake)
                break;
            }
        }

        while(ladders.length <= numSnakesLadders){
            var ladder = random(1, 89) //between 1 and 99 (both inclusively)
            if(snakes.includes(ladder) | ladders.includes(ladder)){
                while(snakes.includes(ladder) | ladders.includes(ladder)){
                    ladder = random(1, 89)
                }
                //items[ladder].style.backgroundColor = "blue"
                ladders.push(ladder)
                break;
            } else {
                //items[ladder].style.backgroundColor = "blue"
                ladders.push(ladder)
                break;
            }
        }
    }

    console.log("Snakes (" + snakes.length + "): " + snakes)
    console.log("Ladders (" + ladders.length + "): " + ladders)
}

generate();
