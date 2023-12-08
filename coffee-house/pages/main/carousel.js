const sliderBtnLeft = document.getElementById('slider__btn-left');
const sliderBtnRight = document.getElementById('slider__btn-right');
const sliderLine = document.getElementById('slider-line');


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
  // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      addTransitionRight();

    } else {
      addTransitionLeft();
    }
  } else { // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
  /* reset values */
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


// sliderLine.addEventListener('transitionend', moveControl(transform));


window.addEventListener('scroll', () => {

  if (window.scrollY >= 300 && window.scrollY <= 1600) {

    moveControl();
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

function moveControl() {
  if (startControl == 0) {
    startControl = 1;
    width = 0;
    id = setInterval(() => frame(selectControl()), 50);

    function frame(transform) {
      if (width >= 100) {
        addTransitionRight();
        clearInterval(id);
        startControl = 0;
        moveControl(selectControl());
      } else {
        width++;
        // console.log(0, 'transform', transform);
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


// sliderLine.addEventListener('animationend', removeAnimationLeft);
// sliderLine.addEventListener('animationend', removeAnimationRight);
// function addAnimationLeft() {
//   sliderLine.classList.add('transform-left')
// }

// function addAnimationRight() {
//   sliderLine.classList.add('transform-right')
// }

// function removeAnimationLeft() {
//   sliderLine.classList.remove('transform-left')
// }

// function removeAnimationRight() {
//   sliderLine.classList.remove('transform-right')
// }