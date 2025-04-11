import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  useEffect(() => {
    setLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)
        setLoading(false)
      })
  }, [])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="container">
      <h2>Product List</h2>

      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
      />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="product-card">
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                  <h3>${product.price}</h3>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>◀</button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>▶</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
