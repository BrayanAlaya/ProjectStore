const prisma = require("./orm");
const app = require("./app");
require('dotenv').config()

async function main() {
    return await prisma.$connect();
}

main()
    .then(async () => {

        app.listen(3000);
        await prisma.$disconnect()
    })
    .catch(async (error) => {   
        console.log(error)
    })




