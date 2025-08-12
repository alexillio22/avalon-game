# � Guía de Desarrollo - Avalon (Juego de Cartas de Roles)

## 🌐 Desarrollo Web (Modo Principal)

### Iniciar el Juego

Abre una terminal en VS Code y ejecuta:

```bash
npm start
```

Luego abre tu navegador en: **http://localhost:8081**

### 🎯 Características del Juego

- **Juego de cartas de roles** inspirado en Avalon
- **Interfaz web optimizada** para desarrollo rápido
- **Temática medieval/fantasía** con colores dorados y azules
- **Navegación entre pantallas** (Menú → Jugadores → Juego)

## 📱 Desarrollo Móvil (Futuro)

### Para iPhone (Cuando esté listo)

1. Descarga **"Expo Go"** desde el App Store
2. Asegúrate de que tu iPhone esté en la **misma red WiFi** que tu computadora
3. Escanea el código QR que aparece en la terminal

## 🛠️ Si Tienes Problemas

### Problema: El código QR no funciona

**Solución:** Ejecuta con túnel

```bash
npx expo start --tunnel
```

### Problema: "Expo command not found"

**Solución:** Usar npx

```bash
npx expo start
```

### Problema: No se conecta a la red

**Solución:** Verificar que ambos dispositivos estén en la misma WiFi

- Ve a Configuración > WiFi en tu iPhone
- Compara con la red de tu computadora

## 🎯 Cómo Jugar Avalon (Juego de Cartas de Roles)

### Objetivo del Juego

- **Los Buenos** deben completar 3 misiones exitosas
- **Los Malos** deben sabotear 3 misiones o eliminar a Merlín
- **Merlín** conoce a los malvados pero debe permanecer oculto

### Roles Principales

- **🧙‍♂️ Merlín**: Conoce a los malvados (excepto Mordred)
- **🛡️ Percival**: Conoce a Merlín y Morgana
- **⚔️ Leal Siervo de Arturo**: No conoce información especial
- **�️ Esbirro de Mordred**: Conoce a los otros malvados
- **� Mordred**: Invisible para Merlín
- **� Morgana**: Se hace pasar por Merlín ante Percival

### Fases del Juego

1. **Asignación de Roles** secreta
2. **Selección de Equipos** para misiones
3. **Votación de Equipos** (aprobar/rechazar)
4. **Ejecución de Misiones** (éxito/fracaso)
5. **Identificación de Merlín** (si los buenos ganan)

## 🚀 Próximas Características a Desarrollar

1. **Menú principal completo** con navegación
2. **Pantalla de gestión de jugadores** (añadir/eliminar)
3. **Sistema de asignación de roles** aleatorio
4. **Pantallas de juego** para cada fase
5. **Interfaz de votación** táctil
6. **Revelación de información** según roles
7. **Sistema de puntuación** y estadísticas

## 💡 Tips para Desarrollar

### Estructura del Proyecto

- `App.js`: Navegación principal y lógica de estado
- `components/`: Componentes reutilizables del juego
- `assets/`: Recursos visuales y sonoros (futuro)

### Tecnologías Clave

- **React Native**: Componentes y lógica
- **AsyncStorage**: Guardar configuraciones
- **Expo Haptics**: Feedback táctil (futuro móvil)

## 📞 ¿Necesitas Ayuda?

Si encuentras algún problema:

1. **Revisa la consola** en VS Code por errores
2. **Reinicia el servidor** con Ctrl+C y luego `npm start`
3. **Verifica tu conexión** WiFi
4. **Actualiza Expo Go** en tu iPhone

¡Disfruta programando tu primer juego móvil! 🎮✨
