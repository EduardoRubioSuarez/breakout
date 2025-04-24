class Barra {
    constructor() {
      this.ancho = 100;
      this.alto = 15;
      this.x = width / 2 - this.ancho / 2;
      this.y = height - 40;
      this.velocidad = 7;
    }
  
    mover() {
        if (keyIsDown(65)) this.x -= this.velocidad; 
        if (keyIsDown(68)) this.x += this.velocidad;
  
      this.x = constrain(this.x, 0, width - this.ancho);
    }
  
    mostrar() {
      fill(255);
      rect(this.x, this.y, this.ancho, this.alto);
    }
  }
  