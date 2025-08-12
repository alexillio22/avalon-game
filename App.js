import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { assignRoles, getPlayerVision, getEvilTeamInfo, ROLES, GAME_CONFIG } from './components/GameLogic';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [gameAssignments, setGameAssignments] = useState([]);
  
  // Estado del juego
  const [gameState, setGameState] = useState({
    currentMission: 1,
    missionResults: [], // true = éxito, false = fracaso
    currentLeader: 0, // Índice del líder actual
    selectedTeam: [], // Jugadores seleccionados para la misión
    votingPhase: 'teamSelection', // 'teamSelection', 'teamVoting', 'secretMissionVoting', 'revealVotes', 'results'
    teamVotes: [], // Votos de aprobación del equipo (por defecto todos en true)
    missionVotes: [], // Votos de la misión
    currentSecretVoter: 0, // Índice del jugador votando en secreto
    failedProposals: 0, // Propuestas de equipo rechazadas consecutivas
    gameOver: false,
    winner: null
  });

  // Pantalla del menú principal
  const MenuScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>🏰 AVALON</Text>
      <Text style={styles.subtitle}>Juego de Cartas de Roles</Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setCurrentScreen('players')}
        >
          <Text style={styles.menuButtonText}>👥 Gestionar Jugadores</Text>
          <Text style={styles.menuButtonSubtext}>
            {players.length > 0 ? `${players.length} jugadores` : 'Añadir jugadores'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, (players.length < 5 || players.length > 12) && styles.disabledButton]} 
          onPress={() => players.length >= 5 && players.length <= 12 && startGame()}
        >
          <Text style={[styles.menuButtonText, (players.length < 5 || players.length > 12) && styles.disabledText]}>
            ⚔️ Iniciar Partida
          </Text>
          <Text style={styles.menuButtonSubtext}>
            {players.length < 5 ? 'Mínimo 5 jugadores' : 
             players.length > 12 ? 'Máximo 12 jugadores' : 
             `¡Listo para jugar! (${players.length} jugadores)`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Función para guardar el nombre editado
  const savePlayerName = () => {
    if (editingName.trim() === '') {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    
    const updatedPlayers = [...players];
    updatedPlayers[editingPlayer] = editingName.trim();
    setPlayers(updatedPlayers);
    setEditingPlayer(null);
    setEditingName('');
  };

  // Función para cancelar la edición
  const cancelEdit = () => {
    setEditingPlayer(null);
    setEditingName('');
  };

  // Pantalla de gestión de jugadores
  const PlayersScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Jugadores</Text>
      
      <View style={styles.playersContainer}>
        {players.length === 0 ? (
          <Text style={styles.emptyText}>No hay jugadores añadidos</Text>
        ) : (
          players.map((player, index) => (
            <View key={index} style={styles.playerCard}>
              {editingPlayer === index ? (
                // Modo edición
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.nameInput}
                    value={editingName}
                    onChangeText={setEditingName}
                    placeholder="Nombre del jugador"
                    placeholderTextColor="#888"
                    autoFocus
                    maxLength={20}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity 
                      onPress={savePlayerName}
                      style={styles.saveButton}
                    >
                      <Text style={styles.saveButtonText}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={cancelEdit}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Modo normal
                <>
                  <TouchableOpacity 
                    onPress={() => {
                      setEditingPlayer(index);
                      setEditingName(player);
                    }}
                    style={styles.nameContainer}
                  >
                    <Text style={styles.playerName}>{player}</Text>
                    <Text style={styles.editHint}>Toca para editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setPlayers(players.filter((_, i) => i !== index))}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))
        )}
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          const newPlayer = `Jugador ${players.length + 1}`;
          setPlayers([...players, newPlayer]);
        }}
      >
        <Text style={styles.addButtonText}>+ Añadir Jugador</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen('menu')}
      >
        <Text style={styles.backButtonText}>← Volver al Menú</Text>
      </TouchableOpacity>
    </View>
  );

  // Función para iniciar el juego y asignar roles
  const startGame = () => {
    try {
      const assignments = assignRoles(players);
      setGameAssignments(assignments);
      
      // Obtener configuración del juego
      const gameConfig = GAME_CONFIG[players.length];
      
      // Inicializar estado del juego
      const randomLeader = Math.floor(Math.random() * players.length);
      setGameState({
        currentMission: 1,
        missionResults: [],
        currentLeader: randomLeader,
        selectedTeam: [],
        votingPhase: 'teamSelection',
        teamVotes: [],
        missionVotes: [],
        currentSecretVoter: 0,
        failedProposals: 0,
        gameOver: false,
        winner: null,
        gameConfig: gameConfig // Añadir configuración del juego al estado
      });
      
      setCurrentScreen('roleReveal');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Pantalla de asignación de roles
  const RoleRevealScreen = () => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [showRole, setShowRole] = useState(false);
    
    const currentPlayer = gameAssignments[currentPlayerIndex];
    
    if (!currentPlayer) return null;
    
    const playerVision = getPlayerVision(currentPlayer, gameAssignments);
    const evilTeamInfo = getEvilTeamInfo(currentPlayer, gameAssignments);
    
    const nextPlayer = () => {
      setShowRole(false);
      if (currentPlayerIndex < gameAssignments.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        setCurrentScreen('game');
      }
    };
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎭 ASIGNACIÓN DE ROLES</Text>
        <Text style={styles.subtitle}>
          Jugador {currentPlayerIndex + 1} de {gameAssignments.length}
        </Text>
        
        <View style={styles.roleRevealContainer}>
          {!showRole ? (
            // Pantalla de preparación
            <View style={styles.prepContainer}>
              <Text style={styles.playerNameBig}>{currentPlayer.name}</Text>
              <Text style={styles.prepText}>Es tu turno de ver tu rol</Text>
              <Text style={styles.warningText}>
                ⚠️ Asegúrate de que nadie más esté mirando
              </Text>
              
              <TouchableOpacity 
                style={styles.revealButton}
                onPress={() => setShowRole(true)}
              >
                <Text style={styles.revealButtonText}>👁️ Revelar mi Rol</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Pantalla de rol revelado
            <View style={styles.roleContainer}>
              <Text style={styles.roleEmoji}>{currentPlayer.roleInfo.emoji}</Text>
              <Text style={styles.roleName}>{currentPlayer.roleInfo.name}</Text>
              <Text style={styles.roleTeam}>
                Equipo: {currentPlayer.roleInfo.team === 'good' ? '👑 Buenos' : '⚡ Malos'}
              </Text>
              <Text style={styles.roleDescription}>
                {currentPlayer.roleInfo.description}
              </Text>
              
              {/* Información que puede ver */}
              {playerVision.length > 0 && (
                <View style={styles.visionContainer}>
                  <Text style={styles.visionTitle}>
                    👁️ {currentPlayer.role === 'PERCIVAL' ? 'Ves a estos magos (¿quién es quién?)' : 'Puedes ver:'}
                  </Text>
                  {playerVision.map((visiblePlayer, index) => (
                    <Text key={index} style={styles.visionText}>
                      {visiblePlayer.emoji} {visiblePlayer.name} ({visiblePlayer.role})
                    </Text>
                  ))}
                  {currentPlayer.role === 'PERCIVAL' && (
                    <Text style={styles.mysteryText}>
                      🤔 Uno es Merlín, el otro es Morgana. ¡Debes averiguar cuál es cuál durante el juego!
                    </Text>
                  )}
                </View>
              )}
              
              {/* Información del equipo malo */}
              {evilTeamInfo.length > 0 && (
                <View style={styles.teamContainer}>
                  <Text style={styles.teamTitle}>⚡ Tus compañeros malvados:</Text>
                  {evilTeamInfo.map((teammate, index) => (
                    <Text key={index} style={styles.teamText}>
                      {teammate.emoji} {teammate.name} ({teammate.role})
                    </Text>
                  ))}
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={nextPlayer}
              >
                <Text style={styles.nextButtonText}>
                  {currentPlayerIndex < gameAssignments.length - 1 ? 
                    '➡️ Siguiente Jugador' : '🎮 Comenzar Partida'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Funciones auxiliares del juego
  const getMissionSize = () => {
    const config = GAME_CONFIG[players.length];
    return config ? config.missions[gameState.currentMission - 1] : 3;
  };

  const getCurrentLeader = () => {
    return gameAssignments[gameState.currentLeader];
  };

  const selectPlayer = (playerIndex) => {
    const maxTeamSize = getMissionSize();
    if (gameState.selectedTeam.includes(playerIndex)) {
      // Deseleccionar
      setGameState(prev => ({
        ...prev,
        selectedTeam: prev.selectedTeam.filter(i => i !== playerIndex)
      }));
    } else if (gameState.selectedTeam.length < maxTeamSize) {
      // Seleccionar
      setGameState(prev => ({
        ...prev,
        selectedTeam: [...prev.selectedTeam, playerIndex]
      }));
    }
  };

  const startTeamVoting = () => {
    if (gameState.selectedTeam.length !== getMissionSize()) {
      Alert.alert('Error', `Debes seleccionar exactamente ${getMissionSize()} jugadores`);
      return;
    }
    // Inicializar todos los votos como "aprobar" por defecto
    const defaultVotes = new Array(players.length).fill(true);
    setGameState(prev => ({ 
      ...prev, 
      votingPhase: 'teamVoting', 
      teamVotes: defaultVotes 
    }));
  };

  const toggleTeamVote = (playerIndex) => {
    const newVotes = [...gameState.teamVotes];
    newVotes[playerIndex] = !newVotes[playerIndex];
    setGameState(prev => ({ ...prev, teamVotes: newVotes }));
  };

  const finishTeamVoting = () => {
    const approvals = gameState.teamVotes.filter(v => v === true).length;
    const rejections = gameState.teamVotes.filter(v => v === false).length;
    
    if (approvals > rejections) {
      // Equipo aprobado - ir a votación secreta de misión
      const firstVoter = gameState.selectedTeam[0];
      setGameState(prev => ({ 
        ...prev, 
        votingPhase: 'secretMissionVoting', 
        currentSecretVoter: firstVoter,
        missionVotes: []
      }));
    } else {
      // Equipo rechazado
      const newFailedProposals = gameState.failedProposals + 1;
      if (newFailedProposals >= 5) {
        // Los malos ganan si se rechazan 5 propuestas
        setGameState(prev => ({ 
          ...prev, 
          gameOver: true, 
          winner: 'evil',
          votingPhase: 'results'
        }));
      } else {
        // Siguiente líder
        const nextLeader = (gameState.currentLeader + 1) % players.length;
        setGameState(prev => ({
          ...prev,
          currentLeader: nextLeader,
          selectedTeam: [],
          votingPhase: 'teamSelection',
          failedProposals: newFailedProposals,
          teamVotes: []
        }));
      }
    }
  };

  const submitSecretMissionVote = (vote) => {
    const newVotes = [...gameState.missionVotes];
    newVotes[gameState.currentSecretVoter] = vote;
    
    // Encontrar siguiente votante en el equipo
    const currentIndex = gameState.selectedTeam.indexOf(gameState.currentSecretVoter);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < gameState.selectedTeam.length) {
      // Siguiente jugador del equipo
      const nextVoter = gameState.selectedTeam[nextIndex];
      setGameState(prev => ({
        ...prev,
        currentSecretVoter: nextVoter,
        missionVotes: newVotes
      }));
    } else {
      // Todos han votado - ir a revelación
      setGameState(prev => ({
        ...prev,
        missionVotes: newVotes,
        votingPhase: 'revealVotes'
      }));
    }
  };

  const revealMissionVotes = () => {
    const teamVotes = gameState.selectedTeam.map(i => gameState.missionVotes[i]).filter(v => v !== undefined);
    const fails = teamVotes.filter(v => v === false).length;
    
    // Aplicar regla especial de la misión 4
    let missionSuccess;
    if (gameState.currentMission === 4 && gameState.gameConfig?.mission4RequiresTwoFails) {
      // En la misión 4 con 7+ jugadores, se necesitan 2 fallos para que ganen los malos
      missionSuccess = fails < 2;
    } else {
      // Regla normal: cualquier fallo hace fracasar la misión
      missionSuccess = fails === 0;
    }
    
    const newResults = [...gameState.missionResults, missionSuccess];
    const goodWins = newResults.filter(r => r === true).length;
    const evilWins = newResults.filter(r => r === false).length;
    
    if (goodWins >= 3) {
      // Los buenos ganan - verificar si pueden asesinar a Merlín
      const hasAssassin = gameAssignments.some(p => p.role === 'ASESINO');
      const hasMerlin = gameAssignments.some(p => p.role === 'MERLIN');
      
      if (hasAssassin && hasMerlin) {
        // Fase de asesinato de Merlín
        setGameState(prev => ({ 
          ...prev, 
          missionResults: newResults,
          votingPhase: 'merlinAssassination'
        }));
      } else {
        // Victoria inmediata de los buenos (sin Asesino o Merlín)
        setGameState(prev => ({ 
          ...prev, 
          missionResults: newResults,
          gameOver: true, 
          winner: 'good',
          votingPhase: 'results'
        }));
      }
    } else if (evilWins >= 3) {
      // Los malos ganan
      setGameState(prev => ({ 
        ...prev, 
        missionResults: newResults,
        gameOver: true, 
        winner: 'evil',
        votingPhase: 'results'
      }));
    } else {
      // Siguiente misión
      const nextLeader = (gameState.currentLeader + 1) % players.length;
      setGameState(prev => ({
        ...prev,
        currentMission: prev.currentMission + 1,
        missionResults: newResults,
        currentLeader: nextLeader,
        selectedTeam: [],
        votingPhase: 'teamSelection',
        failedProposals: 0,
        teamVotes: [],
        missionVotes: [],
        currentSecretVoter: 0
      }));
    }
  };

  // Función para intentar asesinar a Merlín
  const attemptMerlinAssassination = (targetIndex) => {
    const targetPlayer = gameAssignments[targetIndex];
    const isMerlin = targetPlayer.role === 'MERLIN';
    
    // Encontrar quién es realmente Merlín
    const realMerlinIndex = gameAssignments.findIndex(player => player.role === 'MERLIN');
    
    if (isMerlin) {
      // El Asesino encontró a Merlín - los malos ganan
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        winner: 'evil',
        votingPhase: 'results',
        assassinationTarget: targetIndex,
        assassinationResult: 'success',
        realMerlinIndex: realMerlinIndex
      }));
    } else {
      // El Asesino falló - los buenos ganan
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        winner: 'good',
        votingPhase: 'results',
        assassinationTarget: targetIndex,
        assassinationResult: 'failed',
        realMerlinIndex: realMerlinIndex
      }));
    }
  };

  // Pantalla de juego principal
  const GameScreen = () => {
    if (gameState.gameOver) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {gameState.winner === 'good' ? '👑 ¡LOS BUENOS GANAN!' : '⚡ ¡LOS MALOS GANAN!'}
          </Text>
          <Text style={styles.subtitle}>Fin del juego</Text>
          
          <View style={styles.gameContainer}>
            <Text style={styles.gameText}>Resultados de las misiones:</Text>
            {gameState.missionResults.map((result, index) => (
              <Text key={index} style={styles.gameText}>
                Misión {index + 1}: {result ? '✅ Éxito' : '❌ Fracaso'}
              </Text>
            ))}
            
            {/* Mostrar información del asesinato de Merlín si ocurrió */}
            {gameState.assassinationTarget !== undefined && (
              <View style={styles.assassinationResultContainer}>
                <Text style={styles.assassinationResultTitle}>
                  🗡️ Intento de Asesinato de Merlín
                </Text>
                <Text style={styles.assassinationResultText}>
                  🎯 Objetivo elegido: {players[gameState.assassinationTarget]}
                </Text>
                <Text style={[
                  styles.assassinationResultText,
                  gameState.assassinationResult === 'success' 
                    ? styles.assassinationSuccess 
                    : styles.assassinationFailed
                ]}>
                  {gameState.assassinationResult === 'success' 
                    ? '💀 ¡Correcto! Era Merlín. Los malos ganan.' 
                    : '❌ ¡Incorrecto! No era Merlín. Los buenos ganan.'}
                </Text>
                {gameState.assassinationResult === 'failed' && gameState.realMerlinIndex !== undefined && (
                  <Text style={styles.realMerlinReveal}>
                    🧙‍♂️ El verdadero Merlín era: {players[gameState.realMerlinIndex]}
                  </Text>
                )}
              </View>
            )}
            
            {/* Revelar todos los roles al final */}
            <View style={styles.roleRevealFinal}>
              <Text style={styles.finalRoleTitle}>🎭 Roles de todos los jugadores:</Text>
              {gameAssignments.map((player, index) => (
                <Text key={index} style={[
                  styles.finalRoleText,
                  player.roleInfo.team === 'good' ? styles.goodTeamText : styles.evilTeamText
                ]}>
                  {players[index]}: {player.roleInfo.emoji} {player.roleInfo.name}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              setCurrentScreen('menu');
              setGameAssignments([]);
              setGameState({
                currentMission: 1,
                missionResults: [],
                currentLeader: 0,
                selectedTeam: [],
                votingPhase: 'teamSelection',
                teamVotes: [],
                missionVotes: [],
                currentSecretVoter: 0,
                failedProposals: 0,
                gameOver: false,
                winner: null,
                gameConfig: null,
                assassinationTarget: undefined,
                assassinationResult: undefined,
                realMerlinIndex: undefined
              });
            }}
          >
            <Text style={styles.backButtonText}>← Nueva Partida</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.gameScrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>⚔️ MISIÓN {gameState.currentMission}</Text>
          <Text style={styles.subtitle}>
            Líder: {getCurrentLeader()?.name} | Equipo: {getMissionSize()} jugadores
          </Text>
          
          {/* Progreso de misiones */}
          <View style={styles.missionProgress}>
            {[1,2,3,4,5].map(mission => (
              <View key={mission} style={[
                styles.missionCircle,
                mission <= gameState.currentMission && styles.currentMissionCircle,
                gameState.missionResults[mission - 1] === true && styles.successMissionCircle,
                gameState.missionResults[mission - 1] === false && styles.failMissionCircle
              ]}>
                <Text style={styles.missionText}>{mission}</Text>
              </View>
            ))}
          </View>

          {/* Selección de equipo */}
          {gameState.votingPhase === 'teamSelection' && (
            <View style={styles.teamSelectionContainer}>
              <Text style={styles.phaseTitle}>
                👤 {getCurrentLeader()?.name}, selecciona tu equipo
              </Text>
              <Text style={styles.phaseSubtitle}>
                Selecciona {getMissionSize()} jugadores para la misión
              </Text>
              
              {/* Aviso para regla especial de misión 4 */}
              {gameState.currentMission === 4 && gameState.gameConfig?.mission4RequiresTwoFails && (
                <View style={styles.specialRuleMissionContainer}>
                  <Text style={styles.specialRuleMissionText}>
                    ⚡ REGLA ESPECIAL MISIÓN 4: Se necesitan 2 votos de FRACASO para que los malos ganen esta ronda
                  </Text>
                </View>
              )}
              
              <View style={styles.playersGrid}>
                {gameAssignments.map((player, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.playerSelectCard,
                      gameState.selectedTeam.includes(index) && styles.selectedPlayerCard
                    ]}
                    onPress={() => selectPlayer(index)}
                  >
                    <Text style={styles.playerSelectName}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.startVoteButton,
                  gameState.selectedTeam.length !== getMissionSize() && styles.disabledButton
                ]}
                onPress={startTeamVoting}
              >
                <Text style={styles.startVoteButtonText}>🗳️ Iniciar Votación de Equipo</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Votación de equipo */}
          {gameState.votingPhase === 'teamVoting' && (
            <View style={styles.votingContainer}>
              <Text style={styles.phaseTitle}>🗳️ Votación de Equipo</Text>
              <Text style={styles.phaseSubtitle}>
                Equipo propuesto: {gameState.selectedTeam.map(i => gameAssignments[i].name).join(', ')}
              </Text>
              <Text style={styles.instructionText}>
                Toca un jugador para cambiar su voto. Por defecto todos aprueban.
              </Text>
              
              <View style={styles.playersGrid}>
                {gameAssignments.map((player, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.voterCard,
                      gameState.teamVotes[index] ? styles.approvedVoterCard : styles.rejectedVoterCard
                    ]}
                    onPress={() => toggleTeamVote(index)}
                  >
                    <Text style={styles.voterName}>{player.name}</Text>
                    <Text style={styles.voteStatus}>
                      {gameState.teamVotes[index] ? '✅ Aprueba' : '❌ Rechaza'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.voteResultContainer}>
                <Text style={styles.voteCountText}>
                  Aprueban: {gameState.teamVotes.filter(v => v === true).length} | 
                  Rechazan: {gameState.teamVotes.filter(v => v === false).length}
                </Text>
                <TouchableOpacity 
                  style={styles.finishVotingButton}
                  onPress={finishTeamVoting}
                >
                  <Text style={styles.finishVotingButtonText}>🗳️ Finalizar Votación</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Votación secreta de misión */}
          {gameState.votingPhase === 'secretMissionVoting' && (
            <View style={styles.votingContainer}>
              <Text style={styles.phaseTitle}>🤫 Votación Secreta</Text>
              <Text style={styles.phaseSubtitle}>
                Turno de: {gameAssignments[gameState.currentSecretVoter]?.name}
              </Text>
              <Text style={styles.instructionText}>
                ⚠️ Solo {gameAssignments[gameState.currentSecretVoter]?.name} debe ver esta pantalla
              </Text>
              
              <View style={styles.secretVotingContainer}>
                <Text style={styles.secretVotingText}>
                  ¿Quieres que esta misión sea exitosa o fracase?
                </Text>
                
                <View style={styles.secretVoteButtons}>
                  <TouchableOpacity
                    style={[styles.secretVoteButton, styles.successButton]}
                    onPress={() => submitSecretMissionVote(true)}
                  >
                    <Text style={styles.secretVoteButtonText}>⚔️ ÉXITO</Text>
                    <Text style={styles.secretVoteDescription}>La misión tendrá éxito</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.secretVoteButton, styles.failButton]}
                    onPress={() => submitSecretMissionVote(false)}
                  >
                    <Text style={styles.secretVoteButtonText}>🗡️ FRACASO</Text>
                    <Text style={styles.secretVoteDescription}>La misión fracasará</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Revelación de votos */}
          {gameState.votingPhase === 'revealVotes' && (
            <View style={styles.votingContainer}>
              <Text style={styles.phaseTitle}>🎭 Revelación de Votos</Text>
              <Text style={styles.phaseSubtitle}>
                Resultados de la misión (anónimos)
              </Text>
              
              <View style={styles.voteRevealContainer}>
                <Text style={styles.voteRevealTitle}>Votos emitidos:</Text>
                <View style={styles.anonymousVotes}>
                  {gameState.selectedTeam.map((playerIndex, voteIndex) => {
                    const vote = gameState.missionVotes[playerIndex];
                    return (
                      <View key={voteIndex} style={[
                        styles.anonymousVote,
                        vote ? styles.successVote : styles.failVote
                      ]}>
                        <Text style={styles.anonymousVoteText}>
                          {vote ? '⚔️ ÉXITO' : '🗡️ FRACASO'}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                
                {/* Mostrar información especial de misión 4 si aplica */}
                {gameState.currentMission === 4 && gameState.gameConfig?.mission4RequiresTwoFails && (
                  <View style={styles.specialRuleContainer}>
                    <Text style={styles.specialRuleText}>
                      ⚡ Regla Especial Misión 4: Se necesitan 2 votos de FRACASO para que ganen los malos
                    </Text>
                  </View>
                )}
                
                <TouchableOpacity 
                  style={styles.revealButton}
                  onPress={revealMissionVotes}
                >
                  <Text style={styles.revealButtonText}>🎯 Ver Resultado Final</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Fase de asesinato de Merlín */}
          {gameState.votingPhase === 'merlinAssassination' && (
            <View style={styles.votingContainer}>
              <Text style={styles.phaseTitle}>🗡️ Asesinato de Merlín</Text>
              <Text style={styles.phaseSubtitle}>
                ¡Los buenos completaron 3 misiones!
              </Text>
              
              <View style={styles.assassinationContainer}>
                <Text style={styles.assassinationWarning}>
                  ⚔️ Los malos tienen una última oportunidad...
                </Text>
                <Text style={styles.assassinationText}>
                  El Asesino puede intentar matar a Merlín. Si lo logra, ¡los malos ganan!
                </Text>
                
                <Text style={styles.targetSelectionTitle}>
                  🎯 Selecciona el objetivo (solo jugadores BUENOS):
                </Text>
                
                <View style={styles.targetGrid}>
                  {gameAssignments.map((player, index) => {
                    // Solo mostrar jugadores del equipo bueno
                    if (player.roleInfo.team !== 'good') return null;
                    
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.targetButton}
                        onPress={() => attemptMerlinAssassination(index)}
                      >
                        <Text style={styles.targetButtonText}>🎯</Text>
                        <Text style={styles.targetPlayerName}>{players[index]}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                
                <Text style={styles.assassinationHint}>
                  💡 Pista: El Asesino debe decidir quién cree que es Merlín
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  // Renderizar la pantalla actual
  return (
    <SafeAreaView style={styles.safeArea}>
      {currentScreen === 'menu' && <MenuScreen />}
      {currentScreen === 'players' && <PlayersScreen />}
      {currentScreen === 'roleReveal' && <RoleRevealScreen />}
      {currentScreen === 'game' && <GameScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0f1c',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#8b9dc3',
    marginBottom: 40,
    textAlign: 'center',
  },
  
  // Estilos del menú principal
  menuContainer: {
    width: '100%',
    maxWidth: 400,
  },
  menuButton: {
    backgroundColor: '#2d5016',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4a7c26',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuButtonSubtext: {
    color: '#a8c776',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#3d3d3d',
    borderColor: '#666666',
  },
  disabledText: {
    color: '#888888',
  },

  // Estilos de la pantalla de jugadores
  playersContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  emptyText: {
    color: '#8b9dc3',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e2a4a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4a7c26',
  },
  nameContainer: {
    flex: 1,
  },
  playerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  editHint: {
    color: '#8b9dc3',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  
  // Estilos para edición de nombres
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  editButtons: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#4a7c26',
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#cc4444',
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#cc4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4a7c26',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estilos de navegación
  backButton: {
    backgroundColor: '#5a5a5a',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

  // Estilos de la pantalla de juego
  gameContainer: {
    backgroundColor: '#1e2a4a',
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  gameText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },

  // Estilos para asignación de roles
  roleRevealContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  prepContainer: {
    backgroundColor: '#1e2a4a',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a7c26',
  },
  playerNameBig: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 15,
  },
  prepText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#ff9999',
    marginBottom: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  revealButton: {
    backgroundColor: '#4a7c26',
    padding: 20,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  revealButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleContainer: {
    backgroundColor: '#2d1810',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffd700',
    maxWidth: 380,
  },
  roleEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  roleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleTeam: {
    fontSize: 16,
    color: '#a8c776',
    marginBottom: 15,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  visionContainer: {
    backgroundColor: '#0a0f1c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  visionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b9dc3',
    marginBottom: 8,
    textAlign: 'center',
  },
  visionText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  mysteryText: {
    fontSize: 12,
    color: '#ffd700',
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  teamContainer: {
    backgroundColor: '#4d1f1f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff9999',
    marginBottom: 8,
    textAlign: 'center',
  },
  teamText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2d5016',
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a7c26',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para las pantallas de misiones
  gameScrollView: {
    flex: 1,
    backgroundColor: '#0a0f1c',
  },
  missionProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  missionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3d3d3d',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#666',
  },
  currentMissionCircle: {
    backgroundColor: '#ffd700',
    borderColor: '#ffed4e',
  },
  successMissionCircle: {
    backgroundColor: '#4a7c26',
    borderColor: '#6ba832',
  },
  failMissionCircle: {
    backgroundColor: '#cc4444',
    borderColor: '#e55555',
  },
  missionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Estilos para selección de equipo
  teamSelectionContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  phaseSubtitle: {
    fontSize: 16,
    color: '#8b9dc3',
    textAlign: 'center',
    marginBottom: 20,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  playerSelectCard: {
    backgroundColor: '#1e2a4a',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4a7c26',
    minWidth: 120,
    alignItems: 'center',
  },
  selectedPlayerCard: {
    backgroundColor: '#2d5016',
    borderColor: '#ffd700',
  },
  playerSelectName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  startVoteButton: {
    backgroundColor: '#4a7c26',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6ba832',
  },
  startVoteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estilos para votación
  votingContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
  },
  voterCard: {
    backgroundColor: '#1e2a4a',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4a7c26',
    minWidth: 200,
    alignItems: 'center',
  },
  disabledVoterCard: {
    backgroundColor: '#2d2d2d',
    borderColor: '#555',
  },
  voterName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  voteButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4a7c26',
  },
  rejectButton: {
    backgroundColor: '#cc4444',
  },
  successButton: {
    backgroundColor: '#2d5016',
  },
  failButton: {
    backgroundColor: '#8b0000',
  },
  voteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Estilos para nueva votación de equipo
  instructionText: {
    color: '#8b9dc3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  approvedVoterCard: {
    backgroundColor: '#2d5016',
    borderColor: '#4a7c26',
  },
  rejectedVoterCard: {
    backgroundColor: '#4d1f1f',
    borderColor: '#cc4444',
  },
  voteStatus: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  voteResultContainer: {
    backgroundColor: '#1e2a4a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  voteCountText: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  finishVotingButton: {
    backgroundColor: '#4a7c26',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6ba832',
  },
  finishVotingButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para votación secreta
  secretVotingContainer: {
    backgroundColor: '#1e1e1e',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  secretVotingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '500',
  },
  secretVoteButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  secretVoteButton: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 140,
    borderWidth: 2,
  },
  secretVoteButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secretVoteDescription: {
    color: '#cccccc',
    fontSize: 12,
    textAlign: 'center',
  },

  // Estilos para revelación de votos
  voteRevealContainer: {
    backgroundColor: '#1e2a4a',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  voteRevealTitle: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  anonymousVotes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  anonymousVote: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
  },
  successVote: {
    backgroundColor: '#2d5016',
    borderColor: '#4a7c26',
  },
  failVote: {
    backgroundColor: '#4d1f1f',
    borderColor: '#cc4444',
  },
  anonymousVoteText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  revealButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffed4e',
  },
  revealButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para regla especial de misión 4
  specialRuleContainer: {
    backgroundColor: '#2a1810',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff9500',
    marginVertical: 10,
  },
  specialRuleText: {
    color: '#ff9500',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Estilo para aviso en selección de equipo
  specialRuleMissionContainer: {
    backgroundColor: '#1e2a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#66cc00',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  specialRuleMissionText: {
    color: '#66cc00',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Estilos para asesinato de Merlín
  assassinationContainer: {
    backgroundColor: '#2d1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#cc4444',
  },
  assassinationWarning: {
    color: '#ff6666',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  assassinationText: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  targetSelectionTitle: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  targetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  targetButton: {
    backgroundColor: '#1e2a4a',
    padding: 15,
    margin: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4a7c26',
    alignItems: 'center',
    minWidth: 120,
  },
  targetButtonText: {
    fontSize: 24,
    marginBottom: 5,
  },
  targetPlayerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  assassinationHint: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Estilos para resultados del asesinato
  assassinationResultContainer: {
    backgroundColor: '#2d1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cc4444',
    marginTop: 15,
  },
  assassinationResultTitle: {
    color: '#ff6666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  assassinationResultText: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  assassinationSuccess: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  assassinationFailed: {
    color: '#44ff44',
    fontWeight: 'bold',
  },
  realMerlinReveal: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: '#2a2a1e',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffd700',
  },

  // Estilos para revelación final de roles
  roleRevealFinal: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffd700',
    marginTop: 15,
  },
  finalRoleTitle: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  finalRoleText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 3,
  },
  goodTeamText: {
    color: '#44ff44',
  },
  evilTeamText: {
    color: '#ff4444',
  },
});
