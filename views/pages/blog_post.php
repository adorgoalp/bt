<div class="container">
<div class="well">
<div class="row">Write to Post</div>
<div class="row"><input type="text" id="blog_desc" class="form-control"></div>
<div class="row"><input type="button" value="post" onClick="javascript:getChildPgName('posts','blog_insert',document.getElementById('blog_desc').value)"></div>
</div>
<div id='blog_insert'><?php require_once('views/posts/show_blog.php');?></div>
</div>
