gs.getUser(); //retorna o objeto user
gs.getUserID();
gs.getUser().getDisplayName(); //??
gs.getUserDisplayName();
gs.hasRole('role');
gs.getSession(); //retorna o objeto session
gs.getSession().isLoggedIn();

//send user messages
gs.addErrorMessage();
gs.addInfoMessage();

//logs
gs.log('String', 'source*');
gs.warn('String', 'source*');
gs.error('String', 'source*');

//translations
gs.getMessage('key');

//get system property - variaveis globais
gs.getProperty('nome');
gs.setProperty('name', 'value');

//check if is empty
gs.nil();

//script action or notification + event registration
gs.eventQueue('srv_201_hello');

gs.generateGUID();

gs.beginningOfLastMonth();

gs.tableExists();

var xmlString = '<root><test>Some data</test><test1>other data</test1></root>';
var json = gs.xmlToJSON(xmlString);
gs.print(json.root.test1);

data.token = $sp.getParameter('guid');