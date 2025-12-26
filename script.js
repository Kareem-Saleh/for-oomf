// letter elements
const messages = document.querySelector(".hint");
const letterContainer = document.querySelector(".letter-container");
const seal = document.querySelector(".seal");
const flap = document.querySelector(".flap");
const paper = document.querySelector(".paper");
const letterFront = document.querySelector(".letter-front");
const letterFrontOpened = document.querySelector(".letter-front-opened");
const paperButtonContainer = document.querySelector(".paper-button-container");

// cake elements
const cakeContainer = document.querySelector(".cake-container");
const cake = document.querySelector(".cake");
const oneCandle = document.querySelector(".candle-one");
const eightCandle = document.querySelector(".candle-eight");

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
    text: "HAPPY BIRTHDAY!!!!!!! I was initially just going to send you a letter for you to read when you came back from Japan but I felt that would be too long. I want you to read something heartfelt with my thoughts, especially after receiving your last letter <3333. Thats why I decided to make this web-letter thing so you could read my letter even though you're on the other side of the globe. I love my baby no matter where she is and I hope my feelings reach you 届けええええ #ok.",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "#warning this might be quite long cos unlike paper I don't have a limit on how many words I can fit LOL #warning #sorry.",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "OOMF IS 18 NOW #WOW #WOAH!!!! I hope that today is an incredibly fun and amazing day and that you are blessed with love from all the people you care about!!! I know that in the past you have said that you didn't want to become 18 but I can assure you that life is still young and you will be able to experience so many good things.",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "If you keep your soul and mind youthful and cheery there is nothing to be afraid of <3. May your 18th year on earth be filled with opportunities and excitement!!!! May you grow up healthy and loved and successful on the next part of life!!! Ok... i lowk feel like im giving a prayer BUT BASICALLY I WANT YOU TO FEEL HAPPY AND ENJOY BEING ALIVE FOR ANOTHER YEAR MORE <3333333333!!!!!!!!!1",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "Sighhhh i miss you so much everyday and i love you so much. Even though I'm on the other side of the planet I want to celebrate with you #sighhhhh",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "IF I COULD BE WITH YOU ID BE SHOWERING YOU WITH HUGS AND KISSES AND EVERYTHING SIGHHHHHHHHHHHHH",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "I can't wait for February to come so we can be together again so I can treat you properly and have lots lots #fun.",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "I guess since I have the chance I'll also use this letter to talk about other things too xd. I reallllly wish you had a nice Christmas and that your trip in Japan is super fun. I enjoy it so much when you send me pictures, I feel so included. I'm #remembered <3 <3 <3",
    element: p3,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "When you send me pics of things you know I like I also feel so blessssssed. Like you're so thoughtful and thinking of me always I feel so loveddd I LOVE YOU SO MUCH.",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "Also wishing you and your family an awesome new year!!! Since you're in Japan maybe you will do the shrine visit rituals #thinking #fun!!!",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "I hope this letter made you a little happy and smile (and actually worked pls pls pls i beg). I'm sorry I can't be with you to give you a physical present but I hope the feelings behind them are felt.",
    element: p3,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "WISHING YOU A BEAUTIFUL, MEMORABLE AND AWESOME 18TH BIRTHDAY!!!! AND ALSO THANK YOU FOR MAKING MY ENTIRE YEAR AND MAKING ME HAPPY EVERYDAY. I HOPE 2026 IS A FUN YEAR AND THAT WE CAN BOTH HANG OUT AND BE TOGETHER PLENTYYYY MORE. I LOVE YOU SO MUCH ENJOY UR DAY THANK YOU FOR READING!!!!",
    element: p1,
    speed: 5,
    pauseAfter: 100,
  },
  {
    text: "(in case u dont notice click the cake looking button pls yay :D)",
    element: p2,
    speed: 5,
    pauseAfter: 100,
  },
];

// pages
const page1 = letterMessages.slice(0, 2);
const page2 = letterMessages.slice(2, 4);
const page3 = letterMessages.slice(4, 6);
const page4 = letterMessages.slice(6, 9);
const page5 = letterMessages.slice(9, 12);
const page6 = letterMessages.slice(12, 14);
const pages = [page1, page2, page3, page4, page5, page6];

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

// cake blowing
let cakeLoaded = false;
blowCake.addEventListener("click", () => {
  if (!letterFinished) {
    return;
  }

  console.log("Let's blow the cakeeeeeeee :tongue: :tongue:");
  letterContainer.classList.add("none");
  cakeContainer.classList.remove("hidden");

  setTimeout(() => {
    cakeLoaded = true;
  }, 3000);
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

// mic stuff
function blowOutCandles() {
  console.log("detected blow");
  if (!cakeLoaded) {
    console.log("cant blow yet");

    return;
  }

  const candles = [oneCandle, eightCandle];
  candles.forEach((candle) => {
    const delay = Math.random() * 1000;
    setTimeout(() => {
      candle.classList.add("blown");
      blown = true;
    }, delay);
  });

  setTimeout(() => {
    const subTitle = document.querySelector(".cake-message");
    subTitle.textContent = `Yayy! HAVE A FUN DAY TODAY!!!! I LOVE YOU <333`;
  }, 2000);
}

async function startMicDetection() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    source.connect(analyser);

    return analyser;
  } catch (err) {
    console.error("Mic access error:", err);
  }
}

let analyser;
let dataArray;
let blown = false;
const BLOW_COOLDOWN = 1000;

async function initializeAudio() {
  analyser = await startMicDetection();

  if (!analyser) {
    console.error("Failed to initialize audio analyser");
    return;
  }

  dataArray = new Uint8Array(analyser.frequencyBinCount);
  detectBlow();
}

function detectBlow() {
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  let highFreqSum = 0;
  let lowFreqSum = 0;

  const midpoint = dataArray.length / 2;

  for (let i = 0; i < dataArray.length; i++) {
    if (i < midpoint) {
      lowFreqSum += dataArray[i];
    } else {
      highFreqSum += dataArray[i];
    }
  }

  const highAvg = highFreqSum / (dataArray.length / 2);
  const lowAvg = lowFreqSum / (dataArray.length / 2);

  const ratio = highAvg / (lowAvg + 1);

  const BLOW_RATIO_THRESHOLD = 0.5;

  if (ratio > BLOW_RATIO_THRESHOLD && !blown) {
    blown = true;
    blowOutCandles();

    setTimeout(() => {
      blown = false;
    }, BLOW_COOLDOWN);
  }

  requestAnimationFrame(detectBlow);
}

// Start everything
initializeAudio();
