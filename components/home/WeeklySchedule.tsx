'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ScheduleAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  broadcast?: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string?: string | null;
  };
  type: string;
  score?: number;
  episodes?: number;
  status?: string;
  airing?: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklySchedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, ScheduleAnime[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('Tuesday');

  useEffect(() => {
    async function fetchSchedule() {
      try {
        console.log('🔄 Starting schedule fetch...');
        let allAnime: ScheduleAnime[] = [];
        
        // Try fetching from schedules endpoint
        try {
          console.log('📡 Fetching from schedules endpoint...');
          const response = await fetch('https://api.jikan.moe/v4/schedules', {
            cache: 'no-store'
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
              allAnime = data.data;
              console.log('✅ Schedules API success:', allAnime.length, 'anime found');
              console.log('📊 Sample:', allAnime.slice(0, 2).map(a => ({
                title: a.title,
                day: a.broadcast?.day
              })));
            }
          } else {
            console.log('⚠️ Schedules endpoint failed with status:', response.status);
          }
        } catch (err) {
          console.log('⚠️ Schedules API error:', err);
        }
        
        // Fallback: Fetch current season
        if (allAnime.length === 0) {
          console.log('🔄 Trying fallback: seasons/now...');
          try {
            const response = await fetch('https://api.jikan.moe/v4/seasons/now', {
              cache: 'no-store'
            });
            if (response.ok) {
              const data = await response.json();
              if (data.data && Array.isArray(data.data)) {
                allAnime = data.data;
                console.log('✅ Season API success:', allAnime.length, 'anime found');
                console.log('📊 Sample:', allAnime.slice(0, 2).map(a => ({
                  title: a.title,
                  day: a.broadcast?.day,
                  airing: a.airing
                })));
              }
            }
          } catch (err) {
            console.log('❌ Season API error:', err);
          }
        }
        
        // If we still have no items with a broadcast day, fetch per-day endpoints
        if (allAnime.filter(a => a.broadcast?.day).length === 0) {
          console.log('🧭 No broadcast days found yet. Trying per-day endpoints...');
          const dayResults: ScheduleAnime[] = [];
          for (const d of DAYS) {
            try {
              // Jikan rate limit ~3 rps
              await new Promise(res => setTimeout(res, 350));
              const res = await fetch(`https://api.jikan.moe/v4/schedules?filter=${d.toLowerCase()}`, {
                cache: 'no-store',
              });
              if (res.ok) {
                const json = await res.json();
                const items: ScheduleAnime[] = Array.isArray(json?.data) ? json.data : [];
                console.log(`✅ ${d}:`, items.length, 'items');
                dayResults.push(...items);
              } else {
                console.log(`⚠️ Failed ${d} endpoint with ${res.status}`);
              }
            } catch (e) {
              console.log(`❌ Error fetching ${d}:`, e);
            }
          }
          if (dayResults.length > 0) {
            allAnime = dayResults;
            console.log('🟢 Per-day fallback total:', allAnime.length);
          }
        }

        // Group by day
        const grouped: Record<string, ScheduleAnime[]> = {};
        DAYS.forEach(day => { grouped[day] = []; });
        
        console.log('🔍 Processing', allAnime.length, 'anime...');
        
        allAnime.forEach((anime: ScheduleAnime) => {
          const broadcastDay = anime.broadcast?.day;
          
          if (broadcastDay) {
            // Normalize day name: "Mondays" -> "Monday", "monday" -> "Monday"
            let normalizedDay = broadcastDay.replace(/s$/i, ''); // Remove trailing 's'
            normalizedDay = normalizedDay.charAt(0).toUpperCase() + normalizedDay.slice(1).toLowerCase();
            
            if (grouped[normalizedDay]) {
              grouped[normalizedDay].push(anime);
            }
          }
        });
        
        console.log('📋 Before filtering:', Object.entries(grouped).map(([day, animes]) => `${day}:${animes.length}`).join(' | '));
        
        // Sort by score and limit to 9 per day for 3x3 grid
        Object.keys(grouped).forEach(day => {
          grouped[day] = grouped[day]
            .sort((a, b) => {
              // Prioritize anime with scores
              const scoreA = a.score || 0;
              const scoreB = b.score || 0;
              return scoreB - scoreA;
            })
            .slice(0, 9);
        });
        
        console.log('� Final grouped data:', 
          Object.entries(grouped).map(([day, animes]) => `${day}:${animes.length}`).join(' | ')
        );
        
        setScheduleData(grouped);
      } catch (error) {
        console.error('❌ Fatal error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] uppercase tracking-wide">
          Weekly Schedule
        </h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex gap-3 mb-4">
            {DAYS.map((_, i) => (
              <div key={i} className="h-10 w-24 bg-[#1a1a1a] rounded-md animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-48 bg-[#1a1a1a] rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Days Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-all border ${
                  selectedDay === day
                    ? 'bg-[#10b981] text-black border-[#10b981]'
                    : 'bg-transparent text-gray-300 border-gray-600 hover:border-[#10b981] hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Grid Layout for Selected Day */}
          {DAYS.map((day) => {
            const dayAnime = scheduleData[day] || [];
            
            if (selectedDay !== day) return null;
            
            if (dayAnime.length === 0) {
              return (
                <div key={day} className="text-center py-12">
                  <p className="text-gray-400 text-lg">No anime scheduled for {day}</p>
                  <p className="text-gray-600 text-sm mt-2">Check other days</p>
                </div>
              );
            }

            return (
              <div key={day} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayAnime.map((anime) => {
                  const displayTitle = anime.title_english || anime.title;
                  const japaneseTitle = anime.title_japanese || anime.title;
                  
                  return (
                    <Link
                      key={anime.mal_id}
                      href={`/anime/${anime.mal_id}`}
                      className="bg-[#1a1a1a] rounded-lg p-3 hover:bg-[#252525] transition-all group border border-[#2a2a2a] hover:border-[#10b981]"
                    >
                      <div className="flex gap-3">
                        {/* Anime Poster */}
                        <div className="relative w-20 h-28 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                            alt={displayTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        </div>

                        {/* Anime Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          {/* Title */}
                          <div>
                            <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#10b981] transition-colors mb-1">
                              {displayTitle}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                              {japaneseTitle}
                            </p>
                          </div>

                          {/* Time and Type */}
                          <div className="space-y-1">
                            {anime.broadcast?.time && (
                              <p className="text-xs text-gray-400">
                                Time: <span className="text-white font-medium">{anime.broadcast.time}</span>
                              </p>
                            )}
                            <p className="text-xs text-gray-400">
                              Type: <span className="text-white font-medium">{anime.type}</span>
                            </p>
                            {anime.score ? (
                              <p className="text-xs font-semibold text-[#10b981]">
                                Score: {anime.score.toFixed(1)}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Score: N/A
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}

          {/* No Data Message for All Days (only if truly empty) */}
          {Object.values(scheduleData).length > 0 && Object.values(scheduleData).every(day => day.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No anime schedule available at the moment</p>
              <p className="text-gray-600 text-sm mt-2">Please check back later</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
