import { useNavigate } from "react-router-dom"
import fanSwap from "./fanswap-skinny.png"
import fanSwap2 from "./fanswap-final.png"
import draftQueens2 from "./draft-queens-skinny.png"
import "./HomePage.css"

function HomePage() {
  const navigate = useNavigate()

  const toProducts = (e) => {
    e.preventDefault()
    navigate('/products')
  }

  const toHats = (e) => {
    e.preventDefault()
    navigate("/products/category/1")
  }
  return (
    <div className="home-main-container">
      <a href="https://draft-queens.onrender.com/" target="_blank">
        <img src={draftQueens2} alt="" className="advert" />
      </a>
      <div className="home-sub-container">
        <img src="https://fanswapbucket.s3.us-west-1.amazonaws.com/main-image.jpg" alt="" className="home-images" />
        <button className="home-buttons" onClick={toProducts}>
          Check out the Gear!
        </button>
      </div>
      <div className="home-sub-container">
        <img src="https://fanswapbucket.s3.us-west-1.amazonaws.com/main-image-2.jpg" alt="" className="home-images" />
        <button className="home-buttons" onClick={toHats}>
          Check out the Hats!
        </button>
      </div>
      <div className="advert">
        <img src={fanSwap2} alt="" onClick={toProducts} />
      </div>
    </div>

  )
}

export default HomePage
