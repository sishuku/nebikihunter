// ============================================================
// 半額ハンター script.js 完全版
// 35連続：店員が2人に増える
// 50連続：現在の商品配置だけシャッフル
// タイトル表示後から広告を常時表示
// ============================================================


// ============================================================
// BGM・SE
// ============================================================

const titleBgm =
  new Audio("assets/audio/bgm/title.mp3");

const gameBgm =
  new Audio("assets/audio/bgm/game.mp3");

const gameOverBgm =
  new Audio("assets/audio/bgm/gameover.mp3");


const sounds = {

  button:
    new Audio("assets/audio/se/button.mp3"),

  get:
    new Audio("assets/audio/se/get.mp3"),

  stamp:
    new Audio("assets/audio/se/stamp.mp3")

};


// BGM設定
titleBgm.loop = true;
gameBgm.loop = true;
gameOverBgm.loop = false;


// 音量
titleBgm.volume = 0.25;
gameBgm.volume = 0.25;
gameOverBgm.volume = 0.30;

sounds.button.volume = 0.7;
sounds.get.volume = 0.8;
sounds.stamp.volume = 0.8;


// ============================================================
// SE再生
// ============================================================

function playSound(name) {

  const sound =
    sounds[name];


  if (!sound) {
    return;
  }


  sound.pause();

  sound.currentTime = 0;


  sound.play().catch(() => {

    // 音声再生に失敗してもゲームは止めない

  });

}


// ============================================================
// BGM停止
// ============================================================

function stopBgm(audio) {

  audio.pause();

  audio.currentTime = 0;

}


// ============================================================
// タイトルBGM
// ============================================================

function playTitleBgm() {

  stopBgm(
    gameBgm
  );

  stopBgm(
    gameOverBgm
  );


  if (!titleBgm.paused) {
    return;
  }


  titleBgm.play().catch(() => {

    // ブラウザ制限時は何もしない

  });

}


// ============================================================
// ゲームBGM
// ============================================================

function playGameBgm() {

  stopBgm(
    titleBgm
  );

  stopBgm(
    gameOverBgm
  );


  if (!gameBgm.paused) {
    return;
  }


  gameBgm.play().catch(() => {

    // ブラウザ制限時は何もしない

  });

}


// ============================================================
// ゲームオーバーBGM
// ============================================================

function playGameOverBgm() {

  stopBgm(
    titleBgm
  );

  stopBgm(
    gameBgm
  );

  stopBgm(
    gameOverBgm
  );


  gameOverBgm.play().catch(() => {

    // 音声再生失敗時は何もしない

  });

}



// ============================================================
// 商品データ
// ============================================================

const PRODUCTS = [

  {
    id: "bread",
    name: "食パン",
    image: "assets/images/products/bread.png"
  },

  {
    id: "milk",
    name: "牛乳",
    image: "assets/images/products/milk.png"
  },

  {
    id: "bento",
    name: "唐揚げ弁当",
    image: "assets/images/products/karaage-bento.png"
  },

  {
    id: "meat",
    name: "黒毛和牛",
    image: "assets/images/products/wagyu.png"
  },

  {
    id: "fish",
    name: "お魚",
    image: "assets/images/products/fish.png"
  },

  {
    id: "pudding",
    name: "プリン",
    image: "assets/images/products/pudding.png"
  },

  {
    id: "egg",
    name: "卵",
    image: "assets/images/products/egg.png"
  },

  {
    id: "sushi",
    name: "お寿司",
    image: "assets/images/products/sushi.png"
  },

  {
    id: "noodle",
    name: "ヌードル",
    image: "assets/images/products/cup-noodle.png"
  },

  {
    id: "riceball",
    name: "おにぎり",
    image: "assets/images/products/onigiri.png"
  },

  {
    id: "apple",
    name: "りんご",
    image: "assets/images/products/apple.png"
  },

  {
    id: "icecream",
    name: "アイス",
    image: "assets/images/products/icecream.png"
  }

];



// ============================================================
// 基本設定
// ============================================================


// 棚に表示する商品数
const PRODUCTS_PER_GAME = 9;


// ゲーム開始前の確認時間
const GAME_START_DELAY = 2200;


// 35連続で店員2人
const SECOND_CLERK_STREAK = 35;


// 50連続で配置シャッフル
const SHUFFLE_STREAK = 50;


// シャッフル後の確認時間
const SHUFFLE_CHECK_TIME = 3000;


// 難易度は60連続で上限
const MAX_DIFFICULTY_STREAK = 60;



// ============================================================
// HTML要素取得
// ============================================================

const shelf =
  document.getElementById(
    "shelf"
  );


const gameArea =
  document.getElementById(
    "gameArea"
  );


const clerkHand =
  document.getElementById(
    "clerkHand"
  );


