import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostDetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
      if (res.data.post === null) {
        setPost(null);
        return;
      }
      setPost(res.data.post);
    };
    fetchPost();
  }, [id]);

  return (
    <div className="mx-auto px-4 py-8 container">
      {post ? (
        <div>
          <h1 className="mb-4 font-bold text-3xl">{post.title}</h1>
          <p className="mb-4 text-gray-600 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      ) : (
        <p>Post not found</p>
      )}
      <div>
        <Link
          to={"/"}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetails;
