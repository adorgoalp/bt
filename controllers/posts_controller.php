<?php
  class PostsController {
    public function index() {
      // we store all the posts in a variable
	  require_once('models/post.php');
      $posts = Post::all();
      require_once('views/posts/index.php');
    }

    public function show() {
      // we expect a url of form ?controller=posts&action=show&id=x
      // without an id we just redirect to the error page as we need the post id to find it in the database
	  require_once('models/post.php');
      if (!isset($_GET['id']))
        return call('pages', 'error');

      // we use the given id to get the right post
      $post = Post::find($_GET['id']);
      require_once('views/posts/show.php');
    }
	
	public function blog_insert(){
		require_once('models/BlogPostClass.php');
		Post::blog_insert($_GET['blog_desc']);
		require_once('views/posts/show_blog.php');
	}
	
	public function blog_rep_insert(){
		require_once('models/BlogPostClass.php');
		Post::blog_rep_insert($_GET['blog_desc'],$_GET['mid']);
		echo $_GET['blog_desc']; 
		//require_once('views/posts/show_blog.php');
	}

	
  }
?>