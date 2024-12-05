const { isEmpty } = require("validator");
const prisma = require("../orm");
const validation = require("validator")

module.exports = {
    save: async (req, res) => {

        const post = req.body;
        const id = req.user.id;

        try {

            if (!validation.isNumeric(post.product_id.toString())) {
                return res.json({
                    status: 409,
                    message: "didn't pass validation"
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        }

        await prisma.wishlist.findFirst({
            where: {
                user_id: parseInt(id),
                product_id: parseInt(post.product_id)
            }
        }).then(async (data) => {
            if (data == null) {
                await prisma.wishlist.create({
                    data: {
                        product_id: parseInt(post.product_id),
                        user_id: parseInt(id)
                    }
                }).then(data => {
                    return res.json({
                        status: 200,
                        data: data
                    })
                }).catch(error => {
                    console.log(error)
                    return res.json({
                        status: 500,
                        message: error
                    })
                })
            } else {
                await prisma.wishlist.deleteMany({
                    where: {
                        user_id: parseInt(id),
                        product_id: parseInt(post.product_id)
                    }
                }).then(data => {

                    return res.json({
                        status: 200,
                        data: data
                    })

                }).catch(error => {
                    console.log(error)
                    return res.json({
                        status: 500,
                        message: error
                    })
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

    read: async (req, res) => {

        let userId = req.user.id;
        let page = req.query.page ?? "0";
        let offset = 6;

        if (validation.isEmpty(page) || !validation.isNumeric(page)) {
            page = 0
        } else {
            page = parseInt(page)
        }

        await prisma.$transaction([
            prisma.wishlist.findMany(
                {
                    where: {
                        user_id: parseInt(userId)
                    },
                    skip: parseInt(offset) * parseInt(page),
                    take: parseInt(offset),
                    orderBy: {
                        id: "desc"
                    },
                    include:{
                        products: true
                    }
                }),

            prisma.wishlist.count({
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

        let id = req.params.id;
        let user_id = req.user.id;

        await prisma.wishlist.delete({
            where: {
                id: Number(id),
                user_id: Number(user_id)
            }
        }).then(data => {

            return res.json({
                status: 200,
                data: data
            })

        }).catch(error => {
            return res.json({
                status: 500,
                message: error
            })
        })

    }
}