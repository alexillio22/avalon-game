# 🧪 Guía de Prueba - Nuevas Funcionalidades de Avalon

## 🎯 Cómo Probar las Nuevas Características

### 1. Regla Especial de la Misión 4 (7+ Jugadores)

#### Configuración para Prueba:

- **Añadir 7 jugadores** para activar la regla especial
- Jugar hasta llegar a la **Misión 4**
- Observar el indicador visual que dice: "⚡ Regla Especial Misión 4: Se necesitan 2 votos de FRACASO para que ganen los malos"

#### Escenarios de Prueba:

- **Escenario A**: Los malos votan 1 fracaso → Los buenos ganan la misión
- **Escenario B**: Los malos votan 2+ fracasos → Los malos ganan la misión
- **Escenario C**: Con 5-6 jugadores, verificar que sigue la regla normal (1 fracaso = victoria de los malos)

### 2. Fase de Asesinato de Merlín

#### Configuración para Prueba:

- Asegurarse de que hay un **Asesino** y un **Merlín** en el juego (automático con 5+ jugadores)
- Hacer que **los buenos ganen** completando 3 misiones exitosas

#### Qué Observar:

1. **Pantalla de Asesinato**: Debe aparecer automáticamente después de que los buenos ganen
2. **Solo Jugadores Buenos**: Solo deben aparecer como objetivos los jugadores del equipo bueno
3. **Resultado del Asesinato**:
   - Si el Asesino elige a Merlín → "💀 ¡Merlín fue asesinado! Los malos ganan."
   - Si el Asesino falla → "🛡️ ¡Merlín sobrevivió! Los buenos ganan."

### 3. Pantalla Final Mejorada

#### Qué Verificar:

- **Información del Asesinato**: Si ocurrió, debe mostrar el objetivo y el resultado
- **Revelación de Roles**: Todos los roles se revelan al final con colores:
  - 🟢 **Verde**: Jugadores buenos
  - 🔴 **Rojo**: Jugadores malos
- **Emojis y Nombres**: Cada rol debe mostrar su emoji y nombre completo

## 🔧 Casos de Prueba Específicos

### Caso 1: Regla Misión 4 (7 Jugadores)

```
1. Crear 7 jugadores: Ana, Bob, Carlos, Diana, Eva, Felipe, Gaby
2. Iniciar partida (Roles: Merlín, Percival, 2 Leales, Asesino, Morgana, Mordred)
3. Completar misiones 1-3 (permitir que llegue a misión 4)
4. En misión 4: Seleccionar equipo de 4 jugadores
5. Hacer que 1 malo vote fracaso → Verificar que la misión es exitosa
6. Reintentar con 2 malos votando fracaso → Verificar que la misión fracasa
```

### Caso 2: Asesinato de Merlín Exitoso

```
1. Crear 5 jugadores: Ana, Bob, Carlos, Diana, Eva
2. Roles: Merlín=Ana, Asesino=Bob, otros aleatorios
3. Hacer que los buenos ganen (completar 3 misiones)
4. En pantalla de asesinato: El Asesino debe elegir a Ana (Merlín)
5. Verificar mensaje: "Los malos ganan" por asesinato exitoso
```

### Caso 3: Asesinato de Merlín Fallido

```
1. Misma configuración que Caso 2
2. En pantalla de asesinato: El Asesino elige a Carlos (no Merlín)
3. Verificar mensaje: "Los buenos ganan" por asesinato fallido
```

## 🐛 Posibles Problemas y Soluciones

### Si no aparece la regla especial de Misión 4:

- Verificar que hay 7+ jugadores
- Confirmar que es exactamente la misión 4
- Reiniciar la aplicación si es necesario

### Si no aparece la pantalla de asesinato:

- Verificar que los buenos ganaron (3 misiones exitosas)
- Confirmar que hay Asesino y Merlín en el juego
- Verificar en los roles iniciales

### Si los estilos se ven mal:

- Reiniciar el servidor: `npm start`
- Verificar que no hay errores en la consola
- Probar en diferentes dispositivos/navegadores

## ✅ Lista de Verificación Final

- [ ] Regla especial misión 4 funciona correctamente (7+ jugadores)
- [ ] Regla normal misión 4 funciona (5-6 jugadores)
- [ ] Pantalla de asesinato aparece cuando corresponde
- [ ] Solo se muestran jugadores buenos como objetivos
- [ ] Asesinato exitoso da victoria a los malos
- [ ] Asesinato fallido da victoria a los buenos
- [ ] Revelación final muestra todos los roles
- [ ] Estilos y colores se ven correctamente
- [ ] Reinicio de partida limpia el estado correctamente

¡Disfruta probando las nuevas funcionalidades! 🎮✨
