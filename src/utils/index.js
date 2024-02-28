//This file contains all of our utilities

import { compareDesc, parseISO } from "date-fns";

//used to help condense/organize classNames??
export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

//used to help sort the blogs by date wherever you decide to use this function
export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};
