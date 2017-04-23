<?php
  class PagesController {
    public function home() {
      $first_name = 'Jon';
      $last_name  = 'Snow';
      require_once('views/pages/home.php');
    }
	
	public function about() {
      require_once('views/pages/about.php');
    }
	
	public function service() {
      require_once('views/pages/service.php');
    }
	
	public function gallery() {
      require_once('views/pages/gallery.php');
    }
	
	public function contact() {
      require_once('views/pages/contact.php');
    }
	
	public function blog_post(){
		require_once('views/pages/blog_post.php');
	}

    public function error() {
      require_once('views/pages/error.php');
    }
  }
?>