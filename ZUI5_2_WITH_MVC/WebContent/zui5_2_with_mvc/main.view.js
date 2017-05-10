sap.ui.jsview("zui5_2_with_mvc.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_2_with_mvc.main
	*/ 
	getControllerName : function() {
		return "zui5_2_with_mvc.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_2_with_mvc.main
	*/ 
	createContent : function(oController) {
		
//		var oButton = new sap.ui.commons.Button();
//		oButton.setText("Click me ");
//		
//		oButton.attachPress(oController.handleButtonClicked);
		
//		return oButton;
		
		var oTable = new sap.ui.table.Table();
		
		
		return oTable;
	}

});
