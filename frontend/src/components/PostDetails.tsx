import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const PostDetails = () => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
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
      const res = await axios.put(`http://localhost:3000/api/posts/${id}`, {
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

  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <p className="text-gray-500 text-center">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 container">
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
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
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
              <p className="mb-4 text-gray-600 whitespace-pre-wrap">
                {content}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 p-2 px-4 rounded-md text-white cursor-pointer"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Post not found</p>
      )}
      <div>
        <Link
          to={"/"}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetails;
