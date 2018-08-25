<?php
namespace webaware\fb_video_block;

if (!defined('ABSPATH')) {
	exit;
}

require FB_VIDEO_BLOCK_PLUGIN_ROOT . 'includes/class.Plugin.php';
Plugin::getInstance()->addHooks();
