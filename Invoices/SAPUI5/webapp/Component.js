sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof logaligroup.SAPUI5.model.Models} UIComponent
     * @param {typeof sap.ui.model.resource.ResourceModel} UIComponent
     * 
     * */
    function (UIComponent, Models, ResourceModel) {
        return UIComponent.extend("logaligroup.SAPUI5.Component", {
            metadata: {
                manifest: "json"
            },
            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                this.setModel(Models.createRecipient());
                let i18nModel = new ResourceModel({ bundleName: "logaligroup.SAPUI5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");
            }

        })

    });