const customerHand =
  document.getElementById(
    "customerHand"
  );


const targetList =
  document.getElementById(
    "targetList"
  );


const streakText =
  document.getElementById(
    "streakText"
  );


const bestText =
  document.getElementById(
    "bestText"
  );


const statusText =
  document.getElementById(
    "statusText"
  );


const startButton =
  document.getElementById(
    "startButton"
  );


const retryButton =
  document.getElementById(
    "retryButton"
  );


const backToTitleButton =
  document.getElementById(
    "backToTitleButton"
  );


const gameOverModal =
  document.getElementById(
    "gameOverModal"
  );


const gameOverTitle =
  document.getElementById(
    "gameOverTitle"
  );


const gameOverReason =
  document.getElementById(
    "gameOverReason"
  );


const resultStreak =
  document.getElementById(
    "resultStreak"
  );


const message =
  document.getElementById(
    "message"
  );


const tapScreen =
  document.getElementById(
    "tapScreen"
  );


const titleScreen =
  document.getElementById(
    "titleScreen"
  );


const gameScreen =
  document.getElementById(
    "gameScreen"
  );


// 広告を含む全体レイアウト
const gameLayout =
  document.getElementById(
    "gameLayout"
  );


const titleStartButton =
  document.getElementById(
    "titleStartButton"
  );


const titleHowToButton =
  document.getElementById(
    "titleHowToButton"
  );


const titleBestText =
  document.getElementById(
    "titleBestText"
  );


const howToModal =
  document.getElementById(
    "howToModal"
  );


const closeHowToButton =
  document.getElementById(
    "closeHowToButton"
  );


const titleCreditButton =
  document.getElementById(
    "titleCreditButton"
  );


const creditModal =
  document.getElementById(
    "creditModal"
  );


const closeCreditButton =
  document.getElementById(
    "closeCreditButton"
  );



// ============================================================
// 2人目の店員作成
// ============================================================

const secondClerkHand =
  document.createElement(
    "div"
  );


secondClerkHand.id =
  "secondClerkHand";


secondClerkHand.className =
  "clerk-hand hidden";


secondClerkHand.setAttribute(
  "aria-hidden",
  "true"
);


secondClerkHand.innerHTML = `

  <span class="sticker-roll">
    半額
  </span>

  <span class="hand-emoji">
    👉
  </span>

`;


gameArea.appendChild(
  secondClerkHand
);


// 2人目を左右反転
const secondHandEmoji =
  secondClerkHand.querySelector(
    ".hand-emoji"
  );


if (secondHandEmoji) {

  secondHandEmoji.style.transform =
    "rotate(-105deg) scaleX(-1)";

}



// ============================================================
// ゲーム状態
// ============================================================


// idle
// starting
// playing
// taking
// event
// gameover

let gameState =
  "idle";


// 現在の連続数
let streak =
  1;


// ベスト
let best =
  Number(

    localStorage.getItem(
      "discountHunterBest"
    ) || 0

  );


// 現在表示中の商品
let shelfProducts =
  [];


// 現在の目当て
let currentTargets =
  [];


// 取得済み
let collectedTargets =
  new Set();


// 現在シールが貼られている商品
let activeProductId =
  null;


// NEW RECORD表示済み
let hasShownNewRecordThisGame =
  false;


// 35連続イベント済み
let hasUnlockedSecondClerk =
  false;


// 50連続イベント済み
let hasShuffledAt50 =
  false;


// 現在シールを貼った店員
let activeClerk =
  "first";



// ============================================================
// タイマー
// ============================================================

let activeTimeoutId =
  null;


let loopTimeoutId =
  null;


let messageTimeoutId =
  null;


let customerTakeTimeoutId =
  null;


let customerExitTimeoutId =
  null;


let firstHandAnimationTimeoutId =
  null;


let secondHandAnimationTimeoutId =
  null;


let eventTimeoutIds =
  [];



// ============================================================
// ベスト表示
// ============================================================

bestText.textContent =
  best;


titleBestText.textContent =
  best;



// ============================================================
// ゲーム開始
// ============================================================

