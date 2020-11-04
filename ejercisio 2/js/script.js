
var recordatorioSeleccionados = [];
var recordatoriosBasura = []
var borrarRecodatorios = []


function seleccionarRecordatorios() {
    var recordatorios = document.getElementsByClassName('recordatorio');
    for (var i = 0; i < recordatorios.length; i++){

        document.getElementById(recordatorios[i].id).onclick = function(e){ //Esto le pone el evento onclick a los anotes
            console.log("seleccionarRecordatorios Ejecutado!")

            e.stopPropagation();
            if(recordatorioSeleccionados.indexOf(this.id) == -1){
                this.style.transition = "all .5s";
                this.style.background =  "#F67C74";
                recordatorioSeleccionados.push(this.id)
            } else {
                this.style.background =  "#fff";
                recordatoriosBasura = [this.id]
                for(var s = 0;s < recordatorioSeleccionados.length;s++ )
                for(var c = 0;c < recordatoriosBasura.length;c++ )
                if(recordatoriosBasura[c] == recordatorioSeleccionados[s]){
                    console.log('asdasd')
                    recordatorioSeleccionados[s] = -1
                    console.log(recordatorioSeleccionados)
                }
                
                for(var l = 0;l < recordatorioSeleccionados.length;l++ )
                if(recordatorioSeleccionados[l] != -1){
                    borrarRecodatorios.push(recordatorioSeleccionados[l])
                    //
                    console.log(borrarRecodatorios)


                }
                recordatorioSeleccionados = []
                for(var l = 0;l < borrarRecodatorios.length;l++ )
                recordatorioSeleccionados.push(borrarRecodatorios[l]);
                console.log(recordatorioSeleccionados)
                borrarRecodatorios = []


            }


        
    }

}
}

$('#texto').keyup(function(e) {
    if(e.which == 13){
        mostrar();
    console.log('dsad')
    }    
})

function borrarRecordatorio() {

    console.log("ejecutado")

            if(recordatorioSeleccionados.length > 0){
                console.log("ejecutado")

                var VerificarLocalStorage = localStorage.getItem("recordatorios")
                if(VerificarLocalStorage.length > 0){
                    console.log("adaasd")
                    var recordatoriosTemporales = JSON.parse(localStorage.getItem("recordatorios"))
                    console.log(recordatoriosTemporales)
                    for(var i = 0;i < recordatoriosTemporales.length;i++){
                        for(var b = 0;b < recordatorioSeleccionados.length;b++){
                            
                            if(recordatorioSeleccionados[b] == recordatoriosTemporales[i].id){
                                recordatoriosTemporales[i].id = -1;     
                                console.log(recordatoriosTemporales)  
                            }
                        }
                    }
                    
                    var recordatoriosRecuperados = []
                    for(var c = 0;c < recordatoriosTemporales.length;c++){
                        if(recordatoriosTemporales[c].id != -1){
                            recordatoriosRecuperados.push(recordatoriosTemporales[c]);

                            console.log(recordatoriosRecuperados)
                            console.log(recordatoriosTemporales)
                        }
                        }
                                                    console.log(recordatoriosTemporales)
                        console.log("jajaajaj");
                        if(recordatoriosRecuperados.length == 0) {
                            localStorage.setItem("recordatorios", "");

                        }else{
                            guardarRecordatorio(recordatoriosRecuperados)
                        }
                        mostrarRecordatorios();
                        seleccionarRecordatorios();
                        recordatorioSeleccionados = []
                    }
                }

                }   
            
    




/**
 * function seleccionarRecordatorios() {
    console.log("Adasd")
    var recordatorios = document.getElementsByClassName('recordatorio');
    for (var i = 0; i < recordatorios.length; i++) {
        document.getElementById(recordatorios[i].id).onclick = function(e){ //Esto le pone el evento onclick a los anotes
            e.stopPropagation();
            console.log("Adasd")


        

        }
    }
}
 */


