
/* Conexão */
var redis = require('redis');
var client = redis.createClient();

client.on("error", function (err) {
  console.log("Error: " + err);
});

client.on('connect', function(){
	console.log("Conectado");
});


/* Armazenando Key-Value Pairs */
client.set('framework', 'AngularJS', function(erro, callBack){ console.log(callBack);});

/* Verifica se existe chave */
client.exists('key', function(err, reply) { if (reply === 1) { console.log('existe'); } else { console.log('Não existe'); } }); 

/* Pegar valor de uma chave */
client.get('framework', function(erro, callBack)
{
	console.log(callBack);
});


 /* Armazenando e recuperando Hash */
 client.hmset('Pacheco', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express'); 
 client.hgetall('Pacheco', function(err, object) { console.log(object); });

 /* Armazenando e recuperando Listas */
 client.rpush(['Pacheco', 'AngularJS', 'BackboneJS'], function(erro, callBack){ console.log(callBack); }); 
 client.lrange('Pacheco', 0, -1, function(err, reply) { console.log(reply)});

/* Limpando chaves */
 client.del('tags', function(err, reply) { console.log( "Quantidade de chaves: " + reply); });

 /* Conjuntos */
 client.sadd(['tags', '.NET', 'javascript', 'JAVA'], function(err, reply) { console.log(reply); }); 
 client.smembers('tags', function(err, reply) { console.log(reply); }); 

 /* Incrementar e Decrementar */
 client.set('key1', 10, function() { client.incr('key1', function(err, reply) { console.log(reply); }); }); 
 client.set('key1', 10, function() { client.decr('key1', function(err, reply) { console.log(reply); }); }); 

 client.set('key1', 10, function() { client.incrby('key1', 50, function(err, reply) { console.log(reply); }); }); 
 client.set('key1', 10, function() { client.decrby('key1', 50, function(err, reply) { console.log(reply); }); });

 /* Expirando uma chave em segundos */
 client.set('key1', 'val1'); client.expire('key1', 30); 
