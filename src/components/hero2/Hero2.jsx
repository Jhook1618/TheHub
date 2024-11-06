import "./Hero2.css";

// Image Imports Start
import aiGenV from "../../assets/images/vImages/aiGenvertical.jpg";
import green from "../../assets/images/vImages/green.jpg";
import purple from "../../assets/images/vImages/purple.jpg";
import red from "../../assets/images/vImages/red.jpg";
import greeny from "../../assets/images/vImages/greeny.jpg";
import mchiB from "../../assets/images/vImages/mchipBoard.jpg";
import neonimg from "../../assets/images/vImages/neonimg.jpg";
import neonM from "../../assets/images/vImages/neonMboard.jpg";
import redder from "../../assets/images/vImages/redder.jpg";
import violet from "../../assets/images/vImages/violet.jpg";
import vmore from "../../assets/images/vImages/vmore.jpg";
import yellow from "../../assets/images/vImages/yellow.jpg";
// Image Imports End

const Hero2 = () => {
  const images = [
    {
      id: 1,
      img: aiGenV,
      name: "AI Generated",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 2,
      img: green,
      name: "Green",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 3,
      img: greeny,
      name: "Greeny",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 4,
      img: mchiB,
      name: "Microchip",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 5,
      img: neonimg,
      name: "Neon Image",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 6,
      img: neonM,
      name: "Neon Mother Board",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 7,
      img: purple,
      name: "Purple",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 8,
      img: red,
      name: "Red",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 9,
      img: redder,
      name: "AI Generated",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 10,
      img: violet,
      name: "Violet",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 11,
      img: vmore,
      name: "More Violet",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
    {
      id: 12,
      img: yellow,
      name: "Yellow",
      description: "Next gen AI Processing unit",
      price: "500.00",
      availability: "In Stock",
    },
  ];

  return (
    <div className="grid-container">
      {images.map((item, index) => (
        <div key={item.id} className="grid-item">
          <img
            src={item.img}
            alt={`Image ${index + 1}`}
            className="grid-image"
          />
          <div className="item-info">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-description">{item.description}</p>
            <p className="item-price">Ksh.{item.price}</p>
            <p className="item-availability">{item.availability}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero2;
