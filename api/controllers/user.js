import { db } from "../db.js";

const validateProduct = (product) => {
  const { nome, preco, quantidade } = product;
  const errors = [];

  if (!nome) errors.push("Nome é obrigatório.");
  if (typeof preco !== 'number' || preco <= 0) errors.push("Preço deve ser um número maior que zero.");
  if (typeof quantidade !== 'number' || quantidade <= 0) errors.push("Quantidade deve ser um número inteiro maior que zero.");

  return errors;
};

export const getProducts = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const errors = validateProduct(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const q = "INSERT INTO produtos(`nome`, `descricao`, `preco`, `quantidade`, `categoria`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(201).json("Produto criado com sucesso.");
  });
};

export const updateProduct = (req, res) => {
  const errors = validateProduct(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const q = "UPDATE produtos SET `nome` = ?, `descricao` = ?, `preco` = ?, `quantidade` = ?, `categoria` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduct = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};

