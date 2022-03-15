module.exports = class EmprestaDAO {

	constructor() {
        this.idempresta = 0;
		this.idd = "";
		this.id = "";
        this.NomeUS = "";
        this.EmailUS = "";
        this.NomeMA = "";
        this.Estado = "";
        this.DataEmpresta = "";
        this.DataDevolve = "";
		
	}
    setIdEmpresta(ie) {
		return this.idempresta = ie;
	}

	getIdEmpresta() {
		return this.idempresta;
	}
    setIdd(im) {
		return this.idd = im;
	}

	getIdd() {
		return this.idd;
	}
    setId(iu) {
		return this.id = iu;
	}

	getId() {
		return this.id;
	}

	setNomeUs(nu) {
		if(nu == '') {
			throw 'O campo nome é obrigatório.';
		} return this.NomeUS = nu;
	}

	getNomeUs() {
		return this.NomeUs;
	}

	setEmailUs(eu) {
		//return this.EmailUS = eu;
		if (eu == ''){
			throw 'O e-mail é obrigatório.';
		} else {
			this.EmailUS = eu;
		}
	}

	getEmailUs() {
		return this.EmailUS;
	}

	setNomeMa(ma) {
		if(ma == '') {
			throw 'O campo nome é obrigatório.';
		} return this.NomeMA = ma;
	}

	getNomeMa() {
		return this.NomeMA;
	}

	setEstado(es) {
		return this.Estado = es;
	}

	getEstado() {
		return this.Estado;
	}

	setDataEmprestaA(de) {
		return this.DataEmpresta = de;
	}
	getDataEmprestaA() {
		return this.DataEmpresta;
	}

	setDataDevolve(dd) {
		return this.DataDevolve = dd;
	}

	getDataDevolve() {
		return this.DataDevolve;
	}

	create(connection) {
		var sql = "INSERT INTO empresta(IDmanga, idUSUARIO, nomeUS, emailUS, nomeMA, estado, dataEmpresta, dataDevolve) values(?, ?, ?, ?, ?, ?, ?, ?)";

	connection.query(sql, [this.idd, this.id, this.NomeUS, this.EmailUS, this.NomeMA, this.Estado, this.DataEmpresta, this.DataDevolve], 
		function (err, result) {
			if (err) throw err;			
		});
	}
	list(connection, callback) {
		var sql = "SELECT * FROM empresta";
	
		connection.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});    
	  }
	
	delete(connection) {
		var sql = "DELETE FROM empresta WHERE IDempresta = ?";

		connection.query(sql, [this.idempresta], function (err, result) {
			if (err) throw err;
		});
	}

	findId(connection, callback) {
		var sql = "SELECT * FROM empresta WHERE IDempresta = ?";

		connection.query(sql, [this.idempresta], function (err, result) {
			if (err) throw err;
			return callback(result);  
		});
	}

	update(connection) {
		var sql = "UPDATE empresta SET IDmanga=?, idUSUARIO=?, nomeUS=?, emailUS=?, nomeMA=?, estado=?, dataEmpresta=?, dataDevolve=? WHERE IDempresta=?";

		connection.query(sql, [this.idd, this.id, this.NomeUS, this.EmailUS, this.NomeMA, this.Estado, this.DataEmpresta, this.DataDevolve, this.idempresta], 
			function (err, result) {
				if (err) throw err;			
			});
	} 
}

