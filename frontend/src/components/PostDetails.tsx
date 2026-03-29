import axios from "../utils/axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useAuthStore } from "../store/useAuthStore";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuthStore();

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        if (res.data.post) {
          setTitle(res.data.post.title);
          setContent(res.data.post.content);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await axios.put(`/posts/${id}`, {
        title,
        content,
      });
      if (res.data.post) {
        setEditMode(false);
        setTitle(res.data.post.title);
        setContent(res.data.post.content);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setIsLoading(true);
      const res = await axios.delete(`/posts/${id}`);
      if (res.data.post) {
        console.log("post deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <p className="text-gray-500 text-center">Loading post...</p>
      </div>
    );
  }

  return (
    <div>
      {title ? (
        <div>
          {editMode ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-medium">
                  Title :
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-medium">
                  Content :
                </label>
                <SimpleMdeReact value={content} onChange={onChange} />
              </div>
              <button
                onClick={() => handleSave()}
                className="bg-blue-500 p-2 px-4 rounded-md text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h1 className="mb-4 font-bold text-3xl">{title}</h1>
              <div className="mb-4 text-gray-800 markdown-body prose max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {content}
                </ReactMarkdown>
              </div>
              {isAuthenticated && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-500 p-2 px-4 rounded-md text-white cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="bg-red-500 p-2 px-4 rounded-md text-white cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Post not found</p>
      )}

    </div>
  );
};

export default PostDetails;
