const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); 

const app = express();
const prisma = new PrismaClient();

app.use(cors()); 
app.use(express.json());

app.get('/livros', async (req, res) => {
  const livros = await prisma.livro.findMany();
  res.json(livros);
});

app.get('/livros/:id', async (req, res) => {
  const { id } = req.params;
  const livro = await prisma.livro.findUnique({
    where: { id: Number(id) },
  });
  res.json(livro);
});

app.post('/livros', async (req, res) => {
  const { titulo, autor, ano, preco } = req.body;
  const livro = await prisma.livro.create({
    data: { titulo, autor, ano, preco },
  });
  res.status(201).json(livro);
});

app.put('/livros/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, preco } = req.body;
  const livro = await prisma.livro.update({
    where: { id: Number(id) },
    data: { titulo, autor, ano, preco },
  });
  res.json(livro);
});

app.delete('/livros/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.livro.delete({
    where: { id: Number(id) },
  });
  res.json({ mensagem: 'Livro excluído com sucesso' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
