import Link from 'next/link';
import { useContext } from 'react';
import videosContext from '../context/videos/videosContext';

function Footer() {
  const context = useContext(videosContext);
  const { spinnerLoading } = context;
  const year = new Date().getFullYear();

 const links = [
  { href: '/about-us', label: 'About Us' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/report-content', label: 'Report Content' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/18-u-s-c-2257', label: '2257 Statement' },
  { href: 'https://theporndude.com/', label: 'ThePornDude' },
];


  return (
    <footer className={`font-footer ${spinnerLoading ? "hidden" : ""} bg-black text-white`}>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold border-b border-pink-500 inline-block pb-1 mb-2">Quick Links</h3>
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <p className="cursor-pointer hover:text-pink-400 transition-colors">{link.label}</p>
            </Link>
          ))}
        </div>

     {/* About / Description */}
<div className="space-y-2 text-gray-300 text-sm">
  <h3 className="text-lg font-semibold border-b border-pink-500 inline-block pb-1 mb-2">About Nakedleaks.com</h3>
  <p className="whitespace-normal break-words">
    © {year} Nakedleaks.com is a free platform to view high-quality Indian porn photos. Explore nudes of amateurs and pornstars, including desi fantasies with bhabhi and aunties.
  </p>
  <p className="whitespace-normal break-words mt-2">
    Content is sourced from the internet and viewer submissions. Share your fantasies, and we may add them to our collection.
  </p>
</div>


        {/* Legal / Disclaimer */}
        <div className="text-gray-400 text-sm flex flex-col justify-start space-y-2">
          <h3 className="text-lg font-semibold border-b border-pink-500 inline-block pb-1 mb-2">Legal & Info</h3>
          <p>
            NakedLeaks is rated with RTA label. Parents, you can easily block access to this site. Please{" "}
            <a
              href="https://www.rtalabel.org/index.php?content=parents"
              className="text-pink-400 underline hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              read
            </a>{" "}
            for more information.
          </p>
          <p className="mt-4">
            Made with ❤️ by Nakedleaks.com Team
          </p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs px-4">
        © {year} Nakedleaks.com - Free Indian porn photos platform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
