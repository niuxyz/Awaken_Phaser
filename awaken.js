//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
                        
var game = new Phaser.Game(580, 880, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

var heartbeat;

var ui01;
var ui02;
var ui03;
var ui_restart;
var ui_helathBar;
var ui_helathBarEmpty;
// var counterheart; //counts amount of time passed inbetween heart beats
// var lungbreath; 


// var counter01; //for counting number of heart beats
// var counter02;//for counting number of lung bearth
// var counter03;//frocounting number of bodymovement
// var lungActivated; 
// var counterBody;
// var bodyActivated;

var bloodstrike;
// var bodymovement;
// var bodybreath;
var laststage;
var logo;
var laststageSprite;
//Input 
var spacebar;
var Lkey;
var Bkey;
var Rkey;
//group
var g_heart;
var g_lung;
var g_blood;
var g_last;
// var g_body;
//update
var isSpacebarActivited;
var isLKeyActivited;
var isBKeyActivited;
var isAnimationHeartPlay;
//time
var timer = 0;
var timerDuration = 180;
//counter
var counterHeart;
var counterLung;
var counterBlood;
//audio
var breathAudio;
var heartAudio;
var bloodAudio;
//other
var background;
var gameState;


var GameState = {
	Menu :  {value: 0, name: "Menu"},
	Wait :  {value: 1, name: "Wait"},
	Run  :  {value: 2, name: "Run"},
	End  :  {value: 3, name: "End"},
	Endstage : {value: 4, name: "Final"},
};

  function preload () { 

 	game.load.spritesheet('heart', 'asset/heart_beat1.png', 300, 328);
 	game.load.spritesheet('ui01', 'asset/spacebarui1.png', 150, 40);
 	game.load.spritesheet('ui02', 'asset/Lkey2.png', 50, 40);
	game.load.spritesheet('lung','asset/lung_animation7.png', 500, 500);
	game.load.spritesheet('ui03', 'asset/Bkey1.png', 50, 40);
	game.load.spritesheet('ui_restart', 'asset/Rkey1.png', 50, 40);
	game.load.spritesheet('ui_last', 'asset/UI_last.png', 440, 60);
	game.load.spritesheet('back','asset/background4.png', 580,880);
	game.load.spritesheet('bloodstrikeSprite','asset/blood5.png', 480,566);
	game.load.spritesheet('logotitle','asset/logo.png', 70,290);
    game.load.spritesheet('laststageSprite','asset/laststage2.png', 580,855);
    game.load.spritesheet('ui_helathBar', 'asset/healthBar.png', 300, 10);
   //sound
    game.load.audio('HeartbeatSound', 'asset/heart.wav');
    game.load.audio('breathingSound', 'asset/breathing1.wav');
    game.load.audio('bloodSound', 'asset/blood.wav');


  }

  function create () {
  	gameState = GameState.Wait;
 	
 	timer = timerDuration;
  	isSpacebarActivited = false;
   	counterHeart = 0;
  	counterLung = 0;
  	counterBlood = 0;
	counterbody = 0;
	isAnimationHeartPlay = false;

	background = game.add.tileSprite(0,0,580,880,'back');

	g_lung = game.add.group();
	g_blood = game.add.group();
	g_heart = game.add.group();
	g_last = game.add.group();


	heartbeat = g_heart.create(game.width/2, game.height/2 + 200,'heart');  
	heartbeat.anchor.x = .5;
	heartbeat.anchor.y = .5; 
	heartbeat.animations.add('heart',null,6,false); //names,framesplay,fps,loopsornot

	bloodstrike = g_blood.create(280, 600, 'bloodstrikeSprite');
	bloodstrike.anchor.x= .5;
	bloodstrike.anchor.y= .5;
	bloodstrike.animations.add('bloodstrikeSprite',null,12,false);
	bloodstrike.alpha = 0;

	laststage = g_last.create(280, 440, 'laststageSprite');
	laststage.anchor.x= .5;
	laststage.anchor.y= .5;
	laststage.animations.add('laststageSprite',null,4,false);
	laststage.alpha = 0;

	lungbreath = g_lung.create(game.width/2 - 10, game.height/2 + 200, 'lung');
	lungbreath.anchor.x= .5;
	lungbreath.anchor.y= .5;
	lungbreath.animations.add('lung',null,6,false);
	lungbreath.alpha = 0;


	
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
	Bkey = game.input.keyboard.addKey(Phaser.Keyboard.B);
	Rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	

	ui01 = game.add.sprite(game.width/2, game.height/2 + 380,'ui01');
	ui01.anchor.x = .5;
	ui01.anchor.y = 0;
	ui01.alpha = 1;

	ui02 = game.add.sprite(470, game.height/2 + 40,'ui02');
	ui02.anchor.x = .5;
	ui02.anchor.y = 0;
	ui02.alpha = 0;

	ui03 = game.add.sprite(250, game.height/2 - 100,'ui03');
	ui03.anchor.x = .5;
	ui03.anchor.y = 0;
	ui03.alpha = 0;
	
	ui_restart = game.add.sprite(250, game.height/2,'ui_restart');
	ui_restart.anchor.x = .5;
	ui_restart.anchor.y = 0;
	ui_restart.alpha = 0;

	
	ui_helathBarEmpty = game.add.sprite(120, 150,'ui_helathBar');
	ui_helathBarEmpty.frame = 1;
	ui_helathBar = game.add.sprite(120, 150,'ui_helathBar');
	//ui_helathBar.width *= 0.4;

	logo = game.add.sprite(game.width/2, game.height/2, 'logotitle');
	logo.anchor.x = .5;
	logo.anchor.y = .5;
	logo.alpha = 0;

	breathAudio = game.add.audio('breathingSound');
	heartAudio = game.add.audio('HeartbeatSound');
	bloodAudio = game.add.audio('bloodSound');

}

function ResetSpacebar(){
	isSpacebarActivited = false;
}
function ResetLKey(){
	isLKeyActivited = true;
}
function ResetBKey(){
	isBKeyActivited = true;
}

function update(){

	if(gameState == GameState.Menu){

	}else if(gameState == GameState.Wait){
		
		if(isSpacebarActivited != true && spacebar.isDown){
	
			heartAudio.play();

			firststep();
			gameState = GameState.Run;
			counterHeart += 1;
			isSpacebarActivited = true;
			game.time.events.add(Phaser.Timer.SECOND * 0.5, ResetSpacebar, this);

		}

	}else if(gameState == GameState.Run){
		//假如spacebar是可以被检测的状态， 同时按下了 spacebar, 运行以下function
		if(isSpacebarActivited != true && spacebar.isDown){
			firststep();
			timer = timerDuration;
			isSpacebarActivited = true;
			//====================== 先禁止spacebar， 1.2秒后重置 spacebar, 让spacebar 处于可以被检测的状态, 不这么做的话，按下spacebar的一瞬间，会运行多次这个function ====================
			game.time.events.add(Phaser.Timer.SECOND * 1.2, ResetSpacebar, this);
			heartAudio.play();


			counterHeart += 1;
			if(counterHeart == 3){
				//======================= 按了spacebar 3次时, 启用L key ================
				counterHeart = -1000;
				ui02.alpha = 1;
				isLKeyActivited = true;
			}
		}

		//假如L key是可以被检测的状态， 同时按下了 L key, 运行以下function
		if(isLKeyActivited == true && Lkey.isDown){
			
			breathAudio.play()
			secondstep();
			//====================== 1秒后重置 L key, 让L key 处于可以被检测的状态, 不这么做的话，按下L key的一瞬间，会运行多次这个function ====================
			isLKeyActivited = false;
			game.time.events.add(Phaser.Timer.SECOND * 2, ResetLKey, this);
			breathAudio.play()
			counterLung += 1;
			if(counterLung == 2){
				//======================= 按了L key 2次时, 启用B key ================
				counterLung = -1000;
				ui03.alpha = 1;
				isBKeyActivited = true;
			}
		}

		//假如B key是可以被检测的状态， 同时按下了 B key, 运行以下function
		if(isBKeyActivited == true && Bkey.isDown){
			
			bloodAudio.play();
			thirdstep();

			//====================== 1秒后重置 B key, 让B key 处于可以被检测的状态, 不这么做的话，按下B key的一瞬间，会运行多次这个function ====================
			isBKeyActivited = false;
			game.time.events.add(Phaser.Timer.SECOND * 1, ResetBKey, this);
			bloodAudio.play();

			counterBlood +=1;
			if(counterBlood == 2){
				//======================= 按了b键两次时 运行 OnEndPage Function， fadein Endscreen ================
				OnEndPage();
			}
		}

		timer -= 1;
		ui_helathBar.width = timer / timerDuration * 300; 
		if(timer <= 0){
			gameState = GameState.End;
		}
	}
	else if(gameState == GameState.End){
		game.state.restart();
	}

	if(gameState == GameState.Endstage){

	}
}
//========================= 每一次按 spacebar 都会运行这个function ================
function firststep(){
	heartbeat.animations.play('heart'); 
	ui01.alpha= 0;
	counterheart = 0;
}

//========================= 每一次按A key 都会运行这个function ================
function secondstep(){

	if(lungbreath.alpha == 0){
		game.add.tween(lungbreath).to({alpha:1}, 2000, Phaser.Easing.Linear.None, true, 0,0, false);
	}
	lungbreath.animations.play('lung'); 
	ui02.kill();
}
//========================= 每一次按B key 都会运行这个function ================
function thirdstep()
{
	if(bloodstrike.alpha == 0){
		game.add.tween(bloodstrike).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 0,0, false);
	}
	bloodstrike.animations.play('bloodstrikeSprite'); 
	ui03.alpha= 0;
	counterLung = 0;

}
	
//========================= 游戏结束后运行这个function, 所有结束面板相关的写这里 ================
 function OnEndPage (){   
        

// =================================== Fade In / Fade Out  1000 = 1s  ============================================
	gameState = GameState.Endstage;
 	game.add.tween(lungbreath).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true,0,0, false);
 	game.add.tween(bloodstrike).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true,0,0, false);
 	game.add.tween(heartbeat).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true,0,0, false);
 	
//==============================================last stage stuff=========================================

 	endScreen = game.add.tween(laststage).to({alpha:1}, 5000, Phaser.Easing.Linear.None, true,0,0, false);
 	game.add.tween(logo).to({alpha:1}, 5000, Phaser.Easing.Linear.None, true,0,0, false);
 	
}


function render(){


}