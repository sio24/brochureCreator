<%@ Page Language="VB" Theme="Brochure" AutoEventWireup="false" CodeFile="BrochureCreator.aspx.vb" Inherits="BrochureCreator" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Brochure Creator</title>
	<meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../JavaScript/uploadify/uploadify.css" />
    <link rel="stylesheet" type="text/css" href="../JavaScript/jqueryMaxLength/jquery.maxlength.css" /> 
</head>
<body>
<form id="form1" runat="server"> 
    <asp:ScriptManager EnablePageMethods="true" runat="server">
        <Scripts>
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery-2.2.4.min.js" />
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery.colorbox.js"/>
            <asp:ScriptReference Path="~/JavaScript/uploadify/jquery.uploadify.min.js"/>
            <asp:ScriptReference Path="~/JavaScript/jqueryMaxLength/jquery.maxlength.js" />
        </Scripts>
    </asp:ScriptManager>
<asp:HiddenField ID="hfBroID" runat="server" />
<asp:HiddenField ID="hfCustID" runat="server" />
<asp:HiddenField ID="hfBroName" runat="server" />
<asp:HiddenField ID="hfEdit" runat="server" />
    <div>
        <!--Company address details-->
         <table id="AgentAddress" class="form-body">
            <tr>
                <th colspan="2">
                    <div class="title" style="font-size: large; text-align: left;">Business Address :</div>
                </th>
            </tr>
            <tr>
                <td class="label"><span class="label-required">Company Name :</span>
                    <input name="compName" value="" type="text" size="30" maxlength="35" id="tbCompany" /> 
                </td>
                <td class="label"><span class="label-required">Address 1 :</span>
                    <input name="compAddress1" value="" type="text" size="45" maxlength="64" id="tbAddress1" />
               </td>
            </tr>
              <tr>
                    <td></td>
                <td class="label"><span class="label-required">Address 2 :</span>
                    <input name="compAddress2" value="" type="text" size="45" maxlength="64" id="tbAddress2" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="label"><span class="label-required">Address 3 :</span>
                    <input name="compAddress3" value="" maxlength="64" size="45" type="text" id="tbAddress3" />
            </tr>
            <tr>
               <td></td>
                <td class="label"><span class="label-required">Address 4 :</span>
                    <input name="compAddress4" value="" maxlength="64" size="45" type="text" id="tbAddress4" />
                </td>
            </tr>
             <tr>
                <td class="label">Office :
                    <input name="Office" value="" maxlength="32" type="text" id="tbOffice" size="15" />
                </td>
                  <td class="label">Fax :
                      <input name="fax" value="" maxlength="32" type="text" id="tbFax" size="15" />
                  </td>
            </tr>
             <tr>
                <td class="label">Company or Personal Website :
                         <input name="website" value="" maxlength="64" type="text" id="tbWebsite" size="40"  />
                </td>
            </tr>
              <tr>
                 <td class="label">Company Logo : </td>
                
            <td>
                 <input type="file" name="file_upload" id="iuLogo" />
            </td>
                <td>&nbsp;<button type="button" class="but" id="irLogo" style="display: none;">Remove Image</button></td>

            <td>
                  <span class="thumbarea" id="tnLogo"></span>
            </td>
        </tr>
        <tr>
            <!--IEASA Logo-->
             <td class="label"><b>OPTIONAL IEASA Logo</b>
                    <div class="note">(optional)</div>
            </td>
            <td class="input">
                   <table class="radio">
                         <tr>
                            <td class="checkbox-input">
                                <input name="r_logo" id="r_logo_1" type="radio" value="IEASALogo" />
                            </td>
                            <td class="checkbox-label">
                                <label for="r_logo_1"  >
                                    <center>IEASA Logo</center>
                                <img src="/Images/Brochure/ieasa.gif" alt="" /></label>
                            </td>
                            <td class="checkbox-input">
                            <input name="r_logo" id="r_logo_0" type="radio" value="Off"  checked="checked" />
                        </td>
                        <td class="checkbox-label">
                            <label for="r_logo_0">Off</label>
                        </td>
                        </tr>
                    </table>
           </td>
            <td>&nbsp;</td>
        </tr>
        </table>
        <br />

        <!--Agent details for either one or two agents-->

        <table id="AgentDetails" class="form-body">
            <tr>
                 <th colspan="2">
                    <div class="title" style="font-size:large; text-align: left;"> Agent Details :</div>
                        <div class="subheader" style="font-size:larger; text-align:center;">
                         <div>Agent 1  </div>
                     </div>
                </th>
            </tr>
            <tr>
                <td class="label">First Name :
                    <input name="firstName" value="" type="text" size="20" maxlength="64" id="tbFirstName" />
                </td>
                <td class="label">Last Name :
                    <input name="lastName" value="" type="text" size="20" maxlength="64" id="tbSurname" />
                </td>
            </tr>
            <tr>
                <td class="label">
                    <input type="hidden" name="email_label" value="Email:" />
                       <span>Email :</span>
                    <input name="email_label" value="" maxlength="64" type="text" size="45" id="tbEmail" />
                </td>
                <td class="label">Cell :
                    <input name="Cell" value="" maxlength="32" type="text" id="tbCell" size="15" />
                </td>
            </tr>
           <tr>
                 <td class="label">
                     Upload a picture of yourself :               
                 </td>
                      <td> 
                          <input type="file" id="iuAgent1" />
                    </td>
                       <td>&nbsp;<button type="button" class="but" id="irAgent1" >Remove Image</button></td>
               <td>                 
                   <span class="thumbarea" id="tnAgent1"></span>
              </td>
        </tr>
             <tr id="ag2Details">
                 <th colspan="2">
                        <div class="subheader" style="font-size:larger; text-align:center;">
                         <div>Agent 2  </div>
                     </div>
                </th>
            </tr>
            <tr id="ag2FullName">
                <td class="label">First Name :
                    <input name="firstName2" value="" type="text" size="20" maxlength="64" id="tbFirstName2" />
                </td>
                <td class="label">Last Name :
                    <input name="lastName2" value="" type="text" size="20" maxlength="64" id="tbSurname2" />
                </td>
            </tr>
            <tr id="ag2Contact">
                <td class="label">
                    <input type="hidden" name="email_label" value="Email:" />
                       <span>Email :</span>
                    <input name="email_label2" value="" maxlength="64" type="text" size="45" id="tbEmail2" />
                </td>
                 <td class="label">Cell :
                         <input name="Cell2" value="" maxlength="32" type="text" id="tbCell2" size="15" />
                 </td>
            </tr>
            <tr id="ag2PhotoUp">
                  <td class="label">Upload a picture of yourself :</td>
                  <td>
                      <input type="file" id="iuAgent2" />
                  </td>
                       <td>&nbsp;<button type="button" class="but" id="irAgent2" >Remove Image</button></td>
                <td>
                     <span class="thumbarea" id="tnAgent2"></span>
                </td>
           </tr>
        </table>       
