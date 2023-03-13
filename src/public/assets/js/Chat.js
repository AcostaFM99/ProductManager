const socket=io();

let nombre = prompt('Ingrese su nombre');
let divMensajes=document.querySelector('#chat-mensajes');
let textoMensaje=document.querySelector('#mensaje');

textoMensaje.addEventListener('keyup',(evento)=>{
    console.log(evento.key,evento.keyCode,evento.target.value);
    
    if(evento.keyCode==13){
        if(evento.target.value.trim()!= ''){
            socket.emit('mensaje',{
                emisor:nombre,
                mensaje:evento.target.value
            })
            textoMensaje.value='';
            textoMensaje.focus();
        }
    }
});

socket.on('nuevoMensaje',async(mensaje)=>{
    divMensajes.innerHTML+=`<br><strong>${mensaje.emisor}</strong> dice: <i>${mensaje.mensaje}<i>`

})