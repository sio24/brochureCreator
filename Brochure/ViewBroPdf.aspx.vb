Imports WebSupergoo.ABCpdf8

Partial Class Mapping_ViewBroPdf
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Width As String = ""
        Dim sbReportURL As New System.Text.StringBuilder
        sbReportURL.Append("http://")
        sbReportURL.Append(Request.ServerVariables("HTTP_HOST"))
        sbReportURL.Append("/Mapping/BroExlusiveList.aspx?")
        sbReportURL.Append(Request.QueryString)


        ' Generate PDF
        Dim pdfDoc As Doc = New Doc
        pdfDoc.HtmlOptions.Engine = EngineType.Gecko
        pdfDoc.HtmlOptions.ImageQuality = 80
        pdfDoc.HtmlOptions.Timeout = 300000
        pdfDoc.HtmlOptions.RetryCount = 10
        pdfDoc.HtmlOptions.UseScript = True
        If Width = "W" Then
            pdfDoc.HtmlOptions.BrowserWidth = 876 '960
        Else
            pdfDoc.HtmlOptions.BrowserWidth = 595 '672
        End If

        'If hasChart Then
        '    ' Render after delay
        pdfDoc.HtmlOptions.OnLoadScript = "(function(){window.ABCpdf_go = false; setTimeout(function(){window.ABCpdf_go = true;}, 500);})();"
        'End If

        pdfDoc.MediaBox.String = "A4"
        pdfDoc.Rect.String = pdfDoc.MediaBox.String

        If Width = "W" Then
            Dim mb As XRect = pdfDoc.MediaBox
            pdfDoc.Transform.Rotate(90, mb.Left, mb.Bottom)
            pdfDoc.Transform.Translate(mb.Width, 0)
        End If

        If Width = "W" Then
            pdfDoc.Rect.String = "36 36 806 559"
        Else
            pdfDoc.Rect.String = "36 36 559 806"
        End If
        'pdfDoc.Page = pdfDoc.AddPage()

        Dim docID As Integer
        docID = pdfDoc.AddImageUrl(sbReportURL.ToString.Replace("§", "%c2%a7"))

        While True
            If Not pdfDoc.Chainable(docID) Then
                Exit While
            End If
            pdfDoc.Page = pdfDoc.AddPage()
            docID = pdfDoc.AddImageToChain(docID)
        End While

        'Dim fDate As String = CMA.FormatDate(Now, False)
        'Dim noPages As Integer = pdfDoc.PageCount
        'Dim W As Integer = (pdfDoc.Rect.Width / 2) + 36
        'Dim R As Integer = pdfDoc.Rect.Right

        'pdfDoc.FontSize = 12
        'pdfDoc.VPos = 1.0
        'For i As Integer = 1 To noPages
        '    pdfDoc.PageNumber = i

        '    pdfDoc.Rect.String = "36 36 " & W & " 54"
        '    pdfDoc.HPos = 0.0
        'pdfDoc.AddText(fDate)

        'pdfDoc.Rect.String = W & " 36 " & R & " 54"
        'pdfDoc.HPos = 1.0
        'pdfDoc.AddText("Page " & i & " of " & noPages)

        'pdfDoc.Flatten()
        'Next

        If Width = "W" Then
            Dim theID As Integer = pdfDoc.GetInfoInt(pdfDoc.Root, "Pages")
            pdfDoc.SetInfo(theID, "/Rotate", "90")
        End If

        Dim pdfData As Byte() = pdfDoc.GetData
        pdfDoc.Clear()
        pdfDoc = Nothing

        Response.ContentType = "application/pdf"
        Response.AddHeader("content-length", pdfData.Length.ToString())
        Response.AddHeader("content-disposition", "inline")
        Response.BinaryWrite(pdfData)
        pdfData = Nothing

    End Sub

End Class
