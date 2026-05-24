
import { FC } from 'react';
import { KnockoutMatch } from '../types';

interface KnockoutMatchCardProps {
  match: KnockoutMatch;
  onUpdate: (matchId: string, h: number | null, a: number | null, winnerId: string | null) => void;
}

const KnockoutMatchCard: FC<KnockoutMatchCardProps> = ({ match, onUpdate }) => {
  const isDraw = match.homeScore !== null && match.awayScore !== null && match.homeScore === match.awayScore;

  const handleManualWinner = (id: string) => {
    onUpdate(match.id, match.homeScore, match.awayScore, id);
  };

  return (
    <div className={`p-3 rounded-xl border transition-all ${match.winnerId ? 'border-green-500/50 bg-green-50 dark:bg-green-500/5' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5'} w-64 shadow-sm`}>
      <div className="flex flex-col gap-2">
        {/* Home */}
        <div className={`flex items-center justify-between p-2 rounded ${match.winnerId === match.homeTeamId ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
          <span className="text-xs font-bold truncate flex-1">
            {match.homeTeamCode && <span className={`fi fi-${match.homeTeamCode} mr-2 rounded-sm opacity-90`} />}
            {match.homeTeamName || 'TBD'}
          </span>
          <input
            type="number"
            value={match.homeScore ?? ''}
            onChange={(e) => onUpdate(match.id, e.target.value === '' ? null : parseInt(e.target.value), match.awayScore, null)}
            className="w-8 h-6 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded text-center text-xs focus:outline-none focus:border-green-500 ml-2 text-gray-900 dark:text-white"
          />
          {isDraw && (
            <button 
              onClick={() => handleManualWinner(match.homeTeamId!)}
              className={`ml-1 text-[10px] px-1 rounded border ${match.winnerId === match.homeTeamId ? 'bg-green-500 border-green-500 text-white dark:text-black' : 'border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
              title="Ganador por Penales"
            >
              P
            </button>
          )}
        </div>

        {/* Away */}
        <div className={`flex items-center justify-between p-2 rounded ${match.winnerId === match.awayTeamId ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
          <span className="text-xs font-bold truncate flex-1">
            {match.awayTeamCode && <span className={`fi fi-${match.awayTeamCode} mr-2 rounded-sm opacity-90`} />}
            {match.awayTeamName || 'TBD'}
          </span>
          <input
            type="number"
            value={match.awayScore ?? ''}
            onChange={(e) => onUpdate(match.id, match.homeScore, e.target.value === '' ? null : parseInt(e.target.value), null)}
            className="w-8 h-6 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded text-center text-xs focus:outline-none focus:border-green-500 ml-2 text-gray-900 dark:text-white"
          />
          {isDraw && (
            <button 
              onClick={() => handleManualWinner(match.awayTeamId!)}
              className={`ml-1 text-[10px] px-1 rounded border ${match.winnerId === match.awayTeamId ? 'bg-green-500 border-green-500 text-white dark:text-black' : 'border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
              title="Ganador por Penales"
            >
              P
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnockoutMatchCard;
