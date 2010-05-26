<?php
/**
 * @package WordPress
 * @subpackage DealerTrend Framework
 */

get_header(); ?>

<div id="site-content-top"></div>
<div id="site-content">
  <div class="grid_12">
  	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  	<div class="post" id="post-<?php the_ID(); ?>">
  		<?php the_content('<p class="serif">Read the rest of this page &raquo;</p>'); ?>
  		<?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
  	</div>
  	<?php endwhile; endif; ?>
  </div>
	<div class="clear"></div>
</div>
<div id="site-content-bottom"></div>

<?php get_footer(); ?>
