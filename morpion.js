var grille = ["-","-","-","-","-","-","-","-","-"];

var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 4, 8], [0, 4, 8], [6, 4, 2]];


var player = "X";

afficheGrille();

function afficheGrille(){
  var cpt = 0;	
  var html = "<table>";
  for(var i = 0; i < 3; i++){
    html += "<tr>";
    for (var j = 0; j < 3; j++){
      html += "<td onclick='addSign("+cpt+")'>";
      html += grille[cpt];
      html += "</td>" ;
      cpt ++;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("grille").innerHTML = html;
}


function addSign(position){
  if(
  grille[position] = "O";
  playAI();
  afficheGrille();
}

function Player(){
	
}
