import { visit } from "unist-util-visit";
import { u } from "unist-builder";

export default function embedPlugin() {
  return function (tree) {
    visit(tree, "text", (node, index, parent) => {
      const text = node.value;

      // ✅ YouTube 埋め込み（レスポンシブ対応）
      if (text.startsWith("!youtube ")) {
        const videoId = text.replace("!youtube ", "").trim();
        parent.children[index] = u("html", {
          value: `
            <div class="mdx-embed-container">
              <iframe
                src="https://www.youtube.com/embed/${videoId}"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          `
        });
      }

        // ✅ `!tweet` コマンドを探す
        if (text.startsWith("!tweet ")) {
          const tweetId = text.replace("!tweet ", "").trim();

          // ✅ 公式の Twitter 埋め込み方式を使用（レスポンシブ対応）
          parent.children[index] = u("html", {
            value: `
              <blockquote class="twitter-tweet" data-width="100%">
                <a href="https://twitter.com/i/status/${tweetId}"></a>
              </blockquote>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            `
          });
        }
      

        // ✅ GitHub リポジトリ埋め込み
        if (text.startsWith("!github ")) {
            const repoFullName = text.replace("!github ", "").trim(); // 例: `facebook/react`

            parent.children[index] = u("html", {
            value: `
                <div class="github-badge">
                <a href="https://github.com/${repoFullName}" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/github/stars/${repoFullName}?style=social" alt="GitHub stars" />
                </a>
                <a href="https://github.com/${repoFullName}/fork" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/github/forks/${repoFullName}?style=social" alt="GitHub forks" />
                </a>
                <a href="https://github.com/${repoFullName}/issues" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/github/issues/${repoFullName}?style=social" alt="GitHub issues" />
                </a>
                </div>
            `
            });
        }
    });
  };
}
