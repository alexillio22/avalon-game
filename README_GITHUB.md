# 🏰 Avalon - Juego de Cartas de Roles

Juego de cartas de roles épico basado en los Caballeros de la Mesa Redonda. Desarrollado con React Native + Expo y optimizado para iPhone como PWA.

## 🎮 Características

- ✅ **5-12 jugadores**: Soporte completo para diferentes tamaños de grupo
- ✅ **Roles auténticos**: Merlín, Percival, Morgana, Mordred, Asesino, etc.
- ✅ **Reglas oficiales**: Misiones, votaciones, asesinato de Merlín
- ✅ **PWA completa**: Funciona offline después de la primera carga
- ✅ **Responsive**: Optimizado para móviles y pantallas táctiles
- ✅ **Scroll inteligente**: Maneja muchos jugadores sin problemas

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/avalon-game.git
cd avalon-game
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Generar la versión PWA
```bash
npm run build-web
```

### 4. Iniciar el servidor web
```bash
npm run serve-web
```

## 📱 Acceso desde iPhone

### Opción 1: PWA (Recomendada)
1. Conecta iPhone y PC a la misma red WiFi
2. Obtén tu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` o `hostname -I`
3. En Safari (iPhone): `http://[tu-ip]:3000`
4. Instalar: Compartir → "Añadir a pantalla de inicio"

### Opción 2: Expo Go (Desarrollo)
```bash
npm start
# Escanea el QR con Expo Go
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo con Expo
npm start                 # Servidor de desarrollo normal
npm run start-tunnel     # Con túnel (para redes complicadas)
npm run start-clear      # Limpiar caché y reiniciar

# PWA (Producción)
npm run build-web        # Generar versión web
npm run serve-web        # Servidor web para PWA

# Plataformas específicas
npm run ios              # Abrir en iOS Simulator
npm run android          # Abrir en Android Emulator
npm run web              # Abrir en navegador
```

## 🔧 Solución de Problemas

### No puedo acceder desde iPhone
1. **Verificar red WiFi**: Ambos dispositivos en la misma red
2. **Firewall de Windows**:
   ```cmd
   netsh advfirewall firewall add rule name="Avalon PWA" dir=in action=allow protocol=TCP localport=3000
   ```
3. **Usar IP correcta**: `ipconfig` para obtener la IP real

### Error al generar PWA
```bash
# Si falta dependencia web:
npx expo install @expo/metro-runtime

# Limpiar y regenerar:
rm -rf dist/
npm run build-web
```

## 📋 Reglas del Juego

### Roles Buenos
- **Merlín** 🧙‍♂️: Ve a los malos (excepto Mordred y Oberon)
- **Percival** 🛡️: Ve a Merlín y Morgana (sin distinguir)
- **Leal Siervo** ⚔️: Sin información especial
- **Aldeano Bueno** 🛡️: Ciudadano leal

### Roles Malvados
- **Asesino** 🗡️: Puede asesinar a Merlín si los buenos ganan
- **Morgana** 🔮: Aparece como Merlín para Percival
- **Mordred** 👑: Invisible para Merlín
- **Oberon** 🕴️: Espía solitario, invisible para todos
- **Esbirro** 🌑: Malvado sin poderes especiales

### Condiciones de Victoria
- **Buenos**: Completar 3 misiones exitosamente Y que Merlín no sea asesinado
- **Malos**: Sabotear 3 misiones O asesinar correctamente a Merlín O conseguir 5 rechazos de equipo

---

**¡Disfruta jugando Avalon!** 🏰⚔️
