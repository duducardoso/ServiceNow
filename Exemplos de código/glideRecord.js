var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', 1).addOrCondition('priority', 2);
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    'Priority incident ' +
      incidentGR.number +
      ' : ' +
      incidentGR.priority.getDisplayValue()
  );
  gs.print(incidentGR.getEncodedQuery()); //mostra a query utilizada
}

var incidentGR = new GlideRecord('incident');
incidentGR.get('ef43c6d40a0a0b5700c77f9bf387afe3');
gs.print(
  'Priority incident ' +
    incidentGR.number +
    ' : ' +
    incidentGR.priority.getDisplayValue()
);

var incidentGR = new GlideRecord('incident');
incidentGR.get('number', 'INC0000060');
gs.print(
  'Priority incident ' +
    incidentGR.number +
    ' : ' +
    incidentGR.priority.getDisplayValue()
);

var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery(
  'category=inquiry^active=true^assigned_to=681b365ec0a80164000fb0b05854a0cd'
);
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    'Priority incident ' +
      incidentGR.number +
      ' : ' +
      incidentGR.priority.getDisplayValue()
  );
}

var newIncident = new GlideRecord('incident');
newIncident.newRecord();
newIncident.short_description = 'this was also inserted from code';
newIncident.impact = 1;
newIncident.urgency = 2;
var newIncidentSysID = newIncident.insert();
gs.print(newIncidentSysID);

var newIncidentsID = [];
var counter = 0;
var newIncident = new GlideRecord('incident');
while (counter < 5) {
  counter++;
  newIncident.newRecord();
  newIncident.short_description = 'Incident #' + counter;
  newIncident.impact = 3;
  newIncident.urgency = 2;
  newIncidentsID.push(newIncident.insert());
}
gs.print(newIncidentsID);

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('short_description', 'Incident #3');
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    'Priority incident ' +
      incidentGR.number +
      ' : ' +
      incidentGR.short_description
  );
  incidentGR.deleteRecord();
}

var incidentGR = new GlideRecord('incident');
incidentGR.orderBy('opened_at');
incidentGR.query();
gs.print(incidentGR.getRowCount());
while (incidentGR.next()) {
  gs.print(
    'Incident ' + incidentGR.number + ' : ' + incidentGR.short_description
  );
}

var incidentGR = new GlideRecord('incident');
incidentGR.orderByDesc('opened_at');
incidentGR.setLimit(10);
incidentGR.query();
gs.print(incidentGR.getRowCount());
while (incidentGR.next()) {
  gs.print(
    'Incident ' + incidentGR.number + ' : ' + incidentGR.short_description
  );
  gs.print(incidentGR.getLink());
}

var incidentGR = new GlideRecord('incident');
incidentGR.query();
if (
  incidentGR.canCreate() &&
  incidentGR.canRead() &&
  incidentGR.canWrite() &&
  incidentGR.canDelete()
) {
  gs.print('Have all permissions');
}

var incidentGR = new GlideRecord('incident');
incidentGR.query();
while (incidentGR.hasNext()) {
  var row = incidentGR.next();
  gs.print(row);
  gs.print(
    'Incident ' + incidentGR.number + ' : ' + incidentGR.short_description
  );
}

var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery('short_descriptionLIKEIncident #');
incidentGR.query();
incidentGR.deleteMultiple();

var incidentGR = new GlideRecord('incident');
incidentGR.get('number', 'INC0010014');
gs.print(
  'Priority incident ' +
    incidentGR.number +
    ' : ' +
    incidentGR.priority.getDisplayValue() +
    ' : ' +
    incidentGR.short_description
);
incidentGR.urgency = 3;
incidentGR.short_description = 'Incident #7';
incidentGR.update();
incidentGR.get('number', 'INC0010014');
gs.print(
  'Priority incident ' +
    incidentGR.number +
    ' : ' +
    incidentGR.priority.getDisplayValue() +
    ' : ' +
    incidentGR.short_description
);

var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery(
  'category=inquiry^active=true^assigned_to=681b365ec0a80164000fb0b05854a0cd'
);
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    'Priority incident ' +
      incidentGR.number +
      ' : ' +
      incidentGR.urgency.getDisplayValue()
  );
  incidentGR.urgency = 1;
  incidentGR.update();
}

incidentGR.addNullQuery('short_description');
incidentGR.addNotNullQuery('short_description');
var incidentGR = new GlideRecordSecure('incident');

var incidentGR = new GlideAggregate('incident');
//count, min, max, sum, avg
incidentGR.addAggregate('COUNT');
incidentGR.query();
var contagem = 0;
if (incidentGR.next()) {
  contagem = incidentGR.getAggregate('COUNT');
}
gs.print(contagem);
