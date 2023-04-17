<?php
/**
 * Template part for displaying an advanced custom field
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Who Speaks For Me
 * @since Twenty Twenty-One 1.0
 */


?>

<section class="acf-free_form_content alignfull" style="background-color:<?php the_sub_field('background_color'); ?>;">
  <div>  <?php the_sub_field('content'); ?></div>
</section>