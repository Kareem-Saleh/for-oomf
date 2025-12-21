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

// function typeWriter(text, element, speed) {
//   for (let i = 0; i < text.length; i++) {
//     setTimeout(() => {
//       element.innerHTML += text[i];
//     }, i * speed);
//   }
// }

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

async function typeSequentially(typewriterConfigs) {
  for (const config of typewriterConfigs) {
    let promise = typeWriter(config.text, config.element, config.speed);
    
    if (config.pauseAfter) {
      await new Promise(resolve => setTimeout(resolve, config.pauseAfter));
    }
  }
}

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

function revealPaper() {
  paper.classList.remove("hidden");
  paper.classList.add("paper-little-rised");
  letterFrontOpened.classList.remove("hidden");

  setTimeout(() => {
    typeWriter("To Elouise,", address, 150);
  }, 1500);

  setTimeout(() => {
    letterFront.classList.add("hidden");
    letterFrontOpened.classList.add("hidden");
    paper.classList.add("paper-fully-rised");
  }, 4000);

  setTimeout(() => {
    typeWriter(
      "I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long and I do want you to read something heartfelt with my thoughts. Thats why I decided to make this little web-letter thing so you could read my letter even though you're on the other side of the globe because I love my baby no matter where she is and I hope it reaches you 届けええええ #ok. #warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning.",
      p1,
      15
    );
  }, 5500);

  setTimeout(() => {
    typeWriter(
      "I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long and I do want you to read something heartfelt with my thoughts. Thats why I decided to make this little web-letter thing so you could read my letter even though you're on the other side of the globe because I love my baby no matter where she is and I hope it reaches you 届けええええ #ok. #warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning.",
      p2,
      15
    );
  }, 6500);

  // Initial animations
  // letterFront.classList.add("hidden");
  // letterFrontOpened.classList.add("hidden");
  // paper.classList.add("paper-fully-rised");
  // setTimeout(() => {
  //   typeWriter("To Elouise,", address, 150).then(() => {
  //     setTimeout(() => {
  //       // After animations, start sequential typing
  //       typeSequentially([
  //         {
  //           text: "I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long and I do want you to read something heartfelt with my thoughts. Thats why I decided to make this little web-letter thing so you could read my letter even though you're on the other side of the globe because I love my baby no matter where she is and I hope it reaches you 届けええええ #ok. #warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning.",
  //           element: p1,
  //           speed: 15,
  //           pauseAfter: 500 // Optional pause after this paragraph
  //         },
  //         {
  //           text: "Your second paragraph text here...",
  //           element: p2,
  //           speed: 15,
  //           pauseAfter: 500
  //         },
  //         {
  //           text: "Third paragraph text here...",
  //           element: p3,
  //           speed: 15
  //         }
  //       ]);
  //     }, 2500); // Wait 2.5 seconds after address typing
  //   });
  // }, 1500);

  setTimeout(() => {
    paperButtonContainer.classList.remove("hidden");
  }, 10000);
}

function removeFlap() {
  flap.classList.add("flap-removed");
  revealPaper();
  setTimeout(() => {
    flap.classList.add("hidden");
  }, 200);
}

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
