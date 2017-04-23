<?php
  require_once('connection.php');

  if (isset($_GET['controller']) && isset($_GET['action']) && isset($_GET['type'])) {
    $controller = $_GET['controller'];
    $action     = $_GET['action'];
	$type		= $_GET['type'];
	//require_once('routes.php');
  } else {
    $controller = 'pages';
    $action     = 'home';
	$type		= 'master';
	//require_once('views/layout.php');
  }
  
  
  if ($type=='master'){ 
	require_once('views/layout.php');
  }
  else { 
	require_once('routes.php');
  }
?>
  
