//ペアの作成
document.getElementById("matchbtn").addEventListener("click",makePair);
let cardpair = 0;
let firstCombine = [];
let message = "";

//turnがtrueの時、1pのターン
let turn = true

//プレイヤーの得点
let point_1p = 0;
let point_2p = 0;
document.getElementById("player_1_point").textContent = `${point_1p}pt`;
document.getElementById("player_2_point").textContent = `${point_2p}pt`;

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
  document.querySelector(".player_1").classList.toggle("play_1p")
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
    
    //カードをめくる
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flipped.length === 2) return;
      flipCard(card);
      
      flipped.push(card);
      if (flipped.length === 2) {
        checkMatch();
        document.getElementById("player_1_point").textContent = `${point_1p}pt`;
        document.getElementById("player_2_point").textContent = `${point_1p}pt`;
      }
    });
    
    gameBoard.appendChild(card);

    //得点の更新

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

      //得点の加算
      if (turn == true) {
        point_1p += 1;
      } else {
        point_2p += 1;
      }


      function addCss() {
        if(turn == true) {
        a.classList.add("matched_1p")
        b.classList.add("matched_1p")
        } else {
        a.classList.add("matched_2p")
        b.classList.add("matched_2p")         
        } 
      }
      setTimeout(addCss, 600)


      flipped = [];


      if (matched === cardpair) {
        //勝ったほうのメッセージを書く
        function writeMessage() {
          if (point_1p < point_2p) {
            message = "2pのかち!おめでとう!";
          } else if (point_1p === point_2p) {
            message = "ひきわけ！もっかいやろう";
          } else {
            message = "1pのかち！おめでとう！";
          }
        }
          writeMessage();
          setTimeout(() => alert(message), 1800);
      }
    } else {
      setTimeout(unflipCards, 1000);
      turn = !turn
      //ポイント更新、ターンチェンジ
      document.querySelector(".player_1").classList.toggle("play_1p");
      document.querySelector(".player_2").classList.toggle("play_2p");
      document.getElementById("player_1_point").textContent = `${point_1p}pt`;
      document.getElementById("player_2_point").textContent = `${point_2p}pt`;

    }
  }
}
