const { pool } = require('../configs/connectDB')
let multerConfig = require('../configs/multerConfig');
const { upload, delete1 } = require('../configs/uploadDrive')




class controller {
    getAll = async (req, res) => {

        try {
            const [data] = await pool.execute('SELECT IDNH, TENNHANHIEU, MOTA, HINH, TRANGTHAI FROM NHANHIEU')

            return res.status(200).json({
                status: 200,
                message: 'Successfully',
                data: data
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
    getById = async (req, res) => {
        try {
            const [data] = await pool.execute('SELECT IDNH, TENNHANHIEU, MOTA, HINH, TRANGTHAI FROM NHANHIEU WHERE IDNH = ?', [req.params.id])

            if (data.length == 0) return res.status(404).json({
                status: 404,
                message: 'Not found',
            })

            return res.status(200).json({
                status: 200,
                message: 'Success',
                data: data
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    editById = async (req, res) => {
        try {
            await pool.execute('UPDATE NHANHIEU SET TENNHANHIEU = ?, MOTA = ?, HINHANH = ? WHERE IDNH = ?', [req.body.tennhanhieu, req.body.mota, req.body.hinhanh, req.params.id])
            return res.status(200).json({
                status: 200,
                message: 'Success',
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
    disableById = async (req, res) => {
        try {
            await pool.execute('UPDATE NHANHIEU SET TRANGTHAI = 0 WHERE IDNH = ?', [req.params.id])
            return res.status(200).json({
                status: 200,
                message: 'Success',
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
    deleteById = async (req, res) => {
        try {
            await pool.execute('DELETE FROM NHANHIEU WHERE IDNH = ?', [req.params.id])
            const [data] = await pool.execute('DELETE FROM NHANHIEU WHERE IDNH = ?', [req.params.id])

            return res.status(200).json({
                status: 200,
                message: 'Success',
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }


    }
    add = async (req, res) => {

        let uploadFile = multerConfig('images')
        uploadFile(req, res, async (error) => {
            console.log(req.file);
            if (error) {
                return res.status(440).json({
                    status: 400,
                    message: error,

                });
            }

            let idDrive = await upload(res, req.body.tennhanhieu)
            // console.log(id);
            const hinhanh = `https://drive.google.com/uc?export=view&id=${idDrive}`
            console.log(hinhanh);

            // try {

            //     await pool.execute(`INSERT INTO NHANHIEU(TENHANHIEU, MOTA, HINHANH, TRANGTHAI) values (?, ?, ?)`, [req.body.tennhanhieu, req.body.mota, hinhanh, 1])
            //     return res.status(200).json({
            //         status: 200,
            //         message: 'Success',
            //     });
            // }
            // catch (error) {
            //     return res.status(500).json({
            //         status: 500,
            //         message: 'Unsuccess',
            //     });

            // }

        })
    }
}

module.exports = new controller