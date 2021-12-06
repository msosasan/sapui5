sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.util.MockServer} MockServer
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.base.util.UriParameters} UriParameters
     * @param {typeof sap.base.Log} Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict"
        let oMockServer,
            _sAppPath = "logaligroup/SAPUI5",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";
        let oMockServerInterface = {
            /**
             * Initializes the mock server asynchronously
             * @protected
             * @param {Object} oOptionsParameter 
             * @returns{Promise} a promise that is resolve when teh mock server has been started
             */
            init: function (oOptionsParameter) {
                let oOptions = oOptionsParameter || {};
                return new Promise(function (fnResolve, fnReject) {
                    let sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);
                    oManifestModel.attachRequestCompleted(function () {
                        let oUriParameters = new UriParameters(window.location.href);
                        //parse manifest for local metadata URI
                        let sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        let oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        let sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.setting.localUri);
                        let sMockServerUrl = oMainDataSource.uri && new URIError(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                        //create or stop mock server instance
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            })
                        } else {
                            oMockServer.stop
                        }
                        //configure mockerver
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptionsParameter.delay || oUriParameters.get("serverDelay") || 500),

                        });
                        //simulate mock data
                        oMockServer.simulate(sMetadataUrl, {
                            sMockDataBaseUrl: sJsonFilesUrl,
                            bGeneratingMissingMockData: true
                        });

                        let aRequests = oMockServer.getRequests();
                        let fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function (oXnr) {
                                oXnr.respond(iErrCode, { "Content-Type": "text/plain; charset=utf-8", sMessage });
                            }
                        }
                        //simulate Metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequests.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexOf("$metadata") > -1) {
                                    fnResponse.response(500, "Metadata Error", aEntry)
                                }

                            });
                        }
                        //simulate requests errors
                        let sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        let iErrorCode = sErrorParam === "badRequest" ? "400" : "500";
                        if (sErrorParam) {
                            aRequests.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            })
                        }
                        //set requests and start the server
                        oMockServer.setRequests(aRequests);
                        oMockServer.start();
                        Log.info("Running app with mockData");
                        fnResolve();
                    });

                    oManifestModel.attachRequestFailed( function() {
                        let sError = "failed to upload the application manifest";
                        Log.error(sError);
                        fnReject( new Error(sError));
                    })
                });
            }
        };
        return oMockServerInterface;
    })