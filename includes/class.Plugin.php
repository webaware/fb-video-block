<?php
namespace webaware\fb_video_block;

if (!defined('ABSPATH')) {
	exit;
}

/**
* class for managing the plugin
*/
class Plugin {

	/**
	* static method for getting the instance of this singleton object
	* @return self
	*/
	public static function getInstance() {
		static $instance = null;

		if (is_null($instance)) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	* hide constructor
	*/
	private function __construct() {
	}

	/**
	* hook WordPress
	*/
	public function addHooks() {
		add_action('init', [$this, 'registerBlocks']);
		add_action('wp', [$this, 'maybeAddFbScript']);
	}

	/**
	* register editor blocks
	*/
	public function registerBlocks() {
		if (!function_exists('register_block_type')) {
			// no Gutenberg, nothing to do
			return;
		}

		$min = SCRIPT_DEBUG ? '' : '.min';
		$ver = SCRIPT_DEBUG ? time() : FB_VIDEO_BLOCK_VERSION;

		wp_register_script('fb-video-block-editor', plugins_url("js/video-edit$min.js", FB_VIDEO_BLOCK_PLUGIN_FILE), ['wp-components', 'wp-element'], $ver, true);

		register_block_type('fb-video-block/fb-video', [
			'editor_script'		=> 'fb-video-block-editor',
		]);
	}

	/**
	* add Facebook script block if content has a video block
	*/
	public function maybeAddFbScript() {
		$content = get_post_field('post_content');
		if (!empty($content) && strpos($content, 'wp-block-fb-video-block-fb-video') !== false) {
			add_action('wp_print_footer_scripts', [$this, 'addFbScript'], 5);
		}
	}

	/**
	* add Facebook script block
	*/
	public function addFbScript() {
		include FB_VIDEO_BLOCK_PLUGIN_ROOT . '/views/script-block.php';
	}

}
