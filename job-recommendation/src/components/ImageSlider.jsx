import Slider from "react-slick";
import "./ImageSlider.css";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

function ImageSlider() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="slider-container">
      {images.map((img, index) => (
        <div key={index} className="slide">
          <img src={img} alt={`slide-${index}`} className="slider-image" />
          <div className="slider-overlay">
            <h1 className="app-name">SkillHire</h1>
            <p className="tagline">
              Find the right job. Improve your skills. Grow your career.
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
