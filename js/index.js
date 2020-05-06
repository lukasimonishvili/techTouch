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
  },
};

if (speakers.slides.length) {
  speakers.slides[0].classList.add("active");
}

// agenda scripts

let agenda = {
  allowSlide: true,
  counter: 0,
  sliderWrapper: document.getElementsByClassName("agenda__slider")[0],
  slides: document.getElementById("29").getElementsByClassName("agenda__item"),
  nextButton: document.getElementById("agendaNext"),
  prevButton: document.getElementById("agendaPrev"),
  lastAction: "",
  elementToPrev: null,
  isVisible: (element) => {
    let rect = element.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    return elemTop >= 0 && elemBottom <= window.innerHeight;
  },
  getTistanceToTop: (element) => {
    var yPosition = 0;

    while (element) {
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return yPosition;
  },
  next: () => {
    if (agenda.allowSlide) {
      agenda.allowSlide = false;
      let lastResult;
      let elementToActivate;

      for (let i = 0; i < agenda.slides.length; i++) {
        let element = agenda.slides[i];
        let isVisible = agenda.isVisible(element);

        if (lastResult && !isVisible) {
          elementToActivate = agenda.slides[i - 1];
          agenda.elementToPrev = agenda.slides[i - 2];
          break;
        } else {
          lastResult = isVisible;
        }
      }

      let distance =
        agenda.getTistanceToTop(agenda.sliderWrapper) -
        agenda.getTistanceToTop(elementToActivate);
      agenda.counter = distance;

      agenda.sliderWrapper.style.transform = `translateY(${distance}px)`;

      agenda.prevButton.style.opacity = "1";
      agenda.prevButton.style.pointerEvents = "auto";
      agenda.lastAction = "next";
    }
  },
  prev: () => {
    if (agenda.allowSlide) {
      agenda.allowSlide = false;
      let elementToActivate = agenda.elementToPrev.getBoundingClientRect();
      let count = elementToActivate.bottom + elementToActivate.y;
      let distance =
        agenda.counter + count >= -agenda.sliderWrapper.children[0].offsetHeight
          ? 0
          : agenda.counter + count;

      agenda.sliderWrapper.style.transform = `translateY(${distance}px) `;

      agenda.nextButton.style.opacity = "1";
      agenda.nextButton.style.pointerEvents = "auto";
      agenda.lastAction = "prev";
    }
  },
  handleTransitionEnd: () => {
    agenda.allowSlide = true;
    let i = agenda.lastAction === "next" ? agenda.slides.length - 1 : 0;
    let element = agenda.slides[i];

    if (agenda.isVisible(element)) {
      let elementToHide = i === 0 ? agenda.prevButton : agenda.nextButton;
      elementToHide.style.opacity = "0";
      elementToHide.style.pointerEvents = "none";
    }
  },
  changeDay: (id) => {
    let element = document.getElementById(id);
    agenda.sliderWrapper.style.transform = "translateY(0) scale(0)";
    agenda.sliderWrapper.classList.remove("active");
    agenda.elementToPrev = null;
    agenda.sliderWrapper = element;
    agenda.sliderWrapper.style.transform = "translateY(0) scale(1)";
    agenda.sliderWrapper.classList.add("active");
    agenda.slides = element.children;
    agenda.prevButton.style.opacity = "0";
    agenda.prevButton.style.pointerEvents = "none";
    agenda.nextButton.style.opacity = "1";
    agenda.nextButton.style.pointerEvents = "auto";
    document.getElementById("day").innerHTML = id;
  },
};

let slides = document.getElementsByClassName("agenda__slider");
for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener("transitionend", agenda.handleTransitionEnd);
}

//guide scripts

