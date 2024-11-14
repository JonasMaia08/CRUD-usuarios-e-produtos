para testar a aplicaçao seram necessários alguns passos pois se trata de uma aplicação de servidor local


# Criar um database para usar
*Em primeiro lugar abra o mysql workbench ou o xammp para criar o database e tabelas* 
*tem um codigo após a explicação para colar no workbench* 

entre no mysql workbench ou xammp e crie um database nomeado **prova** depois dentro deste db crie uma tabela nomeada **produtos** com as seguintes colunas:
- id (int)
- nome (varchar)
- descricao (varchar)
- preco (float)
- quantidade (int)
- categoria (varchar)

codigo para criar


e uma tabela nomeada **usuarios** com as seguintes colunas:
- id (int)
- nome (varchar)
- email (varchar)
- telefone (varchar)
- data_nascimento (date)


**codigo para mysql**

CREATE DATABASE prova;

USE prova;

CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55),
    descricao VARCHAR(55),
    preco FLOAT,
    quantidade INT,
    categoria VARCHAR(55)
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55),
    email VARCHAR(55),
    telefone VARCHAR(55),
    data_nascimento DATE
);


# apos ter criado>>

# setar o servidor para rodar localmente 

abrir um novo sql file e colar e rodar o seguinte comando:

**ALTER USER 'root'@'localhost' IDENTIFIED BY '1234';**
ou alternativamente 
**ALTER USER 'root'@'localhost' IDENTIFIED BY mysql_native_password BY'1234';**

ou substitua a senha da file db.js que esta dentro da pasta api para a senha que atualmente utiliza em seu localhost
¨

# insgtalar as dependencias 
*instalar as dependencias necessarias para a aplicação rodar*
comandos entre no terminal Atalho: ctrl + "
então entre na pasta api: **cd api**
e rode **npm i**

faça o mesmo para a pasta frontend
saia com **cd..**
então entre na pasta client: **cd client**
e digite **npm i**

# rodar aplicação

apos isso dentro do caminho frontend rode o programa
**npm start**

crie um novo terminal no *+* em cima
e entre na pasta api **cd api**
e digite o comando
**npm start**

# entre no browser e teste a aplicação
