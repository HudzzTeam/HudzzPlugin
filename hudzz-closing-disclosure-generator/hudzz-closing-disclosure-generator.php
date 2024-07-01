<?php
/*
Plugin Name: Hudzz Closing Disclosure Generator
Plugin URI:  https://www.hudzz.com
Description: Generate closing disclosure documents for your real estate transactions.
Version:     1.0.1
Author:      Nathan Landolt
Author URI:  https://github.com/n8landolt
License:     GPL-3.0
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Text Domain: hudzz-closing-disclosure-generator
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/**
 * Checks if the current post or page contains the shortcode [hudzz-closing-disclosure-generator]
 */
function hudzz_closing_disclosure_generator_contains_shortcode() {
    global $post;
    $shortcode = 'hudzz-closing-disclosure-generator';

    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, $shortcode)) {
        return true;
    }

    return false;
}

/**
 * Enqueues scripts and styles conditionally if the current post/page contains the shortcode.
 */
function hudzz_closing_disclosure_generator_wp_enqueue_script() {
  if (hudzz_closing_disclosure_generator_contains_shortcode()) {
      // Enqueue the custom styles for the React app


      // Enqueue the vendor script as a module
      wp_register_script('hudzz-closing-disclosure-generator-vendor', plugins_url('/build/assets/vendor.js', __FILE__), array(), '1.0', true);
      wp_script_add_data('hudzz-closing-disclosure-generator-vendor', 'type', 'module');
      wp_enqueue_script('hudzz-closing-disclosure-generator-vendor');

      // Enqueue the main React app script as a module, depends on the vendor chunk
      wp_register_script('hudzz-closing-disclosure-generator-app', plugins_url('/build/assets/index.js', __FILE__), array('hudzz-closing-disclosure-generator-vendor'), '1.0', true);
      wp_script_add_data('hudzz-closing-disclosure-generator-app', 'type', 'module');
      wp_enqueue_script('hudzz-closing-disclosure-generator-app');

      // Enqueue the CSS for the React app
      wp_enqueue_style('hudzz-closing-disclosure-generator-app-css', plugins_url('/build/assets/index.css', __FILE__), array(), '1.0', 'all');
      
      $custom_css = hudzz_closing_disclosure_generator_custom_styles();
      wp_add_inline_style('hudzz-closing-disclosure-generator-app-css', $custom_css);
  }
}
function hudzz_closing_disclosure_generator_add_type_attribute($tag, $handle, $src) {
  // if not your script, do nothing and return original $tag
  if ('hudzz-closing-disclosure-generator-app' == $handle || 'hudzz-closing-disclosure-generator-vendor' == $handle) {
    $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';  
  }
  
  return $tag;
}

