<?php
/**
* @package WordPress
* @subpackage DealerTrend Framework
*/
// Template Name: Widget Page

get_header(); ?>

<div id="home-content-top"></div>
<div id="home-content">
  <?php for($i=1; $i <= get_option('dt_number_of_widget_zones'); $i++) { ?>
  <div class="widget-zones-top" id="home-<?php echo $i; ?>-top" style="clear:both;"></div>
  <div class="widget-zones" id="home-<?php echo $i; ?>">
    <?php dynamic_sidebar("home-$i"); ?>
    <div class="clear"></div>
  </div>
  <div class="widget-zones-bottom" id="home-<?php echo $i; ?>-bottom" style="clear:both;"></div>
  <?php } ?>
  <div class="clear"></div>
</div>
<div id="home-content-bottom"></div>

<?php get_footer(); ?>
