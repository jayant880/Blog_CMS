import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags?: string[];
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
        <div className="mb-4 text-gray-600 line-clamp-3 prose prose-sm">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-full text-blue-800 text-xs cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <p className="font-light text-gray-300">{post._id}</p>
      </div>
    </div>
  );
};

export default PostCard;
