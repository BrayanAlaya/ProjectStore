const { isEmpty, isNumeric } = require("validator");
const prisma = require("../orm");

module.exports = {
    createCategory: async (req, res) => {

        let response = {}
        let body = req.body

        try {

            const nameValidate = !isEmpty(body.name)

            if (nameValidate) {

                const responseQuery = await prisma.categories.create({
                    data: body
                })

                if (responseQuery) {

                    response = {
                        status: 200,
                        data: responseQuery
                    }
                } else {
                    response = {
                        status: 500
                    }
                }


            } else {
                response = {
                    status: 400,
                    message: "Validation failed"
                }
            }

        } catch (error) {
            response = {
                status: 500
            }
        }

        res.json(response)
    },

    searchCategories: async (req, res) => {

        await prisma.categories.findMany({
            orderBy: {
                name: "asc"
            }
        }).then(data => {
            return res.json({
                data: data,
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
    

    updateCategory: async (req, res) => {

        let response = {}
        const body = req.body
        const id = req.params.id

        try {

            const nameValidate = !isEmpty(body.name)

            if (nameValidate) {


                await prisma.categories.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        name: body.name
                    }
                }).then(data => {

                    response = {
                        status: 200,
                        data: data
                    }

                }).catch(error => {
                    console.log(error)

                    response = {
                        status: 400
                    }
                })

            } else {
                response = {
                    status: 400,
                    message: "Validation failed"
                }
            }

        } catch (error) {
            console.log(error)

            response = {
                status: 500
            }
        }

        return res.json(response)
    }

}
