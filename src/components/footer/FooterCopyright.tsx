
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="flex flex-col items-center text-sm text-gray-400">
      <div className="flex flex-col items-center gap-2 mb-4">
        <p>© {currentYear} Locksmith & Security LLC. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span>Made with</span>
        <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
        <span>by</span>
        <a 
          href="https://gettmarketing.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Gett Marketing
        </a>
      </div>
    </div>
  );
};

export default FooterCopyright;
