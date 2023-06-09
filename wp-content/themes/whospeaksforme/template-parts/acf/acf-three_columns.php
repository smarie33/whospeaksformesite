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

$overall_bg_color_for_3 = (get_sub_field('overall_background_color') == '') ? 'none' : get_sub_field('overall_background_color');

?>

<section class="acf-three_columns alignfull" style="background-color:<?php echo $overall_bg_color_for_3; ?>">
  <div class="column<?php if(get_sub_field('bottom_align_content_left')): ?> align-bottom<?php endif; ?><?php if(get_sub_field('scroll_image_left')): ?> scroll-image<?php endif; ?>">
    <?php the_sub_field('content_left') ?>
  </div>
  <div class="column<?php if(get_sub_field('bottom_align_content_center')): ?> align-bottom<?php endif; ?><?php if(get_sub_field('scroll_image_center')): ?> scroll-image<?php endif; ?>">
      <?php the_sub_field('content_center'); ?>
  </div>
  <div class="column<?php if(get_sub_field('bottom_align_content_ight')): ?> align-bottom<?php endif; ?><?php if(get_sub_field('scroll_image_right')): ?> scroll-image<?php endif; ?>">
      <?php the_sub_field('content_right'); ?>
  </div>
</section>