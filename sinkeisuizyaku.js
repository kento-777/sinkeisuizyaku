    const symbols = ["🍎","🍊","🍇","🍉","🍓","🥝","🍒","🍍"];
    let cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);

    const board = document.getElementById("board");
    let first = null, second = null, lock = false;
    let moves = 0, matchedCount = 0;

    cards.forEach(sym => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.symbol = sym;
      card.onclick = () => flip(card);
      board.appendChild(card);
    });

    function flip(card) {
      if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.textContent = card.dataset.symbol;
      card.classList.add("flipped");

      if (!first) {
        first = card;
      } else {
        second = card;
        moves++;
        document.getElementById("moves").textContent = moves;
        lock = true;
        setTimeout(check, 800);
      }
    }

    function check() {
      if (first.dataset.symbol === second.dataset.symbol) {
        first.classList.add("matched");
        second.classList.add("matched");
        matchedCount += 2;
        if (matchedCount === cards.length) {
          alert(`クリア！めくった回数: ${moves}`);
        }
      } else {
        first.textContent = "";
        second.textContent = "";
        first.classList.remove("flipped");
        second.classList.remove("flipped");
      }
      first = second = null;
      lock = false;
    }