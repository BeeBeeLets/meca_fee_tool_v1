/* ▼ カテゴリデータ（Bee指定順） */
const categories = {
  "エンジン": [
    { name: "エンジン1", price: 300000 },
    { name: "エンジン2", price: 500000 },
    { name: "エンジン3", price: 1000000 },
    { name: "エンジン4", price: 3000000 },
    { name: "エンジン5", price: 5000000 }
  ],
  "ブレーキ": [
    { name: "ブレーキ1", price: 500000 },
    { name: "ブレーキ2", price: 1000000 },
    { name: "ブレーキ3", price: 2000000 }
  ],
  "サスペンション": [
    { name: "サス1", price: 300000 },
    { name: "サス2", price: 500000 },
    { name: "サス3", price: 800000 },
    { name: "サス4", price: 1000000 },
    { name: "サス5", price: 2000000 }
  ],
  "トランス": [
    { name: "トランス1", price: 300000 },
    { name: "トランス2", price: 500000 },
    { name: "トランス3", price: 800000 },
    { name: "トランス4", price: 1000000 }
  ],
  "その他": [
    { name: "アーマー", price: 2000000 },
    { name: "ターボ", price: 1000000 },
    { name: "ニトロ", price: 1000000 },
    { name: "ハーネス", price: 7000000 }
  ],
  "オイルポンプ": [
    { name: "ポンプ1", price: 500000 },
    { name: "ポンプ2", price: 1000000 },
    { name: "ポンプ3", price: 2000000 }
  ],
  "ドライブシャフト": [
    { name: "シャフト1", price: 500000 },
    { name: "シャフト2", price: 1000000 },
    { name: "シャフト3", price: 2000000 }
  ],
  "シリンダー": [
    { name: "ヘッド1", price: 500000 },
    { name: "ヘッド2", price: 1000000 },
    { name: "ヘッド3", price: 2000000 }
  ],
  "バッテリーケーブル": [
    { name: "ケーブル1", price: 500000 },
    { name: "ケーブル2", price: 1000000 },
    { name: "ケーブル3", price: 2000000 }
  ],
  "燃料タンク": [
    { name: "タンク1", price: 500000 },
    { name: "タンク2", price: 1000000 },
    { name: "タンク3", price: 2000000 }
  ]
};

/* ▼ 正式名称マップ */
const officialNames = {
  "エンジン": "エンジン",
  "ブレーキ": "ブレーキ",
  "サスペンション": "サスペンション",
  "トランス": "トランスミッション",
  "オイルポンプ": "オイルポンプ",
  "ドライブシャフト": "ドライブシャフト",
  "シリンダー": "シリンダーヘッド",
  "バッテリーケーブル": "バッテリーケーブル",
  "燃料タンク": "燃料タンク",
  "アーマー": "アーマー",
  "ターボ": "ターボ",
  "ニトロ": "ニトロ",
  "ハーネス": "ハーネス"
};

/* ▼ 下回りフルカス対象 */
const underParts = ["燃料タンク","オイルポンプ","ドライブシャフト","シリンダー","バッテリーケーブル"];

/* ▼ その他の全体選択に含めるもの（ハーネス除外） */
const otherSelectable = ["アーマー", "ターボ", "ニトロ"];

/* ▼ プリセット定義（順番＝表示順） */
const presets = {
  "フルカス": [
    { cat: "エンジン", name: "エンジン4" },
    { cat: "ブレーキ", name: "ブレーキ3" },
    { cat: "トランス", name: "トランス3" },
    { cat: "その他", name: "アーマー" },
    { cat: "その他", name: "ターボ" },
    { cat: "その他", name: "ニトロ" },
    { cat: "オイルポンプ", name: "ポンプ3" },
    { cat: "ドライブシャフト", name: "シャフト3" },
    { cat: "シリンダー", name: "ヘッド3" },
    { cat: "バッテリーケーブル", name: "ケーブル3" },
    { cat: "燃料タンク", name: "タンク3" }
  ],

  "性能フルカス": [
    { cat: "エンジン", name: "エンジン4" },
    { cat: "ブレーキ", name: "ブレーキ3" },
    { cat: "トランス", name: "トランス3" },

  ],

  "下回りフルカス": [
    { cat: "燃料タンク", name: "タンク3" },
    { cat: "オイルポンプ", name: "ポンプ3" },
    { cat: "ドライブシャフト", name: "シャフト3" },
    { cat: "シリンダー", name: "ヘッド3" },
    { cat: "バッテリーケーブル", name: "ケーブル3" }
  ],

  "アーマーターボニトロ": [
    { cat: "その他", name: "アーマー" },
    { cat: "その他", name: "ターボ" },
    { cat: "その他", name: "ニトロ" }
  ]
};

