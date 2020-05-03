// home section scripts

let home = {
  mouseDonw: false,
  dragWrapper: document.getElementById("home"),
  dragableElement: null,
  zIndex: 2,
  handleMouseDown: (e) => {
    let element = e.target;
    if (element.classList[0] === "close") {
      home.close(element);
      return;
    } else {
      element = element.parentNode;
    }
    home.dragWrapper.style.cursor = "pointer";
    home.zIndex++;
    element.style.zIndex = home.zIndex;
    element.children[0].style.zIndex = home.zIndex * 2;

    for (let i = 0; i < home.dragWrapper.children.length; i++) {
      home.dragWrapper.children[i].style.pointerEvents = "none";
      home.dragWrapper.children[i].style.userSelect = "none";
    }

    home.mouseDonw = true;
    home.dragableElement = element;
  },
  handleMouseMove: (e) => {
    if (home.mouseDonw) {
      let x =
        e.layerX -
        +getComputedStyle(home.dragableElement).width.split("px")[0] / 2;
      let y = e.layerY - 10;
      home.dragableElement.style.left = x + "px";
      home.dragableElement.style.top = y + "px";
    }
  },
  handleMouseUp: () => {
    home.mouseDonw = false;
    for (let i = 0; i < home.dragWrapper.children.length; i++) {
      home.dragWrapper.children[i].style.pointerEvents = "auto";
      home.dragWrapper.children[i].style.userSelect = "auto";
      home.dragWrapper.style.cursor = "auto";
    }
  },
  close: (e) => {
    e.parentNode.style.transition = ".3s";
    e.parentNode.style.transform = "scale(0)";
    home.dragWrapper.style.cursor = "auto";
  },
  handleTouchStart: (e) => {
    let element = e.target;
    if (element.classList[0] === "close") {
      home.close(element);
      return;
    } else {
      element = element.parentNode;
    }
    home.zIndex++;
    element.style.zIndex = home.zIndex;
    element.children[0].style.zIndex = home.zIndex * 2;
    home.dragableElement = element;
  },
  handleTouchMove: (e) => {
    e.preventDefault();
    let canvas = home.dragWrapper;
    function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;

      while (element) {
        xPosition +=
          element.offsetLeft - element.scrollLeft + element.clientLeft;
        yPosition += element.offsetTop - element.scrollTop + element.clientTop;
        element = element.offsetParent;
      }

      return { x: xPosition, y: yPosition };
    }

    let canvasPosition = getPosition(canvas);

    let x =
      e.targetTouches[0].pageX -
      canvasPosition.x -
      +getComputedStyle(home.dragableElement).width.split("px")[0] / 2;
    let y = e.targetTouches[0].pageY - canvasPosition.y - 10;

    home.dragableElement.style.left = x + "px";
    home.dragableElement.style.top = y + "px";
  },
};

home.dragWrapper.addEventListener("mousemove", home.handleMouseMove);
home.dragWrapper.addEventListener("mouseup", home.handleMouseUp);
for (let i = 0; i < home.dragWrapper.children.length; i++) {
  let element = home.dragWrapper.children[i];
  if (element.classList[0] === "dragable") {
    element.addEventListener("mousedown", home.handleMouseDown);
    element.addEventListener("touchstart", home.handleTouchStart);
    element.addEventListener("touchmove", home.handleTouchMove);
  }
}

// speakers scripts

let speakers = {
  sliderWrapper: document.getElementsByClassName("speakers__slider")[0],
  counter: 0,
  slides: document.getElementsByClassName("speakers__group"),
  nextButton: document.getElementById("speakerNext"),
  prevButton: document.getElementById("speakerPrev"),
  speakerStar: document.getElementById("speakerStar"),
  allowSlide: true,
  next: () => {
    if (speakers.allowSlide) {
      speakers.allowSlide = false;
      speakers.counter++;
      if (speakers.counter < speakers.slides.length) {
        if (speakers.counter - 1 >= -1) {
          speakers.slides[speakers.counter - 1].classList.remove("active");
        }
        speakers.slides[speakers.counter].classList.add("active");
        speakers.sliderWrapper.style.transform = `translateX(-${
          speakers.counter * 100
        }%)`;

        speakers.prevButton.classList.remove("hidden");
        speakers.prevButton.classList.add("visible");
        speakers.speakerStar.classList.add("hidden");
        speakers.speakerStar.classList.remove("visible");
      }
      if (speakers.counter === speakers.slides.length - 1) {
        speakers.nextButton.classList.add("hidden");
        speakers.nextButton.classList.remove("visible");
      }
      speakers.allowSlide = true;
    }
  },
  prev: () => {
    if (speakers.allowSlide) {
      speakers.allowSlide = false;
      speakers.counter--;

      if (speakers.counter > -1) {
        if (speakers.counter + 1 < speakers.slides.length) {
          speakers.slides[speakers.counter + 1].classList.remove("active");
        }
        speakers.slides[speakers.counter].classList.add("active");
      }
      speakers.sliderWrapper.style.transform = `translateX(-${
        speakers.counter * 100
      }%)`;

      speakers.nextButton.classList.remove("hidden");
      speakers.nextButton.classList.add("visible");

      if (speakers.counter === 0) {
        speakers.speakerStar.classList.remove("hidden");
        speakers.speakerStar.classList.add("visible");
        speakers.prevButton.classList.add("hidden");
        speakers.prevButton.classList.remove("visible");
      }
      speakers.allowSlide = true;
    }
  },
  toggleInfo: (e) => {
    let element = e.parentNode.parentNode;
    let images = document.getElementsByClassName("speakers__back")[0].children;
    if (!element.classList.contains("active")) {
      let oldElement = document.getElementsByClassName("speaker active")[0];
      if (oldElement) {
        oldElement.classList.remove("active");
      }
      element.classList.remove("small");
      element.classList.add("active");
      //hideing vackground images

      for (let i = 0; i < images.length; i++) {
        if (i === 4) {
          images[i].classList.add("visible");
          images[i].classList.remove("hidden");
        } else {
          images[i].classList.remove("visible");
          images[i].classList.add("hidden");
        }
      }

      let collection = element.parentNode.querySelectorAll(
        ".speaker:not(.active)"
      );
      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.add("small");
      }
    } else {
      for (let i = 0; i < images.length - 3; i++) {
        if (i === 4) {
          images[i].classList.remove("visible");
          images[i].classList.add("hidden");
        } else {
          images[i].classList.add("visible");
          images[i].classList.remove("hidden");
        }
      }

      let collection = element.parentNode.querySelectorAll(".speaker");
      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove("active");
        collection[i].classList.remove("small");
      }

      if (speakers.counter === 0) {
        images[images.length - 3].classList.add("visible");
        images[images.length - 3].classList.remove("hidden");
      }

      if (speakers.counter > 0) {
        speakers.prevButton.classList.remove("hidden");
        speakers.prevButton.classList.add("visible");
      }

      if (speakers.counter < speakers.slides.length - 1) {
        speakers.nextButton.classList.add("visible");
        speakers.nextButton.classList.remove("hidden");
      }
    }

    // element.classList.toggle("active");
  },
};

if (speakers.slides.length) {
  speakers.slides[0].classList.add("active");
}
