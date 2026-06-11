
import { useState, useEffect, useCallback, FC } from 'react';
import { Group, KnockoutMatch, RoundType } from './types';
import { INITIAL_GROUPS } from './constants';
import GroupTable from './components/GroupTable';
import KnockoutMatchCard from './components/KnockoutMatchCard';
import { getQualifiers, createInitialKnockout, getPairings } from './services/tournamentLogic';

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('world_cup_2026_data_v4');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_GROUPS));
  });

  const [knockoutMatches, setKnockoutMatches] = useState<KnockoutMatch[]>(() => {
    const saved = localStorage.getItem('world_cup_2026_knockout_v4');
    return saved ? JSON.parse(saved) : createInitialKnockout();
  });

  const [activeTab, setActiveTab] = useState<'groups' | 'knockout'>('groups');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('world_cup_2026_theme');
    if (saved !== null) return saved === 'dark';
    return true; // Default to dark mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('world_cup_2026_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Calculate qualifiers for highlighting and sharing
  const { firsts, seconds, bestThirds } = getQualifiers(groups);
  const bestThirdsIds = bestThirds.map(t => t.teamId);

  // Persistencia de datos
  useEffect(() => {
    localStorage.setItem('world_cup_2026_data_v4', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('world_cup_2026_knockout_v4', JSON.stringify(knockoutMatches));
  }, [knockoutMatches]);

  // Sincronización automática de nombres en el cuadro (solo para entrada manual)
  useEffect(() => {
    // Si hay scores en el cuadro, asumimos que el usuario ya está jugando o simuló
    const hasScores = knockoutMatches.some(m => m.homeScore !== null || m.winnerId !== null);
    if (hasScores) return;

    const { firsts, seconds, bestThirds } = getQualifiers(groups);
    const pairings = getPairings(firsts, seconds, bestThirds);

    setKnockoutMatches(prev => prev.map(m => {
      if (m.round === 'R32') {
        const index = parseInt(m.id.split('-')[1]) - 1;
        const pairing = pairings[index];
        return {
          ...m,
          homeTeamId: pairing?.home?.teamId || null,
          homeTeamName: pairing?.home?.teamName || pairing?.placeholderHome || 'TBD',
          homeTeamCode: pairing?.home?.teamCode,
          awayTeamId: pairing?.away?.teamId || null,
          awayTeamName: pairing?.away?.teamName || pairing?.placeholderAway || 'TBD',
          awayTeamCode: pairing?.away?.teamCode
        };
      }
      return m;
    }));
  }, [groups]);

  const updateMatch = (groupId: string, matchId: string, homeScore: number | null, awayScore: number | null) => {
    setGroups(prev => prev.map(g => (g.id === groupId ? {
      ...g,
      matches: g.matches.map(m => m.id === matchId ? { ...m, homeScore, awayScore } : m)
    } : g)));
  };

  const updateTeamName = (groupId: string, teamId: string, name: string) => {
    setGroups(prev => prev.map(g => (g.id === groupId ? {
      ...g,
      teams: g.teams.map(t => t.id === teamId ? { ...t, name } : t)
    } : g)));
  };

  const updateKnockoutMatch = (matchId: string, h: number | null, a: number | null, winnerId: string | null) => {
    setKnockoutMatches(prev => {
      let currentWinnerId = winnerId;
      if (!currentWinnerId && h !== null && a !== null) {
        if (h > a) currentWinnerId = prev.find(m => m.id === matchId)?.homeTeamId || null;
        else if (a > h) currentWinnerId = prev.find(m => m.id === matchId)?.awayTeamId || null;
      }

      const updated = prev.map(m => m.id === matchId ? { ...m, homeScore: h, awayScore: a, winnerId: currentWinnerId } : m);
      const match = updated.find(m => m.id === matchId);

      if (match?.nextMatchId && match.winnerId) {
        const winnerName = match.winnerId === match.homeTeamId ? match.homeTeamName : match.awayTeamName;
        const winnerCode = match.winnerId === match.homeTeamId ? match.homeTeamCode : match.awayTeamCode;
        return updated.map(m => (m.id === match.nextMatchId ? {
          ...m,
          [match.nextMatchSide === 'home' ? 'homeTeamId' : 'awayTeamId']: match.winnerId,
          [match.nextMatchSide === 'home' ? 'homeTeamName' : 'awayTeamName']: winnerName,
          [match.nextMatchSide === 'home' ? 'homeTeamCode' : 'awayTeamCode']: winnerCode
        } : m));
      }
      return updated;
    });
  };



  const resetAll = () => {
    if (window.confirm('⚠️ ¿Estás seguro de que quieres borrar todos los datos?')) {
      localStorage.removeItem('world_cup_2026_data_v4');
      localStorage.removeItem('world_cup_2026_knockout_v4');
      window.location.reload();
    }
  };

  const sharePrediction = () => {
    const finalMatch = knockoutMatches.find(m => m.round === 'F');
    if (!finalMatch || !finalMatch.winnerId) {
      alert("Debes terminar la final para compartir tu predicción.");
      return;
    }
    const winnerName = finalMatch.winnerId === finalMatch.homeTeamId ? finalMatch.homeTeamName : finalMatch.awayTeamName;
    const runnerUpName = finalMatch.winnerId === finalMatch.homeTeamId ? finalMatch.awayTeamName : finalMatch.homeTeamName;
    const text = `🏆 ¡Mi Campeón del Mundial 2026 es ${winnerName}! 🏆\n\nSubcampeón: ${runnerUpName}\n\n¡Arma tu propio pronóstico en el Simulador Mundial 2026!`;
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Predicción copiada al portapapeles! Ya puedes pegarla en WhatsApp o Twitter.");
    });
  };

  const renderRound = (round: string, title: string) => (
    <div className="flex flex-col gap-8 min-w-[280px]">
      <h3 className="text-center font-black text-green-500 uppercase tracking-widest text-sm mb-4 border-b border-green-500/20 pb-2">{title}</h3>
      <div className="flex flex-col justify-around h-full gap-4">
        {knockoutMatches.filter(m => m.round === round).map(m => (
          <KnockoutMatchCard key={m.id} match={m} onUpdate={updateKnockoutMatch} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center font-black text-black text-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)]">26</div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">MUNDIAL <span className="text-green-500">2026</span></h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Simulador Predictivo</p>
          </div>
        </div>

        <nav className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
          <button onClick={() => setActiveTab('groups')} className={`px-8 py-3 rounded-xl text-sm font-black uppercase transition-all ${activeTab === 'groups' ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white'}`}>Grupos</button>
          <button onClick={() => setActiveTab('knockout')} className={`px-8 py-3 rounded-xl text-sm font-black uppercase transition-all ${activeTab === 'knockout' ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white'}`}>Eliminatorias</button>
        </nav>

        <div className="flex gap-3 items-center">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 rounded-xl border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            title="Cambiar Tema"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={resetAll} className="flex items-center gap-2 text-[10px] text-red-500 hover:text-white hover:bg-red-500 transition-all uppercase font-black tracking-widest border border-red-400/30 px-6 py-3 rounded-xl">
            Reiniciar Todo
          </button>
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'groups' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {groups.map(group => (
              <GroupTable key={group.id} group={group} bestThirdsIds={bestThirdsIds} onUpdateMatch={updateMatch} onUpdateTeamName={updateTeamName} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto pb-12 scrollbar-hide">
            <div className="flex gap-12 min-w-max px-4">
              {renderRound('R32', 'Dieciseisavos')}
              {renderRound('R16', 'Octavos')}
              {renderRound('QF', 'Cuartos')}
              {renderRound('SF', 'Semis')}
              <div className="flex flex-col items-center justify-center gap-8 min-w-[320px]">
                <h3 className="font-black text-green-500 uppercase tracking-widest text-sm mb-4 border-b border-green-500/20 pb-2">Gran Final</h3>
                <div className="bg-gradient-to-b from-green-500/10 to-transparent p-8 rounded-[40px] border border-green-500/30">
                  <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.5)] border-4 border-black">
                      <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </div>
                  </div>
                  {knockoutMatches.filter(m => m.round === 'F').map(m => (
                    <KnockoutMatchCard key={m.id} match={m} onUpdate={updateKnockoutMatch} />
                  ))}
                    {knockoutMatches.find(m => m.round === 'F')?.winnerId && (
                    <div className="mt-8 flex flex-col items-center gap-4 animate-bounce">
                      <div className="text-center">
                        <p className="text-green-500 dark:text-green-400 font-black uppercase text-xl tracking-tighter">🏆 ¡CAMPEÓN! 🏆</p>
                        <p className="text-gray-900 dark:text-white font-bold text-3xl mt-2 drop-shadow-lg">
                          {knockoutMatches.find(m => m.round === 'F')?.winnerId === knockoutMatches.find(m => m.round === 'F')?.homeTeamId ?
                            knockoutMatches.find(m => m.round === 'F')?.homeTeamName :
                            knockoutMatches.find(m => m.round === 'F')?.awayTeamName}
                        </p>
                      </div>
                      <button 
                        onClick={sharePrediction}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
                      >
                        Compartir Predicción 📱
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-white/5 pt-12 text-center">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">Copa del Mundo 2026 - Herramienta de Simulación Atómica</p>
      </footer>
    </div>
  );
};

export default App;
