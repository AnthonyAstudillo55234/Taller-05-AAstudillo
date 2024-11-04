const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Datos de ejemplo
const integrantes = [
    {
        id:1,
        nombre:"Paul",
        apellido:"Cabrera",
        edad:20,
        carrera:"Desarrollo de Software"
    },
    {
        id:2,
        nombre:"Mireya",
        apellido:"García",
        edad:20,
        carrera:"Desarrollo de Software"
    },
    {
        id:3,
        nombre:"Mateo",
        apellido:"Torres",
        edad:20,
        carrera:"Desarrollo de Software"
    },
    {
        id:4,
        nombre:"Ariel",
        apellido:"Catucuamba",
        edad:20,
        carrera:"Desarrollo de Software"
    },
    {
        id:5,
        nombre:"Matias",
        apellido:"Terán",
        edad:21,
        carrera:"Desarrollo de Software"
    },
    {
        id:6,
        nombre:"Anthony",
        apellido:"Astudillo",
        edad:21,
        carrera:"Desarrollo de Software"
    }
];

const productos = [
    { 
        id: 1, 
        nombre: 'Computadoras', 
        descripcion: 'Producto disponible' 
    },
    { 
        id: 2, 
        nombre: 'Tablet', 
        descripcion: 'Producto disponible' 
    }
];

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para presentar información del grupo de trabajo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para presentar información de los integrantes del grupo
app.get('/integrantes', (req, res) => {
    res.json(integrantes);
});

// Ruta para presentar información de un integrante específico
app.get('/integrantes/:id', (req, res) => {
    const integranteId = parseInt(req.params.id);
    const integrante = integrantes.find(i => i.id === integranteId);
    
    if (integrante) {
        res.json(integrante);
    } else {
        res.status(404).send('Integrante no encontrado');
    }
});

// Ruta para presentar un HTML con algunos productos
app.get('/products', (req, res) => {
    let html = '<h1>Productos</h1><ul>';
    productos.forEach(producto => {
        html += `<li>${producto.nombre}: ${producto.descripcion}</li>`;
    });
    html += '</ul>';
    res.send(html);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
