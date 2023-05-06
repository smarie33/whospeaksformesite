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

<section class="acf-two_columns alignfull">
  <div class="column<?php if(get_sub_field('full_width_images_left')): ?> full-width-images<?php endif; ?><?php if(get_sub_field('add_button_left')): ?> with-button<?php endif; ?>" style="background-color: <?php the_sub_field('background_color_left'); ?>;">
    <?php the_sub_field('content_left'); ?>
        <?php if(get_sub_field('add_button_left')): ?>
      <?php $open_new = get_field('link_left')['target'] ? get_field('link_left')['target'] : '_self'; ?>
      <p class="button-paragraph">
        <a class="button <?php the_sub_field('button_type_left') ?>" href="<?php echo get_sub_field('link_left')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo get_sub_field('link_left')['title'] ?></a>
      </p>
    <?php endif; ?>
  </div>
  <div class="column<?php if(get_sub_field('full_width_images_right')): ?> full-width-images<?php endif; ?><?php if(get_sub_field('add_button_right')): ?> with-button<?php endif; ?>" style="background-color: <?php the_sub_field('background_color_right'); ?>;">
    <?php the_sub_field('content_right'); ?>
    <?php if(get_sub_field('add_button_right')): ?>
      <?php $open_new = get_field('link_right')['target'] ? get_field('link_right')['target'] : '_self'; ?>
      <p class="button-paragraph">
        <a class="button <?php the_sub_field('button_type_right') ?>" href="<?php echo get_sub_field('link_right')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo get_sub_field('link_right')['title'] ?></a>
      </p>
    <?php endif; ?>
  </div>
</section>