import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

const directives = {
  tip: 'tip',
  info: 'info',
  note: 'note',
  warning: 'warning',
  danger: 'danger',
};

export default function customRemarkPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        const name = node.name;
        if (name in directives) {
          const content = node.children.map((child) => toString(child)).join('');
          node.type = 'html';
          node.value = `<${directives[name]}>${content}</${directives[name]}>`;
        }
      }
    });
  };
}
