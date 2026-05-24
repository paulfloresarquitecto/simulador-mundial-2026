
import { FC } from 'react';
import { Match, Team } from '../types';

interface MatchInputProps {
  match: Match;
  teams: Team[];
  onUpdate: (matchId: string, h: number | null, a: number | null) => void;
}

const MatchInput: FC<MatchInputProps> = ({ match, teams, onUpdate }) => {
  const homeTeam = teams.find(t => t.id === match.homeTeamId);
  const awayTeam = teams.find(t => t.id === match.awayTeamId);

  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-none">
      <div className="flex-1 text-sm font-medium truncate text-right text-gray-800 dark:text-gray-200">
        {homeTeam?.name} {homeTeam?.code && <span className={`fi fi-${homeTeam.code} ml-2 rounded-sm opacity-90`} />}
      </div>
      
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          value={match.homeScore ?? ''}
          onChange={(e) => onUpdate(match.id, e.target.value === '' ? null : parseInt(e.target.value), match.awayScore)}
          className="w-10 h-8 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-green-500/30 rounded text-center text-gray-900 dark:text-white focus:outline-none focus:border-green-500"
        />
        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
        <input
          type="number"
          min="0"
          value={match.awayScore ?? ''}
          onChange={(e) => onUpdate(match.id, match.homeScore, e.target.value === '' ? null : parseInt(e.target.value))}
          className="w-10 h-8 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-green-500/30 rounded text-center text-gray-900 dark:text-white focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="flex-1 text-sm font-medium truncate text-left text-gray-800 dark:text-gray-200">
        {awayTeam?.code && <span className={`fi fi-${awayTeam.code} mr-2 rounded-sm opacity-90`} />} {awayTeam?.name}
      </div>
    </div>
  );
};

export default MatchInput;
