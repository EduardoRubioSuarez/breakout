class Pelota {
    constructor() {
      this.reiniciar();
    }
  
    reiniciar() {
      this.x = width / 2;
      this.y = height / 2;
      this.radio = 10;
      this.velocidad = 5;
      this.vx = random([-this.velocidad, this.velocidad]);
      this.vy = -this.velocidad;

      if (this.nivel === 2 || this.nivel === 3) {
        this.pelota.velocidad += 1;
        this.pelota.vx = this.pelota.vx > 0 ? this.pelota.velocidad : -this.pelota.velocidad;
        this.pelota.vy = -this.pelota.velocidad;
      }      
    }
  
    mover() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0) this.vy *= -1;
    }
  
    verificarColisionBarra(barra) {
        let dentroX = this.x + this.radio > barra.x && this.x - this.radio < barra.x + barra.ancho;
        let tocandoY = this.y + this.radio >= barra.y && this.y + this.radio <= barra.y + barra.alto;
      
        if (dentroX && tocandoY && this.vy > 0) {
          this.vy *= -1;
          let centroBarra = barra.x + barra.ancho / 2;
          let distanciaDesdeCentro = this.x - centroBarra;
          this.vx = distanciaDesdeCentro * 0.1;
          this.y = barra.y - this.radio - 1;
        }
    }
      
      
    mostrar() {
      fill(255, 255, 0);
      ellipse(this.x, this.y, this.radio * 2);
    }
  
    fueraDePantalla() {
      return this.y > height;
    }
  }
  