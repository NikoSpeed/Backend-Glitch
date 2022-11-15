const  fs = require('fs');
class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }

    
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.ruta, "utf8")
            return JSON.parse(data)
        }catch(err){
            return []
        }
    } 

    async save(obj){
        const listado = await this.getAll()

        let nuevoId

        if(listado.length==0){
            nuevoId=1
        }else{
           nuevoId = listado[listado.length-1].id + 1
        }


        const objId = {...obj, id:nuevoId}

        listado.push(objId)

        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2))
            return nuevoId
        }catch(err){
            throw new Error(`Error al guardar el objeto ${err}`)
        }


    }
    async getById(id){
        try {  
            const listado = await this.getAll()
            if(listado.find(item =>  item.id === id) === undefined){
                return `No se encontró un elemtno con el ID: ${id}`
            }else{
                return listado.find(item =>  item.id === id)
            }
        } catch (err) {console.log(`Error:${err} `)}
    }


    async deleteById(id){
        const listado = await this.getAll()
        const nuevoListado = listado.filter(item => item.id != id)
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null, 2))
        }catch(err){

        }
    }


    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        }catch(err){

        }
    } 


}
module.exports = Contenedor 