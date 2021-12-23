const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorar,
    confirmar,
    mostrarListadoCheckList
     } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

require('colors');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    // leer areas de la DB (JSON)
    const tareasDB = leerDB()

    if( tareasDB ){
         // 
        tareas.cargarTareasFromArray(  tareasDB  );
    }
    
    do{
        // imprime menu y retorna la opcion seleccionada
        opt=  await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                    const desc = await leerInput( 'Descripcion: ' );
                    tareas.crearTarea( desc );
                //

                break;
            case '2':
                    tareas.listadoCompleto();            
                break;
            case '3':
                    tareas.listarPendienteCompletados();
                break;
            case '4':
                    tareas.listarPendienteCompletados( false );
                break;
            case '5':
                // Marcar completado pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr )
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                // Borrar
                const id = await  listadoTareasBorar( tareas.listadoArr );
                //Preguntar si esta seguro que decea borrar
                if( id !== '0' ){
                    const ok = await confirmar("Desea Borrar?")
                    // 
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log("Tarea","borrada".green,"exitosamente:")
                    }
                }

                break;
        }
        
        guardarDB( tareas.listadoArr );

        if( opt !== '0' ) await  pausa();

    }while( opt!=='0' );



}
 
main();