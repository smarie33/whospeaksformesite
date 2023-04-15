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

<section id="block-sociallinksblock" class="acf-social_media alignfull">
    <h2 class="block__title"><?php the_sub_field('text'); ?></h2>
    <?php foreach(get_sub_field('options') as $option): ?>
      <?php if($option == 'email'): ?>
       <a href="<?php echo get_sub_field($option)['url']; ?>" target="_blank" > <i class="fa fa-envelope-square fa-2x" aria-hidden="true"></i></a>
      <?php else: ?>
        <?php $is_square = ($option == 'instagram') ? '' : '-square'; ?>
       <a href="<?php the_sub_field($option); ?>" target="_blank" > <i class="fa fa-<?php echo $option; ?><?php echo $is_square; ?> fa-2x" aria-hidden="true"></i></a>
       <?php endif; ?>
    <?php endforeach; ?>
</section>