export default function Terms() {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">Legal Information</h1>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
            <p className="text-gray-700">
              By using this website, you agree to these terms and conditions. We reserve the right to change these terms at any time. 
              You may use the content on this site for personal, non-commercial use only. We are not responsible for any errors or omissions 
              in the content. We may terminate your access to the site for any reason, at any time. These terms are governed by the laws of 
              your jurisdiction.
            </p>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-gray-700">
              We collect personal information when you use our services. This may include your name, email address, and usage data. 
              We use this information to provide and improve our services. We do not sell your personal information to third parties. 
              We use cookies to enhance your experience on our site. You can opt out of cookies in your browser settings. 
              We take reasonable measures to protect your information, but no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </div>
  
        <div className="mt-8 text-center">
          <a href="/" className="inline-block bg-[#50C878] text-white py-2 px-4 rounded-full no-underline hover:bg-[#50C878] transition-colors">
            Return to Login
          </a>
        </div>
      </div>
    )
  }