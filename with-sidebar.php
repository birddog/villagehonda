<?php
/**
* @package WordPress
* @subpackage DealerTrend Framework
*/
// Template Name: With Sidebar
get_header(); ?>

<div id="site-content-top"></div>
<div id="site-content">
  <div id="sidebar">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("sidebar") ) : ?><?php endif; ?>
  </div>
  <div class="grid_10">
    <?php if (have_posts()) : ?>
    	<?php while (have_posts()) : the_post(); ?>
    		<div <?php post_class() ?> id="post-<?php the_ID(); ?>">
    			<div class="entry">
    				<?php the_content(''); ?>
    			</div>
    		</div>
    	<?php endwhile; ?>
    <?php else : ?>
    	<h2 class="center">Not Found</h2>
    	<p class="center">Sorry, but you are looking for something that isn't here.</p>
    	<?php get_search_form(); ?>
    <?php endif; ?>
  </div>
  <div class='clear'></div>
</div>
<div id="site-content-bottom"></div>

<?php get_footer(); ?>
