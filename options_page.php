<div class="wrap">
  <div id="icon-options-general" class="icon32"><br /></div>
  <h2>DealerTrend Theme Settings</h2>
  <form method="post">
    <table width="100%" border="0" style="padding:10px;">
      <tr>
        <td colspan=2><h3>Google</h3></td>
      </tr>
      <!-- Google Analytics -->
      <tr>
        <td width="20%" valign="middle">
          <strong style="font-size:11px;">Google Analytics Code</strong>
        </td>
        <td width="80%">
          <input style="width:20em;" name="dt_google_analytics" type="text" value="<?php echo get_option('dt_google_analytics');?>" />
          <small>IE: UA-xxxxxx-x.</small>
        </td>
      </tr>
      <!-- Google Mobile Analytics -->
      <tr>
        <td width="20%" valign="middle">
          <strong style="font-size:11px;">Google Mobile Analytics Code</strong>
        </td>
        <td width="80%">
          <input style="width:20em;" name="dt_google_mobile_analytics" type="text" value="<?php echo get_option('dt_google_mobile_analytics');?>" />
          <small>IE: UA-xxxxxx-x.</small>
        </td>
      </tr>
      <!-- Google Site Verification -->
      <tr>
        <td width="20%" valign="middle">
          <strong style="font-size:11px;">Google Site Verification Code</strong>
        </td>
        <td width="80%">
          <input style="width:100%;" name="dt_google_site_verify" type="text" value="<?php echo get_option('dt_google_site_verify');?>" />
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>

      <tr>
        <td colspan=2><h3>Company Information</h3></td>
      </tr>
      <!-- Company Phone -->
      <tr>
        <td width="20%" valign="middle">
          <strong style="font-size:11px;">Company Phone</strong>
        </td>
        <td width="80%">
          <input style="width:20em;" name="dt_company_phone" type="text" value="<?php echo get_option('dt_company_phone');?>" />
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>

      <tr>
        <td colspan=2><h3>Design Settings</h3></td>
      </tr>

      <!-- Theme -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Saved Themes</strong>
        </td>
        <td width="80%">
          <?php 
          $dt_theme_settings = unserialize(get_option('dt_theme_settings'));
          if (!is_array($dt_theme_settings)) $dt_theme_settings = array();
        
          if (count($dt_theme_settings > 1))
            ksort($dt_theme_settings); 
          ?>
          <script type="text/javascript" charset="utf-8">
            var theme_data = Array();
            <?php
            foreach($dt_theme_settings as $theme => $settings) {
              if (empty($theme) or empty($settings)) continue;
              print "theme_data['$theme'] = ".json_encode($settings).";\n";
            }
          ?>
          </script>
          <select name="theme" id="theme" size="1">
            <option value="">Select A Theme</option>
            <?php
            foreach($dt_theme_settings as $theme=>$settings) {
              if ($theme == false) continue;
              print "<option value='$theme'>$theme</option>";
            }
            ?>
          </select>
          <br/>
          <small>Selecting a theme will replace the settings below with the theme settings.</small>
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>

      <!-- Widget Zones for Home Page -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Number of Widget Zones</strong>
        </td>
        <td width="80%">
          <input type="text" name="dt_number_of_widget_zones" size=4 value="<?php echo get_option('dt_number_of_widget_zones');?>"><br/>
          <small>Enter the number of Widget Zones you want on the Home Page Template.</small>
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>    

      <!-- Background Image -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Background Image</strong>
        </td>
        <td width="80%">
          <img rel='backgrounds' class='image-select' src="http://assets0.dealertrend.com/images/icons/folder.png" alt="*"/>
          <input id="dt_background_image" style="width:400px;" name="dt_background_image" type="text" value="<?php echo get_option('dt_background_image');?>" /><br/>
          <small>Type in the URL to the Background Image.</small><br/>
          <span style="display:inline-block;padding-right:10px;"><input type="radio" name="dt_background_image_repeat" value="no-repeat" <?php  if (get_option('dt_background_image_repeat')=='no-repeat')  echo 'checked="selected"'; ?>/> No Repeat</span>
          <span style="display:inline-block;padding-right:10px;"><input type="radio" name="dt_background_image_repeat" value="repeat-x" <?php if (get_option('dt_background_image_repeat')=='repeat-x') echo 'checked="selected"'; ?>/> Repeat Across</span>
          <span style="display:inline-block;padding-right:10px;"><input type="radio" name="dt_background_image_repeat" value="repeat-y" <?php if (get_option('dt_background_image_repeat')=='repeat-y') echo 'checked="selected"'; ?>/> Repeat Down</span>
          <span style="display:inline-block;padding-right:10px;"><input type="radio" name="dt_background_image_repeat" value="" <?php if (get_option('dt_background_image_repeat')=='tile') echo 'checked="selected"'; ?>/> Tile</span>
          <br/><br/>
        </td>
      </tr>
      <!-- Header Background Image -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Header Background Image</strong>
        </td>
        <td width="80%">
          <img rel='header-backgrounds' class='image-select' src="http://assets0.dealertrend.com/images/icons/folder.png" alt="*"/>
          <input style="width:400px;" name="dt_header_background_image" type="text" value="<?php echo get_option('dt_header_background_image');?>" /><br/>
          <small>Type in the URL to the Header Background Image. No wider than 940px.</small>
          <br/><br/>
        </td>
      </tr>
      <!-- Header Image -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Header Image</strong>
        </td>
        <td width="80%">
          <img rel='headers' class='image-select' src="http://assets0.dealertrend.com/images/icons/folder.png" alt="*"/>
          <input style="width:400px;" name="dt_header_image" type="text" value="<?php echo get_option('dt_header_image');?>" /><br/>
          <small>Type in the URL to the Header Image. 940px wide.</small><br/>
          <br/>
          Display Blog Title / Tag Line from Wordpress?
          <span style="display:inline-block;padding-left:10px;"><input type="radio" name="dt_header_show_text" value="t" <?php  if (get_option('dt_header_show_text')=='t')  echo 'checked="selected"'; ?>/> Show Text</span>
          <span style="display:inline-block;padding-left:10px;"><input type="radio" name="dt_header_show_text" value="f" <?php if (get_option('dt_header_show_text')=='f') echo 'checked="selected"'; ?>/> Hide Text</span><br/>
          <small>If you show Wordpress Blog Title and Tag Line then you probably don't want a Header Image.</small>
          <br/><br/>
        </td>
      </tr>
      <!-- Top Menubar Image -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Menubar Background Image</strong>
        </td>
        <td width="80%">
          <img rel='menubars' class='image-select' src="http://assets0.dealertrend.com/images/icons/folder.png" alt="*"/>
          <input style="width:400px;" name="dt_menubar_background_image" type="text" value="<?php echo get_option('dt_menubar_background_image');?>" /><br/>
          <small>Type in the URL to the Menu Background Image. No wider than 940px.</small>
          <br/><br/>
        </td>
      </tr>
      <!-- Footer Background Image -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Footer Background Image</strong>
        </td>
        <td width="80%">
          <img rel='footers' class='image-select' src="http://assets0.dealertrend.com/images/icons/folder.png" alt="*"/>
          <input style="width:400px;" name="dt_footer_background_image" type="text" value="<?php echo get_option('dt_footer_background_image');?>" /><br/>
          <small>Type in the URL to the Footer Background Image. No wider than 940px.</small>
          <br/><br/>
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>

      <!-- Stylesheet Includes -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Stylesheet Includes</strong>
        </td>
        <td width="80%">
          <textarea name="dt_stylesheet_includes" style="width:100%;height:4em;"><?php echo get_option('dt_stylesheet_includes');?></textarea><br/>
          <small>List of Stylesheet URL's to include separated by RETURN (newline).</small>
          <br/><br/>
        </td>
      </tr>
      <!-- Javascript Includes -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Javascript Includes</strong>
        </td>
        <td width="80%">
          <textarea name="dt_javascript_includes" style="width:100%;height:4em;"><?php echo get_option('dt_javascript_includes');?></textarea><br/>
          <small>List of Javascript URL's to include separated by RETURN (newline).</small>
          <br/><br/>
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>    

      <!-- Custom CSS -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Custom CSS</strong>
        </td>
        <td width="80%">
          <textarea class="expand-box" name="dt_custom_css" style="width:100%;height:8em;"><?php echo get_option('dt_custom_css');?></textarea>
          <br/><br/>
        </td>
      </tr>
    
      <!-- Custom Javascript -->
      <tr>
        <td width="20%" valign="top">
          <strong style="font-size:11px;">Custom Javascript</strong>
        </td>
        <td width="80%">
          <textarea class="expand-box" name="dt_custom_javascript" style="width:100%;height:8em;"><?php echo stripslashes(get_option('dt_custom_javascript'));?></textarea>
          <br/><br/>
        </td>
      </tr>
      <tr>
        <td colspan="2"><br/>&nbsp;</td>
      </tr>
    </table>
    <!-- Save Button -->
    <div style="position:fixed;z-index:5;bottom:1px;right:11px;border:solid 1px #333;background:#999;width:450px;height:40px;margin:0 auto;text-align:center;opacity:0.5;-webkit-border-radius:7px;-moz-border-radius:7px;">
    </div>
    <div style="position:fixed;z-index:9;bottom:1px;right:14px;opacity:1;margin:5px;border:solid 1px #ccc;background:#ddd;-webkit-border-radius:7px;-moz-border-radius:7px;padding:2px 10px;">
      <input name="save" type="submit" value="Save Changes" class="button-primary" onclick="jQuery('#save_action').attr('value','save');"/>
      <div style="display:inline-block;width:50px;"></div>
      <input name="theme_name" type="text" site="20" value="New Theme Name" onfocus="if(this.value=='New Theme Name'){this.value='';this.style.color='#000';}" style="color:#999;"/>
      <input name="make_theme" type="submit" value="Save Theme" class="button" onclick="jQuery('#save_action').attr('value','save');"/>
      <input id="save_action" type="hidden" name="action" value="" />
    </div>
  </form>

  <div id="file-picker" style="
    position:fixed;
    top:40px;
    left:10px;
    width:1020px;
    height:520px;
    z-index:5;
    padding:5px;
    border:solid 1px #333;
    background:#999;
    color:black;
    margin:0 auto;
    text-align:center;
    opacity:0.5;
    -webkit-border-radius:7px;
    -moz-border-radius:7px;
    -webkit-box-shadow: 1px 1px 15px #000;
    display:none;">
    <span id="close-file-picker" style="display:inline-block;float:right;">Close</span>
    Image File Picker
  </div>
  <div id="image-files" style="
    position:fixed;
    top:70px;
    left:20px;
    width:1000px;
    height:480px;
    padding:10px;
    color:black;
    background:white;
    opacity:1.0,
    border:solid 1px black;
    z-index:10;
    overflow:auto;
    text-align:left;
    display:none;">
  </div>


  <script type="text/javascript" charset="utf-8">
    <?php echo "var dt_theme_path = '".get_bloginfo('template_directory')."'\n"; ?>
  
    var selected_field = false;

    /* Make large texts boxes expand so they don't take too much space */
    jQuery('textarea.expand-box').focus(function(){
      jQuery(this).css('height','40em');
    });
    jQuery('textarea.expand-box').blur(function(){
      jQuery(this).css('height','8em');
    });

    function stripslashes(str) {
      if (str) {
        str = str.replace(/\\'/g, '\'');
        str = str.replace(/\\"/g, '"');
        str = str.replace(/\\0/g, '\0');
        str = str.replace(/\\\\/g, '\\');
        str = str.replace(/\\\\\\/g, '');
      }
      return str;
    }


    /* Theme selector */
    jQuery('#theme').change(function(){
      var current_theme = jQuery('#theme').attr('value');
      if (confirm('Are you sure you want to replace ALL your settings with this theme set, "'+current_theme+'"?')) {
        for (option_setting in theme_data[current_theme]) {
          jQuery(':input').each(function(){
            if (jQuery(this).attr('name') == option_setting) {
              jQuery(this).css('border', 'solid 1px green');
              value = stripslashes(theme_data[current_theme][option_setting]);
              if (value == false) value = '';
              jQuery(this).attr('value', value);
            }
          });
        
          jQuery(':radio').each(function(){
            if (jQuery(this).attr('name') == option_setting) {
              if (jQuery(this).attr('value') == theme_data[current_theme][option_setting])
                jQuery(this).attr('checked', 'checked');
              else
                jQuery(this).attr('checked', false);
            }
          });
        }
        alert("Don't forget to Save Changes");
      }
    });

    /* Image picker window */
    function select_image(json_data,input_field) {
      jQuery('#image-files').html('');
      for (index in json_data) {
        jQuery('#image-files').append('<div style="background:#ccc url(/wp-content/themes/dealertrend/images/background-grid.png);margin:5px;border:solid 10px #eee;-webkit-border-radius:10px;-moz-border-radius:10px;display:inline-block;text-align:left;"><img class="image-file" src="'+json_data[index]+'" alt="" style="vertical-align:top;"/></div>'+"\n");
      }
      jQuery('.image-file').hover(
        function(){
          jQuery(this).parent().css('background', 'url('+jQuery('#dt_background_image').attr('value')+')');
          jQuery(this).parent().css('border-color', '#ccc');
        },
        function(){
          jQuery(this).parent().css('background', 'url(/wp-content/themes/dealertrend/images/background-grid.png)');
          jQuery(this).parent().css('border-color', '#eee');
        }
      );
      jQuery('#file-picker').show();
      jQuery('#image-files').show();

      /* Select files in image-select */
      jQuery('#image-files img').click(function(){
        input_field.attr('value',jQuery(this).attr('src'));
        jQuery('#file-picker').hide();
        jQuery('#image-files').hide();
      });
    }

    /* Close image picker window */
    jQuery('#close-file-picker').hover(function(){
      jQuery(this).css('cursor','pointer');
    });
    jQuery('#close-file-picker').click(function(){
      jQuery('#file-picker').hide();
      jQuery('#image-files').hide();
    });
  
    /* Load a list of files to select urls */
    jQuery('.image-select').each(function(){
      jQuery(this).click(function(){
        selected_field = jQuery(this).next('input');
        image_types = jQuery(this).attr('rel');
        jQuery.getJSON(
          dt_theme_path + "/file-loader.php?image_dir="+image_types, 
          function(data) { select_image(data, selected_field); }
        );
      });
    });
  </script>
</div>