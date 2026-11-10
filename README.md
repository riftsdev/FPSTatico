# Polígono — FPS mobile 3D (Etapa 1)

HTML5 + Three.js + Vite, estruturado para virar APK/IPA com Capacitor na Etapa 6.

## Executar
```bash
npm install
npm run dev        # abre em http://localhost:5173 e na rede local (--host)
npm run build      # gera dist/ (base relativa, pronta para Capacitor)
```
No celular, abra o endereço de rede mostrado pelo Vite (mesmo Wi-Fi do computador).

## Controles
**Touch (horizontal):** joystick flutuante na metade esquerda (empurre até a borda para correr); arraste na metade direita para olhar; botões Pular, Agachar (alterna), Slide e Correr; II pausa.
**PC (teste):** WASD, mouse (clique para capturar), Espaço, Shift, C, V, Esc pausa.

## O que a Etapa 1 contém
- Menu com transições, painel de configurações (sensibilidade X/Y, inverter Y, FOV, escala de renderização, sombras, FPS) salvo em localStorage.
- Mapa de treinamento: prédio com telhado acessível, pátio de contêineres, plataforma, corredor, muretas, caixas, escadas, 6 pontos de spawn.
- Controlador FPS: andar, correr, agachar, pular, slide, gravidade, colisão AABB com deslize em paredes, subida de degraus até 0,45 m, balanço de câmera.
- Multitoque (joystick + câmera + botões simultâneos), áreas seguras do iPhone, pausa ao trocar de aba e perda de contexto WebGL.
- Mapa inteiro em 1 draw call (InstancedMesh); nenhum asset externo, então não há licenças a documentar ainda.

## Decisões e pendências
- Colisão própria (`src/physics/World.js`) em vez de Rapier: mais leve e suficiente para esta etapa. Rapier entra se os projéteis físicos da Etapa 2 pedirem.
- Menu: Jogar, Armamento, Personalização e Perfil aparecem desativados com a etapa em que serão feitos.
- Pastas `weapons/`, `enemies/`, `audio/` e `public/assets/` estão vazias de propósito (Etapas 2, 3 e 5).
- Balanço da arma ao caminhar depende do modelo de arma (Etapa 2); por ora o balanço é aplicado à câmera.
