//This file helps format the style of the blogs
//See the docs from ContentLayer to see exactly what things like 'makeSource' are for

import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code"; //helps with formatting code for markdown

//The below two are helpful for formatting. Look up these libraries/plugins for better info
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import GithubSlugger from "github-slugger"

//defineDocumentType defines the schema for one particular doc type. It is used within the optoins for makeSource
const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: { type: "image" },
    isPublished: {
      type: "boolean",
      default: true,
    },
    author: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    toc:{
      // This is to help with the Table of Contents
      type: "json",
      resolve: async (doc) => {

        const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(({groups}) => {
          const flag = groups?.flag;
          const content = groups?.content;

          return {
            level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
            text: content,
            slug: content ? slugger.slug(content) : undefined
          }

        })


        return headings;
      }
    }
  },
}));

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

export default makeSource({
  /* options */
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {behavior: "append"}], [rehypePrettyCode, codeOptions] ] }
});
