
export interface Team {
  id: string;
  name: string;
  code?: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  penalties?: {
    home: number;
    away: number;
  };
}

export interface Group {
  id: string; // A, B, C... L
  teams: Team[];
  matches: Match[];
}

export interface Standing {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  groupId: string;
  teamCode?: string;
}

export type RoundType = 'R32' | 'R16' | 'QF' | 'SF' | 'F';

export interface KnockoutMatch {
  id: string; // e.g., "R32-1", "R16-1"
  round: RoundType;
  nextMatchId: string | null;
  nextMatchSide: 'home' | 'away' | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
  homeTeamCode?: string;
  awayTeamCode?: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winnerId: string | null;
}

export interface ScheduleInfo {
  date: string;
  time: string;
  venue: string;
  phase: string;
}