function startGame() {

  clearAllTimers();


  // ========================================
  // 画面切り替え
  // ========================================

  tapScreen.classList.add(
    "hidden"
  );


  // 広告レイアウトは常に表示
  gameLayout.classList.remove(
    "hidden"
  );


  // タイトルだけ非表示
  titleScreen.classList.add(
    "hidden"
  );


  // 遊び方・クレジットを閉じる
  howToModal.classList.add(
    "hidden"
  );


  creditModal?.classList.add(
    "hidden"
  );


  // ゲームオーバー画面も閉じる
  gameOverModal.classList.add(
    "hidden"
  );


  // ゲーム表示
  gameScreen.classList.remove(
    "hidden"
  );


  playGameBgm();


  gameState =
    "starting";


  // ========================================
  // ゲーム状態初期化
  // ========================================

  streak =
    0;


  currentTargets =
    [];


  collectedTargets.clear();


  activeProductId =
    null;


  activeClerk =
    "first";


  hasShownNewRecordThisGame =
    false;


  hasUnlockedSecondClerk =
    false;


  hasShuffledAt50 =
    false;


  customerHand.classList.add(
    "hidden"
  );


  customerHand.classList.remove(
    "holding-product"
  );


  secondClerkHand.classList.add(
    "hidden"
  );


  secondClerkHand.classList.remove(
    "stamping"
  );


  streakText.textContent =
    streak;


  startButton.classList.add(
    "hidden"
  );


  statusText.textContent =
    "目当ての商品と配置を確認しよう！";


  // ========================================
  // 商品作成
  // ========================================

  chooseShelfProducts();


  createShelf();


  chooseNewTargets();


  moveBothHandsToCenter();


  // ========================================
  // スタート
  // ========================================

  loopTimeoutId =
    setTimeout(
      () => {

        if (
          gameState !==
          "starting"
        ) {

          return;

        }


        gameState =
          "playing";


        playSound(
          "button"
        );


        showFloatingMessage(
          "START！",
          "success",
          500
        );


        statusText.textContent =
          "シールが貼られるまで待とう。早押しは禁止！";


        scheduleNextAction(
          300
        );

      },

      GAME_START_DELAY

    );

}



// ============================================================
// 棚に表示する商品選択
// ============================================================

function chooseShelfProducts() {

  const shuffledProducts =
    shuffleArray(
      [...PRODUCTS]
    );


  shelfProducts =
    shuffledProducts.slice(
      0,
      PRODUCTS_PER_GAME
    );

}



// ============================================================
// 棚作成
// ============================================================

function createShelf() {

  shelf.innerHTML =
    "";


  shelfProducts.forEach(
    (product) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "product";


      button.type =
        "button";


      button.dataset.productId =
        product.id;


      button.innerHTML = `

        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          draggable="false"
        />

        <span class="product-name">
          ${product.name}
        </span>

        <span class="discount-sticker">
          半額
        </span>

      `;


      button.addEventListener(
        "click",
        () => {

          handleProductClick(
            product.id
          );

        }
      );


      shelf.appendChild(
        button
      );

    }
  );

}



// ============================================================
// 商品配置だけシャッフル
// ============================================================

function shuffleCurrentProductLayout() {

  shelfProducts =
    shuffleArray(
      [...shelfProducts]
    );


  createShelf();

}



// ============================================================
// 難易度
// ============================================================

function getDifficulty() {

  const difficultyStreak =
    Math.min(

      streak,

      MAX_DIFFICULTY_STREAK

    );


  return {


    // 0～19：1個
    // 20～59：2個
    // 60～：3個

    targetCount:

      difficultyStreak >= 60

        ? 3

        : difficultyStreak >= 20

          ? 2

          : 1,


    // 店員移動速度

    moveDuration:

      Math.max(

        430,

        900 -
          difficultyStreak * 10

      ),


    // 到着後の待機

    waitBeforeStamp:

      Math.max(

        350,

        700 -
          difficultyStreak * 7

      ),


    // プレイヤー反応時間

    reactionTime:

      Math.max(

        850,

        1600 -
          difficultyStreak * 15

      ),


    // ハズレ商品率

    decoyChance:

      Math.min(

        0.35,

        0.15 +
          difficultyStreak * 0.005

      ),


    // フェイント率

    feintChance:

  difficultyStreak < 5

    ? 0

    : Math.min(

        0.25,

        0.04 +

          (
            difficultyStreak - 5
          ) * 0.006

      )

  };

}



// ============================================================
// 新しい目当て選択
// ============================================================

function chooseNewTargets() {

  const difficulty =
    getDifficulty();


  const shuffled =
    shuffleArray(
      [...shelfProducts]
    );


  currentTargets =

    shuffled

      .slice(
        0,
        difficulty.targetCount
      )

      .map(
        (item) =>
          item.id
      );


  collectedTargets.clear();


  renderTargets();

}



// ============================================================
// 目当て表示
// ============================================================

function renderTargets() {

  targetList.innerHTML =
    "";


  currentTargets.forEach(
    (id) => {

      const product =
        shelfProducts.find(
          (item) =>
            item.id === id
        );


      if (!product) {
        return;
      }


      const chip =
        document.createElement(
          "div"
        );


      chip.className =
        "target-chip";


      if (
        collectedTargets.has(
          id
        )
      ) {

        chip.classList.add(
          "done"
        );

      }


      chip.innerHTML = `

        <img
          class="target-chip-image"
          src="${product.image}"
          alt=""
          aria-hidden="true"
          draggable="false"
        />

        <span>
          ${product.name}
        </span>

      `;


      targetList.appendChild(
        chip
      );

    }
  );

}



// ============================================================
// 次の店員行動予約
// ============================================================

function scheduleNextAction(
  delay = 350
) {

  clearTimeout(
    loopTimeoutId
  );


  loopTimeoutId =
    setTimeout(
      () => {

        if (
          gameState !==
          "playing"
        ) {

          return;

        }


        runClerkAction();

      },

      delay

    );

}



// ============================================================
// 店員行動
// ============================================================

function runClerkAction() {

  const difficulty =
    getDifficulty();


  const availableProducts =
    shelfProducts.filter(
      (item) =>

        !collectedTargets.has(
          item.id
        )

    );


  let selected =
    null;


  // ハズレに貼るか
  const shouldUseDecoy =

    availableProducts.some(
      (item) =>

        !currentTargets.includes(
          item.id
        )

    )

    &&

    Math.random() <
      difficulty.decoyChance;


  if (shouldUseDecoy) {

    const decoys =
      availableProducts.filter(
        (item) =>

          !currentTargets.includes(
            item.id
          )

      );


    selected =
      randomItem(
        decoys
      );

  }

  else {

    const remainingTargets =
      availableProducts.filter(
        (item) =>

          currentTargets.includes(
            item.id
          )

      );


    selected =
      randomItem(

        remainingTargets.length > 0

          ? remainingTargets

          : availableProducts

      );

  }


  if (!selected) {

    scheduleNextAction(
      200
    );

    return;

  }


  // 35連続以降
  if (
    hasUnlockedSecondClerk
  ) {

    runTwoClerkAction(
      selected,
      difficulty
    );

    return;

  }


  runSingleClerkAction(
    selected,
    difficulty
  );

}



// ============================================================
// 店員1人
// ============================================================

function runSingleClerkAction(
  selected,
  difficulty
) {

  const shouldFeint =

    Math.random() <
      difficulty.feintChance;


  activeClerk =
    "first";


  if (shouldFeint) {

    const fakeCandidates =
      shelfProducts.filter(
        (item) =>

          item.id !==
          selected.id

      );


    const fakeProduct =
      randomItem(
        fakeCandidates
      );


    moveHandToProduct(

      clerkHand,

      fakeProduct.id,

      difficulty.moveDuration

    );


    loopTimeoutId =
      setTimeout(
        () => {

          if (
            gameState !==
            "playing"
          ) {

            return;

          }


          moveHandToProduct(

            clerkHand,

            selected.id,

            Math.max(

              220,

              difficulty.moveDuration *
                0.65

            )

          );


          loopTimeoutId =
            setTimeout(
              () => {

                if (
                  gameState !==
                  "playing"
                ) {

                  return;

                }


                stampProduct(

                  selected.id,

                  "first"

                );

              },

              Math.max(

                250,

                difficulty.waitBeforeStamp *
                  0.65

              )

            );

        },

        difficulty.waitBeforeStamp

      );

  }

  else {

    moveHandToProduct(

      clerkHand,

      selected.id,

      difficulty.moveDuration

    );


    loopTimeoutId =
      setTimeout(
        () => {

          if (
            gameState !==
            "playing"
          ) {

            return;

          }


          stampProduct(

            selected.id,

            "first"

          );

        },

        difficulty.waitBeforeStamp

      );

  }

}



// ============================================================
// 店員2人
// ============================================================

function runTwoClerkAction(
  selected,
  difficulty
) {

  secondClerkHand.classList.remove(
    "hidden"
  );


  const realClerk =

    Math.random() < 0.5

      ? "first"

      : "second";


  const distractorCandidates =

    shelfProducts.filter(
      (item) =>

        item.id !==
        selected.id

    );


  const distractorProduct =
    randomItem(
      distractorCandidates
    );


  if (
    realClerk ===
    "first"
  ) {

    moveHandToProduct(

      clerkHand,

      selected.id,

      difficulty.moveDuration

    );


    moveHandToProduct(

      secondClerkHand,

      distractorProduct.id,

      difficulty.moveDuration

    );

  }

  else {

    moveHandToProduct(

      clerkHand,

      distractorProduct.id,

      difficulty.moveDuration

    );


    moveHandToProduct(

      secondClerkHand,

      selected.id,

      difficulty.moveDuration

    );

  }


  activeClerk =
    realClerk;


  loopTimeoutId =
    setTimeout(
      () => {

        if (
          gameState !==
          "playing"
        ) {

          return;

        }


        stampProduct(

          selected.id,

          realClerk

        );

      },

      difficulty.waitBeforeStamp

    );

}



// ============================================================
// 店員移動
// ============================================================

