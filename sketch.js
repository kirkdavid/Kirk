// sprites
let bullet1;
let bullet2;
let bullet3;
let bullet4;
let bullet5;
let mainShip;
let enemyShips = {
    enemy1: [],
    enemy2: [],
    enemy3: []
};
let explosion;
let livesRemaining;
let ammoRemaining;
let ammoSpeed = "SLOW";
let ammoVelocity = -5;

// variables to change the option difficulties
let speedEasy = 12;
let speedMedium = 7;
let speedHard = 3;
let wavesEasy = 1800;
let wavesMedium = 1260;
let wavesHard = 900;
let playerLife = 3; // the health of the player at the beginning of the game


let enemyNumber = 20; // number of enemys to create per wave
let playerVelocity = speedMedium; // horizontal velocity of the player
let waveNumber = wavesHard; // time between each wave
let ammo = 5; // amount of ammo
let score = 0; // player score at start of game

let leaders; // JSON file of hi-score leaders

// location of menu buttons
let menuButtons = {
    playButton: {
        x: 960 / 2,
        y: 200,
        width: 150,
        height: 50
    },
    leaderButton: {
        x: 960 / 2,
        y: 300,
        width: 150,
        height: 50
    },
    settingsButton: {
        x: 960 / 2,
        y: 400,
        width: 150,
        height: 50
    },
    menuButton: {
        x: 28,
        y: 521,
        width: 50,
        height: 25
    }
 }

// location of settings buttons
let settingsButtons = {
    speed: [
        {
            type: "SLOW",
            x: 960 / 3,
            y: 160,
            width: 120,
            height: 40
        },
        {
            type: "FAST",
            x: 960 / 3,
            y: 230,
            width: 120,
            height: 40
        },
        {
            type: "FASTEST",
            x: 960 / 3,
            y: 300,
            width: 120,
            height: 40
        }
        
    ],
    waves: [
        {
            type: "10 seconds",
            x: 960 / 1.5,
            y: 160,
            width: 120,
            height: 40
        },
        {
            type: "7 seconds",
            x: 960 / 1.5,
            y: 230,
            width: 120,
            height: 40
        },
        {
            type: "5 seconds",
            x: 960 / 1.5,
            y: 300,
            width: 120,
            height: 40
        },
    ]
}

// sounds
let playSound;
let bulletSound;
let playerExplosion;
let milestone;
let levelUp;
let noAmmo;
let click;
//video
let video;
// customise the font
let myFont;


let gameTime = -180;

// screen constants
const LOADING = 0; // loading/splash screen
const MAIN_MENU = 1; // main menu
const GAME = 2; // gameplay
const LEADER = 3; // leaderboard
const SETTINGS = 4; // settings menu

let currentScreen = LOADING; // initial startup screen
let enemyDraw; // position to draw enemies
let backgroundImage; // background image
let tickImage; // image of a tick symbol
let starNumber = 25; // number of stars to draw on the background
let randomStars = { // coordinates for random star locations
    x: [],
    y: [],
}


let loadingBar = 30; // loading bar in loading screen state

function preload() {
    backgroundImage = loadImage('images/background.png');
    tickImage = loadImage('images/tick.png');
    livesRemaining = loadImage('images/main-ship.png');
    ammoRemaining = loadImage('images/bullet.png');
    leaders = loadJSON('leaderboard.json');
    playSound = loadSound('sounds/attack.m4a');
    bulletSound = loadSound('sounds/bullet.m4a');
    playerExplosion = loadSound('sounds/player-explosion.m4a');
    milestone = loadSound('sounds/milestone.m4a');
    levelUp = loadSound('sounds/levelup.m4a');
    noAmmo = loadSound('sounds/noammo.m4a');
    click = loadSound('sounds/click.m4a');
    myFont = loadFont('fonts/pacifico.ttf');
}

