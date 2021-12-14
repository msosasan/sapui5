//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * * @param {typeof sap.ui.core.routing.History} History
   */
    function (Controller, History) {
        "use strict";
        return Controller.extend("logaligroup.SAPUI5.controller.Details", {
            onInit: function () {
               const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this)
            },
            _onObjectMatch: function(oEvent){
                this.byId("rating").reset();
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                })
            },
            onNavBack: function(oEvent) {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
                if(sPreviousHash !== undefined){
                    window.history.go(-1);
                } else {
                    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp",{}, true);
                }
            },
            onRatingChange: function(oEvent){
                const fValue = oEvent.getParameter("value");
                const oResourceBunble = this.getView().getModel("i18n").getResourceBundle();
                sap.m.MessageToast.show(oResourceBunble.getText("ratingConfirmation",[fValue]));

            }
        })

    });