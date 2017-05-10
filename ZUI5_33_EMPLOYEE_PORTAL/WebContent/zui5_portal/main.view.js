sap.ui.jsview("zui5_portal.main", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf zui5_portal.main
	 */
	getControllerName : function() {
		return "zui5_portal.main";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf zui5_portal.main
	 */
	createContent : function(oController) {

		var oMasterShell = new sap.ui.ux3.Shell("MainShell", {
			appTitle : "Employee Portal",
			showLogoutButton : true,
			showSearchTool : true,
			showInspectorTool : false,
			showFeederTool : false,
			designType : sap.ui.ux3.ShellDesignType.Crystal,

			headerItems : [ 
			        new sap.ui.commons.Button({
				      text : "My Data",
				      press : oController.headerItemSelected
			    }) ],
			// Content
			content : [ new sap.ui.view({
				id       : "MyTask",
				viewName : "zui5_portal.MyTask",
				type     : sap.ui.core.mvc.ViewType.JS
			}), sap.ui.view({
				id       : "NotificationBar",
				viewName : "zui5_portal.NotificationBar",
				type     : sap.ui.core.mvc.ViewType.JS
			}) ],
			worksetItems : [ 
			    new sap.ui.ux3.NavigationItem("LP", {
				key  : "MyTask",
				text : "My Tasks"
			}), new sap.ui.ux3.NavigationItem("TM", {
				key  : "TimeSheet",
				text : "Time Sheet"
			}), new sap.ui.ux3.NavigationItem("LR", {
				key  : "LeaveRequest",
				text : "Leave Request"
			}), new sap.ui.ux3.NavigationItem("ES", {
				key  : "EmployeeSearch",
				text : "Employee Directory"
			}), new sap.ui.ux3.NavigationItem("TP", {
				key  : "TripPlanner",
				text : "Travel Planning"
			})
			],
			worksetItemSelected : oController.worksetItemSelected,
			search: [oController.search, oController]
		});

		return oMasterShell;
	}

});
