document.addEventListener('DOMContentLoaded', function() {
    let listaEmpleados = [];

    const objEmpleado = {
        id: '',
        nombre: '',
        email: '',
        puesto: '',
    
    };

    let editando = false;

    const formulario = document.querySelector('#formulario');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email'); 
    const btnAgregarInput = document.querySelector('#btnAgregar');

    formulario.addEventListener('submit', validarFormulario);
    

    function validarFormulario(e) {
        e.preventDefault();
        const dataFormulario = new FormData(formulario)

        if (nombreInput.value === '' || emailInput.value === '') { 
            alert('Todos los campos se deben llenar');
            return;
        }

        if (editando) {
            editarEmpleado();
            editando = false;
        } else {
            objEmpleado.id = Date.now();
            objEmpleado.nombre = nombreInput.value;
            objEmpleado.email = emailInput.value;
         

            agregarEmpleado();
        }
        fetch('http://localhost:3000/api/usuarios', {method: 'POST', body: dataFormulario})
        .then(res => console.log(res))
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    function agregarEmpleado() {
        listaEmpleados.push({ ...objEmpleado });

        mostrarEmpleados();

        formulario.reset();
        limpiarObjeto();
    }

    function limpiarObjeto() {
        objEmpleado.id = '';
        objEmpleado.nombre = '';
        objEmpleado.email = '';
          
    }

    function mostrarEmpleados() {
        limpiarHTML();

        const divEmpleados = document.querySelector('.div-empleados');

        listaEmpleados.forEach(empleado => {
            const { id, nombre, email, } = empleado;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${email}`;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-editar');
            editarBoton.addEventListener('click', () => cargarEmpleado(empleado)); // Cambiado a addEventListener
            parrafo.appendChild(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-eliminar');
            eliminarBoton.addEventListener('click', () => eliminarEmpleado(id)); // Cambiado a addEventListener
            parrafo.appendChild(eliminarBoton);

            const hr = document.createElement('hr');

            divEmpleados.appendChild(parrafo);
            divEmpleados.appendChild(hr);
        });
    }

    function cargarEmpleado(empleado) {
        const { id, nombre, email, } = empleado;
        objEmpleado.id = id;
        nombreInput.value = nombre;
        emailInput.value = email; 
               // Aquí establecemos el valor seleccionado del selector de opciones
        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
        editando = true;
    }

    function editarEmpleado() {
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.email = emailInput.value;
       

         listaEmpleados.map(empleado => {
            if (empleado.id === objEmpleado.id) {
                empleado.id = objEmpleado.id;
                empleado.nombre = objEmpleado.nombre;
                empleado.email = objEmpleado.email;
                
            }
        });

        limpiarHTML();
        mostrarEmpleados();
        formulario.reset();

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

        editando = false;
    }

    function eliminarEmpleado(id) {
        listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

        limpiarHTML();
        mostrarEmpleados();
    }

    function limpiarHTML() {
        const divEmpleados = document.querySelector('.div-empleados');
        divEmpleados.innerHTML = ''; 
    }
});





