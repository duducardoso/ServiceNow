//GlideDateTime
//server-side

var gdt = GlideDateTime();
var gdt = GlideDateTime('2020-04-17 14:02:30');

gdt.addDaysUTC(3);
gdt.addMonthsUTC(3);
gdt.addYearsUTC(3);

var start = GlideDateTime('2020-04-17 14:02:30');
var end = GlideDateTime('2020-05-17 14:07:30');
var diff = GlideDateTime.subtract(start, end);
getSelection.print(diff.getDisplayVAlue());

//compara a nivel de ms
start.before(end);
end.after(start);
//compareTo
// 0 dates are equal
// 1 object date is after comparedTo
// -1 object date is before comparedTo
end.compareTo(start); //1
start.compareTo(end); //-1

//GlideElement
gr.getDisplayValue();
kbArticleGR.text.getHTMLValue();
//usados para campos do tipo journal
//-1 = todas as entradas
//1 = mais recente
incidentGR.comments.getJournalEntry(-1);

//nil se está vazio
incidentGR.short_descriptio.nil();

//XMLDocument2 obj js para parse e extract XML from XML String
var xmlDocument = new XMLDocument2();
xmlDocument.parseXML(xmlStrig);
xmlDocument.createElement('pet');
xmlDocument.createElementWithTextValue('Owner', 'Cris');
gs.print(xmlDocument.getNodeText('//active'));
xmlDocument.getFirstNode('/xml/incident');

//GlideModal para popups e questoes
//Workflow para lidar com workflows
//GlideSysAttachement
//RESTMessageV2
//RESTResponseV2
//SOAPMessageV2
//SOAPResponseV2
//GlideDuration duração

//udocumented PAI
/*
JSUtils*
Workflow
DiscoveryCMDBUtil
AssetandCI
CMDBItem
SNC
GlideStringUtil
Cart
SPCart

olhar nos scrip includes
*/
//servicenowguru.com
//servicenowelite.com

//My Own API - script include
var cedaeHelper = Class.create();
cedaeHelper.prototype = {
  initialize: function () {},

  isInArray: function (vetor, item) {
    //var vetor local = vetor || ['A', 'B'];
    var count = vetor.length;
    for (var i = 0; i < count; i++) {
      if (vetor[i] === item) {
        return true;
      }
    }
    return false;
  },

  type: 'cedaeHelper',
};

var cedaeHelp = new cedaeHelper().isInArray(vetor, item);
//ou
var cedaeHelp = new cedaeHelper();
cedaeHelp.isInArray(vetor, item);

//for debugging
//script debugger
//session debug

//cache.do limpa o cache do SN
//stats.do
//show xml para ver os nomes dos campos
//reddit.com/r/servicenow

//ver as propriedades de um objeto
for (property in obj) {
  gs.log(property + ':' + obj[property]);
}