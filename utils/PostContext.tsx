"use client";
import { postType } from "@/types/dataType";
import React, { createContext, useContext, ReactNode } from "react";

interface PostContextType {
  post: postType | null;
  setPost: (post: postType | null) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
}

interface PostProviderProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostProviderProps) {
  const [post, setPost] = React.useState<postType | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
