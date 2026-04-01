import fs from "fs";
import axios from "axios";

// Replace FRONTEND_URL with your actual production UI domain when ready
const FRONTEND_URL = "https://your-production-domain.com";
// Point to wherever your backend will be living (or localhost if doing this pre-deploy)
const BACKEND_URL = "http://localhost:3000/api";

async function generateSitemap() {
  try {
    // 1. Fetch posts (we increase limit so we catch more than just the first 10 posts)
    const res = await axios.get(`${BACKEND_URL}/posts?limit=1000`);
    const posts = res.data.posts;

    // 2. Start building our XML String
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${FRONTEND_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // 3. Loop over your posts and add each to the XML String
    posts.forEach((post) => {
      sitemap += `
  <url>
    <loc>${FRONTEND_URL}/post/${post._id}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += "\n</urlset>";

    // 4. Write it straight securely into the `public` folder
    // Vite will automatically copy anything in public/ straight into your final build!
    fs.writeFileSync("./public/sitemap.xml", sitemap);
    console.log("✅ Sitemap generated successfully in public/sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

generateSitemap();
