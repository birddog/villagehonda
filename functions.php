<?php
# Theme Settings
define('DT_THEME_PATH', trailingslashit(TEMPLATEPATH));

# Theme Options Page (in Admin)
include_once(DT_THEME_PATH.'options.php');

# Setup Widget Zones
if ( function_exists('register_sidebar') ) {
  register_sidebar(array('name' => 'header','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'menu-before','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'menu-after','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'submenu','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'top-banner-ad','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'bottom-banner-ad','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'sidebar','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'footer-left','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'footer-middle','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'footer-right','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'footer','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  register_sidebar(array('name' => 'breakout-footer','before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));

  for($i=1; $i <= get_option('dt_number_of_widget_zones'); $i++) {
    register_sidebar(array('name' => 'home-' . $i,'before_widget' => '','after_widget' => '','before_title' => '','after_title' => ''));
  }
};

# Header
function dt_header() {
  $dt_header_image = get_option('dt_header_image');
  $dt_header_show_text = get_option('dt_header_show_text');

  if ($dt_header_image) {
    echo "\n<img src=\"$dt_header_image\" alt=\"\"/>";
  } elseif ($dt_header_show_text == 't') {
    echo "<h1>".get_bloginfo('name')."</h1>\n";
    echo "<h2>".get_bloginfo('description')."</h2>";
  }
}

# Google
function dt_google_analytics() {
  $dt_google_analytics = get_option('dt_google_analytics');
  if ($dt_google_analytics) {
    echo <<<DONE
    <script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
    try{
    var pageTracker = _gat._getTracker("$dt_google_analytics");
    pageTracker._trackPageview();
    } catch(err) {}
    </script>\n
DONE;
  }
}
function dt_google_site_verify() {
  $dt_google_site_verify = get_option('dt_google_site_verify');
  if ($dt_google_site_verify) {
    echo "<meta name=\"google-site-verification\" content=\"$dt_google_site_verify\" />\n";
  }
}

# Include CSS
function dt_css_includes() {
  $dt_stylesheet_includes = explode("\n", get_option('dt_stylesheet_includes'));

  if ($dt_stylesheet_includes) {
    foreach ($dt_stylesheet_includes as $stylesheet) {
      if (!empty($stylesheet))
        echo "<link rel=\"stylesheet\" href=\"".trim($stylesheet)."\" type=\"text/css\" media=\"screen\" charset=\"utf-8\"/>\n";
    }
  }
}

# Include JS
function dt_js_includes() {
  $dt_javascript_includes = explode("\n", get_option('dt_javascript_includes'));

  if ($dt_javascript_includes) {
    foreach ($dt_javascript_includes as $javascript) {
      if (!empty($javascript))
        echo "<script src=\"".trim($javascript)."\" type=\"text/javascript\" charset=\"utf-8\"></script>\n";
    }
  }
}

# Custom CSS
function dt_custom_css() {
  $dt_c_css = "";
  $dt_background_image = get_option('dt_background_image');
  $dt_background_image_repeat = get_option('dt_background_image_repeat');
  $dt_header_background_image = get_option('dt_header_background_image');
  $dt_header_background_image_repeat = get_option('dt_header_background_image_repeat');
  $dt_menubar_background_image = get_option('dt_menubar_background_image');
  $dt_footer_background_image = get_option('dt_footer_background_image');
  
  if (empty($dt_header_background_image_repeat)) $dt_header_background_image_repeat = 'no-repeat';

  if ($dt_background_image) {
    $dt_c_css .= "body{background:url('$dt_background_image') $dt_background_image_repeat fixed top center;}\n";
  }
  if ($dt_header_background_image) {
    $dt_c_css .= "#header{background:url('$dt_header_background_image') $dt_header_background_image_repeat top center;}\n";
  }
  if ($dt_menubar_background_image) {
    $dt_c_css .= "#menubar{background:url('$dt_menubar_background_image') top center;}\n";
  }
  if ($dt_footer_background_image) {
    $dt_c_css .= "#footer{background:url('$dt_footer_background_image') top center;}\n";
  }

  $dt_c_css .= get_option('dt_custom_css');

  if ($dt_c_css) {
    echo "\n<style type=\"text/css\">\n/*<![CDATA[*/\n".$dt_c_css."\n /*]]>*/\n</style>\n";
  }
}

# Custom Javascript
function dt_custom_javascript() {
  $dt_custom_javascript = get_option('dt_custom_javascript');

  if ($dt_custom_javascript) {
    echo "\n<script type=\"text/javascript\">\n";
    echo "/*<![CDATA[*/\n";
    echo "$(document).ready(function(){\n";
    echo stripslashes($dt_custom_javascript);
    echo "});";
    echo "\n /*]]>*/\n";
    echo "</script>\n";
  }
}

# Content Flow
function dt_content_flow() {
  $page = get_page_by_title('ContentFlow');
  $files = get_children("post_parent=".$page->ID."&post_type=attachment&post_mime_type=image&order=ASC&orderby=menu_order ID");

  echo '<link rel="stylesheet" href="'.get_bloginfo('template_directory').'/css/contentflow.css" type="text/css" media="screen"/>'."\n";
  echo '<script src="'.get_bloginfo('template_directory').'/javascripts/contentflow.js" type="text/javascript" charset="utf-8" load="lightbox"></script>'."\n";
  echo '<div class="loadIndicator"><div class="indicator"></div></div>'."\n";
  echo '<div id="contentFlow" class="ContentFlow"><div class="flow">'."\n";
  if ($files) {
    $keys = array_keys($files);
    foreach ($keys as $image) {
      $large = wp_get_attachment_image_src($image, 'large');
      $thumb = wp_get_attachment_image_src($image, 'medium');
      echo '<div class="item">'."\n";
      echo '<img class="content" href="'.$large[0].'" rel="'.$image.'"" src="'.$thumb[0].'"/>'."\n";
      // echo '<div class="caption">'.$caption.'</div>'."\n";
      echo "</div>\n";
    }
  }
  ?>
  </div>
  <div class="globalCaption"></div>
  <div class="scrollbar"><div class="slider"><div class="position"></div></div></div></div>
  <div class="select-button"><button id="select-theme"></div>
  <script type="text/javascript" charset="utf-8">
  /* Select Theme */
  $('#select-theme').click(function(){
    var expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 = days to expire
    theme_num = $('.item.active .content').last().attr('rel');
    theme_url = $('.item.active .content').last().attr('href');
    document.cookie = "selected-theme=" + theme_url + ";path=/;expires=" + expires.toGMTString();
    $('.item.active').addClass('selected');
    $('.item.selected').css('border','solid 1px blue');
    $('.item.selected').css('-webkit-box-shadow','1px 1px 10px #333');
  });
  </script>
  <?php
}
