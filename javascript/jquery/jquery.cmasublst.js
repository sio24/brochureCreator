(function ($) {
    $.fn.suburblist = function () {
        return this.each(function () {
            var target = $(this);

            function _clearSelection() {
                target.find($(".suburblist-container li")).each(function () {
                    var $li = $(this);
                    var isSub = !($li.attr("data-sub") === "");
                    $li.removeClass("hidden").addClass(isSub ? "sub" : "main").html($li.attr(isSub ? "data-sub" : "data-main"));
                });
            }

            target.addClass("suburblist-container");
            target.prepend("<input type=\"text\" class=\"suburblist-filter\" />")

            target.find($("input")).css({ width: target.find($("ul")).innerWidth() - 5 });

            var divHeight = target.height() - target.find($(".suburblist-filter")).outerHeight(true);
            target.find($("ul")).wrap("<div style=\"position: relative; overflow-y: scroll; height: " + divHeight + "px;\"></div>")

            _clearSelection();

            target.find($("li")).click(function () {
                //target.find($(".selected")).removeClass("selected");
                //$(this).addClass("selected");
                var $li = $(this);
                target.find($(".selected")).removeClass("selected");
                $li.addClass("selected");
                var isSub = !($li.attr("data-sub") === "");
                var sub_name = $li.attr(isSub ? "data-sub" : "data-main");
                //alert(sub_name);
            });

            target.find($(".suburblist-filter")).on("keyup mouseup paste", function () {
                var search_term = $(this).val();
                if (search_term === "") {
                    _clearSelection();
                }
                else {
                    var mains = [];
                    var re_search_term = new RegExp(search_term, "gi");
                    target.find($("li")).each(function () {
                        var $this = $(this);
                        var isSub = !($this.attr("data-sub") === "");
                        var sub_name = $this.attr(isSub ? "data-sub" : "data-main");
                        if (sub_name.search(re_search_term) === -1) {
                            $this.html(sub_name).addClass("hidden");
                        }
                        else {
                            $this.html(sub_name.replace(re_search_term, '<span class="hilight">' + search_term.toUpperCase() + '</span>'));
                            $this.removeClass("hidden");
                            if (isSub) {
                                target.find($("li[data-main='" + $this.attr("data-main") + "']")).first().removeClass("hidden");
                            }
                            else {
                                mains.push(sub_name);
                            }
                        }
                    });
                    $.each(mains, function (index, value) {
                        target.find($("li[data-main='" + value + "']")).removeClass("hidden");
                    });
                }
            });
        });
    }
})(jQuery);
