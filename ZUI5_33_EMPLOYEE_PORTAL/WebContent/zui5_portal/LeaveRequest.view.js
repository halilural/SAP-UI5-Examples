sap.ui.jsview("zui5_portal.LeaveRequest", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_portal.LeaveRequest
	*/ 
	getControllerName : function() {
		return "zui5_portal.LeaveRequest";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_portal.LeaveRequest
	*/ 
	createContent : function(oController) {

// Create the Basic Layout for this Site
var oLayout = new sap.ui.commons.layout.MatrixLayout({
	layoutFixed : true,
	columns : 2,
	width : "100%",
	widths : [ "75%", "25%" ]
	});

//Header
var oHeaderText = new sap.ui.commons.TextView({
	text:"Leave Request",
	design : sap.ui.commons.TextViewDesign.H1}); 
oLayout.createRow({height: "30px"}, oHeaderText );

//Calendar Control
var oCalendar = new sap.me.Calendar("LeaveRequestCalendar",
		{design: sap.me.CalendarDesign.Approval});

//Set the calendar properties
oCalendar.setEnableMultiselection(true);
oCalendar.setSingleRow(false);
oCalendar.setMonthsToDisplay(6);
oCalendar.setWeeksPerRow(1);
oCalendar.setFirstDayOffset(1);
oCalendar.setMonthsPerRow(3);
oCalendar.setDayHeight(35);

oDateType = new sap.ui.model.type.DateTime({
	source: {pattern: "yyyyMMdd"}, 
	pattern: "MMM dd yyyy'-'"}); 

//  Itemtemplate for aggregation binding within the accordionsections
var oItemTemplate = new sap.ui.commons.TextView(
	{
		text:{
			parts:[
				{
					path:"start_date",
					type: new sap.ui.model.type.DateTime({
	 				        source: {pattern: "yyyyMMdd"}, 
							pattern: "MMM dd yyyy'-'"})
				},
				{
					path:"end_date",
					type: new sap.ui.model.type.DateTime({
						source: {pattern: "yyyyMMdd"}, 
						pattern: "MMM dd yyyy' /'"})
				},
				{	
					path:"type",
					formatter:oController.Convert
				},
				{
					path:"descr",					
				},
				]
			},
		customData: new sap.ui.core.CustomData({
     		key:"id",
     		value:"{req_id}"
     	}),	
	});
			

// Accordion Control
var oAccordion = new sap.ui.commons.Accordion(); 
oAccordion.setWidth("100%");	    

//Status Created
var oSection1 = new sap.ui.commons.AccordionSection({
	title: "Created",
	content:[
	  new sap.ui.commons.layout.VerticalLayout({
		content: {
		  path: "/", 
		  filters: new sap.ui.model.Filter(
		         "status", 
		         sap.ui.model.FilterOperator.EQ, 
		         "01"),
		  template: oItemTemplate
		      }
		   })
		 ]
});   

oAccordion.addSection( oSection1 );                        
//Status Approved
var oSection2 = new sap.ui.commons.AccordionSection({
	title: "Approved",
	content:[
	   new sap.ui.commons.layout.VerticalLayout({
	   content: {
	     path: "/", 
	     filters: new sap.ui.model.Filter(
	      	  "status", 
	           sap.ui.model.FilterOperator.EQ, 
	           "02"),
	     template: oItemTemplate
	      }
	   })
	 ]
}); 
oAccordion.addSection( oSection2 );                                 
//Status Rejected
var oSection3 = new sap.ui.commons.AccordionSection({
	title: "Rejected",
	content:[
	   new sap.ui.commons.layout.VerticalLayout({
	   content: {
	     path: "/", 
	     filters: new sap.ui.model.Filter(
	         "status", 
	         sap.ui.model.FilterOperator.EQ, 
	         "03"),
	     template: oItemTemplate
	      }
	   })
	 ]
});                 
oAccordion.addSection( oSection3 );                          

// Toolbar
var oToolbar = new sap.ui.commons.Toolbar();
oToolbar.setStandalone(false);
oToolbar.setDesign(sap.ui.commons.ToolbarDesign.Flat);	

var oButton1 = new sap.ui.commons.Button({
	text : "New...",
	press : oController.openCreateDialog
});
oToolbar.addItem(oButton1);

var oButton2 = new sap.ui.commons.Button({
	text : "Remove",
	press : oController.unmark
});
oToolbar.addItem(oButton2);

var oLegend = new sap.me.CalendarLegend(); 
oLegend.setExpanded(true);
oLegend.setLegendForType01("Created");
oLegend.setLegendForType04("Approved");
oLegend.setLegendForType06("Rejected");

	var oCalendarCell = new sap.ui.commons.layout.MatrixLayoutCell({
		content:oCalendar,
		vAlign : sap.ui.commons.layout.VAlign.Top
	});
	var oAccordionCell = new sap.ui.commons.layout.MatrixLayoutCell({
		content:[oToolbar,oAccordion,oLegend],
		vAlign : sap.ui.commons.layout.VAlign.Top
	});
	oLayout.createRow(oCalendarCell, oAccordionCell );
	return oLayout;
	
}

});
