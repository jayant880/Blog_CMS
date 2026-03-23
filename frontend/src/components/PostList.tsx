import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:3000/api/posts");
      setPosts(res.data.posts);
    };
    fetchPost();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
};

export default PostList;
