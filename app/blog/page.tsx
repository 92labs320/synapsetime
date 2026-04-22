import Link from "next/link";
import { Metadata } from "next";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Blog | SynapseTime — Remote Work & Timezone Tips",
  description:
    "Practical guides on remote team timezone management, cross-continental scheduling, and distributed team productivity from the SynapseTime team.",
  openGraph: {
    title: "SynapseTime Blog",
    description:
      "Practical guides on remote team timezone management, cross-continental scheduling, and distributed team productivity.",
    url: "https://synapsetime.net/blog",
    siteName: "SynapseTime",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Article list
// ---------------------------------------------------------------------------

interface Article {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  readingTime: string;
}

const articles: Article[] = [
  {
    slug: "manage-timezone-distributed-team",
    title: "Mastering Remote Team Timezone Management for Global Success",
    description:
      "Learn how to implement effective remote team timezone management strategies to keep your distributed workforce aligned and productive.",
    keyword: "Remote Team",
    readingTime: "4 min read",
  },
  {
    slug: "best-time-meeting-montreal-europe",
    title: "Finding the Perfect Montreal Europe Meeting Time",
    description:
      "Discover the ideal scheduling window for cross-Atlantic calls and practical tips to make every Montreal–Europe meeting a success.",
    keyword: "Cross-Atlantic",
    readingTime: "4 min read",
  },
  {
    slug: "work-with-asia-team-from-america",
    title: "How to Successfully Work with an Asia Team from America",
    description:
      "Practical strategies to bridge a 12-hour time difference and build a high-performing team across the Pacific.",
    keyword: "Asia–America",
    readingTime: "4 min read",
  },
  {
    slug: "digital-nomad-three-timezones-productivity",
    title: "Maintaining Digital Nomad Time Zones Productivity",
    description:
      "Boost your productivity as a digital nomad by anchoring your routine, mastering async communication, and scheduling smarter.",
    keyword: "Digital Nomad",
    readingTime: "4 min read",
  },
  {
    slug: "remote-work-scheduling-mistakes",
    title: "3 Common Remote Work Scheduling Mistakes and How to Avoid Them",
    description:
      "Identify the most costly scheduling mistakes distributed teams make and learn how to fix them before they damage your culture.",
    keyword: "Scheduling",
    readingTime: "4 min read",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function BlogIndexPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          SynapseTime Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Practical guides on remote work, timezone management, and distributed
          team productivity — written for real teams working across borders.
        </p>
      </header>

      {/* Article grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800"
          >
            {/* Tag + reading time */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                {article.keyword}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {article.readingTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 mb-2 leading-snug">
              {article.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {article.description}
            </p>

            {/* Read more */}
            <span className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              Read article →
            </span>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">
          Ready to simplify your timezone coordination?
        </h2>
        <p className="text-blue-100 mb-6">
          SynapseTime helps distributed teams compare time zones instantly and
          find the perfect meeting window — no mental math required.
        </p>
        <a
          href="https://synapsetime.net"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-150"
        >
          Try SynapseTime for free →
        </a>
      </div>
    </main>
  );
}
