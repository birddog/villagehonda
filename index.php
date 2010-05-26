<?php
/**
 * @package WordPress
 * @subpackage DealerTrend Framework
 */
get_header(); ?>

<div id="site-content-top"></div>
<div id="site-content">
  <div class="grid_12">
    <?php if (have_posts()) : ?>
  	  <?php while (have_posts()) : the_post(); ?>
  		  <div <?php post_class() ?> id="post-<?php the_ID(); ?>">
  				<?php the_content(''); ?>
  		  </div>
  	  <?php endwhile; ?>
    <?php else : ?>
  	  <h2 class="center">Not Found</h2>
  	  <p class="center">Sorry, but you are looking for something that isn't here.</p>
    <?php endif; ?>
  </div>
  <div class='clear'></div>
</div>
<div id="site-content-bottom"></div>

<?php get_footer(); ?>
