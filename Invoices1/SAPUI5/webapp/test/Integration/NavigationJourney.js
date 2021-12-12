// @ts-nocheck
/*global QUnit, opaTest*/
sap.ui.define([
    "logaligroup/SAPUI5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel",
],
    /**
     * @param { typeof sap.ui.test.opaQunit } opaQunit
     */
    function (mockserver, opaQunit) {
        QUnit.module("Navigation");
        opaQunit("Shoul open the hell dialog", function (Given, When, Then) {
            //initialize the mock server
            mockserver.init();
            //Arragements
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "logaligroup.SAPUI5"
                }
            });
            //Actions
            When.onTheAppPage.iSayHelloDialogButton();
            //assertions
            Then.onTheAppPage.iSeeTheHellodialog();
            //Clean up
            Then.iTeardownMyApp();
        })
    }
)