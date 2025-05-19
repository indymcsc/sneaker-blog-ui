const App = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const res = await fetch("/api/fetch-sneaker-news");
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  };

  const publishPost = async (post) => {
    const res = await fetch("/api/publish-blog-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📰 Sneaker Blog Publisher</h1>
      <button onClick={fetchNews} disabled={loading}>
        {loading ? "Loading..." : "Fetch Latest Sneaker News"}
      </button>
      <div style={{ marginTop: "2rem" }}>
        {posts.map((post, idx) => (
          <div key={idx} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
            <h2>{post.title}</h2>
            <img src={post.image} alt="Sneaker" style={{ width: "100%", maxWidth: "400px" }} />
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{post.content}</pre>
            <button onClick={() => publishPost(post)} style={{ marginTop: "1rem" }}>Publish</button>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);