function moveHandToProduct(
  handElement,
  productId,
  duration
) {

  const productElement =
    getProductElement(
      productId
    );


  if (
    !productElement ||
    !handElement
  ) {

    return;

  }


  const areaRect =
    gameArea.getBoundingClientRect();


  const productRect =
    productElement.getBoundingClientRect();


  const x =

    productRect.left -
    areaRect.left +

    productRect.width *
      0.82;


  const y =

    productRect.top -
    areaRect.top +

    productRect.height *
      0.2;


  handElement.style.transitionDuration =
    `${duration}ms`;


  handElement.style.left =
    `${x}px`;


  handElement.style.top =
    `${y}px`;

}



// ============================================================
// 店員中央
// ============================================================

function moveHandToCenter(
  handElement
) {

  if (!handElement) {
    return;
  }


  handElement.style.transitionDuration =
    "0ms";


  handElement.style.left =
    "50%";


  handElement.style.top =
    "50%";

}


function moveBothHandsToCenter() {

  moveHandToCenter(
    clerkHand
  );


  moveHandToCenter(
    secondClerkHand
  );

}



// ============================================================
// シールを貼る
// ============================================================

function stampProduct(
  productId,
  clerkName = "first"
) {

  if (
    gameState !==
    "playing"
  ) {

    return;

  }


  clearActiveStamp();


  const difficulty =
    getDifficulty();


  const productElement =
    getProductElement(
      productId
    );


  if (!productElement) {
    return;
  }


  const isTarget =

    currentTargets.includes(
      productId
    )

    &&

    !collectedTargets.has(
      productId
    );


  activeProductId =
    productId;


  activeClerk =
    clerkName;


  productElement.classList.add(
    "stamped"
  );


  playSound(
    "stamp"
  );


  const stampingHand =

    clerkName === "second"

      ? secondClerkHand

      : clerkHand;


  stampingHand.classList.add(
    "stamping"
  );


  if (
    clerkName ===
    "second"
  ) {

    clearTimeout(
      secondHandAnimationTimeoutId
    );


    secondHandAnimationTimeoutId =
      setTimeout(
        () => {

          secondClerkHand.classList.remove(
            "stamping"
          );

        },

        220

      );

  }

  else {

    clearTimeout(
      firstHandAnimationTimeoutId
    );


    firstHandAnimationTimeoutId =
      setTimeout(
        () => {

          clerkHand.classList.remove(
            "stamping"
          );

        },

        220

      );

  }


  if (isTarget) {

    productElement.classList.add(
      "target-stamped"
    );


    statusText.textContent =
      "今だ！他のお客さんに取られる前にクリック！";


    activeTimeoutId =
      setTimeout(
        () => {

          if (

            gameState !==
              "playing"

            ||

            activeProductId !==
              productId

          ) {

            return;

          }


          playCustomerTakeAnimation(
            productId
          );

        },

        difficulty.reactionTime

      );

  }

  else {

    statusText.textContent =
      "これは目当てじゃない。触らずに待とう。";


    activeTimeoutId =
      setTimeout(
        () => {

          if (

            gameState !==
              "playing"

            ||

            activeProductId !==
              productId

          ) {

            return;

          }


          clearActiveStamp();


          scheduleNextAction(
            180
          );

        },

        Math.min(

          850,

          difficulty.reactionTime *
            0.75

        )

      );

  }

}



// ============================================================
// 他のお客が取る
// ============================================================

function playCustomerTakeAnimation(
  productId
) {

  gameState =
    "taking";


  const productElement =
    getProductElement(
      productId
    );


  if (!productElement) {

    endGame(

      "他のお客さんに取られた！",

      "反応が少し遅かった…"

    );


    return;

  }


  const areaRect =
    gameArea.getBoundingClientRect();


  const productRect =
    productElement.getBoundingClientRect();


  const targetX =

    productRect.left -
    areaRect.left +

    productRect.width / 2;


  const targetY =

    productRect.top -
    areaRect.top +

    productRect.height / 2;


  customerHand.classList.add(
    "hidden"
  );


  customerHand.classList.remove(
    "holding-product"
  );


  customerHand.style.transitionDuration =
    "0ms";


  customerHand.style.left =
    `${gameArea.clientWidth + 120}px`;


  customerHand.style.top =
    `${targetY}px`;


  customerHand.classList.remove(
    "hidden"
  );


  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        () => {

          customerHand.style.transitionDuration =
            "320ms";


          customerHand.style.left =
            `${targetX}px`;

        }
      );

    }
  );


  customerTakeTimeoutId =
    setTimeout(
      () => {

        productElement.classList.add(
          "customer-taken"
        );


        customerHand.classList.add(
          "holding-product"
        );


        customerHand.style.transitionDuration =
          "380ms";


        customerHand.style.left =
          `${gameArea.clientWidth + 140}px`;

      },

      330

    );


  customerExitTimeoutId =
    setTimeout(
      () => {

        customerHand.classList.add(
          "hidden"
        );


        customerHand.classList.remove(
          "holding-product"
        );


        endGame(

          "他のお客さんに取られた！",

          "反応が少し遅かった…"

        );

      },

      780

    );

}