function setup() {
    createCanvas(960, 536);
    mainShip = createSprite(width / 2, height - 50);
    mainShip.addImage(loadImage('images/main-ship.png'));
    explosion = createSprite(400, 250);
    explosion.addImage(loadImage('images/explosion.png'));
    
    bullet1 = createSprite(-50, -50);
    bullet1.addImage(loadImage('images/bullet.png'));
    bullet2 = createSprite(-50, -50);
    bullet2.addImage(loadImage('images/bullet.png'));
    bullet3 = createSprite(-50, -50);
    bullet3.addImage(loadImage('images/bullet.png'));
    bullet4 = createSprite(-50, -50);
    bullet4.addImage(loadImage('images/bullet.png'));
    bullet5 = createSprite(-50, -50);
    bullet5.addImage(loadImage('images/bullet.png'));
    
    enemyDraw = {
        x: {
            min: 50,
            max: width - 50
        },
        y: {
            min: 50,
            max: 200
        }
    };
    for(i = 0; i < enemyNumber; i++) {
        enemyShips.enemy1[i] = createSprite(random(enemyDraw.x.min, enemyDraw.x.max), random(enemyDraw.y.min, enemyDraw.y.max));
        enemyShips.enemy1[i].addImage(loadImage('images/enemy.png'));
        enemyShips.enemy2[i] = createSprite(random(enemyDraw.x.min, enemyDraw.x.max), random(enemyDraw.y.min, enemyDraw.y.max));
        enemyShips.enemy2[i].addImage(loadImage('images/enemy2.png'));
        enemyShips.enemy3[i] = createSprite(random(enemyDraw.x.min, enemyDraw.x.max), random(enemyDraw.y.min, enemyDraw.y.max));
        enemyShips.enemy3[i].addImage(loadImage('images/enemy3.png'));

    }
     
    video = createVideo('movies/howtoplay.mp4');
    textFont(myFont);
}

  
        

function draw() {
    if(frameCount == 320) {
        currentScreen = MAIN_MENU;
    } else if(currentScreen == LOADING) {
        loadingScreen();
    } else if(currentScreen == MAIN_MENU) {
        mainScreen();
    } else if(currentScreen == GAME) {
        gameScreen();
    } else if(currentScreen == LEADER) {
        leaderScreen();
    } else if(currentScreen == SETTINGS) {
        settingsScreen();
    }
}


// splash screen
function loadingScreen() {
    
    background(backgroundImage);
    // title
    video.hide();
    push();
    textAlign(CENTER);
    fill('green');
    textSize(50);
    text('GALAGA', width / 2, 50);
    text('LOADING...', width / 2, height - 100);
    pop();
    
    push();
    stroke('white');
    strokeWeight(3);
    line(0, height - 50, width, height - 50);
    pop();
    
    loadingBar += 3;
    
    push();
    fill('green');
    noStroke();
    rect(0, height - 48, loadingBar, 50);
    pop();  
}

function backgroundStars() {
    push();
    stroke('white');
    strokeWeight(5);
    if(frameCount % 120 == 5) {
        for(i = 0; i < starNumber; i++) {
            randomStars.x[i] = random(width);
            randomStars.y[i] = random(width);

        }
        
    } 
    for(i = 0; i < starNumber; i++) {
        
        point(randomStars.x[i], randomStars.y[i]);
    }
    pop();
}

