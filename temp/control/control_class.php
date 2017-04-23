<?php

class control_class{
	public function __construct(){
		$name=$_GET["control"]."Control";
		include $name.".php";
		$boj=new pageControl();
		$boj->$_GET["func"]();
		
		
	}
}
?>