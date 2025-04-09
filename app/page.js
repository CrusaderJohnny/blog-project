"use client";
import { useState } from "react";
import BlogDisplay from "./components/blogDisplay";
import CreateBlog from "./components/createBlog";

export default function Home() {
  const [blogsExist, setBlogsExist] = useState(false);
  return blogsExist ? <BlogDisplay/> : <CreateBlog/>;
};