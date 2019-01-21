function startGame(){
    var squares = $(".square");
    var turn = $("#turn");
    var nav = $("#nav");
    var winningMoves = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[7,5,3]];
    var player = [[],[]];
    var playerNo = 0; 
    var color = ["red", "blue"];
    var winningColors = ["winnerRed", "winnerBlue"];
    var winningLane = [];
    var message = "";
    var counter = 0;
    
    var newGame = $("#newgame").text("NEW GAME");
    var result = $("#status").text("IN A MATCH");

    turn.removeClass("blue").addClass("red");
    squares.removeClass("red blue winnerBlue winnerRed");
    nav.removeClass("red blue").addClass("gray");

    //click the box of choice
    squares.click(clicked);

    function clicked(){
        var selected = $(this);
        if(playerNo === 0){
            logic(playerNo, selected);
            playerNo = 1;
        } else {    
            logic(playerNo, selected);
            playerNo = 0;
        }
    }

    //add the moves to the respective player
    function addMoves(selected,player){
        var move = parseInt(selected.text(),10);
        player.push(move);
        selected.off("click");
        console.log(player);
    }


    function logic(index, selected){
        counter++;
        activePlayer = player[index];
        addMoves(selected, activePlayer);
        selected.addClass(color[index]);
        turn.toggleClass("blue");
    
        var checkWin = winningMove(activePlayer, winningMoves);
        if(checkWin){
            message = (color[index] + " WON").toUpperCase();
            console.log(message);
            nav.removeClass("gray");
            highlight(index);
            nav.addClass(color[index]);
            matchEnd();
        } else if(!checkWin && counter ===9){
            message = "MATCH TIED";
            matchEnd();
        }
    }


    //check if the given player has made the winning moves
    function winningMove(player, winningMoves){
    var result = false;
    if(player.length > 2){
            for(var i = 0; i < winningMoves.length; i++){
                var count = 0;
                for(var j=0; j < player.length; j++){
                        if(winningMoves[i].includes(player[j]) ){
                            count++;
                        }
                }
                if(count === 3){
                        result = true;
                        winningLane = winningMoves[i];
                }
        
            }   
        }  
        return result;
    }
    
    function highlight(index){   
        for(var k =0; k < 3; k++){
            var selector = "#" + winningLane[k];
            $(selector).removeClass("red blue").addClass(winningColors[index]);
        }
    }

    function matchEnd(){
        squares.off("click");//disable the click  
        newGame.text("PLAY AGAIN");
        result.text(message);
    }

}



