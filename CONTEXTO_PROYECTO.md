# 🏰 AVALON GAME - CONTEXTO COMPLETO DEL PROYECTO

## 📋 RESUMEN DEL PROYECTO

**Nombre**: Avalon - Juego de Cartas de Roles
**Tecnología**: React Native + Expo SDK 53 + PWA
**Objetivo**: Juego móvil para iPhone que funciona como PWA (Progressive Web App)
**Estado**: Proyecto completo y funcional, listo para desplegar

## 🎮 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Juego Completo de Avalon
- Soporte para 5-12 jugadores
- Todos los roles oficiales: Merlín, Percival, Morgana, Mordred, Asesino, Oberon, etc.
- Lógica completa de misiones, votaciones y asesinato de Merlín
- Reglas especiales: misión 4 con 2 fallos, 5 rechazos = victoria malvada
- Sistema de asignación aleatoria de roles
- Revelación de roles con información de visibilidad correcta

### ✅ Interfaz Móvil Optimizada
- Componentes React Native responsivos
- ScrollView en todas las pantallas críticas (solucionado problema de scroll)
- Navegación táctil intuitiva
- Estilos optimizados para iPhone
- SafeAreaView para manejo de pantallas

### ✅ PWA Funcional
- Service Worker implementado (`public/sw.js`)
- Manifest.json para instalación como app
- Funciona offline después de la primera carga
- Instalable desde Safari con "Añadir a pantalla de inicio"

## 🗂️ ESTRUCTURA DE ARCHIVOS PRINCIPALES

```
/Avalon/
├── App.js                 # Aplicación principal React Native
├── components/
│   └── GameLogic.js      # Lógica de roles, configuración de juego
├── public/               # Archivos PWA
│   ├── index.html
│   ├── manifest.json
│   └── sw.js
├── dist/                 # Build generado (no incluido en git)
├── serve-pwa.js          # Servidor web principal (puerto 3000)
├── serve-mobile.js       # Servidor alternativo (puerto 8080)
├── package.json          # Dependencias y scripts
├── app.json              # Configuración Expo
└── README_GITHUB.md      # Documentación completa
```

## ⚙️ CONFIGURACIÓN TÉCNICA

### Dependencias Clave
- expo: 53.0.20 (SDK 53)
- react: 19.0.0 
- react-native: 0.79.5
- @expo/metro-runtime: 5.0.4 (para soporte web)
- express: para servidores web

### Scripts Importantes
```json
{
  "build-web": "npx expo export -p web --output-dir dist",
  "serve-web": "node serve-pwa.js",
  "start": "expo start",
  "start-tunnel": "expo start --tunnel"
}
```

## 🌐 PROBLEMA ACTUAL (TRABAJO)

### Situación
- Ordenador del trabajo tiene restricciones de firewall/red
- VPN interfiere con conexiones locales
- No se puede acceder al servidor desde iPhone en la misma red WiFi
- Servidor funciona localmente pero no es accesible externamente

### IPs Detectadas
- PC Windows (trabajo): 192.168.1.160
- iPhone: 192.168.1.139
- Ambos en misma red WiFi pero firewall bloquea conexiones

## 🎯 SOLUCIÓN PLANIFICADA

### Migración a Ordenador Personal
1. **Subir a GitHub**: Repositorio git@github.com:alexillio22/avalon-game.git
2. **Clonar en PC personal**: Sin restricciones de firewall
3. **Configurar servidor**: npm run serve-web
4. **Acceso desde iPhone**: http://[ip-pc-personal]:3000
5. **Instalar PWA**: Safari → Compartir → "Añadir a pantalla de inicio"

## 🔧 COMANDOS PARA ORDENADOR PERSONAL

### Setup Inicial
```bash
git clone git@github.com:alexillio22/avalon-game.git
cd avalon-game
npm install
npm run build-web
npm run serve-web
```

### Obtener IP para iPhone
**Windows**: `ipconfig` → Buscar "Adaptador de LAN inalámbrica Wi-Fi"
**Mac/Linux**: `hostname -I` o `ifconfig | grep "inet "`

### URL para iPhone
`http://[tu-ip]:3000`

## 🎮 CÓMO JUGAR

1. **Gestionar Jugadores**: Añadir 5-12 jugadores, editar nombres
2. **Iniciar Partida**: Asignación automática de roles
3. **Revelación de Roles**: Cada jugador ve su rol y información secreta
4. **Juego por Misiones**: 
   - Líder selecciona equipo
   - Votación pública de aprobación de equipo
   - Votación secreta de misión (solo equipo seleccionado)
   - Revelación de resultados
5. **Victoria**: 3 misiones exitosas (buenos) vs 3 fracasos (malos)
6. **Asesinato de Merlín**: Si buenos ganan, asesino puede intentar matar a Merlín

## 📱 CARACTERÍSTICAS PWA

- **Offline**: Funciona sin internet después de instalación
- **Nativa**: Se comporta como app real en iPhone
- **Sin Expo Go**: No necesita aplicación externa
- **Actualizable**: Cambios se reflejan al recargar
- **Persistente**: Queda instalada en pantalla de inicio

## 🐛 TROUBLESHOOTING COMÚN

### Error "dist no existe"
```bash
npm run build-web
```

### Error dependencia web
```bash
npx expo install @expo/metro-runtime
npm run build-web
```

### Puerto ocupado
Cambiar PORT en serve-pwa.js línea 5

### Firewall bloqueando
```cmd
netsh advfirewall firewall add rule name="Avalon" dir=in action=allow protocol=TCP localport=3000
```

## 📝 NOTAS IMPORTANTES

- **Scroll solucionado**: Todas las pantallas usan ScrollView + SafeAreaView
- **Roles completos**: Implementadas todas las reglas oficiales de Avalon
- **PWA testada**: Service Worker y manifest funcionando
- **Responsive**: Optimizado para diferentes tamaños de pantalla
- **Expo SDK 53**: Versión más reciente y estable

## 🎯 OBJETIVO FINAL

Tener Avalon funcionando como PWA independiente en iPhone, accesible desde el ordenador personal sin restricciones de red, para poder jugar en cualquier momento y lugar.

---

**FECHA**: 12 Agosto 2025
**ESTADO**: Proyecto completo, listo para migrar a ordenador personal
**PRÓXIMO PASO**: Subir a GitHub y configurar en PC personal
