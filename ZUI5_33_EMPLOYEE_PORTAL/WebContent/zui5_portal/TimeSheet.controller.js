sap.ui.controller("zui5_portal.TimeSheet", {

	onInit: function() {	
		// Init Load 
		this.initLoad();			
	},

	onBeforeRendering: function() {
		// Init Load 
		this.initLoad();	
	},

	initLoad: function(){	
	// Init Load 										
	var oModel = new sap.ui.model.json.JSONModel().attachRequestCompleted(
		function(oData){
			// get time report
	var oTime = oData.getSource().getProperty("/time_report");
	// Calculate duration and save in model
	for (var i=0; i<oTime.length; i++){							
		var oItem= oTime[i];
		var dStart = Date.parseExact(oItem.time_from,"HHmmss");															
		var dEnd   = Date.parseExact(oItem.time_to,"HHmmss");
		var iDuration = (dEnd-dStart)/1000;		
		
		oTime[i].duration= iDuration;							
		var dDay = Date.parseExact(oItem.activity_date,"yyyyMMdd");
		oTime[i].month = dDay.toString("MMMM");
	}
	iInternal = 0;		
	iExternal = 0;
	
	// Create JSON
	sSummary = '{ "projectdata" :[';
	for (var i=0;i<oTime.length;i++){
		if (i != 0){
			if(oTime[i].month != oTime[i-1].month){		
				sSummary+= '{"month" :"'
					+oTime[i-1].month
					+'","internal":"'
					+iInternal/3600
					+'","external":"'+
					iExternal/3600+'"},';
				iInternal=0;
				iExternal=0;
			}
		}

		if(oTime[i].internal == "X"){			
			iInternal+=oTime[i].duration;	
		}
		else{
			iExternal+=oTime[i].duration;	
		}	
		
		// last entry
		if ((i+1)==oTime.length){			
			sSummary+= '{"month" :"'
				+oTime[i-1].month
				+'","internal":"'
				+iInternal/3600
				+'","external":"'
				+iExternal/3600+'"}]}';
		}
	}
	var oModel = new sap.ui.model.json.JSONModel( );
	oModel.setJSON(sSummary);
	sap.ui.getCore().byId("oTimeChart").setModel(oModel);
	});		
	oModel.loadData("/ui5/?application=portal&area=init_ts");
	  	this.getView().setModel(oModel);
	},

	createNewEntry: function(
			oDatePicker,
			oTimePickerFrom, 
			oTimePickerTo,
			oComboBoxCustomers,
			oComboBoxProjects,
			oTA,
			oCb){
	var oParameters= {				
		 "date" : 		oDatePicker.getYyyymmdd(),
		 "timeFrom":   	oTimePickerFrom.getTime(),
		 "timeTo":    	oTimePickerTo.getTime(),			
		 "customer":	oComboBoxCustomers.getSelectedKey(),
		 "project":		oComboBoxProjects.getSelectedKey(),
		 "intern" : 	oCb.getSelected(),
	     "comment" :	oTA.getValue()		 
	};
	//Validate
	if(oParameters.date == "")
		sap.ui.getCore().byId("TimeSheet").getController().addNotification("Select date","E");
	if(oParameters.comment == "")
		sap.ui.getCore().byId("TimeSheet").getController().addNotification("Enter description","E");
	if ( ( Number ( oParameters.timeTo ) - 
		   Number ( oParameters.timeFrom) ) < 1 )
		sap.ui.getCore().byId("TimeSheet").getController().addNotification("Time invalid","E");
	if(((oParameters.customer =="") || 
		(oParameters.project=="")) && 
		(oParameters.intern != true))
		sap.ui.getCore().byId("TimeSheet").getController().addNotification("Select Customer Project","E");

	 $.ajax({					//Ajax call to Backend
	    url : "/ui5/index.html?application=portal&area=set_ts",
	    contentType : "application/json",
	    dataType : 'json',
	    data: oParameters,
	    success : function(data, textStatus, jqXHR) { 
	    	sap.ui.getCore().byId("TimeSheet").getController().addNotification(data.text,data.severity);
	   	 	sap.ui.getCore().byId("TimeSheet").getController().initLoad();
	        }
		 });	
	},

	removeTimeEntry: function(oEvent){
	var oParameters= {	
		   	 "Key" : oEvent.getSource().data("DelKey"),
			 "DELETE":"X"
	 	};	
	
	$.ajax({			//Ajax 
	        url : "/ui5/index.html?application=portal&area=set_ts",
	        contentType : "application/json",
	        dataType : 'json',
	        data:  oParameters,
	        success : function(data, textStatus, jqXHR) {
	        	sap.ui.getCore().byId("TimeSheet").getController().addNotification(
	    				data.text,
	    				data.severity);        	
	       	 	sap.ui.getCore().byId("TimeSheet").getController().initLoad();
	        }
		 });
		
	},

	addNotification : function(sText, sIcon) {
		var oMessageNotifier = sap.ui.getCore().byId("MessageNotifier");
		var oNotifier = sap.ui.getCore().byId("Notifier");
		
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
	oNotifier.setVisibleStatus(sap.ui.ux3.NotificationBarStatus.Max);
	},
	
	Error : function (string) {
		// Error message to notifier control
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.show(string,
				sap.ui.commons.MessageBox.Icon.ERROR,
				"Fehler");
		},
	
	});