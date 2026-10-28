const counter = document.getElementById("counter");
const messageElement = document.getElementById("message");
const loadingbar = document.getElementById("loading-bar");

let startTime = null;
const loading_duration_ms = 5000;
const messages = [
  "Preparing your space",
  "Bringing everything together",
  "Adding the finishing touches",
  "All set. Welcome in!",
];
const process = (percentage) => {
  const roundedPercentage = Math.floor(percentage);
  const firstMessage =
    roundedPercentage >= 100
      ? 3
      : roundedPercentage >= 70
        ? 2
        : roundedPercentage >= 35
          ? 1
          : 0;

  counter.textContent = roundedPercentage;
  loadingbar.style.width = `${roundedPercentage}%`;
  messageElement.textContent = messages[firstMessage];
};
const nextProcess = (timestamp) => {
  startTime ??= timestamp;
  const percentage = Math.min(
    ((timestamp - startTime) / loading_duration_ms) * 100,
    100,
  );
  process(percentage);
  percentage < 100 && requestAnimationFrame(nextProcess)
};
requestAnimationFrame(nextProcess);
