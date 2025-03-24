/* -------------------------------------------------------------------------- */
/* share-buttons */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
  const facebookShareButton = document.getElementById('facebook-share');
  const twitterShareButton = document.getElementById('twitter-share');
  const lineShareButton = document.getElementById('line-share');
  const linkedinShareButton = document.getElementById('linkedin-share');
  const emailShareButton = document.getElementById('email-share');

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  if (facebookShareButton) {
    facebookShareButton.addEventListener('click', function() {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
      window.open(shareUrl, '_blank');
    });
  }

  if (twitterShareButton) {
    twitterShareButton.addEventListener('click', function() {
      const shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
      window.open(shareUrl, '_blank');
    });
  }

  if (lineShareButton) {
    lineShareButton.addEventListener('click', function() {
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${pageUrl}`;
      window.open(shareUrl, '_blank');
    });
  }

  if (linkedinShareButton) {
    linkedinShareButton.addEventListener('click', function() {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
      window.open(shareUrl, '_blank');
    });
  }

  if (emailShareButton) {
    emailShareButton.addEventListener('click', function() {
      const shareUrl = `mailto:?subject=${pageTitle}&body=${pageUrl}`;
      window.open(shareUrl, '_blank');
    });
  }
});

function copyToClipboard(button) {
  const url = window.location.href; // 動的にURLを取得
  const mainElement = document.querySelector('main'); // mian要素内の最初のh1を指定
  const firstH1 = mainElement.querySelector('h1');
  const title = firstH1 ? firstH1.textContent : document.title; // h1があればそのテキストを使用
  const textToCopy = `${title}\n${url}`; // タイトルとURLを結合

  navigator.clipboard.writeText(textToCopy).then(() => {
    const copiedText = button.querySelector(".copied-text");
    copiedText.style.display = "inline-block";
    setTimeout(() => { copiedText.style.display = "none"; }, 2000);
  });
}

/* -------------------------------------------------------------------------- */
/* theme-toggle */
/* -------------------------------------------------------------------------- */

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// ローカルストレージからテーマを取得
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', function() {
  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

/* -------------------------------------------------------------------------- */
/* qlightbox */
/* -------------------------------------------------------------------------- */

// qLightbox
const articleImages = document.querySelectorAll('article img');

// 各画像要素にクラスを追加
articleImages.forEach((image) => {
  image.classList.add('qlightbox');
});

// 画像要素にdata-large-src属性を追加
const images = document.querySelectorAll('img.qlightbox');
images.forEach((image) => {
  const src = image.src;
  image.setAttribute('data-large-src', src);
});

// ライトボックスを表示する関数
function openLightbox(event) {
  const largeSrc = event.target.getAttribute('data-large-src');
  const lightbox = document.createElement('div');
  lightbox.id = 'qlightbox';
  lightbox.style.opacity = '0'; // 初期の不透明度を0に設定

  const img = document.createElement('img');
  img.src = largeSrc;

  const closeButton = document.createElement('button');
  closeButton.textContent = '\u2715'; // ×マーク

  lightbox.appendChild(img);
  lightbox.appendChild(closeButton);

  document.body.appendChild(lightbox);

  // フェードイン効果を追加
  setTimeout(function() {
    lightbox.style.opacity = '1';
  }, 100); // 100ms後に不透明度を1に設定

  closeButton.addEventListener('click', function() {
    lightbox.style.opacity = '0'; // クローズボタンを押したときに不透明度を0に設定
    setTimeout(function() {
      lightbox.remove();
    }, 500); // 500ms後にライトボックスを削除
  });

  lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
      lightbox.style.opacity = '0'; // 背景をクリックしたときに不透明度を0に設定
      setTimeout(function() {
        lightbox.remove();
      }, 500); // 500ms後にライトボックスを削除
    }
  });
}

// 画像をクリックしたときのイベントハンドラ
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img.qlightbox');
  images.forEach((image) => {
    const src = image.src;
    image.setAttribute('data-large-src', src);

    image.addEventListener('click', openLightbox);
  });
});

/* -------------------------------------------------------------------------- */
/* コンテンツスライド */
/* -------------------------------------------------------------------------- */

// コンテンツのインデックスを管理
let currentIndex = 0;
let isAnimating = false; // アニメーション中かどうかを管理する変数

// コンテンツを切り替える関数// コンテンツを切り替える関数
function switchContent(index) {
  if (isAnimating) return; // アニメーション中は何もしない

  isAnimating = true; // アニメーション開始

  contents.forEach((content) => {
    content.style.display = 'none'; // 全てのコンテンツを非表示にする
  });
  if (contents[index]) {
    contents[index].style.display = 'block'; // 次のコンテンツを表示する
  }

  isAnimating = false; // アニメーション終了

  currentIndex = index; // インデックスを更新
}
window.onload = function() {
  const slideContents = document.querySelector('.contents-slide');
  if (slideContents) {
    const contents = window.contents = slideContents.querySelectorAll('.content');
    const prevButton = slideContents.querySelector('#prev-button');
    const nextButton = slideContents.querySelector('#next-button');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', function() {
        const newIndex = (currentIndex - 1 + contents.length) % contents.length;
        if (newIndex >= 0 && newIndex < contents.length) {
          debouncedSwitchContent(newIndex);
        }
      });

      nextButton.addEventListener('click', function() {
        const newIndex = (currentIndex + 1) % contents.length;
        if (newIndex >= 0 && newIndex < contents.length) {
          debouncedSwitchContent(newIndex);
        }
      });

      // 初期表示
      if (contents.length > 0) {
        contents.forEach((content) => {
          content.style.display = 'none';
        });
        contents[0].style.display = 'block';
      }
    }
  }
};

