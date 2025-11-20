import React, { useState } from 'react';
import { View, Place, OfficialAlert } from './types';
import { Navbar } from './components/Navbar';
import { ChatAssistant } from './components/ChatAssistant';
import { MessageCircle, MapPin, Star, ShieldCheck, AlertTriangle, Bus } from 'lucide-react';

// --- Mock Data Constants ---
const TOURIST_SPOTS: Place[] = [
  { id: '1', name: 'Hospicio Cabañas', category: 'Culture', description: 'UNESCO World Heritage site featuring Orozco murals.', image: 'https://picsum.photos/800/600?random=1', rating: 4.9 },
  { id: '2', name: 'Tlaquepaque Centro', category: 'Culture', description: 'Historic center famous for pottery, mariachi, and walking streets.', image: 'https://picsum.photos/800/600?random=2', rating: 4.8 },
  { id: '3', name: 'Karnes Garibaldi', category: 'Food', description: 'Guinness record for fastest service. Famous for Carne en su Jugo.', image: 'https://picsum.photos/800/600?random=3', rating: 4.7 },
  { id: '4', name: 'Estadio Akron', category: 'Culture', description: 'Home of Chivas and 2026 World Cup Venue.', image: 'https://picsum.photos/800/600?random=4', rating: 5.0 },
];

const ALERTS: OfficialAlert[] = [
  { id: '1', type: 'info', title: 'Fan Fest Location', message: 'Official FIFA Fan Fest will be held at Parque Avila Camacho.', date: '2026-06-10' },
  { id: '2', type: 'transport', title: 'Mi Macro Traffic', message: 'Heavy traffic expected on Periférico Sur due to match day arrival.', date: '2026-06-11' },
  { id: '3', type: 'warning', title: 'Heat Advisory', message: 'Temperatures reaching 32°C today. Stay hydrated.', date: '2026-06-11' },
];

// --- Sub-Views ---

