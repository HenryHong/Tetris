var height = 24;
var width = 11;
var SBodyHtml = '<div style="background-color:lightgreen;height:100%;width:100%"></div>';
var death = 0;
var BlockArr = [];
var EdgeCheck = [];

var timer;

var BlockChoice;
var CurrRotation;
var BlockOrginX = 1;
var BlockOrginY = 6;

//Creates the pixel board
function Board(containerId, rowsCount, colsCount) {
	
    var html = "<div class='ttt'><table>";
    for (var i = 0; i < rowsCount; i++) {
		html += "<tr id='row-" + i + ">";
		for (var j = 0; j < colsCount; j++) {
			/*
			if(i < 4){
				html += "<td id='" + cellId(i, j) + "'></td>";
			}
			else {
				html += "<td id='" + cellId(i, j) + "'></td>";
			}*/
			html += "<td id='"+ cellId(i, j) +"'></td>";
			//console.log("i:"+i+" j:"+j);
        }
        html += "</tr>"
	}
    html += "</table></div>";
    document.getElementById(containerId).innerHTML = html;
};
 
//Recieve the location of the inputted cell 
function cellId(row, col) {
	var loc = row + ":" + col
    return  loc;
}


//Recieve the piece location and makes the blocks based on the location
function CreatePiece (PieceArray){
	var temp
	for(var i = 1; i < PieceArray.length; i++){
			temp = CreateBlock(PieceArray[i].X, PieceArray[i].Y, PieceArray[0]);
			BlockArr.push(temp);
			BlockArr[i-1].update();
	}
}
	
//Function that creates the block for the tetris piece and return piece
function CreateBlock (x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;
	var TetrisBlock = {
		XLoc: this.x,
		YLoc: this.y,
		Prev: this.x + ":" + this.y,
		color: this.color,
		update: function() {
			document.getElementById(this.Prev).innerHTML = '';
			//document.getElementById(cellId(this.XLoc, this.YLoc)).innerHTML = SBodyHtml;
			document.getElementById(cellId(this.XLoc, this.YLoc)).innerHTML = this.XLoc+":"+this.YLoc;
			//document.getElementById(cellId(this.XLoc, this.YLoc)).innerHTML = '<div style="background-color:' + this.color + ';height:100%;width:100%"></div>';
		}
	}
	return TetrisBlock;
}

//Make the edgecheck array filled with block that is cloest to the inputted direction
function ClosestBlock (choice){
	var CurrentIndex = 0;
	var CurrentHigh = 0;
	
	EdgeCheck = [];
	
	for (var i = 0; i < BlockArr.length; i++){
		if (choice == "right"){
			if (BlockArr[i].XLoc != CurrentIndex){
				EdgeCheck.push(BlockArr[i]); 
				CurrentIndex = BlockArr[i].XLoc;
				CurrentHigh =  BlockArr[i].YLoc
				
			}
			else if (BlockArr[i].XLoc == CurrentIndex){
				if (BlockArr[i].YLoc > CurrentHigh){
					EdgeCheck.pop();
					EdgeCheck.push(BlockArr[i]);
				}
			}
		}
		
		if (choice == "left"){
			if (BlockArr[i].XLoc != CurrentIndex){
				EdgeCheck.push(BlockArr[i]); 
				CurrentIndex = BlockArr[i].XLoc;
				CurrentHigh =  BlockArr[i].YLoc
				
			}
			else if (BlockArr[i].XLoc == CurrentIndex){
				if (BlockArr[i].YLoc < CurrentHigh){
					EdgeCheck.pop();
					EdgeCheck.push(BlockArr[i]);
				}
			}
		}
		
		if (choice == "down"){
			if (BlockArr[i].YLoc != CurrentIndex){
				EdgeCheck.push(BlockArr[i]); 
				CurrentIndex = BlockArr[i].YLoc;
				CurrentHigh =  BlockArr[i].XLoc
				
			}
			else if (BlockArr[i].YLoc == CurrentIndex){
				if (BlockArr[i].XLoc > CurrentHigh){
					EdgeCheck.pop();
					EdgeCheck.push(BlockArr[i]);
				}
			}
		}
	}
}

//Check if the game has ended
function CheckDeath(){
	for (var i = 1; i < 11; i++){
		if (document.getElementById(cellId(3, i)).innerHTML != ''){
			clearInterval(this.timer);
			death = 1;
		}
	}
}


