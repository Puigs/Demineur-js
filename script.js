function init() {
    var taille = 15;
    var grille;
    var nBomb = 0;

    function Square() {
        
    }

    function end() {
        
    }

    function initGrille() {
        
    }

    function setNeighBomb() {
        
    }

    function initAffichage() {
        
        
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
              }
            }
        }
    }
    }

    function marquer(i,j) {
        
      }
          
      function decouvrir(i,j) {
        
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