// ============================================================
// 商品クリック
// ============================================================

function handleProductClick(
  productId
) {

  if (
    gameState !==
    "playing"
  ) {

    return;

  }


  const clickedElement =
    getProductElement(
      productId
    );


  if (!clickedElement) {
    return;
  }


  const isStamped =

    clickedElement.classList.contains(
      "stamped"
    );


  const isCurrentTarget =

    currentTargets.includes(
      productId
    )

    &&

    !collectedTargets.has(
      productId
    );


  // シール前
  if (!isStamped) {

    endGame(

      "早すぎる！",

      "割引シールが貼られる前に商品を触ってしまった。"

    );


    return;

  }


  // 違う商品
  if (
    activeProductId !==
    productId
  ) {

    endGame(

      "違う商品！",

      "シールが貼られていない商品を選んでしまった。"

    );


    return;

  }


  // 目当てではない
  if (!isCurrentTarget) {

    endGame(

      "目当てじゃない！",

      "割引されていても、買う予定の商品ではなかった。"

    );


    return;

  }


  clearTimeout(
    activeTimeoutId
  );


  activeTimeoutId =
    null;


  collectedTargets.add(
    productId
  );


  clickedElement.classList.add(
    "taken"
  );


  playSound(
    "get"
  );


  streak +=
    1;


  streakText.textContent =
    streak;


  let successMessage =
    "GET！";


  // ========================================================
  // ベスト更新
  // ========================================================

  if (
    streak >
    best
  ) {

    best =
      streak;


    bestText.textContent =
      best;


    titleBestText.textContent =
      best;


    localStorage.setItem(

      "discountHunterBest",

      String(best)

    );


    if (
      !hasShownNewRecordThisGame
    ) {

      successMessage =
        "NEW RECORD！";


      hasShownNewRecordThisGame =
        true;

    }

  }


  showFloatingMessage(

    successMessage,

    "success",

    500

  );


  renderTargets();


  clearActiveStamp();


  const targetSetComplete =

    currentTargets.every(
      (id) =>

        collectedTargets.has(
          id
        )

    );


  if (
    targetSetComplete
  ) {

    handleCompletedTargetSet();

  }

  else {

    statusText.textContent =
      "まだ目当ての商品が残っている！";


    scheduleNextAction(
      350
    );

  }

}



// ============================================================
// 目当て全部取得
// ============================================================

function handleCompletedTargetSet() {

  if (

    streak >=
      SECOND_CLERK_STREAK

    &&

    !hasUnlockedSecondClerk

  ) {

    startSecondClerkEvent();

    return;

  }


  if (

    streak >=
      SHUFFLE_STREAK

    &&

    !hasShuffledAt50

  ) {

    startShuffleEvent();

    return;

  }


  prepareNextTargetSet();

}



// ============================================================
// 次の買い物リスト
// ============================================================

function prepareNextTargetSet() {

  statusText.textContent =
    "全部ゲット！次の買い物リストへ。";


  loopTimeoutId =
    setTimeout(
      () => {

        if (
          gameState !==
          "playing"
        ) {

          return;

        }


        resetAllProducts();


        chooseNewTargets();


        scheduleNextAction(
          450
        );

      },

      650

    );

}



// ============================================================
// 35連続イベント
// ============================================================

function startSecondClerkEvent() {

  hasUnlockedSecondClerk =
    true;


  gameState =
    "event";


  clearActiveStamp();


  resetAllProducts();


  moveBothHandsToCenter();


  secondClerkHand.classList.remove(
    "hidden"
  );


  statusText.textContent =
    "応援スタッフが到着しました！";


  showFloatingMessage(

    "35連続達成！",

    "success",

    1000

  );


  addEventTimeout(
    () => {

      if (
        gameState !==
        "event"
      ) {

        return;

      }


      showFloatingMessage(

        "店員が2人に増えた！",

        "warning",

        1300

      );


      statusText.textContent =
        "2人のうち、シールを貼るのはどちらか1人！";

    },

    1100

  );


  addEventTimeout(
    () => {

      if (
        gameState !==
        "event"
      ) {

        return;

      }


      resetAllProducts();


      chooseNewTargets();


      gameState =
        "playing";


      showFloatingMessage(

        "再開！",

        "success",

        600

      );


      statusText.textContent =
        "2人の店員をよく見よう！";


      scheduleNextAction(
        350
      );

    },

    2800

  );

}



// ============================================================
// 50連続イベント
// ============================================================

