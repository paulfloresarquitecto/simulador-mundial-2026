import { FC, useState, useMemo } from 'react';
import { Group, KnockoutMatch } from '../types';
import { getMatchSchedule, SEDES } from '../services/calendarService';

interface CalendarViewProps {
  groups: Group[];
  knockoutMatches: KnockoutMatch[];
}

const CalendarView: FC<CalendarViewProps> = ({ groups, knockoutMatches }) => {
  // Estados para filtros
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedVenue, setSelectedVenue] = useState<string>('All');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 1. Obtener la lista de todos los equipos del torneo de forma dinámica
  const allTeams = useMemo(() => {
    return groups
      .flatMap(g => g.teams)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [groups]);

  // 2. Obtener lista de fases únicas
  const phases = [
    { value: 'All', label: 'Todas las Fases' },
    { value: 'Grupo', label: 'Fase de Grupos' },
    { value: 'Dieciseisavos', label: 'Dieciseisavos' },
    { value: 'Octavos de Final', label: 'Octavos de Final' },
    { value: 'Cuartos de Final', label: 'Cuartos de Final' },
    { value: 'Semifinal', label: 'Semifinales' },
    { value: 'Final', label: 'Gran Final' }
  ];

  // 3. Helper para ordenar cronológicamente
  const getSortDate = (dateStr: string, timeStr: string) => {
    try {
      const cleanStr = dateStr.replace(', 2026', ''); // "11 de Junio"
      const parts = cleanStr.split(' de ');
      const day = parseInt(parts[0], 10);
      const monthStr = parts[1]?.toLowerCase();
      const month = monthStr === 'junio' ? 6 : monthStr === 'julio' ? 7 : 0;
      
      const [hour, minute] = timeStr.split(':').map(Number);
      return new Date(2026, month - 1, day, hour, minute).getTime();
    } catch {
      return 0;
    }
  };

  // 4. Preparar todos los partidos
  const allMatchesList = useMemo(() => {
    // Partidos de grupos
    const groupMatches = groups.flatMap(group => {
      return group.matches.map(match => {
        const homeTeam = group.teams.find(t => t.id === match.homeTeamId);
        const awayTeam = group.teams.find(t => t.id === match.awayTeamId);
        const schedule = getMatchSchedule(match.id);
        return {
          id: match.id,
          homeTeamName: homeTeam?.name || 'TBD',
          homeTeamCode: homeTeam?.code || 'xx',
          awayTeamName: awayTeam?.name || 'TBD',
          awayTeamCode: awayTeam?.code || 'xx',
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          schedule,
          isKnockout: false,
          groupId: group.id,
          sortTimestamp: getSortDate(schedule.date, schedule.time)
        };
      });
    });

    // Partidos de eliminatorias
    const koMatches = knockoutMatches.map(match => {
      const schedule = getMatchSchedule(match.id);
      return {
        id: match.id,
        homeTeamName: match.homeTeamName || 'TBD',
        homeTeamCode: match.homeTeamCode || 'xx',
        awayTeamName: match.awayTeamName || 'TBD',
        awayTeamCode: match.awayTeamCode || 'xx',
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        schedule,
        isKnockout: true,
        groupId: null,
        sortTimestamp: getSortDate(schedule.date, schedule.time)
      };
    });

    // Combinar y ordenar cronológicamente
    return [...groupMatches, ...koMatches].sort((a, b) => a.sortTimestamp - b.sortTimestamp);
  }, [groups, knockoutMatches]);

  // 5. Aplicar los filtros
  const filteredMatches = useMemo(() => {
    return allMatchesList.filter(m => {
      // Filtro por fase
      if (selectedPhase !== 'All') {
        if (selectedPhase === 'Grupo') {
          if (m.isKnockout) return false;
        } else if (m.schedule.phase !== selectedPhase) {
          return false;
        }
      }

      // Filtro por grupo (solo aplica a fase de grupos)
      if (selectedGroup !== 'All') {
        if (m.isKnockout || m.groupId !== selectedGroup) return false;
      }

      // Filtro por sede
      if (selectedVenue !== 'All' && m.schedule.venue !== selectedVenue) {
        return false;
      }

      // Filtro por selección
      if (selectedTeamId !== 'All') {
        const teamObj = allTeams.find(t => t.id === selectedTeamId);
        if (teamObj) {
          const searchName = teamObj.name.toLowerCase();
          const homeName = m.homeTeamName.toLowerCase();
          const awayName = m.awayTeamName.toLowerCase();
          if (!homeName.includes(searchName) && !awayName.includes(searchName)) return false;
        }
      }

      // Filtro por texto de búsqueda
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const homeName = m.homeTeamName.toLowerCase();
        const awayName = m.awayTeamName.toLowerCase();
        const venue = m.schedule.venue.toLowerCase();
        const phase = m.schedule.phase.toLowerCase();
        
        if (
          !homeName.includes(q) && 
          !awayName.includes(q) && 
          !venue.includes(q) && 
          !phase.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allMatchesList, selectedPhase, selectedGroup, selectedVenue, selectedTeamId, searchQuery, allTeams]);

  // Limpiar todos los filtros
  const resetFilters = () => {
    setSelectedPhase('All');
    setSelectedGroup('All');
    setSelectedVenue('All');
    setSelectedTeamId('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Panel de Filtros */}
      <div className="glass bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-green-500">Calendario de Partidos</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-0.5">Mundial 2026 • 103 Partidos Programados</p>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl transition-all uppercase tracking-widest border border-white/5"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Buscar por texto */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Buscar por País / Sede</label>
            <input
              type="text"
              placeholder="Ej. México, SoFi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Filtro Fase */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Filtrar por Fase</label>
            <select
              value={selectedPhase}
              onChange={(e) => {
                setSelectedPhase(e.target.value);
                if (e.target.value !== 'Grupo') setSelectedGroup('All');
              }}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 text-white transition-colors cursor-pointer"
            >
              {phases.map(p => (
                <option key={p.value} value={p.value} className="bg-[#171717]">{p.label}</option>
              ))}
            </select>
          </div>

          {/* Filtro Grupo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Filtrar por Grupo</label>
            <select
              value={selectedGroup}
              disabled={selectedPhase !== 'All' && selectedPhase !== 'Grupo'}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="All" className="bg-[#171717]">Todos los Grupos</option>
              {groups.map(g => (
                <option key={g.id} value={g.id} className="bg-[#171717]">Grupo {g.id}</option>
              ))}
            </select>
          </div>

          {/* Filtro Equipo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Filtrar por Selección</label>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 text-white transition-colors cursor-pointer"
            >
              <option value="All" className="bg-[#171717]">Cualquier Selección</option>
              {allTeams.map(team => (
                <option key={team.id} value={team.id} className="bg-[#171717]">{team.name}</option>
              ))}
            </select>
          </div>

          {/* Filtro Sede */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Filtrar por Sede</label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 text-white transition-colors cursor-pointer"
            >
              <option value="All" className="bg-[#171717]">Todas las Sedes</option>
              {SEDES.map(s => (
                <option key={s} value={s} className="bg-[#171717]">{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Listado de Partidos */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-lg font-bold">No se encontraron partidos para los filtros aplicados.</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-xs bg-green-500 hover:bg-green-600 text-black font-black py-2 px-6 rounded-full transition-all uppercase tracking-widest shadow-lg shadow-green-500/20"
          >
            Mostrar todos los partidos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMatches.map(m => {
            const hasPlayed = m.homeScore !== null && m.awayScore !== null;
            const isWinnerHome = hasPlayed && m.homeScore! > m.awayScore!;
            const isWinnerAway = hasPlayed && m.awayScore! > m.homeScore!;
            const isDraw = hasPlayed && m.homeScore === m.awayScore;
            
            // Si es un partido eliminatorio y hay un ganador establecido por penales
            const isKnockoutWinnerHome = m.isKnockout && m.winnerId === (knockoutMatches.find(k => k.id === m.id)?.homeTeamId);
            const isKnockoutWinnerAway = m.isKnockout && m.winnerId === (knockoutMatches.find(k => k.id === m.id)?.awayTeamId);

            return (
              <div 
                key={m.id} 
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  hasPlayed 
                    ? 'border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                {/* Cabecera del Partido */}
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-green-500 tracking-wider">
                      {m.schedule.phase}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 mt-0.5">
                      {m.schedule.venue}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-wider text-white">
                      {m.schedule.date}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 mt-0.5">
                      Hora: {m.schedule.time}
                    </span>
                  </div>
                </div>

                {/* Contenido / Enfrentamiento */}
                <div className="flex items-center justify-between gap-4 py-2 border-y border-white/5 my-3">
                  {/* Home Team */}
                  <div className={`flex-1 flex items-center justify-end gap-2.5 min-w-0 ${
                    hasPlayed && !isWinnerHome && (!isKnockoutWinnerHome || !isKnockoutWinnerHome) ? 'opacity-50' : ''
                  }`}>
                    <span className="text-xs font-black truncate text-right text-white">
                      {m.homeTeamName}
                    </span>
                    {m.homeTeamCode && m.homeTeamCode !== 'xx' && (
                      <span className={`fi fi-${m.homeTeamCode} flex-shrink-0 w-5 h-3.5 rounded-sm opacity-90 shadow-sm`} />
                    )}
                  </div>

                  {/* Marcador */}
                  <div className="flex items-center gap-2 flex-shrink-0 bg-black/60 px-3 py-1.5 rounded-xl border border-white/5">
                    {hasPlayed ? (
                      <>
                        <span className={`text-base font-black ${isWinnerHome || isKnockoutWinnerHome ? 'text-green-500' : 'text-white'}`}>
                          {m.homeScore}
                        </span>
                        <span className="text-gray-500 text-xs font-bold">:</span>
                        <span className={`text-base font-black ${isWinnerAway || isKnockoutWinnerAway ? 'text-green-500' : 'text-white'}`}>
                          {m.awayScore}
                        </span>
                        {m.isKnockout && isDraw && m.winnerId && (
                          <span className="text-[10px] font-black text-green-500 ml-1 px-1 bg-green-500/10 rounded">
                            {m.winnerId === (knockoutMatches.find(k => k.id === m.id)?.homeTeamId) ? 'PEN' : 'PEN'}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        VS
                      </span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className={`flex-1 flex items-center justify-start gap-2.5 min-w-0 ${
                    hasPlayed && !isWinnerAway && (!isKnockoutWinnerAway || !isKnockoutWinnerAway) ? 'opacity-50' : ''
                  }`}>
                    {m.awayTeamCode && m.awayTeamCode !== 'xx' && (
                      <span className={`fi fi-${m.awayTeamCode} flex-shrink-0 w-5 h-3.5 rounded-sm opacity-90 shadow-sm`} />
                    )}
                    <span className="text-xs font-black truncate text-left text-white">
                      {m.awayTeamName}
                    </span>
                  </div>
                </div>

                {/* Pie del Partido / Estado */}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">
                    ID: {m.id}
                  </span>
                  
                  {hasPlayed ? (
                    <span className="text-[9px] font-black bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-md uppercase tracking-widest">
                      Finalizado
                    </span>
                  ) : (
                    <span className="text-[9px] font-black bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded-md uppercase tracking-widest">
                      Programado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
