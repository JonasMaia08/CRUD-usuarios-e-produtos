import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser  = (req, res) => {
  const { nome, email, telefone, data_nascimento } = req.body;

  // Validate input data
  if (!nome || !email || !telefone || !data_nascimento) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  // Check if the email already exists
  const checkEmailQuery = "SELECT * FROM usuarios WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.status(400).json({ message: "E-mail já utilizado." });
    }

    // Proceed to insert the new user
    const q = "INSERT INTO usuarios(nome, email, telefone, data_nascimento) VALUES(?)";
    const values = [nome, email, telefone, data_nascimento];

    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Usuário criado com sucesso.");
    });
  });
};

export const updateUser  = (req, res) => {
  const { nome, email, telefone, data_nascimento } = req.body;
  const { id } = req.params;

  // Validate input data
  if (!nome || !email || !telefone || !data_nascimento) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  // Check if the email is already used by another user
  const checkEmailQuery = "SELECT * FROM usuarios WHERE email = ? AND id != ?";
  db.query(checkEmailQuery, [email, id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.status(400).json({ message: "E-mail já utilizado." });
    }

    // Proceed to update the user
    const q = "UPDATE usuarios SET nome = ?, email = ?, telefone = ?, data_nascimento = ? WHERE id = ?";
    const values = [nome, email, telefone, data_nascimento];

    db.query(q, [...values, id], (err) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  });
};

export const deleteUser  = (req, res) => {
  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};