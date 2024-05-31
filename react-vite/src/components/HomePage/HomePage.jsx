import { useNavigate } from "react-router-dom"
import "./HomePage.css"

function HomePage() {
  const navigate = useNavigate()

  const toProducts = () => {
    navigate('/products')
  }
  return (
    <div>
      <div>
        <img src="https://fanswapbucket.s3.us-west-1.amazonaws.com/main-image.jpg" alt="" className="home-images" />
        <button className="home-buttons" onClick={toProducts}>
          Check out the Gear!
        </button>
      </div>
      <div>
        <img src="https://fanswapbucket.s3.us-west-1.amazonaws.com/main-image-2.jpg" alt="" className="home-images" />
      </div>
      <button className="home-buttons" onClick={toProducts}>
        Check out the Gear!
      </button>
    </div>

  )
}

export default HomePage
