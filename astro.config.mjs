// @ts-check
import { defineConfig } from "astro/config";
import expressiveCode from 'astro-expressive-code';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Markdown プラグイン
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// マイ Markdown プラグイン
import remarkCallout from './src/plugins/remarkCallout.js';
import addClassToH2 from './src/plugins/addClassToH2.js';
import readingTime from "./src/plugins/readingTime.js";
import embedPlugin from "./src/plugins/embedPlugin.js";
import { remarkBadges } from './src/utils/remarkBadges.js';

export default defineConfig({
  site: "https://rengelog.com/",
  base: '/quickframe-css/dist/demo/',
  output: "static",
  trailingSlash: 'ignore',
  build: {
    format: "directory",
  },

  integrations: [
    expressiveCode(),
    react(),
    mdx({
      remarkPlugins: [
        remarkDirective,  // remarkCalloutで使用
        remarkBadges,
        remarkCallout,
      ],
    }),
  ],

  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkCallout,
      readingTime,
      embedPlugin,
    ],
    rehypePlugins: [
      rehypeSlug,  // 見出しにid属性を付与
      addClassToH2,  // `h2` に `class="guide"` を自動適用
    ],
  },

  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [
			viteStaticCopy({
			  targets: [
				{
				src: 'src/assets/images/*',  // `src/assets/images` 内のすべてのファイル
				dest: 'assets/images'        // `dist/assets/images/` に配置
				}
			  ]
			})
		]
  },

});
