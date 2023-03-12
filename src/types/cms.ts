import { MicroCMSDate } from "microcms-js-sdk";

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

export type EyeCatch = {
  url: string;
  height: number;
  width: number;
  alt?: string;
};

export type Blog = {
  id: string;
  title: string;
  content: {
    contents: (
      | RichTextEditorText
      | RichTextEditorBlock
      | RichTextEditorTextBlock
      | RichTextEditorImage
    )[];
  };
  eyecatch: EyeCatch;
  category: Category[];
} & MicroCMSDate;

export type RichTextEditorTextAttributes = {
  script?: "sub" | "super";
  blockquote?: boolean;
  size?: "small" | "large" | "huge";
  link?: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
};

export type RichTextEditorBlockAttributes = {
  list?: "bullet" | "ordered";
  header?: 1 | 2 | 3 | 4 | 5;
};

export type RitchTextEditorImageAttributes = {
  width: number;
  height: number;
  link: string | null;
  target: "_blank" | null;
  alt: string | null;
};

export type RichTextEditorText = {
  type: "text";
  value: string;
  attributes?: RichTextEditorTextAttributes;
};

export type RichTextEditorBlock = {
  type: "block";
  value: RichTextEditorText[];
  attributes?: RichTextEditorBlockAttributes;
};

export type RichTextEditorTextBlock = {
  type: "textBlock";
  value: RichTextEditorText[];
  attributes?: RichTextEditorTextAttributes;
};

export type RichTextEditorImage = {
  type: "image";
  value: string;
  attributes: RitchTextEditorImageAttributes;
};
