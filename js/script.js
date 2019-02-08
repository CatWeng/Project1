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
let numCracks = 0;
let $crack = $('<img src="assets/images/crack.png" class="generatedCrack">')

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
    // Keeps the crack count accurate
    numCracks = numCracks - 1;
}

// creates a loop that checks frames depending on water height
// the more full the cup, the faster cracks are made and the water drops
function setup() {
  let timer = (2000/frameNumber/4)
  setInterval(function() {
    draw();
  }, timer);
}

// Set different things to happen depending on the number of cracks existing
function draw() {

// if there are no cracks and the water is within a certain height, create a crack
 if(numCracks == 0){
   if (frameNumber <= 8 && frameNumber >= 3) {
     //Creates the crack with specified parameters
     crack();
     // Counts how many cracks are currently on the cup
     numCracks = numCracks + 1;
 }
}
 if (numCracks >=1) {
    console.log(numCracks);
   frameNumber = frameNumber -numCracks;
   if (frameNumber <2) {
     frameNumber = 1;
   }
   if (frameNumber <= 16 && frameNumber >= 12) {
     crack();
     numCracks = numCracks + 1;
   }
   if (frameNumber <= 20 && frameNumber >= 16) {
     crack();
     numCracks = numCracks + 1;
   }
   if (frameNumber <= 24 && frameNumber >= 20) {
     crack();
     numCracks = numCracks + 1;
   }
 }
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/cup-${i}.png');"></div>`);
  }

  //calls the setup function with
  setup();
});


// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
});
