sap.ui.jsview("zui5_portal.EmployeeSearch", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5_portal.EmployeeSearch
	*/ 
	getControllerName : function() {
		return "zui5_portal.EmployeeSearch";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5_portal.EmployeeSearch
	*/ 
	createContent : function(oController) {

		// Layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			columns : 1,
			width : "100%",
			widths : [ "100%" ]
			});
		
		//Header
		var oHeaderText = new sap.ui.commons.TextView(
				{text:"Employee Directory", 
				width:'500px',
				design : sap.ui.commons.TextViewDesign.H1
				});
		oLayout.createRow(oHeaderText);
		
		// Search Field
		var oTextFieldSearch = new sap.ui.commons.TextField("ES_TFS",{
      		liveChange:  function(oEvent) {
      			var para = oEvent.getParameters();
      			if (para instanceof Object)
      				para = para.liveValue;
      			var oFilter = new sap.ui.model.Filter("lastname", 
      					      sap.ui.model.FilterOperator.Contains,
      					      para);
      			oRowRepeater.bindRows("/", oRowTemplate,"",oFilter);
      		}
		});
		var oHLayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[new sap.ui.commons.Label({text:"Search",width:"100px"}),oTextFieldSearch]
		});
		
		oLayout.createRow(oHLayout);
		
		// RowRepeater
        var oRowRepeater = new sap.ui.commons.RowRepeater();
        oRowRepeater.setNoData(new sap.ui.commons.TextView({
        	text: "No Data found"
        		}));

        oRowRepeater.setDesign("Standard");
        oRowRepeater.setNumberOfRows(10);
        oRowRepeater.setCurrentPage(1);


        //create the template control that will be repeated and will display the data
        var oRowTemplate = new sap.ui.commons.layout.MatrixLayout();

        var  matrixRow, matrixCell, control;
        matrixRow = new sap.ui.commons.layout.MatrixLayoutRow();

        //Last name
        control = new sap.ui.commons.Label();
        control.bindProperty("text","lastname");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //First Name
        control = new sap.ui.commons.Label();
        control.bindProperty("text","firstname");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //Department
        control = new sap.ui.commons.Label();
        control.bindProperty("text","department");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //Function
        control = new sap.ui.commons.Label();
        control.bindProperty("text","function");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //Telephone
        control = new sap.ui.commons.Label();
        control.bindProperty("text","tel_numbr");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //Mobile
        control = new sap.ui.commons.Label();
        control.bindProperty("text","mob_numbr");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);

        //Email
        control = new sap.ui.commons.Link();
        control.bindProperty("text","e_mail");
        matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
        matrixCell.addContent(control);
        matrixRow.addCell(matrixCell);
        
        oRowTemplate.addRow(matrixRow);

        //Bind to RowRepeater
        oRowRepeater.bindRows("/", oRowTemplate);
        oLayout.createRow(oRowRepeater );
		return oLayout;
		
	}

});
