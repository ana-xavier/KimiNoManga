module.exports = class ReservaDAO {

	constructor() {
		this.idreserva = 0;
		this.idd = "";
		this.id = "";
		this.usnome = "";
		this.usemail = "";
		this.mnome = "";
		this.dias = "";
	}
	setIdreserva(ir) {
		return this.idreserva = ir;
	}

	getIdreserva() {
		return this.idreserva;
	}

	setIdd(mi) {
		return this.idd = mi;
	}

	getIdd() {
		return this.idd;
	}

	setId(ui) {
		return this.id = ui;
	}

	getId() {
		return this.id;
	}
	
	setUsnome(un) {
		//return this.nome = un;
		if (un == ""){
			throw "O campo nome é obrigatório.";
		} else {
			this.usnome = un;
		}
	}

	getNome() {
		return this.usnome;
	}

	setUsemail(ue) {
		//return this.email = ue;
		if (ue == ""){
			throw "O e-mail é obrigatório.";
		} else {
			this.usemail = ue;
		}
	}

	getUsemail() {
		return this.usemail;
	}

	setMnome(mn){
		return this.mnome = mn;
	}
	getMnome(){
		return this.mnome;
	}

	setDias(dia) {
		return this.dias = dia;
	}

	getDias() {
		return this.dias;
	}

	create(connection) {
	var sql = "insert into reserva(IDmanga, idUSUARIO, nomeU, emailU, nomeM, dias) value(?, ?, ?, ?, ?, ?)";

	connection.query(sql, [this.idd, this.id, this.usnome, this.usemail, this.mnome, this.dias], 
		function (err, result){
			if (err) throw err;			
		});
	}

	list(connection, callback){
		var sql = "SELECT * FROM reserva";

		connection.query(sql, function(err, result){
			if (err) throw err;
			return callback(result);
		});
	}

	findId(connection, callback){
	var sql = "SELECT * FROM reserva WHERE IDreserva = ?";

		connection.query(sql, [this.idreserva], function(err, result){
			if (err) throw err;
			return callback(result);
		});
	}

	delete(connection){
		var sql = "DELETE FROM reserva WHERE IDreserva = ?";

		connection.query(sql, [this.idreserva], function (err, result){
				if (err) throw err;
			});
	}

	update(connection) {
		var sql = "UPDATE reserva SET IDmanga = ?, idUSUARIO = ?, nomeU = ?, emailU = ?, nomeM = ?, dias = ? WHERE IDreserva = ?";

	connection.query(sql, [this.idd, this.id, this.usnome, this.usemail, this.mnome, this.dias, this.idreserva], 
		function (err, result){
			if (err) throw err;			
		});
	}
}