// main menu screen with navigation to other screens
function mainScreen() {
    background('black');
    backgroundStars();
    if(mouseX > 0 || mouseY > 0) {
        video.loop();
        image(video, 0, 0, width, height); 
        video.hide(); 
    }
    
    // create enemy ship sprites at random locations
    // title
    push();
    textAlign(CENTER);
    fill('green');
    textSize(50);
    text('GALAGA', width / 2, 50);
    pop();
    // play button
    rectMode(CENTER);
    textAlign(CENTER);
    push();
    buttonInteract(menuButtons.playButton, GAME);
    rect(menuButtons.playButton.x, menuButtons.playButton.y, menuButtons.playButton.width, menuButtons.playButton.height);
    textSize(25);
    push();
    fill('black');
    text('Play', menuButtons.playButton.x, menuButtons.playButton.y + 7);
    pop();
    pop();
    
    // leader button
    push();
    buttonInteract(menuButtons.leaderButton, LEADER);
    rect(menuButtons.leaderButton.x, menuButtons.leaderButton.y, menuButtons.leaderButton.width, menuButtons.leaderButton.height);
    pop();
    push();
    fill('black');
    textSize(25);
    text('Leaderboard', menuButtons.leaderButton.x, menuButtons.leaderButton.y + 7);
    pop();
    
    // settings button
    push();
    buttonInteract(menuButtons.settingsButton, SETTINGS);
    rect(menuButtons.settingsButton.x, menuButtons.settingsButton.y, menuButtons.settingsButton.width, menuButtons.settingsButton.height);
    pop();
    push();
    fill('black');
    textSize(25);
    text('Settings', menuButtons.settingsButton.x, menuButtons.settingsButton.y + 7);
    pop();
    
    // resets the game when returning to the menu
    gameTime = -180;
    playerLife = 3;
    mainShip.position.x = width / 2;
    
}

function bulletShoot() {
    if(ammo == 5 && gameTime >= 0) {
        bullet1.position.x = mainShip.position.x;
        bullet1.position.y = mainShip.position.y - 30;
        bullet1.setVelocity(0, ammoVelocity);
        ammo -= 1;
        bulletSound.play();
    } else if(ammo == 4 && gameTime >= 0) {
        bullet2.position.x = mainShip.position.x;
        bullet2.position.y = mainShip.position.y - 30;
        bullet2.setVelocity(0, ammoVelocity);
        ammo -= 1;
        bulletSound.play();
    } else if(ammo == 3 && gameTime >= 0) {
        bullet3.position.x = mainShip.position.x;
        bullet3.position.y = mainShip.position.y - 30;
        bullet3.setVelocity(0, ammoVelocity);
        ammo -= 1;
        bulletSound.play();
    } else if(ammo == 2 && gameTime >= 0) {
        bullet4.position.x = mainShip.position.x;
        bullet4.position.y = mainShip.position.y - 30;
        bullet4.setVelocity(0, ammoVelocity);
        ammo -= 1;
        bulletSound.play();
    } else if(ammo == 1 && gameTime >= 0) {
        bullet5.position.x = mainShip.position.x;
        bullet5.position.y = mainShip.position.y - 30;
        bullet5.setVelocity(0, ammoVelocity);
        ammo -= 1;
        bulletSound.play();
    } else if(ammo == 0) {
        noAmmo.play();
    }
}

function keyPressed() {
    if(keyCode == 32 && currentScreen == GAME) {
        bulletShoot();
    }
}

