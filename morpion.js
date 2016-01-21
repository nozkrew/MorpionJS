var grille = ["-","-","-","-","-","-","-","-","-"];

var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

//Tableau des probabilité pour chaque case
var probPossibilities = [];

var player = "X";

initProb();
afficheGrille();

//Rempli le tableau de probabilité
function initProb(){
    for(var i = 0; i < 9; i++){
        probPossibilities[i] = getCombinationsByIndex(i).length;
    }
}

//Indique le nombre de combinaisons gagnantes avec l'index passé en param.
function getCombinationsByIndex(index){
    var tab = [];
    for(var i = 0; i < 8; i++){
        if(winCombinations[i].indexOf(index) != -1){
            tab.push(winCombinations[i]);
        }
    }
    return tab;
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
    //Verifie que la case est dispo
    if(grille[position] == "-"){
        //Vérifie quel joueur joue
        if(player == "X"){
            grille[position] = "X";
        }
        else{
            grille[position] = "O";
        }

        //Change de joueur
        switchPlayer();

        //Refaire le tableau de probabilité pour l'IA
        calculateProbabilities();
        if(player == "O"){
            actionIA();
        }
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

function calculateProbabilities(){
    for(var i=0; i < 9; i++){
        //Si la case est prise, la prob est null
        if(grille[i] != "-"){
            probPossibilities[i] = NaN;
        }
        else{
            var prob = getCombinationsByIndex(i);
            var cpt = prob.length;
            for(var j = 0; j < prob.length; j++){
                for(var k=0; k<3; k++){
                    if(grille[prob[j][k]] == "X"){
                        cpt--;
                        break;
                    }
                }
            }
            probPossibilities[i] = cpt;
        }
    }
    console.log(probPossibilities);
}

function actionIA(){
    var position = "";

    //IA doit attaquer
    var mustAttack = mustAttack();
    if(!isNaN(mustAttack))
    {
        position = mustAttack;

    }

    //TODO : MustDefend


        //Partie aléatoire
        //Recupère le nombre le + grand
        var max = 0;
        for(var i=0; i<9; i++){
            if(!isNaN(probPossibilities[i])){
                if(probPossibilities[i] > max){
                    max = probPossibilities[i];
                }
            }
        }

        var tab = [];
        for(var i=0; i<9; i++){
            if(probPossibilities[i] == max){
                tab.push(i);
            }
        }

        var rand = Math.floor((Math.random() * (tab.length - 1)) + 0);
        position = tab[rand];


    addSign(position);
}

function mustAttack(){

    for(var i = 0; i < 8; i++){
        var tab =[];
        for(var j=0; j<3; j++){
            tab[winCombinations[i][j]] = grille[winCombinations[i][j]];
        }

        //Compte le nombre d'occurence de X dans le tableau
        if(countOccurence(tab, "O") == 2){
            console.log("Possibilité d'attaque");
            return getEmptyCaseInWinCombinations(tab);
        }
    }
    return NaN;
}

function countOccurence(tab, search){
    var cpt = 0;
    for(var k=0; k < tab.length; k++){
        if(tab[k] == search){
            cpt++;
        }
    }
    return cpt;
}

function getEmptyCaseInWinCombinations(tab){
    return tab.indexOf("-");
}