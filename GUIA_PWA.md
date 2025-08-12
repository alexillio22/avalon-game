# 🎮 Guía para Jugar Avalon en iPhone SIN Servidor de Desarrollo

Esta guía te permite jugar Avalon en tu iPhone como una PWA (Progressive Web App) sin necesidad de mantener conexión con el servidor de desarrollo.

## 🔧 Configuración Inicial (Solo una vez)

### 1. Generar la versión web
```bash
npm run build-web
```

### 2. Iniciar el servidor web
```bash
npm run serve-web
```

O directamente:
```bash
node serve-simple.js
```

## 📱 Acceso desde iPhone

### 1. Conectar a la misma red WiFi
- Asegúrate de que tu PC y tu iPhone están en la misma red WiFi

### 2. Obtener tu IP local
En tu PC, ejecuta uno de estos comandos:
- **Windows**: `ipconfig` (busca "IPv4 Address")
- **WSL/Linux**: `hostname -I`
- **Tu IP actual**: `172.26.45.23`

### 3. Abrir en Safari (iPhone)
1. Abre Safari en tu iPhone
2. Ve a: `http://172.26.45.23:3000`
3. La aplicación se cargará como una web

### 4. Instalar como App (PWA)
1. Una vez cargada la aplicación en Safari
2. Toca el botón de **Compartir** (📤)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Dale un nombre (ej: "Avalon Game")
5. Toca **"Añadir"**

## 🚀 ¡Listo para Jugar!

### Ventajas de esta configuración:
- ✅ **Funciona offline**: Después de la primera carga, funciona sin internet
- ✅ **No necesita Expo Go**: Se ejecuta como una app nativa
- ✅ **Sin servidor de desarrollo**: Solo necesitas iniciar el servidor web cuando quieras actualizar
- ✅ **Instalable**: Se comporta como una app real en tu iPhone
- ✅ **Rápido**: No hay retardos de conexión

### Para jugar:
1. Toca el ícono de Avalon en tu pantalla de inicio
2. ¡Disfruta del juego!

### Para actualizar la app:
1. Haz cambios en el código
2. Ejecuta `npm run build-web`
3. El servidor web servirá la nueva versión automáticamente
4. Recarga la app en el iPhone

## 🔄 Comandos de mantenimiento

```bash
# Iniciar servidor web
npm run serve-web

# Detener servidor web (si está ejecutándose)
# Presiona Ctrl+C en la terminal donde está corriendo

# Ver archivos generados
ls -la dist/
```

## 🎯 Solución de problemas

**Si no puedes acceder desde iPhone:**
1. Verifica que estás en la misma red WiFi
2. Confirma la IP con `hostname -I`
3. Asegúrate de que el puerto 3000 no esté bloqueado
4. Intenta con `http://` (no `https://`)

**Si la app no se actualiza:**
1. Ejecuta `npm run build-web`
2. Reinicia el servidor web
3. Recarga la página en Safari

¡Ya puedes jugar Avalon en tu iPhone como una app real! 🏰⚔️
