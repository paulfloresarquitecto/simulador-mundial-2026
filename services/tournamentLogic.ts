
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
    return pos === 1 ? firsts.find(s => s.groupId === groupId) : 
           pos === 2 ? seconds.find(s => s.groupId === groupId) : null;
  };

  return [
    { home: getS('A', 1), away: bestThirds[0] }, // R32-1
    { home: getS('B', 2), away: getS('C', 2) }, // R32-2
    { home: getS('E', 1), away: getS('F', 2) }, // R32-3
    { home: getS('G', 1), away: bestThirds[1] }, // R32-4
    { home: getS('I', 1), away: bestThirds[2] }, // R32-5
    { home: getS('J', 2), away: getS('K', 2) }, // R32-6
    { home: getS('C', 1), away: bestThirds[3] }, // R32-7
    { home: getS('D', 1), away: getS('E', 2) }, // R32-8
    { home: getS('B', 1), away: bestThirds[4] }, // R32-9
    { home: getS('A', 2), away: getS('D', 2) }, // R32-10
    { home: getS('F', 1), away: bestThirds[5] }, // R32-11
    { home: getS('H', 1), away: getS('I', 2) }, // R32-12
    { home: getS('K', 1), away: bestThirds[6] }, // R32-13
    { home: getS('L', 2), away: getS('G', 2) }, // R32-14
    { home: getS('J', 1), away: bestThirds[7] }, // R32-15
    { home: getS('L', 1), away: getS('H', 2) }, // R32-16
  ];
};

export const createInitialKnockout = (): KnockoutMatch[] => {
  const matches: KnockoutMatch[] = [];

  for (let i = 1; i <= 16; i++) {
    const nextMatchId = `R16-${Math.ceil(i / 2)}`;
    const nextMatchSide = i % 2 !== 0 ? 'home' : 'away';
    matches.push({ id: `R32-${i}`, round: 'R32', nextMatchId, nextMatchSide, homeTeamId: null, awayTeamId: null, homeTeamName: null, awayTeamName: null, homeScore: null, awayScore: null, winnerId: null });
  }
  for (let i = 1; i <= 8; i++) {
    const nextMatchId = `QF-${Math.ceil(i / 2)}`;
    const nextMatchSide = i % 2 !== 0 ? 'home' : 'away';
    matches.push({ id: `R16-${i}`, round: 'R16', nextMatchId, nextMatchSide, homeTeamId: null, awayTeamId: null, homeTeamName: null, awayTeamName: null, homeScore: null, awayScore: null, winnerId: null });
  }
  for (let i = 1; i <= 4; i++) {
    const nextMatchId = `SF-${Math.ceil(i / 2)}`;
    const nextMatchSide = i % 2 !== 0 ? 'home' : 'away';
    matches.push({ id: `QF-${i}`, round: 'QF', nextMatchId, nextMatchSide, homeTeamId: null, awayTeamId: null, homeTeamName: null, awayTeamName: null, homeScore: null, awayScore: null, winnerId: null });
  }
  for (let i = 1; i <= 2; i++) {
    const nextMatchId = `F-1`;
    const nextMatchSide = i % 2 !== 0 ? 'home' : 'away';
    matches.push({ id: `SF-${i}`, round: 'SF', nextMatchId, nextMatchSide, homeTeamId: null, awayTeamId: null, homeTeamName: null, awayTeamName: null, homeScore: null, awayScore: null, winnerId: null });
  }
  matches.push({ id: `F-1`, round: 'F', nextMatchId: null, nextMatchSide: null, homeTeamId: null, awayTeamId: null, homeTeamName: null, awayTeamName: null, homeScore: null, awayScore: null, winnerId: null });

  return matches;
};
