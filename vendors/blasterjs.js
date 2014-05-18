$(document).ready(function() {
    //--------------------------
    // 2018 GAME - Just for fun
    //--------------------------
    
    // Variables touche du clavier
    KEY_DOWN	= 40;
    KEY_UP      = 38;
    KEY_LEFT	= 37;
    KEY_RIGHT	= 39;
    KEY_ENTER	= 13;
    KEY_ESC	= 27;
    KEY_SPACE	= 32;
    
    // Démarrer un nouveau jeu
    newGame();
    
    $("body").on("click", "a.button", function() {
        if($(this).attr("role") === "new-game") {
            newGame();
        }
    });
    
    // Ecoute des actions clavier
    $(document).on('keydown', function(e) {
        if(Game) {
            saveOriginCoordDrone();
            
            if(e.keyCode === KEY_LEFT) {
                console.log('LEFT');
                switchDronePic('left');
                moveLeft();
            }
            if(e.keyCode === KEY_RIGHT) {
                console.log('RIGHT');
                switchDronePic('right');
                moveRight();
            }
            if(e.keyCode === KEY_UP) {
                console.log('UP');
                switchDronePic('up');
                moveUp();
            }
            if(e.keyCode === KEY_DOWN) {
                console.log('DOWN');
                switchDronePic('down');
                moveDown();
            }
            if(e.keyCode === KEY_SPACE) {
                console.log('FIRE');
                laserFire();
            }
        }
    });
    
    function switchDronePic(direction) {
        if(direction === 'up') {
            $("#drone").children("img").attr("src", "images/drone-top.png");
            Drone['orient'] = 'up';
        }
        if(direction === 'down') {
            $("#drone").children("img").attr("src", "images/drone-bot.png");
            Drone['orient'] = 'down';
        }
        if(direction === 'left') {
            $("#drone").children("img").attr("src", "images/drone-lft.png");
            Drone['orient'] = 'left';
        }
        if(direction === 'right') {
            $("#drone").children("img").attr("src", "images/drone-rgt.png");
            Drone['orient'] = 'right';
        }
    }
    
    function moveDown() {
        if(!checkIfFree('down')) {
            animDroneMove('down');
            checkifGoalReached();
        }
    }
    
    function moveUp() {
        if(!checkIfFree('up')) {
            animDroneMove('up');
        }
    }
    
    function moveLeft() {
        if(!checkIfFree('left')) {
            animDroneMove('left');
        }
    }
    
    function moveRight() {
        if(!checkIfFree('right')) {
            animDroneMove('right');
        }
    }
    
    function laserFire() {
        if(Drone['orient'] === 'up') {
            var y = Drone['coordY'] - 20;
            var x = Drone['coordX'];
        }
        if(Drone['orient'] === 'down') {
            var y = Drone['coordY'] + 20;
            var x = Drone['coordX'];
        }
        if(Drone['orient'] === 'left') {
            var y = Drone['coordY'];
            var x = Drone['coordX'] - 20;
        }
        if(Drone['orient'] === 'right') {
            var y = Drone['coordY'];
            var x = Drone['coordX'] + 20;
        }
        $("#grid-wrapper").append('<div class="fire" style="top:' + y + 'px;left:' + x + 'px;"><img src="images/blast-center.png"></div>');
        removeBlastedTile(y, x);
        $('.fire').delay(300).fadeOut('fast');
    }
    
    function animDroneMove(direction) {
        if(direction === 'down') {
            $("#drone").animate({top: Drone['coordY'] + 'px'}, getDroneMoveTiming(Drone['coordY'] - DroneOrigin['coordY']));
        }
        if(direction === 'up') {
            $("#drone").animate({top: Drone['coordY'] + 'px'}, getDroneMoveTiming(DroneOrigin['coordY'] - Drone['coordY']));
        }
        if(direction === 'left') {
            $("#drone").animate({left: Drone['coordX'] + 'px'}, getDroneMoveTiming(DroneOrigin['coordX'] - Drone['coordX']));
        }
        if(direction === 'right') {
            $("#drone").animate({left: Drone['coordX'] + 'px'}, getDroneMoveTiming(Drone['coordX'] - DroneOrigin['coordX']));
        }
    }
    
    function getDroneMoveTiming(delta) {
        return 300 * (parseInt(delta) / 20);
    }
    
    function saveOriginCoordDrone() {
        DroneOrigin = {
                        coordX : Drone['coordX'],
                        coordY : Drone['coordY']
                    }
    }
    
    function removeBlastedTile(y, x) {
        for(var i = 1; i < Grid.length; i++) {
            if(Grid[i]['coordY'] === y && Grid[i]['coordX'] === x && Grid[i]['type'] === 2) {
                Grid[i]['type'] = 1;
                $('#tile-' + i).children("img").attr("src", "images/ground.jpg");
            }
        }
    }
    
    function checkIfFree(direction) {
        if(direction === 'down' && Drone['coordY'] < 380) {
            for(var i = 1; i < Grid.length; i++) {
                if(Grid[i]['coordY'] === Drone['coordY'] + 20 && Grid[i]['coordX'] === Drone['coordX']) {
                    if(Grid[i]['type'] === 1) {
                        Drone['coordY'] = Drone['coordY'] + 20;
                        checkIfFree('down');
                        break;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        if(direction === 'up' && Drone['coordY'] > 0) {
            for(var i = 1; i < Grid.length; i++) {
                if(Grid[i]['coordY'] === Drone['coordY'] - 20 && Grid[i]['coordX'] === Drone['coordX']) {
                    if(Grid[i]['type'] === 1) {
                        Drone['coordY'] = Drone['coordY'] - 20;
                        checkIfFree('up');
                        break;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        if(direction === 'left' && Drone['coordX'] > 0) {
            for(var i = 1; i < Grid.length; i++) {
                if(Grid[i]['coordY'] === Drone['coordY'] && Grid[i]['coordX'] === Drone['coordX'] - 20) {
                    if(Grid[i]['type'] === 1) {
                        Drone['coordX'] = Drone['coordX'] - 20;
                        checkIfFree('left');
                        break;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        if(direction === 'right' && Drone['coordX'] < 380) {
            for(var i = 1; i < Grid.length; i++) {
                if(Grid[i]['coordY'] === Drone['coordY'] && Grid[i]['coordX'] === Drone['coordX'] + 20) {
                    if(Grid[i]['type'] === 1) {
                        Drone['coordX'] = Drone['coordX'] + 20;
                        checkIfFree('right');
                        break;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }
    
    function checkifGoalReached() {
        if(Drone['coordX'] === Goal['coordX'] && Drone['coordY'] === Goal['coordY']) {
            endOfTheGame(true)
        }
    }
    
    function addToScore(s) {
        var add = s * 10;
        Score = Score + add;
        $("#score").empty().append(Score);
        if(parseInt(s) === 2048) {
            endOfTheGame(true);
        }
    }
    
    function newGame() {
        initGame();
        initGrid();
        buildGround();
        initDrone();
        initGoal();
        
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
        var rand = Math.floor((Math.random() * 100) + 1);
        
        if(rand <= 50) {
            var type = 1;
        }
        else if(rand >= 51 && rand <= 75) {
            var type = 2;
        }
        else {
            var type = 3;
        }
        return type;
    }
    
    function initDrone() {
        var k = Math.floor((Math.random() * 400) + 1);
        
        if(Grid[k]['type'] !== 1) {
            initDrone();
        }
        else {
            $("#grid-wrapper").append('<div class="perso" id="drone" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/drone-top.png"></div>');
            Drone = {
                coordX : Grid[k]["coordX"],
                coordY : Grid[k]["coordY"],
                orient : 'up'
            }
        }
    }
    
    function initGoal() {
         var k = Math.floor((Math.random() * 400) + 1);
         
         if(Grid[k]['type'] !== 1) {
            initGoal();
        }
        else {
            $("#grid-wrapper").append('<div class="goal" id="goal" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/goal.jpg"></div>');
            Goal = {
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
   
    function buildGround() {
        $("#grid-wrapper").empty();
        for(var k in Grid) {
            $("#grid-wrapper").append('<div class="tile" id="tile-' + k + '" style="top:' + Grid[k]["coordY"] + 'px;left:' + Grid[k]["coordX"] + 'px;"><img src="images/' + getTileBackground(Grid[k]["type"]) + '"></div>');
        }
    }
    
    function getTileBackground(t) {
        switch(t) {
            case 1:
                var result = 'ground.jpg';
                break;
            case 2:
                var result = 'breakable-wall.jpg';
                //var result = 'ground.jpg';
                break;
            case 3:
                var result = 'unbreakable-wall.jpg';
                //var result = 'ground.jpg';
                break;
            default:
                var result = 'ground.jpg';
        }
        return result;
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
});