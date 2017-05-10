sap.ui.jsview("zui5_portal.MyData", {

getControllerName : function() {
    return "zui5_portal.MyData";
},

createContent : function(oController) {

// Layout 
var oMatrix = new sap.ui.commons.layout.MatrixLayout({
    layoutFixed : true,
    width : '800px',
    columns : 2,
    widths : ['400px', '400px'] });


var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
   colSpan: 2 });

// Header
var oTV = new sap.ui.commons.TextView({
    text : 'Personal Data',
    design : sap.ui.commons.TextViewDesign.H1 
    }).addStyleClass("margin");
oCell.addContent(oTV);
oMatrix.createRow(oCell);


// Form
var oMatrixPers = new sap.ui.commons.layout.MatrixLayout({
    layoutFixed : false,
    width : '300px',
    columns : 2 });

// Last Name
var oLabel = new sap.ui.commons.Label({
    text : 'Last Name' }).addStyleClass("margin");
var oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{lastname}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);


//First Name
oLabel = new sap.ui.commons.Label({
    text : 'First Name' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{firstname}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);


//Company
oLabel = new sap.ui.commons.Label({
    text : 'Company' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{name}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);


//Department
oLabel = new sap.ui.commons.Label({
    text : 'Department' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    id : 'department',
    editable : false,
    value : '{department}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);

//Function
oLabel = new sap.ui.commons.Label({
    text : 'Function' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    id : 'function',
    editable : false,
    value : '{function}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);

//Address
oLabel = new sap.ui.commons.Label({
    text : 'Street' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{street}',
    width : '150px' });
oLabel.setLabelFor(oTF);
var oTF2 = new sap.ui.commons.TextField({
    editable : false,
    value : '{house_no}',
    width : '50px',
    maxLength : 5 });

//Street and Housenum
oCell = new sap.ui.commons.layout.MatrixLayoutCell();
oCell.addContent(oTF);
oCell.addContent(oTF2);
oMatrixPers.createRow(oLabel, oCell);

//City
oLabel = new sap.ui.commons.Label({
    text : 'City' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{city}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);

//Telephone
var oCell = new sap.ui.commons.layout.MatrixLayoutCell();
oLabel = new sap.ui.commons.Label({
    text : 'Telephone' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    id : 'telephone',
    editable : false,
    value : '{tel1_numbr}',
    width : '150px' });
oTF2 = new sap.ui.commons.TextField({
    id : 'telephone_ext',
    editable : false,
    value : '{tel1_ext}',
    width : '50px' });
oLabel.setLabelFor(oTF);
oCell = new sap.ui.commons.layout.MatrixLayoutCell();
oCell.addContent(oTF);
oCell.addContent(oTF2);
oMatrixPers.createRow(oLabel, oCell);

//Fax
oLabel = new sap.ui.commons.Label({
    text : 'Fax' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{fax_number}',
    width : '150px' });
oTF2 = new sap.ui.commons.TextField({
    editable : false,
    value : '{fax_extens}',
    width : '50px' });
oLabel.setLabelFor(oTF);
oCell = new sap.ui.commons.layout.MatrixLayoutCell();
oCell.addContent(oTF);
oCell.addContent(oTF2);
oMatrixPers.createRow(oLabel, oCell);

//Email
oLabel = new sap.ui.commons.Label({
    text : 'E-Mail' }).addStyleClass("margin");
oTF = new sap.ui.commons.TextField({
    editable : false,
    value : '{e_mail}',
    width : '200px' });
oLabel.setLabelFor(oTF);
oMatrixPers.createRow(oLabel, oTF);	

// Buttons
var oButton1 = new sap.ui.commons.Button({
    id : 'B-Change',
    text : 'Change',
    press : oController.toggle
}).addStyleClass("margin");

var oButton2 = new sap.ui.commons.Button({
    id : 'B-Save',
    text : 'Save',
    enabled: false,
    press : oController.save
});

oMatrixPers.createRow(oButton1, oButton2);

//Picture
var oImg = new sap.ui.commons.Image("oImg",{
	height : '200px',
	src : 'img/vcard.png' });

$.ajax({	// Ajax call to get the picture
	url : "/ui5/?application=portal&area=get_picture",
    success : function(data, textStatus, jqXHR) {
   	if(jqXHR.getResponseHeader("Content-Type").indexOf("image")!=-1){
   		oImg.setSrc("/ui5/?application=portal&area=get_picture");
   		oImg.rerender();
   	}
}});

// Fileuploader
var oFileUploader = new sap.ui.commons.FileUploader({
   id:"FileUploader",
   width:"350px",
   uploadOnChange: false,
   visible: false,
   uploadUrl: "/ui5?application=portal&area=set_picture",
   }).attachUploadComplete(
      function(){
    	  var oImg = sap.ui.getCore().byId("oImg");
			oImg.rerender();
      });

// Button to start upload
var oTriggerButton = new sap.ui.commons.Button({
	id:"UploadButton",
	text:'Upload',
    width:"100px",
    enabled: false,
    press:function() {
     oFileUploader.upload();
  }
  });

var oLayoutPic = new sap.ui.layout.VerticalLayout({
	content: [oImg, oFileUploader, oTriggerButton]
});


oMatrix.createRow(oMatrixPers, oLayoutPic );

oMatrix.bindElement("/");

return oMatrix;
}
});

