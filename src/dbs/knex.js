import knex from "knex";

const sqliteOptions = {
    client: "sqlite3",
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
const db = knex(sqliteOptions)

try {
    let exist = await db.schema.hasTable("products")

    if (!exist) {
        await db.schema.createTable("products", table => {
            table.increments("id").primary()
            table.string("title", 30).notNullable()
            table.float("price").notNullable()
            table.string("thumbnail", 1024)
            console.log("tabla de productos creada!");
        })
    }
} catch (error) {
    console.log("error en la tabla de productos");
}

try {
    let exist = await db.schema.hasTable("messages")

    if (!exist) {
        await db.schema.createTable("messages", table => {
            table.increments("id").primary()
            table.string("autor", 30)
            table.string("texto")
            table.string("fechayhora", 60)
            console.log("tabla de mensajes creada!");
        })
    }
} catch (error) {
    console.log("error en la tabla de mensajes");
}

export default sqliteOptions;