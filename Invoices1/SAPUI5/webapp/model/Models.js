//@ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
  /**
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 * @param {typeof sap.ui.Device} JSONModel
 */
function (JSONModel, Device){
    "use strict";
    return {
        createRecipient: function() {
             let oData ={
                recipient: {
                    name: "World",
                }
            };
           return  new JSONModel(oData);
        },

        createDeviceModel: function() {
            let oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        }
    }
});