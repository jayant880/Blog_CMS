import { Link } from "react-router";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="flex flex-col justify-between bg-white shadow-md hover:shadow-lg p-6 border border-gray-200 rounded-xl transition-shadow">
      <div>
        <h2 className="mb-3 font-bold text-xl line-clamp-2">{post.title}</h2>
        <p className="mb-4 text-gray-600 whitespace-pre-wrap">
          {post.content.substring(0, 100) +
            (post.content.length > 100 ? "..." : "")}
        </p>
        <p className="font-light text-gray-300">{post._id}</p>
      </div>
      {post.content.length > 100 && (
        <Link
          to={`/post/${post._id}`}
          className="self-start font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read More
        </Link>
      )}
    </div>
  );
};

export default PostCard;
