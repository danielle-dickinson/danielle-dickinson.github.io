---
layout: allposts
title: Blog
landing-title: 'Blog'
nav-menu: true
description: null
image: "/assets/images/Untitled_Artwork.png"
author: null
show_tile: true
---

<!-- The grid: three columns -->
<div class="row">
  <div class="column" onclick="openTab('b1');" style="background:green;">Box 1</div>
  <div class="column" onclick="openTab('b2');" style="background:blue;">Box 2</div>
  <div class="column" onclick="openTab('b3');" style="background:red;">Box 3</div>
</div>

<!-- The expanding grid (hidden by default) -->
<div id="b1" class="containerTab" style="display:none;background:green">
  <!-- If you want the ability to close the container, add a close button -->
  <span onclick="this.parentElement.style.display='none'" class="closebtn">x</span>
  <h2>Box 1</h2>
  <p>Lorem ipsum..</p>
</div>

<div id="b2" class="containerTab" style="display:none;background:blue">
  <span onclick="this.parentElement.style.display='none'" class="closebtn">x</span>
  <h2>Box 2</h2>
  <p>Lorem ipsum..</p>
</div>

<div id="b3" class="containerTab" style="display:none;background:red">
  <span onclick="this.parentElement.style.display='none'" class="closebtn">x</span>
  <h2>Box 3</h2>
  <p>Lorem ipsum..</p>
</div>
