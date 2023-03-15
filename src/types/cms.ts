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
  content: string;
  // content: {
  //   contents: (Text | Block | TextBlock | Image | Embed)[];
  // };
  eyecatch: EyeCatch;
  category: Category[];
} & MicroCMSDate;

// export type RichTextEditorTextAttributes = {
//   // script?: "sub" | "super";
//   blockquote?: boolean;
//   // size?: "small" | "large" | "huge";
//   link?: string;
//   target?: "_blank";
//   rel?: "noopener noreferrer";
//   strike?: boolean;
//   bold?: boolean;
// };
//
// export type RichTextEditorBlockAttributes = {
//   list?: "bullet" | "ordered";
//   "code-block"?: boolean;
//   header?: 1 | 2 | 3 | 4 | 5;
// };
//
// export type RitchTextEditorImageAttributes = {
//   width: number;
//   height: number;
//   link: string | null;
//   target: "_blank" | null;
//   alt: string | null;
// };
//
// export type Text = {
//   type: "text";
//   value: string;
//   attributes?: RichTextEditorTextAttributes;
// };
//
// export type Block = {
//   type: "block";
//   value: Text[];
//   attributes?: RichTextEditorBlockAttributes;
// };
//
// export type TextBlock = {
//   type: "textBlock";
//   value: Text[];
// };
//
// export type Image = {
//   type: "image";
//   value: string;
//   attributes: RitchTextEditorImageAttributes;
// };
//
// export type Embed = {
//   type: "embed";
//   value: string;
//   attributes: {};
// };
