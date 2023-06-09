<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header();

$description = get_the_archive_description();
?>

<?php if ( have_posts() ) : ?>

	<header class="page-header alignwide">
		<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
		<?php if ( $description ) : ?>
			<div class="archive-description"><?php echo wp_kses_post( wpautop( $description ) ); ?></div>
		<?php endif; ?>
	</header><!-- .page-header -->

	<article class="events alignwide">
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>
			<header class="entry-header">
				<?php
				$dc = date_create(get_field('event_date',get_the_ID()));
				$formateDateAgain = date_format($dc,'F j, Y g:i a');
				the_title( sprintf( '<h2 class="entry-title default-max-width">'.$formateDateAgain.': <a href="%s">', esc_url( get_permalink() ) ), '</a></h2>' );
				twenty_twenty_one_post_thumbnail();
				?>
			</header>
			<?php the_excerpt(); ?>
		<?php endwhile; ?>

		<?php twenty_twenty_one_the_posts_navigation(); ?>
	</article>
<?php else : ?>
	<?php get_template_part( 'template-parts/content/content-none' ); ?>
<?php endif; ?>

<?php
get_footer();
