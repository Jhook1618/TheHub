import "./About.css";

// Icons Imports Start
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faTwitter,
  faTiktok,
  faPaypal,
  faBitcoin,
  faCcMastercard,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
// Icons Imports End

const About = () => {
  return (
    // Contacts Heading
    <div className="about-container">
      {/* Contacts Section */}
      <div className="head-contacts">
        <a href="tel:+254796333828" className="a-call">
          <span className="call">
            <FontAwesomeIcon
              icon={faPhone}
              title="Call"
              className="call-icon"
            />{" "}
            +254796333828
          </span>
        </a>
        <a href="mailto:hubtronics.h@gmail.com" className="a-email">
          <span className="email">
            <FontAwesomeIcon
              icon={faEnvelope}
              title="Email"
              className="email-icon"
            />{" "}
            hubtronics.h@gmail.com
          </span>
        </a>
        <a
          href="https://wa.me/254796333828"
          target="_blank"
          rel="noopener noreferre"
          className="a-whatsapp"
        >
          <span className="whatsapp">
            <FontAwesomeIcon
              icon={faWhatsapp}
              title="WhatsApp"
              className="whatsapp-icon"
            />{" "}
            +254796333828
          </span>
        </a>
      </div>
      {/* About Section */}
      <div className="head-titles">
        <span className="heads">About HubTRONICS</span>
        <br />
        <br />
        Welcome to Hubtronics, your one-stop destination for cutting-edge
        electronics, DIY modules, and tech innovation! At Hubtronics, we are
        passionate about bridging the gap between technology enthusiasts and the
        advanced hardware they need to bring ideas to life. Our mission is to
        provide top-quality, affordable electronics that empower innovators,
        hobbyists, and professionals alike.
        <br />
        <br />
        Founded with a vision to support the tech-driven community, Hubtronics
        offers a wide range of products, including high-performance microchips,
        DIY electronics kits, AI-powered components, and much more. We believe
        in making technology accessible and fun, encouraging both beginners and
        experts to explore and create.
        <br />
        <br />
        <span className="heads">Our Commitment to Quality and Innovation</span>
        <br />
        <br />
        Every product in our store is handpicked for quality, durability, and
        performance. We are committed to sourcing only the best materials and
        technologies, ensuring you have reliable tools for any project. From the
        latest processors and modules to unique, hard-to-find components,
        Hubtronics is here to fuel your passion for technology.
        <br />
        <br />
        <span className="heads">Join Our Community</span>
        <br />
        <br />
        Hubtronics isn’t just an electronics store—it’s a community. We offer
        resources, tutorials, and expert support to help you on every step of
        your tech journey. Join us, and let’s innovate together!
        <br />
        <br />
      </div>
      {/* Social & Payment Icons Section */}
      <div className="head-social">
        <div className="social-icons">
          <span className="social">
            <a className="facebook" href="https://www.facebook.com/">
              <FontAwesomeIcon
                icon={faFacebook}
                title="Facebook"
                className="facebook-icon"
              />
            </a>
          </span>
          <span className="social">
            <a className="instagram" href="https://www.instagram.com/">
              <FontAwesomeIcon
                icon={faInstagram}
                title="Instagram"
                className="instagram-icon"
              />
            </a>
          </span>
          <span className="social">
            <a className="X" href="https://x.com/home">
              <FontAwesomeIcon icon={faTwitter} title="X" className="X-icon" />
            </a>
          </span>
          <span className="social">
            <a className="tiktok" href="https://www.tiktok.com/foryou?lang=en">
              <FontAwesomeIcon
                icon={faTiktok}
                title="TikTok"
                className="tiktok-icon"
              />
            </a>
          </span>
        </div>

        {/* Payment Section */}
        <div className="payment-container">
          <span className="method-mpesa">
            <img
              // src="../../assets/logos/M-PESA_LOGO-01.svg.png"
              src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg"
              alt="M-Pesa"
              className="logo-image"
            ></img>{" "}
            M-pesa
          </span>
          <span className="method-dcard">
            <font-icon className="font-icon">
              <FontAwesomeIcon
                icon={faCreditCard}
                title="Debit/Credit Card"
                className="svg-debit"
              />
            </font-icon>
            <text-icon className="text-icon"></text-icon>
          </span>
          <span className="method-mcard">
            <FontAwesomeIcon
              icon={faCcMastercard}
              title="Mastercard"
              className="svg-master"
            />
          </span>
          <span className="method-paypal">
            <FontAwesomeIcon
              icon={faPaypal}
              title="PayPal"
              className="svg-pal"
            />
          </span>
          <span className="method-bitcoins">
            <FontAwesomeIcon
              icon={faBitcoin}
              title="Bitcoin"
              className="svg-bit"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
