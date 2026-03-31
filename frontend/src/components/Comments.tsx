import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuthStore } from "../store/useAuthStore";

interface CommentType {
  _id: string;
  postId: string;
  author: {
    _id: string;
    username: string;
  };
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const Comments = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const { isAuthenticated } = useAuthStore();

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${postId}`);
      if (res.data.comments) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleComment = async () => {
    if (!isAuthenticated) return alert("You must be logged in to comment.");
    if (!comment.trim()) return;
    try {
      const res = await axios.post(`/comments/${postId}`, {
        comment,
      });
      if (res.status === 201) {
        setComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="mb-4 font-bold text-2xl">Comments ({comments.length})</h2>

      {isAuthenticated ? (
        <div className="mb-6 flex flex-col items-end">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment..."
            rows={3}
          />
          <button
            onClick={handleComment}
            disabled={!comment.trim()}
            className="bg-blue-500 py-2 px-6 rounded-md text-white font-medium cursor-pointer hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-md text-gray-600 border border-gray-200">
          Please log in to leave a comment.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="font-bold text-gray-800">{c.author?.username || 'Unknown'}</span>
                <span className="ml-3 text-sm text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{c.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
