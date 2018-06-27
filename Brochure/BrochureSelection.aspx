<%@ Page Language="VB" AutoEventWireup="false" Theme="" CodeFile="BrochureSelection.aspx.vb" Inherits="Mapping_BrochureSelection" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Brochure Selection</title> 
	<meta charset="utf-8" />
    <style>
        *
        {
            font-family: Tahoma,sans-serif;
        }

        Table.BroSelectTable
        {
            
        }

        Table.BroSelectTable td
        {
            cursor:pointer;
            vertical-align:top;
        }

        Table.BroSelectTable td img
        {
            float:left;
        }

    </style>
</head>
<body>
    <form id="form1" runat="server">

    <asp:ScriptManager EnablePageMethods="true" runat="server">
        <Scripts>
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery-2.2.4.min.js" />
        </Scripts>
    </asp:ScriptManager>

        <div class="Edit">
            <a href="BrochureCreator.aspx" onclick="EditBro();">Edit</a>
        </div>
        <div>
            <h1> Real estate brochures</h1>
        </div>
        <div class="paragraph">
            <p>Below you will find brochure templates. They are free and open for your use. </p>
        </div>
        <hr />
        <asp:Literal ID="BroTable" runat="server"></asp:Literal>
    </form>
</body>
    <script type="text/javascript">

        $(document).ready(function () {

            $("td[id^='Bro']").click(function () {
               PageMethods.BroSelecting(this.id, checkBro);
              });
            //PageMethods.EditBroDetails(EditBro);
        });

        function checkBro(result)
        {
            location.href = "BrochureCreator.aspx"
        }

        //function EditBro(result) {

        //}

    </script>
</html>
