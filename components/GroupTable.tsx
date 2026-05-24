
import { FC } from 'react';
import { Group, Standing, Team } from '../types';
import MatchInput from './MatchInput';
import { calculateStandings } from '../services/tournamentLogic';

interface GroupTableProps {
  group: Group;
  bestThirdsIds: string[];
  onUpdateMatch: (groupId: string, matchId: string, h: number | null, a: number | null) => void;
  onUpdateTeamName: (groupId: string, teamId: string, name: string) => void;
}

const GroupTable: FC<GroupTableProps> = ({ group, bestThirdsIds, onUpdateMatch, onUpdateTeamName }) => {
  const standings = calculateStandings(group);

  return (
    <div className="glass bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-md">
      <div className="bg-green-100 dark:bg-green-500/20 px-4 py-2 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
        <h3 className="font-bold text-lg text-green-700 dark:text-green-400">GRUPO {group.id}</h3>
      </div>
      
      <div className="p-4 space-y-4 flex-grow">
        {/* Teams List (Editable) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {group.teams.map(team => (
            <input
              key={team.id}
              type="text"
              value={team.name}
              onChange={(e) => onUpdateTeamName(group.id, team.id, e.target.value)}
              className="bg-gray-50 dark:bg-transparent border-b border-gray-300 dark:border-white/10 text-xs py-1 px-2 focus:outline-none focus:border-green-500 text-gray-900 dark:text-white rounded-t-sm"
            />
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-1">
          {group.matches.map(match => (
            <MatchInput 
              key={match.id} 
              match={match} 
              teams={group.teams} 
              onUpdate={(id, h, a) => onUpdateMatch(group.id, id, h, a)} 
            />
          ))}
        </div>

        {/* Standings Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10 uppercase bg-gray-50 dark:bg-transparent">
              <tr>
                <th className="pb-2 pt-2 px-2 font-normal">Equipo</th>
                <th className="pb-2 pt-2 font-normal text-center">PJ</th>
                <th className="pb-2 pt-2 font-normal text-center">DG</th>
                <th className="pb-2 pt-2 px-2 font-normal text-center">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, idx) => {
                const isBestThird = idx === 2 && bestThirdsIds.includes(row.teamId);
                const rowClass = idx < 2 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-medium' 
                  : isBestThird 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 font-medium' 
                    : 'text-gray-600 dark:text-gray-400';
                
                return (
                <tr key={row.teamId} className={`border-b border-gray-100 dark:border-white/5 last:border-none ${rowClass}`}>
                  <td className="py-2 px-2 truncate max-w-[100px]">
                    {row.teamCode && <span className={`fi fi-${row.teamCode} mr-2 rounded-sm opacity-90`} />}
                    {row.teamName}
                  </td>
                  <td className="py-2 text-center">{row.played}</td>
                  <td className="py-2 text-center">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                  <td className="py-2 px-2 text-center font-bold">{row.points}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupTable;
