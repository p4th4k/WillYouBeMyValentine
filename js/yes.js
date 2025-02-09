document.addEventListener("click", () => {
  let yesAudio = new Audio("../mp3/bgm.mp3");
  yesAudio.volume = 0.5;
  yesAudio.play();
});

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

// IP

fetch("https://api64.ipify.org?format=json")
.then(response => response.json())
.then(data => document.querySelector(".ip").innerText=data.ip)