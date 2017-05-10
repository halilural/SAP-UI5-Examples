jQuery.sap.declare("zui5_portal.TimePicker");
jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.require("sap.ui.commons.ComboBox");

// Timepicker Control.
sap.ui.core.Control.extend("zui5_portal.TimePicker", {
				metadata : {
					properties : {
						"time" : "string"	
					},
					aggregations : {
						"_hour" : {
							type : "sap.ui.commons.ComboBox",
							multiple : false,
							visibility : "hidden"
						},
						"_minutes" : {
							type : "sap.ui.commons.ComboBox",
							multiple : false,
							visibility : "hidden"
						}
					},
					events : {
						"submit" : {}
					}
				},
				init : function() {
					that = this;
					this.setProperty("time", "0000");
					this.setAggregation("_hour", new sap.ui.commons.ComboBox({
						width:"85px",
						items:[
						       	new sap.ui.core.ListItem({text:"00"}),
						       	new sap.ui.core.ListItem({text:"01"}),
						       	new sap.ui.core.ListItem({text:"02"}),
						       	new sap.ui.core.ListItem({text:"03"}),
						       	new sap.ui.core.ListItem({text:"04"}),
						       	new sap.ui.core.ListItem({text:"05"}),
						       	new sap.ui.core.ListItem({text:"06"}),
						       	new sap.ui.core.ListItem({text:"07"}),
						       	new sap.ui.core.ListItem({text:"08"}),
						       	new sap.ui.core.ListItem({text:"09"}),
						       	new sap.ui.core.ListItem({text:"10"}),
						       	new sap.ui.core.ListItem({text:"11"}),
						       	new sap.ui.core.ListItem({text:"12"}),
						       	new sap.ui.core.ListItem({text:"13"}),
						       	new sap.ui.core.ListItem({text:"14"}),
						       	new sap.ui.core.ListItem({text:"15"}),
						       	new sap.ui.core.ListItem({text:"16"}),
						       	new sap.ui.core.ListItem({text:"17"}),
						       	new sap.ui.core.ListItem({text:"18"}),
						    	new sap.ui.core.ListItem({text:"19"}),
						       	new sap.ui.core.ListItem({text:"20"}),
						       	new sap.ui.core.ListItem({text:"21"}),
						       	new sap.ui.core.ListItem({text:"22"}),
						       	new sap.ui.core.ListItem({text:"23"})
				       	],
				       	value:"00",
				       	change: function(oEvent){
				       		var sTime = this.oParent.getProperty("time");;
				       		var sMinutes = sTime.substr(2, 2);
				       		var sHours = oEvent.getParameters().newValue;
				       		this.oParent.setProperty("time",sHours+sMinutes,true);
				       	}
					}));
					this.setAggregation("_minutes", new sap.ui.commons.ComboBox({
						width:"85px",
						items:[
				       	new sap.ui.core.ListItem({text:"00"}),
				       	new sap.ui.core.ListItem({text:"15"}),
				       	new sap.ui.core.ListItem({text:"30"}),
				       	new sap.ui.core.ListItem({text:"45"})
				       	],
				       	value:"00",
				       	change: function(oEvent){
				       		var sTime = this.oParent.getProperty("time");
				       		var sHours = sTime.substr(0, 2);
				       		var sMinutes = oEvent.getParameters().newValue;
				       		this.oParent.setProperty("time",sHours+sMinutes,true);
				       	}	
						
					}));
				},
				renderer : function(oRm, oControl) {
					oRm.write("<div");
					oRm.addClass("timePicker");
					oRm.writeClasses();
					oRm.writeControlData(oControl);
					if (oControl.getTooltip_AsString()) {
						oRm.writeAttributeEscaped("title", oControl.getTooltip_AsString());
					}
					oRm.write(">");
					oRm.write("<div>");
					oRm.renderControl(oControl.getAggregation("_hour"));
					oRm.write(":");
					oRm.renderControl(oControl.getAggregation("_minutes"));
					oRm.write("</div>");
					oRm.write("</div>");
				}
			});