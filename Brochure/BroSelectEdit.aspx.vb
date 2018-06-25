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

Partial Class Mapping_BroSelectEdit
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim CustID As ULong = CInt(Session("CustomerID"))
        'If CustID = 0 Or CustID >= 1000000 Then
        '    Response.Write("<h1>You are not logged in.</h1>")
        '    Response.Write("Please reload <a href=""http://www.cmainfo.co.za"" target=""_top"">www.cmainfo.co.za</a> and log-in again.")
        '    Response.End()
        'End If

        'hfIsPostback.Value = Page.IsPostBack

        Dim ConnectionString As String = ConfigurationManager.ConnectionStrings("CMAConnection").ConnectionString
        Dim CMAConnection As MySqlConnection = New MySqlConnection(ConnectionString)
        Dim CMACommand As MySqlCommand = New MySqlCommand()
        Dim BroExistingDataSet As DataSet = New DataSet
        Dim CMADataAdapter As MySqlDataAdapter = New MySqlDataAdapter
        CMACommand.Connection = CMAConnection
        CMACommand.CommandType = CommandType.StoredProcedure
        CMACommand.CommandText = "spBroExistingForUser"
        CMACommand.Parameters.AddWithValue("?_CustomerID", CustID)
        CMACommand.Parameters.AddWithValue("?_Region", Session("Region"))
        CMADataAdapter.SelectCommand = CMACommand
        CMADataAdapter.Fill(BroExistingDataSet)

    End Sub

End Class