function hudzz_closing_disclosure_generator_customize_register($wp_customize) {

  // Add Section for Plugin Customization
  $wp_customize->add_section('hudzz-closing-disclosure-generator-custom-styles', array(
      'title'    => __('HUDZZ Custom Styles', 'hudzz-closing-disclosure-generator'),
      'priority' => 30,
  ));

  $wp_customize->add_setting("hudzz-closing-disclosure-generator-view-height", array(
    'default' => '700px',
    'transport' => 'refresh',

  ));

  $wp_customize->add_control("hudzz-closing-disclosure-generator-view-height-control", array(
    'label' => __('View Height', 'hudzz-closing-disclosure-generator'),
    'section' => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-view-height',
    'description' => esc_html__('Enter the height of the root view in a valid CSS value. Recommended minimum height of 700px.', 'hudzz-closing-disclosure-generator'),
  ));

  $wp_customize->add_setting("hudzz-closing-disclosure-generator-view-width", array(
    'default' => '460px',
    'transport' => 'refresh',
  ));

  $wp_customize->add_control("hudzz-closing-disclosure-generator-view-width-control", array(
    'label' => __('View Width', 'hudzz-closing-disclosure-generator'),
    'section' => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-view-width',
    'description' => esc_html__('Enter the width of the root view in a valid CSS value. Recommended minimum width of 460px.', 'hudzz-closing-disclosure-generator'),
  ));


  // Add Setting for Primary Color
  $wp_customize->add_setting('hudzz-closing-disclosure-generator-primary-color', array(
      'default'   => '#007718',
      'transport' => 'refresh',
  ));

  // Add Control for Primary Color
  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-closing-disclosure-generator-primary-color_control', array(
    'label'    => __('Primary Color', 'hudzz-closing-disclosure-generator'),
    'section'  => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-primary-color',
  )));

  $wp_customize->add_setting('hudzz-closing-disclosure-generator-text-color', array(
      'default'   => '#FFFFFF',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-closing-disclosure-generator-text-color_control', array(
    'label'    => __('Primary Text Color', 'hudzz-closing-disclosure-generator'),
    'section'  => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-text-color',
    'description' => esc_html__('This color will be used for text on the primary color background.', 'hudzz-closing-disclosure-generator'),
  )));

  $wp_customize->add_setting('hudzz-closing-disclosure-generator-background-color', array(
      'default'   => '#FFFFFF',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-closing-disclosure-generator-background-color-control', array(
    'label'    => __('Background Color', 'hudzz-closing-disclosure-generator'),
    'section'  => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-background-color',
    'description' => esc_html__('This color will be used as the background color of the root div. This should match your site background color where the plugin is placed.', 'hudzz-closing-disclosure-generator'),
  )));

  $wp_customize->add_setting('hudzz-closing-disclosure-generator-input-text-color', array(
      'default'   => '#000000',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-closing-disclosure-generator-input-text-color-control', array(
    'label'    => __('Input Text Color', 'hudzz-closing-disclosure-generator'),
    'section'  => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-input-text-color',
    'description' => esc_html__('This color will be used for text on input fields with Background Color as background.', 'hudzz-closing-disclosure-generator'),
  )));

  $wp_customize->add_setting('hudzz-closing-disclosure-generator-secondary-input-color', array(
      'default'   => '#bfbfbf',
      'transport' => 'refresh',
  ));

  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hudzz-closing-disclosure-generator-secondary-input-color-control', array(
    'label'    => __('Secondary Input Color', 'hudzz-closing-disclosure-generator'),
    'section'  => 'hudzz-closing-disclosure-generator-custom-styles',
    'settings' => 'hudzz-closing-disclosure-generator-secondary-input-color',
    'description' => esc_html__('This color will be used as hint text on input fields with Background Color as background.', 'hudzz-closing-disclosure-generator'),
  )));

}

function hudzz_closing_disclosure_generator_custom_styles() {
  $styles = "
      :root {
          --hudzz-closing-disclosure-generator-primary-color: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-primary-color', '#16a746')) . ";
          --hudzz-closing-disclosure-generator-text-color: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-text-color', '#FFFFFF')) . ";
          --hudzz-closing-disclosure-generator-background-color: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-background-color', '#FFFFFF')) . ";
          --hudzz-closing-disclosure-generator-input-text-color: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-input-text-color', '#000000')) . ";
          --hudzz-closing-disclosure-generator-secondary-input-color: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-secondary-input-color', '#6b6b6b')) . ";
          --hudzz-closing-disclosure-generator-view-height: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-view-height', '700px')) . ";
          --hudzz-closing-disclosure-generator-view-width: " . esc_attr(get_theme_mod('hudzz-closing-disclosure-generator-view-width', '460px')) . ";
      }
  ";
  return $styles;
}

add_action('customize_register', 'hudzz_closing_disclosure_generator_customize_register');

add_filter('script_loader_tag', 'hudzz_closing_disclosure_generator_add_type_attribute', 10, 3);

add_action('wp_enqueue_scripts', 'hudzz_closing_disclosure_generator_wp_enqueue_script');

/**
 * Shortcode function that outputs the container div for the React app.
 */
function hudzz_closing_disclosure_generator_wp_shortcode() {
    return '<div id="hudzz-closing-disclosure-generator-root"></div>';
}

add_shortcode('hudzz-closing-disclosure-generator', 'hudzz_closing_disclosure_generator_wp_shortcode');