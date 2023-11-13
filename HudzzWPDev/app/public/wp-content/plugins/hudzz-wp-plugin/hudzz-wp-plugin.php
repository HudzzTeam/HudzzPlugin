<?php
/*
Plugin Name: Hudzz Closing Disclosure Generator
Plugin URI:  https://www.hudzz.com
Description: Generate closing disclosure documents for your real estate transactions.
Version:     1.0.0
Author:      Nathan Landolt
Author URI:  https://github.com/n8landolt
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Text Domain: Hudzz
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/**
 * Checks if the current post or page contains the shortcode [hudzz-plugin]
 */
function hudzz_contains_shortcode() {
    global $post;
    $shortcode = 'hudzz-plugin';

    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, $shortcode)) {
        return true;
    }

    return false;
}

/**
 * Enqueues scripts and styles conditionally if the current post/page contains the shortcode.
 */
function hudzz_wp_enqueue_scripts() {
  if (hudzz_contains_shortcode()) {
      // Enqueue the vendor script as a module
      wp_register_script('hudzz-wp-plugin-vendor', plugins_url('/build/assets/vendor.js', __FILE__), array(), '1.0', true);
      wp_script_add_data('hudzz-wp-plugin-vendor', 'type', 'module');
      wp_enqueue_script('hudzz-wp-plugin-vendor');

      // Enqueue the main React app script as a module, depends on the vendor chunk
      wp_register_script('hudzz-wp-plugin-app', plugins_url('/build/assets/index.js', __FILE__), array('hudzz-wp-plugin-vendor'), '1.0', true);
      wp_script_add_data('hudzz-wp-plugin-app', 'type', 'module');
      wp_enqueue_script('hudzz-wp-plugin-app');

      // Enqueue the CSS for the React app
      wp_enqueue_style('hudzz-wp-plugin-app-css', plugins_url('/build/assets/index.css', __FILE__));
  }
}
function add_type_attribute($tag, $handle, $src) {
  // if not your script, do nothing and return original $tag
  if ('hudzz-wp-plugin-app' == $handle || 'hudzz-wp-plugin-vendor' == $handle) {
    $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';  
  }
  
  return $tag;
}

function hudzz_customize_register($wp_customize) {

  // Add Section for Plugin Customization
  $wp_customize->add_section('hudzz_custom_styles', array(
      'title'    => __('HUDZZ Custom Styles', 'hudzz'),
      'priority' => 30,
  ));

  $wp_customize->add_setting("hudzz-view-height", array(
    'default' => '700px',
    'transport' => 'refresh',

  ));

  $wp_customize->add_control("hudzz-view-height_control", array(
    'label' => __('View Height', 'hudzz'),
    'section' => 'hudzz_custom_styles',
    'settings' => 'hudzz-view-height',
    'description' => __('Enter the height of the root view in a valid CSS value. Recommended minimum height of 700px.'),
  ));

  $wp_customize->add_setting("hudzz-view-width", array(
    'default' => '460px',
    'transport' => 'refresh',
  ));

  $wp_customize->add_control("hudzz-view-width_control", array(
    'label' => __('View Width', 'hudzz'),
    'section' => 'hudzz_custom_styles',
    'settings' => 'hudzz-view-width',
    'description' => __('Enter the width of the root view in a valid CSS value. Recommended minimum width of 460px.', 'hudzz'),
  ));


  // Add Setting for Primary Color
  $wp_customize->add_setting('hudzz-primary-color', array(
      'default'   => '#007718',
      'transport' => 'refresh',
  ));

  // Add Control for Primary Color
  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-primary-color_control', array(
    'label'    => __('Primary Color', 'hudzz'),
    'section'  => 'hudzz_custom_styles',
    'settings' => 'hudzz-primary-color',
  )));

  $wp_customize->add_setting('hudzz-primary-text-color', array(
      'default'   => '#FFFFFF',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-primary-text-color_control', array(
    'label'    => __('Primary Text Color', 'hudzz'),
    'section'  => 'hudzz_custom_styles',
    'settings' => 'hudzz-primary-text-color',
    'description' => __('This color will be used for text on the primary color background.', 'hudzz'),
  )));

  $wp_customize->add_setting('hudzz-background-color', array(
      'default'   => '#FFFFFF',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-background-color_control', array(
    'label'    => __('Background Color', 'hudzz'),
    'section'  => 'hudzz_custom_styles',
    'settings' => 'hudzz-background-color',
    'description' => __('This color will be used as the background color of the root div. This should match your site background color where the plugin is placed.', 'hudzz'),
  )));

  $wp_customize->add_setting('hudzz-input-text-color', array(
      'default'   => '#000000',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-input-text-color_control', array(
    'label'    => __('Input Text Color', 'hudzz'),
    'section'  => 'hudzz_custom_styles',
    'settings' => 'hudzz-input-text-color',
    'description' => __('This color will be used for text on input fields with Background Color as background.', 'hudzz'),
  )));

  $wp_customize->add_setting('hudzz-secondary-input-color', array(
      'default'   => '#bfbfbf',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-secondary-input-color_control', array(
    'label'    => __('Secondary Input Color', 'hudzz'),
    'section'  => 'hudzz_custom_styles',
    'settings' => 'hudzz-secondary-input-color',
    'description' => __('This color will be used as hint text on input fields with Background Color as background.', 'hudzz'),
  )));

}

function hudzz_customizer_css() {
  ?>
  <style type="text/css">
      :root {
          --hudzz-primary-color: <?php echo get_theme_mod('hudzz-primary-color', '#16a746'); ?>;
          --hudzz-primary-text-color: <?php echo get_theme_mod('hudzz-primary-text-color', '#FFFFFF'); ?>;
          --hudzz-background-color: <?php echo get_theme_mod('hudzz-background-color', '#FFFFFF'); ?>;
          --hudzz-input-text-color: <?php echo get_theme_mod('hudzz-input-text-color', '#000000'); ?>;
          --hudzz-secondary-input-color: <?php echo get_theme_mod('hudzz-secondary-input-color', '#6b6b6b'); ?>;
          --hudzz-view-height: <?php echo get_theme_mod('hudzz-view-height', '700px'); ?>;
          --hudzz-view-width: <?php echo get_theme_mod('hudzz-view-width', '460px'); ?>;
      }
  </style>
  <?php
}
add_action('wp_head', 'hudzz_customizer_css');

add_action('customize_register', 'hudzz_customize_register');


add_filter('script_loader_tag', 'add_type_attribute', 10, 3);


add_action('wp_enqueue_scripts', 'hudzz_wp_enqueue_scripts');

/**
 * Shortcode function that outputs the container div for the React app.
 */
function hudzz_wp_shortcode() {
    return '<div id="hudzz-root"></div>';
}

add_shortcode('hudzz-plugin', 'hudzz_wp_shortcode');