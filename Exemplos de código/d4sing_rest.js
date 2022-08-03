var tbgD4Sign = Class.create();
tbgD4Sign.prototype = {
    initialize: function () {},

    sendD4File: function (current) {

        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('post');


            if (current.assignment_group.u_safe_id.nil()) {
                gs.addErrorMessage(gs.getMessage('The department safe is not correctly setup, please contact support.'));
                return;
            } else {
                var safe = current.assignment_group.u_safe_id + '';
                //gs.getProperty('x_tbgb_documentos.D4signSafe');
            }



            request.setEndpoint(gs.getProperty('x_tbgb_documentos.D4signHost') + '/documents/' + safe + '/uploadbinary');

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('tokenAPI', gs.getProperty('x_tbgb_documentos.D4SignTokenAPI'));
            request.setRequestHeader('cryptKey', gs.getProperty('x_tbgb_documentos.D4signCryptKey'));

            var file = {
                name: current.number.toString().replace(/\s/g, '').replace(/\//g, '-') + '.pdf',
                mime_type: 'application/pdf',
                base64_binary_file: ''
            };


            var imageEncoded = '';
            var grSysAttachment = new GlideRecord('sys_attachment');
            grSysAttachment.addQuery('table_sys_id', current.sys_id);
            grSysAttachment.addQuery('file_name', file.name);
            grSysAttachment.query();
            if (grSysAttachment.next()) {
                var imageAttachment = grSysAttachment;
                var gsaAttachment = new GlideSysAttachment();
                var base64Image = new GlideStringUtil.base64Encode(
                    gsaAttachment.getBytes(imageAttachment)
                );
                if (!gs.nil(imageAttachment)) {
                    imageEncoded =
                        'data:' + grSysAttachment.content_type + ';base64,' + base64Image;
                }
                file.base64_binary_file = base64Image;
            }


            var body = JSON.stringify(file);
            //gs.addInfoMessage('>>> ' + request.getEndpoint());
            request.setRequestBody(body);

            response = request.execute();
            httpResponseStatus = response.getStatusCode();
            jsonResponse = response.getBody();
            responseObjJ = JSON.parse(jsonResponse);

            if (httpResponseStatus != 200) {
                gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addErrorMessage(responseObjJ.message);
            } else {
                current.d4sign_uuid = responseObjJ.uuid;
                current.update();
            }

        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
        }

        return httpResponseStatus;

    },

    sendD4Signee: function (current) {
        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('post');

            request.setEndpoint(gs.getProperty('x_tbgb_documentos.D4signHost') + '/documents/' + current.d4sign_uuid + '/createlist');

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('tokenAPI', gs.getProperty('x_tbgb_documentos.D4SignTokenAPI'));
            request.setRequestHeader('cryptKey', gs.getProperty('x_tbgb_documentos.D4signCryptKey'));

            var data = {
                "signers": [{
                    "email": current.d4sign_signee.email + '',
                    "act": "1",
                    "foreign": "0",
                    "certificadoicpbr": "0"
                }]
            };




            var body = JSON.stringify(data);
            request.setRequestBody(body);

            response = request.execute();
            httpResponseStatus = response.getStatusCode();
            jsonResponse = response.getBody();
            responseObjJ = JSON.parse(jsonResponse);

            if (httpResponseStatus != 200) {
                gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addErrorMessage(responseObjJ.message);
            }


        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
        }

        return httpResponseStatus;

    },

    sendD4ToSign: function (current) {
        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('post');

            request.setEndpoint(gs.getProperty('x_tbgb_documentos.D4signHost') + '/documents/' + current.d4sign_uuid + '/sendtosigner');

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('tokenAPI', gs.getProperty('x_tbgb_documentos.D4SignTokenAPI'));
            request.setRequestHeader('cryptKey', gs.getProperty('x_tbgb_documentos.D4signCryptKey'));

            var data = {
                "message": "TBG CED",
                "skip_email": "0",
                "workflow": "0"
            };




            var body = JSON.stringify(data);
            request.setRequestBody(body);

            response = request.execute();
            httpResponseStatus = response.getStatusCode();
            jsonResponse = response.getBody();
            responseObjJ = JSON.parse(jsonResponse);

            if (httpResponseStatus != 200) {
                gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addErrorMessage(responseObjJ.message);
            }


        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
        }
        return httpResponseStatus;
    },



    getD4SignStatus: function (current) {

        try {
            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');

            request.setEndpoint(gs.getProperty('x_tbgb_documentos.D4signHost') + '/documents/' + current.d4sign_uuid);

            //request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('tokenAPI', gs.getProperty('x_tbgb_documentos.D4SignTokenAPI'));
            request.setRequestHeader('cryptKey', gs.getProperty('x_tbgb_documentos.D4signCryptKey'));



            response = request.execute();
            httpResponseStatus = response.getStatusCode();
            jsonResponse = response.getBody();
            responseObjJ = JSON.parse(jsonResponse);

            if (httpResponseStatus != 200) {
                gs.addErrorMessage("HTTP response status_code:  " + httpResponseStatus);
                gs.addErrorMessage(responseObjJ.message);
            } else {
                current.setValue('d4sign_state', responseObjJ[0].statusId);
                current.update();
            }


        } catch (ex) {
            var message = ex.getMessage();
            gs.info(message);
        }
        return httpResponseStatus;

    },

    type: 'tbgD4Sign'
};