function startShuffleEvent() {

  hasShuffledAt50 =
    true;


  gameState =
    "event";


  clearActiveStamp();


  resetAllProducts();


  moveBothHandsToCenter();


  statusText.textContent =
    "50連続達成！商品配置が変わります！";


  showFloatingMessage(

    "50連続達成！",

    "success",

    1000

  );


  addEventTimeout(
    () => {

      if (
        gameState !==
        "event"
      ) {

        return;

      }


      showFloatingMessage(

        "商品配置シャッフル！",

        "warning",

        1200

      );


      shuffleCurrentProductLayout();


      chooseNewTargets();


      moveBothHandsToCenter();


      statusText.textContent =
        "新しい配置を3秒で確認しよう！";

    },

    1100

  );


  addEventTimeout(
    () => {

      if (
        gameState !==
        "event"
      ) {

        return;

      }


      gameState =
        "playing";


      showFloatingMessage(

        "再開！",

        "success",

        600

      );


      statusText.textContent =
        "配置が変わった！2人の店員をよく見よう！";


      scheduleNextAction(
        350
      );

    },

    1100 +
      SHUFFLE_CHECK_TIME

  );

}



// ============================================================
// イベントタイマー
// ============================================================

function addEventTimeout(
  callback,
  delay
) {

  const timeoutId =
    setTimeout(
      () => {

        eventTimeoutIds =
          eventTimeoutIds.filter(
            (id) =>
              id !== timeoutId
          );


        callback();

      },

      delay

    );


  eventTimeoutIds.push(
    timeoutId
  );

}


function clearEventTimers() {

  eventTimeoutIds.forEach(
    (timeoutId) => {

      clearTimeout(
        timeoutId
      );

    }
  );


  eventTimeoutIds =
    [];

}



// ============================================================
// シール解除
// ============================================================

function clearActiveStamp() {

  clearTimeout(
    activeTimeoutId
  );


  activeTimeoutId =
    null;


  document

    .querySelectorAll(
      ".product"
    )

    .forEach(
      (element) => {

        element.classList.remove(

          "stamped",

          "target-stamped"

        );

      }
    );


  activeProductId =
    null;

}



// ============================================================
// 商品状態リセット
// ============================================================

function resetAllProducts() {

  document

    .querySelectorAll(
      ".product"
    )

    .forEach(
      (element) => {

        element.classList.remove(

          "stamped",

          "target-stamped",

          "taken",

          "customer-taken"

        );

      }
    );

}



// ============================================================
// ゲームオーバー
// ============================================================

function endGame(
  title,
  reason
) {

  gameState =
    "gameover";


  clearAllTimers();


  playGameOverBgm();


  gameOverTitle.textContent =
    title;


  gameOverReason.textContent =
    reason;


  resultStreak.textContent =
    streak;


  // 広告レイアウトは消さない
  gameLayout.classList.remove(
    "hidden"
  );


  gameOverModal.classList.remove(
    "hidden"
  );


  statusText.textContent =
    "ゲームオーバー";

}



// ============================================================
// 中央メッセージ
// ============================================================

function showFloatingMessage(
  text,
  type,
  duration
) {

  clearTimeout(
    messageTimeoutId
  );


  message.textContent =
    text;


  message.className =
    `message ${type}`;


  messageTimeoutId =
    setTimeout(
      () => {

        message.classList.add(
          "hidden"
        );

      },

      duration

    );

}



// ============================================================
// 全タイマー解除
// ============================================================

function clearAllTimers() {

  clearTimeout(
    activeTimeoutId
  );


  clearTimeout(
    loopTimeoutId
  );


  clearTimeout(
    messageTimeoutId
  );


  clearTimeout(
    customerTakeTimeoutId
  );


  clearTimeout(
    customerExitTimeoutId
  );


  clearTimeout(
    firstHandAnimationTimeoutId
  );


  clearTimeout(
    secondHandAnimationTimeoutId
  );


  clearEventTimers();


  activeTimeoutId =
    null;


  loopTimeoutId =
    null;


  messageTimeoutId =
    null;


  customerTakeTimeoutId =
    null;


  customerExitTimeoutId =
    null;


  firstHandAnimationTimeoutId =
    null;


  secondHandAnimationTimeoutId =
    null;

}



// ============================================================
// 商品取得
// ============================================================

function getProductElement(
  productId
) {

  return document.querySelector(

    `[data-product-id="${productId}"]`

  );

}



// ============================================================
// ランダム取得
// ============================================================

function randomItem(
  array
) {

  if (

    !array

    ||

    array.length === 0

  ) {

    return null;

  }


  return array[

    Math.floor(

      Math.random() *
      array.length

    )

  ];

}



// ============================================================
// 配列シャッフル
// ============================================================