var eliminar = document.getElementById('borrar');
//Verificador de texto 


function recordatorioValido(recordatorioExistente) {
    if(recordatorioExistente == null ||
         recordatorioExistente == "" || 
         typeof recordatorioExistente == "undefined" || 
         recordatorioExistente == "undefined"){
        return false;
    } else {
    return true;

}
 }

function verificadortexto(textoVerificando) {
   

    if(textoVerificando == null || textoVerificando == "" || textoVerificando.length < 1) {

        return false;
    } else{
        return true;

    }

}

//Verifica el texto antes que termine

function escritura() {
var texto1 = document.getElementById('texto').value;
if(!verificadortexto(texto1)) {

    mostrarError();

return;

}

limpiarError();
    var referencia = new Date();
    var id = referencia.getTime();
    var fecha = referencia.toLocaleDateString();
    var texto = texto1;
    var informacionRecordatorio = {"id": id, "fecha": fecha, "texto": texto};

    comprobarRecordatorio(informacionRecordatorio);
}

//Comprobador si hay un  recordatorio o el usuario es nuevo 

function comprobarRecordatorio(ComprobandoRecordatorio) {
    var recordatorioExistente = localStorage.getItem("recordatorios");
if(!recordatorioValido(recordatorioExistente)) {
// Usuario Nuevos

    var recordatoriosRetenidos = [];
    console.log('hola')
    recordatoriosRetenidos.push(ComprobandoRecordatorio);
guardarRecordatorio(recordatoriosRetenidos);

mostrarRecordatorios();

}else {
    // Usuarios Ya existentes
    console.log("dsda");
 
    var recordatoriosRecuperados = JSON.parse(recordatorioExistente);
    recordatoriosRecuperados.push(ComprobandoRecordatorio);
    console.log(recordatoriosRecuperados)
guardarRecordatorio(recordatoriosRecuperados);


}

}

function guardarRecordatorio(recordatorios)  {
    var recordatoriosJSON = JSON.stringify(recordatorios);

    localStorage.setItem("recordatorios", recordatoriosJSON);

}

function mostrarError() {

    var html = "";
    html += '<div class="alert alert-primary" role="alert">'
    html += '¡Error! Escribe lo que quiera anotar'
    html +='</div>'

    document.getElementById('error').innerHTML = html;

}

function mostrarRecordatorios() {

    var html;
    var recordatorioExistente = localStorage.getItem("recordatorios")
    if(!recordatorioValido(recordatorioExistente)) {
        html = 'No haz colocado ningun recordatorio';
        document.getElementById('recordatorios').innerHTML = html;

    } else {

        var recordatoriosRecuperados = JSON.parse(recordatorioExistente);
            for(var i = 0; i < recordatoriosRecuperados.length; i++) {
                html += TodosRecordatorios(recordatoriosRecuperados[i]);
            }
            document.getElementById('recordatorios').innerHTML = html;
    }

}

function TodosRecordatorios(recordatorio) {
    var html = "";
    html += '<div class="recordatorio" id="' + recordatorio.id + '">';
    html += '<div class="row">';
    html += '<div class="col-12 text-left">';
    html += '<small><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-date" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
    html += '<path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>'
    html += ' <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>'
    html += ' </svg>' + recordatorio.fecha + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += ' </div>';
    html += ' </div>';
    html += '</div>';
    html += '<br>';
    
    return html;

}

function limpiarError() {

    document.getElementById('error').innerHTML = "";

 }


//Guardar Recordatorio


function mostrar() {
    escritura();
    mostrarRecordatorios();
    seleccionarRecordatorios();
    document.getElementById("texto").value = "";
}


document.addEventListener('DOMContentLoaded', function(){
        
    document.getElementById('botonGuardar').onclick = mostrar;
         document.getElementById('borrar').onclick = borrarRecordatorio;
         mostrarRecordatorios();
         seleccionarRecordatorios();
    console.log("hola");
    



});