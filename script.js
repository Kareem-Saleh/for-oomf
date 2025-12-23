// elements
const messages = document.querySelector(".hint");
const letterContainer = document.querySelector(".letter-container");
const seal = document.querySelector(".seal");
const flap = document.querySelector(".flap");
const paper = document.querySelector(".paper");
const letterFront = document.querySelector(".letter-front");
const letterFrontOpened = document.querySelector(".letter-front-opened");
const paperButtonContainer = document.querySelector(".paper-button-container");

// text containers
const address = document.querySelector(".address");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const p3 = document.querySelector(".p3");

// buttons
const back = document.querySelector(".back");
const next = document.querySelector(".next");
const blowCake = document.querySelector(".blow-cake");

// letter text
const letterMessages = [
  {
    text: "To Elouise,",
    element: address,
    speed: 150,
    pauseAfter: 1500,
  },
  {
    text: "I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long and I do want you to read something heartfelt with my thoughts. Thats why I decided to make this little web-letter thing so you could read my letter even though you're on the other side of the globe because I love my baby no matter where she is and I hope it reaches you 届けええええ #ok. #warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning.",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "This is the first paragraph on page 2",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "This is the second paragraph on page 2",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "This is the first paragraph on page 3",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "This is the second paragraph on page 3333333333333333",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
];

// pages
const page1 = letterMessages.slice(0, 2);
const page2 = letterMessages.slice(2, 4);
const page3 = letterMessages.slice(4, 6);
const pages = [page1, page2, page3];

// states
let letterOpened = false;
let firstPageTurned = false;
let pageLoading = false;
let currentPage = 0;
let letterFinished = false;

// typing functions
function typeWriter(text, element, speed) {
  return new Promise((resolve) => {
    let i = 0;

    function type() {
      if (i < text.length) {
        element.innerHTML += text[i];
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}

async function typeSequentially(text) {
  pageLoading = true;
  back.classList.add("disabled");
  next.classList.add("disabled");

  if (Array.isArray(text)) {
    for (const message of text) {
      await typeWriter(message.text, message.element, message.speed);

      if (message.pauseAfter) {
        await new Promise((resolve) => setTimeout(resolve, message.pauseAfter));
      }
    }

    pageLoading = false;
    back.classList.remove("disabled");
    next.classList.remove("disabled");

    if (currentPage === pages.length - 1) {
      blowCake.classList.remove("hidden");
      letterFinished = true;
    }
  }

  if (firstPageTurned) {
    return;
  }

  firstPageTurned = true;
  next.classList.remove("hidden");
}

// button event listeners
next.addEventListener("click", () => {
  if (pageLoading) {
    return;
  }

  if (currentPage + 1 === pages.length) {
    return;
  }

  address.innerText = "";
  p1.innerText = "";
  p2.innerText = "";
  p3.innerText = "";

  if (currentPage + 1 === pages.length - 1) {
    next.classList.add("hidden");
    // blowCake.classList.remove("hidden");
    // letterFinished = true;
  }

  if (currentPage + 1 !== 0) {
    back.classList.remove("hidden");
  }

  currentPage += 1;
  typeSequentially(pages[currentPage]);
  console.log(`Current page: ${currentPage}`);
});

back.addEventListener("click", () => {
  if (pageLoading) {
    return;
  }

  if (currentPage === 0) {
    return;
  }

  address.innerText = "";
  p1.innerText = "";
  p2.innerText = "";
  p3.innerText = "";

  if (currentPage - 1 === 0) {
    back.classList.add("hidden");
  }

  if (currentPage === pages.length - 1) {
    next.classList.remove("hidden");
  }

  currentPage -= 1;
  typeSequentially(pages[currentPage]);
  console.log(`Current page: ${currentPage}`);
});

blowCake.addEventListener("click", () => {
  if (!letterFinished) {
    return;
  }

  console.log("Let's blow the cakeeeeeeee :tongue: :tongue:");
  letterContainer.classList.add("none");
});
// letter animations
function stopShake() {
  const computedStyle = window.getComputedStyle(letterContainer);
  const matrix = new DOMMatrixReadOnly(computedStyle.transform);

  const currentRotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

  letterContainer.style.setProperty(
    "--current-rotation",
    `${currentRotation}deg`
  );

  letterContainer.classList.remove("shake");
  letterContainer.classList.add("shake-end");
  messages.classList.add("hidden");
}

function removeSeal() {
  seal.classList.add("hidden");
  seal.classList.add("seal-removed");
}

async function revealPaper() {
  paper.classList.remove("hidden");
  paper.classList.add("paper-little-rised");
  letterFrontOpened.classList.remove("hidden");

  setTimeout(() => {
    letterFront.classList.add("hidden");
    letterFrontOpened.classList.add("hidden");
    paper.classList.add("paper-fully-rised");
  }, 4000);

  setTimeout(() => {
    typeSequentially(pages[0]);
  }, 1500);
}

function removeFlap() {
  flap.classList.add("flap-removed");
  revealPaper();
  setTimeout(() => {
    flap.classList.add("hidden");
  }, 200);
}

// beginning flow
const hint = setTimeout(() => {
  messages.classList.remove("hidden");
  messages.classList.add("flash");
}, 2000);

letterContainer.addEventListener("click", () => {
  if (letterOpened) {
    return;
  }

  letterOpened = true;
  clearTimeout(hint);
  messages.classList.remove("flash");
  stopShake();
  setTimeout(removeSeal, 1200);
  setTimeout(removeFlap, 2400);
});
