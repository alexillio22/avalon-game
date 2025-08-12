// Sistema de Roles para Avalon
// Cada rol tiene información específica sobre qué puede ver

export const ROLES = {
  // BUENOS
  MERLIN: {
    name: 'Merlín',
    emoji: '🧙‍♂️',
    team: 'good',
    description: 'Conoce a los malvados, pero debe mantenerse oculto',
    canSee: ['ASESINO', 'MORGANA', 'ALDEANO_MALO'], // Ve a los malos EXCEPTO Mordred y Oberon
    winCondition: 'Los buenos completan 3 misiones Y Merlín no es asesinado'
  },
  
  PERCIVAL: {
    name: 'Percival',
    emoji: '🛡️',
    team: 'good',
    description: 'Ve a Merlín y Morgana juntos, pero no sabe cuál es cuál',
    canSee: ['MERLIN', 'MORGANA'], // Ve a ambos pero sin identificar
    specialVision: 'anonymous', // Marca especial para visión anónima
    winCondition: 'Los buenos completan 3 misiones'
  },
  
  LEAL_SIERVO: {
    name: 'Leal Siervo de Arturo',
    emoji: '⚔️',
    team: 'good',
    description: 'No tiene información especial, solo su lealtad',
    canSee: [], // No ve a nadie
    winCondition: 'Los buenos completan 3 misiones'
  },
  
  ALDEANO_BUENO: {
    name: 'Aldeano de Arturo',
    emoji: '🛡️',
    team: 'good',
    description: 'Ciudadano leal sin poderes especiales',
    canSee: [], // No ve a nadie
    winCondition: 'Los buenos completan 3 misiones'
  },
  
  // MALOS
  ASESINO: {
    name: 'Asesino de Mordred',
    emoji: '🗡️',
    team: 'evil',
    description: 'Conoce a los otros malvados. Puede asesinar a Merlín',
    canSee: ['MORGANA', 'MORDRED', 'ALDEANO_MALO'], // Ve a todos los malos excepto Oberon
    specialAbility: 'Puede intentar asesinar a Merlín si los buenos ganan',
    winCondition: 'Los malos sabotean 3 misiones O asesinan a Merlín'
  },
  
  MORGANA: {
    name: 'Morgana',
    emoji: '🔮',
    team: 'evil',
    description: 'Se hace pasar por Merlín ante Percival',
    canSee: ['ASESINO', 'MORDRED', 'ALDEANO_MALO'], // Ve a todos los malos excepto Oberon
    specialAbility: 'Aparece como Merlín para Percival',
    winCondition: 'Los malos sabotean 3 misiones O asesinan a Merlín'
  },
  
  MORDRED: {
    name: 'Mordred',
    emoji: '👑',
    team: 'evil',
    description: 'Invisible para Merlín, líder de las sombras',
    canSee: ['ASESINO', 'MORGANA', 'ALDEANO_MALO'], // Ve a todos los malos excepto Oberon
    specialAbility: 'Invisible para Merlín',
    winCondition: 'Los malos sabotean 3 misiones O asesinan a Merlín'
  },
  
  ALDEANO_MALO: {
    name: 'Esbirro de Mordred',
    emoji: '🌑',
    team: 'evil',
    description: 'Siervo malvado sin poderes especiales',
    canSee: ['ASESINO', 'MORGANA', 'MORDRED'], // Ve a los otros malos excepto Oberon
    winCondition: 'Los malos sabotean 3 misiones O asesinan a Merlín'
  },
  
  OBERON: {
    name: 'Oberon',
    emoji: '🕴️',
    team: 'evil',
    description: 'Espía solitario - invisible para todos, no ve a nadie',
    canSee: [], // No ve a ningún malo
    specialAbility: 'Invisible para todos los demás roles',
    winCondition: 'Los malos sabotean 3 misiones O asesinan a Merlín'
  }
};

