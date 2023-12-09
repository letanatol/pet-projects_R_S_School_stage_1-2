const sliderBtnLeft = document.getElementById('slider__btn-left');
const sliderBtnRight = document.getElementById('slider__btn-right');
const sliderLine = document.getElementById('slider-line');
const sliderWrapper = document.getElementById('slider-wrapper');


// ! ручное переключение карусели
sliderBtnLeft.addEventListener('click', addTransitionLeft);
sliderBtnRight.addEventListener('click', addTransitionRight);

let offset = 0;

function addTransitionLeft() {
  width = 0;
  offset += 33.3;

  if (offset > 0) {
    offset = -66.6;
  }

  sliderLine.style.transform = "translateX(" + offset + "%)";
}

function addTransitionRight() {
  width = 0;
  offset += -33.3;

  if (offset < -66.6) {
    offset = 0;
  }

  sliderLine.style.transform = "translateX(" + offset + "%)";
}


// !свайп

sliderLine.addEventListener('touchstart', handleTouchStart, false);
sliderLine.addEventListener('touchend', handleTouchEnd, false);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
  // console.log(event.touches[0]);
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
};

function handleTouchEnd(event) {
  clearInterval(id);
  startControl = 0;
  moveControl();

  if (!xDown || !yDown) {
    return;
  }
  // console.log(event.changedTouches[0].clientX);
  let xUp = event.changedTouches[0].clientX;
  let yUp = event.changedTouches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;
  
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      addTransitionRight();

    } else {
      addTransitionLeft();
    }
  } 

  xDown = null;
  yDown = null;
};



//! индикатор

const control01 = document.getElementById('control-01');
const control02 = document.getElementById('control-02');
const control03 = document.getElementById('control-03');

let id;
let startControl = 0;
let transform = selectControl();
let point = 0;

window.addEventListener('scroll', () => {

  if (window.scrollY >= 300 && window.scrollY <= 1600) {
    point = 0;
    moveControl(point);
  } else {
    clearInterval(id);
    startControl = 0;
  }
})

function selectControl() {

  const transformStyle = document.getElementById('slider-line').style.transform;
  const translateX = transformStyle.replace(/[^\d.]/g, '');
  const translateX_Val = +translateX;

  return translateX_Val;
}

let width;

function moveControl(point) {
  if (startControl == 0) {
    startControl = 1;
    width = point;
    id = setInterval(() => frame(selectControl()), 50);

    function frame(transform) {
      if (width >= 100) {
        addTransitionRight();
        clearInterval(id);
        startControl = 0;
        moveControl(0);
      } else {
        width++;
        if (transform < 33.3) {

          control01.style.width = width + "%";
          control02.style.width = 0 + "%";
          control03.style.width = 0 + "%";
        } else if (transform < 66.6) {

          control02.style.width = width + "%";
          control01.style.width = 0 + "%";
          control03.style.width = 0 + "%";
        } else if (transform >= 66.6) {

          control03.style.width = width + "%";
          control01.style.width = 0 + "%";
          control02.style.width = 0 + "%";
        }
      }
    }
  }
}

sliderWrapper.addEventListener('mouseover', stopMoveControl);
sliderWrapper.addEventListener('mouseout', continueMoveControl);


sliderWrapper.addEventListener('touchstart', stopMoveControl);
sliderWrapper.addEventListener('touchend', continueMoveControl);


function stopMoveControl() {

  point = width;
  clearInterval(id);
  startControl = 0;
  console.log(point);
}

function continueMoveControl() {
  moveControl(point);
  console.log(point);
}