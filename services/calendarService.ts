import { ScheduleInfo } from '../types';

// Mapeo detallado de fechas, horas y sedes para cada partido del simulador.
const MATCH_SCHEDULE: Record<string, ScheduleInfo> = {
  // --- GRUPO A ---
  'A-m1': { date: '11 de Junio, 2026', time: '13:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Grupo A' },
  'A-m2': { date: '11 de Junio, 2026', time: '18:00', venue: 'Estadio Akron, Guadalajara', phase: 'Grupo A' },
  'A-m3': { date: '17 de Junio, 2026', time: '20:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Grupo A' },
  'A-m4': { date: '17 de Junio, 2026', time: '15:00', venue: 'BMO Field, Toronto', phase: 'Grupo A' },
  'A-m5': { date: '24 de Junio, 2026', time: '20:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Grupo A' },
  'A-m6': { date: '24 de Junio, 2026', time: '20:00', venue: 'Estadio Akron, Guadalajara', phase: 'Grupo A' },

  // --- GRUPO B ---
  'B-m1': { date: '12 de Junio, 2026', time: '13:00', venue: 'BMO Field, Toronto', phase: 'Grupo B' },
  'B-m2': { date: '12 de Junio, 2026', time: '18:00', venue: 'BC Place, Vancouver', phase: 'Grupo B' },
  'B-m3': { date: '18 de Junio, 2026', time: '20:00', venue: 'BMO Field, Toronto', phase: 'Grupo B' },
  'B-m4': { date: '18 de Junio, 2026', time: '15:00', venue: 'Gillette Stadium, Boston', phase: 'Grupo B' },
  'B-m5': { date: '25 de Junio, 2026', time: '20:00', venue: 'BC Place, Vancouver', phase: 'Grupo B' },
  'B-m6': { date: '25 de Junio, 2026', time: '20:00', venue: 'BMO Field, Toronto', phase: 'Grupo B' },

  // --- GRUPO C ---
  'C-m1': { date: '13 de Junio, 2026', time: '13:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Grupo C' },
  'C-m2': { date: '13 de Junio, 2026', time: '18:00', venue: 'Hard Rock Stadium, Miami', phase: 'Grupo C' },
  'C-m3': { date: '19 de Junio, 2026', time: '15:00', venue: 'Lincoln Financial Field, Filadelfia', phase: 'Grupo C' },
  'C-m4': { date: '19 de Junio, 2026', time: '20:00', venue: 'Gillette Stadium, Boston', phase: 'Grupo C' },
  'C-m5': { date: '26 de Junio, 2026', time: '16:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Grupo C' },
  'C-m6': { date: '26 de Junio, 2026', time: '16:00', venue: 'Hard Rock Stadium, Miami', phase: 'Grupo C' },

  // --- GRUPO D ---
  'D-m1': { date: '12 de Junio, 2026', time: '20:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Grupo D' },
  'D-m2': { date: '13 de Junio, 2026', time: '15:00', venue: 'Lumen Field, Seattle', phase: 'Grupo D' },
  'D-m3': { date: '19 de Junio, 2026', time: '20:00', venue: 'Lumen Field, Seattle', phase: 'Grupo D' },
  'D-m4': { date: '20 de Junio, 2026', time: '13:00', venue: 'Levi\'s Stadium, San Francisco', phase: 'Grupo D' },
  'D-m5': { date: '25 de Junio, 2026', time: '20:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Grupo D' },
  'D-m6': { date: '25 de Junio, 2026', time: '20:00', venue: 'Lumen Field, Seattle', phase: 'Grupo D' },

  // --- GRUPO E ---
  'E-m1': { date: '14 de Junio, 2026', time: '13:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Grupo E' },
  'E-m2': { date: '14 de Junio, 2026', time: '18:00', venue: 'NRG Stadium, Houston', phase: 'Grupo E' },
  'E-m3': { date: '20 de Junio, 2026', time: '15:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Grupo E' },
  'E-m4': { date: '20 de Junio, 2026', time: '20:00', venue: 'AT&T Stadium, Dallas', phase: 'Grupo E' },
  'E-m5': { date: '26 de Junio, 2026', time: '19:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Grupo E' },
  'E-m6': { date: '26 de Junio, 2026', time: '19:00', venue: 'NRG Stadium, Houston', phase: 'Grupo E' },

  // --- GRUPO F ---
  'F-m1': { date: '14 de Junio, 2026', time: '15:00', venue: 'AT&T Stadium, Dallas', phase: 'Grupo F' },
  'F-m2': { date: '15 de Junio, 2026', time: '13:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Grupo F' },
  'F-m3': { date: '21 de Junio, 2026', time: '13:00', venue: 'NRG Stadium, Houston', phase: 'Grupo F' },
  'F-m4': { date: '21 de Junio, 2026', time: '18:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Grupo F' },
  'F-m5': { date: '26 de Junio, 2026', time: '19:00', venue: 'AT&T Stadium, Dallas', phase: 'Grupo F' },
  'F-m6': { date: '26 de Junio, 2026', time: '19:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Grupo F' },

  // --- GRUPO G ---
  'G-m1': { date: '15 de Junio, 2026', time: '15:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Grupo G' },
  'G-m2': { date: '15 de Junio, 2026', time: '20:00', venue: 'Levi\'s Stadium, San Francisco', phase: 'Grupo G' },
  'G-m3': { date: '21 de Junio, 2026', time: '15:00', venue: 'Lumen Field, Seattle', phase: 'Grupo G' },
  'G-m4': { date: '21 de Junio, 2026', time: '20:00', venue: 'BC Place, Vancouver', phase: 'Grupo G' },
  'G-m5': { date: '27 de Junio, 2026', time: '16:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Grupo G' },
  'G-m6': { date: '27 de Junio, 2026', time: '16:00', venue: 'Levi\'s Stadium, San Francisco', phase: 'Grupo G' },

  // --- GRUPO H ---
  'H-m1': { date: '16 de Junio, 2026', time: '13:00', venue: 'BMO Field, Toronto', phase: 'Grupo H' },
  'H-m2': { date: '16 de Junio, 2026', time: '18:00', venue: 'Gillette Stadium, Boston', phase: 'Grupo H' },
  'H-m3': { date: '22 de Junio, 2026', time: '13:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Grupo H' },
  'H-m4': { date: '22 de Junio, 2026', time: '18:00', venue: 'Lincoln Financial Field, Filadelfia', phase: 'Grupo H' },
  'H-m5': { date: '27 de Junio, 2026', time: '16:00', venue: 'BMO Field, Toronto', phase: 'Grupo H' },
  'H-m6': { date: '27 de Junio, 2026', time: '16:00', venue: 'Gillette Stadium, Boston', phase: 'Grupo H' },

  // --- GRUPO I ---
  'I-m1': { date: '16 de Junio, 2026', time: '15:00', venue: 'Estadio BBVA, Monterrey', phase: 'Grupo I' },
  'I-m2': { date: '16 de Junio, 2026', time: '20:00', venue: 'Estadio Akron, Guadalajara', phase: 'Grupo I' },
  'I-m3': { date: '22 de Junio, 2026', time: '15:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Grupo I' },
  'I-m4': { date: '22 de Junio, 2026', time: '20:00', venue: 'Estadio BBVA, Monterrey', phase: 'Grupo I' },
  'I-m5': { date: '27 de Junio, 2026', time: '19:00', venue: 'Estadio BBVA, Monterrey', phase: 'Grupo I' },
  'I-m6': { date: '27 de Junio, 2026', time: '19:00', venue: 'Estadio Akron, Guadalajara', phase: 'Grupo I' },

  // --- GRUPO J ---
  'J-m1': { date: '17 de Junio, 2026', time: '13:00', venue: 'Hard Rock Stadium, Miami', phase: 'Grupo J' },
  'J-m2': { date: '17 de Junio, 2026', time: '18:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Grupo J' },
  'J-m3': { date: '23 de Junio, 2026', time: '13:00', venue: 'NRG Stadium, Houston', phase: 'Grupo J' },
  'J-m4': { date: '23 de Junio, 2026', time: '18:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Grupo J' },
  'J-m5': { date: '27 de Junio, 2026', time: '19:00', venue: 'Hard Rock Stadium, Miami', phase: 'Grupo J' },
  'J-m6': { date: '27 de Junio, 2026', time: '19:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Grupo J' },

  // --- GRUPO K ---
  'K-m1': { date: '18 de Junio, 2026', time: '13:00', venue: 'AT&T Stadium, Dallas', phase: 'Grupo K' },
  'K-m2': { date: '18 de Junio, 2026', time: '18:00', venue: 'NRG Stadium, Houston', phase: 'Grupo K' },
  'K-m3': { date: '24 de Junio, 2026', time: '13:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Grupo K' },
  'K-m4': { date: '24 de Junio, 2026', time: '18:00', venue: 'Levi\'s Stadium, San Francisco', phase: 'Grupo K' },
  'K-m5': { date: '27 de Junio, 2026', time: '19:00', venue: 'AT&T Stadium, Dallas', phase: 'Grupo K' },
  'K-m6': { date: '27 de Junio, 2026', time: '19:00', venue: 'NRG Stadium, Houston', phase: 'Grupo K' },

  // --- GRUPO L ---
  'L-m1': { date: '18 de Junio, 2026', time: '15:00', venue: 'BC Place, Vancouver', phase: 'Grupo L' },
  'L-m2': { date: '18 de Junio, 2026', time: '20:00', venue: 'Lumen Field, Seattle', phase: 'Grupo L' },
  'L-m3': { date: '24 de Junio, 2026', time: '15:00', venue: 'Gillette Stadium, Boston', phase: 'Grupo L' },
  'L-m4': { date: '24 de Junio, 2026', time: '20:00', venue: 'BMO Field, Toronto', phase: 'Grupo L' },
  'L-m5': { date: '27 de Junio, 2026', time: '19:00', venue: 'BC Place, Vancouver', phase: 'Grupo L' },
  'L-m6': { date: '27 de Junio, 2026', time: '19:00', venue: 'Lumen Field, Seattle', phase: 'Grupo L' },

  // --- DIECISEISAVOS DE FINAL (ROUND OF 32) ---
  'R32-1': { date: '28 de Junio, 2026', time: '16:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Dieciseisavos' },
  'R32-2': { date: '28 de Junio, 2026', time: '19:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Dieciseisavos' },
  'R32-3': { date: '29 de Junio, 2026', time: '16:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Dieciseisavos' },
  'R32-4': { date: '29 de Junio, 2026', time: '19:00', venue: 'BMO Field, Toronto', phase: 'Dieciseisavos' },
  'R32-5': { date: '30 de Junio, 2026', time: '16:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Dieciseisavos' },
  'R32-6': { date: '30 de Junio, 2026', time: '19:00', venue: 'AT&T Stadium, Dallas', phase: 'Dieciseisavos' },
  'R32-7': { date: '1 de Julio, 2026', time: '16:00', venue: 'Hard Rock Stadium, Miami', phase: 'Dieciseisavos' },
  'R32-8': { date: '1 de Julio, 2026', time: '19:00', venue: 'Gillette Stadium, Boston', phase: 'Dieciseisavos' },
  'R32-9': { date: '2 de Julio, 2026', time: '16:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Dieciseisavos' },
  'R32-10': { date: '2 de Julio, 2026', time: '19:00', venue: 'NRG Stadium, Houston', phase: 'Dieciseisavos' },
  'R32-11': { date: '3 de Julio, 2026', time: '16:00', venue: 'Lincoln Financial Field, Filadelfia', phase: 'Dieciseisavos' },
  'R32-12': { date: '3 de Julio, 2026', time: '19:00', venue: 'Levi\'s Stadium, San Francisco', phase: 'Dieciseisavos' },
  'R32-13': { date: '3 de Julio, 2026', time: '16:00', venue: 'BC Place, Vancouver', phase: 'Dieciseisavos' },
  'R32-14': { date: '3 de Julio, 2026', time: '19:00', venue: 'Lumen Field, Seattle', phase: 'Dieciseisavos' },
  'R32-15': { date: '3 de Julio, 2026', time: '16:00', venue: 'Estadio Akron, Guadalajara', phase: 'Dieciseisavos' },
  'R32-16': { date: '3 de Julio, 2026', time: '19:00', venue: 'Estadio BBVA, Monterrey', phase: 'Dieciseisavos' },

  // --- OCTAVOS DE FINAL (ROUND OF 16) ---
  'R16-1': { date: '4 de Julio, 2026', time: '16:00', venue: 'Estadio Azteca, Ciudad de México', phase: 'Octavos de Final' },
  'R16-2': { date: '4 de Julio, 2026', time: '19:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Octavos de Final' },
  'R16-3': { date: '5 de Julio, 2026', time: '16:00', venue: 'BMO Field, Toronto', phase: 'Octavos de Final' },
  'R16-4': { date: '5 de Julio, 2026', time: '19:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Octavos de Final' },
  'R16-5': { date: '6 de Julio, 2026', time: '16:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Octavos de Final' },
  'R16-6': { date: '6 de Julio, 2026', time: '19:00', venue: 'AT&T Stadium, Dallas', phase: 'Octavos de Final' },
  'R16-7': { date: '7 de Julio, 2026', time: '16:00', venue: 'BC Place, Vancouver', phase: 'Octavos de Final' },
  'R16-8': { date: '7 de Julio, 2026', time: '19:00', venue: 'Hard Rock Stadium, Miami', phase: 'Octavos de Final' },

  // --- CUARTOS DE FINAL ---
  'QF-1': { date: '9 de Julio, 2026', time: '16:00', venue: 'Gillette Stadium, Boston', phase: 'Cuartos de Final' },
  'QF-2': { date: '10 de Julio, 2026', time: '19:00', venue: 'SoFi Stadium, Los Ángeles', phase: 'Cuartos de Final' },
  'QF-3': { date: '11 de Julio, 2026', time: '16:00', venue: 'Arrowhead Stadium, Kansas City', phase: 'Cuartos de Final' },
  'QF-4': { date: '11 de Julio, 2026', time: '19:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Cuartos de Final' },

  // --- SEMIFINALES ---
  'SF-1': { date: '14 de Julio, 2026', time: '18:00', venue: 'AT&T Stadium, Dallas', phase: 'Semifinal' },
  'SF-2': { date: '15 de Julio, 2026', time: '18:00', venue: 'Mercedes-Benz Stadium, Atlanta', phase: 'Semifinal' },

  // --- FINAL ---
  'F-1': { date: '19 de Julio, 2026', time: '14:00', venue: 'MetLife Stadium, Nueva York/Nueva Jersey', phase: 'Final' }
};

export const getMatchSchedule = (matchId: string): ScheduleInfo => {
  return MATCH_SCHEDULE[matchId] || {
    date: 'Por definir',
    time: 'Por definir',
    venue: 'Sede por definir',
    phase: matchId.startsWith('R32') ? 'Dieciseisavos' :
           matchId.startsWith('R16') ? 'Octavos de Final' :
           matchId.startsWith('QF') ? 'Cuartos de Final' :
           matchId.startsWith('SF') ? 'Semifinal' :
           matchId.startsWith('F') ? 'Final' : 'Fase de Grupos'
  };
};

// Listado de sedes únicas para usar en filtros
export const SEDES = Array.from(new Set(Object.values(MATCH_SCHEDULE).map(s => s.venue))).sort();
