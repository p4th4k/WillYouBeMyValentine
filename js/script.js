const prompts = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️",
];

const gifSrc = [
  "./gifs/over-the-moon-moon.gif",
  "./gifs/penguin-running.gif",
  "./gifs/rage-mad.gif",
  "./gifs/still-waiting-late.gif",
  "./gifs/boxing-fight.gif",
  "./gifs/laugh-laughing.gif",
  "./gifs/hmpf-hmph.gif",
  "./gifs/cute-funny.gif",
];

const audioSrc = [
  "./mp3/no.mp3",
  "./mp3/no1.mp3",
  "./mp3/no2.mp3",
  "./mp3/no4.mp3",
  "./mp3/no5.mp3",
];

const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["heart"],
  colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};

const btnNo = document.querySelector(".no-button");
const btnYes = document.querySelector(".yes-button");
const gifImg = document.querySelector(".gif-img");

let promptIndex = 0;
let gifIndex = 1;

let audioIndex = 0;
let currentAudio = null;

const handleNo = () => {
  btnNo.textContent = prompts[promptIndex];
  const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
  btnYes.style.fontSize = `${currentSize * 1.3}px`;
  promptIndex = (promptIndex + 1) % prompts.length;

  gifImg.src = gifSrc[gifIndex];
  gifIndex = (gifIndex + 1) % gifSrc.length;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.time = 0;
  }

  currentAudio = new Audio(audioSrc[audioIndex]);
  audioIndex = (audioIndex + 1) % audioSrc.length;
  currentAudio.volume = 0.2;
  currentAudio.play();

  currentAudio.onended = () => (currentAudio = null);
};

const handleYes = () => {
  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 4,
  });
  setTimeout(() => window.location.href = "./yes_page/yes_page.html", 5000);
};
