const { isEmpty, isNumeric } = require("validator");
const prisma = require("../orm");

module.exports = {
    save: async (req, res) => {

        let userId = req.user.id;
        let body = req.body;
        try {

            if (!isNumeric(body.amount.toString()) || !isNumeric(body.product_id.toString())) {
                return res.json({
                    status: 409,
                    message: "didn't pass validation"
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                data: error,
                status: 500
            })
        }


        await prisma.cart.findFirst({
            where: {
                user_id: parseInt(userId),
                product_id: parseInt(body.product_id)
            }
        }).then(async (data) => {

            let id = 0;
            let cantidad = 0;

            if (data != null) {
                cantidad = parseInt(data.amount) + parseInt(body.amount);
                id = parseInt(data.id)
            } else {
                cantidad = parseInt(body.amount);
            }
            
            if (cantidad <= 0) {

                await prisma.cart.delete({
                    where: {
                        id: parseInt(id)
                    }
                }).then(data => {
                    return res.json({
                        status: 200,
                        data: data,
                    })
                }).catch(error => {
                    console.log(error)
                    return res.json({
                        data: error,
                        status: 400
                    })
                })

            } else {

                await prisma.cart.upsert({
                    where: {
                        id: parseInt(id)
                    },
                    update: {
                        amount: cantidad
                    },
                    create: {
                        user_id: parseInt(userId),
                        product_id: parseInt(body.product_id),
                        amount: cantidad
                    }

                }).then(data => {
                    return res.json({
                        status: 200,
                        data: data,
                    })
                }).catch(error => {
                    console.log(error)
                    return res.json({
                        data: error,
                        status: 400
                    })
                })
            }


        }).catch(error => {
            console.log(error)
            return res.json({
                data: error,
                status: 500
            })

        })

    },

    get: async (req, res) => {

        let userId = req.user.id;

        await prisma.$transaction([
            prisma.cart.findMany({
                where: {
                    user_id: parseInt(userId)
                },
                include: {
                    products: true
                },
                orderBy: {
                    id: "desc"
                }
            }),

            prisma.cart.count({
                where: {
                    user_id: parseInt(userId)
                }
            }),
        ]).then(data => {
            return res.json({
                data: data[0],
                count: data[1],
                status: 200
            })
        }).catch(error => {
            return res.json({
                message: "An error has ocurred",
                status: 500
            })
        })


    },

    delete: async (req, res) => {

        let userId = req.user.id;
        let productId = req.params.id;

        try {

            if (isEmpty(productId) || !isNumeric(productId)) {
                return res.json({
                    message: "didn't pass validation",
                    status: 409
                })
            }

        } catch (error) {
            return res.json({
                error: error,
                status: 500
            })
        }

        await prisma.cart.delete({
            where: {
                id: parseInt(productId),
                user_id: parseInt(userId)
            }
        }).then(data => {
            return res.json({
                data: data,
                status: 200
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                error: error,
                status: 500
            })
        })

    },

    deleteMany: async (req, res) => {

        let userId = req.user.id;

        await prisma.cart.deleteMany({
            where: {
                user_id: parseInt(userId)
            }
        }).then(data => {
            return res.json({
                data: data,
                status: 200
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                error: error,
                status: 500
            })
        })

    }
}