function Transformation(){
	var tempx;
	var tempy;
	
	var movex;
	var movey;
	
	//BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
	
	for (var i = 0; i < BlockArr.length; i ++){
		if ((BlockArr[i].XLoc == BlockOrginX) && (BlockArr[i].YLoc == BlockOrginY)){
		}
		else{
			tempx = BlockArr[i].XLoc - BlockOrginX;
			tempy = BlockArr[i].YLoc - BlockOrginY;
	
			movex = BlockOrginX + (-1 * tempy);
			movey = BlockOrginY + tempx;
			
			if ((movey > 10) || (movey < 0) || (movex > 23) || (movex < 0)){
				return 1;
			}
			else if (document.getElementById(cellId(movex,movey)).innerHTML != ''){
				return  1;
			}
			
		}
	} 
	
	for (var i = 0; i < BlockArr.length; i ++){
		if ((BlockArr[i].XLoc == BlockOrginX) && (BlockArr[i].YLoc == BlockOrginY)){
		}
		else{
			tempx = BlockArr[i].XLoc - BlockOrginX;
			tempy = BlockArr[i].YLoc - BlockOrginY;
			
			BlockArr[i].Prev = BlockArr[i].XLoc + ":" + BlockArr[i].YLoc;
			
			//console.log(BlockArr[i].XLoc + ":" + BlockArr[i].YLoc + " is translated to :" + (BlockOrginX + tempy) + ":" + (BlockOrginY + tempx));
			
			BlockArr[i].XLoc = BlockOrginX + (-1 * tempy);
			BlockArr[i].YLoc = BlockOrginY + tempx;
			
			BlockArr[i].update();
		}
	} 
	
	return 0;
}


function RevTransformation(){
	
	var tempx;
	var tempy;
	
	var movex;
	var movey;
	
	var counter = 0;
	
	for (var i = 0; i < BlockArr.length; i ++){
		if ((BlockArr[i].XLoc == BlockOrginX) && (BlockArr[i].YLoc == BlockOrginY)){
		}
		else{
			tempx = BlockArr[i].XLoc - BlockOrginX;
			tempy = BlockArr[i].YLoc - BlockOrginY;
	
			movex = BlockOrginX + tempy;
			movey = BlockOrginY + (-1 * tempx);
			
			console.log("Movex: " + movex + " Movey:" + movey);
			if ((movey > 10) || (movey < 1) || (movex > 23) || (movex < 0)){
				return 1;
			}
			else if (document.getElementById(cellId(movex,movey)).innerHTML != ''){
				return  1;
			}
			console.log(counter);
			counter++;
		}
	} 
	
	for (var i = 0; i < BlockArr.length; i ++){
		if ((BlockArr[i].XLoc == BlockOrginX) && (BlockArr[i].YLoc == BlockOrginY)){
		}
		else{
			tempx = BlockArr[i].XLoc - BlockOrginX;
			tempy = BlockArr[i].YLoc - BlockOrginY;
			
			BlockArr[i].Prev = BlockArr[i].XLoc + ":" + BlockArr[i].YLoc;
			
			//console.log(BlockArr[i].XLoc + ":" + BlockArr[i].YLoc + " is translated to :" + (orginX + tempy) + ":" + (orginY + tempx));
			
			BlockArr[i].XLoc = BlockOrginX + tempy;
			BlockArr[i].YLoc = BlockOrginY + (-1 * tempx);
			
			BlockArr[i].update();
		}
	}
	return 0;
}


function Rotate (){

	if (BlockChoice == 1){
		//nothing happens
	}
	else if (BlockChoice == 2){
		BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
		if (CurrRotation == 0){
			if(Transformation() == 0 ){
				CurrRotation = 1;
			}
		}
		else if (CurrRotation == 1){
			if (RevTransformation() == 0){
				CurrRotation = 0;
			}
		}
	}
	else if (BlockChoice == 3){
		BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
		if (CurrRotation == 0){
			//BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
			Transformation();
			CurrRotation = 1;
		}
		else if (CurrRotation == 1){
			BlockArr.sort(function(a, b){return b.XLoc - a.XLoc});
			RevTransformation();
			CurrRotation = 0;
		}		
	}
	
	else if (BlockChoice == 4){
		BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
		if (CurrRotation == 0){
			//BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
			Transformation();
			CurrRotation = 1;
		}
		else if (CurrRotation == 1){
			//BlockArr.sort(function(a, b){return b.XLoc - a.XLoc});
			RevTransformation();
			CurrRotation = 0;
		}		
	}

	else if ((BlockChoice == 5) || (BlockChoice == 6)){
		BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
		Transformation();
	}
	
	else if (BlockChoice == 7){
		if (CurrRotation == 0){
			BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
			CurrRotation++;
		}
		Transformation();		
	}
}




