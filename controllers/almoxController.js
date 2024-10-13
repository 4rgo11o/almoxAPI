const { Almoxarifado, Item, AlmoxarifadoItem } = require('../models');


const getItemsByAlmoxarifado = async (req, res) => {
  const almoxarifadoId = parseInt(req.params.id, 10);


  if (isNaN(almoxarifadoId)) {
    return res.status(400).json({ error: 'ID do almoxarifado inválido.' });
  }

  try {

    const almoxarifado = await Almoxarifado.findByPk(almoxarifadoId, {
      include: {
        model: Item,
        through: {
          model: AlmoxarifadoItem,
          attributes: ['quantidade'], // Quantidade associada ao item no almoxarifado
        },
        attributes: ['id', 'name'], // Atributos do item
      },
    });


    if (!almoxarifado) {
      return res.status(404).json({ error: 'Almoxarifado não encontrado.' });
    }


    const resultado = {
      almoxarifado: {
        id: almoxarifado.id,
        nome: almoxarifado.name,
      },
      itens: almoxarifado.Items.map(item => ({
        id_item: item.id,
        nome_item: item.name,
        quantidade: item.AlmoxarifadoItem.quantidade,
      })),
    };


    return res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar itens do almoxarifado:', error);
    return res.status(500).json({ error: 'Erro ao buscar itens do almoxarifado.' });
  }
};

module.exports = { getItemsByAlmoxarifado };
