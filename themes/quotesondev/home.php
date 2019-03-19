<?php
/**
 * The template for displaying all pages.
 * Template Name: Home
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		

		<?php
			$args = array(
				'orderby'=>'rand', 
				'posts_per_page'=>'1'
			);

			$quote=new WP_Query($args);
		?>

		<?php while ($quote->have_posts()) : $quote->the_post(); ?>

			<h2 id="quote-content"><?php the_content(); ?></h2>
			<p id="quote-author">- <?php the_title(); ?> <a id="quote-category" href="#"> </a></p>

		<?php endwhile; // End of the loop. ?>

		<button id="get-another-quote-button">
			Show Me Another!
		</button> 

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
