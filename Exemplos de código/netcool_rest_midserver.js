var EDSNetcoolIntegration = Class.create();
EDSNetcoolIntegration.prototype = {
    initialize: function () {},

    getNetcoolEvents: function () {

        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');

            request.setMIDServer(gs.getProperty('netcoolMidServerName'));

            //authentication type ='basic'/ 'oauth2'
            //request.setAuthenticationProfile('basic', 'netcool');
            request.setBasicAuth(gs.getProperty('netcoolUser'), gs.getProperty('netcoolPassword'));


            //request.setEndpoint(gs.getProperty('netcoolHost') + 'objectserver/restapi/alerts/status');
            request.setEndpoint(gs.getProperty('netcoolHost') + "/objectserver/restapi/alerts/status?filter=((TTNumber!='')AND(LogTicket=0))");

            //request.setRequestHeader('Content-Type', 'application/json');
            //request.setRequestHeader('login', 'root');
            //request.setRequestHeader('password', 'itaipubi');



            var response = request.execute();
            var httpResponseStatus = response.getStatusCode();
            var jsonResponse = response.getBody();
            var responseObjJ = JSON.parse(jsonResponse);


            if (httpResponseStatus == 200) {
                // gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                // gs.addErrorMessage(responseObjJ.rowset.rows[0].Identifier);
                // gs.addErrorMessage(jsonResponse);
                return responseObjJ.rowset.rows;

            } else {
                gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addErrorMessage(jsonResponse);

            }


        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
        }
        return httpResponseStatus;

    },

    updateNetcoolEvent: function (current) {
        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('PATCH');

            request.setMIDServer(gs.getProperty('netcoolMidServerName'));

            //authentication type ='basic'/ 'oauth2'
            //request.setAuthenticationProfile('basic', 'netcool');
            request.setBasicAuth(gs.getProperty('netcoolUser'), gs.getProperty('netcoolPassword'));


            //request.setEndpoint(gs.getProperty('netcoolHost') + 'objectserver/restapi/alerts/status');
            request.setEndpoint(gs.getProperty('netcoolHost') + "/objectserver/restapi/alerts/status/kf/" + current.number + '%3A' + current.u_servername);

            request.setRequestHeader('Content-Type', 'application/json');
            //request.setRequestHeader('login', 'root');
            //request.setRequestHeader('password', 'itaipubi');

            var ServiceNowTTOwner = current.parent.assigned_to.user_name.toString().split('@');

            var payload = {
                'rowset': {
                    'coldesc': [{
                            'name': 'ServiceNowTTGroup',
                            'type': 'string',
                            'size': 64
                        }, {
                            'name': 'ServiceNowTTOwner',
                            'type': 'string',
                            'size': 64
                        },
                        {
                            'name': 'ServiceNowState',
                            'type': 'integer',
                            'size': 4
                        }, {
                            'name': 'ServiceNowSysId',
                            'type': 'string',
                            'size': 32
                        }
                    ],
                    'rows': [{
                        'ServiceNowTTGroup': current.parent.assignment_group.name + '',
                        'ServiceNowTTOwner': ServiceNowTTOwner[0] + '',
                        'ServiceNowState': parseInt(current.parent.state + ''),
                        'ServiceNowSysId': current.sys_id + ''

                    }]
                }
            };

            var body = JSON.stringify(payload);
            //gs.addInfoMessage(body);
            request.setRequestBody(body);

            var response = request.execute();
            var httpResponseStatus = response.getStatusCode();
            var jsonResponse = response.getBody();


            if (httpResponseStatus == 200) {
                // gs.addInfoMessage("HTTP response status_code:  " + httpResponseStatus);
                // gs.addInfoMessage(jsonResponse);

            } else {
                gs.addInfoMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addInfoMessage(jsonResponse);

            }


        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
            gs.addInfoMessage(message);
        }
        return httpResponseStatus;


    },


    type: 'EDSNetcoolIntegration'
};