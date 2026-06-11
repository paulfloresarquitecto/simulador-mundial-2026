
import { Group, Match, Standing, Team, KnockoutMatch, RoundType } from '../types';

export const calculateStandings = (group: Group): Standing[] => {
  const standingsMap: Record<string, Standing> = {};

  group.teams.forEach(team => {
    standingsMap[team.id] = {
      teamId: team.id,
      teamName: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
      groupId: group.id,
      teamCode: team.code
    };
  });

  group.matches.forEach(match => {
    const { homeTeamId, awayTeamId, homeScore, awayScore } = match;
    if (homeScore === null || awayScore === null) return;

    const home = standingsMap[homeTeamId];
    const away = standingsMap[awayTeamId];

    home.played += 1;
    away.played += 1;
    home.gf += homeScore;
    home.ga += awayScore;
    away.gf += awayScore;
    away.ga += homeScore;
    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    if (homeScore > awayScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (homeScore < awayScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  return Object.values(standingsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
};

export const getQualifiers = (allGroups: Group[]) => {
  const firsts: Standing[] = [];
  const seconds: Standing[] = [];
  const thirds: Standing[] = [];

  allGroups.forEach(group => {
    const table = calculateStandings(group);
    firsts.push(table[0]);
    seconds.push(table[1]);
    thirds.push(table[2]);
  });

  const bestThirds = [...thirds].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  }).slice(0, 8);

  return { firsts, seconds, bestThirds };
};

export const getPairings = (firsts: Standing[], seconds: Standing[], bestThirds: Standing[]) => {
  const getS = (groupId: string, pos: number) => {
    return pos === 1 ? firsts.find(s => s.groupId === groupId) || undefined : 
           pos === 2 ? seconds.find(s => s.groupId === groupId) || undefined : undefined;
  };

  return [
    // R32-1 (Match 74): 1E vs 3A/B/C/D/F
    { home: getS('E', 1), away: bestThirds[0], placeholderHome: '1° Grupo E', placeholderAway: '3° Grupo A/B/C/D/F' },
    // R32-2 (Match 77): 1I vs 3C/D/F/G/H
    { home: getS('I', 1), away: bestThirds[1], placeholderHome: '1° Grupo I', placeholderAway: '3° Grupo C/D/F/G/H' },
    // R32-3 (Match 73): 2A vs 2B
    { home: getS('A', 2), away: getS('B', 2), placeholderHome: '2° Grupo A', placeholderAway: '2° Grupo B' },
    // R32-4 (Match 75): 1F vs 2C
    { home: getS('F', 1), away: getS('C', 2), placeholderHome: '1° Grupo F', placeholderAway: '2° Grupo C' },
    // R32-5 (Match 83): 2K vs 2L
    { home: getS('K', 2), away: getS('L', 2), placeholderHome: '2° Grupo K', placeholderAway: '2° Grupo L' },
    // R32-6 (Match 84): 1H vs 2J
    { home: getS('H', 1), away: getS('J', 2), placeholderHome: '1° Grupo H', placeholderAway: '2° Grupo J' },
    // R32-7 (Match 81): 1D vs 3B/E/F/I/J
    { home: getS('D', 1), away: bestThirds[2], placeholderHome: '1° Grupo D', placeholderAway: '3° Grupo B/E/F/I/J' },
    // R32-8 (Match 82): 1G vs 3A/E/H/I/J
    { home: getS('G', 1), away: bestThirds[3], placeholderHome: '1° Grupo G', placeholderAway: '3° Grupo A/E/H/I/J' },
    // R32-9 (Match 76): 1C vs 2F
    { home: getS('C', 1), away: getS('F', 2), placeholderHome: '1° Grupo C', placeholderAway: '2° Grupo F' },
    // R32-10 (Match 78): 2E vs 2I
    { home: getS('E', 2), away: getS('I', 2), placeholderHome: '2° Grupo E', placeholderAway: '2° Grupo I' },
    // R32-11 (Match 79): 1A vs 3C/E/F/H/I
    { home: getS('A', 1), away: bestThirds[4], placeholderHome: '1° Grupo A', placeholderAway: '3° Grupo C/E/F/H/I' },
    // R32-12 (Match 80): 1L vs 3E/H/I/J/K
    { home: getS('L', 1), away: bestThirds[5], placeholderHome: '1° Grupo L', placeholderAway: '3° Grupo E/H/I/J/K' },
    // R32-13 (Match 86): 1J vs 2H
    { home: getS('J', 1), away: getS('H', 2), placeholderHome: '1° Grupo J', placeholderAway: '2° Grupo H' },
    // R32-14 (Match 88): 2D vs 2G
    { home: getS('D', 2), away: getS('G', 2), placeholderHome: '2° Grupo D', placeholderAway: '2° Grupo G' },
    // R32-15 (Match 85): 1B vs 3E/F/G/I/J
    { home: getS('B', 1), away: bestThirds[6], placeholderHome: '1° Grupo B', placeholderAway: '3° Grupo E/F/G/I/J' },
    // R32-16 (Match 87): 1K vs 3D/E/I/J/L
    { home: getS('K', 1), away: bestThirds[7], placeholderHome: '1° Grupo K', placeholderAway: '3° Grupo D/E/I/J/L' }
  ];
};

export const createInitialKnockout = (): KnockoutMatch[] => {
  const matches: KnockoutMatch[] = [];

  // Configuración de la ruta del cuadro de eliminatorias (Dieciseisavos -> Octavos -> Cuartos -> Semis -> Final)
  const r32Config: Record<number, { next: string; side: 'home' | 'away' }> = {
    1: { next: 'R16-1', side: 'home' },
    2: { next: 'R16-1', side: 'away' },
    3: { next: 'R16-2', side: 'home' },
    4: { next: 'R16-2', side: 'away' },
    5: { next: 'R16-3', side: 'home' },
    6: { next: 'R16-3', side: 'away' },
    7: { next: 'R16-4', side: 'home' },
    8: { next: 'R16-4', side: 'away' },
    9: { next: 'R16-5', side: 'home' },
    10: { next: 'R16-5', side: 'away' },
    11: { next: 'R16-6', side: 'home' },
    12: { next: 'R16-6', side: 'away' },
    13: { next: 'R16-7', side: 'home' },
    14: { next: 'R16-7', side: 'away' },
    15: { next: 'R16-8', side: 'home' },
    16: { next: 'R16-8', side: 'away' }
  };

  for (let i = 1; i <= 16; i++) {
    const config = r32Config[i];
    matches.push({
      id: `R32-${i}`,
      round: 'R32',
      nextMatchId: config.next,
      nextMatchSide: config.side,
      homeTeamId: null,
      awayTeamId: null,
      homeTeamName: null,
      awayTeamName: null,
      homeScore: null,
      awayScore: null,
      winnerId: null
    });
  }

  const r16Config: Record<number, { next: string; side: 'home' | 'away' }> = {
    1: { next: 'QF-1', side: 'home' },
    2: { next: 'QF-1', side: 'away' },
    3: { next: 'QF-2', side: 'home' },
    4: { next: 'QF-2', side: 'away' },
    5: { next: 'QF-3', side: 'home' },
    6: { next: 'QF-3', side: 'away' },
    7: { next: 'QF-4', side: 'home' },
    8: { next: 'QF-4', side: 'away' }
  };

  for (let i = 1; i <= 8; i++) {
    const config = r16Config[i];
    matches.push({
      id: `R16-${i}`,
      round: 'R16',
      nextMatchId: config.next,
      nextMatchSide: config.side,
      homeTeamId: null,
      awayTeamId: null,
      homeTeamName: null,
      awayTeamName: null,
      homeScore: null,
      awayScore: null,
      winnerId: null
    });
  }

  const qfConfig: Record<number, { next: string; side: 'home' | 'away' }> = {
    1: { next: 'SF-1', side: 'home' },
    2: { next: 'SF-1', side: 'away' },
    3: { next: 'SF-2', side: 'home' },
    4: { next: 'SF-2', side: 'away' }
  };

  for (let i = 1; i <= 4; i++) {
    const config = qfConfig[i];
    matches.push({
      id: `QF-${i}`,
      round: 'QF',
      nextMatchId: config.next,
      nextMatchSide: config.side,
      homeTeamId: null,
      awayTeamId: null,
      homeTeamName: null,
      awayTeamName: null,
      homeScore: null,
      awayScore: null,
      winnerId: null
    });
  }

  for (let i = 1; i <= 2; i++) {
    matches.push({
      id: `SF-${i}`,
      round: 'SF',
      nextMatchId: 'F-1',
      nextMatchSide: i === 1 ? 'home' : 'away',
      homeTeamId: null,
      awayTeamId: null,
      homeTeamName: null,
      awayTeamName: null,
      homeScore: null,
      awayScore: null,
      winnerId: null
    });
  }

  matches.push({
    id: 'F-1',
    round: 'F',
    nextMatchId: null,
    nextMatchSide: null,
    homeTeamId: null,
    awayTeamId: null,
    homeTeamName: null,
    awayTeamName: null,
    homeScore: null,
    awayScore: null,
    winnerId: null
  });

  return matches;
};