function mouseReleased(button) {
    if(mouseX > button.x - (button.width / 2) && mouseX < button.x +(button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed){
        click.play();
    }
}

// gameplay 
function gameScreen() {
    background('black');
    backgroundStars();
    drawSprite(bullet1);
    drawSprite(bullet2);
    drawSprite(bullet3);
    drawSprite(bullet4);
    drawSprite(bullet5);
    // lives
    
    for(i = 0; i < playerLife; i++) {
        image(livesRemaining, width - 25 - (i * 30), menuButtons.menuButton.y - 10, 20, 20);
    }
    
    if(playerLife > 0) {
        drawSprite(mainShip);
        gameTime += 1;
        // moves the player character left   
        if(gameTime > -60) {
            if(keyDown(39) && mainShip.position.x < width - 15) {
                mainShip.setVelocity(playerVelocity, 0);
            } else if(keyDown(37) && mainShip.position.x > 15) {
                mainShip.setVelocity(-playerVelocity, 0);
            } else {
                mainShip.setVelocity(0, 0);
            }
        }
        push();
        fill('white');
        textSize(15);
        // ammo logic
        if(gameTime < waveNumber / 3) {
            if(gameTime % 60 == 0) {
                if(ammo < 5) {
                    ammo += 1; 
                }               
            }
            ammoVelocity = -5;
            ammoSpeed = "SLOW";
            push();
            fill('green')
            pop();
        } else if(gameTime >= waveNumber / 3 && gameTime < (waveNumber / 3 * 2)) {
            if(gameTime % 45 == 0) {
                if(ammo < 5) {
                    ammo += 1; 
                } 
            }
            ammoVelocity = -9; 
            ammoSpeed = "FAST";
        } else if(gameTime >= (waveNumber / 3 * 2) && gameTime < (waveNumber / 3 * 3)) {
            if(gameTime % 30 == 0) {
                if(ammo < 5) {
                    ammo += 1; 
                } 
            }
            ammoVelocity = -11;
            ammoSpeed = "FASTER";
        } else if(gameTime >= (waveNumber / 3 * 3) && gameTime < (waveNumber / 3 * 4)) {
            if(gameTime % 15 == 0) {
                if(ammo < 5) {
                    ammo += 1; 
                } 
            }
            ammoVelocity = -13;
            ammoSpeed = "INSANE";
        } else if(gameTime >= (waveNumber / 3 * 4)) {
            if(gameTime % 5 == 0) {
                if(ammo < 5) {
                    ammo += 1; 
                } 
            }
            ammoVelocity = -40;
            ammoSpeed = "LUDICROUS";
        } 
        
        if(gameTime == waveNumber / 3) {
            levelUp.play();
        } else if(gameTime == waveNumber / 3 * 2) {
            levelUp.play();
        } else if(gameTime == waveNumber / 3 * 3) {
            levelUp.play();
        } else if(gameTime == waveNumber / 3 * 4) {
            levelUp.play();
        }
        text("AMMO SPEED: " + ammoSpeed, menuButtons.menuButton.x - 25, menuButtons.menuButton.y - 20);
        pop();
        
        // ammo image 
        for(i = 0; i < ammo; i++) {
            image(ammoRemaining, menuButtons.menuButton.x + 30 + (i * 20), menuButtons.menuButton.y - 7);
        }
        
        // collision detection
        for(i = 0; i < enemyNumber; i++) {
            // checking if enemies hit the player
            mainShip.overlap(enemyShips.enemy1[i], enemyCollision);
            mainShip.overlap(enemyShips.enemy2[i], enemyCollision);
            mainShip.overlap(enemyShips.enemy3[i], enemyCollision);
            for(j = 0; j < enemyNumber; j++) {
                // enemy ships bounce off each other
                enemyShips.enemy1[i].bounce(enemyShips.enemy1[j]);
                enemyShips.enemy2[i].bounce(enemyShips.enemy2[j]);
                enemyShips.enemy3[i].bounce(enemyShips.enemy3[j]);
            }
        }
        
        if(gameTime % waveNumber < (waveNumber / 3)) {
            for(i = 0; i < enemyNumber; i++) {
                bullet1.overlap(enemyShips.enemy1[i], bulletCollision1);
                bullet2.overlap(enemyShips.enemy1[i], bulletCollision2);
                bullet3.overlap(enemyShips.enemy1[i], bulletCollision3);
                bullet4.overlap(enemyShips.enemy1[i], bulletCollision4);
                bullet5.overlap(enemyShips.enemy1[i], bulletCollision5);
            }
        } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
            for(i = 0; i < enemyNumber; i++) {
                bullet1.overlap(enemyShips.enemy2[i], bulletCollision1);
                bullet2.overlap(enemyShips.enemy2[i], bulletCollision2);
                bullet3.overlap(enemyShips.enemy2[i], bulletCollision3);
                bullet4.overlap(enemyShips.enemy2[i], bulletCollision4);
                bullet5.overlap(enemyShips.enemy2[i], bulletCollision5);
            }
        } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
            for(i = 0; i < enemyNumber; i++) {
                bullet1.overlap(enemyShips.enemy3[i], bulletCollision1);
                bullet2.overlap(enemyShips.enemy3[i], bulletCollision2);
                bullet3.overlap(enemyShips.enemy3[i], bulletCollision3);
                bullet4.overlap(enemyShips.enemy3[i], bulletCollision4);
                bullet5.overlap(enemyShips.enemy3[i], bulletCollision5);
            }
        }
        
        // draws the enemy sprites
        if(gameTime < 0) {
            // do nothing
        } else if(gameTime % waveNumber < (waveNumber / 3) && gameTime >= 0) {
            for(i = 0; i < enemyNumber; i++) {
                drawSprite(enemyShips.enemy1[i]);
            }
        } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
            for(i = 0; i < enemyNumber; i++) {
                drawSprite(enemyShips.enemy2[i]);
            }
        } else if(gameTime % waveNumber >= (waveNumber / 3 * 2) && gameTime % (waveNumber) < waveNumber) {
            for(i = 0; i < enemyNumber; i++) {
                drawSprite(enemyShips.enemy3[i]);
            }
        }

        // reset the position of enemies based on wave difficulty
        if(gameTime < 0) {
            // do nothing
        } else if(waveNumber == wavesEasy) {
            if(gameTime % waveNumber == 0) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy1[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);
                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].setVelocity(random(-1, 1), 0.8);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy2[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].setVelocity(random(-1, 1), 0.8);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3 * 2)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy3[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].setVelocity(random(-1, 1), 0.8);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                }
            }
        } else if(waveNumber == wavesMedium) {
            if(gameTime % waveNumber == 0) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy1[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);
                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].setVelocity(random(-1, 1.1), 1.25);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy2[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].setVelocity(random(-1, 1), 1.25);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3 * 2)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy3[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].setVelocity(random(-1, 1), 1.25);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                }
            }
        } else if(waveNumber == wavesHard) {
            if(gameTime % waveNumber == 0) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy1[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);
                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy1[i].setVelocity(random(-1, 1), 2);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy2[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy2[i].setVelocity(random(-1, 1), 2);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                    enemyShips.enemy3[i].setVelocity(0, 0);
                }
            } else if(gameTime % waveNumber == (waveNumber / 3 * 2)) {
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].position.y = random(enemyDraw.y.min, enemyDraw.y.max);
                    enemyShips.enemy3[i].position.x = random(enemyDraw.x.min, enemyDraw.x.max);

                }
                for(i = 0; i < enemyNumber; i++) {
                    enemyShips.enemy3[i].setVelocity(random(-1, 1), 2);
                    enemyShips.enemy2[i].setVelocity(0, 0);
                    enemyShips.enemy1[i].setVelocity(0, 0);
                }
            }
        }
        
        print(playerLife);
        push();
        fill('white');
        textSize(23);
        text("SCORE: " + score, 8, 22);
        pop();
    }
    
    // menu button
    push();
    rectMode(CENTER);
    buttonInteract(menuButtons.menuButton, MAIN_MENU);
    rect(menuButtons.menuButton.x, menuButtons.menuButton.y, menuButtons.menuButton.width, menuButtons.menuButton.height);
    pop();
    push();
    textAlign(CENTER);
    textSize(13);
    fill('black');
    text('Menu', menuButtons.menuButton.x, menuButtons.menuButton.y + 5);
    pop();
    
    if(playerLife <= 0) {
        push();
        textAlign(CENTER);
        textSize(40);
        fill('red');
        text('GAME OVER', width / 2, 200);
        text('SCORE: ' + score, width / 2, 300);
        pop();
    }
    
    
    if((playerLife == 2 || playerLife == 1) && gameTime > -180 && gameTime < -60) {
        explosion.position.x = mainShip.position.x;
        explosion.position.y = mainShip.position.y;
        drawSprite(explosion);
    } 
    
    fill('white');
    textSize(25);
}
    
