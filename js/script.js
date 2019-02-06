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

const $cup = $('#cup');
const imagePath = 'Project1/assets/images';
const totalFrames = 23;
const animationDuration = 4800;
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {


}

// draw()
//
// Description of draw()

function draw() {
}

//Code source: https://www.sitepoint.com/frame-by-frame-animation-css-javascript/?fbclid=IwAR2ekL4KXt2PY1E40BxkizZwV-uzOgbGuIk4t5Co4cqk-lvck6Ni9VOQ6lc

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function step(startTime) {

//  console.log("working");
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  // then we check if it is time to update the frame
  if (timeFromLastUpdate > timePerFrame) {
    // and update it accordingly
    $cup.attr('src', imagePath + '/cup-' + frameNumber + '.png');
      //  $element.attr('src', imagePath + `/cup-${frameNumber}.png`);
    // reset the last update time
    timeWhenLastUpdate = startTime;

    // then increase the frame number or reset it if it is the last frame
    if (frameNumber >= totalFrames) {
      frameNumber = 1;
    } else {
      frameNumber = frameNumber + 1;
    }
  }

  requestAnimationFrame(step);
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
});
// ---------------------------------------
