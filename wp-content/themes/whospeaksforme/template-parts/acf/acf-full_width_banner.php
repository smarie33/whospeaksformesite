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

<section class="acf-full_width_banner alignfull" style="background-color:<?php the_sub_field('banner_color') ?>">
  <?php the_sub_field('text'); ?>
  <?php $banner_link = get_sub_field('link') ?>
  <?php if(!empty($banner_link)): ?>
    <?php $open_new = $banner_link['target'] ? $banner_link['target'] : '_self'; ?>
  <p class="button-paragraph">
    <a class="button <?php the_sub_field('button_type') ?>" href="<?php echo get_sub_field('link')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo $banner_link['title'] ?></a>
  </p>
<?php endif; ?>
</section>