// Configuración de juego según número de jugadores
export const GAME_CONFIG = {
  5: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'ASESINO', 'MORGANA'],
    goodCount: 3,
    evilCount: 2,
    missions: [2, 3, 2, 3, 3],
    // Regla especial: misión 4 no requiere 2 fallos (menos de 7 jugadores)
    mission4RequiresTwoFails: false
  },
  6: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'LEAL_SIERVO', 'ASESINO', 'MORGANA'],
    goodCount: 4,
    evilCount: 2,
    missions: [2, 3, 4, 3, 4],
    mission4RequiresTwoFails: false
  },
  7: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'LEAL_SIERVO', 'ASESINO', 'MORGANA', 'MORDRED'],
    goodCount: 4,
    evilCount: 3,
    missions: [2, 3, 3, 4, 4],
    // Regla especial: misión 4 requiere 2 fallos para que ganen los malos (7+ jugadores)
    mission4RequiresTwoFails: true
  },
  8: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'LEAL_SIERVO', 'LEAL_SIERVO', 'ASESINO', 'MORGANA', 'MORDRED'],
    goodCount: 5,
    evilCount: 3,
    missions: [3, 4, 4, 5, 5],
    mission4RequiresTwoFails: true
  },
  9: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'LEAL_SIERVO', 'LEAL_SIERVO', 'ASESINO', 'MORGANA', 'MORDRED', 'ALDEANO_MALO'],
    goodCount: 5,
    evilCount: 4,
    missions: [3, 4, 4, 5, 5],
    mission4RequiresTwoFails: true
  },
  10: {
    roles: ['MERLIN', 'PERCIVAL', 'LEAL_SIERVO', 'LEAL_SIERVO', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ASESINO', 'MORGANA', 'MORDRED', 'OBERON'],
    goodCount: 6,
    evilCount: 4,
    missions: [3, 4, 4, 5, 5],
    mission4RequiresTwoFails: true
  },
  11: {
    roles: ['MERLIN', 'PERCIVAL', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ASESINO', 'MORGANA', 'MORDRED', 'OBERON', 'ALDEANO_MALO'],
    goodCount: 6,
    evilCount: 5,
    missions: [3, 4, 4, 5, 5],
    mission4RequiresTwoFails: true
  },
  12: {
    roles: ['MERLIN', 'PERCIVAL', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ALDEANO_BUENO', 'ASESINO', 'MORGANA', 'MORDRED', 'OBERON', 'ALDEANO_MALO', 'ALDEANO_MALO'],
    goodCount: 6,
    evilCount: 6,
    missions: [3, 4, 4, 5, 5],
    mission4RequiresTwoFails: true
  }
};

// Función para asignar roles aleatoriamente
export function assignRoles(players) {
  const playerCount = players.length;
  const config = GAME_CONFIG[playerCount];
  
  if (!config) {
    throw new Error(`No hay configuración para ${playerCount} jugadores`);
  }
  
  // Mezclar roles aleatoriamente
  const shuffledRoles = [...config.roles].sort(() => Math.random() - 0.5);
  
  // Asignar a jugadores
  const assignments = players.map((playerName, index) => ({
    name: playerName,
    role: shuffledRoles[index],
    roleInfo: ROLES[shuffledRoles[index]]
  }));
  
  return assignments;
}

// Función para obtener qué ve cada jugador
export function getPlayerVision(playerAssignment, allAssignments) {
  const role = playerAssignment.roleInfo;
  const canSeeRoles = role.canSee || [];
  
  if (canSeeRoles.length === 0) {
    return [];
  }
  
  // Encontrar jugadores que este rol puede ver
  const visiblePlayers = allAssignments.filter(assignment => 
    canSeeRoles.includes(assignment.role) && 
    assignment.name !== playerAssignment.name
  );
  
  // Caso especial para Percival: ve a Merlín y Morgana pero sin identificar
  if (playerAssignment.role === 'PERCIVAL') {
    return visiblePlayers.map(player => ({
      name: player.name,
      role: '❓ Mago', // No revela si es Merlín o Morgana
      emoji: '🔮',
      mystery: true
    }));
  }
  
  // Para otros roles, mostrar información completa
  return visiblePlayers.map(player => ({
    name: player.name,
    role: player.roleInfo.name,
    emoji: player.roleInfo.emoji,
    mystery: false
  }));
}

// Función para obtener información de equipo para malos
export function getEvilTeamInfo(playerAssignment, allAssignments) {
  if (playerAssignment.roleInfo.team !== 'evil') {
    return [];
  }
  
  // Caso especial para Oberon: no ve a nadie
  if (playerAssignment.role === 'OBERON') {
    return [];
  }
  
  const canSeeRoles = playerAssignment.roleInfo.canSee || [];
  
  // Filtrar jugadores malvados que este rol puede ver
  const visibleEvilPlayers = allAssignments.filter(assignment => 
    assignment.roleInfo.team === 'evil' && 
    assignment.name !== playerAssignment.name &&
    canSeeRoles.includes(assignment.role)
  );
  
  return visibleEvilPlayers.map(player => ({
    name: player.name,
    role: player.roleInfo.name,
    emoji: player.roleInfo.emoji
  }));
}
