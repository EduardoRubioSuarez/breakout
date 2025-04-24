class GestorNiveles {
    constructor() {
      this.nivel = 1;
      this.bloques = [];
      this.totalNiveles = 3;
      this.puntuacion = 0;
      this.vidas = 3;
    }
  
    cargarNivel() {
        this.bloques = [];
      
        let filas = 3;
        let columnas;
        let golpesEspeciales = 0;
        let bloquesIndestructibles = 0;
      
        if (this.nivel === 1) {
          columnas = 4;
        } else if (this.nivel === 2) {
          columnas = 5;
          golpesEspeciales = 1;
        } else if (this.nivel === 3) {
          columnas = 6;
          golpesEspeciales = 2;
          bloquesIndestructibles = 1;
        }
      
        const anchoBloque = 60;
        const altoBloque = 20;
        const espacio = 5;
        const totalAncho = columnas * (anchoBloque + espacio) - espacio;
        const inicioX = (width - totalAncho) / 2;
        const inicioY = 50;
        let totalBloques = filas * columnas;
        let indicesEspeciales = [];
      
        while (indicesEspeciales.length < golpesEspeciales) {
          let index = floor(random(totalBloques));
          if (!indicesEspeciales.includes(index)) indicesEspeciales.push(index);
        }
      
        let indicesIndestructibles = [];
      
        while (indicesIndestructibles.length < bloquesIndestructibles) {
          let index = floor(random(totalBloques));
          if (
            !indicesEspeciales.includes(index) &&
            !indicesIndestructibles.includes(index)
          ) {
            indicesIndestructibles.push(index);
          }
        }
      
        for (let fila = 0; fila < filas; fila++) {
          for (let col = 0; col < columnas; col++) {
            let x = inicioX + col * (anchoBloque + espacio);
            let y = inicioY + fila * (altoBloque + espacio);
            let index = fila * columnas + col;
      
            let golpes = 1;
            let indestructible = false;
      
            if (indicesEspeciales.includes(index)) {
              golpes = 3;
            }
      
            if (indicesIndestructibles.includes(index)) {
              indestructible = true;
              golpes = 999;
            }
      
            this.bloques.push(new Bloque(x, y, golpes, indestructible));
          }
        }
      }
      
  
    mostrarBloques() {
      for (let bloque of this.bloques) {
        bloque.mostrar();
      }
    }
  
    verificarColision(pelota) {
        for (let bloque of this.bloques) {
          const puntos = bloque.recibirGolpe(pelota);
          if (puntos !== 0) {
            this.puntuacion = max(0, this.puntuacion + puntos);
            return;
          }
        }
      }
      
    
    nivelCompletado() {
      return this.bloques.every(b => b.destruido || b.indestructible);
    }
  
    siguienteNivel() {
      this.nivel++;
      this.cargarNivel();
    }
  
    reiniciarJuego() {
      this.nivel = 1;
      this.puntuacion = 0;
      this.vidas = 3;
      this.cargarNivel();
    }
  }