use kiminomanga_db;

CREATE TABLE usuario (
	idUSUARIO  INT AUTO_INCREMENT NOT NULL,
    nome varchar(250) NOT NULL,
    senha varchar(250) NOT NULL,
    email varchar(30),
    data_nasc date,
    PRIMARY KEY(idUSUARIO)
    );

CREATE TABLE Mangas (
	IDmanga  INT AUTO_INCREMENT NOT NULL,
    NOME varchar(250) NOT NULL,
    CATEGORIA varchar(250) NOT NULL,
    AUTOR varchar(30),
    PRIMARY KEY(IDmanga)
    );
    
CREATE TABLE reserva (
	IDreserva INT AUTO_INCREMENT NOT NULL,
	IDmanga INT NOT NULL,
    idUSUARIO INT NOT NULL,
    nomeU varchar(250) NOT NULL,
    emailU varchar(30) NOT NULL,
    nomeM varchar(250) NOT NULL,
    dias  INT NOT NULL,
    PRIMARY KEY(IDreserva)
    );

CREATE TABLE empresta (
	IDempresta INT AUTO_INCREMENT NOT NULL,
	IDmanga INT NOT NULL,
    idUSUARIO INT NOT NULL,
    nomeUS varchar(250) NOT NULL,
    emailUS varchar(30) NOT NULL,
    nomeMA varchar(250) NOT NULL,
    estado varchar(30) NOT NULL,
	dataEmpresta date,
    dataDevolve date,
	PRIMARY KEY(IDempresta)
    );

CREATE USER 'chefao'@'localhost' IDENTIFIED BY '12345678';

GRANT ALL PRIVILEGES ON *.* to 'chefao'@'localhost';

FLUSH PRIVILEGES;

select * from empresta;

ALTER TABLE usuario AUTO_INCREMENT = 0;
ALTER TABLE Mangas AUTO_INCREMENT = 0;
ALTER TABLE reserva AUTO_INCREMENT = 0;
ALTER TABLE empresta AUTO_INCREMENT = 0;