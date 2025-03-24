import { visit } from "unist-util-visit";

export default function readingTime() {
  return function (tree, file) {
    const filePath = file.history[0] || "";

    // `/blog/` の記事のみ適用
    if (!filePath.includes("/blog/")) {
      return;
    }

    // 単語数カウント
    let wordCount = 0;
    visit(tree, "text", (node) => {
      wordCount += node.value.split(/\s+/).length;
    });

    // 読了時間を計算 (最低 1分)
    const minutes = Math.max(1, Math.ceil(wordCount / 200));

    // MDX の先頭に挿入
    tree.children.unshift({
      type: "html",
      value: `<div class="mdx-reading-time-bubble">
                <span><i class="fa-solid fa-book-open"></i> この記事は ${minutes} 分で読めます。</span>
              </div>`,
    });
  };
}
