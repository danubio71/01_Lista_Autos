const autos = require("./autos")
const fs = require('fs')

let persona = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
}

const concesionaria = {
    autos: autos,
    archivo: 'autos.js',
    leerArchivo: function(){
        return fs.readFileSync(this.archivo, 'utf-8')
    },
    buscarAuto: function(patente){
        //const listaDeAutos = this.leerArchivo();
        //let autoFiltrado = null;
        autoFiltrado = autos.filter(function(auto){
            return auto.patente === patente;
        })
        if (autoFiltrado.length === 0) {
            return null;
        } else {
            return autoFiltrado[0];
        }
    },
    //recibe la pantente, en caso de encontrar el auto, le asigna el vendido = true
    //hay que usar la funcion, buscarAuto
    venderAuto: function(patente){
        let autoFiltrado = this.buscarAuto(patente);
        if (autoFiltrado.length === 0) {
            return null;
        } else {
            let ind = autos.indexOf(autoFiltrado)
            autos[ind].vendido = true;
        }
    },
    // Mostrar lista de autos para la venta. No poner los que estan vendidos. Usar filter
    //
    autosParaLaVenta: function(){
        //this.venderAuto(patenteBuscada)
        const autosEncontrados = autos.filter(function(auto){
            return auto.vendido === false;
             
        })
        return autosEncontrados;
    },
    autosNuevos: function(){
        //usar autosParaLaVenta
        const autosDisponibles = this.autosParaLaVenta();
        //console.log(autosDisponibles);
        const listaAutosNuevos = autosDisponibles.filter(function(auto){
            return auto.km < 100;
        })
        return listaAutosNuevos;
    },
    //Cuanto dinero generaron las ventas. Devuelve una lista con el precio de venta de cada auto vendido.
    // Usar una funcion de arrays
    listaDeVentas: function(){
        let listaPrecios = []
        const autosVendidos = autos.filter(function(auto){
            return auto.vendido === true; 
            
        })
        for(let i = 0; i < autosVendidos.length; i++){
            listaPrecios.push(autosVendidos[i].precio)
        }

        return listaPrecios;
    },
    totalDeVentas: function(){
        let listaDeVentas = this.listaDeVentas();
        if(listaDeVentas.length !== 0){
            let sumaVentas = listaDeVentas.reduce(function(acum, num){
                return acum + num;
            });
            return sumaVentas;
        } else {
            return 0;
        }
        
    },
    // Recibe parametros: auto, persona. Devuelve booleano, true si la persona puede comprar el auto. 
    // Si auto.precio < capacidadDePagoTotal AND auto.precio / auto.cuotas < capacidadDePagoEnCuotas => true
    puedeComprar: function(auto, persona){
        
        let {precio, cuotas} = auto;
        let {capacidadDePagoEnCuotas, capacidadDePagoTotal} = persona;
        let montoCuota = precio / cuotas;
        if(precio < capacidadDePagoTotal && montoCuota < capacidadDePagoEnCuotas){
            return true;
        } else {
            return false;
        }

    },
    // Recibe una persona. Devuelve: lista de autos que puede comprar.
    // 1) Obtener los autos para la venta.
    // 2) Por cada auto que esta a la venta, hay que probar si la persona lo puede comprar (con puedeComprar())
    // 3) Retornar la lista de autos que puede comprar. (que funciones se pueden usar para filtrar la lista de autos del punto 1 con el paso 2?)
    autosQuePuedeComprar: function(persona){
        let listaFinalAutos = [];
        const autosParaLaVenta = this.autosParaLaVenta();
        //const testing = this.puedeComprar(auto, persona)
        for(let i = 0; i < autosParaLaVenta.length; i++){
            let auto = autosParaLaVenta[i]
            //console.log(auto);
            //console.log(this.puedeComprar(auto, persona));
            if (this.puedeComprar(auto, persona)) {
                listaFinalAutos.push(auto)
            } 
        }
        //const listaAutosPuedeComprar = autosParaLaVenta.filter(function(auto){
          //  const testing = this.puedeComprar(auto, persona)
            //let res = this.puedeComprar(auto, persona);
            //console.log(res);
            /*if (this.puedeComprar(auto, persona) === true) {
                listaFinalAutos.push(auto)
            } 
            //return this.puedeComprar(auto, persona);
            return listaFinalAutos;*/
            //console.log(auto);
            //console.log(persona);
        
        return listaFinalAutos;
    }
}

console.log(concesionaria.autosQuePuedeComprar(persona));
//console.log(concesionaria.leerArchivo());
//console.log(concesionaria.buscarAuto('APL123'));
//console.log(concesionaria.buscarAuto('JJK116'));
//console.log(concesionaria.buscarAuto('APL123'));
//let listaDeAutos = concesionaria.leerArchivo();
//console.log(typeof listaDeAutos);
//console.log(concesionaria.venderAuto('JJK116'));
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas());
