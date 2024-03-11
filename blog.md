---
layout: generic
title: Blog
landing-title: 'Blog'
nav-menu: false
show_tile: false
---

<script>
function readfile() {
    alert(document.getElementById('iframe').contentDocument.body.firstChild.innerHTML);
}
</script>

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

    <iframe id='iframe' src = '/blog/03112024.txt' onload='readfile()'> </iframe>
  </div>
    
  
