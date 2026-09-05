import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "https://post-manager-fullstack-1.onrender.com";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: token,
      },
    };
  };

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      setError("");

      const response = await axios.get(`${API_URL}/api/posts`, getAuthConfig());

      setPosts(response.data);
    } catch (error) {
      console.error("Fetch Posts Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setError(error.response?.data?.message || "Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // CREATE / UPDATE POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editingId) {
        const response = await axios.put(
          `${API_URL}/api/posts/${editingId}`,
          {
            title: title.trim(),
            content: content.trim(),
          },
          getAuthConfig(),
        );

        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post._id === editingId ? response.data : post,
          ),
        );

        setEditingId(null);
      } else {
        const response = await axios.post(
          `${API_URL}/api/posts`,
          {
            title: title.trim(),
            content: content.trim(),
          },
          getAuthConfig(),
        );

        setPosts((currentPosts) => [response.data, ...currentPosts]);
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Save Post Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // EDIT POST
  const handleEdit = (post) => {
    setEditingId(post._id);
    setTitle(post.title);
    setContent(post.content);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE POST
  const handleDelete = async (id) => {
    try {
      setError("");

      await axios.delete(`${API_URL}/api/posts/${id}`, getAuthConfig());

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== id),
      );
    } catch (error) {
      console.error("Delete Post Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setError(error.response?.data?.message || "Failed to delete post");
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
  };

  return (
    <>
      <Navbar />

      <main style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Dashboard</h1>

          <p style={styles.subtitle}>Manage your posts from one place.</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <section style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {editingId ? "Edit Post" : "Create New Post"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />

            <textarea
              placeholder="Write your content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              required
            />

            <div style={styles.formActions}>
              <button
                type="submit"
                style={{
                  ...styles.primaryButton,
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Post"
                    : "Create Post"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section style={styles.postsSection}>
          <div style={styles.postsHeader}>
            <h2 style={styles.postsTitle}>Your Posts</h2>

            <span style={styles.count}>
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div style={styles.empty}>
              <h3>No posts yet</h3>
              <p>Create your first post above.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {posts.map((post) => (
                <article key={post._id} style={styles.postCard}>
                  <h3 style={styles.postTitle}>{post.title}</h3>

                  <p style={styles.postContent}>{post.content}</p>

                  <div style={styles.actions}>
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(post._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  header: {
    marginBottom: "30px",
  },

  heading: {
    margin: 0,
    fontSize: "36px",
    color: "#111",
  },

  subtitle: {
    marginTop: "8px",
    color: "#666",
    fontSize: "16px",
  },

  error: {
    background: "#ffeaea",
    color: "#c00",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ffcaca",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #e5e5e5",
    marginBottom: "40px",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#111",
  },

  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "12px",
    boxSizing: "border-box",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "15px",
    boxSizing: "border-box",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "Arial, Helvetica, sans-serif",
    outline: "none",
  },

  formActions: {
    display: "flex",
    gap: "10px",
  },

  primaryButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  cancelButton: {
    background: "#eee",
    color: "#111",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  postsSection: {
    marginTop: "20px",
  },

  postsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  postsTitle: {
    margin: 0,
    color: "#111",
  },

  count: {
    background: "#eee",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "#333",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  postCard: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "14px",
    padding: "20px",
  },

  postTitle: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#111",
    fontSize: "20px",
  },

  postContent: {
    color: "#555",
    lineHeight: "1.6",
    minHeight: "60px",
    whiteSpace: "pre-wrap",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  editButton: {
    background: "#eee",
    color: "#111",
    border: "none",
    padding: "9px 15px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  deleteButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "50px 20px",
    background: "#fafafa",
    borderRadius: "14px",
    border: "1px solid #eee",
  },
};

export default Dashboard;
