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
let crackImg = document.createElement('img')
let numCracks;


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
  let randomX = Math.random() * 500;
  let randomY = Math.random() * 500;
  let $crack = $('<img src="assets/images/crack.png" class="generatedCrack">')

  //Old code generating cracks
  //crackImg.src = 'assets/images/crack.png';
  //crackImg.style = 'top: 200px; left: 300px; position: absolute; z-index: 8; display: none';
  //document.getElementsByTagName('body')[0].appendChild(crackImg);

  //Set random crack location
$crack.offset({
  top: randomY,
  left: randomX,
});

// creates the crack within the body
$('body').append($crack);
  //Changed cracks from appearing after a certain amount of time
  //To appearing with the water level
  if (frameNumber >= 13){

  }
}
// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/cup-${i}.png');"></div>`);
  }

});

// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
  crack();
});
