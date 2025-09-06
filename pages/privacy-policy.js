// pages/privacy.js
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | NakedLeaks.com</title>
        <meta
          name="description"
          content="Privacy Policy of NakedLeaks.com – Learn how we collect, use, and protect your data while browsing our adult content site."
        />
      </Head>

      <div className="bg-white text-black px-4 sm:px-6 lg:px-20 py-12 max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Privacy Policy</h1>

        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          This Privacy Policy outlines how <strong>NakedLeaks.com</strong> (hereinafter referred to as “the Site,” “we,” “us,” or “our”) collects, uses, discloses, and protects your personal information. By accessing and using our Site, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy. Please be aware that this Site contains adult content. By accessing this Site, you confirm that you are of legal age in your jurisdiction to view such content.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">1. Who We Are</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          Our website address is <a href="https://www.NakedLeaks.com/" className="text-blue-600 underline">https://www.NakedLeaks.com/</a>.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">2. What Personal Data We Collect and Why We Collect It</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          We collect different types of information from and about you, depending on how you interact with our Site.
        </p>

        <h3 className="text-lg sm:text-xl font-medium mt-4 mb-2">2.1 Comments</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          When visitors leave comments on the Site, we collect the data shown in the comments form, as well as the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the <a href="https://automattic.com/privacy/" className="text-blue-600 underline">Gravatar service</a> to see if you are using it. After approval of your comment, your profile picture (if you have one associated with Gravatar) is visible to the public in the context of your comment.
        </p>

        <h3 className="text-lg sm:text-xl font-medium mt-4 mb-2">2.2 Media</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
        </p>

        <h3 className="text-lg sm:text-xl font-medium mt-4 mb-2">2.3 Contact Forms</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          If you contact us through a contact form, we collect the information you provide in the form, such as your name and email address, to respond to your inquiries.
        </p>

        <h3 className="text-lg sm:text-xl font-medium mt-4 mb-2">2.4 Cookies</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          Our Site uses cookies to enhance your browsing experience and for various functionalities. You can control and manage cookies in your browser settings. Disabling cookies may affect site functionality.
        </p>

        <h3 className="text-lg sm:text-xl font-medium mt-4 mb-2">2.5 Analytics</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          We may use third-party analytics services to collect and analyze information about how visitors use our Site. This helps us improve our Site.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">3. Who We Share Your Data With</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          We may share your personal data with service providers, legal authorities, acquiring entities in business transfers, or third parties with your consent.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4. How Long We Retain Your Data</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          Comment data is retained indefinitely. User profile information is stored in your account. Analytics and contact form submissions are kept for a reasonable period.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">5. What Rights You Have Over Your Data</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          You can request access, erasure, rectification, or object to processing of your personal data by contacting us at the email below.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">6. Where We Send Your Data</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          Visitor comments may be checked through automated spam detection services, which may be located outside of your country of residence.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">7. Your Contact Information</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          For any questions regarding this Privacy Policy or your personal data, contact us at: <a href="mailto:ukdevelopers007@gmail.com" className="text-blue-600 underline">ukdevelopers007@gmail.com</a>.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">8. Additional Information</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          8.1 How We Protect Your Data – We take reasonable measures to protect your personal data.  
          8.2 Data Breach Procedures – We notify authorities and affected individuals if needed.  
          8.3 Third Parties – We may receive data from third-party analytics providers.  
          8.4 Automated Decision Making – Used only for spam detection.  
          8.5 Industry Regulatory Disclosure – We comply with adult content and data privacy laws.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">9. Changes to This Privacy Policy</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the “Last Updated” date. Continued use of the Site after changes constitutes acceptance of the revised policy.
        </p>
      </div>
    </>
  );
}
