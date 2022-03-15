const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
	console.log("Servidor no ar - Porta 3000")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var mysql = require('mysql');
var conexao = mysql.createConnection({
	host: 'localhost',
	user: 'chefao',
	password: '12345678',
	database: 'kiminomanga_db'
});

conexao.connect(function(err){
	if(err) throw err;
	console.log("Banco conectado");
});

// Parte do usuário

const UsuarioDAO = require('./models/UsuarioDAO');

app.get('/', function(req, res){
	//res.sendFile(__dirname + '/views/home.html') 
	res.render('home.ejs');
	});

app.get('/usuario', function(req, res){
	var usuario = new UsuarioDAO();
	usuario.list(conexao, function(result){
		res.render('usuarios/lista.ejs', {usuarios: result});
	});
});

//app.get('/entrarFormulario', function(req, res){
	//res.sendFile(__dirname + '/views/usuarios/form.html');
//});

app.post('/salvar', function(req, res){
	try {
		var usuario = new UsuarioDAO();
		usuario.setId(req.body.id);
		usuario.setNome(req.body.nome);
		usuario.setSenha(req.body.senha);
		usuario.setEmail(req.body.email);
		usuario.setDatanasc(req.body.datanasc);

		if (req.body.acao == "Salvar"){
			if (usuario.getId() > 0){
				var retorno = usuario.update(conexao);
			} else {
				var retorno = usuario.create(conexao);
			} 
			//res.sendFile(__dirname + '/views/usuarios/resultado.html');
			res.render(__dirname + '/views/usuarios/resultado.ejs');
			} else {
				if (req.body.acao == "Cancelar"){
					res.redirect("http://localhost:3000");
				}
			}
		} catch (e){
			res.render('usuarios/erro.ejs', {erro: e});
	}
});


app.get('/excluirDado', function(req, res){
	var usuario = new UsuarioDAO();
	usuario.setId(req.query.id);
	var retorno = usuario.delete(conexao);

	//res.sendFile(__dirname + '/views/usuarios/resultado.html');
	res.render(__dirname + '/views/usuarios/resultado.ejs')
});

app.get('/formUsuarios', function(req, res){
	var usuario = new UsuarioDAO();
	usuario.setId(req.query.id);

	usuario.findId(conexao, function(result){
	res.render('usuarios/form.ejs', {usuarios: result});
	});
});

//Parte dos mangas

const MangasDAO = require('./models/MangasDAO');

app.get('/mangas', function(req, res){
	var mangas = new MangasDAO();  
	mangas.list(conexao, function(result){
	  res.render('mangas/lista.ejs', {Mangas: result});
	});
});

app.post('/salvarManga', function(req, res){
	try {
		var mangas = new MangasDAO();
		mangas.setID(req.body.ID);
		mangas.setNome(req.body.nome);
		mangas.setCategoria(req.body.categoria);
		mangas.setAutor(req.body.autor);
	
		if (req.body.acao == "Salvar") {
			if(mangas.getID() > 0) {
				var retorno = mangas.update(conexao); 
			} else {
				var retorno = mangas.create(conexao);
			}
			//res.sendFile(__dirname + '/views/mangas/resultado.ejs');
			res.render(__dirname + '/views/mangas/resultado.ejs');
		} else {
			if (req.body.acao == "Cancelar") {
				res.redirect("http://localhost:3000");
			}	
		}
	} catch(e) {
		res.render('/mangas/erro.ejs', {erro: e});
	}
});

app.get('/excluirManga', function(req, res) {
	var mangas = new MangasDAO();
	mangas.setID(req.query.ID);

	var retorno = mangas.delete(conexao);

	//res.sendFile(__dirname + '/views/mangas/resultado.ejs');
	res.render(__dirname + '/views/mangas/resultado.ejs')
});

