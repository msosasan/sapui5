// @ts-nocheck
/* Global QUnit */
QUnit.config.autostart = false;
sap.ui.getCore().attachInit(function () {
    "use stric";
    sap.ui.require([
"logaligroup/SAPUI5/test/unit/AllTests"
    ], function () {
        QUnit.start();
    })

});