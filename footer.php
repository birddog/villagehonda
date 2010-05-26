      <div class="clear"></div>

      <div id="bottom-banner-ad">
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("bottom-banner-ad") ) : ?><?php endif; ?>
      </div>

      <div class="clear"></div>

      <div id="footer">
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer-left") ) : ?><?php endif; ?>
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer-middle") ) : ?><?php endif; ?>
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer-right") ) : ?><?php endif; ?>
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer") ) : ?><?php endif; ?>
        <div style="clear:both"></div>
      </div>
    </div>
    <div id="breakout-footer">
      <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("breakout-footer") ) : ?><?php endif; ?>
    </div>
    <?php dt_custom_javascript(); ?>
    <?php dt_google_analytics(); ?>
    <?php wp_footer(); ?>
  </body>
</html>
