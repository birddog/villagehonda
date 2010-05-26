<?php
header('Content-type: text/plain');
require_once( '../../../wp-load.php');
if (!$_GET['parent']) die("No parent menu defined.");
$page = get_page_by_title($_GET['parent']);
wp_list_pages("title_li=&sort_column=menu_order&child_of=".$page->ID);
?>