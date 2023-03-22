import { MicroCMSDate } from "microcms-js-sdk";

export type Category = {
  id: string;
  name: string;
  color: string;
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
  description?: string;
  content: string;
  eyecatch: EyeCatch;
  category: Category[];
} & MicroCMSDate;
