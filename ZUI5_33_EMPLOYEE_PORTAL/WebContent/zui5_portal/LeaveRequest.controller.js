sap.ui.controller(
				"zui5_portal.LeaveRequest",
				{

					onInit : function() {
						this.initLoad(); // Init Model for Dropdowns
					},

					onBeforeRendering : function() {
						// this.initLoad(); // Init Model for Dropdowns
					},

					initLoad : function() { // Init Model for Dropdowns
						var oModel = new sap.ui.model.json.JSONModel();
						oModel
								.loadData("/ui5/?application=portal&area=init_abs");
						sap.ui.getCore().setModel(oModel, "init_abs");
					},

					onAfterRendering : function() {
						this.loadModel();
					},

					loadModel : function() {
						// Read leave requests into model
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.attachRequestCompleted("", this.markLeaves);
						oModel
								.loadData("/ui5/?application=portal&area=get_absence");
						this.getView().setModel(oModel);
					},

					openCreateDialog : function(oEvent) { // open Dialog

						// Get Calendar Control
						var oCalendar = sap.ui.getCore().byId(
								"LeaveRequestCalendar");
						// Get selected days
						var oSelectedDates = oCalendar.getSelectedDates();
						// Error message
						if (oSelectedDates.length == 0)
							return sap.ui.getCore().byId("LeaveRequest")
									.getController().Error(
											"No selected days");
						var oComboBox1 = new sap.ui.commons.ComboBox();
						var oTextArea = new sap.ui.commons.TextArea({
							cols : 50,
							rows : 6,
							wrapping : sap.ui.core.Wrapping.Off,
						});

						var oItemTemplate = new sap.ui.core.ListItem({
							text : "{abs_text}",
							key : "{abs_key}"
						});
						oComboBox1.setModel(sap.ui.getCore().getModel(
								"init_abs"));
						oComboBox1.bindItems("/absence", oItemTemplate);

						// Dialog 
						var oDialog1 = new sap.ui.commons.Dialog(
								{
									title : "New Request",
									content : [ new sap.ui.commons.layout.VerticalLayout(
											{
												content : [
														new sap.ui.commons.layout.HorizontalLayout(
																{
																	content : [
																			new sap.ui.commons.Label(
																					{
																						text : "Period of time : ",
																						width : "100px",
																						required : true
																					}),
																			new sap.ui.commons.Label(
																					{
																						text : oSelectedDates[0]
																								+ " - "
																								+ oSelectedDates[oSelectedDates.length - 1],
																					}), ]
																}),
														new sap.ui.commons.layout.HorizontalLayout(
																{
																	content : [
																			new sap.ui.commons.Label(
																					{
																						text : "Type : ",
																						width : "100px",
																						required : true
																					}),
																			oComboBox1, ]
																}),
														new sap.ui.commons.layout.HorizontalLayout(
																{
																	content : [
																			new sap.ui.commons.Label(
																					{
																						text : "Reason : ",
																						width : "100px"
																					}),
																			oTextArea ]
																}) ]
											}) ],
									buttons : [
											new sap.ui.commons.Button(
													{
														text : "Submit",
														press : function(oEvent) {
															var oParameters = {
																// Parameter for the Backend
																"startDate" : sap.ui
																		.getCore()
																		.byId(
																				"LeaveRequest")
																		.getController()
																		.toYyyymmdd(
																				oSelectedDates[0]),
																// End date is the last entry of the array
																"endDate" : sap.ui
																		.getCore()
																		.byId(
																				"LeaveRequest")
																		.getController()
																		.toYyyymmdd(
																				oSelectedDates[oSelectedDates.length - 1]),
																// KEY 
																"reason" : oComboBox1
																		.getSelectedKey(),
																// Text 
																"comment" : oTextArea
																		.getValue()
															};

															if (oComboBox1
																	.getSelectedKey() == "")
																// Do some checks
																return sap.ui
																		.getCore()
																		.byId(
																				"LeaveRequest")
																		.getController()
																		.Error(
																				"Mussfelder ausfüllen");

															// remove mark in calendar control
															oCalendar
																	.unselectAllDates();

															$
																	.ajax({
																		url : "/ui5/index.html?application=portal&area=set_absence",
																		contentType : "application/json",
																		dataType : 'json',
																		data : oParameters,
																		success : function(
																				data,
																				textStatus,
																				jqXHR) {
																			sap.ui
																					.getCore()
																					.byId(
																							"LeaveRequest")
																					.getController()
																					.addNotification(
																							data.text,
																							data.severity);
																			oDialog1
																					.close();
																			sap.ui
																					.getCore()
																					.byId(
																							"LeaveRequest")
																					.getController()
																					.loadModel();
																		}
																	});
														}
													}),
											new sap.ui.commons.Button({
												text : "Cancel",
												press : function() {
													oDialog1.close();
												}
											}) // Cancel
									]
								});
						oDialog1.open(); // Open Dialog
					},

					unmark : function() {
						// remove marks
						var oCalendar = sap.ui.getCore().byId(
								"LeaveRequestCalendar");
						oCalendar.unselectAllDates();
					},

					Convert : function(sString) {
						// Add Slash
						if (sString == null)
							return;
						var oProperty = sap.ui.getCore().getModel("init_abs")
								.getProperty("/absence");
						for (var i = 0; i < oProperty.length; i++) {
							if (oProperty[i].abs_key == sString)
								return oProperty[i].abs_text + " / ";
						}
					},

					markLeaves : function() {

						// get calendar control
						var oCalendar = sap.ui.getCore().byId(
								"LeaveRequestCalendar");

						// Read status
						var aInitData = sap.ui.getCore().getModel("init_abs")
								.getProperty("/status");
						// In this case "this" is the Model
						// get sub entries
						var aItems = this.getProperty("/");
						for (var j = 0; j < aInitData.length; j++) {
							for (var i = 0; i < aItems.length; i++) {
								// set marks
								if (aInitData[j].status_key == aItems[i].status)
									oCalendar
											.toggleDatesRangeSelection(
													sap.ui
															.getCore()
															.byId(
																	"LeaveRequest")
															.getController()
															.toDate(
																	aItems[i].start_date),
													sap.ui
															.getCore()
															.byId(
																	"LeaveRequest")
															.getController()
															.toDate(
																	aItems[i].end_date),
													true);
							}
							var aSelected = oCalendar.getSelectedDates();
							var oType = {};
							switch (aInitData[j].status_key) {
							// Set different type for every status
							case "01":
								oType = sap.me.CalendarEventType.Type01;
								break;
							case "02":
								oType = sap.me.CalendarEventType.Type04;
								break;
							case "03":
								oType = sap.me.CalendarEventType.Type06;
								break;
							default:
								oType = sap.me.CalendarEventType.Type07;
								break;
							}// toggle the display type
							oCalendar.toggleDatesType(aSelected, oType, true);
							oCalendar.unselectAllDates();
						}
					},

					Error : function(string) {
						// Error message to Notifier
						jQuery.sap.require("sap.ui.commons.MessageBox");
						sap.ui.commons.MessageBox.show(string,
								sap.ui.commons.MessageBox.Icon.ERROR, "Fehler");
					},

					toYyyymmdd : function(date) {
						// convert date
						date = String(date);
						date = date.substr(4);
						var theDate = Date.parseExact(date, "MMM dd yyyy");
						var yyyymmdd = theDate.toString("yyyyMMdd");
						return yyyymmdd;
					},

					toDate : function(str) {
						// Convert date
						if (str == null)
							return;
						String(str);
						var y = str.substr(0, 4), m = str.substr(4, 2) - 1, d = str
								.substr(6, 2);
						var D = new Date(y, m, d);
						return D;
					},

					addNotification : function(sText, sIcon) {
						// Notification Bar
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
							oMessage
									.setLevel(sap.ui.core.MessageType.Information);
							break;
						default:
							oMessage
									.setLevel(sap.ui.core.MessageType.Information);
							break;
						}
						oMessageNotifier.addMessage(oMessage);
					},

				});