//Move the tetris block to the right
function MoveRight (){
	var move = 0;
	BlockArr.sort(function(a, b){return a.XLoc - b.XLoc});
	ClosestBlock("right");

	for (var i = 0; i < EdgeCheck.length; i++){
		if ((EdgeCheck[i].YLoc + 1) < width){
			if(document.getElementById(cellId(EdgeCheck[i].XLoc, EdgeCheck[i].YLoc + 1)).innerHTML != ''){
				move = 1;
				break;
			}
		}
		else{
			move = 1;
			break;
		} 
	}

	if(move == 0){
		BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
		for (var i = 0; i < BlockArr.length; i++){
			BlockArr[i].Prev = BlockArr[i].XLoc + ":" + BlockArr[i].YLoc;
			BlockArr[i].YLoc += 1;
			BlockArr[i].update();
		}
		BlockOrginY += 1;
	}
}

//Move the tetris Block to the left
function MoveLeft (){
	var move = 0;
	BlockArr.sort(function(a, b){return a.XLoc - b.XLoc});
	ClosestBlock("left");

	for (var i = 0; i < EdgeCheck.length; i++){
		if ((EdgeCheck[i].YLoc - 1) > 0){
			if(document.getElementById(cellId(EdgeCheck[i].XLoc, EdgeCheck[i].YLoc - 1)).innerHTML != ''){
				move = 1;
				break;
			}
		}
		else{
			move = 1;
			break;
		}
	}
	
	if(move == 0){
		BlockArr.sort(function(a, b){return a.YLoc - b.YLoc});
		for (var i = 0; i < BlockArr.length; i++){
			BlockArr[i].Prev = BlockArr[i].XLoc + ":" + BlockArr[i].YLoc;
			BlockArr[i].YLoc -= 1;
			BlockArr[i].update();
		}
		BlockOrginY -= 1;
	}
}


function MoveDown (){
	var move = 0;
	BlockArr.sort(function(a, b){return a.YLoc - b.YLoc});
	ClosestBlock("down");

	for (var i = 0; i < EdgeCheck.length; i++){
		if ((EdgeCheck[i].XLoc + 1) < height){
			if(document.getElementById(cellId(EdgeCheck[i].XLoc + 1, EdgeCheck[i].YLoc)).innerHTML != ''){
				move = 1;
				break;
			}
		}
		else{
			move = 1;
			break;
		}
	}
	
	if(move == 0){
		BlockArr.sort(function(a, b){return b.XLoc - a.XLoc});
		for (var i = 0; i < BlockArr.length; i++){
			BlockArr[i].Prev = BlockArr[i].XLoc + ":" + BlockArr[i].YLoc;
			BlockArr[i].XLoc += 1;
			BlockArr[i].update();
		}
		BlockOrginX += 1;
	}
	else {
		CheckDeath();
		if (death == 0){
			NewPiece();
		}
	}
}


function FrameMove(){
	MoveDown();
}

//Listen to the arrow keys for the movement
window.addEventListener('keydown', function (e) {
	var dir = e.keyCode;
	if (dir == 39){
		MoveRight();
	}
	else if (dir == 37){
		MoveLeft();
	}
	else if (dir == 38){	
		/*
		try{
			temp = BlockArr;
			Rotate();
		}
		catch(err){
			//RevTransformation();
			console.log("There is an error");
			document.getElementById("result").innerHTML = err;
		}*/
		Rotate();
	}
})


function NewPiece (){
	BlockArr = [];
	BlockChoice = Math.floor((Math.random() * 7) + 1);
	CurrRotation = 0;
	BlockOrginX = 1;
	BlockOrginY = 6;
	
	if (BlockChoice == 1){
		CreatePiece(O);
	}
	else if (BlockChoice == 2){
		CreatePiece(I);
	}
	else if (BlockChoice == 3){
		CreatePiece(S);
	}
	else if (BlockChoice == 4){
		CreatePiece(Z);
	}
	else if (BlockChoice == 5){
		CreatePiece(L);
	}
	else if (BlockChoice == 6){
		CreatePiece(J);
	}
	else if (BlockChoice == 7){
		CreatePiece(T);
	}
}



Board('container', height , width);
NewPiece();

/*
CreatePiece(I);
BlockChoice = 2;
CurrRotation = 0;
*/

//BlockArr.sort(function(a, b){return a.XLoc - b.XLoc});
//BlockArr.sort(function(a, b){return b.XLoc - a.XLoc});
//BlockArr.sort(function(a, b){return a.YLoc - b.YLoc});
//BlockArr.sort(function(a, b){return b.YLoc - a.YLoc});
//Transformation();

timer = setInterval( function(){FrameMove();}, 200);