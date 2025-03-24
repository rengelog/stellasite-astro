//------------------------------------------------------------------------------
// ハンバーガー センター
//------------------------------------------------------------------------------

// ナビゲーション センター
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".navbar-burger-center");
    const menu = document.getElementById("main-menu-center");

    // ハンバーガーメニューとメニューが存在する場合のみ処理を実行
    if (burger && menu) {
        // ハンバーガーメニューの開閉
        burger.addEventListener("click", function (event) {
            event.stopPropagation(); // メニューを開いたときにイベントが伝播しないようにする
            menu.classList.toggle("active"); // メニューの開閉
            burger.classList.toggle("is-active"); // バーガーアイコンのアニメーション
        });

        // 画面リサイズ時にメニューをリセット
        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) {
                menu.classList.remove("active"); // PCではメニューを閉じる
                burger.classList.remove("is-active");
            }
        });

        // メニューの外をクリックしたら閉じる
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !burger.contains(event.target)) {
                menu.classList.remove("active");
                burger.classList.remove("is-active");
            }
        });
    }

    // デスクトップ時のドロップダウンメニュー
    const menuItems = document.querySelectorAll(".menu-item-has-children");

    // メニューアイテムが存在する場合のみ処理を実行
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener("mouseenter", function () {
                if (window.innerWidth > 900) {
                    this.classList.add("hover-active");
                }
            });

            item.addEventListener("mouseleave", function () {
                if (window.innerWidth > 900) {
                    this.classList.remove("hover-active");
                }
            });
        });
    }
});

//------------------------------------------------------------------------------
// ハンバーガー
//------------------------------------------------------------------------------

// ナビゲーション
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".navbar-burger");
    const menu = document.getElementById("main-menu");

    // ハンバーガーメニューとメニューが存在する場合のみ処理を実行
    if (burger && menu) {
        // ハンバーガーメニューの開閉
        burger.addEventListener("click", function (event) {
            event.stopPropagation(); // メニューを開いたときにイベントが伝播しないようにする
            menu.classList.toggle("active"); // メニューの開閉
            burger.classList.toggle("is-active"); // バーガーアイコンのアニメーション
        });

        // 画面リサイズ時にメニューをリセット
        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) {
                menu.classList.remove("active"); // PCではメニューを閉じる
                burger.classList.remove("is-active");
            }
        });

        // メニューの外をクリックしたら閉じる
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !burger.contains(event.target)) {
                menu.classList.remove("active");
                burger.classList.remove("is-active");
            }
        });
    }

    // デスクトップ時のドロップダウンメニュー
    const menuItems = document.querySelectorAll(".menu-item-has-children");

    // メニューアイテムが存在する場合のみ処理を実行
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener("mouseenter", function () {
                if (window.innerWidth > 900) {
                    this.classList.add("hover-active");
                }
            });

            item.addEventListener("mouseleave", function () {
                if (window.innerWidth > 900) {
                    this.classList.remove("hover-active");
                }
            });
        });
    }
});

//------------------------------------------------------------------------------
// ドロワー
//------------------------------------------------------------------------------

// ドロワー
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".drawer-toggle");
    const closeButton = document.querySelector(".drawer-close");
    const overlay = document.querySelector(".drawer-overlay");
    const drawerMenu = document.querySelector(".drawer-menu");
    const body = document.body;

    // 要素が存在しない場合は処理を終了
    if (!toggleButton || !closeButton || !overlay || !drawerMenu) {
        return;
    }

    // メニューを開く
    function openDrawer() {
        body.classList.add("drawer-open");
        drawerMenu.setAttribute("aria-hidden", "false");
        overlay.setAttribute("aria-hidden", "false");
        closeButton.focus(); // 閉じるボタンにフォーカス
    }

    // メニューを閉じる
    function closeDrawer() {
        body.classList.remove("drawer-open");
        drawerMenu.setAttribute("aria-hidden", "true");
        overlay.setAttribute("aria-hidden", "true");
        toggleButton.focus(); // トグルボタンにフォーカスを戻す
    }

    // クリックイベント
    toggleButton.addEventListener("click", openDrawer);
    closeButton.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // ESCキーでメニューを閉じる
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeDrawer();
        }
    });

    // メニュー内のリンクにフォーカス移動時、最後のリンクでTabを押したら最初に戻る
    const focusableElements = drawerMenu.querySelectorAll("a, button");
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    lastFocusableElement.addEventListener("keydown", function(event) {
        if (event.key === "Tab" && !event.shiftKey) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
    });

    firstFocusableElement.addEventListener("keydown", function(event) {
        if (event.key === "Tab" && event.shiftKey) {
            event.preventDefault();
            lastFocusableElement.focus();
        }
    });
});

