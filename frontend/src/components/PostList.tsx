import axios from "../utils/axios";
import { useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";
import Select from "react-select";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags?: string[];
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [tagsLoading, setTagsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tagOptions = useMemo(
    () => tags.map((tag) => ({ label: tag, value: tag })),
    [tags]
  );

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setTagsLoading(true);
        const res = await axios.get("/posts/tags");
        setTags(res.data.tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setErrorMessage("Failed to load tags.");
      } finally {
        setTagsLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const endpoint = selectedTag
        ? `/posts?tag=${encodeURIComponent(selectedTag)}`
        : "/posts";

      try {
        setPostsLoading(true);
        setErrorMessage(null);
        const res = await axios.get(endpoint);
        setPosts(res.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrorMessage("Failed to load posts.");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedTag]);
  return (
    <div>
      <div className="flex justify-start items-center mb-8 gap-4">
      <h1 className="font-bold text-3xl text-center">Latest Posts</h1>
        <Select
          isClearable
          isDisabled={tagsLoading || tagOptions.length === 0}
          options={tagOptions}
          value={
            selectedTag ? { label: selectedTag, value: selectedTag } : null
          }
          onChange={(newValue) => setSelectedTag(newValue?.value || null)}
          className="w-48 max-w-full border-gray-300 rounded-md shadow-md"
        />
      </div>
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
      {postsLoading ? (
        <p className="text-gray-500 text-center mt-6">Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No posts found</p>
      )}
    </div>
  );
};

export default PostList;
