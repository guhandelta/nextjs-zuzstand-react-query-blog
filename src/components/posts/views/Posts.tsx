import React from "react";
import styled from "styled-components";
import { usePosts } from "@/components/posts/posts.queries";
import { IPostItem } from "@/components/posts/posts.api";
import PostItem from "@/components/posts/views/PostItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Posts = () => {
  // Hook to get posts from state and then map each to a single PostItem
  const { posts } = usePosts();
  return (
    <Wrapper>
      {posts?.map((x: IPostItem) => (
        <PostItem key={x.id} {...x} />
      ))}
      {posts?.length === 0 && <h3>No Posts</h3>}
    </Wrapper>
  );
};

export default Posts;
