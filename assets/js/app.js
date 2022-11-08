const wordEl = document.getElementById("word");
const wrong_letters_el = document.getElementById("wrong-letters");
const play_again_btn = document.getElementById("play-again-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const final_message = document.getElementById("final-message");
const final_messageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figure_parts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selected_word = words[Math.floor(Math.random() * words.length)];

const correct_letters = [];
const wrong_letters = [];

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
      ${selected_word
        .split("")
        .map(
          (letter) => `
          <span class="letter">
             ${correct_letters.includes(letter) ? letter : ""}
          </span>`
        )
        .join("")}
      `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selected_word) {
    final_message.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
};

const updateWrongLettersEl = () => {
  wrong_letters_el.innerHTML = `
   ${wrong_letters.length > 0 ? "<p>Wrong</p>" : ""}
   ${wrong_letters.map((letter) => `<span>${letter}</span>`)}
   `;

  figure_parts.forEach((part, index) => {
    const errors = wrong_letters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrong_letters.length === figure_parts.length) {
    final_message.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
};

const showNotification = () => {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
};

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selected_word.includes(letter)) {
      if (!correct_letters.includes(letter)) {
        correct_letters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrong_letters.includes(letter)) {
        wrong_letters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();

play_again_btn.addEventListener("click", () => {
  correct_letters.splice(0);
  wrong_letters.splice(0);
  selected_word = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});
