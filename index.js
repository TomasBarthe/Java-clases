// Curso Backend

const { log } = require("console");



const fs = require("fs").promises;

class ProductManager { 
    static ultId = 0;


    constructor(path) {
        this.products = [];
        this.path = path;
    }


    async addProduct(nuevoObjeto) {

        let {title, description, price, thumbnail, code, stock} = 

        nuevoObjeto;
        
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Por favor completar todos los campos, gracias."); 
            return;
        }

        if(this.products.some(item => item.code === code)){
            console.log("El codigo es unico para cada producto");
            return;
        }


        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }


        this.products.push(newProduct);

        await this.guardarArchivo(this.products);


    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log ("Lo lamento su producto no pudo ser encontrado");

            } else {
                console.log ("Su producto fue encontrado con exito");
                return buscado;
                
            } catch (error) {
                 console.log("error al leer el archivo", error);
            }
        }
        
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return
            
        } catch (error) {
            console.log ("Error al leer el archivo", error);
        }
    }

    async guardarArchivo(arrayProductos){
        try {
            await fs.writeFile(this.path, JSON.stringify
            (arrayProductos, null, 2));
            
            
        } catch (error) {
            console.log ("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);

               
            } else {
                console.log ("Lo lamentamos, no fue posible encontrar el producto a remplazar.");
            }
            
        } catch (error) {
            console.log("El producto no pudo ser actualizado", error); 
            
        }

    }
        

    


}


const manager = new ProductManager("./productos.json");


manager.getProducts();


const Copa01 = {
    title: "Copa vino Italia",
    description: "Copar estilo Italiana, cristal", 
    price: 5.200 ,
    thumbnail:  "sin imagen",
    code:  "ABC123",
    stock: 150 

}


manager.addProduct(Copa01);



const Copa22 = {
    title: "Copa vino blanco",
    description:  "Copa ancha vino blanco, vidio 0,5, clasica", 
    price: 1.200 ,
    thumbnail:  "sin imagen",
    code:  "ABC100",
    stock: 1250 

}

manager.addProduct(Copa22);


//objeto para chequeo de validacion, repite el codigo con el objeto anterior. 

const Copa32 = {
    title: "Copon vino",
    description:  "Copon cristal, 400 ml, con base", 
    price:  2.700 ,
    thumbnail:  "sin imagen",
    code:  "ABC100",
    stock:  580 

}

manager.addProduct(Copa32);


//objeto para remplazar objeto existente. 

const vaso132 = {
    title: "vaso whisky",
    description:  "Vaso de whisky biselado, cristal, mediano", 
    price:  3.800 ,
    thumbnail:  "sin imagen",
    code:  "ABD140",
    stock:  480 

}

manager.addProduct(Copa32);


//objeto para remplazar objeto existente por id. 

testeamosBusquedaPorId ()


const vaso134 = {
    title: "vaso whisky corto",
    description:  "Vaso de whisky biselado, cristal, mediano", 
    price:  3.800 ,
    thumbnail:  "sin imagen",
    code:  "ABD144",
    stock:  680 

}

async function testeamosActualizar() {
    await manager.updateProduct(1,vaso132 );

}




//eliminacion de objeto producto del array. 

async deleteProduct(id) {

    try {
        const arrayProductos = await this.leerArchivo ();
        const newArray = arrayProductos.filter(item => item.id !== id);
        
    } catch (error) {
        console.log ("no se ha podido borrar el archivo solicitado, intente nuevamente" , error);
        
    }

   

}











//Borrador

/* const manager = new ProductManager();


manager.getProducts();



manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "ABC12", 25);



manager.addProduct("Copa vino Italia", "Copar estilo Italiana, cristal", 5.200, "sin imagen", "ABC123", 150);


manager.addProduct("Copa vino blanco", "Copa ancha vino blanco, vidio 0,5, clasica", 1.200, "sin imagen", "ABC100", 250);


manager.addProduct("vaso whisky", "Vaso de whisky biselado, cristal, mediano", 2.300, "sin imagen", "ABD140", 60);


manager.addProduct("vaso clasico estilo", "vaso de vidrio 200 ml estilo burbuja", 800, "sin imagen", "ABD100", 1440);


manager.addProduct("Vaso largo", "Vaso largo ideal para tragos, vidio 0.5,", 2.600, "sin imagen", "ABD70", 580);


manager.addProduct("Copa vino clasica", "Copa de vino con cabo largo, ", 3.000, "sin imagen", "ABc10", 5000);


manager.addProduct("Copon vino", "Copon cristal, 400 ml, con base", 2.700, "sin imagen", "ABC501", 580);


manager.addProduct("Copon de vino", "Copon de vino 490 ml, color negro, vidrio 0.6", 2.300, "sin imagen", "ABC150", 400);





manager.getProducts();



manager.addProduct("Vaso vidrio neo", "Vaso clasico con base redonda, vidio bicelado.", 1.200, "sin imagen", "ABC150", 450);


manager.getProductById(2);
manager.getProductById(50);



/*

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado.");
        } else {
            console.log("Es este tu producto solicitado?", product);
        }
        
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return
            
        } catch (error) {
            console.log ("Error al leer el archivo", error);
        }
    }

    async guardarArchivo(arrayProductos){
        try {
            await fs.writeFile(this.path, JSON.stringify
            (arrayProductos, null, 2));
            
            
        } catch (error) {
            console.log ("Error al guardar el archivo", error);
        }
    }

