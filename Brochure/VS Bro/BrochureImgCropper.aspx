<%@ Page Language="VB" Theme="Brochure" AutoEventWireup="false" CodeFile="BrochureImgCropper.aspx.vb" Inherits="BrochureImgCropper" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>crop Photo</title>
    <link rel="stylesheet" type="text/css" href="../JavaScript/crop/imgareaselect-default.css" />
</head>
    
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
            <Scripts>
                <asp:ScriptReference Path="~/JavaScript/jquery/jquery-1.9.1.min.js" />
                <asp:ScriptReference Path="~/JavaScript/crop/jquery.imgareaselect.js" />
            </Scripts>
        </asp:ScriptManager>
        <asp:HiddenField runat="server" ID="hfpos" />
        <asp:HiddenField runat="server" ID="hfcrop" />
           <img src='' style="margin-left:auto; margin-right:auto;" id="upcrop" />
            <input type="hidden" id="x" name="x" />
            <input type="hidden" id="y" name="y" />
            <input type="hidden" id="w" name="w" />
            <input type="hidden" id="h" name="h" />
            <input type="button" value="Crop Image" onclick="crop()" />
    </form>
</body>

    <script type="text/javascript">

        var is_msie = /msie/.test(navigator.userAgent.toLowerCase());
        var jcrop_obj;

        $(document).ready(function () {
            $("#upcrop").prop("src", $("#<%=hfcrop.ClientID%>").val())

            $("#upcrop").imgAreaSelect({
                handles: true,
                //aspectRatio: "4:3",
                onSelectEnd: updateCoords
            });
        });

        function updateCoords(i, c) {
            $('#x').val(c.x1);
            $('#y').val(c.y1);
            $('#w').val(c.width);
            $('#h').val(c.height);
        };

        function crop() {
            if (parseInt($('#w').val()) > 0) {
                PageMethods.CropImg($("#<%=hfcrop.ClientID%>").val(), $('#x').val(), $('#y').val(), $('#w').val(), $('#h').val(), onCrop)
            }
            else {
                alert('Please select a crop region then press submit.');
            }
        };

        function onCrop(result) {

            parent.$("#tn" + $("#<%=hfpos.ClientID%>").val()).html("<img src='" + result + "'>");
            parent.$.colorbox.close();
        }
    </script>
</html>