//------------------------------------------------------------------------------
// モーダル
//------------------------------------------------------------------------------

// モーダルの要素を取得
var modal = document.getElementById("Modal");
var btn = document.getElementById("openModal");
var closeBtn = document.getElementsByClassName("modal-close")[0];

// 要素が存在する場合のみ処理を続ける
if (modal && btn && closeBtn) {
    // ボタンがクリックされたときにモーダルを表示
    btn.addEventListener('click', function() {
        modal.classList.add('active'); // activeクラスを追加
        modal.classList.remove('hidden'); // hiddenクラスを削除
    });

    // 閉じるボタンがクリックされたときにモーダルを閉じる
    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden'); // hiddenクラスを追加
        setTimeout(() => {
            modal.classList.remove('active'); // activeクラスを削除
        }, 300); // 透明度が0になるまで待つ
    });

    // モーダルの外側をクリックしたときも閉じる
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.classList.add('hidden'); // hiddenクラスを追加
            setTimeout(() => {
                modal.classList.remove('active'); // activeクラスを削除
            }, 300); // 透明度が0になるまで待つ
        }
    });
}

//------------------------------------------------------------------------------
// アコーディオン
//------------------------------------------------------------------------------

// アコーディオン
document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    // 要素が存在しない場合は処理を終了
    if (accordionHeaders.length === 0) {
        return; // この時点で関数が終了する
    }

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;

            if (content.classList.contains("active")) {
                content.style.maxHeight = "0";
                content.style.opacity = "0";
                content.classList.remove("active");
                header.classList.remove("active"); // ヘッダーのアクティブ状態を解除
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
                content.classList.add("active");
                header.classList.add("active"); // ヘッダーをアクティブに
            }
        });
    });
});

//------------------------------------------------------------------------------
// タブ
//------------------------------------------------------------------------------

// タブ
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    // 要素が存在しない場合は処理を終了
    if (tabButtons.length === 0 || tabContents.length === 0) {
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // すべてのタブを非アクティブにする
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // クリックされたタブをアクティブにする
            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");
        });
    });
});

//------------------------------------------------------------------------------
// フィルター
//------------------------------------------------------------------------------

// フィルター
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const items = document.querySelectorAll(".filter-item");

    // 要素が存在しない場合は処理を終了
    if (!searchInput || !categoryFilter || items.length === 0) {
        return;
    }

    function filterList() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const itemCategory = item.getAttribute("data-category");

            const matchesSearch = itemText.includes(searchText);
            const matchesCategory = selectedCategory === "all" || itemCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterList);
    categoryFilter.addEventListener("change", filterList);
});

//------------------------------------------------------------------------------
// アラート ボタン
//------------------------------------------------------------------------------

// アラート ボタン
function showAlert(type, message) {
    const alertContainer = document.getElementById("alertContainer");

    // 要素が存在しない場合は処理を終了
    if (!alertContainer) {
        return;
    }

    // アラート要素を作成
    const alert = document.createElement("div");
    alert.classList.add("alert", `alert-${type}`, "show");
    alert.innerHTML = `
        <span class="alert-icon">${getIcon(type)}</span>
        ${message}
        <button class="close-btn" onclick="closeAlert(this)">×</button>`;

    // アラートを追加
    alertContainer.appendChild(alert);
}

// アイコン取得関数
function getIcon(type) {
    switch (type) {
        case "success": return "✔️";
        case "error": return "❌";
        case "warning": return "⚠️";
        case "info": return "ℹ️";
        default: return "";
    }
}

// 手動で閉じる
function closeAlert(button) {
    const alert = button.parentElement;
    alert.classList.add("fade-out");
    setTimeout(() => alert.remove(), 500);
}

//------------------------------------------------------------------------------
// アラートの閉じるボタン
//------------------------------------------------------------------------------

