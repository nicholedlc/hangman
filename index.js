const word = "Stranger";
const wordArr = word.toUpperCase().split("");
const wordObj = wordArr.reduce((acc, val, i) => {
  acc[val] ? acc[val].push(i) : acc[val] = [i];
  console.log(acc);
  return acc;
}, {});

const get = elem => document.getElementById(elem);
const create = tag => document.createElement(tag);

function guesses (letters) {
  let lettersContainer = get("letters-container");
  for (const [index, letter] of letters.entries()) {
    let line = create("div");
    line.classList.add("letter");
    line.setAttribute("id", index);
    line.innerHTML = "";
    lettersContainer.appendChild(line);
  }
  return lettersContainer;
}

const hangmenAssets = ["gallows+head", "gallows+head+torso", "gallows+head+torso+arm", "gallows+head+torso+2leg", "gallows+head+torso+2leg+arm", "gallows+head+torso+2leg+2arm"]
let remaining = word.length;
let used = [];

const verdict = message => {
  setTimeout(() => alert(message), 100);
};

function check(value) {
  if (used.includes(value)) {
    return;
  } else if (wordObj[value]) {
    wordObj[value].forEach((e) => {
      get(e).innerHTML = value;
      used.push(value);
      remaining--;
    })
    if(!remaining) {
      return verdict("Congratulations!");
    }
  } else {
    get("gallows-container").children[0].setAttribute("src", `hangman-assets/${hangmenAssets[0]}.jpg`);
    hangmenAssets.shift();
    used.push(value);
    if (!hangmenAssets.length) {
      return verdict("Say your prayers, dead man!");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  guesses(wordArr);

  get("buttons-container").addEventListener("click", () => {
    const { target } = event;
    const value = target.innerHTML;

    target.classList.add("select");
    check(value);
  });
});
