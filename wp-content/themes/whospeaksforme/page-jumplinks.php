<?php /* Template Name: Jump Links Page */ ?>
<?php
/**
 * The template for displaying all single posts utilizing ACF
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header();

$jump_nav = get_field('jump_link_navigation');
$modified_titles = [];
$title_index = 0;
?>

<nav class="acf-jump-link-nav">
    <ul>
    <?php foreach($jump_nav as $nav_item):
        $collapsed_title = str_replace(" ", "-", strtolower($nav_item['jump_title']));
        $modified_titles[] = $collapsed_title;
    ?>
        <li><a class="jump-link" href="#<?php echo $collapsed_title; ?>"><span><?php echo $nav_item['jump_title']; ?></span></a></li>
    <?php endforeach; ?>
    </ul>
    <hr class="double-border">
</nav>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="entry-content">
<?php
if( have_rows('all_modules') ):

    while ( have_rows('all_modules') ) : the_row();
        if(get_row_layout() == 'jump_link'){
            get_template_part( 'template-parts/acf/acf', get_row_layout(), ['jumplink' => $modified_titles[$title_index]]);
            $title_index++;
        }else{
            get_template_part( 'template-parts/acf/acf', get_row_layout(), the_post());
        }

    endwhile;

endif;

?>
    </div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->

<?php get_footer(); ?>
