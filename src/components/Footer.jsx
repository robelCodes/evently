import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">Press</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="#">Help Center</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="#">Safety</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Organizers</h4>
            <ul>
              <li>
                <Link to="#">Create Event</Link>
              </li>
              <li>
                <Link to="#">Pricing</Link>
              </li>
              <li>
                <Link to="#">Resources</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="#">Terms</Link>
              </li>
              <li>
                <Link to="#">Privacy</Link>
              </li>
              <li>
                <Link to="#">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p> Developed by Robel Isaias </p>
          <p>© 2026 Evently. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
