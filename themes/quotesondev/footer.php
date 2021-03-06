<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
				<div id="bottom-nav">
					<nav id="site-navigation" class="main-navigation" role="navigation">
						<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php echo esc_html( 'Primary Menu' ); ?></button>
						<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
					</nav><!-- #site-navigation -->
					<div class="site-info">
						Brought to you by 
						<a href="<?php echo esc_url( 'https://wordpress.org/' ); ?>"><?php printf( esc_html( '%s' ), 'Red Academy' ); ?></a>
					</div><!-- .site-info -->
				</div>
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