app.get('/formManga', function(req, res) {
	var mangas = new MangasDAO();
	mangas.setID(req.query.ID);

	mangas.buscarPorId(conexao, function(result){
		res.render('mangas/form.ejs', {Mangas: result});
	});	
});

// Parte dos emprestimos 

const EmprestaDAO = require('./models/EmprestaDAO');

app.get('/empresta', function(req, res){
	var empresta = new EmprestaDAO();  
	empresta.list(conexao, function(result){
	  res.render('empresta/lista.ejs', {Empresta: result});
	});
});

app.post('/salvarEmpresta', function(req, res){
	try {
		var empresta = new EmprestaDAO();
		empresta.setIdEmpresta(req.body.idempresta);
		empresta.setIdd(req.body.idM);
		empresta.setId(req.body.idU);
		empresta.setNomeUs(req.body.nomeu);
		empresta.setEmailUs(req.body.emailu);
		empresta.setNomeMa(req.body.nomem);
		empresta.setEstado(req.body.estado);
		empresta.setDataEmprestaA(req.body.dataE);
		empresta.setDataDevolve(req.body.dataD);
	
		if (req.body.acao == "Salvar") {
			if(empresta.getIdEmpresta() > 0) {
				var retorno = empresta.update(conexao); 
			} else {
				var retorno = empresta.create(conexao);
			}
			//res.sendFile(__dirname + '/views/empresta/resultado.ejs');
			res.render(__dirname + '/views/empresta/resultado.ejs');
		} else {
			if (req.body.acao == "Cancelar") {
				res.redirect("http://localhost:3000");
			}	
		}
	} catch(e) {
		res.render('empresta/erro.ejs', {erro: e});
	}
});

app.get('/excluirEmpresta', function(req, res) {
	var empresta = new EmprestaDAO();
	empresta.setIdEmpresta(req.query.idempresta);

	var retorno = empresta.delete(conexao);

	//res.sendFile(__dirname + '/views/empresta/resultado.ejs');
	res.render(__dirname + '/views/empresta/resultado.ejs')
});

app.get('/formEmpresta', function(req, res) {
	var empresta = new EmprestaDAO();
	empresta.setIdEmpresta(req.query.idempresta)

	empresta.findId(conexao, function(result){
	res.render('empresta/form.ejs', {Empresta: result});
	});
});

// Parte das reservas

const ReservaDAO = require('./models/ReservaDAO');

app.get('/reserva', function(req, res){
	var reserva = new ReservaDAO();
	reserva.list(conexao, function(result){
		res.render('reserva/lista.ejs', {reservas: result});
	});
});

app.post('/salvarReserva', function(req, res){
	try{
		var reserva = new ReservaDAO();
		reserva.setIdreserva(req.body.idReserva);
		reserva.setIdd(req.body.idM);
		reserva.setId(req.body.idU);
		reserva.setUsnome(req.body.nomeu);
		reserva.setUsemail(req.body.emailu);
		reserva.setMnome(req.body.nomem);
		reserva.setDias(req.body.dias);

		
		if(req.body.acao == "Salvar"){
			if (reserva.getIdreserva() > 0){
				var retorno = reserva.update(conexao);
			} else {
				var retorno = reserva.create(conexao);
			}
			res.render(__dirname + '/views/reserva/resultado.ejs');
		} else {
			if (req.body.acao == "Cancelar"){
				res.redirect("http://localhost:3000");
			}
		}
	} catch (e){
		res.render('reserva/erro.ejs', {erro: e});
	}
});

app.get('/excluirReserva', function(req, res){
	var reserva = new ReservaDAO();
	reserva.setIdreserva(req.query.idreserva);
	var retorno = reserva.delete(conexao);

	res.render(__dirname + '/views/reserva/resultado.ejs')
});

app.get('/formReserva', function(req, res){
	var reserva = new ReservaDAO();
	reserva.setIdreserva(req.query.idreserva);

	reserva.findId(conexao, function(result){
		res.render('reserva/form.ejs', {reservas: result});
	});
});