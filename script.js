const texts = ["Computer Engineer", "Programmer", "Developer"];
let currentIndex = 0;
let currentCharIndex = 0;
let typingSpeed = 100; // Speed of typing
let erasingSpeed = 50; // Speed of erasing
let delayBetweenTexts = 2000; // Delay between texts

const typedTextElement = document.getElementById("typed-text");

function typeText() {
    if (currentCharIndex < texts[currentIndex].length) {
        typedTextElement.textContent += texts[currentIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(eraseText, delayBetweenTexts);
    }
}

function eraseText() {
    if (currentCharIndex > 0) {
        typedTextElement.textContent = texts[currentIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(eraseText, erasingSpeed);
    } else {
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

// Initialize the typing effect
document.addEventListener('DOMContentLoaded', function() {
    typeText();
});

const coverPage = document.getElementById('coverPage');
const colors = [
    ['#ff9a9e', '#fad0c4'],
    ['#a18cd1', '#fbc2eb'],
    ['#ffecd2', '#fcb69f'],
    ['#f8f9fa', '#e0e7ff'],
    ['#ff9a9e', '#fecfef'],
];

let currentColorIndex = 0;
let nextColorIndex = 1;
let transitionDuration = 10000; // Duration of the transition in milliseconds
let startTime = null;

function interpolateColor(color1, color2, factor) {
    const result = color1.slice(1).match(/.{2}/g).map((hex, i) => {
        const value1 = parseInt(hex, 16);
        const value2 = parseInt(color2.slice(1).match(/.{2}/g)[i], 16);
        const interpolated = Math.round(value1 + factor * (value2 - value1));
        return interpolated.toString(16).padStart(2, '0');
    });
    return `#${result.join('')}`;
}

function animateGradient(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / transitionDuration;
    const factor = Math.min(progress, .25);

    const color1 = colors[currentColorIndex][0];
    const color2 = colors[currentColorIndex][1];
    const nextColor1 = colors[nextColorIndex][0];
    const nextColor2 = colors[nextColorIndex][1];

    const interpolatedStart = interpolateColor(color1, nextColor1, factor);
    const interpolatedEnd = interpolateColor(color2, nextColor2, factor);

    coverPage.style.background = `linear-gradient(135deg, ${interpolatedStart}, ${interpolatedEnd})`;

    if (progress < 1) {
        requestAnimationFrame(animateGradient);
    } else {
        startTime = null;
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % colors.length;
        setTimeout(() => requestAnimationFrame(animateGradient), transitionDuration);
    }
}

requestAnimationFrame(animateGradient);