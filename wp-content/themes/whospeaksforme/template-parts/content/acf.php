<?php
/**
 * Template part for displaying advanced custom fields
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Who Speaks For Me
 * @since Twenty Twenty-One 1.0
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
<?php
if( have_rows('all_modules') ):

    while ( have_rows('all_modules') ) : the_row();

    	get_template_part( 'template-parts/acf/acf', get_row_layout(), the_post());

    endwhile;

endif;

?>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->