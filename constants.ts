
import { Group, Team } from './types';

export const GROUP_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Mapeo oficial de equipos por grupo (Sorteo oficial del 5 de diciembre de 2025)
const PREDEFINED_TEAMS: Record<string, {name: string, code: string}[]> = {
  'A': [{name: 'México', code: 'mx'}, {name: 'Sudáfrica', code: 'za'}, {name: 'Corea del Sur', code: 'kr'}, {name: 'República Checa', code: 'cz'}],
  'B': [{name: 'Canadá', code: 'ca'}, {name: 'Bosnia y Herzegovina', code: 'ba'}, {name: 'Catar', code: 'qa'}, {name: 'Suiza', code: 'ch'}],
  'C': [{name: 'Brasil', code: 'br'}, {name: 'Haití', code: 'ht'}, {name: 'Marruecos', code: 'ma'}, {name: 'Escocia', code: 'gb-sct'}],
  'D': [{name: 'Australia', code: 'au'}, {name: 'Paraguay', code: 'py'}, {name: 'Turquía', code: 'tr'}, {name: 'Estados Unidos', code: 'us'}],
  'E': [{name: 'Curazao', code: 'cw'}, {name: 'Ecuador', code: 'ec'}, {name: 'Alemania', code: 'de'}, {name: 'Costa de Marfil', code: 'ci'}],
  'F': [{name: 'Japón', code: 'jp'}, {name: 'Países Bajos', code: 'nl'}, {name: 'Suecia', code: 'se'}, {name: 'Túnez', code: 'tn'}],
  'G': [{name: 'Bélgica', code: 'be'}, {name: 'Egipto', code: 'eg'}, {name: 'Irán', code: 'ir'}, {name: 'Nueva Zelanda', code: 'nz'}],
  'H': [{name: 'Cabo Verde', code: 'cv'}, {name: 'Arabia Saudita', code: 'sa'}, {name: 'España', code: 'es'}, {name: 'Uruguay', code: 'uy'}],
  'I': [{name: 'Francia', code: 'fr'}, {name: 'Iraq', code: 'iq'}, {name: 'Noruega', code: 'no'}, {name: 'Senegal', code: 'sn'}],
  'J': [{name: 'Argelia', code: 'dz'}, {name: 'Argentina', code: 'ar'}, {name: 'Austria', code: 'at'}, {name: 'Jordania', code: 'jo'}],
  'K': [{name: 'Colombia', code: 'co'}, {name: 'R. D. Congo', code: 'cd'}, {name: 'Portugal', code: 'pt'}, {name: 'Uzbekistán', code: 'uz'}],
  'L': [{name: 'Croacia', code: 'hr'}, {name: 'Inglaterra', code: 'gb-eng'}, {name: 'Ghana', code: 'gh'}, {name: 'Panamá', code: 'pa'}]
};

const createInitialTeams = (groupId: string): Team[] => {
  const teamData = PREDEFINED_TEAMS[groupId] || [
    {name: `${groupId}1`, code: 'xx'}, 
    {name: `${groupId}2`, code: 'xx'}, 
    {name: `${groupId}3`, code: 'xx'}, 
    {name: `${groupId}4`, code: 'xx'}
  ];
  return teamData.map((data, index) => ({
    id: `${groupId}${index + 1}`,
    name: data.name,
    code: data.code
  }));
};

const createInitialMatches = (groupId: string): any[] => {
  const teams = [`${groupId}1`, `${groupId}2`, `${groupId}3`, `${groupId}4`];
  return [
    { id: `${groupId}-m1`, homeTeamId: teams[0], awayTeamId: teams[1], homeScore: null, awayScore: null },
    { id: `${groupId}-m2`, homeTeamId: teams[2], awayTeamId: teams[3], homeScore: null, awayScore: null },
    { id: `${groupId}-m3`, homeTeamId: teams[0], awayTeamId: teams[2], homeScore: null, awayScore: null },
    { id: `${groupId}-m4`, homeTeamId: teams[3], awayTeamId: teams[1], homeScore: null, awayScore: null },
    { id: `${groupId}-m5`, homeTeamId: teams[3], awayTeamId: teams[0], homeScore: null, awayScore: null },
    { id: `${groupId}-m6`, homeTeamId: teams[1], awayTeamId: teams[2], homeScore: null, awayScore: null },
  ];
};

export const INITIAL_GROUPS: Group[] = GROUP_IDS.map(id => ({
  id,
  teams: createInitialTeams(id),
  matches: createInitialMatches(id)
}));

export const COLORS = {
  primary: '#22c55e', // Green 500
  secondary: '#16a34a', // Green 600
  bg: '#0a0a0a',
  surface: '#171717',
  accent: '#ffffff'
};
