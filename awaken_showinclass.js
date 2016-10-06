
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
                        
var game = new Phaser.Game(600, 880, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

var heartbeat;
var spacebar;
var ui01;
var ui02;
var ui03;
var counterheart; //counts amount of time passed inbetween heart beats
var lungbreath; 
var counterlung; //counts amount of time passed in between lung breaths
var Lkey;
var counter01; //for counting number of heart beats
var lungActivated; 
var bodybreath;
var counterBody;
var bodyActivated;
var Bkey;

  function preload () {   
 	game.load.spritesheet('heart', 'asset/heart_beat1.png', 320, 350);
 	game.load.spritesheet('ui01', 'asset/spacebarui.png', 135, 35);
 	game.load.spritesheet('ui02', 'asset/Lkey.png', 35, 30);
	game.load.spritesheet('lung','asset/lung_animation3.png', 550, 550);
	game.load.spritesheet('body','asset/body_breath.png', 600, 880);
	game.load.spritesheet('ui03', 'asset/Bkey.png', 100, 100);
	game.stage.backgroundColor = 0X00078c;

  }

  function create () {
      // game.physics.startSystem(Phaser.Physics.ARCADE);  
heartbeat = game.add.sprite(game.width/2, game.height/2,'heart');  
heartbeat.anchor.x = .5;
heartbeat.anchor.y = .5; 
heartbeat.animations.add('heart',null,9,false); //names,framesplay,fps,loopsornot
counterheart = 0;

counter01=0;

lungbreath = game.add.sprite(game.width/2 - 15, game.height/2, 'lung');
lungbreath.anchor.x= .5;
lungbreath.anchor.y= .5;
lungbreath.animations.add('lung',null,6,false);
counterlung = 0;
lungActivated = false;



spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
spacebar.onDown.add(firststep);

Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
Lkey.onDown.add(secondstep);



ui01 = game.add.sprite(game.width/2, game.height/2 + 200,'ui01');
ui01.anchor.x = .5;
ui01.anchor.y = 0;
ui01.alpha = 1;


ui02 = game.add.sprite(450, game.height/2 - 200,'ui02');
ui02.anchor.x = .5;
ui02.anchor.y = 0;
ui02.alpha = 0;





heartbeat.bringToTop();


  }

function firststep(){

	heartbeat.animations.play('heart'); 
	ui01.alpha = 0;
	counterheart = 0;
	counter01 ++ ;
	if (counter01 > 4 && !lungActivated){
	lungActivated = true;
	ui02.alpha = 1;

	}


}

function secondstep(){
	if (lungActivated) {		
	lungbreath.animations.play('lung'); 
	counterlung = 0;
	ui02.alpha = 0;
	
	}



}




function update(){
	counterheart ++ ;
	if (counterheart > 150){
		ui01.alpha = 1;
		lungActivated = false;
		counter01 = 0;
	}

	counterlung ++ ;

}

function render(){

  }
