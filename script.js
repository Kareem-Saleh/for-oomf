// elements
const messages = document.querySelector(".messages");
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

// letter text
const letterMessages = [
  {
    text: "I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long and I do want you to read something heartfelt with my thoughts. Thats why I decided to make this little web-letter thing so you could read my letter even though you're on the other side of the globe because I love my baby no matter where she is and I hope it reaches you 届けええええ #ok. #warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning.",
    element: p1,
    speed: 15,
    pauseAfter: 500,
  },
];

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

let firstPageTurned = false;
let pageLoading = false;
let currentPage = 0;

async function typeSequentially(text) {
  pageLoading = true;

  if (Array.isArray(text)) {
    for (const message in text) {
      await typeWriter(message.text, message.element, message.speed);
      pageLoading = false;

      if (message.pauseAfter) {
        await new Promise((resolve) => setTimeout(resolve, message.pauseAfter));
      }
    }
  } else {
    await typeWriter(text.text, text.element, text.speed);
    pageLoading = false;

    if (text.pauseAfter) {
      await new Promise((resolve) => setTimeout(resolve, text.pauseAfter));
    }
  }

  if (firstPageTurned) {
    return;
  }

  firstPageTurned = true;
  next.classList.remove("hidden");
}

next.addEventListener("click", () => {
  if (pageLoading) {
    return;
  }

  if (currentPage === 0) {
    back.classList.toggle("hidden");
  }

  console.log(`Current page: ${currentPage}`);

  address.innerText = "";
  p1.innerText = "";
  p2.innerText = "";
  p3.innerText = "";

  currentPage += 1;
});

back.addEventListener("click", () => {
  if (pageLoading) {
    return;
  }

  if (currentPage === 0) {
    back.classList.toggle("hidden");
  } else {
    back.classList.remove("hidden");
  }

  console.log(`Current page: ${currentPage}`);

  address.innerText = "";
  p1.innerText = "";
  p2.innerText = "";
  p3.innerText = "";

  if (currentPage === 0) {
    return;
  }

  currentPage -= 1;
});

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
    typeWriter("To Elouise,", address, 150).then(() => {
      setTimeout(() => {
        typeSequentially(letterMessages[0]);
      }, 2500);
    });
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
let letterOpened = false;

letterContainer.addEventListener("click", () => {
  if (letterOpened) {
    return;
  }
  letterOpened = true;
  stopShake();
  setTimeout(removeSeal, 1200);
  setTimeout(removeFlap, 2400);
});
