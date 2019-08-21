/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/Device",
	"./pages/Worklist",
	"./pages/Add",
	"./pages/App"
], function (opaTest, Device) {
	"use strict";

	opaTest("Should see the 'New Product' view after pressing the 'Add' button", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		//Actions
		When.onTheWorklistPage.iWaitUntilTheTableIsLoaded().and.iPressAdd();
		//Assertions
		Then.onTheNewProductPage.iShouldSeeThePage().and.iTeardownMyAppFrame();
	});

});	