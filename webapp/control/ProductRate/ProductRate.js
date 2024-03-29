sap.ui.define(["sap/ui/core/Control",
			   "sap/m/RatingIndicator",
			   "sap/m/Button"], 
function(Control, RatingIndicator, Button) {
	"use strict";
	return Control.extend("opensap.manageproducts.ManageProduct_w3.control.ProductRate", {
		metadata : {
			properties : {
				value : "float",
				defaultValue : 0
			},
			aggregations : {
				_button: { type : "sap.m.Button", visibility : "hidden", multiple : false },
				_rating: { type : "sap.m.RatingIndicator", visibility : "hidden", multiple : false }
			},
			events : {
				valueSubmit : {
					parameters : {
						value : {type : "float"}
					}
				}
			}
		},

		init : function() {
			
			this.setAggregation("_rating", new RatingIndicator({
				value : this.getValue(),
				maxValue : 5,
				liveChange : this._onRate.bind(this)
			}).addStyleClass("sapUiTinyMarginEnd"));
			
			this.setAggregation("_button", new Button({
				text : "{i18n>productRatingButtonText}",
				press : this._onSubmit.bind(this),
				enabled : false }));
		},
		
		_onSubmit : function() {
			var vValue = this.getValue();
			
			this.fireEvent("valueSubmit", { value : vValue });
			this.getAggregation("_button").setEnabled(false);
		},
		
		_onRate : function(oEvent) {
			this.setValue(oEvent.getParameter("value"));
			this.getAggregation("_button").setEnabled(true);
		},
		
		renderer : function(oRm, oControl) {
			
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("sapUiSmallMarginBeginEnd");
			oRm.writeClasses();
			oRm.write(">");
			
			oRm.renderControl(oControl.getAggregation("_rating"));
			
			oRm.renderControl(oControl.getAggregation("_button"));
			
			oRm.write("</div>");
			
		}
	});
});