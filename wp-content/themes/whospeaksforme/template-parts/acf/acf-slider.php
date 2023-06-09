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

$slides = get_sub_field('slides');
$bg_color = (get_sub_field('background_color') == '') ? '#fff' : get_sub_field('background_color');
$title_color = (get_sub_field('title_color') == '') ? '#fff' : get_sub_field('title_color');
$att_color = (get_sub_field('attribution_color') == '') ? '#fff' : get_sub_field('attribution_color');
$tilt_type = 'left';
?>
<section class="acf-slider alignfull" style="background-color:<?php echo $bg_color; ?>">
  <img class="custom-cursor" src="<?php echo get_template_directory_uri(); ?>/assets/images/arrow.svg" alt="custom cursor" />
  <div class="title"  style="color:<?php echo $title_color; ?>"><?php the_sub_field('title'); ?></div>
  <div class="acf-slider-area">
    <?php if(get_sub_field('words')): ?>
      <?php foreach($slides  as $slide): ?>
      <div class="acf-slide">
        <div class="text"><?php echo $slide['content']; ?></div>
        <div class="image">
          <div class="image-holder <?php echo $tilt_type; ?>-tilt">
            <img src="<?php echo $slide['image']['sizes']['1536x1536']; ?>">
          </div>
          <?php if(!empty($slide['attribution'])): ?>
          <div class="attribution"><span style="color:<?php echo $att_color; ?>">Courtesy of</span> <a href="<?php echo $slide['attribution']['url']; ?>"><?php echo $slide['attribution']['title']; ?></a></div>
          <?php endif; ?>
        </div>
      </div>
      <?php $tilt_type = ($tilt_type == 'left') ? 'right' : 'left'; ?>
      <?php endforeach; ?>
    <?php else: ?>
      <?php foreach($slides  as $slide): ?>
      <div class="acf-slide">
        <div class="image">
          <div class="image-holder not-hidden">
            <img src="<?php echo $slide['image']['sizes']['1536x1536']; ?>">
          </div>
          <?php if(!empty($slide['attribution'])): ?>
          <div class="attribution"><span style="color:<?php echo $att_color; ?>">Courtesy of</span> <a href="<?php echo $slide['attribution']['url']; ?>"><?php echo $slide['attribution']['title']; ?></a></div>
          <?php endif; ?>
        </div>
      </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</section>