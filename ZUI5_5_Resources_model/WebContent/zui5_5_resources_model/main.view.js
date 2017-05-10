sap.ui.jsview("zui5_5_resources_model.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_5_resources_model.main
	*/ 
	getControllerName : function() {
		return "zui5_5_resources_model.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_5_resources_model.main
	*/ 
	createContent : function(oController) {
		
//		var sLangu = function(){
//			var sPageURL = window.location.search.substring(1);
//			var sURLVariables = sPageURL.split('&');
//			
//			for(var i = 0 ; i < sURLVariables.length ; i++)
//			{
//				
//				var sParameterName = sURLVariables[i].split('=');
//				
//				if(sParameterName[0] == 'sap-ui-language'){
//					
//					return sParameterName[1];
//				}
//				
//			}
//		};
		
		
		// you can take sLangu values from sap.ui.core this way 
		
		var sLangu = sap.ui.getCore().getConfiguration().getLanguage();
		
		// This above function determines the language of sap backend system's language properly and
		// you can use it when you do internalization functions where they use.
		
		this.oLangu = new sap.ui.model.resource.ResourceModel(
				{bundleUrl : "translations/translation.properties",
				"bundleLocale":sLangu()});
		
		sap.ui.getCore().setModel(this.oLangu,"i18n");
		
		//	Layout
		
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
				layoutFixed : true,
				width: '400px',
				columns : 4 ,
				widths : ['200px', '200px',] 
			});
		
		var oText = new sap.ui.commons.TextView({
				text : "{i18n>BUKRS}"
	});	
		
		var oText2 = new sap.ui.commons.TextView({
			text : "{i18n>MD}"
	});	
		
		oMatrix.createRow(oText , oText2);
		
		return oMatrix;
			
	}

});
