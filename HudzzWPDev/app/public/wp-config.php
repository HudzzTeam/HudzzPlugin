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
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

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
define( 'AUTH_KEY',          '0xFE`I|AL.Gq=PV~}%oYq%pA;4Q>q;F@0iqocfKyMjk!TH!Sv?Bn]4/r8$>ik+V?' );
define( 'SECURE_AUTH_KEY',   'dB+>&7HxSS3e^J@4s{j6rCcGLVRR.U<.wB9;/!6+J+j0IH:ls4kY/0yRk$F0{|uO' );
define( 'LOGGED_IN_KEY',     'fyO2U<rj[P>We3,Q#Vk/{Y+n~~]H!au!rGag!B ^rsHl4Wr+LQ[nZZV+eG%lAQ(h' );
define( 'NONCE_KEY',         '8D^p5;tJdm-v^cbrhA{Npi/DFR7`]0;al*eJg1zH<s{k;(gf!.ZR0UM-Ijw$7)hJ' );
define( 'AUTH_SALT',         '1baFr/@nk0>=TOjT>`igb}J<bY(Df>{SrgNLo?3U0^ /PjEen#v0v>HcT?E=|1-!' );
define( 'SECURE_AUTH_SALT',  '/1cuB<Y_o:D:({iD&;2m9gdTUcT*nYG95wqqdE9Tt#gY#WZc%1g?,cpJu}YB{hYY' );
define( 'LOGGED_IN_SALT',    'iBWL.K;(k0xjzs*X4A3#Kz}z9 -WaUD%NRH<K3]5pRkI )~]Bhyl1,K4Yeq 19GT' );
define( 'NONCE_SALT',        'qc-P/d&}nP}vC{6#9g:*}m9s4w*,|WfuG#;+K5jN8`56=K0bByZ.|Rn[2J*nuM&,' );
define( 'WP_CACHE_KEY_SALT', 'A98)di+a1A5Rm4.~=6NGB4YzUS1(LaKM(i4L)9B#jY=x_eR.(Niniu)B+|H?W[z1' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
