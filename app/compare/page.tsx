import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparateur de Fuseaux Horaires | SynapseTime",
  description:
    "Comparez l'heure entre les plus grandes villes du monde. Planifiez vos réunions internationales sans erreur de calcul.",
};

const popularCombinations = [
  { a: "London", b: "New York", slug: "london-vs-new-york" },
  { a: "Paris", b: "Dubai", slug: "paris-vs-dubai" },
  { a: "Tokyo", b: "Los Angeles", slug: "tokyo-vs-los-angeles" },
  { a: "Montreal", b: "Paris", slug: "montreal-vs-paris" },
  { a: "Singapore", b: "Sydney", slug: "singapore-vs-sydney" },
  { a: "New York", b: "Tokyo", slug: "new-york-vs-tokyo" },
  { a: "London", b: "Dubai", slug: "london-vs-dubai" },
  { a: "Berlin", b: "Shanghai", slug: "berlin-vs-shanghai" },
  { a: "Toronto", b: "London", slug: "toronto-vs-london" },
  { a: "Mexico City", b: "Madrid", slug: "mexico-city-vs-madrid" },
  { a: "Lagos", b: "London", slug: "lagos-vs-london" },
  { a: "Mumbai", b: "New York", slug: "mumbai-vs-new-york" },
  { a: "Hong Kong", b: "Singapore", slug: "hong-kong-vs-singapore" },
  { a: "Seoul", b: "San Francisco", slug: "seoul-vs-san-francisco" },
  { a: "Sao Paulo", b: "Lisbon", slug: "sao-paulo-vs-lisbon" },
  { a: "Chicago", b: "London", slug: "chicago-vs-london" },
  { a: "Dubai", b: "Mumbai", slug: "dubai-vs-mumbai" },
  { a: "Sydney", b: "Auckland", slug: "sydney-vs-auckland" },
  { a: "Cairo", b: "Paris", slug: "cairo-vs-paris" },
  { a: "Moscow", b: "Berlin", slug: "moscow-vs-berlin" },
  { a: "Los Angeles", b: "New York", slug: "los-angeles-vs-new-york" },
  { a: "Vancouver", b: "Toronto", slug: "vancouver-vs-toronto" },
  { a: "Bangkok", b: "Singapore", slug: "bangkok-vs-singapore" },
  { a: "Jakarta", b: "Tokyo", slug: "jakarta-vs-tokyo" },
  { a: "Istanbul", b: "London", slug: "istanbul-vs-london" },
  { a: "Madrid", b: "Buenos Aires", slug: "madrid-vs-buenos-aires" },
  { a: "Johannesburg", b: "London", slug: "johannesburg-vs-london" },
  { a: "Delhi", b: "Dubai", slug: "delhi-vs-dubai" },
  { a: "Manila", b: "Los Angeles", slug: "manila-vs-los-angeles" },
  { a: "Melbourne", b: "London", slug: "melbourne-vs-london" },
  { a: "Amsterdam", b: "New York", slug: "amsterdam-vs-new-york" },
  { a: "Zurich", b: "Singapore", slug: "zurich-vs-singapore" },
  { a: "Frankfurt", b: "Hong Kong", slug: "frankfurt-vs-hong-kong" },
  { a: "Milan", b: "New York", slug: "milan-vs-new-york" },
  { a: "Barcelona", b: "London", slug: "barcelona-vs-london" },
  { a: "Stockholm", b: "San Francisco", slug: "stockholm-vs-san-francisco" },
  { a: "Oslo", b: "New York", slug: "oslo-vs-new-york" },
  { a: "Copenhagen", b: "London", slug: "copenhagen-vs-london" },
  { a: "Helsinki", b: "Tokyo", slug: "helsinki-vs-tokyo" },
  { a: "Dublin", b: "New York", slug: "dublin-vs-new-york" },
  { a: "Lisbon", b: "London", slug: "lisbon-vs-london" },
  { a: "Warsaw", b: "Chicago", slug: "warsaw-vs-chicago" },
  { a: "Prague", b: "London", slug: "prague-vs-london" },
  { a: "Budapest", b: "Paris", slug: "budapest-vs-paris" },
  { a: "Athens", b: "Dubai", slug: "athens-vs-dubai" },
  { a: "Tel Aviv", b: "New York", slug: "tel-aviv-vs-new-york" },
  { a: "Seattle", b: "Tokyo", slug: "seattle-vs-tokyo" },
  { a: "Austin", b: "London", slug: "austin-vs-london" },
  { a: "Miami", b: "Madrid", slug: "miami-vs-madrid" },
  { a: "Atlanta", b: "Paris", slug: "atlanta-vs-paris" },
];

export default function CompareHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Comparaisons Populaires</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Accédez rapidement aux décalages horaires entre les hubs mondiaux les
          plus actifs.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {popularCombinations.map((combo) => (
          <Link
            key={combo.slug}
            href={`/compare/${combo.slug}`}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 transition-all text-center font-medium"
          >
            {combo.a} <span className="text-gray-400 mx-1">vs</span> {combo.b}
          </Link>
        ))}
      </div>

      <section className="mt-20 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Pourquoi comparer les fuseaux horaires ?</h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-400">
          <p>
            Dans un monde de travail distribué, la gestion du temps est le
            premier défi. Une erreur de calcul peut mener à une réunion manquée
            ou, pire, à réveiller un collaborateur en pleine nuit.
          </p>
          <p>
            SynapseTime automatise ces calculs pour vous. Nos pages de
            comparaison vous donnent non seulement l'heure actuelle, mais aussi
            les meilleurs créneaux de réunion basés sur les standards du travail
            remote.
          </p>
        </div>
      </section>
    </main>
  );
}
