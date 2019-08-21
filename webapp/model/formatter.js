sap.ui.define([], function () {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * @public
		 * Determines a delivery method based on the weight of a product
		 * @param {string} sMeasure the measure of the weight to be formatted
		 * @param {integer} iWeight the weight to be formatted
		 * @returns {string} sValue the delivery method
		 */
		delivery: function (sMeasure, iWeight) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle(),
				sResult = "",
				vWeight;
			vWeight = iWeight;
			if (sMeasure === "G") {
				vWeight = vWeight / 1000;
			}
			if (vWeight < 0.5) {
				sResult = oResourceBundle.getText("formatterMailDelivery");
			} else if (vWeight < 5) {
				sResult = oResourceBundle.getText("formatterParcelDelivery");
			} else {
				sResult = oResourceBundle.getText("formatterCarrierDelivery");
			}

			return sResult;
		},

		/**
		 * Returns an URL to map image from HERE Maps
		 * If no parameters are provided then a generic URL to 
		 * world map is returned instead
		 * jQuery.sap.encodeURL raises an exception when called 
		 * on null value therefore the input parameters are checked
		 * prior to being converted
		 * @public
		 * @param {string} sStreet street from address data
		 * @param {string} sBuilding building number from address data
		 * @param {string} sCity city name from address data
		 * @param {string} sPostalCode postal code from address data
		 * @param {string} sCountry country name from address data
		 * @returns {string} URL to map image is returned
		 */
		formatMapURL: function (sStreet, sBuilding, sCity, sPostalCode, sCountry) {
			var sHTTP = "https:",
				sURL = "//image.maps.api.here.com/mia/1.6/mapview?",
				vZoom = 16,
				vWidth = 640,
				vHeight = 480,
				sAppID = "dsVy9baZaFQuH4m2rENo",
				sAppCode = "poWeZ2bF--W7VPwTdIJJNg",
				sParam1,
				sParam2,
				sParam3,
				sParam4,
				sParam5;

			sParam1 = (sStreet === null) ? "" : jQuery.sap.encodeURL(sStreet);
			sParam2 = (sBuilding === null) ? "" : jQuery.sap.encodeURL(sBuilding);
			sParam3 = (sCity === null) ? "" : jQuery.sap.encodeURL(sCity);
			sParam4 = (sPostalCode === null) ? "" : jQuery.sap.encodeURL(sPostalCode);
			sParam5 = (sCountry === null) ? "" : jQuery.sap.encodeURL(sCountry);

            if (sParam2 !== "") {
            	sParam1 = jQuery.sap.encodeURL(sStreet + " " + sBuilding);
            }
            if (sParam4 !== "") {
            	sParam3 = jQuery.sap.encodeURL(sPostalCode + " " + sCity);
            }

			if (sParam1 === "" && sParam2 === "" && sParam3 === "") {
				return sHTTP + sURL +
					"app_id=" + sAppID +
					"&app_code=" + sAppCode +
					"&w=" + vWidth +
					"&h=" + vHeight +
					"z=1";
			} else {
				return sHTTP + sURL +
					"app_id=" + sAppID +
					"&app_code=" + sAppCode +
					"&w=" + vWidth +
					"&h=" + vHeight +
					"&i=1&t=6&&pip&z=" + vZoom +
					"&s=" + sParam1 +
					"&ci=" + sParam3 +
					"&co=" + sParam5;
			}
		},
		
		formatInteractiveMap : function (sStreet, sBuilding, sCity, sPostalCode, sCountry) {
			var vHTML1 = "<iframe height='480px' width='640px' marginheight='0' marginwidth='0' frameborder='0' src='",
			    vHTML2 = "'></iframe>",
			    vURL = "./html/map.html",
				sParam1,
				sParam2,
				sParam3,
				sParam4,
				sParam5,
				sFullPath;

			sParam1 = (sStreet === null) ? "" : jQuery.sap.encodeURL(sStreet);
			sParam2 = (sBuilding === null) ? "" : jQuery.sap.encodeURL(sBuilding);
			sParam3 = (sCity === null) ? "" : jQuery.sap.encodeURL(sCity);
			sParam4 = (sPostalCode === null) ? "" : jQuery.sap.encodeURL(sPostalCode);
			sParam5 = (sCountry === null) ? "" : jQuery.sap.encodeURL(sCountry);

            if (sParam2 !== "") {
            	sParam1 = jQuery.sap.encodeURL(sStreet + " " + sBuilding);
            }
            if (sParam4 !== "") {
            	sParam3 = jQuery.sap.encodeURL(sPostalCode + " " + sCity);
            }

			sFullPath = vHTML1 + vURL + 
						"?Street=" + sParam1 + 
						"&City=" + sParam3 + 
						"&Country=" + sParam5 + 
						vHTML2;
			return sFullPath;
		}
	};
});