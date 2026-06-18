const Categories = [
  { id: "all", label: "All Events", icon: "🎯" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "arts", label: "Arts", icon: "🎨" },
  { id: "food", label: "Food", icon: "🍔" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "wellness", label: "Wellness", icon: "🧘" },
];

const Filters = [
  { id: "upcoming", label: "Upcoming" },
  { id: "this-week", label: "This Week" },
  { id: "this-month", label: "This Month" },
  { id: "free", label: "Free Only" },
  { id: "under-50", label: "Under $50" },
  { id: "over-50", label: "$50+" },
];

function FilterBar({ activeCategory, activeFilter, onCategoryClick, onFilterClick, onSort }) {
  return (
    <div className="filters-bar container">
      <div className="category-pills">
        {Categories.map((cat) => (
          <button
            onClick={() => onCategoryClick(cat.id)}
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
      <div className="filters-right">
        {Filters.map((filter) => (
          <button
            onClick={() => onFilterClick(filter.id)}
            key={filter.id}
            className={`btn btn-outline btn-sm ${activeFilter === filter.id ? "active" : ""}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="filters-right">
        <select className="filter-select" onChange={(e) => onSort(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
