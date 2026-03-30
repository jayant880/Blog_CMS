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
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
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
        ? `/posts?tag=${encodeURIComponent(selectedTag)}&page=${page}&limit=${limit}`
        : `/posts?page=${page}&limit=${limit}`;

      try {
        setPostsLoading(true);
        setErrorMessage(null);
        const res = await axios.get(endpoint);
        setPosts(res.data.posts || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalPosts(res.data.totalPosts || 0);
        setPage(res.data.page || 1);
        setLimit(res.data.limit || 10);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrorMessage("Failed to load posts.");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedTag, page, limit]);
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
        <p className="text-gray-500">Total posts: {totalPosts}</p>
        <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className="w-24 max-w-full border-gray-300 rounded-md shadow-md">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
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
      { totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={() => setPage(page - 1)} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={page === 1} >Previous</button>
            <p className="text-gray-500">Page {page} of {totalPages}</p>
            <button onClick={() => setPage(page + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={page === totalPages}   >Next</button>
          </div>
        )}
    </div>
  );
};

export default PostList;
