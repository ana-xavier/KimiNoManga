module.exports = class UsuarioDAO {

	constructor() {
		this.id = 0;
		this.nome = "";
		this.email = "";
		this.senha = "";
		this.datanasc = '';
	}
	setId(i) {
		return this.id = i;
	}

	getId() {
		return this.id;
	}

	setNome(n) {
		//return this.nome = n;
		if (n == ""){
			throw "O campo nome é obrigatório.";
		} else {
			this.nome = n;
		}
	}

	getNome() {
		return this.nome;
	}

	setEmail(e) {
		//return this.email = e;
		if (e == ""){
			throw "O e-mail é obrigatório.";
		} else {
			this.email = e;
		}
	}

	getEmail() {
		return this.email;
	}

	setSenha(s) {
		//return this.senha = s;
		if (s == "") {
			throw "O campo senha é obrigatório.";
		} else {
			this.senha = s;
		}
	}

	getSenha() {
		return this.senha;
	}

	setDatanasc(d) {
		return this.datanasc = d;
		//var patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
		//if (d == '' || !patternData.test(d)){
			//throw "O campo data de nascimento é obrigatório.";
		//} else {
			//this.datanasc = d;
		//}
	}

	getDatanasc() {
		return this.datanasc;
	}

	create(connection) {
		var sql = "insert into usuario(nome,senha,email,data_nasc) values(?,?,?,?)";

	connection.query(sql, [this.nome, this.senha, this.email, this.datanasc], 
		function (err, result){
			if (err) throw err;			
		});
	}

	list(connection, callback){
		var sql = "SELECT * FROM usuario";

		connection.query(sql, function(err, result){
			if (err) throw err;
			return callback(result);
		});
	}

	findId(connection, callback){
	var sql = "SELECT * FROM usuario WHERE idUSUARIO = ?";

		connection.query(sql, [this.id], function(err, result){
			if (err) throw err;
			return callback(result);
		});
	}

	delete(connection){
		var sql = "DELETE FROM usuario WHERE idUSUARIO = ?";

		connection.query(sql, [this.id], function (err, result){
				if (err) throw err;
			});
	}

	update(connection) {
		var sql = "UPDATE usuario SET nome = ?, senha = ?, email = ?, data_nasc = ? WHERE idUSUARIO = ?";

	connection.query(sql, [this.nome, this.senha, this.email, this.datanasc, this.id], 
		function (err, result){
			if (err) throw err;			
		});
	}
}