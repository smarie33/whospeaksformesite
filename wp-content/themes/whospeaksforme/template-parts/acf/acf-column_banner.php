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

<section class="acf-full_width_banner alignfull" style="background-color:<?php $column['banner_color'] ?>">
  <?php $column['text']; ?>
  <?php $banner_link = $column['link'] ?>
  <?php if(!empty($banner_link)): ?>
    <?php $open_new = $banner_link['target'] ? $banner_link['target'] : '_self'; ?>
  <p class="button-paragraph">
    <a class="button <?php $column['button_type'] ?>" href="<?php echo $banner_link['url'] ?>" target="<?php echo $open_new; ?>"><?php echo $banner_link['title'] ?></a>
  </p>
<?php endif; ?>
</section>