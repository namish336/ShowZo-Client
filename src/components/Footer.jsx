import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 pt-20 w-full bg-gray-900 text-gray-400 font-medium">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-700 pb-14">
        <div className="md:max-w-96">
          <img className="w-36 h-auto" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm leading-relaxed">
            ShowZo website is an online platform that is designed to make your movie experience seamless and enjoyable.
             Whether you're looking to book tickets, explore trending films, or discover old ones, create collections, we’ve got you covered.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-bold text-gray-200 mb-5 uppercase tracking-wider text-sm">SAN Corporation</h2>
            <ul className="text-sm space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact us</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-gray-200 mb-5 uppercase tracking-wider text-sm">Get in touch</h2>
            <div className="text-sm space-y-3">
              <p>9015353043</p>
              <p>showzo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-6 text-center text-sm pb-6 text-gray-500">
        Copyright {new Date().getFullYear()} © All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;