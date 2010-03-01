/**
 * A fully functional slideshow/presentation plugin
 * for jquery.
 *
 * @author Raymond Julin (raymond.julin@gmail.com)
 */ 
jQuery.fn.jslides = function(options) {
    jQuery.fn.jslides.slides = [];
    jQuery.fn.jslides.current = 0;
    jQuery.fn.jslides.title = $("head title").text();
    var elem = $(this),
        jslides = jQuery.fn.jslides;
    
    // Fix clearing as well as setting the aprop class for styling
    elem.addClass("jslides").append('<hr class="clearfix"/>');

    /**
     * Find all first level divs (slides) under the root
     * and tag them up with the appropriate class "jslide"
     * as well as setting titles etc
     */
    $(">div", elem).addClass("jslide").each(function(i) {
        var o = {}, 
            that = $(this);
        // Set the h1 from the title attr
        if (that.attr("title")) {
            $(this).prepend("<h1>" + that.attr("title") + "</h1>");
            o.title = that.attr("title");
        }
        o.id = "jslide_" + i;
        o.node = that;

        // Override the id of the div, just for finding it easily later
        $(this).attr("id", o.id);
        
        // Push to the array over slides
        jslides.slides.push(o);
    });

    // Add event handler for keyup
    $(window).keypress(function(e) {
        // keyCode are arrows and such, charcode is a character
        var code = (e.keyCode) ? "k" + e.keyCode : "c" + e.charCode,
            current = $("div.slide.current");
        switch (code) {
            case "k39":
                // Forward
                jslides.show(jslides.current + 1)
                break;
            case "k37":
                // Back
                jslides.show(jslides.current - 1);
                break;
            case "c102":
                // Toggle footer
                break;
        }
    });

    // Show first, or as specified in hash
    var num = (window.location.hash) ? 
        (window.location.hash.replace("#","") - 1) : 0;
    jslides.show(num);

    // Return the node so its chainable
    return $(this);
}
$.fn.jslides.show = function(num) {
    var jslides = jQuery.fn.jslides;

    // Test if request is plausible
    if (typeof(jslides.slides[num]) != "undefined") {
        // Remove current
        jslides.slides[jslides.current].node.removeClass("current").hide();

        var cur = jslides.slides[num];
        cur.node.addClass("current").show();
        jslides.current = num;
        window.location.hash = "#" + (num + 1);
        $("head title").text(jslides.title + " :: " + cur.title);
    }
    else {
    }
}
