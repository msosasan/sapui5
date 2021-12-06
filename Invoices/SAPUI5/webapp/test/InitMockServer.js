sap.ui.define([
"../localService/mockserver",
"sap/m/MessageBox"
], 
/**
 * @param {typeof sap.m.MessageBox} MessageBox
 */
function(mockserver, MessageBox) {
    "use strict"
    let aMockServers = [];
//initialize mock server
aMockServers.push(mockserver.init());
Promise.all(aMockServers).catch( function (oError) {
    MessageBox.error(oError.message);
}).finally( function(){
    sap.ui.require(["module:sap/ui/core/ComponentSupport"])
})

})