import "./CompanyLogos.css";

const CompanyLogos = () => {
  const images = [aiGenV, green, purple, red];

  return (
    <div className="carousel-container2">
      <div className="carousel-track">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
        {/* Duplicate the images to create a seamless loop effect */}
        {images.map((img, index) => (
          <img
            key={`duplicate-${index}`}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogos;
