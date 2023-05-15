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

$bg_color = (get_sub_field('background_color') == '') ? '#fff' : get_sub_field('background_color');
$color = (get_sub_field('color') == '') ? '#fff' : get_sub_field('color');

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

$style_write[] = 'background-color:'.$bg_color;
$style_write[] = 'color:'.$color;
$styles = $style.implode('; ',$style_write).$end;

?>

<section class="acf-social_media_lrg alignfull"<?php echo $styles; ?>>
    <?php foreach(get_sub_field('options') as $option): ?>
      <?php if($option == 'email'): ?>
       <a href="<?php echo get_sub_field($option)['url']; ?>" target="_blank"> <i style="color:<?php echo $color; ?>" class="fa fa-envelope-square fa-2x <?php the_sub_field('hover_color'); ?>" aria-hidden="true"></i></a>
      <?php else: ?>
        <?php $is_square = ($option == 'instagram') ? '' : '-square'; ?>
       <a href="<?php the_sub_field($option); ?>" target="_blank"> <i style="color:<?php echo $color; ?>" class="fa fa-<?php echo $option; ?><?php echo $is_square; ?>  <?php the_sub_field('hover_color'); ?> fa-2x" aria-hidden="true"></i></a>
       <?php endif; ?>
    <?php endforeach; ?>
</section>