const HomeView = ({ onOpenChat }: { onOpenChat: () => void }) => (
  <div className="space-y-8 pb-24">
    {/* Hero Section */}
    <div className="relative h-[500px] w-full overflow-hidden rounded-b-[3rem] shadow-2xl">
      <img src="https://picsum.photos/1920/1080?random=10" alt="Estadio Akron" className="w-full h-full object-cover brightness-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
        <div className="max-w-3xl mx-auto w-full">
          <span className="inline-block px-3 py-1 bg-mexico-red text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Host City</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight">Guadalajara <span className="text-mexico-green">2026</span></h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">Experience the passion of Mexico. Culture, football, and tradition await.</p>
          <button 
            onClick={onOpenChat}
            className="bg-white text-mexico-green font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition flex items-center w-fit gap-2"
          >
            <MessageCircle size={20} />
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { title: 'Tickets', icon: '🎟️' },
        { title: 'Transport', icon: '🚆' },
        { title: 'Hotels', icon: '🏨' },
        { title: 'Emergency', icon: '🆘' }
      ].map((action, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition cursor-pointer group">
          <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</span>
          <span className="font-semibold text-gray-700">{action.title}</span>
        </div>
      ))}
    </div>

    {/* Featured Spots */}
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending in GDL</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOURIST_SPOTS.map(spot => (
          <div key={spot.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100">
            <div className="h-40 overflow-hidden">
              <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{spot.name}</h3>
                <span className="flex items-center text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <Star size={10} className="mr-1 fill-current" /> {spot.rating}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{spot.description}</p>
              <button className="text-mexico-red text-sm font-semibold hover:underline flex items-center">
                Learn more <MapPin size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GuideView = () => (
  <div className="pt-24 px-4 max-w-7xl mx-auto pb-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Guadalajara</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">From the historic streets of Centro to the modern districts of Andares. Use our AI Chatbot to generate personalized itineraries.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-mexico-green">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-green-100 p-2 rounded-full mr-3 text-mexico-green">🌮</span> 
          Gastronomy
        </h3>
        <p className="text-gray-600 mb-4">Guadalajara is the heart of Mexican cuisine. Don't miss:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-red rounded-full mr-3"></div>Tortas Ahogadas (Drowned sandwiches)</li>
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-red rounded-full mr-3"></div>Birria (Spicy goat stew)</li>
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-red rounded-full mr-3"></div>Tequila (From the nearby town of Tequila)</li>
        </ul>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-mexico-red">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-red-100 p-2 rounded-full mr-3 text-mexico-red">🎸</span> 
          Culture & History
        </h3>
        <p className="text-gray-600 mb-4">Immerse yourself in the traditions of Jalisco:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-green rounded-full mr-3"></div>Mariachi Music (Plaza de los Mariachis)</li>
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-green rounded-full mr-3"></div>Hospicio Cabañas</li>
          <li className="flex items-center text-gray-700"><div className="w-2 h-2 bg-mexico-green rounded-full mr-3"></div>Expiatorio Temple</li>
        </ul>
      </div>
    </div>
  </div>
);

const StadiumView = () => (
  <div className="pt-24 px-4 max-w-7xl mx-auto pb-24">
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl mb-8">
      <div className="h-64 md:h-96 relative">
        <img src="https://picsum.photos/1200/600?stadium" alt="Estadio Akron" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
          <h2 className="text-4xl font-bold text-white">Estadio Akron</h2>
          <p className="text-gray-200 flex items-center gap-2"><MapPin size={18} /> Zapopan, Jalisco</p>
        </div>
      </div>
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Match Day Guide</h3>
            <p className="text-gray-600 mb-6">
              Known as "El Volcán de la Pasión", Estadio Akron is a modern marvel. 
              Ensure you arrive at least 3 hours before kickoff. Public transport (Mi Macro) is recommended as parking is limited.
            </p>
            <h4 className="font-bold text-lg mb-3">Upcoming Matches (Mock)</h4>
            <div className="space-y-3">
              {[
                { date: 'June 11', teams: 'Mexico vs TBA', time: '19:00' },
                { date: 'June 16', teams: 'Brazil vs TBA', time: '16:00' },
                { date: 'June 22', teams: 'France vs TBA', time: '20:00' },
              ].map((match, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{match.teams}</p>
                    <p className="text-sm text-gray-500">{match.date}</p>
                  </div>
                  <span className="font-mono bg-gray-200 px-3 py-1 rounded text-sm">{match.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Bus size={20}/> How to get there</h4>
              <p className="text-sm text-blue-800 mb-3">Use the "Mi Macro Periférico" line to the "Estadio Chivas" station.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">View Route Map</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OfficialView = () => (
  <div className="pt-24 px-4 max-w-3xl mx-auto pb-24">
    <div className="flex items-center gap-4 mb-8">
      <div className="bg-gray-900 text-white p-3 rounded-lg">
        <ShieldCheck size={32} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Government Connection</h2>
        <p className="text-gray-500">Official information from Gobierno de Jalisco</p>
      </div>
    </div>

    <div className="space-y-6">
      {ALERTS.map(alert => (
        <div key={alert.id} className={`p-6 rounded-xl border-l-4 shadow-sm ${
          alert.type === 'warning' ? 'bg-red-50 border-red-500' :
          alert.type === 'transport' ? 'bg-yellow-50 border-yellow-500' :
          'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-bold ${
              alert.type === 'warning' ? 'text-red-800' :
              alert.type === 'transport' ? 'text-yellow-800' :
              'text-blue-800'
            }`}>{alert.title}</h3>
            <span className="text-xs text-gray-500">{alert.date}</span>
          </div>
          <p className="text-gray-700 text-sm">{alert.message}</p>
          {alert.type === 'warning' && (
            <div className="mt-4 flex gap-2 text-red-700 text-xs font-bold uppercase">
              <AlertTriangle size={14} />
              Official Alert
            </div>
          )}
        </div>
      ))}
    </div>
    
    <div className="mt-12 grid grid-cols-2 gap-4">
      <button className="p-4 border border-gray-200 rounded-xl text-center hover:bg-gray-50">
        <span className="block text-2xl mb-2">👮</span>
        <span className="font-bold text-gray-700">Tourist Police</span>
        <span className="block text-xs text-gray-500 mt-1">Call 911</span>
      </button>
      <button className="p-4 border border-gray-200 rounded-xl text-center hover:bg-gray-50">
        <span className="block text-2xl mb-2">🏥</span>
        <span className="font-bold text-gray-700">Medical Services</span>
        <span className="block text-xs text-gray-500 mt-1">Find Hospital</span>
      </button>
    </div>
  </div>
);

// --- Main Layout ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.HOME: return <HomeView onOpenChat={() => setIsChatOpen(true)} />;
      case View.GUIDE: return <GuideView />;
      case View.STADIUM: return <StadiumView />;
      case View.OFFICIAL: return <OfficialView />;
      default: return <HomeView onOpenChat={() => setIsChatOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Main Content */}
      <main className="w-full h-full">
        {renderView()}
      </main>

      {/* Floating Chat Button (Desktop mostly, as navbar covers mobile bottom) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-mexico-green text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 z-40 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="hidden md:inline font-bold">Ask Tapatío Bot</span>
        </button>
      )}

      {/* Components */}
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;