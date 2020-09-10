const config = require("../config.json");
const mysql = require('mysql');

module.exports = con = mysql.createConnection({host: config.database.ip,
  user: config.database.user,
  password: config.database.pass,
  database: config.database.db});
function handleDisconnect(cnx){
    cnx.on('error', function(err){
      if(!err.fatal) return;
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
      cnx = mysql.createConnection({host: config.dbip,
        user: config.userdb,
        password: config.passwddb,
        database: config.db});
      handleDisconnect(cnx);
      cnx.connect;
    })
}

handleDisconnect(con);

function insertData(table_name, query, queryValues){
  con.query("INSERT INTO `"+ table_name + "` (" + query + ") VALUES (" + queryValues +")", function (err) {
      if (err) return;
    });
}

function sendMessage(table_name, query, queryValues, messageEn, messageFr){
  con.query("INSERT INTO `"+ table_name + "` (" + query + ") VALUES (" + queryValues +")", function (err) {
      if (err) return;
    });
}

function createTable(tablename, query){
  con.query("CREATE TABLE " + tablename + " (" + query + ")", function (err) {
      if (err) return;
      console.log("ONE TABLE CREATED...");
      console.log("TABLE : " + tablename);
      console.log("CONTENANT OF THE TABLE : " + query)
      console.log(" ")
      console.log("=====================================")
    });
}

function deleteTable(tablename){
  con.query('DROP TABLE ' + tablename, function (err) {
      if (err) return;
      console.log("ONE TABLE DELETED...");
      console.log(" ")
      console.log("=====================================")
    });
}
function query(query, fonction){
  con.query(query, fonction);
};
module.exports.createTables = function (tablename, query){
  con.query("CREATE TABLE " + tablename + " (" + query + ")", function (err) {
      if (err) return;
      console.log("ONE TABLE CREATED...");
      console.log("TABLE : " + tablename);
      console.log("CONTENANT OF THE TABLE : " + query)
      console.log(" ")
      console.log("=====================================")
    });
};

module.exports.getPrefix = function (server_id, callback) {
  let query = 'SELECT prefix FROM server_settings WHERE server_id="' + server_id+'"';
  console.log(query)
    con.query(query, (error, results, fields) => {
      if(error) {
          console.log(error);
          return;
      }
      console.log(results)
          callback(null,results[0]);
      });


}

module.exports.getSettings = function (server_id, callback) {
  con.query("SELECT * FROM server_settings WHERE server_id='" + server_id + "'", function (err, results) {
    if (err) throw err;
    if (err) return console.log("You have an error to this code : " + err);
    if(!results) return "not existing";
    return callback(results[0]);
});
}

module.exports.insertJoinServer = function (server_id, logs_id) {
  con.query('INSERT INTO `server_settings`(`server_id`, `prefix`, `logs_id`, `welcome_message`, `goodbye_message`, `language`, `footer`) VALUES ("'+ server_id + '", "?", "'+ logs_id + '", "__Welcome **{server.memberjoin}** ! Have a nice moment here :cool: !__", "__Goodbye **{server.memberleave}**... See ya later to **{server.name}** !__", "en", "VoltBot")', function (err) {
    
    if (err) return console.log("You have an error to this code : " + err);
  });
    }
module.exports.createIfGuildNotExist = function (server_id) {
  con.query(`SELECT * FROM server_settings WHERE server_id = '${server_id}'`, (err, rows) =>{
    if(!rows.length){
  con.query('INSERT INTO `server_settings`(`server_id`, `prefix`, `welcome_message`, `goodbye_message`, `language`, `footer`) VALUES ("'+ server_id + '", "?", "__Welcome **{server.memberjoin}** ! Have a nice moment here :cool: !__", "__Goodbye **{server.memberleave}**... See ya later to **{server.name}** !__", "en", "VoltBot")', function (err) {
    if (err) return console.log("You have an error to this code : " + err);
  });
    }
  });
  con.query(`SELECT * FROM server_exists WHERE server_id = '${server_id}'`, (err, rows) =>{
    if(!rows.length){
  con.query('INSERT INTO `server_exists`(`server_id`) VALUES ("' + server_id + '")', function (err) {
    if (err) return console.log("You have an error to this code : " + err);
  });
    }
  });
    }

    
module.exports.createIfUserNotExist = function (user_id) {
con.query(`SELECT * FROM account_settings WHERE user_id = '${user_id}'`, (err, rows) =>{
  if(!rows.length){con.query('INSERT INTO `account_settings`(`user_id`, `xp`, `levels`) VALUES ("'+ user_id + '", "0", "1")', function (err) {
  if (err) return console.log("You have an error to this code : " + err);
});
}
});
}

    module.exports.insertLeftServer = function (server_id) {
      con.query('DELETE FROM server_exists WHERE server_id="'+ server_id + '"', function (err) {
        
        if (err) return console.log("You have an error to this code : " + err);
      });
        }

module.exports.setup = con.connect(function(err) {
  if (err) return console.log("You have an error to this code : " + err);
  console.log("VoltBot connected to Discord !");
    createTable("server_settings", "server_id VARCHAR(20), prefix VARCHAR(1), logs_id VARCHAR(20), mod_role VARCHAR(20), dj_role VARCHAR(20), welcome VARCHAR(20), welcome_message VARCHAR(255), annoncement VARCHAR(20), sondage VARCHAR(20), goodbye VARCHAR(20), goodbye_message VARCHAR(255), language VARCHAR(5), premium boolean DEFAULT false, footer VARCHAR(255), membercount_id VARCHAR(20), ticket_id VARCHAR(1) DEFAULT 0, raid VARCHAR(1) DEFAULT 0, antispam VARCHAR(1) DEFAULT 0, bot VARCHAR(1) DEFAULT 0, antilink VARCHAR(1) DEFAULT 0, JSONdata VARCHAR(10000) DEFAULT \"{}\"");
    createTable("server_exists", "server_id VARCHAR(20)");
    createTable("server_ban", "server_id VARCHAR(20), ban boolean, reason VARCHAR(255)");
    createTable("server_giveaway", "server_id VARCHAR(20),  winners INT(100), giveaway VARCHAR(255), duration DATETIME");
    createTable("account_settings", "user_id VARCHAR(20), xp VARCHAR(20), levels VARCHAR(20), banned boolean");
  });
