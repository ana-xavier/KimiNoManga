module.exports = class MangasDAO {

	constructor() {
		this.ID = 0;
		this.nome = "";
		this.categoria = "";
		this.autor = "";
	}

	setNome(n) {
		if(n == '') {
			throw 'O campo nome é obrigatório.';
		} if(n.lenght > 45) {
			throw 'O campo nome não pode ter mais de 45 caracteres.'
		} else {
			this.nome = n;
		}
		//return this.nome = n;
	}

	getNome() {
		return this.nome;
	}

	setCategoria(c) {
		if(c == '') {
			throw 'O campo categoria é obrigatório.';
		} if(c.lenght > 45) {
			throw 'O campo categoria não pode ter mais de 45 caracteres.'
		} else {
			this.categoria = c;
		}
		//return this.categoria = c;
	}

	getCategoria() {
		return this.categoria;
	}

	setAutor(a) {
		if(a == '') {
			throw 'O campo autor é obrigatório.';
		} if(a.lenght > 45) {
			throw 'O campo autor não pode ter mais de 45 caracteres.'
		} else {
			this.autor = a;
		}
		
		//return this.autor = a;
	}

	getAutor() {
		return this.autor;
	}

	setID(i) {
		return this.ID = i;
	}

	getID() {
		return this.ID;
	}

	create(connection) {
		var sql = "INSERT INTO Mangas(NOME, CATEGORIA, AUTOR) values(?, ?, ?)";

	connection.query(sql, [this.nome, this.categoria, this.autor], 
		function (err, result) {
			if (err) throw err;			
		});
	}
	list(connection, callback) {
		var sql = "SELECT * FROM Mangas";
	
		connection.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});    
	  }
	
	delete(connection) {
		var sql = "DELETE FROM Mangas WHERE IDmanga = ?";

		connection.query(sql, [this.ID], function (err, result) {
			if (err) throw err;
		});
	}

	buscarPorId(connection, callback) {
		var sql = "SELECT * FROM Mangas WHERE IDmanga = ?";

		connection.query(sql, [this.ID], function (err, result) {
			if (err) throw err;
			return callback(result);  
		});
	}

	update(connection) {
		var sql = "UPDATE Mangas SET NOME=?, CATEGORIA=?, AUTOR=? WHERE IDmanga=?";

		connection.query(sql, [this.nome, this.categoria, this.autor, this.ID], 
			function (err, result) {
				if (err) throw err;			
			});
	} 
}

