sap.ui.controller("zui5_portal.main", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf zui5_portal.main
	 */
	 // onInit: function() {
     //
	 // },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf zui5_portal.main
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf zui5_portal.main
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf zui5_portal.main
	 */
	// onExit: function() {
	//
	// }
	worksetItemSelected : function(oEvent) {
		
		this.removeAllContent();
		// Get key from event object
		var to = oEvent.getParameter("key");
		// Read View
		var oView = sap.ui.getCore().byId(to);
		if (oView == undefined)
			oView = new sap.ui.view({
				id : to,
				viewName : "zui5_portal." + to,
				type : sap.ui.core.mvc.ViewType.JS
			});
		// Set View
		this.addContent(oView);

		// Notification Bar
		var oNoti = sap.ui.getCore().byId("NotificationBar");
		if (oNoti == undefined)
			oNoti = sap.ui.view({
				id : "NotificationBar",
				viewName : "zui5_portal.NotificationBar",
				type : sap.ui.core.mvc.ViewType.JS
			});
		this.addContent(oNoti);
	},

	headerItemSelected : function(oEvent) {

		var oView = sap.ui.getCore().byId("MyData");
		if (oView == undefined)
			var oView = new sap.ui.view({
				id : "MyData",
				viewName : "zui5_portal.MyData",
				type : sap.ui.core.mvc.ViewType.JS
			});

		var oOverlayDialog = new sap.ui.ux3.OverlayDialog({
			width  : "800px",
			height : "500px",
			close: function(){
				oView.destroy();
			}
		});
		oOverlayDialog.addContent(oView);
		oOverlayDialog.open();

		var oNoti = sap.ui.getCore().byId("NotificationBar");
		if (oNoti == undefined)
			oNoti = sap.ui.view({
				id : "NotificationBar",
				viewName : "zui5_portal.NotificationBar",
				type : sap.ui.core.mvc.ViewType.JS
			});
		this.oParent.addContent(oNoti);
	},

	search : function(oEvent, oContext) {
		// Search Function in the Shell Control,
		// go to employee directory

		var oSource = oEvent.getSource();
		oSource.setSelectedWorksetItem("ES");
		oSource.removeAllContent();
		var to = "EmployeeSearch";
		var oView = sap.ui.getCore().byId(to);
		if (oView == undefined)
			oView = new sap.ui.view({
				id : to,
				viewName : "zui5_portal." + to,
				type : sap.ui.core.mvc.ViewType.JS
			});
		oSource.addContent(oView);

		// Get search field in employee directory
		var sSearch = oEvent.getSource().getSearchField().getValue();
		sap.ui.getCore().getControl("ES_TFS").setValue(sSearch);
		// Fire Event
		sap.ui.getCore().getControl("ES_TFS").fireLiveChange(sSearch);
	}
});