let guide = {
  mouseDonw: false,
  dragWrapper: document.getElementById("guideDrag"),
  dragableElement: null,
  dataToactivate: 2,
  zIndex: 4,
  data: [
    {
      title: "How to participate",
      description:
        "For the online conference, we will use the web application, where the attendees will be able to access the talks live stream, live chat with speakers, the opportunity to publish their attendee profiles for others to see and hire or partner, arranging 1-1 calls with other attendees, take part in activations by Touch partners.",
    },
    {
      title: "Access",
      description:
        "To get access to the event application, you will need to buy the ticket, fill in the profile to complete registration (via email), and later on, you will get the invitation to edit and use your profile in the event application.",
    },
    {
      title: "guide 3",
      description:
        "hello fashion tv, my name is zauri i love xmauri and aurzauri",
    },
    {
      title: "guide 4",
      description: "kai bichiba tu torti? mandarini brat!",
    },
  ],
  getDragableElement: (e) => {
    return e.classList[0] == "close" || e.classList[0] == "dragable"
      ? e
      : e.parentNode.classList[0] == "dragable"
      ? e.parentNode
      : e.parentNode.parentNode;
  },
  handleMouseDown: (e) => {
    let element = guide.getDragableElement(e.target);

    if (element.classList[0] === "close") {
      guide.close(element);
      return;
    }
    element.style.transform = "translate(0)";
    guide.dragWrapper.style.cursor = "pointer";
    guide.zIndex++;
    element.style.zIndex = guide.zIndex;
    element.children[0].style.zIndex = guide.zIndex * 2;

    for (let i = 0; i < guide.dragWrapper.children.length; i++) {
      guide.dragWrapper.children[i].style.pointerEvents = "none";
      guide.dragWrapper.children[i].style.userSelect = "none";
    }

    guide.mouseDonw = true;
    guide.dragableElement = element;
  },
  handleMouseMove: (e) => {
    if (guide.mouseDonw) {
      let x =
        e.layerX -
        +getComputedStyle(guide.dragableElement).width.split("px")[0] / 2;
      let y = e.layerY - 10;
      console.log("x", x);
      console.log("y", y);
      guide.dragableElement.style.left = x + "px";
      guide.dragableElement.style.top = y + "px";
    }
  },
  handleMouseUp: () => {
    guide.mouseDonw = false;
    for (let i = 0; i < guide.dragWrapper.children.length; i++) {
      guide.dragWrapper.children[i].style.pointerEvents = "auto";
      guide.dragWrapper.children[i].style.userSelect = "auto";
      guide.dragWrapper.style.cursor = "auto";
    }
  },
  close: (e) => {
    if (e.nextElementSibling) {
      return;
    } else {
      let index =
        guide.dataToactivate >= guide.data.length ? 0 : guide.dataToactivate;
      let parent = e.parentNode.parentNode;
      parent.style.transition = ".4s";
      parent.style.transform = "scale(0)";
      e.previousElementSibling.innerHTML = guide.data[index].title;
      e.parentNode.nextElementSibling.innerHTML = guide.data[index].description;

      setTimeout(() => {
        parent.style.transform = "scale(1)";
      }, 500);

      setTimeout(() => {
        parent.style.transition = "0s";
      }, 1000);

      guide.dataToactivate = index + 1;
    }
  },
  handleTouchStart: (e) => {
    let element = guide.getDragableElement(e.target);

    if (element.classList[0] === "close") {
      guide.close(element);
      return;
    }
    element.style.transform = "translate(0)";

    guide.zIndex++;
    element.style.zIndex = guide.zIndex;
    element.children[0].style.zIndex = guide.zIndex * 2;
    guide.dragableElement = element;
  },
  handleTouchMove: (e) => {
    e.preventDefault();
    let canvas = guide.dragWrapper;
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
      +getComputedStyle(guide.dragableElement).width.split("px")[0] / 2;
    let y = e.targetTouches[0].pageY - canvasPosition.y - 10;

    guide.dragableElement.style.left = x + "px";
    guide.dragableElement.style.top = y + "px";
  },
};

guide.dragWrapper.addEventListener("mousemove", guide.handleMouseMove);
guide.dragWrapper.addEventListener("mouseup", guide.handleMouseUp);
for (let i = 0; i < guide.dragWrapper.children.length; i++) {
  let element = guide.dragWrapper.children[i];
  if (element.classList[0] === "dragable") {
    if (i === 0) {
      element.addEventListener("mousedown", guide.handleMouseDown);
      element.addEventListener("touchstart", guide.handleTouchStart);
      element.addEventListener("touchmove", guide.handleTouchMove);
    } else {
      element.children[0].addEventListener("mousedown", guide.handleMouseDown);
      element.children[0].addEventListener(
        "touchstart",
        guide.handleTouchStart
      );
      element.children[0].addEventListener("touchmove", guide.handleTouchMove);
    }
  }
}

//ticket scripts

let tickets = {
  section: document.getElementsByClassName("tickets")[0],
  buttons: document.getElementsByClassName("ticket__button"),
  payment: document.getElementById("payment"),
  closeButton: document.getElementsByClassName("payment__close")[0],
  onTicketClick: (e) => {
    e.target.parentNode.classList.add("open");
    tickets.payment.classList.add("open");
    document.body.style.overflow = "hidden";
  },
  onClose: () => {
    let element = tickets.section.getElementsByClassName("open")[0];
    if (element) {
      element.classList.remove("open");
    }
    tickets.payment.classList.remove("open");
    document.body.style.overflow = "auto";
  },
};

for (let i = 0; i < tickets.buttons.length; i++) {
  tickets.buttons[i].addEventListener("click", tickets.onTicketClick);
}

tickets.closeButton.addEventListener("click", tickets.onClose);

//payment scripts

let payment = {
  forms: document.getElementsByTagName("form"),
  types: document.getElementsByClassName("payment__types")[0],
  promoBox: document.getElementsByClassName("payment__promo")[0],
  activeForm: "",
  changeType: (type) => {
    if (type !== payment.activeForm) {
      for (let i = 0; i < payment.types.children.length; i++) {
        let element = payment.types.children[i];
        let form = payment.forms[i];
        form.classList.toggle("active");
        element.classList.toggle("active");
      }
      payment.promoBox.classList.toggle("dark");
      payment.activeForm = type;
    }
  },
};

// policy scripts

let policy = {
  header: document.getElementsByClassName("policy__header")[0],
  content: null,
  title: document.getElementById("policyTitle"),
  close: () => {
    policy.header.classList.remove("policy__header__visible");
    if (policy.content) {
      policy.content.classList.remove("policy__content__visible");
    }
  },
  open: (e, type) => {
    policy.close();
    policy.content = document.getElementById(type);
    policy.title.innerHTML = e.innerHTML;
    policy.header.classList.add("policy__header__visible");
    policy.content.classList.add("policy__content__visible");
  },
};
