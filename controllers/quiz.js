const db = require("../models");
const Quiz = db.quizzes;


// CREATE : menambah data
exports.create = async (req, res) => {
    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz berhasil dibuat.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ,
            data: null,
        });
    }
}

// READ : menampilkan semua data
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes berhasil ditampilkan." ,
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

// CHANGE mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "Quizzes berhasil di update.",
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan saat mengambil quiz"
        });
    }
}

//DELETE menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })

        quiz.destroy()

        res.json({
            message: "Quiz berhasil di hapus!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan saat mengambil quiz",
            data: null,
        });
    }
}

//Menampilkan data berdasarkan id 
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Quizzes berhasil diambil dengan sukses dengan id=${id}.`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan saat mengambil quiz",
            data: null,
        });
    }
};

//Menampikan atau mengambil semua data quiz berdasarkan category tertentu
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            categoryId: id
        }
    })
    res.json({
        message: `Quiz berhasil ditampikan dengan categoryId=${id}.`,
        data: quizzes,
    });
}

//Menampilkan atau mengambil semua data quiz berdasarkan level
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            levelId: id
        }
    })
    res.json({
        message: `Quiz berhasil diambil dengan levelId=${id}.`,
        data: quizzes,
    })
}