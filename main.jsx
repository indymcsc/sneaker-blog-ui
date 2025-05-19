async function fetchNews() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const response = await fetch("https://sneaker-blog-api.onrender.com/api/fetch-sneaker-news");
    const data = await response.json();

    if (!data.posts || !Array.isArray(data.posts)) {
      throw new Error("Invalid response format");
    }

    resultsDiv.innerHTML = "";
    data.posts.forEach(post => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title}" width="300"/>
        <p>${post.content}</p>
        <hr/>
      `;
      resultsDiv.appendChild(div);
    });
  } catch (error) {
    resultsDiv.innerHTML = "Failed to fetch news: " + error.message;
    console.error("Fetch error:", error);
  }
}
