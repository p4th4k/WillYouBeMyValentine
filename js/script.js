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
  "./mp3/no2.mp3",
  "./mp3/no4.mp3",
  "./mp3/no5.mp3",
];

const btnNo = document.querySelector(".no-button");
const btnYes = document.querySelector(".yes-button");
const gifImg = document.querySelector(".gif-img");

let promptIndex = 0;
let gifIndex = 1;

let audioIndex = 0;
let currentAudio = null;

let durationPB = 26000;

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

const progressBar = () => {
  let elem = document.querySelector(".progress_bar");
  elem.classList.remove("hide")
  let startTime = performance.now();
  let endTime = startTime + durationPB;

  function updateProgress() {
    let currentTime = performance.now();
    let elapsed = currentTime - startTime;
    let progress = (elapsed / durationPB) * 100; // Calculate progress

    if (progress >= 100) {
      progress = 100; // Ensure it does not exceed 100%
    } else {
      requestAnimationFrame(updateProgress); // Keep updating smoothly
    }

    elem.style.width = progress + "%";
    elem.innerHTML = Math.round(progress) + "%";
  }

  requestAnimationFrame(updateProgress); // Start the animation
};

const handleYes = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.time = 0;
  }

  let bgm = new Audio("/mp3/bgm.mp3");
  bgm.volume = 0.5;
  bgm.play();
  
  progressBar();

  const duration = 3600 * 1000,
    animationEnd = Date.now() + duration;

  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now(),
      ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      shapes: ["heart"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(1, 5),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();

  setTimeout(() => (window.location.href = "./yes_page/yes_page.html"), durationPB);
};
