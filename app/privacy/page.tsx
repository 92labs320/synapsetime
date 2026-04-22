import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SynapseTime",
  description:
    "SynapseTime Privacy Policy. Learn how we handle data, use advertising cookies, and our commitment to GDPR and CCPA compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-[#00FFFF]">Privacy Policy</h1>
        <p className="text-gray-300 mb-8">Last updated: April 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">1. Introduction</h2>
          <p className="mb-4">
            Welcome to SynapseTime. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website synapsetime.net.
          </p>
          <p>
            SynapseTime is a free timezone comparison tool designed for distributed teams and digital nomads. Our core service does not require or collect any personal data from our users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">2. Information We Do Not Collect</h2>
          <p className="mb-4">
            We want to be unequivocally clear: <strong>SynapseTime does not collect, store, or process any personal identifiable information (PII) from its users.</strong> This includes, but is not limited to, your name, email address, IP address, location data, or any other data that could directly identify you.
          </p>
          <p>
            Our service is designed to function entirely without the need for user accounts, logins, or any form of personal data input.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">3. Advertising and Analytics (Third-Party Services)</h2>
          <p className="mb-4">
            While SynapseTime itself does not collect personal data, we utilize third-party services to support and improve our website. These services may collect data as described in their own privacy policies.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-2">
              <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on a user's prior visits to our website or other websites. These advertising cookies enable Google and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:underline">Ads Settings</a>.
            </li>
            <li className="mb-2">
              <strong>Google Analytics:</strong> We use Google Analytics to understand how our website is used and to improve user experience. Google Analytics collects anonymous information such as how often users visit this site, what pages they visit when they do so, and what other sites they used prior to coming to this site. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Google's ability to use and share information collected by Google Analytics about your visits to this site is restricted by the Google Analytics Terms of Service and the Google Privacy Policy. You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies on your browser.
            </li>
          </ul>
          <p className="mt-4">
            Please note that these third-party services operate independently and have their own privacy policies. We encourage you to review their policies for more information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">4. Cookies</h2>
          <p className="mb-4">
            Our website uses cookies primarily for the functionality of Google AdSense and Google Analytics, as described above. Cookies are small text files stored on your device that help improve your browsing experience. You have the option to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Please be aware that disabling cookies may affect the functionality of some parts of our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">5. GDPR and CCPA Compliance</h2>
          <p className="mb-4">
            SynapseTime is committed to complying with global data protection regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-2">
              <strong>GDPR (General Data Protection Regulation):</strong> As we do not collect or process any personal data, our service inherently aligns with the core principles of GDPR regarding data minimization and privacy by design. We aim to provide a service that respects the privacy rights of EU citizens.
            </li>
            <li className="mb-2">
              <strong>CCPA (California Consumer Privacy Act):</strong> Similarly, because SynapseTime does not collect or sell personal information, we are in compliance with the CCPA. California residents using our service can be assured that their personal data is not being collected or shared by SynapseTime.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the contact information provided on our main website.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <Link href="/" className="text-[#00FFFF] hover:underline">
            ← Back to SynapseTime Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
