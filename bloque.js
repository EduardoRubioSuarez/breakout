class Bloque {
    constructor(x, y, golpes = 1, indestructible = false) {
      this.x = x;
      this.y = y;
      this.ancho = 60;
      this.alto = 20;
      this.golpes = golpes;
      this.indestructible = indestructible;
      this.destruido = false;
    }
  
    mostrar() {
      if (this.destruido) return;
  
      if (this.indestructible) fill(100);
      else fill(255 - this.golpes * 50, 0, 0);
  
      rect(this.x, this.y, this.ancho, this.alto);
    }
  
    recibirGolpe(pelota) {
        if (this.destruido) return 0;
      
        const colision =
          pelota.x > this.x &&
          pelota.x < this.x + this.ancho &&
          pelota.y - pelota.radio < this.y + this.alto &&
          pelota.y + pelota.radio > this.y;
      
        if (colision) {
          pelota.vy *= -1;
      
          if (this.indestructible) {
            return -1;
          }
      
          this.golpes--;
          if (this.golpes <= 0) {
            this.destruido = true;
            return 1;
          } else if (this.golpes === 2) {
            return 3;
          } else {
            return 0;
          }
        }
      
        return 0;
      }
      
  }
  