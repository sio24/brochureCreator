var verIE = 0;
/*@cc_on
if (@_jscript_version == 5.7 && window.XMLHttpRequest)
    verIE = 7;
else if (@_jscript_version == 5.8)
    verIE = 8;
else
    verIE = @_jscript_version;
@*/

$(document).ready(function () {
    if (verIE == 7) {
        $("thead th").css({ borderBottom: "double 3px #999" });
        $("table.outer").attr("cellspacing", "12");
        $("table.outer table.image td").css({ overflow: "hidden" });
        $("table.outer").css({ pageBreakBefore: "auto" });
        $("table.outer:gt(0)").before("<div style='page-break-before: always; height: 1em; margin-bottom: -1em; color: white;'>.</div>");
    }
    if (verIE == 8) {
        $("table.outer:eq(0)").css({ pageBreakBefore: "avoid" });
    }
});
