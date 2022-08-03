//https://developer.servicenow.com/app.do#!/api_doc?v=orlando&id=c_RESTMessageV2API
// Create an empty RESTMessageV2 object
var getQuote = new sn_ws.RESTMessageV2();
// Set the endpoint
getQuote.setEndpoint('https://cloud.iexapis.com/v1/stock/${symbol}/quote');
// Set the HTTP method (get, post, put, patch, delete)
getQuote.setHttpMethod('get');
// Set HTTP Query Parameters
getQuote.setQueryParameter('displayPercent', 'true');
getQuote.setQueryParameter('token', 'INSERT_TOKEN_HERE');
// Set values for endpoint variables
getQuote.setStringParameterNoEscape('symbol', current.short_description);
