var grille = ["-","-","-","-","-","-","-","-","-"];

var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

var probPossibilities = [];

var player = "X";

initProb();
afficheGrille();

//Rempli le tableau de probabilité
function initProb(){
    for(var i = 0; i < 9; i++){
        probPossibilities[i] = getCombinationsByIndex(i);
    }
    console.log(probPossibilities);

}

//Indique le nombre de combinaisons gagnantes avec l'index passé en param.
function getCombinationsByIndex(index){
    var cpt = 0;
    for(var i = 0; i < 8; i++){
        if(winCombinations[i].indexOf(index) != -1){
            cpt ++;
        }
    }
    return cpt;
}

function checkWin(){
    //Boucle sur le tableau des combinisons
    for(var i = 0; i < 8; i++){
        if(grille[winCombinations[i][0]] == grille[winCombinations[i][1]] && grille[winCombinations[i][2]] == grille[winCombinations[i][1]] && grille[winCombinations[i][0]] != "-"){
            console.log("Gagnant : " + grille[winCombinations[i][0]]);
            return true;
        }
    }
    return false;
}

function afficheGrille(){
    var cpt = 0;
    var html = "<table>";
    for(var i = 0; i < 3; i++){
        html += "<tr>";
        for (var j = 0; j < 3; j++){
            if(grille[cpt] == "-"){
                html += "<td onclick='addSign("+cpt+")'>";
            }
            else{
                html += "<td>";
            }
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
    if(grille[position] == "-"){
        if(player == "X"){
            grille[position] = "X";
        }
        else{
            grille[position] = "O";
        }
        switchPlayer();
    }
    else{
        console.log("Case prise");

    }
    afficheGrille();
    if(checkWin()){
        //TODO faire une action de fin
        console.log("Fini");
    }
}

function switchPlayer(){
    if(player == "X"){
        player = "O";
    }
    else{
        player = "X";
    }
}
