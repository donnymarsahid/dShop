const { Product } = require("../../models/dshop/model");
const sharp = require("sharp");
const fs = require("fs");

module.exports = {
    /**
     * listData > Get List Data
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
    listData: async function (req, res, next) {
        try {
            const getProduct = await Product.find({}).lean();
            res.status(200).json({
                status: "success",
                data: getProduct,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
            });
        }
    },
    /**
     * createData
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    createData: async function (req, res, next) {
        try {
            if (req.file) {
                // membuat nama file baru dengan menambahkan ekstensi .webp
                const filename = req.file.filename + ".png";

                // melakukan operasi resize pada gambar
                sharp(req.file.path)
                    .resize(500)
                    .toFormat("webp")
                    .toFile("src/upload/" + filename, (err, info) => {
                        if (err) return next(err);

                        // menghapus file asli yang diupload
                        fs.unlinkSync(req.file.path);

                        const createdData = {
                            ...req.body,
                            image: filename,
                        };

                        const created = Product.create(createdData);
                        // mengirimkan respon berhasil dengan nama file yang baru
                        if (created) {
                            res.status(200).json({
                                status: "success",
                            });
                        } else {
                            res.status(500).json({
                                status: "failed",
                            });
                        }
                    });
            } else {
                res.status(500).json({
                    status: "failed",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
            });
        }
    },
    /**
     * updateData
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    updateData: async function (req, res, next) {
        try {
            const id = req.params.id;
            console.log(req.body);
            const updated = await Product.updateOne({ _id: id }, req.body);

            if (updated) {
                res.status(200).json({
                    status: "success",
                });
            } else {
                res.status(500).json({
                    status: "failed",
                });
            }
        } catch (error) {
            console.log("error");
            console.error(error);
            res.status(500).json({
                status: "failed",
            });
        }
    },
    /**
     * deleteData
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    deleteData: async function (req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await Product.deleteOne({ _id: id });

            if (deleted) {
                res.status(200).json({
                    status: "success",
                });
            } else {
                res.status(500).json({
                    status: "failed",
                });
            }
        } catch (error) {
            console.log("error");
            console.error(error);
            res.status(500).json({
                status: "failed",
            });
        }
    },
};
