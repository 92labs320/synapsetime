import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ---------------------------------------------------------------------------
// Metadata helpers
// ---------------------------------------------------------------------------

interface BlogMeta {
  slug: string;
  title: string;
  description: string;
}

const blogMeta: Record<string, BlogMeta> = {
  "manage-timezone-distributed-team": {
    slug: "manage-timezone-distributed-team",
    title: "Mastering Remote Team Timezone Management for Global Success",
    description:
      "Learn how to implement effective remote team timezone management strategies to keep your distributed workforce aligned and productive.",
  },
  "best-time-meeting-montreal-europe": {
    slug: "best-time-meeting-montreal-europe",
    title: "Finding the Perfect Montreal Europe Meeting Time",
    description:
      "Discover the ideal Montreal Europe meeting time window and practical tips for scheduling successful cross-Atlantic calls.",
  },
  "work-with-asia-team-from-america": {
    slug: "work-with-asia-team-from-america",
    title: "How to Successfully Work with an Asia Team from America",
    description:
      "Practical strategies to work with an Asia team from America across a 12-hour time difference without burning out.",
  },
  "digital-nomad-three-timezones-productivity": {
    slug: "digital-nomad-three-timezones-productivity",
    title: "Maintaining Digital Nomad Time Zones Productivity",
    description:
      "Boost your digital nomad time zones productivity with routines, async communication, and smart scheduling techniques.",
  },
  "remote-work-scheduling-mistakes": {
    slug: "remote-work-scheduling-mistakes",
    title: "3 Common Remote Work Scheduling Mistakes and How to Avoid Them",
    description:
      "Identify the most costly remote work scheduling mistakes and learn how to fix them to build a healthier distributed team.",
  },
};

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const meta = blogMeta[params.slug];
  if (!meta) return {};
  return {
    title: `${meta.title} | SynapseTime Blog`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://synapsetime.net/blog/${meta.slug}`,
      siteName: "SynapseTime",
      type: "article",
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-neutral lg:prose-lg dark:prose-invert">
        <MDXRemote source={source} />
      </article>

      {/* Back to blog link */}
      <div className="mt-12 border-t pt-6">
        <a
          href="/blog"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to all articles
        </a>
      </div>
    </main>
  );
}
