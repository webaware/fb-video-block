<?php
/*
Plugin Name: Facebook Video Block
Plugin URI: https://github.com/webaware/fb-video-block
Description: a Gutenberg block for adding Facebook videos to a page/post
Version: 0.0.1
Author: WebAware
Author URI: https://shop.webaware.com.au/
*/

/*
copyright (c) 2018 WebAware Pty Ltd (email : support@webaware.com.au)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if (!defined('ABSPATH')) {
	exit;
}

define('FB_VIDEO_BLOCK_PLUGIN_FILE', __FILE__);
define('FB_VIDEO_BLOCK_PLUGIN_ROOT', __DIR__ . '/');
define('FB_VIDEO_BLOCK_PLUGIN_NAME', basename(__DIR__) . '/' . basename(__FILE__));

define('FB_VIDEO_BLOCK_MIN_PHP', '5.4');
define('FB_VIDEO_BLOCK_VERSION', '0.0.1');

if (version_compare(PHP_VERSION, FB_VIDEO_BLOCK_MIN_PHP, '<')) {
	return;
};

require FB_VIDEO_BLOCK_PLUGIN_ROOT . 'includes/bootstrap.php';
