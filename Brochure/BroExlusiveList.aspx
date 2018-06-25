<%@ Page Language="VB" AutoEventWireup="false" theme="" CodeFile="BroExlusiveList.aspx.vb" Inherits="Mapping_BroExlusiveList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Exclusive Listing S</title>
    <link rel="stylesheet" type="text/css" href="BroExlusiveListStyle.css"/>
</head>
<body>
    <form id="form1" runat="server">
    <div class="portrait">
    <asp:ScriptManager EnablePageMethods="true" runat="server">
        <Scripts>
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery-1.9.1.min.js" />
        </Scripts>
    </asp:ScriptManager>
        <asp:HiddenField ID="hfBroID" runat="server" />
        <asp:HiddenField ID="hfCustomerID" runat="server" />
        <div class="bgImg" id="iu0">
            <%--<img src="http://placehold.it/595x570" alt="" />--%>
        </div>
       
        <div class="hdImg">
            <img src="../Images/Brochure/ExclusiveListingSingle/broImg.png" />
        </div>
        
        <div class="propImg1" id="iu1">
            <img src="http://placehold.it/200x200/ffffff" />
        </div>
        <div class="propImg2" id="iu2">
            <img src="http://placehold.it/200x200/ffffff" />
        </div>
        <div>
            <div class="propList" id="tbPropDetails">
          
            </div>
       </div>
         <div class="propAddrPrice">
        <div id="tbPropAddress"></div>
        <div id="tbPropSuburb"></div>
        <div id="tbPropPrice"></div>
    </div>
        <div class="PropWebRef">
            Web Reference :<span id="tbWebRef">24212131241241</span>
        </div>
        <div class="PropErfSize" >
            Erf Size: <span id="tbErfSize"></span>
       </div>
    <div class="PropBedImg" >
         <img src="../Images/Brochure/bedroom.png" />
        <span id="tbPBedrooms"></span>
    </div>  
    <div class="PropBathImg">
         <img src="../Images/Brochure/bathrooms.png" /><div><span id="tbPBathrooms">3</span></div>
    </div>  
        <div class="PropGarageImg" >
         <img src="../Images/Brochure/garage.png" /><span id="tbPGarages"></span>
    </div>  
        
    <div class="tabImg">
        <img src="../Images/Brochure/ExclusiveListingSingle/broTabImg.png" />
    </div>
    <div class="propDesc" id="tbPropDescription"></div>
   <div class="propImg3" id="iu3">
        <img src="http://placehold.it/200x200/ffffff" />
    </div>
    <div class="propImg4" id="iu4">
         <img src="http://placehold.it/200x200/ffffff" />
    </div>
        <div class="agentDetails">       
    </div>
<div class="agentImg" id="iuAgent1">
            <img src="http://placehold.it/80x80/01060b" />
        </div>
 <table class="Details">
            <tr>
                <td>
                 <span id="tbFirstName"></span><span id="tbSurname"></span><br/>
                        Office :<span id="tbOffice"></span><br/>
                        Home :<span id="tbFax"></span><br/>
                        Cell :<span id="tbCell"></span><br/>
                       <span id="tbEmail"></span><br />
                       <span id="tbWebsite"></span><br/>
                </td>
           </tr>
</table>
    <div class="logoImg" id="iuLogo">
        <img src="http://placehold.it/150x66/01060b" />
    </div>
    <div class="ieasaLogoImg" id="imIEASALogo">
        <img src="/Images/Brochure/ieasa.png" />Member
    </div>
    <div class="Disclaimer">
        Information has not been verified is not guaranteed, and is subject to change.
    </div>
         </div>
   </form>
</body>

    <script type="text/javascript">

        $(document).ready(function () {
            PageMethods.GetBroDetails($("#<%=hfBroID.ClientID%>").val(), $("#<%=hfCustomerID.ClientID%>").val(), BroEditInfo);
        });

        function BroEditInfo(result) {

            eval("var BroEditInfo =" + result);
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

            // Size and position background image 595/516
            var $bgImg = $(".bgImg img");
            $bgImg.one("load", function () {
                var bgImg = $bgImg[0];
                var w = bgImg.width;
                var h = bgImg.height;

                var divRatio = 595 / 549;
                var imgRatio = w / h;

                var w1, h1, t = 0, l = 0, factor = 1;
                if (divRatio < imgRatio) {
                    factor = 549 / h;
                }
                else {
                    factor = 595 / w;
                }

                w1 = Math.round(w * factor);
                h1 = Math.round(h * factor);
                if (divRatio < imgRatio) {
                    l = Math.abs((w1 - 595) / 2) * -1;
                }
                else {
                    t = Math.abs((h1 - 549) / 2) * -1;
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

                var divRatio = 126 / 126;
                var imgRatio = w / h;

                var w1, h1, t = 0, l = 0, factor = 1;
                if (divRatio < imgRatio) {
                    factor = 126/ h;
                }
                else {
                    factor = 126 / w;
                }

                w1 = Math.round(w * factor);
                h1 = Math.round(h * factor);
                if (divRatio < imgRatio) {
                    l = Math.abs((w1 - 126) / 2) * -1;
                }
                else {
                    t = Math.abs((h1 - 126) / 2) * -1;
                }
                $propImg.css({ width: w1, height: h1, top: t, left: l });
            }).each(function () {
                if (this.complete) { $(this).load() }
            });


        }

    </script>
</html>
