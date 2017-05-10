sap.ui.jsview("zui5_portal.NotificationBar", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_portal.NotificationBar
	*/ 
	getControllerName : function() {
		return "zui5_portal.NotificationBar";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_portal.NotificationBar
	*/ 
	createContent : function(oController) {

		var oMessageNotifier = new sap.ui.ux3.Notifier("MessageNotifier",{
			title : "Messages"
		});
		
		var oNotiBar = new sap.ui.ux3.NotificationBar("Notifier",{
			visibleStatus : "Default"
		});
		
		oNotiBar.addStyleClass("slimNotificationBar");
		oNotiBar.setMessageNotifier(oMessageNotifier);
		return oNotiBar;
		
	}

});
