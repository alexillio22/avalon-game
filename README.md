# 🏰 Avalon - El Juego de Roles Épico

¡Bienvenido a **Avalon**, una adaptación móvil del legendario juego de cartas y roles! Únete a los Caballeros de la Mesa Redonda en su búsqueda del Santo Grial, pero ten cuidado... algunos entre vosotros sirven a las fuerzas del mal.

## 🎮 Acerca del Juego

Avalon es un juego de deducción social donde los jugadores asumen roles secretos como Caballeros leales o traidores de Morgana. A través de misiones, debates y votaciones, deberás descubrir quién es digno de confianza y quién conspira en las sombras.

### Características Principales
- 🎭 **Sistema de roles secretos** con habilidades únicas
- 👥 **Gestión de jugadores** (5-10 participantes)
- �️ **Sistema de votaciones** y propuestas de misiones
- � **Cartas de rol** interactivas
- 📱 **Interfaz táctil** optimizada para grupos
- 🌙 **Tema medieval** inmersivo

## 🛠️ Tecnologías Utilizadas

- **React Native + Expo**: Framework principal para desarrollo móvil
- **JavaScript/React**: Lenguaje y librería de interfaz
- **Expo CLI**: Herramientas de desarrollo y construcción
- **React Native Reanimated**: Para animaciones de cartas y transiciones
- **AsyncStorage**: Para guardar configuraciones y partidas

## 📱 Requisitos del Sistema

### Para Desarrollo
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Visual Studio Code (recomendado)

### Para Probar en Dispositivo
- iPhone con iOS 13.0 o superior
- App Expo Go (disponible en App Store)
- Conexión a la misma red WiFi que tu computadora

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Instalar Expo CLI Globalmente
```bash
npm install -g @expo/cli
```

### 3. Iniciar el Proyecto
```bash
npm start
```

### 4. Probar en tu iPhone
1. Descarga la app "Expo Go" desde el App Store
2. Escanea el código QR que aparece en tu terminal/navegador
3. ¡El juego se cargará automáticamente en tu teléfono!

## 🎯 Cómo Funciona el Juego

### Mecánica Básica
1. **Configuración**: Los jugadores reciben roles secretos (Caballeros leales vs. espías de Morgana)
2. **Propuestas**: Los jugadores proponen equipos para las misiones
3. **Votaciones**: El grupo vota si aprueban o rechazan cada propuesta
4. **Misiones**: Los equipos aprobados realizan misiones que pueden ser saboteadas
5. **Victoria**: Los buenos ganan completando 3 misiones, los malos ganan saboteando 3 misiones

### Roles Disponibles
- **👑 Merlín**: Conoce a los espías pero debe mantenerse oculto
- **🛡️ Percival**: Conoce a Merlín pero no puede distinguirlo de Morgana
- **⚔️ Caballeros Leales**: Deben completar las misiones sin conocer identidades
- **🌙 Morgana**: Se presenta como Merlín ante Percival
- **🗡️ Asesino**: Puede intentar asesinar a Merlín al final
- **👤 Espías de Morgana**: Deben sabotear las misiones

## 📱 Estado Actual del Desarrollo

### ✅ Completado
- [x] Menú principal con navegación
- [x] Sistema de gestión de jugadores
- [x] Interfaz base del juego
- [x] Diseño temático medieval

### 🚧 En Desarrollo
- [ ] Sistema de asignación de roles
- [ ] Pantalla de cartas de rol
- [ ] Sistema de votaciones
- [ ] Gestión de misiones
- [ ] Timer de turnos

### � Próximas Características
- [ ] Modo multijugador local
- [ ] Efectos de sonido temáticos
- [ ] Animaciones de cartas
- [ ] Sistema de estadísticas
- [ ] Modos de juego personalizados

## 🆘 Solución de Problemas

### El código QR no funciona
- Asegúrate de estar en la misma red WiFi
- Verifica que Expo Go esté actualizado
- Reinicia el servidor con `npm start`

### Errores de instalación
- Verifica que Node.js esté instalado: `node --version`
- Limpia la caché: `npm cache clean --force`
- Reinstala dependencias: `rm -rf node_modules && npm install`

### Performance en dispositivo
- El primer inicio puede ser lento
- Cierra otras apps para liberar memoria
- Usa una conexión WiFi estable

## 🤝 Contribuir

Como este es tu primer proyecto móvil, ¡experimentar es clave!

1. Haz cambios pequeños y pruébalos inmediatamente
2. Usa GitHub Copilot para sugerencias de código
3. Consulta la documentación de Expo: https://docs.expo.dev/
4. Únete a la comunidad React Native para ayuda

## 🆕 Nuevas Funcionalidades Implementadas

### Regla Especial de la Misión 4
- **Para 7+ jugadores**: En la misión 4, se necesitan **2 votos de fracaso** para que ganen los malos
- **Para 5-6 jugadores**: Sigue la regla normal (1 voto de fracaso)
- Se muestra un indicador visual cuando esta regla está activa

### Fase de Asesinato de Merlín
- **Al final del juego**: Si los buenos ganan completando 3 misiones, los malos tienen una última oportunidad
- **Pantalla especial**: Solo se muestran los jugadores del equipo bueno como objetivos
- **Victoria final**: Si el Asesino mata a Merlín, los malos ganan; si no, ganan los buenos
- **Revelación completa**: Al final se revelan todos los roles de todos los jugadores

### Mejoras en la Interfaz
- Indicadores visuales para reglas especiales
- Pantalla dedicada para el asesinato de Merlín
- Resultados detallados con información del asesinato
- Revelación final de todos los roles con colores diferenciados

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🌟 ¡Disfruta Programando!

Recuerda: cada gran desarrollador de juegos comenzó con su primer proyecto. ¡Avalon es el tuyo! No tengas miedo de experimentar, romper cosas y aprender en el proceso.

**¡Que comience tu aventura en el desarrollo de juegos móviles!** 🎮✨
