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

<section class="acf-three_columns alignfull">
  <div>
    <?php the_sub_field('content_left') ?>
  </div>
  <div>
      <?php the_sub_field('content_center'); ?>
  </div>
  <div>
      <?php the_sub_field('content_right'); ?>
  </div>
</section>