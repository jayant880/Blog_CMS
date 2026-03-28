import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-between bg-white shadow-md hover:shadow-blue-400 hover:shadow-lg p-6 border border-gray-200 rounded-xl transition-shadow cursor-pointer"
      onClick={() => {
        navigate(`/post/${post._id}`);
      }}
    >
      <div>
        <h2 className="mb-3 font-bold text-xl line-clamp-2">{post.title}</h2>
        <div className="mb-4 text-gray-600 prose prose-sm line-clamp-3">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
        <p className="font-light text-gray-300">{post._id}</p>
      </div>
    </div>
  );
};

export default PostCard;
