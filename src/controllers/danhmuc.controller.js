const { pool } = require('../configs/connectDB')



class controller {
    getAll = async (req, res) => {

        try {
            const [data] = await pool.execute('SELECT IDDM, TENDANHMUC, MOTA, TRANGTHAI FROM DANHMUCSANPHAM')

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
            const [data] = await pool.execute('SELECT IDDM, TENDANHMUC, MOTA, TRANGTHAI FROM DANHMUCSANPHAM WHERE IDDM = ?', [req.params.id])

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
            await pool.execute('UPDATE DANHMUCSANPHAM SET TENDANHMUC = ?, MOTA = ? WHERE IDDM = ?', [req.body.tendanhmuc, req.body.mota, req.params.id])
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
            await pool.execute('UPDATE DANHMUCSANPHAM SET TRANGTHAI = 0 WHERE IDDM = ?', [req.params.id])
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
            await pool.execute('DELETE FROM DANHMUCSANPHAM WHERE IDDM = ?', [req.params.id])
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
        try {
            await pool.execute(`INSERT INTO DANHMUCSANPHAM(TENDANHMUC, MOTA, TRANGTHAI) values (?, ?, ?)`, [req.body.tendanhmuc, req.body.mota, 1])

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
}

module.exports = new controller