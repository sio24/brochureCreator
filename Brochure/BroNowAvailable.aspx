<%@ Page Language="VB" AutoEventWireup="false" Theme="" CodeFile="BroNowAvailable.aspx.vb" Inherits="Mapping_BroNowAvailable" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Now Available</title>
	<meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="BroNowAvailableStyle.css"/>
</head>
<body>
    <form id="form1" runat="server">
     <div class="portrait">
    <asp:ScriptManager EnablePageMethods="true" runat="server">
        <Scripts>
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery-2.2.4.min.js" />
        </Scripts>
    </asp:ScriptManager>
        <asp:HiddenField ID="hfBroID" runat="server" />
        <asp:HiddenField ID="hfCustomerID" runat="server" />
    <div class="hdImg">
        <img src="../Images/Brochure/New folder/broImg.png"/>
    </div>
         <div class="bgImg" id="iu0">
            <img src="http://placehold.it/400x400" alt="" />
        </div>
         <div class="propImg1">
             <img src="http://placehold.it/200x200/01060b" />
         </div>
         <div class="propImg2">
             <img src="http://placehold.it/200x200/01060b" />
         </div>
         <div class="propImg3">
             <img src="http://placehold.it/200x200/01060b" />
         </div>
         <div class="propImg4">
             <img src="http://placehold.it/200x200/01060b" />
         </div>
              <div class="PropBedImg">
             <img src="../Images/Brochure/bedroom.png" />   
        </div>  
         <div id="tbPBedrooms">

         </div>
            <div class="PropBathImg" >
             <img src="../Images/Brochure/bathrooms.png" />4
        </div> 
         <div id="tbPBathrooms"></div>   
            <div class="PropGarageImg" id="tbPGarages">
             <img src="../Images/Brochure/garage.png" />4
        </div> 
         <%--<div class="propAddrPrice">--%>
            <div id="tbPropAddress"></div>
          <div id="tbPropSuburb"></div>
             <div id="tbPropPrice"></div>
         <%--</div>--%>
         <div class="PropWebRef" id="tbWebRef">
                <div> Web Reference :</div>
             </div>
        <div class="ErfSize" id="tbErfSize">
            Erf Size: 

        </div>
         
         <div class="ftImg">
             <img src="../Images/Brochure/New folder/broImg1.png" />
         </div>
         <div class="agentImg" id="iuAgent1">
            <img src="http://placehold.it/100x100/01060b" />
        </div>
        <div class="propDesc" id="tbPropDescription">
           
        </div>
         <%-- <div>--%>
            <div class="propList" id="tbPropDetails">
                
            </div>
      <%-- </div>--%>
         <table class="Details">
            <tr>
                <td>
                 <span id="tbFirstName"></span> <span id="tbSurname"></span><br/>
                        Office :<span id="tbOffice"></span><br/>
                        Fax :<span id="tbFax"></span><br/>
                        Cell :<span id="tbCell"></span><br/>
                       <span id="tbEmail"></span><br />
                       <span id="tbWebsite"></span><br/>
                </td>
           </tr>
        </table>
          <div class="logoImg" id="iuLogo">
              <img src="http://placehold.it/250x150/01060b" />
       </div>
         <div class="Disclaimer">
             Information has not been verified is not guaranteed, and is subject to change.
        </div>
         <div class="ieasaLogoImg" id="imIEASALogo">
            <img src="/Images/Brochure/ieasa.png" />Member
        </div>
    </div>
    </form>
</body>
     <script type="text/javascript">

         $(document).ready(function () {
             PageMethods.GetBroDetails($("#<%=hfBroID.ClientID%>").val(), $("#<%=hfCustomerID.ClientID%>").val(), BroEditInfo);
        });

        function BroEditInfo(result) {
            var BroEditInfo = JSON.parse(result);
            $.each(BroEditInfo, function (index, value) {
                var $elem = $('[id$="' + index + '"]').last();
                if ($elem.length > 0) {
                    switch ($elem[0].id.substring(0, 2)) {
                        case "tb":
                            $elem.html(value);
                            break;
                        case "im":
                            $elem.css({ display: (value == "0") ? "none" : " " })
                            break;
                        case "iu":
                            if (index == "Logo") {
                                $elem.html('<img src="/Images/Subscribers/' + value + '" />')
                            }
                            else {
                                $elem.html('<img src="' + value + '" />')
                            }
                            break;
                    }
                }
            });

            // Size and position background image 400/400
            var $bgImg = $(".bgImg img");
            $bgImg.one("load", function () {
                var bgImg = $bgImg[0];
                var w = bgImg.width;
                var h = bgImg.height;

                var divRatio = 400 / 400;
                var imgRatio = w / h;

                var w1, h1, t = 0, l = 0, factor = 1;
                if (divRatio < imgRatio) {
                    factor = 400 / h;
                }
                else {
                    factor = 400 / w;
                }

                w1 = Math.round(w * factor);
                h1 = Math.round(h * factor);
                if (divRatio < imgRatio) {
                    l = Math.abs((w1 - 400) / 2) * -1;
                }
                else {
                    t = Math.abs((h1 - 400) / 2) * -1;
                }
                $bgImg.css({ width: w1, height: h1, top: t, left: l });
            }).each(function () {
                if (this.complete) { $(this).load() }
            });

            //Size and position of smaller images.
            var $propImg = $("[class^='propImg'] img");
            $propImg.one("load", function () {
                var propImg = $propImg[0];
                var w = propImg.width;
                var h = propImg.height;

                var divRatio = 190 / 190;
                var imgRatio = w / h;

                var w1, h1, t = 0, l = 0, factor = 1;
                if (divRatio < imgRatio) {
                    factor = 190 / h;
                }
                else {
                    factor = 190 / w;
                }

                w1 = Math.round(w * factor);
                h1 = Math.round(h * factor);
                if (divRatio < imgRatio) {
                    l = Math.abs((w1 - 190) / 2) * -1;
                }
                else {
                    t = Math.abs((h1 - 190) / 2) * -1;
                }
                $propImg.css({ width: w1, height: h1, top: t, left: l });
            }).each(function () {
                if (this.complete) { $(this).load() }
            });
        }

    </script>
</html>
