<?php
# DT Option Settings
$option_names = array(
  'dt_header_image',
  'dt_background_image',
  'dt_background_image_repeat',
  'dt_header_background_image',
  'dt_menubar_background_image',
  'dt_header_show_text',
  'dt_footer_background_image',
  'dt_custom_css',
  'dt_stylesheet_includes',
  'dt_custom_javascript',
  'dt_javascript_includes',
  'dt_number_of_widget_zones',
  'dt_google_analytics',
  'dt_google_mobile_analytics',
  'dt_google_site_verify',
  'dt_company_phone'
);

# Defaults
function dt_setup_defaults() {
  global $option_names;
  foreach($option_names as $name) {
    $option = get_option($name);
    if (empty($option)) add_option($name, '');
  }
}

# Settings Page Functions
function dt_theme_admin() {
  global $option_names, $current_themes;
  $current_themes = (array) unserialize(get_option('dt_theme_settings'));
  
  if ($_GET['page'] == basename(__FILE__) ) {
    /* Save Settings */
    if ('save' == $_POST['action'] ) {
      foreach ($option_names as $value) {
        if (isset($_POST[$value]) && !empty($_POST[$value])) { 
          update_option($value, $_POST[$value], '', 'yes');
        } else { 
          delete_option($value); 
        } 
      }
      
      $_REQUEST['saved'] = true;
    }

    /* Save Theme */
    if ($_POST['make_theme'] == 'Save Theme' and !empty($_POST['theme_name'])) {
      foreach ($option_names as $option_name) {
        if ($option_name == 'dt_theme_settings') continue;
        $dt_theme_settings[$_POST['theme_name']][$option_name] = stripslashes(get_option($option_name));
      }
  
      if (is_array($current_themes)) {
        $dt_theme_settings = array_merge($current_themes, $dt_theme_settings);
      }
      
      update_option('dt_theme_settings', serialize($dt_theme_settings));

      $_REQUEST['saved_theme'] = $_POST['theme_name'];
    }
  }
  
  add_theme_page("DealerTrend Theme Settings", "DT Theme Settings", "edit_themes", basename(__FILE__), 'dt_theme_admin_page');
}

/* Render Settings Page */
function dt_theme_admin_page() {
  if ($_REQUEST['saved']) { 
    echo '<div id="message" class="updated fade"><p><strong>DealerTrend Theme settings saved.</strong></p></div>'; 
  }
  if ($_REQUEST['saved_theme']) {
    echo '<div id="message" class="updated fade"><p><strong>Saved new theme: '.$_REQUEST['saved_theme'].'</strong></p></div>'; 
  }
  include_once(DT_THEME_PATH.'options_page.php');
}


#
# Do the magic
#
dt_setup_defaults();
add_action('admin_menu', 'dt_theme_admin');
add_action('wp_head',    'dt_custom_css');
?>