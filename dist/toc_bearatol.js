/**
 * @license
 * toc - jQuery Table of Contents Plugin
 * http://projects.jga.me/toc/
 * edited by github.com/bearatol
 * description edition: removed unnecessary, added indents from the top.Made
 for a fixed hat.
 */
$(function () {
   var cachedColsCounts = {};

   $.fn.toc = function (options) {
      var _takingTooLongTimeout;
      var whapp_list_html = this;
      var opts = $.extend({}, jQuery.fn.toc.defaults, options);
      options = $(opts.container);
      var thread_rows = $(opts.selectors, options);
      var p = [];
      var activeClassName = opts.activeClass;

      var scrollTo = function (value, callback) {
         $("li", whapp_list_html).removeClass(activeClassName);
         $(value.target).parent().addClass(activeClassName);
      };

      var highlightOnScroll = function () {
         if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
         }
         _takingTooLongTimeout = setTimeout(function () {
            var e = $(window).scrollTop();
            var minH = Number.MAX_VALUE;
            var m = 0;
            var i = 0;
            var l = p.length;
            for (; l > i; i++) {
               var h = Math.abs(p[i] - e);
               if (minH > h) {
                  m = i;
                  minH = h;
               }
            }
            $("li", whapp_list_html).removeClass(activeClassName);
            e = $("li:eq(" + m + ")", whapp_list_html).addClass(activeClassName);
            opts.onHighlight(e);
         }, 50);
      };
      return opts.highlightOnScroll && ($(window).bind("scroll", highlightOnScroll), highlightOnScroll()), this.each(function () {
         var $target = $(this);
         var table = $(opts.listType);
         thread_rows.each(function (i, heading) {
            var $h = $(heading);
            p.push($h.offset().top - opts.highlightOffset);
            var anchorName = opts.anchorName(i, heading, opts.prefix);
            if (heading.id !== anchorName) {
               $("<span/>").attr("id", anchorName).insertBefore($h);
            }
            var find_block = $h;
            anchorName = $("<a/>").text(opts.headerText(i, heading, $h)).attr("href", "#" + anchorName).on('click', function () {
               var tag_block = $(this).parent().data('tag');
               var text = opts.headerText(i, heading, $h);
               
               if (find_block.length) {
                  var offset_top = find_block.offset().top - opts.indent;
                  $('html, body').animate({
                        scrollTop: offset_top
                     }, opts.speed,
                     function () {

                     });
               }
               return false;

            });
            $h = $("<li/>").addClass(opts.itemClass(i, heading, $h, opts.prefix)).attr('data-tag', opts.itemTag(i, heading, $h)).append(anchorName);
            table.append($h);
         });
         $target.html(table);
      });
   };

   jQuery.fn.toc.defaults = {
      container: "body",
      listType: "<ul/>",
      selectors: "h1,h2,h3",
      prefix: "toc",
      activeClass: "toc-active",
      onHighlight: function () {},
      highlightOnScroll: true,
      highlightOffset: 100,
      indent: 0,
      speed: 200,
      anchorName: function (j, i, prefix) {
         if (i.id.length) {
            return i.id;
         }
         i = $(i).text().replace(/[^a-z0-9]/gi, " ").replace(/\s+/g, "-").toLowerCase();
         if (cachedColsCounts[i]) {
            j = 2;
            for (; cachedColsCounts[i + j];) {
               j++;
            }
            i = i + "-" + j;
         }
         return cachedColsCounts[i] = true, prefix + "-" + i;
      },
      headerText: function (i, heading, $heading) {
         return $heading.text();
      },
      itemClass: function (i, heading, $heading, prefix) {
         return prefix + "-" + $heading[0].tagName.toLowerCase();
      },
      itemTag: function (i, heading, $heading) {
         return $heading[0].tagName.toLowerCase();
      }
   };
});