// displays leaderboard statistics
function leaderScreen() {
    background('black');
    backgroundStars();
    // title
    push();
    textAlign(CENTER);
    fill('green');
    textSize(50);
    text('LEADERBOARD', width / 2, 50);
    pop();
    // menu button
    push();
    rectMode(CENTER);
    buttonInteract(menuButtons.menuButton, MAIN_MENU);
    rect(menuButtons.menuButton.x, menuButtons.menuButton.y, menuButtons.menuButton.width, menuButtons.menuButton.height);
    pop();
    push();
    textAlign(CENTER);
    textSize(13);
    fill('black');
    text('Menu', menuButtons.menuButton.x, menuButtons.menuButton.y + 5);
    pop();
    // headings
    push();
    fill('red');
    textSize(25);
    text('NAME', 50, 100);
    text('SCORE', 200, 100);
    text('DATE', 350, 100);
    pop;
    // leaderboard
    push();
    textSize(15);
    fill('white');
    for(i = 0; i < leaders.leaders.length; i++) {
        text(leaders.leaders[i].name, 50, 120 + (i * 30));
        text(leaders.leaders[i].score, 200, 120 + (i* 30));
        text(leaders.leaders[i].date, 350, 120 + (i * 30));
    }
    pop();
}

// contains options to change the difficulty of the game
function settingsScreen() {
    background('black');
    backgroundStars();
    // title
    push();
    textAlign(CENTER);
    fill('green');
    textSize(50);
    text('SETTINGS', width / 2, 50);
    pop();
    //menu button
    push();
    rectMode(CENTER);
    buttonInteract(menuButtons.menuButton, MAIN_MENU);
    rect(menuButtons.menuButton.x, menuButtons.menuButton.y, menuButtons.menuButton.width, menuButtons.menuButton.height);
    pop();
    push();
    textAlign(CENTER);
    textSize(13);
    fill('black');
    text('Menu', menuButtons.menuButton.x, menuButtons.menuButton.y + 5);
    pop();
    
    // headings
    push();
    fill('red');
    textAlign(CENTER);
    textSize(25);
    text('Player Speed', width / 3, 100)
    text('Time Between Waves', width / 1.5, 100)
    pop;
    
    // buttons to change settings
    push();
    fill('white')
    rectMode(CENTER);
    for(i = 0; i < settingsButtons.speed.length; i++) {
        push();
        settingsInteractSpeed(settingsButtons.speed[i]);
        rect(settingsButtons.speed[i].x, settingsButtons.speed[i].y, settingsButtons.speed[i].width, settingsButtons.speed[i].height);
        pop();
        push();
        settingsInteractWave(settingsButtons.waves[i]);
        rect(settingsButtons.waves[i].x, settingsButtons.waves[i].y, settingsButtons.waves[i].width, settingsButtons.waves[i].height);
        pop();
    }
    pop();
    
    // text on buttons
    push();
    textSize(23);
    fill('black');
    for(i = 0; i < settingsButtons.speed.length; i++) {
        text(settingsButtons.speed[i].type, settingsButtons.speed[i].x, settingsButtons.speed[i].y + 7);
        text(settingsButtons.waves[i].type, settingsButtons.waves[i].x, settingsButtons.waves[i].y + 7);
    }
    pop();
    
    if(playerVelocity == speedEasy) {
        image(tickImage, settingsButtons.speed[2].x + 60, settingsButtons.speed[2].y - 20);
    } else if(playerVelocity == speedMedium) {
        image(tickImage, settingsButtons.speed[1].x + 60, settingsButtons.speed[1].y - 20);
    } else if(playerVelocity == speedHard) {
        image(tickImage, settingsButtons.speed[0].x + 60, settingsButtons.speed[0].y - 20);
    }
    
    if(waveNumber == wavesEasy) {
        image(tickImage, settingsButtons.waves[0].x + 60, settingsButtons.waves[0].y - 20);
    } else if(waveNumber == wavesMedium) {
        image(tickImage, settingsButtons.waves[1].x + 60, settingsButtons.waves[1].y - 20);
    } else if(waveNumber == wavesHard) {
        image(tickImage, settingsButtons.waves[2].x + 60, settingsButtons.waves[2].y - 20);
    }  
}

