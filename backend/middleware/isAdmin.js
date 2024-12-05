const prisma = require("../orm");

module.exports = async (req,res,next) => {
    const id = req.user.id;

    try {

        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if (user.rol == 1) {
            req.user = user
            next()
        } else {
            return res.json({
                status: 401,
                message: "not admin"
            })
        }
    } catch (error) {
        return res.json({
            status: 500
        })
    }

    
}
