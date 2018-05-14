/*

By Emmett Na 2017/05/10

*/

var life = 5;
var bunnyImg = new Image();
var bunnyObj;
var level = 1;
var stars = 40 * level;
var gravity = 200;

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
  $('#squareBlock').css('position','absolute').css('top',canvasSize.height - bunnySize.height * 2 + 20)
  .css('left',canvasSize.width/2).css('height',100).css('width',60)
  .css('border','3px solid red');
}

function setMousePosition(event){
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;

  if ( 130 < mousePosition.x && mousePosition.x < canvasSize.width+2){
    $('#bunny').css('left',event.clientX-60);
    bunnyBlock.q = event.clientX - 30;
    bunnyBlock.w = event.clientX + 30;
    $('#squareBlock').css('left', mousePosition.x-60);
    llog(bunnyBlock.q)
    llog("mouse position"+mousePosition.x)
  }
}

function setCanvas(){
  $('#bg').css('position', 'absolute').css('left', initPosition.left)
  .css('top',initPosition.top).css('height',canvasSize.height)
  .css('width',canvasSize.width).css('borderStyle','solid');
}

function setSideBar(){
  $('#sideBar').css('position','absolute').css('width',canvasSize.width / 9)
  .css('height', canvasSize.height).css('backgroundColor','coral');

  // Add child nodes
  setLife();
  setStars();
  setLevel();
}

function setLife(){

  $('#lifeLeft').css('position','absolute').css('top',5)
  .css('height',20).css('width',$('#sideBar').css('width'))
  .text($('#lifeLeft').text()+" "+life)
}

function setStars(){
  $('#Stars').css('position','absolute').css('top',65)
  .css('width',$('#sideBar').css('width')).css('height',20)
  .text('Stars '+stars);
}

function setLevel(){
  $('#Level').css('position','absolute').css('top',125)
  .css('width',$('#sideBar').css('width')).css('height',20)
  .text('Level '+level);
}

function starFalling(){
  var interval = setInterval(shootEm, gravity);
  function shootEm(){
    if (stars == 0){
      level ++;
      $('#Level').text('Level '+level);
      stars = 40 * (level * 1.1);
      $('#Stars').text('Stars '+stars);
      gravity -= 20;
      clearInterval(interval);
    }else{
      starFall();
      stars --;
      setStars();
    }
  }
}

function starFall(){
  var rand = Math.floor((Math.random() * (500)) + 0);
  var img = $('<img>').css('position','absolute').css('left',rand+80)
  .attr('id','star').addClass('stars').attr('src','star.png')
  .css('width',10).css('height',10).appendTo($('#bg'));
  var i = initPosition.top;
  var interval = setInterval(move,5);
  function move(){
    if(i==400){
      img.remove();
      clearInterval(interval);
    }else{
      img.css('top',i + 1);
      i ++;
      didItHit(img)
    }
  }
  function didItHit(img){
      let left = parseInt(img.css('left'));
      if ((parseInt(img.css('top')) >= 300) &&
      (left >= bunnyBlock.q) &&
      (left + 30 <= bunnyBlock.w)){
        llog('it hit');
        $('.stars').remove();
        stars = level * 40;
        for (var ii = 0 ; ii < 220; ii++){

  	       clearInterval(ii);}
      }
    }
}
