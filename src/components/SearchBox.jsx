import { useState, useEffect } from "react";
import Fuse from "fuse.js";

const baseURL = import.meta.env.PUBLIC_BASE_URL || "";

const generatePostUrl = (baseURL, post) => {
  const { collection, slug } = post;
  if (slug === 'index') {
    return `${baseURL}/${collection}/`;
  } else {
    return `${baseURL}/${collection}/${slug.replace(/\/index$/, '')}/`;
  }
};

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);  // 検索結果を5件表示

  useEffect(() => {
    fetch(`${baseURL}/posts.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("取得したデータ:", data.posts);
        setPosts(data.posts);
      })
      .catch((err) => console.error("データ取得エラー:", err));
  }, []);

  useEffect(() => {
    if (query.trim() === "" && !selectedCategory && !selectedTag) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(posts, {
      keys: ["data.title", "data.description", "body", "data.category", "data.categories", "data.tags"],
      threshold: 0.4,
    });

    const searchResults = query.trim() !== "" ? fuse.search(query).map(result => result.item) : posts;

    const filteredResults = searchResults.filter(post => 
      (!selectedCategory || post.data.category === selectedCategory || post.data.categories?.includes(selectedCategory)) &&
      (!selectedTag || post.data.tags?.includes(selectedTag))
    );

    console.log("🔎 検索結果 (searchResults):", searchResults);
    console.log("🔎 フィルタリング結果 (filteredResults):", filteredResults);
    setResults(filteredResults);
  }, [query, posts, selectedCategory, selectedTag]);

  const allCategories = [...new Set(posts.flatMap(post => [post.data.category, ...(post.data.categories || [])]))];
  const allTags = [...new Set(posts.flatMap(post => post.data.tags || []))];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(results.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search-box">
      <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
      <input
        className="search-input"
        type="text"
        value={query}
        placeholder="キーワードを入力..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          className="clear-button"
          onClick={() => setQuery("")}
          aria-label="Clear input"
        >
          ×
        </button>
      )}
    </div>

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">カテゴリーを選択</option>
        {allCategories.map(category => 
          category && category.trim() !== '' ? (
            <option key={category} value={category}>{category}</option>
          ) : null
        )}
      </select>

      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        <option value="">タグを選択</option>
        {allTags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <ul className={`results-list ${results.length > 0 ? "fade-in" : ""}`}>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <li key={post.slug}>
              <a href={generatePostUrl(baseURL, post)}>
                {post.data.title}
              </a>
              <div>
                <div className="results-description">
                {post.data.description && <span>{post.data.description}</span>}
                </div>
                
                {(post.data.category || post.data.categories) && (
                  <div className="results-category">
                    <span>
                      <i class="material-icons icon-position">inventory</i> カテゴリー: {' '}
                      {post.data.category || post.data.categories.join(' ')}
                    </span>
                  </div>
                )}
                {post.data.tags && (
                  <div className="results-tag">
                    <span>
                      <i class="material-icons icon-position">sell</i> タグ: {post.data.tags.join(' ')}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          (query || selectedCategory || selectedTag) && <li>記事が見つかりません。</li>
        )}
      </ul>

      <div className="search-pagination">
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
