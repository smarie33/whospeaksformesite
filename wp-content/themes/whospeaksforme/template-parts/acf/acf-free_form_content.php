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

<section class="acf-free_form_content alignfull<?php if(get_sub_field('word_border')): ?> word-border<?php endif; ?>" style="background-color:<?php the_sub_field('background_color'); ?>;">
  <?php if(get_sub_field('word_border')): ?>
    <div class="top"><div class="words">who speaks for me?</div></div>
    <div class="centered">
      <div class="left"><div class="words">who speaks for me?</div></div>
  <?php endif; ?>
    <div class="content"><?php the_sub_field('content'); ?></div>
  <?php if(get_sub_field('word_border')): ?>
    <div class="right"><div class="words">who speaks for me?</div></div>
    </div>
  <?php endif; ?>
</section>