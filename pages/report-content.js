import React, { useState } from "react";

const Report_Content = () => {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [reason, setReason] = useState("");
  const [wormhole, setWormhole] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !url || !reason) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Example API call (replace with your real endpoint)
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url, reason, wormhole }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      // Success
      setSuccess(true);
      setEmail("");
      setUrl("");
      setReason("");
      setWormhole("");
    } catch (err) {
      setError(err.message || "Failed to send report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-2 md:p-4">
      <div className="w-full max-w-3xl rounded-lg p-6">
        {/* Heading */}
        <h1 className="text-xl font-semibold mb-4">Report Content</h1>

           {/* Description */}
        <p className="text-gray-700 text-sm mb-4">
          As the team behind Nakedleaks.com, your safety and privacy is our
          top priority. We value freedom of expression but we have zero
          tolerance for illegal content, non-consensual material and child
          sexual abuse material (CSAM). By using our reporting feature, community
          members can easily alert our staff to potentially harmful content.
          Reporting content this way is easy, confidential, and serves to alert
          our team of human moderators to review the identified content or
          comment. Please complete the form below should you be the victim of,
          or come across content that you have personal knowledge of as
          constituting:
        </p>

        {/* Bullet points */}
        <ul className="list-disc ml-6 text-sm text-gray-700 mb-4">
          <li>
            Non-consensual production and/or distribution of your image (e.g.,
            revenge porn, blackmail, exploitation);
          </li>
          <li>
            Content that reveals personally identifiable information (e.g. name,
            address, phone number, IP address);
          </li>
          <li>Any other abusive and/or illegal content</li>
        </ul>

        {/* Notice */}
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded mb-4">
          <strong>⚠️ Read this first before reporting URLs:</strong> Because a
          post/gallery can contain images of multiple individuals, make sure to
          mention the <strong>exact JPG URL</strong> of the image(s) to be
          removed in your message or else we won’t be able to help you. You can
          report multiple JPG URLs in the same report by separating each URL
          with a space.
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-blue-600">(required)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border-[1px] border-gray-300 rounded-md px-3 py-2 text-xs lg:text-sm focus:outline-none font-ariel"
          />
        </div>

        {/* URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reported URL (exact .JPG image URL) <span className="text-blue-600">(required)</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Eg: https://www.Nakedleaks.com/wp-content/uploads/2025/01/example.jpg"
            className="w-full border-[1px] border-gray-300 rounded-md px-3 py-2 text-xs lg:text-sm focus:outline-none font-ariel"
          />
        </div>


        

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why we should take it down <span className="text-blue-600">(required)</span>
          </label>
          <textarea
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Revenge porn, child abuse, illegal content"
            className="w-full border-[1px] border-gray-300 rounded-md px-3 py-2 text-xs lg:text-sm focus:outline-none font-ariel"
          ></textarea>
        </div>

           {/* High Priority Info */}
        <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 text-sm p-3 rounded">
          <p className="mb-2">
            <strong>To give High priority to GENUINE requests:</strong> We
            request you to share one of the following:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Government-issued proof of identity of the person in the pictures.
              (You can blur sensitive information)
            </li>
            <li>
              A selfie with a thumbs-down hand gesture of the person in the
              pictures.
            </li>
          </ul>
          <p className="mb-2">
            You may blur the sensitive information if needed from the Government
            ID proof. For better privacy and security, upload the JPEG or PNG
            image of your ID proof to{" "}
            <a
              href="https://wormhole.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://wormhole.app/
            </a>{" "}
            and share the URL of the image(s) uploaded with us.
          </p>
          <p className="mb-0">
            Please make sure the image is clear and includes the face and the
            gesture to help us verify your identity as soon as possible.
          </p>
          <p className="mt-2">
            <strong>
              Your URL from Identity or Photo uploaded Wormhole.app site
              (Optional - Considered as High priority request)
            </strong>
          </p>
        </div>

        {/* Wormhole (Optional) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wormhole URL (Optional - High priority request)
          </label>
          <input
            type="text"
            value={wormhole}
            onChange={(e) => setWormhole(e.target.value)}
            placeholder="https://wormhole.app/xxxx"
            className="w-full border-[1px] border-gray-300 rounded-md px-3 py-2 text-xs lg:text-sm focus:outline-none font-ariel"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-800 text-white text-sm font-medium py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Report"}
        </button>

        {/* Loading bar */}
        {loading && (
          <div className="mt-4 w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-blue-500 rounded animate-pulse w-full"></div>
          </div>
        )}

        {/* Success message */}
        {success && (
          <p className="mt-4 text-green-600 text-sm">
            ✅ Report submitted successfully! We’ll review it soon.
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-4 text-red-600 text-sm">⚠️ {error}</p>
        )}
      </div>
    </div>
  );
};

export default Report_Content;
