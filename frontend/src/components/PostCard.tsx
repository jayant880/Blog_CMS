interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="shadow-md p-6 border border-gray-200 rounded-xl flex flex-col justify-between bg-white hover:shadow-lg transition-shadow">
      <div>
        <h2 className="mb-3 font-bold text-xl line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">
          {post.content.substring(0, 100) +
            (post.content.length > 100 ? "..." : "")}
        </p>
      </div>
      {post.content.length > 100 && (
        <button className="text-blue-600 font-semibold self-start hover:text-blue-800 transition-colors">
          Read More
        </button>
      )}
    </div>
  );
};

export default PostCard;
