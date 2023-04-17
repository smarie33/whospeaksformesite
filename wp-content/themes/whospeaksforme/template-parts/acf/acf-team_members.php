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

<section class="acf-team_members alignfull">
  <?php $direction = 'row'; ?>
  <?php $team_members = get_sub_field('team_members'); ?>
  <?php if( $team_members ): ?>
    <?php foreach( $team_members as $member ): ?>
      <?php setup_postdata($member); ?>
      <div class="member" style="flex-direction:<?php echo $direction ?>">
        <div class="column">
          <?php echo get_the_post_thumbnail( get_the_ID(), 'large' ); ?>
        </div>
        <div class="column">
          <h2><?php the_title(); ?></h2>
          <h3><?php the_field('type'); ?>:</h3><span><?php the_field('position') ?></span>
          <h3>Location:</h3><span><?php the_field('location') ?></span>
          <?php the_content(); ?>
        </div>
      </div>
      <hr>
      <?php $direction = ($direction == 'row') ? 'row-reverse' : 'row'; ?>
    <?php endforeach; ?>
    <?php wp_reset_postdata(); ?>
  <?php endif; ?>
</section>