<br />
        <!--Property Information details-->
        <table id="PropertyDetails" class="form-body">
            <tr>
                <th colspan="2">
                  <div class="title" style="font-size:large; text-align: left;"> Property Details :</div>
                </th>
            </tr>
    <tr>
            <td class="label"><b>Address :</b>
                <input value="" type="text" size="40" maxlength="50" class="tbAddress1" />
            </td>
           <td class="label"><span class="label-required"><b>Suburb :</b></span>
                 <input value="" type="text" size="40" maxlength="40" id="tbSuburb" />
            </td>
        </tr>
                   <tr>
                   <td class="label"><b>Price :</b>
                        <input value="" type="text" size="30" maxlength="30" id="tbPrice" />
                    </td>
                    <td class="label"><b>Erf Size :</b>
                        <input value="" type="text" size="30" maxlength="30" id="tbErfSize" />
                    </td>
                    <td class="label"><b>Web Ref :</b>
                        <input value="" type="text" size="20" maxlength="20" id="tbWebRef" />
                    </td>
                </tr>
           <tr>
                    <td class="label"><b>No Bedrooms :</b>
                        <input value="" type="text" size="5" maxlength="5" id="tbBedrooms" />
                    </td>
                   <td class="label"><b>No Bathrooms :</b>
                        <input value="" type="text" size="5" maxlength="5" id="tbPBathrooms" />
                    </td>
                <td class="label"><b>No Garages :</b>
                        <input value="" type="text" size="5" maxlength="5" id="tbPGarages" />
                    </td>
                </tr>
                <tr>
                    <td class="label"><b>Property Details :</b>
                        <div class="form-sublabel">List details about the property.<br />Use the default values in each field as a guide.</div>
                    </td>
                    <td class="input">
                        <textarea rows="10" cols="35" onchange="" id="tbDetails"></textarea>
                    </td>
                </tr>
                <tr>
                   <td class="label"><b>Property Description :</b>
                        <div class="form-sublabel">Give a brief description about the property.<br />Use the default values in each field as a guide.</div>
                    </td>
                    <td class="input">
                        <textarea rows="10" cols="35" onchange="" id="tbPropDescription"></textarea>
                    </td>
                </tr>
        </table>
        <br />
        <!-----property photo's------------>
        <table id="PropertyPhotos" class="form-body">
            <tr>
                <th colspan="2">
                  <div class="title" style="font-size:large; text-align: left;"> Property Photo's :</div>
                </th>
            </tr>
            <tr>
            <td class="label"><b>PHOTO 0</b>
                <div class="form-sublabel">This is the main art for the flyer. Choose a good shot of the property's exterior</div>
                    <div class="note">(optional)</div>
            </td>
                <td class="input">
                      <input type="file" name="file_upload" id="iu0" />
            </td>
                <td>&nbsp;<button type="button" class="btnRemove" id="ir0" >Remove Image</button></td>
            <td>
                <span class="thumbarea" id="tn0"></span>
            </td>
        </tr>
        <tr>
            <td class="label"><b>PHOTO 1</b>
                <div class="form-sublabel">Use supplementary photo -- such as shots of interior rooms or the back yard -- in the three remaining slots</div>
                <div class="note">(optional)</div>
            </td>
            <td>
                 <input type="file" name="file_upload" id="iu1" />
            </td> 
             <td>&nbsp;<button type="button" class="btnRemove" id="ir1" >Remove Image</button></td>          
            <td>
                <span class="thumbarea" id="tn1"></span>
            </td>
        </tr>
        <tr>
            <td class="label"><b>PHOTO 2</b>
                 <div class="note">(optional)</div>
            </td>
             <td>
                <input type="file" name="file_upload" id="iu2" />
            </td>
                <td>&nbsp;<button type="button" class="btnRemove" id="ir2" >Remove Image</button></td>
            <td>
                <span class="thumbarea" id="tn2"></span>
            </td>
        </tr>
         <tr>
            <td class="label"><b>PHOTO 3</b>
                  <div class="note">(optional)</div>
            </td>
             <td>
               <input type="file" name="file_upload" id="iu3" />
            </td> 
                 <td>&nbsp;<button type="button" class="btnRemove" id="ir3" >Remove Image</button></td>         
            <td>
                <span class="thumbarea" id="tn3"></span>
            </td>
        </tr>
        <tr>
            <td class="label"><b>PHOTO 4</b>
                 <div class="note">(optional)</div>
            </td>
             <td>
                 <input type="file" name="file_upload" id="iu4" />
            </td>
                 <td>&nbsp;<button type="button" class="btnRemove" id="ir4">Remove Image</button></td>           
            <td>
                <span class="thumbarea" id="tn4"></span>
            </td>
        </tr>
        <tr id="img5">
            <td class="label"><b>PHOTO 5</b>
                  <div class="note">(optional)</div>
            </td>
             <td>
              <input type="file" name="file_upload" id="iu5" />
            </td> 
                 <td>&nbsp;<button type="button" class="btnRemove" id="ir5">Remove Image</button></td>          
            <td>
                <span class="thumbarea" id="tn5"></span>
            </td>
        </tr>
        <tr id="img6">
            <td class="label"><b>PHOTO 6</b>
               <div class="note">(optional)</div>
            </td>
             <td>
                 <input type="file" name="file_upload" id="iu6" />
            </td>
                <td>&nbsp;<button type="button" class="btnRemove" id="ir6">Remove Image</button></td>
           <td>
                <span class="thumbarea" id="tn6"></span>
            </td>
        </tr>
        <tr id="img7">
            <td class="label"><b>PHOTO 7</b>
                 <div class="note">(optional)</div>
            </td>
            <td>
                 <input type="file" name="file_upload" id="iu7" />
            </td>   
                 <td>&nbsp;<button type="button" class="btnRemove" id="ir7">Remove Image</button></td>         
            <td>
                <span class="thumbarea" id="tn7"></span>
            </td>
        </tr>
        <tr id="img8">
            <td class="label"><b>PHOTO 8</b>
               <div class="note">(optional)</div>
            </td>
             <td>
                <input type="file" name="file_upload" id="iu8" />
            </td>
                 <td>&nbsp;<button type="button" class="btnRemove" id="ir8">Remove Image</button></td>
            <td>
                <span class="thumbarea" id="tn8"></span>
            </td>
        </tr>
        <tr id="img9">
            <td class="label"><b>PHOTO 9</b>
                  <div class="note">(optional)</div>
            </td>
            <td>
                <input type="file" name="file_upload" id="iu9" />
            </td>
                <td>&nbsp;<button type="button" class="btnRemove" id="ir9">Remove Image</button></td>
           <td>
                <span class="thumbarea" id="tn9"></span>
            </td>
        </tr>
        </table>
        <table class="form-body">
                <tr>
                    <td colspan="2" class="submit center">
                            <button type="button" class="btnCancel" id="cancel"  value="1" onclick="CancelBro();">Discard this item</button>
                        <span id="submit">
                            <button type="button" class="btnSubmit" id="Submit"  value="1" onclick="btnSubmit();">Generate Proof</button>
                        </span>
                        <span>
                            <button type="button" class="btnEdit" id="Edit" value=""  onclick="btnEdit();" style="display:none;">Edit Brochure</button> 
                        </span>
                    </td>
                </tr>
            </table>
    </div>
    </form>
