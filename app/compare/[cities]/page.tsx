import { Metadata } from "next";
import { notFound } from "next/navigation";
import citiesData from "@/data/cities.json";

// ---------------------------------------------------------------------------
// Types & Helpers
// ---------------------------------------------------------------------------

interface City {
  name: string;
  country: string;
  timezone: string;
  slug: string;
}

function getCityBySlug(slug: string): City | undefined {
  return (citiesData as City[]).find((c) => c.slug === slug);
}

function getTimezoneOffset(tz: string) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find((p) => p.type === "timeZoneName");
  return offsetPart ? offsetPart.value : "UTC";
}

function calculateOffsetDifference(tz1: string, tz2: string) {
  const now = new Date();
  const date1 = new Date(now.toLocaleString("en-US", { timeZone: tz1 }));
  const date2 = new Date(now.toLocaleString("en-US", { timeZone: tz2 }));
  const diffMs = date1.getTime() - date2.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  return diffHours;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { cities: string };
}): Promise<Metadata> {
  const [slugA, vs, slugB] = params.cities.split("-");
  if (vs !== "vs" || !slugA || !slugB) return { title: "Comparison" };

  const cityA = getCityBySlug(slugA);
  const cityB = getCityBySlug(slugB);

  if (!cityA || !cityB) return { title: "City Not Found" };

  const title = `Heure à ${cityA.name} vs ${cityB.name} : Planificateur & Décalage`;
  const description = `Découvrez le décalage horaire entre ${cityA.name} (${cityA.country}) et ${cityB.name} (${cityB.country}). Planifiez vos réunions au meilleur moment.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://synapsetime.net/compare/${params.cities}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function ComparisonPage({
  params,
}: {
  params: { cities: string };
}) {
  const [slugA, vs, slugB] = params.cities.split("-");

  if (vs !== "vs" || !slugA || !slugB) {
    notFound();
  }

  const cityA = getCityBySlug(slugA);
  const cityB = getCityBySlug(slugB);

  if (!cityA || !cityB) {
    notFound();
  }

  const offsetA = getTimezoneOffset(cityA.timezone);
  const offsetB = getTimezoneOffset(cityB.timezone);
  const diff = calculateOffsetDifference(cityA.timezone, cityB.timezone);

  const absDiff = Math.abs(diff);
  const diffText =
    diff === 0
      ? "sont sur le même fuseau horaire"
      : diff > 0
      ? `${cityA.name} a ${absDiff} heure(s) d'avance sur ${cityB.name}`
      : `${cityA.name} a ${absDiff} heure(s) de retard sur ${cityB.name}`;

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le décalage horaire entre ${cityA.name} et ${cityB.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le décalage horaire entre ${cityA.name} (${offsetA}) et ${cityB.name} (${offsetB}) est de ${absDiff} heure(s). Actuellement, ${diffText}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le meilleur moment pour une réunion entre ${cityA.name} et ${cityB.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le meilleur moment pour une réunion se situe généralement pendant les heures de chevauchement (9h-11h pour la ville la plus à l'ouest). Pour ${cityA.name} et ${cityB.name}, utilisez notre comparateur pour visualiser la grille horaire complète.`,
        },
      },
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {cityA.name} vs {cityB.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comparaison des fuseaux horaires et planificateur de réunion
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">{cityA.name}</h2>
          <p className="text-gray-500 mb-4">{cityA.country}</p>
          <div className="text-3xl font-mono font-bold text-blue-600">
            {offsetA}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">{cityB.name}</h2>
          <p className="text-gray-500 mb-4">{cityB.country}</p>
          <div className="text-3xl font-mono font-bold text-indigo-600">
            {offsetB}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl text-center border border-blue-100 dark:border-blue-800 mb-12">
        <h3 className="text-xl font-bold mb-2">Décalage Horaire</h3>
        <p className="text-lg">{diffText}.</p>
      </div>

      <section className="prose dark:prose-invert max-w-none">
        <h2>Planifiez votre réunion</h2>
        <p>
          Travailler entre <strong>{cityA.name}</strong> et{" "}
          <strong>{cityB.name}</strong> nécessite une coordination précise.
          Utilisez la grille ci-dessous (simulée pour cet exemple) pour trouver
          le créneau idéal qui respecte les heures de sommeil de chacun.
        </p>
        {/* Placeholder for the actual interactive tool component */}
        <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-400">Composant de grille interactive SynapseTime</p>
        </div>
      </section>
    </main>
  );
}
