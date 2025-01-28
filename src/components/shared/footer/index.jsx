import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">PulsePoint</h3>
          <p className="text-gray-400">
            Your ultimate destination for fitness and wellness. Join us to
            achieve your health goals with state-of-the-art facilities and
            expert guidance.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/classes" className="text-gray-400 hover:text-white">
                Classes
              </a>
            </li>
            <li>
              <a href="/membership" className="text-gray-400 hover:text-white">
                Membership
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">
                123 Fitness St, Gym City, GC 12345
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">info@pulsepoint.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} PulsePoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