</body>
<script type="text/javascript">

    var BroID,CustID,BroName,edit;
    $(document).ready(function () {

        BroName = $("#<%=hfBroName.ClientID%>").val();
        CustID = $("#<%=hfCustID.ClientID%>").val();
        BroID = $("#<%=hfBroID.ClientID%>").val();
        edit = $("#<%=hfEdit.ClientID%>").val();
        $.each(["Agent1", "Agent2", 0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, "Logo"], function (index, value) {
            $('#iu' + value).uploadify({
                'fileSizeLimit': '1.5MB',
                'fileTypeDesc': 'Image Files',
                'fileTypeExts': '*.gif; *.jpg; *.jpeg; *.png',
                'swf': '/JavaScript/uploadify/uploadify.swf',
                'uploader': '/JavaScript/uploadify/ImgHandler.ashx?pos=' + value + '&BroID=' + BroID + '&CustID=' + CustID,
                'onUploadComplete': function (file) {
                    $("#ir" + value).css({ display: "" });
                    $.colorbox({ iframe: true, href: "/Mapping/BrochureImgCropper.aspx?file=" + BroID + "_"+ value + file.type + "&pos="+ value, width: "95%", height: "95%" });
                }
            });
        });
        // this os for the details and description sections to set a max length of characters used.
        $.maxlength.setDefaults({ showFeedback: true });
        $("#tbPropDetails").maxlength({ max: 200, truncate: false, onFull: function (overflowing) { if (!overflowing) { alert('This field is ' + (overflowing ? 'overflowing' : 'full')) } } });
        $("#tbPropDescription").maxlength({ max: 500, truncate: false, onFull: function (overflowing) { if (!overflowing) { alert('This field is ' + (overflowing ? 'overflowing' : 'full')) } } });

        if (edit == "false") {
            PageMethods.GetAgentDetails(agentResults);
        }
        else {
            PageMethods.GetExistingBroDetails(BroID, agentResults);
        }

        // this is to check which template has been selected and to hide the sections that is not needed in those specific templates.
        switch (BroName) {
            case "BroExlusiveList":
                $("#ag2Details, #ag2FullName, #ag2Contact, #ag2PhotoUp, #RemoveA2, #img5, #tn5, #photo_5_removebutton, #img6, #tn6, #photo_6_removebutton ,#img7, #tn7, #photo_7_removebutton, #img8, #tn8, #photo_8_removebutton, #img9, #tn9, #photo_9_removebutton").css({ display: "none" });
                break;
            case "BroNowAvailable":
                $("#ag2Details, #ag2FullName, #ag2Contact, #ag2PhotoUp, #RemoveA2, #img5, #tn5, #photo_5_removebutton, #img6, #tn6, #photo_6_removebutton ,#img7, #tn7, #photo_7_removebutton, #img8, #tn8, #photo_8_removebutton, #img9, #tn9, #photo_9_removebutton").css({ display: "none" });
                break;
        }

        $("#irAgent1, #irAgent2, #ir0, #ir1, #ir2, #ir3, #ir4, #ir5, #ir6, #ir7, #ir8, #ir9, #irLogo").css({ display: "none" }).click(function ()
        {
            var pic = $("#tn" + this.id.slice(2) + " img");
            if (confirm("are you sure you want to remove this picture"))
            {
                PageMethods.DeleteBroImg(pic[0].src,onImgDelete,null,this);
            } 
        });       
    });

    function onImgDelete(result,elem) {
        var thumbSpan = $("#tn" + elem.id.slice(2));
        $(elem).css({ display: 'none' });
        thumbSpan.text("");
                alert("Your image has been removed");
    }

    function agentResults(result) {
        var BroAgentInfo = JSON.parse(result);
        $.each(BroAgentInfo, function (index, value) {
            var $elem = $('[id$="' + index + '"]').last();
            if ($elem.length > 0) {
                switch ($elem[0].id.substring(0, 2)) {
                    case "tb":
                        $elem.val(value);
                        break;
                    case "tn":
                        if (index == "Logo") {
                            $elem.html('<img src="/Images/Subscribers/' + value + '" />')
                        }
                        break;
                }
            }
        });
    }

    function CancelBro() {
        confirm("are you sure you want to close the brochure creator");
        window.close();
    }

    function btnSubmit() {

        PageMethods.SaveBroDetails(
            BroName,
            $("#tbFirstName").val(),
            $("#tbSurname").val(),
            $("#tbFirstName2").val(),         
            $("#tbSurname2").val(),
            $("#tbCompany").val(),
            $("#tbAddress1").val(),
            $("#tbAddress2").val(),
            $("#tbAddress3").val(),
            $("#tbAddress4").val(), 
            $("#tbOffice").val(),
            $("#tbFax").val(),
            $("#tbCell").val(),
            $("#tbCell2").val(),
            $("#tbEmail").val(),
            $("#tbEmail2").val(),
            $("#tbWebsite").val(),
            ($(":radio[name='r_logo']:checked")[0].id.slice(-1)=="1")?true:false,
            $("#tbPropAddress").val(),
            $("#tbPropSuburb").val(),
            $("#tbPropPrice").val(),
            $("#tbPropDetails").val(),
            $("#tbPropDescription").val(),
            $("#tbErfSize").val(),
            $("#tbWebRef").val(),
            $("#tbPBedrooms").val(),
            $("#tbPBathrooms").val(),
            $("#tbPGarages").val(),
            $("#tnLogo img").prop("src"),
            onSaveBroDetails
            );

        $("#Edit").css({ display: "" });
    }

    function onSaveBroDetails(result) {

            //window.open("ViewBroPdf.aspx/BroTemp2.aspx?BroName="+ BroName + "&BroID=" + BroID + "&CustomerID=" + CustID);
        window.open("ViewBroPdf.aspx/BroExlusiveList.aspx?BroName=" + BroName + "&BroID=" + BroID + "&CustomerID=" + CustID);
    };

    
</script>
</html>
