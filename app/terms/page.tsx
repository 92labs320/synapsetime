import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SynapseTime",
  description:
    "SynapseTime Terms of Service. Understand your rights and responsibilities when using our free timezone comparison tool.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-[#00FFFF]">Terms of Service</h1>
        <p className="text-gray-300 mb-8">Last updated: April 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using SynapseTime (synapsetime.net), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">2. Permitted Use</h2>
          <p className="mb-4">
            SynapseTime is provided as a free tool for personal and commercial use. You are welcome to use our service to compare time zones for your personal scheduling needs, as well as for business-related activities within your team or organization. You may not reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">3. Disclaimer of Warranties and Accuracy</h2>
          <p className="mb-4">
            SynapseTime is provided on an "as is" and "as available" basis. While we strive to provide accurate and up-to-date timezone information, we make no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of any information on this website. Time zone data, especially concerning daylight saving changes, can be complex and subject to change. Therefore, we cannot guarantee the absolute precision of the times displayed.
          </p>
          <p>
            You acknowledge that any reliance on the material or information on this website is at your own risk. We recommend cross-referencing critical scheduling decisions with other reliable sources.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">4. Intellectual Property</h2>
          <p className="mb-4">
            The SynapseTime website, its original content, features, and functionality are and will remain the exclusive property of <strong>92labs</strong> and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of 92labs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">5. Limitation of Liability</h2>
          <p>
            In no event shall 92labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Country/State, e.g., France], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us via the contact information provided on our main website.
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
