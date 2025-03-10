"use client";

import { useEffect, useState } from "react";

interface Match {
  homeTeam: { name: string };
  awayTeam: { name: string };
  status: string;
}

export default function LiveScores() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("https://api.football-data.org/v2/matches?status=LIVE", {
          headers: { "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY as string },
        });
        if (!res.ok) throw new Error("Failed to fetch match data");
        const data = await res.json();
        setMatches(data.matches);
      } catch (err) {
        setError("Impossible de récupérer les scores en direct");
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, []);

  if (loading) return <p>⏳ Chargement...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">⚽ Matchs en Direct</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li key={index} className="mt-2">
              {match.homeTeam.name} 🆚 {match.awayTeam.name} - ⏳ {match.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun match en cours.</p>
      )}
    </div>
  );
}
