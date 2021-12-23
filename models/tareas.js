const Tarea = require("./tarea");


class Tareas{

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys( this._listado ).forEach( key =>{
            const tarea = this._listado[key];
            listado.push( tarea );
        } );

        return listado;
    }

    constructor(){
        this._listado = {};  
    }

    borrarTarea ( id='' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }



    cargarTareasFromArray( tareas  = [] ){

        tareas.map(  tarea => {

            this._listado[tarea.id] = tarea;        

        });


    }

    crearTarea( desc = ''){

        const tarea = new Tarea(desc); 
        this._listado[ tarea.id ] = tarea;
    }

    listadoCompleto(){
        console.log("\n");
        this.listadoArr.map( ( tarea,i )=>{
            const { desc, completadoEn } = tarea;
            if( !!completadoEn ){
                let a = `${ i+1 }`.green+` ${ desc } :: ${'Completado'.green} `
                console.log(a)

            }else{
                let a = `${ i+1 }`.green+` ${ desc } :: ${'Pendiente'.red} `
                console.log(a)
            }

        } )
    };

    listarPendienteCompletados( completadas = true ){
        let cont = 0;
        this.listadoArr.forEach( ( tarea,i )=>{
            const { desc, completadoEn } = tarea;
            if( completadas ){
                if ( completadoEn ){
                    cont ++;
                    let a = `${ cont }`.green+` ${ desc } :: ${'Completado'.green} `
                    console.log(a);
                }
            }else{
                if( !completadoEn ){
                    cont ++;
                    let a = `${ cont }`.green+` ${ desc } :: ${'Pendiente'.red} `
                    console.log(a)
                }
            }
        })

    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id =>{

            const tarea = this._listado[id];

            if( !tarea.completadoEn   ){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea =>{

            if( !ids.includes( tarea.id ) ){

                this._listado[tarea.id].completadoEn = null
            }

        } )

    }


}


module.exports = Tareas