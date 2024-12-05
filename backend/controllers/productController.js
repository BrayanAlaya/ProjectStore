const { isEmpty } = require("validator");
const prisma = require("../orm");
const moment = require("moment");
const validation = require("validator");
const crypto = require("crypto")
const sharp = require("sharp")
const s3 = require("../services/s3");
const jwt = require("../services/jwt")

module.exports = {
    save: async (req, res) => {

        const post = req.body;
        const user_id = req.user.id;
        const files = req.files
        let imageUrl = []

        try {

            const nameValid = isEmpty(post.name.trim())
            const stockValid = isEmpty(post.stock.trim())
            const priceValid = isEmpty(post.price.trim())
            const descriptionValid = isEmpty(post.description.trim())
            const categoryIdValid = isEmpty(post.category_id.trim())

            if (nameValid || stockValid || priceValid || descriptionValid || categoryIdValid) {
                return res.json({
                    status: 409,
                    message: "didn't pass validation"
                })
            }

            const uploadImages = await files.map(async file => {
                const generatedName = crypto.randomBytes(10).toString('hex') + Date.now().toString()
                imageUrl.push(generatedName)

                const fileBuffer = await sharp(file.buffer)
                    .resize({
                        height: 720,
                        width: 1280,
                        fit: 'cover',
                        withoutEnlargement: true
                    })
                    .toFormat("jpeg", { quality: 80 })
                    .toBuffer();

                await s3.uploadFile(fileBuffer, generatedName, file.mimetype)
            })

            await Promise.all(uploadImages)
                .then(async () => {
                    await prisma.products.create({
                        data: {
                            name: post.name.trim().toLowerCase(),
                            stock: parseInt(post.stock),
                            image: JSON.stringify(imageUrl),
                            price: parseFloat(post.price.trim()),
                            description: post.description.trim(),
                            createdDate: moment().toISOString(),
                            category_id: parseInt(post.category_id),
                            user_id: parseInt(user_id),
                            eliminado: 0
                        }
                    }).then(async (data) => {

                        await prisma.notifications.create({
                            data: {
                                title: "¡Producto Publicado Exitosamente!",
                                message: "Tu producto " + post.name.trim().toLowerCase() + " ha sido publicado y ya está disponible para los compradores.",
                                date: moment().toISOString(),
                                user_Id: parseInt(user_id),
                            }
                        })

                        return res.json({
                            status: 200,
                            data: data
                        })

                    }).catch(error => {
                        console.log(error)
                        return res.json({
                            status: 500
                        })
                    })
                })
                .catch(error => {
                    console.log(error)
                    return res.json({
                        status: 500,
                        message: "An error on upload image has ocurred"
                    })
                })

        } catch (error) {
            console.log(error)
            return res.json({
                status: 500
            })
        }

    },

    getBySearch: async (req, res) => {

        let name = req.query.name ?? "";
        let page = req.query.page ?? "0";
        let user_id = req.query.user ?? "";
        let id = req.query.id ?? "";
        let category = req.query.category ?? "";
        let offset = 12;
        let userWish = req.query.token ?? ""

        let search = {
            eliminado: {
                not: 1,
            },
        }


        if (!validation.isEmpty(name)) {
            search['name'] = {
                startsWith: "%" + name + "%"
            }
        }

        if (validation.isNumeric(category)) {
            search['category_id'] = parseInt(category)
        }

        if (validation.isNumeric(user_id)) {
            search['user_id'] = parseInt(user_id)
        }

        if (validation.isNumeric(id)) {
            search['id'] = parseInt(id)
        }

        if (validation.isEmpty(page) || !validation.isNumeric(page)) {
            page = 0
        } else {
            page = parseInt(page)
        }

        await prisma.$transaction([
            prisma.products.findMany({
                where: search,
                skip: parseInt(offset) * parseInt(page),
                take: parseInt(offset),
                orderBy: {
                    id: "desc"
                }
            }),

            prisma.products.count({
                where: search
            }),
        ]).then(async data => {

            let wishlist = [];
            if (!isEmpty(userWish)) {
                userWish = jwt.data(userWish)
                await prisma.wishlist.findMany({
                    where: {
                        user_id: parseInt(userWish.id),
                        products: search
                    }
                }).then(data => {
                    wishlist = data
                })
            }

            return res.json({
                data: data[0],
                count: data[1],
                wish: wishlist,
                status: 200
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                message: "An error has ocurred",
                status: 500
            })
        })


    },

    update: async (req, res) => {

        const post = req.body;
        const user_id = req.user.id;
        const id = req.params.id;
        const files = req.files;
        let imageUrl = []

        try {

            const nameValid = isEmpty(post.name)
            const stockValid = isEmpty(post.stock)
            const priceValid = isEmpty(post.price)
            const descriptionValid = isEmpty(post.description)
            const categoryIdValid = isEmpty(post.category_id)

            if (nameValid || stockValid || priceValid || descriptionValid || categoryIdValid) {
                return res.json({
                    status: 409,
                    message: "didn't pass validation"
                })
            }

        } catch (error) {

            return res.json({
                status: 500,
            })

        }

        let dataUpdate = {
            name: post.name.trim().toLowerCase(),
            stock: parseInt(post.stock),
            price: parseFloat(post.price),
            description: post.description,
            category_id: parseInt(post.category_id)
        }

        if (files.length > 0) {
            await prisma.products.findFirst({
                where: {
                    id: parseInt(id),
                    user_id: parseInt(user_id)
                }
            }).then(async (data) => {
                const images = JSON.parse(data.image)

                await images.map(async image => {
                    await s3.deleteFile(image)
                })

                await files.map(async file => {
                    const generatedName = crypto.randomBytes(10).toString('hex') + Date.now().toString()
                    imageUrl.push(generatedName)

                    const fileBuffer = await sharp(file.buffer)
                        .resize({
                            height: 720,
                            width: 1280,
                            fit: 'cover',
                            withoutEnlargement: true
                        })
                        .toFormat("jpeg", { quality: 80 })
                        .toBuffer();

                    await s3.uploadFile(fileBuffer, generatedName, file.mimetype)
                })



                dataUpdate["image"] = JSON.stringify(imageUrl)

            }).catch(error => {
                console.log(error)
            })
        }

        await prisma.products.update({
            where: {
                id: parseInt(id),
                user_id: parseInt(user_id)
            },
            data: dataUpdate
        }).then(async (data) => {

            await prisma.notifications.create({
                data: {
                    title: "¡Producto Actualizado Exitosamente!",
                    message: "Tu producto " + data.name + " ha sido actualizado y ya está disponible para los compradores.",
                    date: moment().toISOString(),
                    user_Id: parseInt(user_id),
                }
            })

            return res.json({
                status: 200,
                data: data
            })
        }).catch(error => {
            return res.json({
                status: 500
            })
        })

    },

    delete: async (req, res) => {

        const user_id = req.user.id;
        const id = req.params.id;

        await prisma.products.findFirst({
            where: {
                id: parseInt(id),
                user_id: parseInt(user_id)
            },
        }).then(async data => {
            const images = JSON.parse(data.image)
            await images.map(async image => {
                await s3.deleteFile(image)
            })
        })

        await prisma.products.update({
            where: {
                id: parseInt(id),
                user_id: parseInt(user_id)
            },
            data: {
                eliminado: 1,
                image: "[]"
            }
        }).then(async data => {

            await prisma.notifications.create({
                data: {
                    title: "¡Producto Eliminado Correctamente!",
                    message: "Tu producto " + data.name + " ha sido eliminado y ya no está disponible en la tienda.",
                    date: moment().toISOString(),
                    user_Id: parseInt(user_id),
                }
            })

            return res.json({
                status: 200,
                data: data
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 500
            })
        })

    }
}
