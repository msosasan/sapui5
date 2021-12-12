// @ts-nocheck
/* Global QUnit */
QUnit.config.autostart = false;
sap.ui.getCore().attachInit(function () {
    "use strict";
    sap.ui.require([
        "logaligroup/SAPUI5/test/Integration/NavigationJourney"
    ], function () {
        QUnit.start();
    })

});