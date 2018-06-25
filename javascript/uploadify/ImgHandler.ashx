<%@ WebHandler Language="VB" Class="ImgHandler" %>

Imports System
Imports System.Web
Imports System.IO

Public Class ImgHandler : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim postedFile As HttpPostedFile = context.Request.Files("Filedata")
        Dim fn As String = postedFile.FileName
        Dim pos As UShort = fn.LastIndexOf(".")
        Dim ext As String = Right(fn, fn.Length - pos)
        Dim savepath As String = ""
        Dim tempPath As String = ""
        
        tempPath = "/Images/Brochure/" & context.Request.QueryString("CustID") & "/" 'context.Session("CustomerID").ToString
        'System.Configuration.ConfigurationManager.AppSettings("FolderPath")
        savepath = context.Server.MapPath(tempPath)
        Dim filename As String = context.Request.QueryString("BroID") & "_" & context.Request.QueryString("pos") & ext 'postedFile.FileName
        If Not Directory.Exists(savepath) Then
            Directory.CreateDirectory(savepath)
        End If
                
        postedFile.SaveAs((savepath & "\") + filename)
        context.Response.Write((tempPath & "/") + filename)
        context.Response.StatusCode = 200
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class