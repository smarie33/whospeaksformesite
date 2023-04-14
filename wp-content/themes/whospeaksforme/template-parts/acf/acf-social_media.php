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

<section id="block-sociallinksblock" class="acf-social_media">
    <h2 class="block__title"><?php the_sub_field('text'); ?></h2>

    <?php foreach(get_sub_field('options') as $option): ?>
      <?php if($option == 'email'): ?>
       <a href="<?php the_sub_field($option); ?>" target="_blank" > <i class="fa fa-envelope-square fa-2x" aria-hidden="true"></i></a>
      <?php else: ?>
       <a href="<?php the_sub_field($option); ?>" target="_blank" > <i class="fa fa-"<?php the_sub_field($option); ?>-square fa-2x" aria-hidden="true"></i></a>
       <?php endif; ?>
    <?php endforeach; ?>
</section>