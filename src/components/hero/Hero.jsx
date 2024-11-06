import "./Hero.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Image Imports Start
import bluePic from "../../assets/images/bluePic.jpg";
import board from "../../assets/images/board.avif";
import city from "../../assets/images/city.jpg";
import dark from "../../assets/images/darkImg.jpg";
import intel from "../../assets/images/intel.jpg";
import orange from "../../assets/images/orange.jpg";
import yellowHol from "../../assets/images/yellowHol.jpg";
import neonB from "../../assets/images/neonBoard.jpg";
import esp from "../../assets/images/esp.jpg";
// Image Imports end

const Hero = () => {
  const banners = [
    bluePic,
    board,
    city,
    dark,
    intel,
    orange,
    yellowHol,
    neonB,
    esp,
  ];

  return (
    <div className="carousel-container">
      <p className="carousel-text">
        Welcome to &nbsp;<span className="hub1">Hub</span>
        <span className="tronics1">TRONICS</span>
        <br />
        Home of Innovation
      </p>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
