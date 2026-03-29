import axios from "../utils/axios";
import { useState, useCallback } from "react";
import "easymde/dist/easymde.min.css";
import { useNavigate } from "react-router";
import SimpleMdeReact from "react-simplemde-editor";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts", {
        title,
        content,
      });
      if (res.data.post) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(`/post/${res.data.post._id}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div>
      <h1 className="mb-8 font-bold text-3xl text-center">Create Post</h1>
      {showSuccess && (
        <div className="bg-green-500 p-2 rounded-md text-white">
          Post created successfully
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Title :
          </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            minLength={3}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-medium">
            Content :
          </label>
          <SimpleMdeReact value={content} onChange={onChange} />
        </div>
        <button className="bg-blue-500 p-2 rounded-md text-white">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
