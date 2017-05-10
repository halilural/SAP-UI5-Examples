sap.ui.controller(
				"zui5_portal.MyTask",
{

onInit : function() {
		this.initLoad();
},

// onBeforeRendering: function() {},

initLoad : function() {
var oModel = new sap.ui.model.json.JSONModel()
			.attachRequestCompleted(function(oData) {
var oTasks = oData.getSource().getProperty("/");
var iDone = 0;
var iOpen = 0;
for ( var i = 0; i < oTasks.length; i++) {
	if (oTasks[i].done == "X")
		iDone++;
    else
		iOpen++;
 }

var oModel = new sap.ui.model.json.JSONModel({
			projectData : [ {
				task : "done",
	            value : iDone
            }, {
	            task : "open",
				value : iOpen
			} ]
		});
sap.ui.getCore().byId("oTaskStatusBar").setModel(oModel);
});

oModel.loadData("/ui5/?application=portal&area=get_task");
	this.getView().setModel(oModel);
},

/////////////////////////////////////////////////////////////////////////////

markTaskDone : function(oEvent) {

var oRows = oEvent.getSource().oParent.getCells();
var bSelected = oRows[4].getChecked();

var sSelected = "X";
if (!bSelected)
	sSelected = " ";
var oParameters = {
	"taskid" : oRows[4].data("id"),
"done" : sSelected,
};

$.ajax({
url : "/ui5/index.html?application=portal&area=set_task",
contentType : "application/json",
dataType : 'json',
data : oParameters,
success : function(data, textStatus, jqXHR) {
	sap.ui.getCore().byId("MyTask")
	.getController()
	.addNotification(data.text, data.severity);
sap.ui.getCore().byId("MyTask").getController().initLoad();
	}
});
},

add : function(oEvent) {

var oDP = new sap.ui.commons.DatePicker();
var oTF = new sap.ui.commons.TextField();
var oRI = new sap.ui.commons.RatingIndicator();

var oSimpleForm = new sap.ui.commons.form.SimpleForm({
maxContainerCols : 1,
layout : sap.ui.commons.form.SimpleFormLayout.GridLayout,
content : [
new sap.ui.commons.Title({
	text : "Create Task"
}),
new sap.ui.commons.Label({
	text : "Due date"
}),
oDP,
new sap.ui.commons.Label({
	text : "Task"
}),
oTF,
new sap.ui.commons.Label({
	text : "Priority"
}),
oRI,
new sap.ui.commons.Button(
		{
			text : "Create",
            press : function() {
	        var oParameters = {
		         "due_date" : oDP.getYyyymmdd(),
                 "done" : " ",
                 "priority" : oRI.getValue(),
                 "task" : oTF.getValue()
};

$.ajax({
url : "/ui5/index.html?application=portal&area=set_task",
contentType : "application/json",
dataType : 'json',
data : oParameters,
success : function(
		data,
		textStatus,
		jqXHR) {
	sap.ui.getCore().byId("MyTask").getController().addNotification(
				data.text,
				data.severity);
sap.ui.getCore().byId("MyTask").getController().initLoad();
			}
			});
	oTool.close();
		}
		}),
new sap.ui.commons.Button({
	text : "Close",
						press : function() {
							oTool.close();
						}
					}) ]
		});

var oTool = new sap.ui.ux3.ToolPopup({
	autoClose : true,
	content : new sap.ui.commons.layout.VerticalLayout(
			{
				width : "500px",
					content : [ oSimpleForm ]
				}),
		opener : oEvent.getSource()
	});
	oTool.open();
},

addNotification : function(sText, sIcon) {
	var oMessageNotifier = sap.ui.getCore().byId(
			"MessageNotifier");
var oMessage = new sap.ui.core.Message({
	text : sText,
	timestamp : (new Date()).toUTCString()
});
switch (sIcon) {
case "E":
	oMessage.setLevel(sap.ui.core.MessageType.Error);
	break;
case "S":
	oMessage.setLevel(sap.ui.core.MessageType.Success);
	break;
case "W":
	oMessage.setLevel(sap.ui.core.MessageType.Warning);
	break;
case "I":
	oMessage.setLevel(sap.ui.core.MessageType.Information);
	break;
default:
	oMessage.setLevel(sap.ui.core.MessageType.Information);
	break;
	}
oMessageNotifier.addMessage(oMessage);
}

});