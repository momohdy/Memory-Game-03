var arr=["aa","bb","cc","dd"]

console.log(arr.splice(1,1));
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is your name"); // what is prompt?
  if (yourName === "" || yourName === null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  document.getElementById("during").play();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// Shuffle func
shuffle(orderRange);
console.log(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index]; // what is order in css? Done.
  // Add is-flipped class to block  which chosen
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
function flipBlock(selectedBlocks) {
  selectedBlocks.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlocksEle) =>
    flippedBlocksEle.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    // stop clicked;
    stopClicking();
    // check if they are matched
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function stopClicking() {
  // add class of memory-game-blocks
  blocksContainer.classList.add("stop-clicking");

  // wait duration
  setTimeout(() => {
    // remove class of memory-game-blocks
    blocksContainer.classList.remove("stop-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  // catch span of wrong tries
  let wrongTries = document.querySelector(".tries span");

  if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
    // they are matched
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("are-matched");
    secondBlock.classList.add("are-matched");

    document.getElementById("succes").play();
  } else {
    // wrong tries++;
    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;

    // wait duration
    setTimeout(() => {
      // remove class is-flipped
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}
