<?php
  class Post {
    // we define 3 attributes
    // they are public so that we can access them using $post->author directly
    public $id;
    public $blog_desc;
    public $post_datetime;
	public $mid;

    public function __construct($id, $blog_desc, $post_datetime,$mid) {
      $this->id      = $id;
      $this->blog_desc  = $blog_desc;
      $this->post_datetime = $post_datetime;
	  $this->mid      = $mid;
    }

	
	public static function blog_all(){
		$list = [];
		$db = Db::getInstance();
		$req = $db->query('SELECT * FROM blog_post order by mid,post_datetime');
		foreach($req->fetchAll() as $post) {
        $list[] = new Post($post['id'],$post['blog_desc'],$post['post_datetime'],$post['mid']);
		}	
		return $list;
	}
	
	public static function blog_insert($blog_desc){
		$db = Db::getInstance();
		$req = $db->prepare('insert into blog_post(blog_desc,astatus)values(:blog_desc,:status)');
		$req->execute(array('blog_desc' => $blog_desc,'status'=>'M'));

		return 0;
	}
	
		public static function blog_rep_insert($blog_desc,$mid){
		$db = Db::getInstance();
		$req = $db->prepare('insert into blog_post(blog_desc,mid)values(:blog_desc,:mid)');
		$req->execute(array('blog_desc' => $blog_desc,'mid'=>$mid));

		return 0;
	}
  }
?>