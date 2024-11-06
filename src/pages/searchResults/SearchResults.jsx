import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const SearchResults = ({ products = [] }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <h2>Search Results for {query}</h2>
      {filteredProducts.length ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

// Define PropTypes for products prop
SearchResults.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Define default props for products
SearchResults.defaultProps = {
  products: [],
};

export default SearchResults;
