//client-script

function onLoad() {
  var ga = new GlideAjax('serviceNOwTrainingAjax');
  ga.addParam('sysparm_name', 'sayHello');
  ga.getXML(ajaxProcessorCallback);
  //ga.getXMLAnswer(ajaxProcessorCallback);
}

function ajaxProcessorCallback(response) {
  //se usar ga.getXMLAnswer() a proxima linha não é necessária e já pode usar answer direto
  var answer = response.responseXML.documentElement.getAttribute('answer');
  g_form.setValue('short_description', answer);
}

//ui pages

var checkIncident = setInterval(function () {
  processRequest();
}, 5000);

function processRequest() {
  var ga = new GlideAjax('serviceNOwTrainingAjax');
  ga.addParam('sysparm_name', 'getIncidentStatus');
  ga.addParam('sysparm_incident_number', 'INC0010016');
  ga.getXML(ajaxProcessorIncidentCallback);
}

function ajaxProcessorIncidentCallback(response) {
  var answer = response.responseXML.documentElement.getAttribute('answer');
  console.log('State: ' + answer);
}

//another ui page

var ga = new GlideAjax('serviceNOwTrainingAjax');
ga.addParam('sysparm_name', 'getLatestIncidents');
ga.addParam('sysparm_limit', '10');
ga.getXML(ajaxProcessorLatestIncidentsCallback);

function ajaxProcessorLatestIncidentsCallback(response) {
  console.log('Response Payload: ' + response);
  var answer = response.responseXML.documentElement.getAttribute('answer');
  console.log('Latests: ' + answer);
  var json = JSON.parse(answer);
  console.log('JSON: ' + json);
  console.log(json[0].shortDescription);
}

//script include
//variable from the client side start with sysparm_qqcoisa
//sysparm_name metodo que sera chamado

var serviceNOwTrainingAjax = Class.create();
serviceNOwTrainingAjax.prototype = Oject.ExtendsObject(AbstractAjaxProcessor, {
  getIncidentStatus: function () {
    var incidentNumber = this.getParameter('sysparm_incident_number');
    if (!gs.nil(incidentNumber)) {
      var incidentGR = new GlideRecord('incident');
      incidentGR.get(incidentNumber);
      return incidentGR.state.getDisplayValue();
    } else {
      return 'no incident was found';
    }
  },

  getLatestIncidents: function () {
    var incidents = [];
    var limit = parseInt(this.getParameter('sysparm_limit'));
    if (!gs.nil(limit) && typeof limit == 'number') {
      var incidentGR = new GlideRecord('incident');
      incidentGR.orderByDesc('sys_created_on');
      incidentGR.setLimit(limit);
      incidentGR.query();
      while (incidentGR.next()) {
        var record = {};
        record.number = incidentGR.number.getDisplayValue();
        record.sysID = incidentGR.sys_id.getDisplayValue();
        record.shortDescription = incidentGR.short_description.getDisplayValue();
        incidents.push(record);
      }

      return JSON.stringify(incidents);
    } else {
      return 'no incident was found';
    }
  },

  sayHello: function () {
    return 'Hello API!';
  },
  type: 'serviceNOwTrainingAjax',
});
