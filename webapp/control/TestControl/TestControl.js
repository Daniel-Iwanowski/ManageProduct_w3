sap.ui.define(["sap/ui/core/Control",
			   "sap/m/Button"], 
function(Control, Button) {
	"use strict";
	return Control.extend("opensap.manageproducts.ManageProduct_w3.control.TestControl", {
		metadata : {
			properties : {
				value : "float",
				defaultValue : 0
			},
			aggregations : {
				_button: { 
					type : "sap.m.Button", 
					visibility : "shown", 
					multiple : false 
			}},
			events : {
				onButton : {
					parameters : {
						value : {type : "float"}
		}}}},

		init : function() {
			this.setValue(0);
			this.setAggregation("_button", new Button({
				text : "{i18n>productTestControlButtonText}",
				icon : "sap-icon://task",
				press : this._onButtonPress.bind(this),
				enabled : true }));
		},
		
		_onButtonPress : function() {
			var vValue = this.getValue();
			vValue = vValue + 1;
			this.setValue( vValue );
			this.fireEvent("onButton", { value : vValue });
		},
		
		renderer : function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("sapUiSmallMarginBeginEnd");
			oRm.writeClasses();
			oRm.write(">");
			oRm.renderControl(oControl.getAggregation("_button"));
			oRm.write("</div>");
		}
	});
});