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
$padding = '';
$styles = '';

$padding_array = [];
$style_write = [];

if(get_sub_field('padding_left') != '' || get_sub_field('padding_top') != '' || get_sub_field('padding_right') != '' || get_sub_field('padding_bottom') != ''){
  $padding_array[] = (get_sub_field('padding_top') == '' || get_sub_field('padding_top') == 0) ? 0 : get_sub_field('padding_top').'px';
  $padding_array[] = (get_sub_field('padding_right') == '' || get_sub_field('padding_right') == 0) ? 0 : get_sub_field('padding_right').'px';
  $padding_array[] = (get_sub_field('padding_bottom') == '' || get_sub_field('padding_bottom') == 0) ? 0 : get_sub_field('padding_bottom').'px';
  $padding_array[] = (get_sub_field('padding_left') == '' || get_sub_field('padding_left') == 0) ? 0 : get_sub_field('padding_left').'px';
  $padding = implode(' ',$padding_array);
  if($padding != '0 0 0 0'){
    $style_write[] = 'padding: '.$padding;
  }
}

if(get_sub_field('background_color') != ''){
  $style_write[] = 'background-color:'.get_sub_field('background_color');
}

if(get_sub_field('background_image') != ''){
  $style_write[] = 'background-image: url('.get_sub_field('background_image')['sizes']['large'].')';
}

if(count($style_write) > 0){
  $styles = $style.implode('; ',$style_write).$end;
}

$img_overlay = '';
if(get_sub_field('image_overlay') != ''){
  $img_overlay = $style.'background-color: '.get_sub_field('image_overlay').$end;
}

?>

<section class="acf-free_form_content alignfull<?php if(get_sub_field('word_border')): ?> word-border<?php endif; ?>"<?php echo $styles ?>>
  <div class="on-top">
    <?php if(get_sub_field('word_border')): ?>
      <div class="top"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
      <div class="centered">
        <div class="left"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
    <?php endif; ?>
      <div class="content"><?php the_sub_field('content'); ?></div>
    <?php if(get_sub_field('word_border')): ?>
      <div class="right"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
      </div>
    <?php endif; ?>
  </div>
  <div class="image-overlay"<?php echo $img_overlay ?>></div>
</section>