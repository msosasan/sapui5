sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {typeof sap.m.MessageToast} MessageToast
   */
    function (Controller, MessageToast) {
        "use strict";
        return Controller.extend("logaligroup.SAPUI5.controller.App", {
            onInit: function () {
               
            },
            onShowHello: function () {
                let oBundle = this.getView().getModel("i18n").getResourceBundle();
                let sRecipient =  this.getView().getModel().getProperty("/recipient/name");
                let sMessage = oBundle.getText("helloMessage", [sRecipient]);
                MessageToast.show(sMessage);
            }
        })

    });