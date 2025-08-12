# 🚀 Guía Rápida - Configuración en Ordenador Personal

## Pasos para ejecutar Avalon en tu ordenador personal

### 1. Clonar desde GitHub
```bash
git clone [URL-DEL-REPOSITORIO]
cd avalon-game
```

### 2. Instalar Node.js (si no lo tienes)
- Descargar desde: https://nodejs.org/
- Versión recomendada: LTS (18.x o superior)

### 3. Instalar dependencias
```bash
npm install
```

### 4. Generar PWA
```bash
npm run build-web
```

### 5. Iniciar servidor
```bash
npm run serve-web
```

### 6. Obtener tu IP
**Windows:**
```cmd
ipconfig
```
Busca "Adaptador de LAN inalámbrica Wi-Fi" → IPv4

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 7. Acceder desde iPhone
1. Conectar iPhone y PC a la misma WiFi
2. Safari → `http://[tu-ip]:3000`
3. Compartir → "Añadir a pantalla de inicio"

## 🎯 URLs que necesitarás

- **Repositorio GitHub**: [AÑADIR URL AQUÍ]
- **Servidor local**: http://localhost:3000
- **Desde iPhone**: http://[tu-ip]:3000

## 🔧 Si algo falla

### Firewall de Windows
```cmd
netsh advfirewall firewall add rule name="Avalon" dir=in action=allow protocol=TCP localport=3000
```

### Error de dependencias web
```bash
npx expo install @expo/metro-runtime
npm run build-web
```

### Puerto ocupado
Cambiar puerto en `serve-pwa.js` línea 5:
```javascript
const PORT = 8080; // O cualquier otro puerto
```

## ✅ ¡Listo para jugar!

Una vez configurado, solo necesitas:
1. `npm run serve-web`
2. Acceder desde iPhone
3. ¡Disfrutar de Avalon! 🏰⚔️
