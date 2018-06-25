Imports System.Data
Imports MySql.Data.MySqlClient
Imports System.Collections.Generic
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Net.Mail
Imports System.IO
Imports System.Net
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports AjaxControlToolkit



Partial Class Mapping_BroExlusiveList
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Dim CustID As ULong = CInt(Request.QueryString("CustomerID"))
        '    If CustID = 0 Or CustID >= 1000000 Then
        '        Response.Write("<h1>You are not logged in.</h1>")
        '        Response.Write("Please reload <a href=""http://www.cmainfo.co.za"" target=""_top"">www.cmainfo.co.za</a> and log-in again.")
        '        Response.End()
        '    End If
        hfBroID.Value = Request.QueryString("BroID")
        hfCustomerID.Value = Request.QueryString("CustomerID")

    End Sub

    <WebMethod()> Public Shared Function GetBroDetails(BroID As Integer, CustomerID As Integer) As String

        'Dim BroID As Integer = HttpContext.Current.Request.QueryString("BroID")
        'Dim CustomerID As Integer = HttpContext.Current.Request.QueryString("CustomerID")
        'Dim BroID As Integer = HttpContext.Current.Session("BroID")
        'Dim CustomerID As Integer = HttpContext.Current.Session("CustomerID")
        Dim ConnectionString As String = ConfigurationManager.ConnectionStrings("CMAConnection").ConnectionString
        Dim CMAConnection As MySqlConnection = New MySqlConnection(ConnectionString)
        Dim CMACommand As MySqlCommand = New MySqlCommand()
        Dim BroEditDataSet As DataSet = New DataSet
        Dim CMADataAdapter As MySqlDataAdapter = New MySqlDataAdapter

        CMACommand.Connection = CMAConnection
        CMACommand.CommandType = CommandType.StoredProcedure
        CMACommand.CommandText = "spBroReadEdit"
        CMACommand.Parameters.AddWithValue("?_BroID", BroID)
        CMADataAdapter.SelectCommand = CMACommand
        CMADataAdapter.Fill(BroEditDataSet)

        Dim JsonFormat As JavaScriptSerializer = New JavaScriptSerializer()
        Dim BroEditInfo As Dictionary(Of String, String) = New Dictionary(Of String, String)

        Dim EditData As DataTable = BroEditDataSet.Tables(0)
        For i As UShort = 0 To EditData.Columns.Count - 1
            BroEditInfo.Add(EditData.Columns(i).ColumnName, EditData.Rows(0).Item(i))
        Next

        For Each s In Directory.GetFiles(HttpContext.Current.Server.MapPath("/Images/Brochure/" & CustomerID), BroID & "_*_crop.*")
            Dim fn As String = Path.GetFileName(s)
            Dim a As String() = fn.Split("_")
            BroEditInfo.Add("iu" & a(1), "/Images/Brochure/" & CustomerID & "/" & fn)
        Next

        Return JsonFormat.Serialize(BroEditInfo)

    End Function
End Class
