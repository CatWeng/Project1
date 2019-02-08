"use strict";

/*****************

Sisyphean Cup
Catherine Weng

The Sisyphean cup: a cup which must be filled before drinking from.
However, as the water level increases, the cup starts leaking.
Sisyphus must stop up the cracks so he can drink from the cup.
BUT- the higher the water level, the faster cracks appear.

******************/

// Code source: https://www.sitepoint.com/frame-by-frame-animation-css-javascript/?fbclid=IwAR2ekL4KXt2PY1E40BxkizZwV-uzOgbGuIk4t5Co4cqk-lvck6Ni9VOQ6lc
// Variables for the animation

const imagePath = 'assets/images';
const totalFrames = 24;
const animationDuration = 4800;
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;
let $cup;
let full = false;
let crackCreated = false;
let numCracks = 0;


//Code source: https://www.sitepoint.com/frame-by-frame-animation-css-javascript/?fbclid=IwAR2ekL4KXt2PY1E40BxkizZwV-uzOgbGuIk4t5Co4cqk-lvck6Ni9VOQ6lc

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function step(startTime) {

 $cup = $('#cup');
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  // then we check if it is time to update the frame
  if (timeFromLastUpdate > timePerFrame) {
    // and update it accordingly
    $cup.attr('src', imagePath + '/cup-' + frameNumber + '.png');
    // reset the last update time
    timeWhenLastUpdate = startTime;

    // then set the frame number to increase or decrease whether the cup is "full" or not
      if (full == false)  {
        frameNumber = frameNumber+1;
        if (frameNumber >= 24)
          full = true;
      }
      else {
        frameNumber = frameNumber-1;
        if (frameNumber <= 1)
          full = false;
      }
}
  requestAnimationFrame(step);
}

function crack(){

  //Creates a new crack at a randomized location within certaion parameters
  let randomX;
  let randomY;
  let $crack = $('<img src="assets/images/crack.png" class="generatedCrack">')
  let created = false;
  //Old code generating cracks
  //crackImg.src = 'assets/images/crack.png';
  //crackImg.style = 'top: 200px; left: 300px; position: absolute; z-index: 8; display: none';
  //document.getElementsByTagName('body')[0].appendChild(crackImg);

  //creates the crack within the body tag
  $('body').append($crack);

  // when clicked, the created crack is 'fixed'
  $crack.on("click", removeCrack);
  //Changed cracks from appearing after a certain amount of time
  //To appearing with the water level in an appriopriate position
    if (created == false){
      if (frameNumber<= 6) {
        randomX = Math.floor(Math.random() * (340)) + 320;
        randomY = Math.floor(Math.random() * (70)) + 530;
      }
    }
    //Set a semi-random crack location
    $crack.offset({
      left: randomX,
      top: randomY,
    });
}

// remove the cracks when the user clicks on them
function removeCrack() {
    $(this).remove();
    //resets numbers of cracks so more cracks can be created
    numCracks = numCracks - 1;
}

// creates a loop that runs at the
function setup() {
  let timer = (2000/frameNumber/4)
  setInterval(function() {
    draw();
  }, timer);
}
function draw() {
 if(numCracks == 0){
   if (frameNumber <= 6 && frameNumber >= 1) {
     //Creates the crack with specified parameters
     crack();
     // Tracks how many cracks are currently on the cup
     numCracks = numCracks + 1;
 }
}
 if (numCracks >=1) {
   console.log(frameNumber);
 }

}
// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/cup-${i}.png');"></div>`);
  }
  setup();
});


// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
});
