import { visit } from 'unist-util-visit';

// `## 見出し ( .class )` の `.class` を取得する正規表現
const classRegex = /\s*\(\s*\.([\w-]+)\s*\)$/;

const addClassToHeadings = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if ((node.tagName === 'h2' || node.tagName === 'h3') && node.children.length > 0) {
        const textNode = node.children[0];

        if (textNode.type === 'text') {
          const match = textNode.value.match(classRegex);

          if (match) {
            const customClass = match[1];

            // `className` を設定
            node.properties = node.properties || {};
            node.properties.className = [customClass];

            // `data-toc="true"` も追加
            node.properties['data-toc'] = 'true';

            // `( .class )` 部分を削除して正しい見出しを表示
            const headingText = textNode.value.replace(classRegex, '').trim();

            // IDを生成（スペースをハイフンに置き換え、先頭と末尾のスペースを削除）
            const id = headingText.toLowerCase().replace(/\s+/g, '-');

            // IDはクラス名を含めない
            node.properties.id = id;

            // テキストノードの値を更新
            textNode.value = headingText;
          } else {
            // クラスが指定されていない場合、IDだけ生成
            const headingText = textNode.value.trim();
            const id = headingText.toLowerCase().replace(/\s+/g, '-');
            node.properties.id = id;
          }
        }
      }
    });
  };
};

export default addClassToHeadings;