// アラートの閉じるボタン
document.addEventListener("DOMContentLoaded", function () {
    const alerts = document.querySelectorAll(".alert");

    // 要素が存在しない場合は処理を終了
    if (alerts.length === 0) {
        return;
    }

    alerts.forEach(function (alert) {
        let type = alert.dataset.type; // data-type 属性から種類を取得
        let icon = getIcon(type);
        let iconSpan = document.createElement("span");
        iconSpan.classList.add("alert-icon");
        iconSpan.textContent = icon;
        alert.insertBefore(iconSpan, alert.firstChild); // アイコンを先頭に追加
    });

    // 閉じるボタンの処理
    const closeButtons = document.querySelectorAll(".close-btn");

    // 要素が存在しない場合は処理を終了
    if (closeButtons.length === 0) {
        return;
    }

    closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            this.parentElement.classList.add("hide");
            setTimeout(() => this.parentElement.remove(), 300);
        });
    });
});

// アイコン取得関数
function getIcon(type) {
    switch (type) {
        case "success": return "✔️";
        case "error": return "❌";
        case "warning": return "⚠️";
        case "info": return "ℹ️";
        default: return "";
    }
}

//------------------------------------------------------------------------------
// ステップ
//------------------------------------------------------------------------------

// ステップ
document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const contents = document.querySelectorAll(".content");
    const progressBar = document.querySelector(".step-progress-bar");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    // 要素が存在しない場合は処理を終了
    if (steps.length === 0 || contents.length === 0 || !progressBar || !nextButton || !prevButton) {
        return;
    }

    let currentStep = 1;

    function updateStep() {
        // ステップの表示更新
        steps.forEach((step) => step.classList.remove("active"));
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add("active");

        // コンテンツの表示更新
        contents.forEach((content) => content.classList.remove("active"));
        document.querySelector(`.content[data-step="${currentStep}"]`).classList.add("active");

        // 進捗バー更新
        progressBar.style.width = `${(currentStep - 1) / (steps.length - 1) * 100}%`;

        // ボタンの有効/無効切り替え
        prevButton.disabled = currentStep === 1;
        nextButton.disabled = currentStep === steps.length;
    }

    nextButton.addEventListener("click", () => {
        if (currentStep < steps.length) {
            currentStep++;
            updateStep();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });

    updateStep(); // 初期化
});

//------------------------------------------------------------------------------
// カルーセル
//------------------------------------------------------------------------------

// カルーセル
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevCarouselButton = document.querySelector(".prev");
    const nextCarouselButton = document.querySelector(".next");

    // 要素が存在しない場合は処理を終了
    if (!slides || slideElements.length === 0 || dots.length === 0 || !prevCarouselButton || !nextCarouselButton) {
        return;
    }

    let index = 0;
    let slideCount = slideElements.length;

    // 初期設定
    dots[index].classList.add("active");
    slideElements[index].classList.add("active");

    function updateSlide() {
        // スライドのアクティブ状態を更新
        slideElements.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            // フェードアウト後にフェードイン
            slide.style.opacity = (i === index) ? "1" : "0";
            slide.style.transition = "opacity 0.5s ease-in-out"; // フェード時間を0.5秒に設定
            
        });

        // ドットのアクティブ状態を更新
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        index++;
        if (index >= slideCount) {
            index = 0;
        }
        updateSlide();
    }

    function prevSlide() {
        index--;
        if (index < 0) {
            index = slideCount - 1;
        }
        updateSlide();
    }

    nextCarouselButton.addEventListener("click", nextSlide);
    prevCarouselButton.addEventListener("click", prevSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", function () {
            index = i;
            updateSlide();
        });
    });

    // スワイプ機能の追加
    let startX = 0;
    let moveX = 0;
    let isDragging = false;

    slides.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    slides.addEventListener("touchmove", function (e) {
        if (!isDragging) return;
        moveX = e.touches[0].clientX - startX;
    });

    slides.addEventListener("touchend", function () {
        if (moveX > 50) { // スワイプが右方向の場合
            prevSlide();
        } else if (moveX < -50) { // スワイプが左方向の場合
            nextSlide();
        }
        isDragging = false;
        moveX = 0; // moveXをリセット
    });
    
    // 自動再生処理の追加（ここでは5秒間隔でスライドを切り替えます）
    let intervalId = setInterval(nextSlide, 5000);

    // マウスオーバーしたら自動再生を停止
    slides.addEventListener('mouseover', () => {
      clearInterval(intervalId);
    });
    
     // マウスアウトしたら自動再生を再開
     slides.addEventListener('mouseout', () => {
      intervalId = setInterval(nextSlide, 5000);
    });
});

