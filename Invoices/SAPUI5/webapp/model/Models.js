sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
  /**
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 */
function (JSONModel){
    "use strict";
    return {
        createRecipient: function() {
             let oData ={
                recipient: {
                    name: "World",
                }
            };
           return  new JSONModel(oData);
        }
    }
});