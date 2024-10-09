const { User, Almoxarifado, Entrada, Fornecedor, Item, EntradaItem, AlmoxarifadoItem, sequelize } = require('../models'); // Ajuste o caminho conforme a estrutura do seu projeto

const getEntradasUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // **1. Validação do userId**
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido.' });
  }

  try {
    // **2. Encontrar o Usuário e Incluir o Almoxarifado**
    const user = await User.findByPk(userId, {
      include: {
        model: Almoxarifado,
        attributes: ['id', 'name'],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // **3. Encontrar Todas as Entradas do Usuário, Incluindo Itens e Fornecedor**
    const entradas = await Entrada.findAll({
      where: { id_user: userId },
      include: [
        {
          model: Item,
          as: 'Items',
          through: {
            model: EntradaItem,
            attributes: ['quantidade'],
          },
          attributes: ['id', 'name'],
        },
        {
          model: Fornecedor,
          attributes: ['id', 'nome', 'cnpj', 'contato'],
        },
      ],
      attributes: ['id', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });

    // **4. Log para Depuração (Opcional)**
    console.log('Entradas Encontradas:', JSON.stringify(entradas, null, 2));

    // **5. Estruturar os Dados para a Resposta**
    const resultado = {
      usuario: {
        id: user.id,
        nome: user.name,
        almoxarifado: user.Almoxarifado ? user.Almoxarifado.name : null,
      },
      entradas: entradas.map(entrada => ({
        id_entrada: entrada.id,
        data_entrada: entrada.createdAt,
        fornecedor: {
          id: entrada.Fornecedor.id,
          nome: entrada.Fornecedor.nome,
          cnpj: entrada.Fornecedor.cnpj,
          contato: entrada.Fornecedor.contato,
        },
        itens: entrada.Items.map(item => ({
          id_item: item.id,
          nome_item: item.name,
          quantidade: item.EntradaItem.quantidade,
        })),
      })),
    };

    // **6. Retornar a Resposta ao Cliente**
    return res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar entradas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

const postEntradaUser = async (req, res) => {
  const { userId, fornecedorId, itens } = req.body;

  // **1. Validação Básica dos Dados de Entrada**
  if (
    !userId ||
    !fornecedorId ||
    !Array.isArray(itens) ||
    itens.length === 0 ||
    !itens.every(item => item.id && item.quantidade && Number.isInteger(item.id) && Number.isInteger(item.quantidade) && item.quantidade > 0)
  ) {
    return res.status(400).json({ error: 'Dados de entrada inválidos. Verifique userId, fornecedorId e itens.' });
  }

  try {
    // **2. Verificar se o Usuário Existe**
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // **3. Verificar se o Fornecedor Existe**
    const fornecedor = await Fornecedor.findByPk(fornecedorId);
    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }

    // **4. Validar os Itens Solicitados**
    const itemIds = itens.map(item => item.id);
    const itemsEncontrados = await Item.findAll({
      where: { id: itemIds }
    });

    if (itemsEncontrados.length !== itemIds.length) {
      return res.status(400).json({ error: 'Um ou mais itens solicitados não foram encontrados.' });
    }

    // **5. (Opcional) Verificar Regras de Negócio**
    // Por exemplo, verificar se a quantidade solicitada excede um limite, se há restrições específicas, etc.

    // **6. Criar a Entrada e os Itens da Entrada em uma Transação**
    const resultado = await sequelize.transaction(async (t) => {
      // **6.1. Criar a Entrada**
      const novaEntrada = await Entrada.create({
        id_user: userId,
        id_fornecedor: fornecedorId,
      }, { transaction: t });

      // **6.2. Criar os Itens da Entrada**
      const entradaItens = itens.map(item => ({
        id_entrada: novaEntrada.id,
        id_item: item.id,
        quantidade: item.quantidade,
      }));

      await EntradaItem.bulkCreate(entradaItens, { transaction: t });

      // Atualizar o estoque de cada item no almoxarifado correspondente
      for (const item of itens) {
        const almoxarifadoItem = await AlmoxarifadoItem.findOne({
          where: { id_item: item.id, id_almoxarifado: usuario.almoxarifado_id },
        });

        if (almoxarifadoItem) {
          // Se a relação já existir, atualiza a quantidade
          await AlmoxarifadoItem.update(
            { quantidade: sequelize.literal(`quantidade + ${item.quantidade}`) },
            { where: { id_item: item.id, id_almoxarifado: usuario.almoxarifado_id }, transaction: t }
          );
        } else {
          // Caso contrário, cria uma nova entrada na tabela de relacionamento
          await AlmoxarifadoItem.create({
            id_item: item.id,
            id_almoxarifado: usuario.almoxarifado_id,
            quantidade: item.quantidade,
          }, { transaction: t });
        }
      }


      return novaEntrada;
    });

    // **7. Recuperar os Detalhes da Nova Entrada com Itens e Fornecedor**
    const entradaCriada = await Entrada.findByPk(resultado.id, {
      include: [
        {
          model: Item,
          as: 'Items',
          through: {
            model: EntradaItem,
            attributes: ['quantidade'],
          },
          attributes: ['id', 'name'],
        },
        {
          model: Fornecedor,
          attributes: ['id', 'nome', 'cnpj', 'contato'],
        },
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    // **8. Estruturar os Dados para a Resposta**
    const resultadoResposta = {
      message: 'Entrada criada com sucesso.',
      entrada: {
        id_entrada: entradaCriada.id,
        data_entrada: entradaCriada.createdAt,
        fornecedor: {
          id: entradaCriada.Fornecedor.id,
          nome: entradaCriada.Fornecedor.nome,
          cnpj: entradaCriada.Fornecedor.cnpj,
          contato: entradaCriada.Fornecedor.contato,
        },
        usuario: {
          id: entradaCriada.User.id,
          nome: entradaCriada.User.name,
        },
        itens: entradaCriada.Items.map(item => ({
          id_item: item.id,
          nome_item: item.name,
          quantidade: item.EntradaItem.quantidade,
        })),
      },
    };

    // **9. Retornar a Resposta ao Cliente**
    return res.status(201).json(resultadoResposta);
  } catch (error) {
    console.error('Erro ao criar entrada:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = { getEntradasUser, postEntradaUser }