//------------------------------------------------------------------------------
// プログレスバー
//------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    // プログレスバー
    let progressBar = document.querySelector('.progress-bar');
    let startButton = document.getElementById('startButton');

    // 要素が存在しない場合は処理を終了
    if (!progressBar || !startButton) {
        return; // 関数を終了
    }

    let progress = 0;

    startButton.addEventListener('click', () => {
        progress = 0; // プログレスをリセット
        progressBar.style.width = '0%'; // プログレスバーの幅をリセット
        progressBar.textContent = '0%'; // 数値をリセット

        // プログレスバーを更新する関数を開始
        simulateLoading();
    });

    function simulateLoading() {
        if (progress <= 100) {
            progressBar.style.width = `${progress}%`; // プログレスバーの幅を更新
            progressBar.textContent = `${progress}%`; // 数値を更新
            progress += 10; // 10%ずつ進行
            setTimeout(simulateLoading, 500); // 500msごとに更新
        }
    }
});

//------------------------------------------------------------------------------
// イメージギャラリー
//------------------------------------------------------------------------------

// document.addEventListener("DOMContentLoaded", () => {
//     // イメージギャラリー
//     const galleryGrid = document.getElementById('galleryGrid');
//     const closeBtn = document.querySelector('.close');
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImage = document.getElementById('lightboxImage');

//     // 要素が存在しない場合は処理を終了
//     if (!galleryGrid || !closeBtn || !lightbox || !lightboxImage) {
//         return; // 関数を終了
//     }

//     // ギャラリーの処理
//     function loadGallery() {
//         fetch('/quickframe-css/dist/components/images.json') // JSONファイルを取得
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const imagePaths = data.images; // 画像パスの配列を取得
//                 imagePaths.forEach(path => {
//                     const img = document.createElement('img');
//                     img.src = path; // 画像のパスを設定
//                     img.alt = 'Gallery Image';
//                     img.classList.add('gallery-image'); // クラスを追加

//                     // 画像クリック時の処理
//                     img.addEventListener('click', () => {
//                         showLightbox(path); // Lightboxを表示
//                     });

//                     galleryGrid.appendChild(img); // ギャラリーに画像を追加
//                 });
//             })
//             .catch(error => console.error('Error loading images:', error));
//     }

//     // ギャラリーをロード
//     loadGallery();

//     // Lightboxの処理
//     function showLightbox(imagePath) {
//         lightbox.classList.add('show'); // Lightboxを表示
//         lightboxImage.src = imagePath; // Lightboxに画像を設定
//     }

//     // Lightboxを閉じる処理
//     function closeLightbox() {
//         lightbox.classList.remove('show'); // Lightboxを非表示
//     }

//     // イベントリスナーの設定
//     closeBtn.addEventListener('click', closeLightbox); // Lightboxを閉じる
//     lightbox.addEventListener('click', (event) => {
//         if (event.target === lightbox) {
//             closeLightbox(); // Lightboxの外をクリックしたときに閉じる
//         }
//     });
// });

//------------------------------------------------------------------------------
// パララックス
//------------------------------------------------------------------------------

// パララックス
let lastScrollY = 0; // 最後にスクロールされた位置を保存
let ticking = false; // アニメーションの実行中フラグ

document.addEventListener("scroll", () => {
    lastScrollY = window.scrollY; // スクロール位置を更新

    if (!ticking) {
        ticking = true; // アニメーション実行中フラグをオン
        window.requestAnimationFrame(() => {
            updateParallax(); // パララックス更新関数を呼び出し
            ticking = false; // アニメーションの実行完了
        });
    }
});

