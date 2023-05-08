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
  $style_write[] = 'background-color:'.get_sub_field('banner_color');
}

if(count($style_write) > 0){
  $styles = $style.implode('; ',$style_write).$end;
}

?>

?>

<section class="acf-full_width_banner alignfull"<?php echo $styles; ?>>
  <?php the_sub_field('text'); ?>
  <?php $banner_link = get_sub_field('link') ?>
  <?php if(!empty($banner_link)): ?>
    <?php $open_new = $banner_link['target'] ? $banner_link['target'] : '_self'; ?>
  <p class="button-paragraph">
    <a class="button <?php the_sub_field('button_type') ?>" href="<?php echo get_sub_field('link')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo $banner_link['title'] ?></a>
  </p>
<?php endif; ?>
</section>