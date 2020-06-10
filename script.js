function init() {
    var taille = 15;
    var grille;
    var nBomb = 0;

    function Square() {
        this.bomb = false;
        this.hidden = true;
        this.marque = false;
        this.explose = false;
        this.nBombNeigh = 0;
    }

    function end() {
        var n = 0;

        for (var y = 0; y < taille; y++) {
            for (var i = 0; i < taille; i++) {
                if (grille[y][i].hidden == true)
                    n++;
            }
        }
        if (n == nBomb) {
            alert("You won boy!");
            initGrille();
        }
    }

    function initGrille() {
        var i = 0;
        var y = 0;

        grille = new Array();
        for (y = 0; y < taille; y++) {
            grille[y] = new Array();
            for (i = 0; i < taille; i++) {
                grille[y][i] = new Square();
                grille[y][i].bomb = (Math.random() < 0.1);
                if (grille[y][i].bomb)
                    nBomb++;
            }
        }
        setNeighBomb();
    }

    function setNeighBomb() {
        var n = 0;
        for (var y = 0; y < taille; y++) {
            for (var i = 0; i < taille; i++) {
                n = 0;
                if ((y > 0) && (i > 0) && (grille[y - 1][i - 1].bomb))
                    n++;
                if ((i > 0) && (grille[y][i - 1].bomb))
                    n++;
                if ((y < taille - 1) && (i > 0) && (grille[y + 1][i - 1].bomb))
                    n++;
                if ((y < taille - 1) && (grille[y + 1][i].bomb))
                    n++;
                if ((y < taille - 1) && (i < taille - 1 ) && (grille[y + 1][i + 1].bomb))
                    n++;
                if ((i < taille - 1 ) && (grille[y][i + 1].bomb))
                    n++;
                if ((y > 0) && (i < taille - 1) && (grille[y - 1][i + 1].bomb))
                    n++;
                if ((y > 0) && (grille[y - 1][i].bomb))
                    n++;
                grille[y][i].nBombNeigh = n;
            }
        }
    }

    function initAffichage() {
        var board = document.createElement("table");
        
        for (var y = 0; y < taille; y++) {
            var array = document.createElement("tr");
            for (var i = 0; i < taille; i++) {
                var cellule = document.createElement("td");
                array.appendChild(cellule);
            }
            board.appendChild(array);
        }
        document.body.appendChild(board);
        
    }

    function affichage() {
        var square = document.getElementsByTagName("td");
        for (var y = 0; y < taille; y++) {
            for (var i = 0; i < taille; i++) {
                if (grille[y][i].hidden == true)
                    square[(taille * y) + i].setAttribute("class", "hidden");
                else if (grille[y][i].bomb)
                    square[(taille * y) + i].setAttribute("class", "bomb");
                else {
                    switch(grille[y][i].nBombNeigh) {
                        case 0 :
                            square[(taille * y) + i].setAttribute("class", "vide");
                        break;
                        case 1 : 
                            square[(taille * y) + i].setAttribute("class", "un");
                        break;
                        case 2 :
                            square[(taille * y) + i].setAttribute("class", "deux");
                        break;
                        case 3 :
                            square[(taille * y) + i].setAttribute("class", "trois");
                        break;
                        case 4 :
                            square[(taille * y) + i].setAttribute("class", "quatre");
                        break;
                        case 5 :
                            square[(taille * y) + i].setAttribute("class", "cinq");
                        break;
                        case 6 :
                            square[(taille * y) + i].setAttribute("class", "six");
                        break;
                        case 7 : 
                            square[(taille * y) + i].setAttribute("class", "sept");
                        break;
                        case 8 :
                            square[(taille * y) + i].setAttribute("class", "huit");
                        break;
                    }
                }
            }
        }
    }

    function marquer(i,j) {
        grille[i][j].marque = !grille[i,j].marque;
        affichage();
      }
          
      function decouvrir(i,j) {
        if(grille[i][j].bomb) {
          alert("BOOOOM");
        }
        else if(grille[i][j].hidden) {
          grille[i][j].hidden = false;
          if(grille[i][j].nBombNeigh==0){
            if((i>0)&&(j>0)&&(grille[i-1][j-1].hidden))
              decouvrir(i-1, j-1);
            if((i>0)&&(grille[i-1][j].hidden))
              decouvrir(i-1, j);
            if((i>0)&&(j<taille-1)&&(grille[i][j].hidden))
               decouvrir(i-1, j);
            if((j<taille-1) &&(grille[i][j+1].hidden))
               decouvrir(i, j+1);
            if((i<taille-1) &&(j<taille-1)&&(grille[i+1][j+1].hidden))
               decouvrir(i+1,j);
            if((i<taille-1)&&(grille[i+1][j].hidden))
               decouvrir(i+1, j);
            if((i<taille-1)&&(j>0)&&(grille[i+1][j-1].hidden))
               decouvrir(i+1, j-1);
            if((j>0)&&(grille[i][j-1].hidden))
               decouvrir(i, j-1);
          }
          affichage();
        }
      }
      
      function detection(event){
          var i,j,k;
          var cases = document.getElementsByTagName("td");
          for(k=0;k<cases.length;k++){
              if(cases[k]==event.target){
                  i = parseInt (k/taille);
                  j = k%taille;
                  switch(event.button){
                      case 0 : 
                          decouvrir(i,j);
                          break;
                      case 2 :
                          marquer(i,j);
                          break;
                  }
              }
          }
      }    

      function rien(event){
        event.preventDefault();
    }

    initGrille();
    initAffichage();
    affichage();
    end();
    window.addEventListener("click", detection, false);
    window.addEventListener("contextmenu",rien,false);
}

window.addEventListener("load", init, false);