export interface BlogPost {
    data: {
      title: string;
      date: Date;
      category?: string;
      categories?: string[];
      tags?: string[];
    };
    slug: string;
  }
  