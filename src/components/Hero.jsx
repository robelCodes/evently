import { useRef } from 'react'


function Hero({ onSearch }) {
  const inputRef = useRef(null)


  const handleSearch = () => {
    const value = inputRef.current.value.trim()
    onSearch(value)

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleChange = (e) => {
    if (e.target.value === '') {
      onSearch('')
    }
  }


const handleClear = () => {
  inputRef.current.value = ''
  onSearch('')
}


  return (
    <section className="hero">
      <div className="container">
        
        <div className="hero-badge">
          🚀 Over 10,000 events this month
        </div>
       
        <h1>
          Discover Amazing Events <span>Near You</span>
        </h1>
        
        <p className="hero-subtitle">
          Find and book tickets to concerts, festivals, conferences,
          and more. Your next unforgettable experience awaits.
        </p>



        <div className="hero-search">
          <span className="hero-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search events..."
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero


