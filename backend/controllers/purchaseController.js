const prisma = require("../orm");
const validation = require("validator");
const moment = require("moment")

module.exports = {

    save: async (req, res) => {

        let userId = req.user.id;

        await prisma.cart.findMany({
            where: {
                user_id: userId
            },
            include: {
                products: true
            }
        }).then(async (data) => {

            if (data.length > 0) {

                let monto = 0;
                let description = []

                data.forEach(d => {
                    monto += parseFloat(d.products.price) * parseFloat(d.amount)
                    description.push(d.products.name)
                });

                let amountInvalidProductId = []

                data.forEach(productCart => {
                    if (productCart.amount > productCart.products.stock) {
                        amountInvalidProductId.push(productCart.product_id)
                    }
                });

                if (amountInvalidProductId.length > 0) {
                    return res.json({
                        data: amountInvalidProductId,
                        status: 400
                    })
                }

                const updates = data.map(item =>
                    prisma.products.update({
                        where: { id: item.products.id },
                        data: {
                            stock: item.products.stock - parseInt(item.amount)
                        },
                    })
                );

                const notifications = data.map(item =>
                    prisma.notifications.create({
                        data: {
                            title: "¡Nueva Venta Realizada!",
                            message: "Tu producto " + item.products.name + " ha sido vendido. Revisa los detalles en tu cuenta.",
                            date: moment().toISOString(),
                            user_Id: parseInt(item.products.user_id),
                        },
                    })
                );


                // Ejecutar todas las promesas dentro de una transacción
                await prisma.$transaction(updates).catch(error => req.json({ message: "An error has ocurred", status: 500 }))
                await prisma.$transaction(notifications).catch(error => req.json({ message: "An error has ocurred", status: 500 }))

                await prisma.purchases.create({
                    data: {
                        user_id: parseInt(userId),
                        monto: monto,
                        date: moment().toISOString(true),
                        description: description.join(", ")
                    }
                }).then(async (purchaseData) => {

                    let purchaseDetailsData = []

                    data.forEach(cart => {
                        purchaseDetailsData.push({
                            purchase_id: parseInt(purchaseData.id),
                            product_id: parseInt(cart.product_id),
                            monto: parseFloat(cart.products.price) * parseFloat(cart.amount),
                            amount: parseInt(cart.amount)
                        })
                    })

                    await prisma.purchase_details.createMany({
                        data: purchaseDetailsData
                    }).then(async (data) => {

                        await prisma.cart.deleteMany({
                            where: {
                                user_id: parseInt(userId)
                            }
                        }).then(async (data) => {

                            await prisma.notifications.create({
                                data: {
                                    title: "¡Compra Realizada con Éxito!",
                                    message: "Tu compra de " + description.join(", ") + " ha sido procesada. Revisa los detalles en tu cuenta.",
                                    date: moment().toISOString(),
                                    user_Id: parseInt(userId),
                                },
                            })

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


                    }).catch(error => {
                        console.log(error)
                        return res.json({
                            status: 500,
                            message: error
                        })
                    })

                }).catch(error => {
                    console.log(error)
                    return res.json({
                        status: 500,
                        message: error
                    })
                })

            } else {
                return res.json({
                    status: 409,
                    message: "Cart empty"
                })
            }
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        })

    },
    get: async (req, res) => {

        let userId = req.user.id;
        let page = req.query.page ?? "0";
        let offset = 6;

        if (validation.isEmpty(page) || !validation.isNumeric(page)) {
            page = 0
        } else {
            page = parseInt(page)
        }

        await prisma.$transaction([
            prisma.purchases.findMany({
                where: {
                    user_id: parseInt(userId)
                },
                skip: parseInt(offset) * parseInt(page),
                take: parseInt(offset),
                orderBy: {
                    id: "desc"
                }
            }),

            prisma.purchases.count({
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
                status: 500,
                message: "An error has ocurred"
            })
        })


    },
    getDetails: async (req, res) => {
        let purchaseId = req.params.id;

        if (!validation.isNumeric(purchaseId)) {
            return res.json({
                message: "didn't pass validation",
                status: 500
            })
        }

        await prisma.purchase_details.findMany({
            where: {
                purchase_id: parseInt(purchaseId)
            },
            include: {
                products: true
            }
        }).then(data => {

            return res.json({
                data: data,
                status: 200
            })

        }).catch(error => {
            return res.json({
                message: error,
                status: 500
            })
        })
    },
    getSales: async (req, res) => {

        const userId = req.user.id;
        let page = req.query.page ?? "0";
        let offset = 6;

        if (validation.isEmpty(page) || !validation.isNumeric(page)) {
            page = 0
        } else {
            page = parseInt(page)
        }

        await prisma.$transaction([
            prisma.purchase_details.findMany({
                where: {
                    products: {
                        user_id: parseInt(userId)
                    }
                },
                include: {
                    products: true
                },
                skip: parseInt(offset) * parseInt(page),
                take: parseInt(offset),
                orderBy: {
                    id: "desc"
                }
            }),

            prisma.purchase_details.count({
                where: {
                    products: {
                        user_id: parseInt(userId)
                    }
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
                status: 500,
                message: "An error has ocurred"
            })
        })
    },
    delete: async (req, res) => {
        let userId = req.user.id;
        let purchaseId = req.params.id;

        if (!validation.isNumeric(purchaseId)) {
            return res.json({
                message: "didn't pass validation",
                status: 500
            })
        }

        await prisma.$transaction([
            prisma.purchase_details.deleteMany({
                where: {
                    purchase_id: parseInt(purchaseId)
                }
            }),
            prisma.purchases.delete({
                where: {
                    id: parseInt(purchaseId)
                }
            })
        ]).then(data => {
            return res.json({
                purchase: data[0],
                purchaseDetails: data[1],
                status: 200
            })
        }).catch(error => {
            return res.json({
                status: 500,
                message: "An error has ocurred"
            })
        })

    }

}

