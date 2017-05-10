sap.ui.jsview("zui5_portal.TimeSheet", {

/** Specifies the Controller belonging to this View. 
* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
* @memberOf zui5_portal.TimeSheet
*/ 
getControllerName : function() {
	return "zui5_portal.TimeSheet";
},

/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
* Since the Controller is given to this method, its event handlers can be attached right away. 
* @memberOf zui5_portal.TimeSheet
*/ 
createContent : function(oController) {

oDateType = new sap.ui.model.type.DateTime({
source: {pattern: "yyyyMMdd"}, 
pattern: "MMMddYYYY"});  // DateType 

oTimeType = new sap.ui.model.type.Time({
source: {pattern: "hhmm"}, 
pattern: "hh:mm"});     // DateType 

//Basic Layout
var oLayout = new sap.ui.commons.layout.MatrixLayout({
layoutFixed : true,
columns : 2, 
width : "100%",
widths : [ "70%", "30%" ]
});

//Header 
var oHeaderText = new sap.ui.commons.TextView({
text:"Time and Attendance",
design : sap.ui.commons.TextViewDesign.H1}); 
oLayout.createRow(oHeaderText);

//Table
var oTable = new sap.ui.table.Table({
    visibleRowCount:20,
    firstVisibleRow: 1,
    editable:false,
    selectionMode: sap.ui.table.SelectionMode.None,
});

var oColumn = new sap.ui.table.Column({
    label: new sap.ui.commons.Label({text: "Date"}),
    template: new sap.ui.commons.TextView().bindProperty(
    		"text", 
    		"activity_date", 
    		oDateType),
    sortProperty: "date",
    filterProperty: "date",
    sorted:true ,
    sortOrder: sap.ui.table.SortOrder.Descending      
});
oTable.addColumn(oColumn);
 
oTable.addColumn(new sap.ui.table.Column({
    label: new sap.ui.commons.Label({text: "From"}),
    template: new sap.ui.commons.TextView().bindProperty(
    		"text", 
    		"time_from",
    		oTimeType),
    sortProperty: "time_from",
    filterProperty: "time_from",
}));

oTable.addColumn(new sap.ui.table.Column({
    label: new sap.ui.commons.Label({text: "To"}),
    template: new sap.ui.commons.TextView().bindProperty(
    		"text", 
    		"time_to", 
    		oTimeType),
    sortProperty: "time_to",
    filterProperty: "time_to", 
}));

oTable.addColumn(new sap.ui.table.Column({
  label: new sap.ui.commons.Label({text: "Internal"}),
  template: new sap.ui.commons.CheckBox({
	  editable:false}).bindProperty(
			  "checked",
			  "internal", 
      function(checked) {
        var key = checked;
        switch(key) {
        case "X": return true;
        case "default":
               return false;}
        }),    
  sortProperty: "internal",
  filterProperty: "internal", 
}));

oTable.addColumn(new sap.ui.table.Column({
  label: new sap.ui.commons.Label({text: "Customer"}),
  template: new sap.ui.commons.TextView().bindProperty(
		  "text", "customer_id", function(s){
    // get name of id
    if (s==null)
      return;
    var oProperty = this.getModel().getProperty("/customer");
    for (var i=0; i < oProperty.length; i++){
      if (oProperty[i].customer_id == s)
        return oProperty[i].customer_text;
    }
    }),
  sortProperty: "customer_id",
  filterProperty: "customer_id",
}));

//Project
oTable.addColumn(new sap.ui.table.Column({
  label: new sap.ui.commons.Label({text: "Project"}),
  template: new sap.ui.commons.TextView().bindProperty(
		  "text", 
		  "project_id", 
   function(s){
    if (s==null)
      return;
    var sPath = this.getBindingContext().getPath();  

    var oCurrentRow = this.getModel().getProperty(sPath); 

    var oProperty = this.getModel().getProperty("/projects"); 
    for (var i=0; i < oProperty.length; i++){
      if ((oProperty[i].project_id == s)&&
    	  (oProperty[i].customer_id == oCurrentRow.customer_id)) 
        return oProperty[i].project_desc;
    }}),
  sortProperty: "project_id",
  filterProperty: "project_id",
}));

oTable.addColumn(new sap.ui.table.Column({
  label: new sap.ui.commons.Label({text: "Description"}),
  template: new sap.ui.commons.TextView().bindProperty("text", "description"),
  sortProperty: "description",
  filterProperty: "description",
}));


oTable.addColumn(new sap.ui.table.Column({
  template: new sap.ui.commons.Button({
	lite: true,
    icon : "img/s_b_dele.gif",
    press: oController.removeTimeEntry,
    customData:[ 
       new sap.ui.core.CustomData({key:"DelKey", value:"{username}&{activity_date}&{time_from}&{time_to}"})
    ]
  }),
}));

//Set Filter
var oFilter = new sap.ui.model.Filter(
	"activity_date", 
	sap.ui.model.FilterOperator.GE, 
	Number(Date.today().addMonths(-1).toString(
			"yyyyMMdd"
			)));
oTable.bindRows("/time_report","","",oFilter);

//Layout for right side
var oLayoutRight = new sap.ui.commons.layout.MatrixLayout({
layoutFixed : true,
columns : 2,
width : "100%",
widths : ["35%", "65%"] 
}).addStyleClass("margin");

var oTV = new sap.ui.commons.TextView({
text : 'New',
design : sap.ui.commons.TextViewDesign.H4 });

var oDatePicker = new sap.ui.commons.DatePicker({
width:"175px"});

var oTimePickerFrom  = new zui5_portal.TimePicker();

var oTimePickerTo  = new zui5_portal.TimePicker();

var oItemTemplateCustomer = new sap.ui.core.ListItem({
text:"{customer_text}",
key:"{customer_id}"
}); 
var oItemTemplateProjects = new sap.ui.core.ListItem({
text:"{project_desc}",
key:"{project_id}"
}); 

//Combobox-Control
var oComboBoxCustomers = new sap.ui.commons.ComboBox({
width:"175px",
editable:false,
items: {path:"/customer", 
  template:oItemTemplateCustomer}, 
change: function(oEvent){
//when changing entry in comboBox, change project comboBox, too
var oFilter = new sap.ui.model.Filter(
		"customer_id", 
		sap.ui.model.FilterOperator.EQ, 
		this.getSelectedKey());
oComboBoxProjects.unbindItems();
oComboBoxProjects.bindItems(
		"/projects", 
		oItemTemplateProjects,"" , 
		oFilter);
oComboBoxProjects.setValue("");
}
});

var oComboBoxProjects = new sap.ui.commons.ComboBox({
width:"175px",
editable: false
});

var oLayoutRB = new sap.ui.commons.layout.MatrixLayout();
oLayoutRB.setLayoutFixed(false);
oLayoutRB.setWidth("175px");
oLayoutRB.setColumns(2);

var oRB1 = new sap.ui.commons.RadioButton({
  text : 'Internal',
  tooltip : 'Select for Yes',
  groupName : 'Group1',
  selected : true,
  select : function() { 
    oComboBoxCustomers.setEditable(false);
    oComboBoxProjects.setEditable(false);
    oComboBoxCustomers.setSelectedKey("");
    oComboBoxProjects.setSelectedKey("");
    } 
});

var oRB2 = new sap.ui.commons.RadioButton({
  text : 'Customer',
  groupName : 'Group1',
  select : function() {
    oComboBoxCustomers.setEditable(true);
    oComboBoxProjects.setEditable(true);
    } 
});
oLayoutRB.createRow(oRB1, oRB2);

var oTA = new sap.ui.commons.TextArea({
tooltip : 'Description',
width : '175px',
height : '120px'
});

var oButtonCreate = new sap.ui.commons.Button({
width:"175px",
text:"Save",
press: function (oEvent){
oController.createNewEntry(
		oDatePicker,
		oTimePickerFrom, 
		oTimePickerTo,
		oComboBoxCustomers,
		oComboBoxProjects,
		oTA,
		oRB1);
}
});

//Layout
oLayoutRight.createRow(oTV);
oLayoutRight.createRow(
		new sap.ui.commons.Label(
				{text:"Date"}),
				 oDatePicker);
oLayoutRight.createRow(
	new sap.ui.commons.Label(
			{text:"From"}),
			oTimePickerFrom);
oLayoutRight.createRow(
	new sap.ui.commons.Label(
			{text:"To"}),
			oTimePickerTo);
oLayoutRight.createRow(
	new sap.ui.commons.Label(
			{text:"Type"}),
			oLayoutRB);
oLayoutRight.createRow(new sap.ui.commons.Label(
	{text:"Customer"}),
	oComboBoxCustomers);
oLayoutRight.createRow(new sap.ui.commons.Label(
	{text:"Project"}),
	oComboBoxProjects);
oLayoutRight.createRow(new sap.ui.commons.Label(
	{text:"Description"}),
	oTA);
oLayoutRight.createRow("",oButtonCreate);


//Chart for some statistics
var oDataset = new sap.viz.ui5.data.FlattenedDataset({
    dimensions : [
                {
                        axis : 1, 
                        name : 'Month',
                        value : "{month}"
                }
        ],
        measures : [
                { 
                        name : 'Internal', 
                        value : '{internal}'
                },
                { 
                    name : 'Customer Project', 
                    value : '{external}'
                }
        ],
        data : {
                path : "/projectdata"
        }

});

// Chartcontrol
var oBarChart = new sap.viz.ui5.Line("oTimeChart",{
        width : "100%",
        height : "300px",
        plotArea : {
        },
        title : {
                visible : true,
                text : 'Distribution of projects'
        },
        dataset : oDataset
});
oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan : 2 });
oCell1.addContent(oBarChart);
oLayoutRight.createRow(oCell1);


var oTableCell = new sap.ui.commons.layout.MatrixLayoutCell({
content:oTable,
vAlign : sap.ui.commons.layout.VAlign.Top
});
var oLayoutRightCell = new sap.ui.commons.layout.MatrixLayoutCell({
content:oLayoutRight,
vAlign : sap.ui.commons.layout.VAlign.Top
});

oLayout.createRow(oTableCell,oLayoutRightCell);
return oLayout;

}

});

