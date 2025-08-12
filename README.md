# 🏰 Avalon - The Resistance

Un juego épico de roles basado en los Caballeros de la Mesa Redonda desarrollado como PWA (Progressive Web App) para iPhone.

## 🎮 Descripción del Juego

Avalon es un juego de deducción social donde los jugadores asumen roles secretos como **Caballeros Leales** o **Espías Malvados**. El objetivo es completar o sabotear misiones mientras mantienes tu identidad en secreto.

### 🗡️ Roles Disponibles
- **👑 Merlin**: Conoce a todos los espías pero debe mantenerse oculto
- **🛡️ Percival**: Conoce quién es Merlin (y Morgana)
- **⚔️ Caballeros Leales**: Deben identificar y detener a los espías
- **🗡️ Asesino**: Espía que puede matar a Merlin al final
- **🔮 Morgana**: Espía que aparece como Merlin ante Percival
- **👁️ Espías Malvados**: Conocen entre ellos y sabotean las misiones

## 📱 Características

- ✅ **Juego offline completo** - Funciona sin conexión a internet
- ✅ **PWA optimizada para iPhone** - Instálala en tu pantalla de inicio
- ✅ **Interfaz táctil intuitiva** - Diseñada específicamente para móviles
- ✅ **Botón "Nuevo Juego"** - Reinicia fácilmente las partidas
- ✅ **Sistema de votación mejorado** - Transiciones visuales claras
- ✅ **Detección automática de roles** - Configuración inteligente según número de jugadores
- ✅ **Temática medieval** - Diseño inmersivo con iconos del castillo

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework principal para desarrollo móvil
- **Expo** - Plataforma de desarrollo y build
- **Node.js** - Servidor de desarrollo local
- **PWA** - Progressive Web App con Service Worker
- **CSS/StyleSheet** - Estilos optimizados para móviles

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Un dispositivo en la misma red local

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/alexillio22/avalon-game.git
cd avalon-game
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Ejecutar el servidor de desarrollo
\`\`\`bash
npm start
\`\`\`

### 4. Acceder desde iPhone
1. El servidor mostrará las URLs disponibles en la terminal
2. Desde tu iPhone, abre Safari y ve a la URL mostrada (ej: \`http://192.168.1.XXX:3000\`)
3. Toca el botón **Compartir** (📤) en Safari
4. Selecciona **"Añadir a pantalla de inicio"**
5. ¡Ya puedes jugar offline desde tu pantalla de inicio!

## 🎯 Cómo Jugar

### Configuración
1. **Selecciona el número de jugadores** (5-10 jugadores)
2. **Distribuye los roles** - Cada jugador ve su rol secreto
3. **Comienza la primera misión**

### Flujo del Juego
1. **Selección del equipo** - El líder actual elige jugadores para la misión
2. **Votación del equipo** - Todos votan si aprueban o rechazan el equipo
3. **Ejecución de la misión** - Los jugadores seleccionados votan en secreto
4. **Resultado** - La misión se completa o falla según los votos
5. **Repetir** hasta que un bando gane

### Condiciones de Victoria
- **Caballeros Leales ganan**: Completan 3 misiones exitosamente
- **Espías Malvados ganan**: Fallan 3 misiones O el Asesino mata a Merlin

## 📁 Estructura del Proyecto

\`\`\`
avalon-game/
├── App.js                 # Componente principal del juego
├── components/
│   ├── GameComponents.js  # Componentes de interfaz
│   └── GameLogic.js      # Lógica del juego y roles
├── dist/                 # PWA compilada y lista para servir
│   ├── manifest.json     # Configuración PWA
│   ├── sw.js            # Service Worker para offline
│   └── *.png            # Iconos del juego
├── server-final.js       # Servidor de desarrollo optimizado
├── package.json          # Dependencias y scripts
└── README.md            # Este archivo
\`\`\`

## 🔧 Scripts Disponibles

\`\`\`bash
npm start           # Inicia el servidor de desarrollo
npm run build       # Compila la PWA para producción
npm run serve       # Sirve la versión compilada
\`\`\`

## 📱 Compatibilidad

- **iOS Safari** - Totalmente compatible como PWA
- **Android Chrome** - Compatible (no probado extensivamente)
- **Desktop** - Funcional pero optimizado para móvil

## 🎨 Personalización

### Cambiar Iconos
Los iconos del juego se encuentran en la carpeta \`dist/\`. Puedes reemplazar:
- \`icon-192.png\` - Icono pequeño
- \`icon-512.png\` - Icono grande
- \`favicon.ico\` - Favicon del navegador

### Modificar Roles
Edita el archivo \`components/GameLogic.js\` para añadir nuevos roles o modificar las reglas existentes.

### Personalizar Interfaz
Los estilos se encuentran en \`App.js\` usando \`StyleSheet\`. Modifica los colores, fuentes y dimensiones según tus preferencias.

## 🐛 Solución de Problemas

### El iPhone no encuentra el servidor
- Asegúrate de que ambos dispositivos estén en la misma red WiFi
- Verifica que el firewall no bloquee el puerto 3000
- Prueba con diferentes URLs mostradas en la terminal

### La PWA no se instala
- Usa Safari en iPhone (no Chrome u otros navegadores)
- Asegúrate de que el sitio se carga completamente antes de añadir a inicio
- Verifica que el archivo \`manifest.json\` sea válido

### Problemas de caché
- Borra el caché del navegador
- Elimina la PWA de la pantalla de inicio y vuelve a añadirla
- Reinicia el servidor de desarrollo

## 📝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/nueva-caracteristica\`)
3. Commit tus cambios (\`git commit -m 'Añadir nueva característica'\`)
4. Push a la rama (\`git push origin feature/nueva-caracteristica\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🏆 Créditos

Desarrollado por **alexillio22** como primer proyecto de desarrollo móvil.

Basado en el juego original **The Resistance: Avalon** de Don Eskridge.

---

## 🎭 ¡Disfruta del Juego!

¿Lograrán los Caballeros Leales completar las misiones y proteger el reino? ¿O los Espías Malvados conseguirán sabotear Avalon desde las sombras?

**¡Solo hay una forma de descubrirlo! 🏰⚔️**
