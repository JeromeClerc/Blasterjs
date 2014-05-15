$(document).ready(function() {
    //--------------------------
    // 2018 GAME - Just for fun
    //--------------------------
    
    // Variables touche du clavier
    KEY_DOWN	= 40;
    KEY_UP      = 38;
    KEY_LEFT	= 37;
    KEY_RIGHT	= 39;
    
    // Démarrer un nouveau jeu
    newGame();
    
    $("body").on("click", "a.button", function() {
        if($(this).attr("role") === "new-game") {
            newGame();
        }
    });
    
    // Ecoute des actions clavier
    $(document).on('keyup', function(e) {
        if(Game) {
            if(e.keyCode === KEY_LEFT) {
                if(!moveLeft()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode === KEY_RIGHT) {
                if(!moveRight()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode === KEY_UP) {
                if(!moveUp()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode === KEY_DOWN) {
                if(!moveDown()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode === KEY_LEFT || e.keyCode === KEY_DOWN || e.keyCode === KEY_UP || e.keyCode === KEY_RIGHT) {
                addMove();
            }
        }
    });
    
    // Ecoute des swipe
    $("#grid-wrapper").swipe({
        swipe:function(event, direction) {
            if(Game) {
                if(direction === "left") {
                    if(!moveLeft()) {
                        if(!checkIdSlotsAreFull()) {
                            addOneTile();
                        }
                        else {
                            endOfTheGame(false);
                        }
                    }
                    else {
                        addOneTile();
                    }
                }
                if(direction === "right") {
                    if(!moveRight()) {
                        if(!checkIdSlotsAreFull()) {
                            addOneTile();
                        }
                        else {
                            endOfTheGame(false);
                        }
                    }
                    else {
                        addOneTile();
                    }
                }
                if(direction === "up") {
                    if(!moveUp()) {
                        if(!checkIdSlotsAreFull()) {
                            addOneTile();
                        }
                        else {
                            endOfTheGame(false);
                        }
                    }
                    else {
                        addOneTile();
                    }
                }
                if(direction === "down") {
                    if(!moveDown()) {
                        if(!checkIdSlotsAreFull()) {
                            addOneTile();
                        }
                        else {
                            endOfTheGame(false);
                        }
                    }
                    else {
                        addOneTile();
                    }
                }
                if(direction === "left" || direction === "right" || direction === "up" || direction === "down") {
                    addMove();
                }
            }
        }
    });
    
    function moveDown() {
        for(var i = 1; i < 17; i++) {
            if(i < 13) {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i + 4;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveDown();
        }
        else {
            return false;
        }
    }
    
    function moveUp() {
        for(var i = 1; i < 17; i++) {
            if(i > 4) {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i - 4;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveUp();
        }
        else {
            return false;
        }
    }
   
    function moveLeft() {
        for(var i = 1; i < 17; i++) {
            if(parseInt(i) === 1 || parseInt(i) === 5 || parseInt(i) === 9 || parseInt(i) === 13) {
                console.log('Already to the left side');
            }
            else {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i - 1;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveLeft();
        }
        else {
            return false;
        }
    }
    
    function moveRight() {
        for(var i = 1; i < 17; i++) {
            if(parseInt(i) === 4 || parseInt(i) === 8 || parseInt(i) === 12 || parseInt(i) === 16) {
                console.log('Already to the right side');
            }
            else {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i + 1;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveRight();
        }
        else {
            return false;
        }
    }
   
    function checkIdSlotsAreFull() {
        var result = true;
        for(var i = 1; i < 17; i++) {
            if(Grid[i] === 0) {
                result = false;
            }
        }
        return result;
    }
    
    function checkIfSlotIsFree(n) {
        var result = false;
        if(n < 17 && Grid[n] === 0) {
            return true;
        }
        return result;
    }
    
    function saveTilesPosition(i, nexti, v) {
        Grid[i] = 0;
        Grid[nexti] = v;
    }
    
    function mergeTiles(i, nexti, v) {
        Grid[i] = (parseInt(0));
        Grid[nexti] = (parseInt(v)) + (parseInt(v));
        addToScore(v);
        setAllTiles();
    }
    
    function addToScore(s) {
        var add = s * 10;
        Score = Score + add;
        $("#score").empty().append(Score);
        if(parseInt(s) === 2048) {
            endOfTheGame(true);
        }
    }
    
    function addMove() {
        Moves = Moves + 1;
        $("#moves").empty().append(Moves);
    }
   
    function newGame() {
        initGame();
        initGrid();
        buildGround();
        initDrone();
        /*
        for(var k in Grid) {
            console.log(k, Grid[k]["type"]);
        }
        */
       
       
        /*
        initMerging();
        initTilesClass();
        initScore();
        initMoves();
        
        setRandomTiles(2);
        */
        $(".end-game").hide();
    }
    
    function endOfTheGame(state) {
        Game = false;
        if(state === true) {
            $(".end-game").empty().append("YOU WIN !!!").show();
        }
        else {
            $(".end-game").empty().append("YOU LOOSE :'(").show();
        }
    }
    
    function initTilesClass() {
        TilesClass = {
            2 : "one",
            4 : "two",
            8 : "three",
            16 : "four",
            32 : "five",
            64 : "six",
            128 : "seven",
            256 : "eight",
            512 : "nine",
            1024 : "ten",
            2048 : "eleven"
        };
    }
    
    function initGrid() {
        Grid = [];
        
        var coordX = 0;
        var coordY = 0;
        
        for(var i = 1; i < 401; i++) {
            Grid.push({
                /*id: i,*/
                type: getTileType(),
                coordX: coordX,
                coordY: coordY
            });
            
            if(coordX === parseInt(380)) {
                coordX = 0;
            }
            else {
                coordX = coordX + 20;
            }
            
            if(i % 20 === 0) {
                coordY = coordY + 20;
            }
        }
    }
    
    function getTileType() {
        return Math.floor((Math.random() * 3) + 1);
    }
    
    function initDrone() {
        var k = Math.floor((Math.random() * 400) + 1);
        console.log('Recherche place libre, slot : ' + k);
        
        if(Grid[k]['type'] !== 1) {
            console.log(Grid[k]["type"]);
            console.log('Deja pris');
            initDrone();
        }
        else {
            console.log('key : ' + k);
            console.log('type : ' + Grid[k]["type"]);
            console.log('coordY : ' + Grid[k]["coordY"]);
            console.log('coordX : ' + Grid[k]["coordX"]);
            console.log('Terrain libre');
            $("#grid-wrapper").append('<div class="perso" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/drone-top.png"></div>');
        }
    }
    
    function initScore() {
        Score = 0;
        $("#score").empty().append(Score);
    }
    
    function initMoves() {
        Moves = 0;
        $("#moves").empty().append(Moves);
    }
    
    function initGame() {
        Game = true;
    }
    
    function setRandomTiles(n) {
        for(var i = 0; i < n; i++) {
            var key = Math.floor((Math.random() * 16) + 1);
            var val = Math.floor((Math.random() * 100) + 1);
            if(Grid[key] !== 0) {
                setRandomTiles(n);
            }
            else {
                Grid[key] = getNewTileValue(val);
            }
        }
        setAllTiles();
    }
    
    function addOneTile() {
        var key = Math.floor((Math.random() * 16) + 1);
        var val = Math.floor((Math.random() * 100) + 1);
        if(Grid[key] !== 0) {
            addOneTile();
        }
        else {
            Grid[key] = getNewTileValue(val);
        }
        setAllTiles();
    }
    
    function getNewTileValue(v) {
        if(v < 90) {
            var value = 2;
        }
        else {
            var value = 4
        }
        return value;
    }
    
    function setAllTiles() {
        buildEmptyGrid();
        for(var i = 1; i < 17; i++) {
            if(Grid[i] !== 0) {
                $("#tile-" + i).addClass(TilesClass[Grid[i]]).empty().append(Grid[i]);
            }
        }
    }
    
    function buildGround() {
        $("#grid-wrapper").empty();
        for(var k in Grid) {
            $("#grid-wrapper").append('<div class="tile" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/' + getTileBackground(Grid[k]["type"]) + '"></div>');
        }
        
        /*
        $("#grid-wrapper").empty().append('<ul class="small-block-grid-4">');
        for(var i = 1; i < 17; i++) {
            $(".small-block-grid-4").append('<li><div class="tile" id="tile-' + i + '">&nbsp;</div></li>');
        }
        $("#grid-wrapper").append("</ul>");
        */
    }
    
    function getTileBackground(t) {
        switch(t) {
            case 1:
                var result = 'ground.jpg';
                break;
            case 2:
                var result = 'breakable-wall.jpg';
                break;
            case 3:
                var result = 'unbreakable-wall.jpg';
                break;
            default:
                var result = 'ground.jpg';
        }
        return result;
    }
});