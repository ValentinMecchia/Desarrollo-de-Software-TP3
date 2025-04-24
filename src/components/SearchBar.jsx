import "./Styles/SearchBar.css";

function SearchBar({ onSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for an artist..."
                className="search-bar__input"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;