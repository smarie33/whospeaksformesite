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

$style = ' style="';
$end = '"';
$padding_left_side = '';
$styles_left = '';

$padding_right_side = '';
$styles_right = '';

$columnSize = explode('-',get_sub_field('column_sizes'));
$padding_array_left = [];
$style_write_left = [];
$style_write_left[] = 'width:'.$columnSize[0];

if(get_sub_field('padding_left_left') != '' || get_sub_field('padding_top_left') != '' || get_sub_field('padding_right_left') != '' || get_sub_field('padding_bottom_left') != ''){
  $padding_array_left[] = get_sub_field('padding_top_left') == '' ? 0 : get_sub_field('padding_top_left').'px';
  $padding_array_left[] = get_sub_field('padding_right_left') == '' ? 0 : get_sub_field('padding_right_left').'px';
  $padding_array_left[] = get_sub_field('padding_bottom_left') == '' ? 0 : get_sub_field('padding_bottom_left').'px';
  $padding_array_left[] = get_sub_field('padding_left_left') == '' ? 0 : get_sub_field('padding_left_left').'px';
  $padding_left_write = implode(' ',$padding_array_left);
  if($padding_left_write != '0 0 0 0'){
    $style_write_left[] = 'padding: '.$padding_left_write;
  }
}

if(get_sub_field('background_color_left') != ''){
  $style_write_left[] = 'background-color:'.get_sub_field('background_color_left');
}

$styles_left = $style.implode('; ',$style_write_left).$end;

$padding_array_right = [];
$style_write_right = [];
$style_write_right[] = 'width:'.$columnSize[1];

if(get_sub_field('padding_left_right') != '' || get_sub_field('padding_top_right') != '' || get_sub_field('padding_right_right') != '' || get_sub_field('padding_bottom_right') != ''){
  $padding_array_right[] = get_sub_field('padding_top_right') == '' ? 0 : get_sub_field('padding_top_right').'px';
  $padding_array_right[] = get_sub_field('padding_right_right') == '' ? 0 : get_sub_field('padding_right_right').'px';
  $padding_array_right[] = get_sub_field('padding_bottom_right') == '' ? 0 : get_sub_field('padding_bottom_right').'px';
  $padding_array_right[] = get_sub_field('padding_left_right') == '' ? 0 : get_sub_field('padding_left_right').'px';
  $padding_right_write = implode(' ',$padding_array_right);
  if($padding_right_write != '0 0 0 0'){
    $style_write_right[] = 'padding: '.$padding_right_write;
  }
}

if(get_sub_field('background_color_right') != ''){
  $style_write_right[] = 'background-color:'.get_sub_field('background_color_right');
}

$styles_right = $style.implode('; ',$style_write_right).$end;


?>

<section class="acf-two_columns alignfull">
  <div class="column<?php if(get_sub_field('full_width_images_left')): ?> full-width-images<?php endif; ?><?php if(get_sub_field('scroll_image_left')): ?> scroll-image<?php endif; ?><?php if(get_sub_field('add_button_left')): ?> with-button<?php endif; ?>"<?php echo $styles_left; ?>>
    <?php the_sub_field('content_left'); ?>
        <?php if(get_sub_field('add_button_left')): ?>
      <?php $open_new = get_sub_field('link_left')['target'] ? get_sub_field('link_left')['target'] : '_self'; ?>
      <p class="button-paragraph">
        <a class="button <?php the_sub_field('button_type_left') ?>" href="<?php echo get_sub_field('link_left')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo get_sub_field('link_left')['title'] ?></a>
      </p>
    <?php endif; ?>
  </div>
  <div class="column<?php if(get_sub_field('full_width_images_right')): ?> full-width-images<?php endif; ?><?php if(get_sub_field('scroll_image_right')): ?> scroll-image<?php endif; ?><?php if(get_sub_field('add_button_right')): ?> with-button<?php endif; ?>"<?php echo $styles_right; ?>>
    <?php the_sub_field('content_right'); ?>
    <?php if(get_sub_field('add_button_right')): ?>
      <?php $open_newr = get_sub_field('link_right')['target'] ? get_field('link_right')['target'] : '_self'; ?>
      <p class="button-paragraph">
        <a class="button <?php the_sub_field('button_type_right') ?>" href="<?php echo get_sub_field('link_right')['url'] ?>" target="<?php echo $open_newr; ?>"><?php echo get_sub_field('link_right')['title'] ?></a>
      </p>
    <?php endif; ?>
  </div>
</section>