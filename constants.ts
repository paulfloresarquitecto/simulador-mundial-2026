
import { Group, Team } from './types';

export const GROUP_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Mapeo de equipos por grupo (Proyección basada en rankings y sedes confirmadas)
const PREDEFINED_TEAMS: Record<string, {name: string, code: string}[]> = {
  'A': [{name: 'México', code: 'mx'}, {name: 'Ecuador', code: 'ec'}, {name: 'Escocia', code: 'gb-sct'}, {name: 'Emiratos Árabes', code: 'ae'}],
  'B': [{name: 'Canadá', code: 'ca'}, {name: 'Colombia', code: 'co'}, {name: 'Alemania', code: 'de'}, {name: 'Sudáfrica', code: 'za'}],
  'C': [{name: 'Argentina', code: 'ar'}, {name: 'Suiza', code: 'ch'}, {name: 'Corea del Sur', code: 'kr'}, {name: 'Malí', code: 'ml'}],
  'D': [{name: 'Estados Unidos', code: 'us'}, {name: 'Uruguay', code: 'uy'}, {name: 'Dinamarca', code: 'dk'}, {name: 'Arabia Saudita', code: 'sa'}],
  'E': [{name: 'Brasil', code: 'br'}, {name: 'Serbia', code: 'rs'}, {name: 'Japón', code: 'jp'}, {name: 'Ghana', code: 'gh'}],
  'F': [{name: 'Francia', code: 'fr'}, {name: 'Perú', code: 'pe'}, {name: 'Egipto', code: 'eg'}, {name: 'Australia', code: 'au'}],
  'G': [{name: 'España', code: 'es'}, {name: 'Irán', code: 'ir'}, {name: 'Venezuela', code: 've'}, {name: 'Marruecos', code: 'ma'}],
  'H': [{name: 'Inglaterra', code: 'gb-eng'}, {name: 'Ucrania', code: 'ua'}, {name: 'Costa de Marfil', code: 'ci'}, {name: 'Panamá', code: 'pa'}],
  'I': [{name: 'Portugal', code: 'pt'}, {name: 'Nigeria', code: 'ng'}, {name: 'Iraq', code: 'iq'}, {name: 'Paraguay', code: 'py'}],
  'J': [{name: 'Bélgica', code: 'be'}, {name: 'Argelia', code: 'dz'}, {name: 'Austria', code: 'at'}, {name: 'Jamaica', code: 'jm'}],
  'K': [{name: 'Países Bajos', code: 'nl'}, {name: 'Senegal', code: 'sn'}, {name: 'Noruega', code: 'no'}, {name: 'Costa Rica', code: 'cr'}],
  'L': [{name: 'Italia', code: 'it'}, {name: 'Croacia', code: 'hr'}, {name: 'Camerún', code: 'cm'}, {name: 'Nueva Zelanda', code: 'nz'}]
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
