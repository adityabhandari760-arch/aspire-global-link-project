export interface Author {
  name: string;
  avatar: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  tags: string[];
  author: Author;
  type?: 'blog' | 'news' | 'magazine'; // Added to distinguish content types
  featured?: boolean;
  trending?: boolean;
  pdfUrl?: string;
  postImage?: string;
  views?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
