// @ts-nocheck
/*global QUnit*/
sap.ui.define([
    "logaligroup/SAPUI5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.model.resource.ResourceModel } ResourceModel
     */
    function (InvoicesFormatter, ResourceModel) {
       "use strict";
        QUnit.module("Invoices Status", {
            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("logaligroup/SAPUI5") + "/i18n/i18n.properties"
                });
            },
            afterEach: function () {
                this._oResourceModel.destroy();
            }
        })

        QUnit.test("Should return the invoice status", function(assert){
            let oModel = this.stub();
            oModel.withArgs("i18n").returns(this._oResourceModel);

            let oViewStub = {
                getModel: oModel
            };

            let oControllerStub = {
                getView: this.stub().returns(oViewStub)
            };

            let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

            //Asserts

            assert.strictEqual(fnIsolatedFormatter("A"), "New", "the invoice status for A is correct");
            assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "the invoice status for B is correct");
            assert.strictEqual(fnIsolatedFormatter("C"), "Done", "the invoice status for C is correct");
        });
    })