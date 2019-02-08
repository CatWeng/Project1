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

// Variables for the crack and cup mechanics
let full = false;
let numCracks = 0;
let $crack = $('<img src="assets/images/crack.png" class="generatedCrack">')

// add sound files
const broken = new Audio("assets/sounds/Break.mp3");
const fix = new Audio("assets/sounds/Fix.mp3");

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
        if (numCracks<=1){
          frameNumber = frameNumber+1;}
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

  //Creates a new crack at a randomized location within certain parameters
  let randomX;
  let randomY;
  let created = false;

  //creates the crack within the body tag
  $('body').append($crack);

  // when clicked, the created crack is 'fixed'
  $crack.on("click", removeCrack);

  //Changed cracks from appearing after a certain amount of time
  //To appearing with the water level in an appriopriate position
      if (frameNumber <= 6) {
        randomX = Math.floor(Math.random() * (340)) + 320;
        randomY = Math.floor(Math.random() * (50)) + 550;
      }
      else if (frameNumber <= 12) {
        randomY = Math.floor(Math.random() * (240)) + 360;
      }

      else if (frameNumber <= 18) {
        randomY = Math.floor(Math.random() * (400)) + 200;
      }

      else if (frameNumber <= 24) {
        randomY = Math.floor(Math.random() * (70)) + 530;
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
    // Subtracts one so number of cracks is accurately counted
    numCracks = numCracks - 1;
    // plays a sound aas the crack is 'fixed' or removed
    fix.play();
}

// creates a loop that runs the draw function
// every .5 seconds checks for frame number to draw a crack somewhere
function setup() {
  setInterval(function() {
    draw();
  }, 500);
}

// Set different things to happen depending on the number of cracks existing
function draw() {

  // console.log(frameNumber);
  // console.log(numCracks);
  // if no cracks exist, draw a crack with specified parameters
 if(numCracks == 0){
   if (frameNumber <= 8 && frameNumber >= 3) {
     crack();
     broken.play();
     // Counts how many cracks are currently on the cup
     numCracks = numCracks + 1;
 }
}
 if (numCracks >=1) {
  //console.log(numCracks);
  // Causes the cup to lose water based on how many cracks exist
   frameNumber = frameNumber-numCracks;
   // Stops frame number from going lower than lowest available frame
   if (frameNumber <2) {
     frameNumber = 1;
   }
   }
     // draws cracks in appropriate places at different water heights
   if (frameNumber <= 16 && frameNumber >= 12 && numCracks == 1) {
     crack();
     // on crack appearing, play a breaking sound
     broken.play();
     numCracks = numCracks + 1;
   }
   if (frameNumber <= 20 && frameNumber >= 16 && numCracks <= 2) {
     crack();
     broken.play();
     numCracks = numCracks + 1;
   }

   if (frameNumber <= 24 && frameNumber >= 20 && numCracks <= 3) {
     crack();
     broken.play();
     numCracks = numCracks + 1;
 }
 // runs the crack function again to draw another crack when water gets high enough
 // not quite working as intended
 // redraws first crack somewhere else instead of drawing a new crack
 // at least the counter works

}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/cup-${i}.png');"></div>`);
  }

// runs everything crack-related
  setup();
});


// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
});
