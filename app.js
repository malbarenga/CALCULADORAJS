
document.addEventListener('DOMContentLoaded', function() {

    const app = document.getElementById('app')  
    app.classList.add("calculadora") 
    app.classList.add("container")  
    
    
    const display = document.createElement('div') 
    app.appendChild(display) 
    display.classList.add('display')  
    
    const textoValorSuperior = document.createElement('div') 
    display.appendChild(textoValorSuperior) 
    textoValorSuperior.classList.add('valor-superior')  
    
    const textoValorInferior = document.createElement('div') 
    display.appendChild(textoValorInferior) 
    textoValorInferior.classList.add('valor-inferior')   
    
    const teclado = document.createElement('div') 
    app.appendChild(teclado) 
    teclado.classList.add('qwerty')
    
    const AC = document.createElement('button') 
    AC.textContent = 'AC'  
    AC.classList.add('span2')   
    teclado.appendChild(AC);  
    
    const DELETE = document.createElement('button') 
    DELETE.textContent = "DEL"   
    teclado.appendChild(DELETE); 
    DELETE.classList.add('delcolor') 
    
    
    const operaciones = ['+', '-', 'x', '/'];  
    const botonOperador = {}
    for (let i of operaciones) {
      const operacion = document.createElement('button');
      operacion.textContent = i;
      botonOperador[i] = operacion
      teclado.appendChild(operacion)   
      operacion.classList.add('calculadoraBoton') 
    };    
    
    botonOperador["-"].style.gridColumn = '4';
    botonOperador["-"].style.gridRow = '2'; 
    
    botonOperador["x"].style.gridColumn = '4';
    botonOperador["x"].style.gridRow = '3'; 
    
    botonOperador["/"].style.gridColumn = '4';
    botonOperador["/"].style.gridRow = '4'; 
    
    
    const botonNumero = {}; // Objeto para almacenar los botones
    for (let i = 0; i <= 9; i++) {
      const numero = document.createElement('button')
      numero.textContent = i;
      botonNumero['boton' + i] = numero; // Asignar el botón al objeto usando una propiedad dinámica
      teclado.appendChild(numero);  
      numero.classList.add('calculadoraBoton') 
    };   
    
    botonNumero["boton0"].style.gridColumn = '2';
    botonNumero["boton0"].style.gridRow = '5';
    
    const botonPunto = document.createElement('button');
    botonPunto.textContent = "." 
    botonNumero['punto'] = botonPunto; 
    teclado.appendChild(botonPunto);  
    botonPunto.classList.add('calculadoraBoton') 
    
    const resultado = document.createElement('button') 
    resultado.textContent = "="  
    teclado.appendChild(resultado); 
    resultado.classList.add('calculadoraBoton') 
          
    class Calculadora {
        constructor(textoValorInferior, textoValorSuperior){
            this.textoValorInferior = textoValorInferior
            this.textoValorSuperior = textoValorSuperior
            this.valorInferior = ''
            this.valorSuperior = ''
            this.operador = undefined
        }  
    
        agregarNumero(numero){ 
            if(numero === "." && this.valorInferior.includes(".")){ 
                return 
            }
            this.valorInferior = this.valorInferior + numero
            }
        
    
        imprimirDisplay() {
            this.textoValorInferior.innerText = this.valorInferior 
            this.textoValorSuperior.innerText = this.valorSuperior
        } 
    
        borrar (){
            this.valorInferior = this.valorInferior.slice(0,-1)
        } 
    
        elegirOperacion(operador) {
            if(this.valorInferior == ''){  
                return 
            }
            if(this.valorSuperior != ''){
                this.realizarCalculo()
            }
            this.operador = operador
            this.valorSuperior = this.valorInferior
            this.valorInferior = ''
        } 
    
        realizarCalculo() {
            let resultado
            let conversionValorSuperior = parseFloat(this.valorSuperior)
            let conversionValorInferior = parseFloat (this.valorInferior)
            if(isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)){ 
                return 
            }
            switch (this.operador) {
                case '+':
                resultado = conversionValorSuperior + conversionValorInferior
                break
                case '-':
                resultado = conversionValorSuperior - conversionValorInferior
                break
                case 'x':
                resultado = conversionValorSuperior * conversionValorInferior
                break
                case '/':
                resultado = conversionValorSuperior / conversionValorInferior
                break
                default: return
            }
            
            this.valorInferior = resultado
            this.operador = undefined
            this.valorSuperior= ''
        }
    
        limpiarPantalla() {
            this.valorInferior = ''
            this.valorSuperior = ''
            this.operador = undefined
    
        } 
    
    }  
    
    const calculadora = new Calculadora (textoValorInferior, textoValorSuperior) 
    
    
    for (let boton in botonNumero) {
        if (botonNumero.hasOwnProperty(boton)) {
          botonNumero[boton].addEventListener('click', () => {
            calculadora.agregarNumero(botonNumero[boton].innerHTML);
            calculadora.imprimirDisplay();
           })
        }
      }
    
    
    DELETE.addEventListener('click',() => {
        calculadora.borrar()
        calculadora.imprimirDisplay()
    })
    
    for (let objeto in botonOperador) { 
          botonOperador[objeto].addEventListener('click', () => {
            calculadora.elegirOperacion(botonOperador[objeto].innerHTML);
            calculadora.imprimirDisplay();
          });
      } 
    
    resultado.addEventListener('click',() => {
        calculadora.realizarCalculo()
        calculadora.imprimirDisplay()
    })
    
    AC.addEventListener('click',() => {
        calculadora.limpiarPantalla()
        calculadora.imprimirDisplay()
    })
    
    });
    