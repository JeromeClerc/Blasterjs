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
                console.log('LEFT');
                switchDronePic('left');
            }
            if(e.keyCode === KEY_RIGHT) {
                console.log('RIGHT');
                switchDronePic('right');
            }
            if(e.keyCode === KEY_UP) {
                console.log('UP');
                switchDronePic('up');
            }
            if(e.keyCode === KEY_DOWN) {
                console.log('DOWN');
                switchDronePic('down');
                moveDown();
            }
        }
    });
    
    function switchDronePic(direction) {
        if(direction === 'up') {
            $("#drone").attr("src", "images/drone-top.png");
        }
        if(direction === 'down') {
            $("#drone").attr("src", "images/drone-bot.png");
        }
        if(direction === 'left') {
            $("#drone").attr("src", "images/drone-lft.png");
        }
        if(direction === 'right') {
            $("#drone").attr("src", "images/drone-rgt.png");
        }
    }
    
    function moveDown() {
        if(!checkIfFree('down')) {
            //startToMove();
            console.log('New Drone Y : ' + Drone['coordY']);
            console.log('Start to move');
        }
    }
    
    function checkIfFree(direction) {
        if(direction === 'down' && Drone['coordY'] < 380) {
            //console.log('Direction = ' + direction + ' CoordY Drone ' + Drone['coordY'] + ' < 380');
            //console.log('Longeur de Grid : ' + Grid.length);
            for(var i = 1; i < Grid.length; i++) {
                //console.log('i = ' + i)
                //console.log('Grid Y : ' + Grid[i]["coordY"]);
                //Grid['145']['coordY']
                
                if(Grid[i]['coordY'] === Drone['coordY'] + 20) {
                    if(Grid[i]['type'] === 1) {
                    console.log('Grid Y = Drone Y + 20');
                    console.log('Type : ' + Grid[i]['type']);
                    console.log('terrain libre');
                    //Drone['coordY'] = Drone['coordY'] + 20;
                    //checkIfFree('down');
                    }
                    else {
                        console.log('terrain occupé');
                        //return false;
                    }
                }
            }
        }
        else {
            console.log('Deja tout en bas');
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
    /*
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
    */
    function addToScore(s) {
        var add = s * 10;
        Score = Score + add;
        $("#score").empty().append(Score);
        if(parseInt(s) === 2048) {
            endOfTheGame(true);
        }
    }
    /*
    function addMove() {
        Moves = Moves + 1;
        $("#moves").empty().append(Moves);
    }
    */
    function newGame() {
        initGame();
        initGrid();
        buildGround();
        initDrone();
        
        //console.log('Coord start Drone : ' + Drone);
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
    /*
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
    */
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
        
        if(Grid[k]['type'] !== 1) {
            initDrone();
        }
        else {
            $("#grid-wrapper").append('<div class="perso" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/drone-top.png" id="drone"></div>');
            Drone = {
                coordX : Grid[k]["coordX"],
                coordY : Grid[k]["coordY"]
            }
        }
    }
    
    function initScore() {
        Score = 0;
        $("#score").empty().append(Score);
    }
    
    function initGame() {
        Game = true;
    }
    /*
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
    */
   
    function buildGround() {
        $("#grid-wrapper").empty();
        for(var k in Grid) {
            $("#grid-wrapper").append('<div class="tile" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/' + getTileBackground(Grid[k]["type"]) + '"></div>');
        }
    }
    
    function getTileBackground(t) {
        switch(t) {
            case 1:
                var result = 'ground.jpg';
                break;
            case 2:
                //var result = 'breakable-wall.jpg';
                var result = 'ground.jpg';
                break;
            case 3:
                //var result = 'unbreakable-wall.jpg';
                var result = 'ground.jpg';
                break;
            default:
                var result = 'ground.jpg';
        }
        return result;
    }
});