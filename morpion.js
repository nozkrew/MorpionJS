var grille = [["-", "-", "-"],
              ["-", "-", "-"],
              ["-", "-", "-"]];

var winCombinations = [ [[0,0],[0,1],[0,2]],
                        [[1,0],[1,1],[1,2]],
                        [[2,0],[2,1],[2,2]],
                        [[0,0],[1,0],[2,0]],
                        [[0,1],[1,1],[2,1]],
                        [[0,2],[1,2],[2,2]],
                        [[0,0],[1,1],[2,2]],
                        [[0,2],[1,1],[2,0]] ];

afficheGrille();

function afficheGrille(){
  var html = "<table>";
  for(var i = 0; i < grille.length; i++){
    html += "<tr>";
    for (var j = 0; j < grille[i].length; j++){
      html += "<td onclick='addSign("+i+", "+j+")'>";
      html += grille[i][j];
      html += "</td>" ;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("grille").innerHTML = html;
}

function playAI(){

}

function probCase(i, j){
  
}


function addSign(i, j){
  grille[i][j] = "O";
  playAI();
  afficheGrille();
}
