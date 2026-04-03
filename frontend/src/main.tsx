import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { Layout } from "./components/Layout.tsx";

const PostDetails = lazy(() => import("./components/PostDetails.tsx"));
const CreatePost = lazy(() => import("./components/CreatePost.tsx"));
const SearchResults = lazy(() => import("./components/SearchResult.tsx"));
const AuthLayout = lazy(() => import("./components/auth/AuthLayout.tsx"));
const Login = lazy(() => import("./components/auth/Login.tsx"));
const Register = lazy(() => import("./components/auth/Register.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="p-6 text-gray-600 text-center">Loading…</div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/search" element={<SearchResults />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
