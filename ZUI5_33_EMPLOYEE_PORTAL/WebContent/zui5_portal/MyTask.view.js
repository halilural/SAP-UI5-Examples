sap.ui.jsview("zui5_portal.MyTask", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf zui5_portal.MyTask
	 */
	getControllerName : function() {
		return "zui5_portal.MyTask";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf zui5_portal.MyTask
	 */
	createContent : function(oController) {

		oText = new sap.ui.commons.TextView({
			text : "My Tasks"
		});

		// Layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			columns : 2,
			width : "100%",
			widths : [ "75%", "25%" ]
		});

		// Header
		var oHeaderText = new sap.ui.commons.TextView({
			text : "My Tasks",
			design : sap.ui.commons.TextViewDesign.H3
		});
		oLayout.createRow(oHeaderText);

		// Format for Date
		oDateType = new sap.ui.model.type.DateTime({
			source : {
				pattern : "yyyyMMdd"
			},
			pattern : "MMM.DD.YYYY"
		});

		// Table Control
		var oTable = new sap.ui.table.Table({
			visibleRowCount : 10,
			firstVisibleRow : 1,
			editable : false,
			NavigationMode: sap.ui.table.NavigationMode.Scrollbar,
			toolbar : sap.ui.commons.Toolbar({
				items : [ new sap.ui.commons.Button({
					text : "New Task",
					icon : "img/s_b_anno.gif",
					press : oController.add
				}) ]
			}),
			selectionMode : sap.ui.table.SelectionMode.None,
		});

		// Columns
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Created on"
			}),
			template : new sap.ui.commons.TextView({
				text : {
					path : "crea_date",
					type : oDateType	
				}
			}),
			sortProperty : "crea_date",
			filterProperty : "crea_date",
			width : "8%"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Due date"
			}),
			template : new sap.ui.commons.TextView({
				text : {
					path : "due_date",
					type : oDateType
				}
			}),
			sortProperty : "due_date",
			filterProperty : "due_date",
			width : "8%"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Task"
			}),
			template : new sap.ui.commons.TextView({
				text : {
					path : "task"
				}
			}),
			width : "40%"
		}));			
		
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Priority"
			}),
			// Parse to float
			template : 
			 new sap.ui.commons.RatingIndicator({
				 editable : false
			 }).bindProperty(
			   "value", "priority", function(rating) {
				 var fRate = parseFloat(rating);
				 if (isNaN(fRate)) {
				    	fRate = 0;
				 } 
				 return fRate;
			  }),
			sortProperty : "rating",
			filterProperty : "rating",
			width : "16%"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Done"
			}),
			template : new sap.ui.commons.CheckBox({
				change : oController.markTaskDone,
				customData : [ new sap.ui.core.CustomData({
					key : "id",
					value : "{taskid}"
				}) ]
			}).bindChecked("done", function(checked) {
				var key = checked;
				switch (key) {
				case "X":
					return true;
				case "default":
					return false;
				}
			}),
			sortProperty : "done",
			filterProperty : "done",
			width : "10%"
		}));
		oTable.bindRows("/");


		// Statistic chart
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [ {
				axis : 1,
				name : 'Done Tasks',
				value : "{task}"
			} ],
			measures : [ {
				name : 'Status',
				value : '{value}'
			} ],
			data : {
				path : "/projectData"
			}

		});

		// Chart Control
		var oBarChart = new sap.viz.ui5.Donut("oTaskStatusBar", {
			width : "100%",
			height : "300px",
			title : {
				visible : true,
				text : 'Distribution of tasks status'
			},
			dataset : oDataset
		});

		var oTableCell = new sap.ui.commons.layout.MatrixLayoutCell({
			content : oTable,
			vAlign : sap.ui.commons.layout.VAlign.Top
		});
		var oLayoutRightCell = new sap.ui.commons.layout.MatrixLayoutCell({
			content : oBarChart,
			vAlign : sap.ui.commons.layout.VAlign.Top
		});

		oLayout.createRow(oTableCell, oLayoutRightCell);
		return oLayout;

	}

});
