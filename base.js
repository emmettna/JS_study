/*

By Emmett Na 2017/05/10

*/
/* TODO

*/
var life = 5;
var bunnyImg = new Image();
var bunnyObj;
var level = 1;
var knives = 40 * level;
var gravity = 200;
var stars = 0;
var cave = {y:300,x:510}
var initPosition = {
  'left':40,
  'top':50}

var canvasSize = {'width':600,
                  'height':400}

var mousePosition = {
  'x':0,
  'y':0}

var bunnySize = {
  'height':60,
  'width':30}

var bunnyBlock = {
  'q':0,
  'w':0}

function addBunny(){
  $('<img>').attr('id','bunny').attr('src','bunny.png').attr('id','bunny')
  .css('width', 60).css('height',100).css('position','absolute')
  .css('left',canvasSize.width/2)
  .css('top',canvasSize.height - bunnySize.height * 2 + 20).appendTo($('#bg'))
}

function llog(text){
  console.log(text);
}
function setSquare(){
  $('#squareBlock').css('position','absolute')
  .css('top',canvasSize.height - bunnySize.height * 2 + 20)
  .css('left',canvasSize.width/2).css('height',100).css('width',60)
  .css('border','3px solid red');
}

function setCave(){
  $('#cave').css('position','absolute')
  .css('top',cave.y)
  .css('left',cave.x).css('height',10).css('width',10)
  .css('border','3px solid red');
}

function setMousePosition(event){
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;

  // Because of the image size, bunnyBlock is adjusted bruteforce
  if ( 130 < mousePosition.x && mousePosition.x < canvasSize.width+2){
    $('#bunny').css('left',event.clientX-60);
    bunnyBlock.q = event.clientX - 55;
    bunnyBlock.w = event.clientX + 20;
    $('#squareBlock').css('left', mousePosition.x-60);
  }
}

function setCanvas(){
  $('#bg').css('position', 'absolute').css('left', initPosition.left)
  .css('top',initPosition.top).css('height',canvasSize.height)
  .css('width',canvasSize.width).css('borderStyle','solid').css('border-color','black').css('color','red');
}

function setSideBar(){
  $('#sideBar').css('position','absolute').css('width',canvasSize.width / 8)
  .css('height', canvasSize.height).css('background-image','url("log.png")')
  ;

  // Add child nodes
  setLife();
  setKnives();
  setLevel();
  setStars();
}

function setLife(){
  $('#lifeLeft').css('position','absolute').css('top',65)
  .css('height',20).css('width',$('#sideBar').css('width'))
  .text($('#lifeLeft').text()+" "+life)
}

function setKnives(){
  $('#Knives').css('position','absolute').css('top',105)
  .css('width',$('#sideBar').css('width')).css('height',20)
  .text('Knives '+knives);
}

function setLevel(){
  $('#Level').css('position','absolute').css('top',185)
  .css('width',$('#sideBar').css('width')).css('height',20)
  .text('Level '+level);
}
function setStars(){
  $('#Stars').css("position", 'absolute').css('top',205)
  .css('width',$('#sideBar').css('width')).css('height',20)
  .text('Stars '+ stars);
}

function knivesFalling(){
  var interval = setInterval(shootEm, gravity);
  function shootEm(){
    if (knives == 0){
      level ++;
      $('#Level').text('Level '+level);
      knives = 40 * (level * 1.1);
      $('#Knives').text('knives '+knives);
      gravity -= 20;
      clearInterval(interval);
    }else{
      knifeFall();
      knives --;
      setKnives();
    }
  }
}

function knifeFall(){
  let rand = Math.floor((Math.random() * (500)) + 0);
  var img = $('<img>').css('position','absolute').css('left',rand+80)
  .attr('id','knife').addClass('knives').attr('src','knife.png')
  .css('width',10).css('height',30).appendTo($('#bg'));
  var i = initPosition.top;
  var knifeInterval = setInterval(move,5);
  function move(){
    if(i==400){
      img.remove();
      clearInterval(knifeInterval);
    }else{
      img.css('top',i + 1);
      i ++;
      didItHit(img)
    }
  }
  function didItHit( img) {
      let left = parseInt( img.css( 'left'));
      if( ( parseInt( img.css('top')) >= 310)
        &&(left >= bunnyBlock.q)
        &&(left + 30 <= bunnyBlock.w)){
        $('.knives').remove();
        $('.stars').remove();
        knives = level * 40;
        for (var ii = 0 ; ii < 1000; ii++){
  	       clearInterval(ii);}
        life -= 1;
        $('#lifeLeft').text("Life Count = "+life);
        $('#bg').css('background-image','url(deadrabbit.png)')
        $('#sideBar').hide();
        if (life <= 0){
          life = 5;
          level = 1;
          knives = level * 40;
          repaintSidebar();
          bgChange("gameover.jpg");
        }
      }
    }
}
function startButton(){
  knivesFalling();
  bgChange('bunnyhouse.jpg');
  $('#sideBar').show()
  starsAreFalling()
}
function bgChange(url){
  $('#bg').css('background-image','url('+url+')');

}
function repaintSidebar(){
  $('#lifeLeft').text("Life Count = " + life);
  $('#Level').text("Level "+level);
  $('#Knives').text("Knives "+knives);
}
function starsAreFalling(){
  var starInterval = setInterval(startsFall, 400);
  function startsFall(){
    if (knives <= 5){
      llog("less than 5")
      clearInterval(starInterval)
    }
    var rand = Math.floor((Math.random() * (500)) + 0);
    var star = $('<img>').attr('src','star.png').attr('id','star')
    .css('position','absolute').css('width',10).css('height',10).css('top',0)
    .css('left',rand+80).addClass('stars');
    star.appendTo($('#bg'));
    var interval = setInterval(fall, 5);
    var i = 0;
    function fall(){
      star.css('top',parseInt(star.css('top')) + 1)
      if(i>400){
        clearInterval(interval)
        star.remove();
      }else{
        i++;
        collectStar()
      }
    }
    function collectStar(){
    let left = parseInt(star.css('left'));
    if ((parseInt(star.css('top')) >= 310)
      &&(left >= bunnyBlock.q)
      &&(left + 30 <= bunnyBlock.w)){
        llog("hit")
        clearInterval(interval)
        var toCaveInterval = setInterval(toCave, 10);
      }

      function toCave(){
        var left = parseInt(star.css('left'));
        if (left < cave.x ){    // Star is located right
          star.css('left',parseInt(star.css('left'))+2)}
        if(parseInt(star.css('top')) > cave.y){   //star is located above cave
            star.css('top',parseInt(star.css('top')) - 2);
          }
        if(parseInt(star.css('top'))<cave.y){   //star is located below cave
            star.css('top', parseInt(star.css('top') - 2));
          }
        if(left >cave.x + 3){
          star.css('left', left - 2);
        }
        if ((left >= cave.x-4) && (parseInt(star.css('top')) >= cave.y-4)
        &&(left<= cave.x+4)&&(parseInt(star.css('top'))<=cave.y+4)){
            star.remove();
            clearInterval(toCaveInterval)
            stars ++;
            $('#Stars').text("Stars "+stars)
        }
      }
    }
}
}
