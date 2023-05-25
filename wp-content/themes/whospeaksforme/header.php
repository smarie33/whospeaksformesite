<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> <?php twentytwentyone_the_html_classes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php if(get_field('show_popup','popup')): ?>
<div id="main-popup" style="background-color:<?php the_field('overlay_background_color','popup') ?>">
	<div class="popup-bg" style="background-color:<?php the_field('popup_background_color','popup') ?>">
		<div class="popup-content">
			<div class="close" style="background-color:<?php the_field('popup_background_color','popup') ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/assets/images/close.png">
			</div>
			<?php the_field('content','popup'); ?>
			<?php if(get_field('add_button','popup')): ?>
            <?php $open_new = get_field('link','popup')['target'] ? get_field('link','popup')['target'] : '_self'; ?>
            <a class="button <?php the_field('button_type','popup') ?>" href="<?php echo get_field('link','popup')['url'] ?>" target="<?php echo $open_new; ?>"><?php echo get_field('link','popup')['title'] ?></a>
          <?php endif; ?>
		</div>		
	</div>
</div>
<?php endif; ?>
<div id="vertical-scroll-bar"></div>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content">
		<?php
		/* translators: Hidden accessibility text. */
		esc_html_e( 'Skip to content', 'twentytwentyone' );
		?>
	</a>

	<?php get_template_part( 'template-parts/header/site-header' ); ?>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">
