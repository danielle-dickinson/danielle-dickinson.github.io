---
layout: generic
title: Blog
landing-title: 'Blog'
nav-menu: false
show_tile: false
---
<!-- Main -->
<div id="main" class="alt">

<div class="row">
  <div class="leftcolumn">
    <div class="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Dec 7, 2017</h5>
      <p>Some text..</p>
    </div>
    <div class="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Sep 2, 2017</h5>
      <p>Some text..</p>
    </div>
  </div>
    <!-- HTML elements to iterate -->
    <p>This is paragraph 1.</p>
    <p>This is paragraph 2.</p>
    <p>This is paragraph 3.</p>
 
    <script type="text/javascript">
        // Get the elements to be iterated
        let htmlElements =
            document.getElementsByTagName("p");
 
        // Use a regular for-loop
        for (let i = 0; i < htmlElements.length; i++) {
 
            // Print the current element
            console.log(htmlElements[i]);
        }
    </script>

    </div>

  
