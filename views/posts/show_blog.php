
<?php 
require_once('models/BlogPostClass.php');
$posts = Post::blog_all();

$number=1; foreach($posts as $post) { ?>
<div class="well">
  <div class="col-lg-6 col-sm-6 col-md-6" align="left" style="font-size:xx-small "><?php  echo '['.$number.']'.$post->post_datetime; ?></div>
  <div class="col-lg-6 col-sm-6 col-md-6" align="right" style="font-size:small">
  <button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#myModalMsg" onclick="javascript:document.getElementById('divrepID').value=<?php echo $post->mid; ?>;">reply</button>
  </div>
  <div  <?php if ($number % 2 == 0) {?> style="color:green" <?php } else {?> style="color:red"<?php } ?> >
  <?php echo $post->blog_desc; $number++; ?>	
  </div>
  <div class="col-lg-6 col-sm-6 col-md-6" align="left" style="color:blue; font-size:small" id="<?php echo 'divrep'.$post->id; ?>"></div>
 </div> 
<?php } ?>

<div id="myModalMsg" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <!--<div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Text to reply</h4>
      </div>-->
	  <!-- start modal body-->
      <div class="modal-body"> 
		<input type="hidden" id="divrepID"></input>
		<div class="row">
		<input type="text" class="form-control" id="blog_desc_rep" onfocus="if(this.value == 'Write Text....') {this.value=''}" onblur="if(this.value == ''){this.value ='Write Text....'}"></div>
		
      </div><!-- end modal body-->
	  
      <div class="modal-footer">
		<button type="button" class="btn btn-default"  onClick="javascript:ReplyPost('posts','blog_rep_insert',document.getElementById('blog_desc_rep').value,document.getElementById('divrepID').value)" data-dismiss="modal" >Post</button>
        <button type="button" class="btn btn-default"  data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div> 
