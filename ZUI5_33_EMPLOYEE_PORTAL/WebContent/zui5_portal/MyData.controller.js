sap.ui.controller("zui5_portal.MyData", {

onInit : function() {
   var oModel = new sap.ui.model.json.JSONModel();
   oModel.loadData(
           "/ui5/?application=portal&area=get_own_data"
   );
   this.getView().setModel(oModel);
},

save : function() { 
var oCore = sap.ui.getCore();
var oParameters = { 
  "department"    : oCore.getControl('department').getValue(),
  "function"      : oCore.getControl('function').getValue(),
  "telephone"     : oCore.getControl('telephone').getValue(),
  "telephone_ext" : oCore.getControl('telephone_ext').getValue()
};
  $.ajax({
    url : "/ui5/?application=portal&area=set_own_data",
    contentType : "application/json",
    dataType : 'json',
    data : oParameters,
    success : function(data, textStatus, jqXHR) { 
    sap.ui.getCore().byId("MyData").getController().addNotification(data.text, data.severity);
    sap.ui.getCore().getControl('B-Change').firePress();
    }
  });
},

toggle : function() { 
    var oCore = sap.ui.getCore();
    var oControl = oCore.getControl('department');
    oControl.setEditable(!oControl.getEditable());
    var oControl = oCore.getControl('function');
    oControl.setEditable(!oControl.getEditable());
    var oControl = oCore.getControl('telephone');
    oControl.setEditable(!oControl.getEditable());
    var oControl = oCore.getControl('telephone_ext');
    oControl.setEditable(!oControl.getEditable());
    var oControl = oCore.getControl('FileUploader');
    oControl.setVisible(!oControl.getVisible());
    var oButton = oCore.getControl('UploadButton');
    oButton.setEnabled(!oButton.getEnabled());
    var oButton = oCore.getControl('B-Save');
    oButton.setEnabled(!oButton.getEnabled());
    oButton = oCore.getControl('B-Change');
    if (oButton.getText() == 'Change') {
        oButton.setText('Display');
    } else {
        oButton.setText('Change');
    }
},

addNotification : function(sText,sIcon){
	 var oMessageNotifier = sap.ui.getCore().byId("MessageNotifier");
	 var oMessage = new sap.ui.core.Message({
       text : sText,
       timestamp : (new Date()).toUTCString()
	 });
	 switch(sIcon){
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
