/// <reference types="astro/client" />
declare namespace Astro {
    interface Props {
      posts: {
        data: {
          title: string;
          date?: Date;
          tags?: string[];
          image?: string;
        };
        slug: string;
      }[];
    }
    interface Params {
      tag: string;
    }
  }
  