// what happens a bullet collides with an enemy
function bulletCollision1() {
    bullet1.position.x = -50;
    bullet1.position.y = -50;
    bullet1.setVelocity(0, 0);
    score += 100;
    if(gameTime % waveNumber < (waveNumber / 3)) {
        explosion.position.x = enemyShips.enemy1[i].position.x;
        explosion.position.y = enemyShips.enemy1[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy1[i].position.x = -500;
        enemyShips.enemy1[i].position.y = -500;
        enemyShips.enemy1[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy2[i].position.x = -500;
        enemyShips.enemy2[i].position.y = -500;
        enemyShips.enemy2[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy3[i].position.x;
        explosion.position.y = enemyShips.enemy3[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy3[i].position.x = -500;
        enemyShips.enemy3[i].position.y = -500;
        enemyShips.enemy3[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    }
    
}

function bulletCollision2() {
    bullet2.position.x = -50;
    bullet2.position.y = -50;
    bullet2.setVelocity(0, 0);
    score += 100;
    if(gameTime % waveNumber < (waveNumber / 3)) {
        explosion.position.x = enemyShips.enemy1[i].position.x;
        explosion.position.y = enemyShips.enemy1[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy1[i].position.x = -500;
        enemyShips.enemy1[i].position.y = -500;
        enemyShips.enemy1[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy2[i].position.x = -500;
        enemyShips.enemy2[i].position.y = -500;
        enemyShips.enemy2[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy3[i].position.x;
        explosion.position.y = enemyShips.enemy3[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy3[i].position.x = -500;
        enemyShips.enemy3[i].position.y = -500;
        enemyShips.enemy3[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    }
    
}

function bulletCollision3() {
    bullet3.position.x = -50;
    bullet3.position.y = -50;
    bullet3.setVelocity(0, 0);
    score += 100;
    if(gameTime % waveNumber < (waveNumber / 3)) {
        explosion.position.x = enemyShips.enemy1[i].position.x;
        explosion.position.y = enemyShips.enemy1[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy1[i].position.x = -500;
        enemyShips.enemy1[i].position.y = -500;
        enemyShips.enemy1[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy2[i].position.x = -500;
        enemyShips.enemy2[i].position.y = -500;
        enemyShips.enemy2[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy3[i].position.x = -500;
        enemyShips.enemy3[i].position.y = -500;
        enemyShips.enemy3[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    }
    
}

function bulletCollision4() {
    bullet4.position.x = -50;
    bullet4.position.y = -50;
    bullet4.setVelocity(0, 0);
    score += 100;
    if(gameTime % waveNumber < (waveNumber / 3)) {
        explosion.position.x = enemyShips.enemy1[i].position.x;
        explosion.position.y = enemyShips.enemy1[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy1[i].position.x = -500;
        enemyShips.enemy1[i].position.y = -500;
        enemyShips.enemy1[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy2[i].position.x = -500;
        enemyShips.enemy2[i].position.y = -500;
        enemyShips.enemy2[i].setVelocity(0, 0);
        if(score % 1000 == 0) {
            milestone.play();
            playerLife += 1;
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy3[i].position.x;
        explosion.position.y = enemyShips.enemy3[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy3[i].position.x = -500;
        enemyShips.enemy3[i].position.y = -500;
        enemyShips.enemy3[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    }
    
}

function bulletCollision5() {
    bullet5.position.x = -50;
    bullet5.position.y = -50;
    bullet5.setVelocity(0, 0);
    score += 100;
    if(gameTime % waveNumber < (waveNumber / 3)) {
        explosion.position.x = enemyShips.enemy1[i].position.x;
        explosion.position.y = enemyShips.enemy1[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy1[i].position.x = -500;
        enemyShips.enemy1[i].position.y = -500;
        enemyShips.enemy1[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3) && gameTime % waveNumber < (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy2[i].position.x;
        explosion.position.y = enemyShips.enemy2[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy2[i].position.x = -500;
        enemyShips.enemy2[i].position.y = -500;
        enemyShips.enemy2[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    } else if(gameTime % waveNumber >= (waveNumber / 3 * 2)) {
        explosion.position.x = enemyShips.enemy3[i].position.x;
        explosion.position.y = enemyShips.enemy3[i].position.y;
        drawSprite(explosion);
        enemyShips.enemy3[i].position.x = -500;
        enemyShips.enemy3[i].position.y = -500;
        enemyShips.enemy3[i].setVelocity(0, 0);
        if(playerLife < 3) {
            if(score % 1000 == 0) {
                milestone.play();
                playerLife += 1;
            }
        }
    }
    
}

// what happens when an enemy collides with the player
function enemyCollision() {
    playerLife -= 1;
    mainShip.setVelocity(0, 0);
    for(j = 0; j < enemyNumber; j++) {
        enemyShips.enemy1[j].position.y = 0;
        enemyShips.enemy2[j].position.y = 0;
        enemyShips.enemy3[j].position.y = 0;
        enemyShips.enemy1[j].setVelocity(0, 0);
        enemyShips.enemy2[j].setVelocity(0, 0);
        enemyShips.enemy3[j].setVelocity(0, 0);
    }
    gameTime = -180;
    ammo = 5;
    ammmoSpeed = -5;
    playerExplosion.play();
}

// controls the interaction for menu buttons
function buttonInteract(button, screen) {
    if(mouseX > button.x - (button.width / 2) && mouseX < button.x +(button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed) {
        currentScreen = screen;
        if(button == menuButtons.playButton) {
            playSound.play();
            for(i = 0; i < enemyNumber; i++) {
                enemyShips.enemy1[i].position.x = -500;
                enemyShips.enemy1[i].position.y = -500;
                enemyShips.enemy2[i].position.x = -500;
                enemyShips.enemy2[i].position.y = -500;
                enemyShips.enemy3[i].position.x = -500;
                enemyShips.enemy3[i].position.y = -500;
            }
        } else if(button == menuButtons.menuButton) {
            playSound.stop();
            playerLife = 3;
            score = 0;
        } 
        mouseReleased(button);
    } else if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2)) {
        fill('green');
    }
}

// controls the interaction of the speed buttons
function settingsInteractSpeed(button) {
    if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "FASTEST") {
        fill('red');
        playerVelocity = speedEasy
        mouseReleased(button);
    } else if (mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "FAST") {
        fill('red');
        playerVelocity = speedMedium
        mouseReleased(button);
    } else if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "SLOW") {
        fill('red');
        playerVelocity = speedHard
        mouseReleased(button);
    } else if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2)) {
        fill('green');
    }
}

// controls the interaction of the waves buttons
function settingsInteractWave(button) {
    if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "10 seconds") {
        fill('red');
        waveNumber = wavesEasy;
        mouseReleased(button);
    } else if (mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "7 seconds") {
        fill('red');
        waveNumber = wavesMedium;
        mouseReleased(button);
    } else if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2) && mouseIsPressed && button.type == "5 seconds") {
        fill('red');
        waveNumber = wavesHard;
        mouseReleased(button);
    } else if(mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2)) {
        fill('green');
    }
} 