//ペアの作成
document.getElementById("matchbtn").addEventListener("click",makePair)
let cardpair = 0;
let firstCombine = [];

function makePair() {
  const input_a = document.getElementById("symbolInput_a").value.trim();
  const input_b = document.getElementById("symbolInput_b").value.trim();
  if (!input_a || !input_b) return alert("両方の欄に1つづつ入力してください！");
  
  //ペアの配列に代入
  firstCombine.push([input_a, input_b]);

  //入力欄の初期化
  document.getElementById("symbolInput_a").value = "";
  document.getElementById("symbolInput_b").value = "";
  cardpair += 1;
}

//ゲームスタート
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  if (cardpair == 0) return alert("少なくとも1ペア入力してください！");
  
  // シャッフル
  let cards = firstCombine.flat()
  cards.sort(() => Math.random() - 0.5);
  
  let flipped = [];
  let matched = 0;
  const gameBoard = document.getElementById("game");
  gameBoard.innerHTML = "";
  
  cards.forEach(sym => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = sym;
    
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flipped.length === 2) return;
      flipCard(card);
      
      flipped.push(card);
      if (flipped.length === 2) {
        checkMatch();
      }
    });
    
    gameBoard.appendChild(card);
  });
  
  function flipCard(card) {
    card.classList.add("flipped");
    card.innerText = card.dataset.symbol;
  }
  
  function unflipCards() {
    flipped.forEach(card => {
      card.classList.remove("flipped");
      card.innerHTML = "";
    });
    flipped = [];
  }
  
  function checkMatch() {
    const [a, b] = flipped;
    if (firstCombine.findIndex(pair => pair.includes(a.dataset.symbol)) === firstCombine.findIndex(pair => pair.includes(b.dataset.symbol))) {
      matched += 1;
      flipped = [];
      if (matched === cardpair) {
        setTimeout(() => alert("クリア！おめでとう🎉"), 300);
      }
    } else {
      setTimeout(unflipCards, 1000);
    }
  }
}
