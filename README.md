# <i>toc with indents</i><br>
<b>toc</b> - jQuery Table of Contents Plugin. http://projects.jga.me/toc/<br><br>
<em>Removed unnecessary, added indents from the top. Made for a fixed hat.</em>

<h2>initialize example</h2>
<pre>
$('.toc').toc({
   'selectors': 'h1, h2, h3', //elements to use as headings
   'container': 'article', //element to find all selectors in
   'prefix': 'toc', //prefix for anchor tags and class names
   'highlightOnScroll': true, //add class to heading that is currently in focus
   'indent': 50, //indent by top
   'speed': 500 //scroll speed
});
</pre>
