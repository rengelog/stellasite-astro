import { visit } from "unist-util-visit";
import { fromHtml } from 'hast-util-from-html';

export function remarkBadges() {
  return function (tree) {
    const badgeMap = {
      '[new]': '<span class="badge badge-new">NEW</span>',
      '[hot]': '<span class="badge badge-hot">HOT</span>',
      '[free]': '<span class="badge badge-free">無料</span>',
      '[recommended]': '<span class="badge badge-recommended">オススメ</span>',
      '[onepush]': '<span class="badge badge-onepush">いちおし</span>'
    };

    visit(tree, 'text', (node) => {
      if (!node.value) return; // node.valueがundefinedの場合スキップ

      Object.keys(badgeMap).forEach((tag) => {
        const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const replacedValue = node.value.replace(new RegExp(escapedTag, 'g'), badgeMap[tag]);

        // HTML文字列をhastノードに変換
        const newNode = fromHtml(replacedValue, { fragment: true });

        // nodeを新しいノードに置き換える
        node.type = 'html';
        node.value = replacedValue; // node.valueを直接置き換える
      });
    });
  };
}