function shuffleArray(
  array
) {

  const copiedArray =
    [...array];


  for (

    let index =
      copiedArray.length - 1;

    index > 0;

    index -= 1

  ) {

    const randomIndex =
      Math.floor(

        Math.random() *
        (index + 1)

      );


    [

      copiedArray[index],

      copiedArray[randomIndex]

    ] = [

      copiedArray[randomIndex],

      copiedArray[index]

    ];

  }


  return copiedArray;

}



// ============================================================
// 最初のタップ
// ============================================================

tapScreen.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    // 最初の全画面を消す
    tapScreen.classList.add(
      "hidden"
    );


    // ★ここから広告を常時表示
    gameLayout.classList.remove(
      "hidden"
    );


    // タイトル表示
    titleScreen.classList.remove(
      "hidden"
    );


    // ゲームはまだ非表示
    gameScreen.classList.add(
      "hidden"
    );


    // モーダルも閉じる
    howToModal.classList.add(
      "hidden"
    );


    creditModal?.classList.add(
      "hidden"
    );


    gameOverModal.classList.add(
      "hidden"
    );


    gameState =
      "idle";


    playTitleBgm();

  }
);



// ============================================================
// タイトル → ゲーム開始
// ============================================================

titleStartButton.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    startGame();

  }
);



// ============================================================
// 遊び方を開く
// ============================================================

titleHowToButton.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    // タイトルは裏側に残す
    // 広告もそのまま
    howToModal.classList.remove(
      "hidden"
    );

  }
);



// ============================================================
// 遊び方を閉じる
// ============================================================

closeHowToButton.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    howToModal.classList.add(
      "hidden"
    );


    // 広告を維持
    gameLayout.classList.remove(
      "hidden"
    );


    // タイトルを維持
    titleScreen.classList.remove(
      "hidden"
    );


    playTitleBgm();

  }
);



// ============================================================
// クレジットを開く
// ============================================================

titleCreditButton?.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    // タイトル・広告はそのまま
    creditModal?.classList.remove(
      "hidden"
    );

  }
);



// ============================================================
// クレジットを閉じる
// ============================================================

closeCreditButton?.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    creditModal?.classList.add(
      "hidden"
    );


    // 広告を維持
    gameLayout.classList.remove(
      "hidden"
    );


    titleScreen.classList.remove(
      "hidden"
    );

  }
);



// ============================================================
// 互換用開始ボタン
// ============================================================

startButton.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    startGame();

  }
);



// ============================================================
// リトライ
// ============================================================

retryButton.addEventListener(
  "click",
  () => {

    playSound(
      "button"
    );


    startGame();

  }
);



// ============================================================
// GAME OVER → タイトル
// ============================================================

if (
  backToTitleButton
) {

  backToTitleButton.addEventListener(
    "click",
    () => {

      playSound(
        "button"
      );


      clearAllTimers();


      gameState =
        "idle";


      // ゲームオーバー画面を閉じる
      gameOverModal.classList.add(
        "hidden"
      );


      // ゲーム本体だけ隠す
      gameScreen.classList.add(
        "hidden"
      );


      // ★広告レイアウトは絶対に消さない
      gameLayout.classList.remove(
        "hidden"
      );


      // タイトル表示
      titleScreen.classList.remove(
        "hidden"
      );


      // 他モーダルを閉じる
      howToModal.classList.add(
        "hidden"
      );


      creditModal?.classList.add(
        "hidden"
      );


      // タップ画面は戻さない
      tapScreen.classList.add(
        "hidden"
      );


      titleBestText.textContent =
        best;


      customerHand.classList.add(
        "hidden"
      );


      customerHand.classList.remove(
        "holding-product"
      );


      secondClerkHand.classList.add(
        "hidden"
      );


      resetAllProducts();


      clearActiveStamp();


      moveBothHandsToCenter();


      playTitleBgm();

    }
  );

}



// ============================================================
// 画面サイズ変更
// ============================================================

window.addEventListener(
  "resize",
  () => {

    if (

      gameState ===
        "idle"

      ||

      gameState ===
        "starting"

      ||

      gameState ===
        "event"

    ) {

      moveBothHandsToCenter();

    }

  }
);



// ============================================================
// 初期化
// ============================================================

chooseShelfProducts();


createShelf();


chooseNewTargets();


moveBothHandsToCenter();



// ============================================================
// 初期画面
// ============================================================


// 最初のタップ待ちは表示
tapScreen.classList.remove(
  "hidden"
);


// タップ前なので広告はまだ非表示
gameLayout.classList.add(
  "hidden"
);


// タイトルはまだ非表示
titleScreen.classList.add(
  "hidden"
);


// ゲーム非表示
gameScreen.classList.add(
  "hidden"
);


// モーダル非表示
howToModal.classList.add(
  "hidden"
);


creditModal?.classList.add(
  "hidden"
);


gameOverModal.classList.add(
  "hidden"
);