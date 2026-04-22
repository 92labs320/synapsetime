import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SynapseTime",
  description:
    "Learn about SynapseTime, a minimalist timezone comparison tool designed for distributed teams and digital nomads.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-[#00FFFF]">About SynapseTime</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">Our Mission</h2>
          <p className="mb-4">
            In an increasingly globalized world, distributed teams and digital nomads face the constant challenge of coordinating across multiple time zones. SynapseTime was born out of a simple necessity: to provide a minimalist, efficient, and free tool that eliminates the guesswork from international scheduling.
          </p>
          <p>
            We believe that managing time differences shouldn't be a barrier to seamless collaboration. Our mission is to empower remote workers and global teams to connect effortlessly, ensuring that every meeting, every deadline, and every interaction is perfectly timed, no matter where you are on the planet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">Designed for Clarity and Simplicity</h2>
          <p className="mb-4">
            SynapseTime stands apart with its commitment to a clean, intuitive user experience. We focus on delivering precise time comparisons without unnecessary clutter. Our design philosophy embraces a <strong>Tech-Noir</strong> aesthetic, blending a dark, sophisticated interface with vibrant, functional accents to create a tool that is both powerful and visually striking.
          </p>
          <p>
            We understand that your time is valuable. That's why SynapseTime is built to be fast, responsive, and incredibly easy to use, allowing you to find the information you need in seconds.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">For Distributed Teams and Digital Nomads</h2>
          <p className="mb-4">
            Whether you're a project manager orchestrating a global team, a freelancer working with international clients, or a digital nomad exploring new horizons, SynapseTime is your essential companion. We help you:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4">
            <li>Quickly compare current times in multiple cities.</li>
            <li>Identify optimal meeting windows that suit everyone.</li>
            <li>Avoid scheduling conflicts and missed connections.</li>
            <li>Maintain productivity and work-life balance across time zones.</li>
          </ul>
          <p>
            SynapseTime is a testament to the power of simplicity in solving complex problems. It's the tool we wished we had, built for you.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#00FFFF]">Ready to simplify your global coordination?</h2>
          <Link
            href="/"
            className="inline-block bg-[#00FFFF] text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-colors duration-200"
          >
            Go to SynapseTime
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <Link href="/" className="text-[#00FFFF] hover:underline">
            ← Back to SynapseTime Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
