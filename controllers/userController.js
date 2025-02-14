const { Usuarios } = require('../models/')
const bcrypt = require('bcrypt')

const userController = {
  exibir: async (_req, res) => {
    res.render('cadastro')
  },

  armazenar: async (req, res) => {
    const { nome, email, senha, cpf, tel, cidade, estado } = req.body
    const { file } = req
    let foto = null

    if(file){
      foto = file.filename
    }

    const usuario = await Usuarios.create({
      nome,
      email,
      senha: bcrypt.hashSync(senha, 10),
      cpf,
      foto,
      telefone: tel,
      cidade,
      estado
    })

    if (!usuario) {
      return res.send('Falha ao criar usuário')
    }

    return res.redirect('/login')
  },

  encontrar: async (req, res) => {
    const { id } = req.params

    const usuario = await Usuarios.findOne({
      where: { id },
    })

    if (!usuario) {
      return res.json({ message: 'Usuario não encontrado' })
    }

    return res.json(usuario)
  },

  deletar: async (req, res) => {
    const { id } = req.params

    const usuarioDeletado = await Usuarios.destroy({
      where: { id },
    })

    if (!usuarioDeletado) {
      return res.json({ message: 'Erro ao deletar usuário' })
    }

    return res.json({ message: 'Usuário deletado com sucesso!' })
  },
}

module.exports = userController