// パララックス更新関数
function updateParallax() {
    const parallaxContainers = document.querySelectorAll(".parallax-container");

    // 要素が存在しない場合は処理を終了
    if (parallaxContainers.length === 0) {
        return; // パララックスコンテナが存在しない場合
    }

    const isMobile = window.innerWidth <= 600; // モバイル判定

    parallaxContainers.forEach(container => {
        const parallaxImage = container.querySelector(".parallax-image");

        // パララックス画像が存在するか確認
        if (!parallaxImage) {
            return; // 画像が存在しない場合は処理を終了
        }

        // 各コンテナの位置を取得
        const containerRect = container.getBoundingClientRect();

        // コンテナがビューポート内にあるか確認
        if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
            // モバイルの場合は動きを無効化
            if (!isMobile) {
                // スクロール位置を基準に動きを計算
                const scrollPosition = lastScrollY; // 最新のスクロール位置を使用
                const offset = containerRect.top + scrollPosition; // ビューポート内の位置を考慮
                let moveAmount = (scrollPosition - offset) * 0.3; // 動きの係数を調整

                // 画像の動きを適用
                parallaxImage.style.transform = `translateY(${moveAmount}px)`;
            } else {
                // モバイルでは動かない
                parallaxImage.style.transform = `translateY(0)`;
            }
        }
    });
}

//------------------------------------------------------------------------------
// フローティングアクションボタン
//------------------------------------------------------------------------------

// モーダルの要素を取得
var fabmodal = document.getElementById("FabModal");
var fabbtn = document.getElementById("fabButton");
var fabspan = document.getElementsByClassName("fabclose")[0]; // 閉じるボタン

// 要素が存在する場合のみ処理を続ける
if (fabmodal && fabbtn && fabspan) {
    // ボタンがクリックされたときにモーダルを表示
    fabbtn.addEventListener('click', function() {
        fabmodal.classList.add('show'); // showクラスを追加
    });

    // 閉じるボタンがクリックされたときにモーダルを閉じる
    fabspan.addEventListener('click', function() {
        fabmodal.classList.remove('show'); // showクラスを削除
    });

    // モーダルの外側をクリックしたときも閉じる
    window.addEventListener('click', function(event) {
        if (event.target == fabmodal) {
            fabmodal.classList.remove('show'); // showクラスを削除
        }
    });
}

//------------------------------------------------------------------------------
// 目次
//------------------------------------------------------------------------------

// h2 と h3 に対応

document.addEventListener("DOMContentLoaded", function() {
    function generateToc() {
      const toc = document.querySelector("#toc ul");
      if (!toc) {
        setTimeout(generateToc, 500);
        return;
      }
  
      toc.innerHTML = "";
  
      const headers = document.querySelectorAll("[data-toc='true']");
      if (headers.length === 0) return;
  
      const tocItems = [];
      let currentH2Item = null;
  
      headers.forEach(header => {
        let headerText = Array.from(header.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent)
          .join('').trim();
  
        if (!header.id) {
          header.id = "toc-" + Math.random().toString(36).substr(2, 9);
        }
  
        const tocItem = {
          id: header.id,
          text: headerText,
          level: header.tagName === "H2" ? 2 : 3,
          children: []
        };
  
        if (tocItem.level === 2) {
          currentH2Item = tocItem;
          tocItems.push(tocItem);
        } else if (currentH2Item) {
          currentH2Item.children.push(tocItem);
        } else {
          tocItems.push(tocItem);
        }
      });
  
      function renderToc(items, parentElement) {
        items.forEach(item => {
          const listItem = document.createElement("li");
          const anchor = document.createElement("a");
          anchor.href = `#${item.id}`;
          anchor.textContent = item.text;
  
          anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const target = document.getElementById(item.id);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          });
  
          listItem.appendChild(anchor);
  
          if (item.children.length > 0) {
            const childList = document.createElement("ul");
            renderToc(item.children, childList);
            listItem.appendChild(childList);
          }
  
          parentElement.appendChild(listItem);
        });
      }
  
      renderToc(tocItems, toc);
    }
  
    generateToc();
  
    const observer = new MutationObserver(mutations => {
      if (mutations.some(mutation => mutation.addedNodes.length || mutation.removedNodes.length)) {
        generateToc();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: false });
  });

//------------------------------------------------------------------------------
// FAQ
//------------------------------------------------------------------------------

// FAQ
function toggleAnswer(questionElement) {
    const faqItem = questionElement.parentElement;
    const answerElement = faqItem.querySelector('.faq-answer');

    // faqItemとanswerElementが存在する場合のみ処理を実行
    if (faqItem && answerElement) {
        faqItem.classList.toggle('active');
        if (faqItem.classList.contains('active')) {
            // 開くときの処理
            answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
            answerElement.style.opacity = "1";
        } else {
            // 閉じるときの処理
            answerElement.style.maxHeight = '0';
            answerElement.style.opacity = "0";
        }
    }
}

