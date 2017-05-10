sap.ui.jsview("zui5_portal.TripPlanner", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_portal.TripPlaner
	*/ 
	getControllerName : function() {
		return "zui5_portal.TripPlanner";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_portal.TripPlaner
	*/ 
	createContent : function(oController) {
		
		// Search Fields
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			columns : 5,
			width : "640px",
			widths : [ "50px", "150px", "50px", "150px", "120px" ]
			});
		
		var oStartLabel = new sap.ui.commons.Label({
		    text:"From:", width:"50px"});
	    
		var oFrom = new sap.ui.commons.TextField({width:"150px" });
		
		var oTargetLabel = new sap.ui.commons.Label({ 
	    	text:"To:", width:"50px"});
		
		var oTo = new sap.ui.commons.TextField({
			width:"150px",
			change:	function(){
		    	   oController.calcRoute(oFrom.getValue(),oTo.getValue());
		       	     }
		    }); 
		
		var oSearchButton = new sap.ui.commons.Button({
		       text : "Calculate",
		       press:function(){
		    	   oController.calcRoute(oFrom.getValue(),oTo.getValue());
		       	}
		   });
		
		oMatrix.createRow( oStartLabel, oFrom, oTargetLabel , oTo, oSearchButton);  
		
		//Create HTML Control for google div
		var oHtml = new sap.ui.core.HTML({
					 id: "map_canvas",
					 content:[
	                      '<div id="map_canvas" '+
	                      'style="float:left;min-width:500px;'+
	                      'width:70%;min-height:800px;height:100%;"></div>'+
	                      '<div style="float:right;width:30%;'+
	                      'height:100%;overflow:auto">'+
	                      '<div id="directions_panel" '+
	                      'style="width:100%"></div></div>'
	                 ]
		});
		
		var oLayout= new sap.ui.commons.layout.VerticalLayout({
			width:"100%",
			height:"100%",
			content: [oMatrix, oHtml]});  	
		
		return oLayout ;

	}

});
