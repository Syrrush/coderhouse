const socket = io.connect()

const formProducto = document.getElementById("formProductos")
formProducto.addEventListener("submit", e=> {
    e.preventDefault();
    const product = {
        title: formProducto[0].value,
        price: formProducto[1].value,
        thumbnail: formProducto[2].value
    }
}) 

async function hacerHTML(product){
    const resultado = await fetch("handle/tabla-productos.hbs")
    const plantilla = await resultado.text()
    const template = Handlebars.compile(plantilla)
    const html = template({product})
    return html
}

socket.on("productos", product => {
    hacerHTML(product).then(html => {
        document.getElementById("productos").innerHTML = html
    })
})
const inputUsuario = document.getElementById("inputUsuario")
const inputMensaje = document.getElementById("inputMensaje")
const btnEnviar = document.getElementById("btnEnviar")

const formMensaje = document.getElementById("formDelMensaje")
formMensaje.addEventListener("submit", e => {
e.preventDefault()
const mensaje = { autor: inputUsuario.value, texto: inputMensaje.value}
socket.emit("nuevoMensaje", mensaje);
formMensaje.reset()
inputMensaje.focus()
})

function hacerHTMLdeMensaje(mensaje){
    return mensaje.map(mensaje => {
        return (`
        <div>
        <b style="color:blue;"> ${mensaje.autor}</b>
        (<span style="color:orange;">${mensaje.fechayhora}</span>)
        <i style="color:green;">${mensaje.texto}</i>
        </div>
        `)
    }).join(" ")
}

socket.on("mensajes", mensajes => {
    const html = hacerHTMLdeMensaje(mensajes)
    document.getElementById("mensajes").innerHTML = html
})

inputUsuario.addEventListener("input", () => {
    const email = inputUsuario.value.trim().length
    const texto = inputMensaje.value.length
    inputMensaje.disabled = !email
    btnEnviar.disabled = !email || !texto
}) 

inputMensaje.addEventListener("input", () => {
    const texto = inputMensaje.value.length
    btnEnviar.disabled = !texto
})