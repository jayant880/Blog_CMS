import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Link } from "react-router";

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
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-8 font-bold text-3xl text-center">Latest Posts</h1>
      {posts.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No posts found</p>
      )}
      <div className="mt-8">
        <Link to={"/create-post"} className="text-blue-500 hover:text-blue-600">
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default PostList;
