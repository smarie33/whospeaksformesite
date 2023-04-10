<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'whospeaksforme' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'UKD(uj~R8 +Dm{?|L5GfLr%B{(@.b4Hw6TRo`@i{{fNNPP=8ZN@`NxP95l6|R|WG' );
define( 'SECURE_AUTH_KEY',  'vA15>I! {z-sru gbFd]jEvTN`//R>O^o*2^/:gex%fR)gjxgD2X$N[;LiojN%wa' );
define( 'LOGGED_IN_KEY',    '#&7<?VQGZiVR>MFSU0lToK+g4|Dm)V_/O>$]=5p4`lTrFg86t Q<Fey1$iTW=z:U' );
define( 'NONCE_KEY',        't5!5p=NLI(kj56Ld{SoL~>~us*PKre#oNNoPbE0:36}~`u*48kaB1HpBYrD)FLwX' );
define( 'AUTH_SALT',        'A5Pw?O0<<0$UZXa+q#,fjT.8BY7GppKkW?^3v:})+%_`MX|NY=M^N8-0zX95*0qx' );
define( 'SECURE_AUTH_SALT', 'N_GcbS-QeNaHT(1)rTv#uO|n&-G-q];:)X{J;lBcyURi.%f[H>b3gi(V(#_Vpq;A' );
define( 'LOGGED_IN_SALT',   'Y]%sqZUStg)bs`aG;xD;rhd[9N((ju5(eqoJ3,rxgot=S@Thki&gyLXgUofn%L>>' );
define( 'NONCE_SALT',       'tGcdPKaS~$w2!e<l4vrXQyVEU@rDOC%s%{K/:1$b][U+?lIm4W$F%G[03C06/Sh9' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
