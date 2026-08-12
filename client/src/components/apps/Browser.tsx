import React, { useState } from 'react';
import { Search, Home, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

type BrowserView = 'home' | 'search' | 'weather' | 'news' | 'services';

interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
}

export const Browser: React.FC = () => {
  const [currentView, setCurrentView] = useState<BrowserView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('New York');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setCurrentView('search');
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
      );
      const data = await response.json();
      setWeatherData(data.current);
      setCurrentView('weather');
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=demo'
      );
      const data = await response.json();
      setNewsData(data.articles?.slice(0, 5) || []);
      setCurrentView('news');
    } catch (error) {
      // Fallback to mock news if API fails
      setNewsData([
        {
          title: 'Technology News Today',
          description: 'Latest updates in the tech industry',
          source: 'Tech News Daily',
          url: 'https://technewsdaily.com'
        },
        {
          title: 'Global Markets Update',
          description: 'Stock markets show positive momentum',
          source: 'Financial Times',
          url: 'https://ft.com'
        },
        {
          title: 'Science Breakthrough',
          description: 'New discoveries in quantum computing',
          source: 'Science Weekly',
          url: 'https://scienceweekly.com'
        }
      ]);
      setCurrentView('news');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code: number) => {
    const weatherCodes: { [key: number]: string } = {
      0: '☀️ Clear',
      1: '🌤️ Mostly Clear',
      2: '⛅ Partly Cloudy',
      3: '☁️ Overcast',
      45: '🌫️ Foggy',
      48: '🌫️ Depositing Rime Fog',
      51: '🌧️ Light Drizzle',
      61: '🌧️ Slight Rain',
      80: '🌧️ Moderate Rain Showers',
      95: '⛈️ Thunderstorm',
    };
    return weatherCodes[code] || '🌡️ Unknown';
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Toolbar */}
      <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2 flex gap-2 items-center">
        <button className="xp-button p-1 w-6 h-6 flex items-center justify-center text-xs">
          <ArrowLeft size={14} />
        </button>
        <button className="xp-button p-1 w-6 h-6 flex items-center justify-center text-xs">
          <ArrowRight size={14} />
        </button>
        <button className="xp-button p-1 w-6 h-6 flex items-center justify-center text-xs">
          <RotateCw size={14} />
        </button>
        <button
          onClick={() => setCurrentView('home')}
          className="xp-button p-1 w-6 h-6 flex items-center justify-center text-xs"
        >
          <Home size={14} />
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search or enter URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="xp-input flex-1 text-xs"
          />
          <button type="submit" className="xp-button text-xs px-3">
            Search
          </button>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white p-4">
        {currentView === 'home' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#0099CC] mb-4">Curtains XP Browser</h1>
              <p className="text-xs text-gray-600 mb-6">Welcome to the Internet</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={fetchWeather}
                disabled={loading}
                className="xp-button p-4 text-center text-xs disabled:opacity-50"
              >
                <div className="font-bold">🌤️ Weather</div>
                <div className="text-xs mt-1">Real-time weather data</div>
              </button>

              <button
                onClick={fetchNews}
                disabled={loading}
                className="xp-button p-4 text-center text-xs disabled:opacity-50"
              >
                <div className="font-bold">📰 News</div>
                <div className="text-xs mt-1">Latest news feeds</div>
              </button>

              <button
                onClick={() => setCurrentView('services')}
                className="xp-button p-4 text-center text-xs"
              >
                <div className="font-bold">🔗 Google Services</div>
                <div className="text-xs mt-1">Gmail, Drive, Maps</div>
              </button>

              <button
                onClick={() => window.open('https://www.google.com', '_blank')}
                className="xp-button p-4 text-center text-xs"
              >
                <div className="font-bold">🔍 Google</div>
                <div className="text-xs mt-1">Open Google.com</div>
              </button>
            </div>
          </div>
        )}

        {currentView === 'weather' && weatherData && (
          <div className="space-y-4">
            <h2 className="font-bold text-sm mb-4">Weather in {location}</h2>
            <div className="bg-blue-50 p-4 rounded border-2 border-gray-400">
              <div className="text-3xl mb-2">
                {getWeatherDescription(weatherData.weather_code)}
              </div>
              <div className="text-2xl font-bold mb-2">
                {Math.round(weatherData.temperature_2m)}°C
              </div>
              <div className="text-xs text-gray-600">
                Wind Speed: {weatherData.wind_speed_10m} km/h
              </div>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              className="xp-button text-xs"
            >
              Back to Home
            </button>
          </div>
        )}

        {currentView === 'news' && (
          <div className="space-y-4">
            <h2 className="font-bold text-sm mb-4">Latest News</h2>
            {newsData.length > 0 ? (
              <div className="space-y-3">
                {newsData.map((article, idx) => (
                  <div key={idx} className="border-2 border-gray-400 p-3 bg-gray-50">
                    <h3 className="font-bold text-xs mb-1">{article.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{article.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <button
                        onClick={() => window.open(article.url, '_blank')}
                        className="xp-button text-xs px-2"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs">Loading news...</p>
            )}
            <button
              onClick={() => setCurrentView('home')}
              className="xp-button text-xs"
            >
              Back to Home
            </button>
          </div>
        )}

        {currentView === 'services' && (
          <div className="space-y-4">
            <h2 className="font-bold text-sm mb-4">Google Services</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.open('https://mail.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">📧</div>
                <div className="font-bold">Gmail</div>
              </button>
              <button
                onClick={() => window.open('https://drive.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">📁</div>
                <div className="font-bold">Google Drive</div>
              </button>
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">🗺️</div>
                <div className="font-bold">Google Maps</div>
              </button>
              <button
                onClick={() => window.open('https://photos.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">📷</div>
                <div className="font-bold">Google Photos</div>
              </button>
              <button
                onClick={() => window.open('https://calendar.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">📅</div>
                <div className="font-bold">Google Calendar</div>
              </button>
              <button
                onClick={() => window.open('https://docs.google.com', '_blank')}
                className="xp-button p-3 text-center text-xs"
              >
                <div className="text-lg mb-1">📝</div>
                <div className="font-bold">Google Docs</div>
              </button>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              className="xp-button text-xs mt-4"
            >
              Back to Home
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center">
            <p className="text-xs text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
