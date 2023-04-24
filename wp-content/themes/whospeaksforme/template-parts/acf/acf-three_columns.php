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
  <div class="column<?php if(get_sub_field('align_bottom_left')): ?> align-bottom<?php endif; ?>">
    <?php the_sub_field('content_left') ?>
  </div>
  <div class="column<?php if(get_sub_field('align_bottom_center')): ?> align-bottom<?php endif; ?>">
      <?php the_sub_field('content_center'); ?>
  </div>
  <div class="column<?php if(get_sub_field('align_bottom_right')): ?> align-bottom<?php endif; ?>">
      <?php the_sub_field('content_right'); ?>
  </div>
</section>