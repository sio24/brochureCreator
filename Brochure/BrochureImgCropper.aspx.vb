Imports System.Web.Services
'Imports System.Web.Script.Serialization
'Imports System.Net.Mail
Imports System.IO
'Imports System.Net
Imports SD = System.Drawing
Imports System.Drawing.Imaging
Imports System.Drawing.Drawing2D
'Imports AjaxControlToolkit

Partial Class BrochureImgCropper
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim CustID As ULong = CInt(Session("CustomerID"))
        If CustID = 0 Then
            Response.Write("<h1>You are not logged in.</h1>")
            Response.Write("Please reload <a href=""https://www.cmainfo.co.za"" target=""_top"">www.cmainfo.co.za</a> and log-in again.")
            Response.End()
        End If

        hfcrop.Value = "/Images/Brochure/" & Session("CustomerID") & "/" & Request.QueryString("file")
        hfpos.Value = Request.QueryString("pos")
        'hfIsPostback.Value = Page.IsPostBack
    End Sub

    <WebMethod()> _
    Public Shared Function CropImg(img As String, x As Double, y As Double, w As Double, h As Double) As String
        Dim CropImage As Byte() = Crop(HttpContext.Current.Server.MapPath(img), CInt(x), CInt(y), CInt(w), CInt(h))
        Dim SaveTo As String

        Using ms As MemoryStream = New MemoryStream(CropImage, 0, CropImage.Length)
            ms.Write(CropImage, 0, CropImage.Length)
            Using CroppedImage As SD.Image = SD.Image.FromStream(ms, True)
                Dim pos As UInt16 = img.LastIndexOf(".")
                SaveTo = Left(img, pos) & "_crop" & Right(img, img.Length - pos)
                CroppedImage.Save(HttpContext.Current.Server.MapPath(SaveTo), CroppedImage.RawFormat)
            End Using
        End Using
        Return SaveTo
    End Function

    Public Shared Function Crop(img As String, x As UInt16, y As UInt16, w As UInt16, h As UInt16) As Byte()
        Try
            Using OriginalImage As SD.Image = SD.Image.FromFile(img)
                Using bmp As SD.Bitmap = New SD.Bitmap(w, h)
                    bmp.SetResolution(OriginalImage.HorizontalResolution, OriginalImage.VerticalResolution)
                    Using Graphic As SD.Graphics = SD.Graphics.FromImage(bmp)
                        Graphic.SmoothingMode = SmoothingMode.AntiAlias
                        Graphic.InterpolationMode = InterpolationMode.HighQualityBicubic
                        Graphic.PixelOffsetMode = PixelOffsetMode.HighQuality
                        Graphic.DrawImage(OriginalImage, New SD.Rectangle(0, 0, w, h), x, y, w, h, SD.GraphicsUnit.Pixel)
                        Dim MS As MemoryStream = New MemoryStream()
                        bmp.Save(MS, OriginalImage.RawFormat)
                        Return MS.GetBuffer()
                    End Using
                End Using
            End Using
        Catch Ex As Exception
            Throw (Ex)
        End Try
    End Function

End Class


