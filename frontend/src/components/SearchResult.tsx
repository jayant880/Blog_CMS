import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../utils/axios";
import PostCard from "./PostCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await api.get(
          `/posts/search?q=${encodeURIComponent(query)}`,
        );
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h2 className="mb-6 font-bold text-2xl">Search results for: "{query}"</h2>

      {loading ? (
        <p>Loading results...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts matched your search.</p>
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
