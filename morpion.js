var grille = ["-","-","-","-","-","-","-","-","-"];
var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
//Tableau des probabilité pour chaque case
var probPossibilities = [];
var player = "X";
var gameOver = false;

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
            document.getElementById('gagnant').innerHTML = "Gagnant : " + grille[winCombinations[i][0]] +" en " + winCombinations[i];
            gameOver = true;
            break;
        }
    }
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
    if(!gameOver) {
        //Verifie que la case est dispo
        if (grille[position] == "-") {
            //Vérifie quel joueur joue
            if (player == "X") {
                grille[position] = "X";
            }
            else {
                grille[position] = "O";
            }

            //Change de joueur
            switchPlayer();

            //Refaire le tableau de probabilité pour l'IA
            calculateProbabilities();
            if (player == "O") {
                actionIA();
            }
        }
        else {
            console.log("Case prise");

        }
        afficheGrille();
        checkWin();
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
    position = mustAttackOrDefend("O");

    if(isNaN(position))
    {
        //IA doit defendre
        position = mustAttackOrDefend("X");
    }

    //IA fait un coup aléatoire sur les positions ayant le plus de chance de victoire
    if(isNaN(position))
    {
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

    }

    if(typeof position == 'undefined'){
        gameOver = true;
        document.getElementById('gagnant').innerHTML = "Match nul";
    }
    else{
        addSign(position);
    }
}


function mustAttackOrDefend(symbol){

    for(var i = 0; i < 8; i++){
        var tab =[];
        for(var j=0; j<3; j++){
            tab[winCombinations[i][j]] = grille[winCombinations[i][j]];
        }

        //Compte le nombre d'occurence de X dans le tableau
        if(countOccurence(tab, symbol) == 2){
            console.log("Possibilité : " + symbol);
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
    if(tab.indexOf("-") == -1){
        return NaN;
    }
    else{
        return tab.indexOf("-");
    }
}