let barra;
let pelota;
let gestor;
let esperandoMovimiento = true;

function setup() {
  createCanvas(600, 400);
  barra = new Barra();
  pelota = new Pelota();
  gestor = new GestorNiveles();
  gestor.cargarNivel();
}

function draw() {
  background(0);
  barra.mover();
  barra.mostrar();

  if (esperandoMovimiento) {
    pelota.x = barra.x + barra.ancho / 2;
    pelota.y = barra.y - pelota.radio;
  } else {
    pelota.mover();
    pelota.verificarColisionBarra(barra);
  }

  pelota.mostrar();
  gestor.mostrarBloques();
  if (!esperandoMovimiento) {
    gestor.verificarColision(pelota);
  }

  textSize(16);
  fill(255);
  text(`Nivel: ${gestor.nivel} | Puntos: ${gestor.puntuacion} | Vidas: ${gestor.vidas}`, 10, 20);

  if (!esperandoMovimiento && pelota.fueraDePantalla()) {
    gestor.vidas--;
    if (gestor.vidas <= 0) {
      textSize(32);
      fill(255, 0, 0);
      text("Fin del juego", width / 2 - 80, height / 2);
      noLoop();
      return;
    }
    pelota.reiniciar();
    esperandoMovimiento = true;
  }

  if (!esperandoMovimiento && gestor.nivelCompletado()) {
    if (gestor.nivel < gestor.totalNiveles) {
      gestor.siguienteNivel();
      pelota.reiniciar();
      esperandoMovimiento = true;
    } else {
      textSize(32);
      fill(0, 255, 0);
      text("¡Has ganado!", width / 2 - 100, height / 2);
      noLoop();
    }
  }
}

function keyPressed() {
  if (esperandoMovimiento && (key === 'a' || key === 'A' || key === 'd' || key === 'D')) {
    esperandoMovimiento = false;
  }
}