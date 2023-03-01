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

    }
    editById = async (req, res) => {

    }
    disableById = async (req, res) => {

    }
    deleteById = async (req, res) => {

    }
    add = async (req, res) => {

    }
}

module.exports = new controller