/* ▼ 共通：数字抽出 */
const getNum = txt => (txt.match(/\d+/) || [""])[0];

/* ▼ 共通：万抽出 */
const getMan = txt => Number((txt.match(/（(\d+)万）/) || [0,0])[1]);

/* ▼ UI生成 */
const container = document.getElementById("categories");
const presetContainer = document.getElementById("presets");

const createToggle = (label, handler, parent = container) => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = "presetBtn";
  btn.onclick = handler;
  parent.appendChild(btn);
};

/* ▼ プリセットボタン生成（右上固定合計金額の下） */
if (presetContainer) {
  const title = document.createElement("h2");
  title.textContent = "プリセット";
  presetContainer.appendChild(title);

  Object.keys(presets).forEach(pName => {
    createToggle(pName, () => {
      const items = presets[pName];

      const allOn = items.every(it => {
        return [...document.querySelectorAll(`.price.${it.cat}`)].some(cb => {
          const label = cb.parentNode.querySelector("label").textContent;
          return label.startsWith(it.name) && cb.checked;
        });
      });

      items.forEach(it => {
        [...document.querySelectorAll(`.price.${it.cat}`)].forEach(cb => {
          const label = cb.parentNode.querySelector("label").textContent;
          if (label.startsWith(it.name)) cb.checked = !allOn;
        });
      });

      updateTotal();
    }, presetContainer);
  });
}

/* ▼ カテゴリごとのUI生成 */
for (const cat in categories) {

  if (cat === "オイルポンプ") {
    createToggle("下回りフルカス（切替）", () => {
      const allOn = underParts.every(c =>
        [...document.querySelectorAll(`.${c}`)].some(b => b.checked)
      );

      underParts.forEach(c => {
        const boxes = document.querySelectorAll(`.${c}`);
        boxes.forEach((b, i) => b.checked = allOn ? false : i === 2);
      });

      updateTotal();
    });
  }

  if (cat === "その他") {
    createToggle("その他（切替）", () => {
      const boxes = [...document.querySelectorAll(".その他")].filter(b =>
        otherSelectable.includes(b.classList[2])
      );

      const allOn = boxes.every(b => b.checked);
      boxes.forEach(b => b.checked = !allOn);

      updateTotal();
    });
  }

  const h2 = document.createElement("h2");
  h2.textContent = cat;
  container.appendChild(h2);

  const grid = document.createElement("div");
  grid.className = "grid";

  categories[cat].forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const label = document.createElement("label");
    label.textContent = `${item.name}（${item.price / 10000}万）`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (cat === "その他") {
      checkbox.className = `price その他 ${item.name}`;
    } else {
      checkbox.className = `price ${cat}`;
    }

    checkbox.value = item.price;

    card.appendChild(label);
    card.appendChild(checkbox);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ▼ 合計計算 */
function updateTotal() {
  let total = 0;
  let memo = [];

  const add = (yen, txt) => {
    total += yen;
    memo.push(txt);
  };

  const nf = Number(normalFix.value);
  if (nf) add(nf * 80000, `通常修理 × ${nf}`);

  const ce = Number(customExterior.value);
  if (ce) add(ce * 50000, `外装カスタム × ${ce}`);

  document.querySelectorAll(".price:checked").forEach(el => {
    const label = el.parentNode.querySelector("label").textContent;

    let cat = el.classList[1];
    if (cat === "その他") cat = el.classList[2];

    const official = officialNames[cat] || cat;

    const num = getNum(label);
    const man = getMan(label);

    add(man * 10000, `${official}${num}（${man}万）`);
  });

  const man = Math.floor(total / 10000);

  resultArea.textContent = `合計金額：${man}万（${total})`;
  topTotal.innerHTML = `合計：${man}万<br><span style="font-size:1.1em;">（${total}）</span>`;
  sideMemoList.innerHTML = memo.length ? memo.join("<br>") : "なし";
  sideMemoTotal.innerHTML = `合計：${man}万<br><span style="font-size:1.3em;">（${total}）</span>`;
}

/* ▼ 排他（その他除外） */
document.addEventListener("change", e => {
  if (e.target.type === "checkbox") {
    const cat = e.target.classList[1];
    if (cat !== "その他") {
      document.querySelectorAll(`.${cat}`).forEach(b => {
        if (b !== e.target) b.checked = false;
      });
    }
  }
  updateTotal();
});

/* ▼ リセット */
resetBtn.onclick = () => {
  document.querySelectorAll("input[type='checkbox']").forEach(b => b.checked = false);
  document.querySelectorAll("input[type='number']").forEach(n => n.value = 0);
  updateTotal();
};


document.addEventListener("input", updateTotal);
