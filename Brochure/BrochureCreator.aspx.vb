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

Partial Class BrochureCreator
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim CustID As ULong = CInt(Session("CustomerID"))
        If CustID = 0 Or CustID >= 1000000 Then
            Response.Write("<h1>You are not logged in.</h1>")
            Response.Write("Please reload <a href=""http://www.cmainfo.co.za"" target=""_top"">www.cmainfo.co.za</a> and log-in again.")
            Response.End()
        End If

        'hfIsPostback.Value = Page.IsPostBack

        Dim folderCreate As String = Server.MapPath("/Images/Brochure/") & CStr(Session("CustomerID"))

        If (Not System.IO.Directory.Exists(folderCreate)) Then
            System.IO.Directory.CreateDirectory(folderCreate)
        End If

        Dim BroID As Integer = 0
        If Not Request.QueryString("BroID") Is Nothing Then
            BroID = CInt(Request.QueryString("BroID"))
        End If

        If BroID = 0 Then
            'createBrochure in database
            Dim ConnectionString As String = ConfigurationManager.ConnectionStrings("CMAConnection").ConnectionString
            Dim CMAConnection As MySqlConnection = New MySqlConnection(ConnectionString)
            Dim CMACommand As MySqlCommand = New MySqlCommand()
            Dim BroDataSet As DataSet = New DataSet
            Dim CMADataAdapter As MySqlDataAdapter = New MySqlDataAdapter
            CMACommand.Connection = CMAConnection
            CMACommand.CommandType = CommandType.StoredProcedure
            CMACommand.CommandText = "spBroCreate"
            CMACommand.Parameters.AddWithValue("?_CustomerID", CustID)
            CMACommand.Parameters.AddWithValue("?_CMAID", Session("CMAID"))
            CMACommand.Parameters.AddWithValue("?_SchemeNo", Session("SchemeNo"))
            CMACommand.Parameters.AddWithValue("?_SectionNo", Session("SectionNo"))
            CMACommand.Parameters.AddWithValue("?_Region", Session("Region"))
            CMADataAdapter.SelectCommand = CMACommand
            CMADataAdapter.Fill(BroDataSet)

            Session("BroID") = BroDataSet.Tables(0).Rows(0)("Last_Insert_ID()")
            hfBroID.Value = Session("BroID")
            hfCustID.Value = CustID
            hfEdit.Value = "false"
            hfBroName.Value = Session("BroName")
        Else
            hfEdit.Value = "true"
            hfBroID.Value = BroID
            hfCustID.Value = CustID
        End If

    End Sub

    <WebMethod()> Public Shared Function GetExistingBroDetails(ByVal BroID As String) As String

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

        Dim sbGetDetails As New System.Text.StringBuilder
        sbGetDetails.Append("{")
        For Each col As DataColumn In BroEditDataSet.Tables(0).Columns
            sbGetDetails.Append("""")
            sbGetDetails.Append(col.ColumnName)
            sbGetDetails.Append(""":""")
            sbGetDetails.Append(BroEditDataSet.Tables(0).Rows(0).Item(col.ColumnName).ToString.Replace(vbCrLf, "\n\r").Replace(vbLf, "\n").Replace(vbCr, "\r"))
            sbGetDetails.Append(""",")
        Next
        If sbGetDetails.Length > 0 Then
            sbGetDetails.Length = sbGetDetails.Length - 1
        End If
        sbGetDetails.Append("}")


        Return sbGetDetails.ToString

    End Function

    <WebMethod()> Public Shared Function DeleteBroImg(imgUrl As String) As String

        Dim Host As String = "http://" & HttpContext.Current.Request.ServerVariables("HTTP_HOST").ToLower
        imgUrl = imgUrl.ToLower.Replace(Host, "")
        Dim FileToDelete As String = HttpContext.Current.Server.MapPath(imgUrl)
        File.Delete(FileToDelete)
        imgUrl = imgUrl.ToLower.Replace("_crop", "")
        FileToDelete = HttpContext.Current.Server.MapPath(imgUrl)
        File.Delete(FileToDelete)

        Return "ok"

    End Function

    <WebMethod()> Public Shared Function GetAgentDetails() As String
        Dim ConnectionString As String = ConfigurationManager.ConnectionStrings("CMAConnection").ConnectionString
        Dim CMAConnection As MySqlConnection = New MySqlConnection(ConnectionString)
        Dim CMACommand As MySqlCommand = New MySqlCommand()

        Dim AgentDataSet As DataSet = New DataSet
        Dim CMADataAdapter As MySqlDataAdapter = New MySqlDataAdapter
        CMACommand.Connection = CMAConnection
        CMACommand.CommandType = CommandType.StoredProcedure
        CMACommand.CommandText = "spBroAgentInfo"
        CMACommand.Parameters.AddWithValue("?_CustomerID", HttpContext.Current.Session("CustomerID"))
        CMACommand.Parameters.AddWithValue("?_CMAID", HttpContext.Current.Session("CMAID"))
        CMACommand.Parameters.AddWithValue("?_SchemeNo", HttpContext.Current.Session("SchemeNo"))
        CMACommand.Parameters.AddWithValue("?_SectionNo", HttpContext.Current.Session("SectionNo"))
        CMACommand.Parameters.AddWithValue("?_Region", HttpContext.Current.Session("Region"))
        CMADataAdapter.SelectCommand = CMACommand
        CMADataAdapter.Fill(AgentDataSet)
        Dim JsonFormat As JavaScriptSerializer = New JavaScriptSerializer()
        Dim BroAgentInfo As Dictionary(Of String, String) = New Dictionary(Of String, String)

        Dim AgentData As DataTable = AgentDataSet.Tables(0)
        For i As UShort = 0 To AgentData.Columns.Count - 1
            If AgentData.Columns(i).ColumnName = "Logo" Then
                Dim LogoPath As String = AgentData.Rows(0).Item(i)
                'if saved logo for this BroID then
                'LogoPath = path of saved logo
                'End If
                ' for editing of the brochure logo
                BroAgentInfo.Add("Logo", LogoPath)
            Else
                BroAgentInfo.Add(AgentData.Columns(i).ColumnName, AgentData.Rows(0).Item(i))
            End If
        Next
        Dim PropData As DataTable = AgentDataSet.Tables(1)
        For i As UShort = 0 To PropData.Columns.Count - 1
            BroAgentInfo.Add(PropData.Columns(i).ColumnName, PropData.Rows(0).Item(i))
        Next

        Return JsonFormat.Serialize(BroAgentInfo)

    End Function

    'saveBrouchre information
    <WebMethod()> Public Shared Function SaveBroDetails(ByVal TemplateName As String, ByVal FirstName As String, ByVal Surname As String, ByVal FirstName2 As String, ByVal Surname2 As String, ByVal CompanyName As String, ByVal Address1 As String, ByVal Address2 As String, ByVal Address3 As String, ByVal Address4 As String, ByVal Office As String, ByVal Fax As String, ByVal Cell As String, ByVal Cell2 As String, ByVal Email As String, ByVal Email2 As String, ByVal Website As String, ByVal IEASALogo As Boolean, ByVal PropAddress As String, ByVal PropSuburb As String, ByVal PropPrice As String, ByVal PropDetails As String, ByVal PropDescription As String, ByVal ErfSize As String, ByVal WebRef As String, ByVal PropBedrooms As String, ByVal PropBathrooms As String, ByVal PropGarages As String, ByVal LogoPath As String) As String
        If InStr(LogoPath, "/Images/Subscribers/") > 0 Then
            Dim fnLogo As String = LogoPath.Substring(LogoPath.LastIndexOf("/") + 1)
            Dim oldPath As String = HttpContext.Current.Server.MapPath("/Images/Subscribers/")
            Dim newPath As String = HttpContext.Current.Server.MapPath("/Images/Brochure/" & HttpContext.Current.Session("CustomerID") & "/")
            System.IO.File.Copy(oldPath & fnLogo, newPath & HttpContext.Current.Session("BroID") & "_Logo_crop.gif")
        End If

        Dim ConnectionString As String = ConfigurationManager.ConnectionStrings("CMAConnection").ConnectionString
        Dim CMAConnection As MySqlConnection = New MySqlConnection(ConnectionString)
        Dim CMACommand As MySqlCommand = New MySqlCommand()
        Dim BroUpdateDataSet As DataSet = New DataSet
        Dim CMADataAdapter As MySqlDataAdapter = New MySqlDataAdapter
        CMACommand.Connection = CMAConnection
        CMACommand.CommandType = CommandType.StoredProcedure
        CMACommand.CommandText = "spBroUpdate"
        CMACommand.Parameters.AddWithValue("?_BroID", HttpContext.Current.Session("BroID"))
        CMACommand.Parameters.AddWithValue("?_TemplateName", TemplateName)
        CMACommand.Parameters.AddWithValue("?_FirstName", FirstName)
        CMACommand.Parameters.AddWithValue("?_Surname", Surname)
        CMACommand.Parameters.AddWithValue("?_FirstName2", FirstName2)
        CMACommand.Parameters.AddWithValue("?_Surname2", Surname2)
        CMACommand.Parameters.AddWithValue("?_CompanyName", CompanyName)
        CMACommand.Parameters.AddWithValue("?_Address1", Address1)
        CMACommand.Parameters.AddWithValue("?_Address2", Address2)
        CMACommand.Parameters.AddWithValue("?_Address3", Address3)
        CMACommand.Parameters.AddWithValue("?_Address4", Address4)
        CMACommand.Parameters.AddWithValue("?_Office", Office)
        CMACommand.Parameters.AddWithValue("?_Fax", Fax)
        CMACommand.Parameters.AddWithValue("?_Cell", Cell)
        CMACommand.Parameters.AddWithValue("?_Cell2", Cell2)
        CMACommand.Parameters.AddWithValue("?_Email", Email)
        CMACommand.Parameters.AddWithValue("?_Email2", Email2)
        CMACommand.Parameters.AddWithValue("?_Website", Website)
        CMACommand.Parameters.AddWithValue("?_IEASALogo", IEASALogo)
        CMACommand.Parameters.AddWithValue("?_PropAddress", PropAddress)
        CMACommand.Parameters.AddWithValue("?_PropSuburb", PropSuburb)
        CMACommand.Parameters.AddWithValue("?_PropPrice", PropPrice)
        CMACommand.Parameters.AddWithValue("?_PropDetails", PropDetails)
        CMACommand.Parameters.AddWithValue("?_PropDescription", PropDescription)
        CMACommand.Parameters.AddWithValue("?_ErfSize", ErfSize)
        CMACommand.Parameters.AddWithValue("?_WebRef", WebRef)
        CMACommand.Parameters.AddWithValue("?_PropBedrooms", PropBedrooms)
        CMACommand.Parameters.AddWithValue("?_PropBathrooms", PropBathrooms)
        CMACommand.Parameters.AddWithValue("?_PropGarages", PropGarages)
        CMADataAdapter.SelectCommand = CMACommand
        CMADataAdapter.Fill(BroUpdateDataSet)

        Return "ok"
    End Function

End Class

