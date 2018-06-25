<%@ Page Language="VB" AutoEventWireup="false" CodeFile="BroSelectEdit.aspx.vb" Inherits="Mapping_BroSelectEdit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
<form id="form1" runat="server">
<asp:ScriptManager EnablePageMethods="true" runat="server">
        <Scripts>
            <asp:ScriptReference Path="~/JavaScript/jquery/jquery-1.9.1.min.js" />
        </Scripts>
</asp:ScriptManager>
     <div>
            <h1> Edited Brochure List</h1>
        </div>
        <div class="paragraph">
            <p>Below is a list of your previous brochures that you have edited. </p>
        </div>
        <hr />

        <table style="width:300px;">
            <tr>
                <th>Name of Brochure</th>
                <th>Date </th>
                <th> </th>
            </tr>
            <tr>
                <td>test 1</td>
                <td>test 2</td>
                <td>test 3</td>              
            </tr>
        </table>
    </form>
</body>
    <script>


    </script>
</html>
