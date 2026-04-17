import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchPage() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/products/")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p =>
          p.name.toLowerCase().includes((query || "").toLowerCase())
        );
        setProducts(filtered);
      });
  }, [query]);

  return (
    <div>
      <h2>Search: {query}</h2>

      {products.map(p => (
        <div key={p.id}>
          <img
            src={`http://127.0.0.1:8000${p.image}`}
            width="100"
            alt={p.name}
          />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;