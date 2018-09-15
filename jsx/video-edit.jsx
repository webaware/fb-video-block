
(function(wp) {

	/**
	* declare the editor properties for the block
	* @param {Object} props
	* @return {Array}
	*/
	function editBlock({ clientId, attributes, setAttributes }) {
		const { href, width, allowfullscreen, autoplay, showText, showCaptions } = attributes;
		const { InspectorControls } = wp.editor;
		const { PanelBody, TextControl, ToggleControl } = wp.components;

		function getAdminBlockId() {
			return "fb-video-block-admin-" + clientId;
		}

		function getAdminBlock() {
			return document.getElementById(getAdminBlockId());
		}

		function updateHref(value) {
			const displayURL = getAdminBlock().querySelector("span.fb-video-block-url");

			setAttributes({ href: value });

			if (displayURL) {
				displayURL.textContent = value;
			}
		}

		return	[
			<InspectorControls key="inspector">
				<PanelBody title="Player settings" initialOpen="true">
					<TextControl type="url" label="Video URL" value={ href } onChange={ updateHref } />
					<TextControl type="number" label="Width" value={ width } min="0" step="1" onChange={ (value) => setAttributes({ width: value} ) } />
					<ToggleControl label="Allow full screen" checked={ allowfullscreen } onChange={ (value) => setAttributes({ allowfullscreen: value} ) } />
					<ToggleControl label="Autoplay" checked={ autoplay } onChange={ (value) => setAttributes({ autoplay: value} ) } />
					<ToggleControl label="Show Captions" checked={ showCaptions } onChange={ (value) => setAttributes({ showCaptions: value} ) } />
					<ToggleControl label="Show Text" checked={ showText } onChange={ (value) => setAttributes({ showText: value} ) } />
				</PanelBody>
			</InspectorControls>,
			<p key="content" id={ getAdminBlockId() }>
				<i className="dashicons dashicons-media-video" aria-hidden="true" />
				<span>Facebook:</span>
				<span className="fb-video-block-url">{ href || "not set" }</span>
			</p>
		];
	}

	/**
	* render the block HTML for the page/post
	* @param {Object} props
	* @return {String}
	*
	* sample:

		<div class="fb-video"
		 data-href="https://www.facebook.com/EXAMPLE/videos/XXXXXXXXXXXXXXXXX/"
		 data-width="450"
		 data-allowfullscreen="true"
		 data-autoplay="true"
		 data-show-captions="false"></div>

	 */
	function saveBlock({ className, attributes }) {
		const { href, width, allowfullscreen, autoplay, showText, showCaptions } = attributes;

		return (
			<figure key="content" className={ className }>
				<div
					className="fb-video"
					data-href={ href }
					data-width={ width }
					data-allowfullscreen={ allowfullscreen }
					data-autoplay={ autoplay }
					data-showText={ showText }
					data-showCaptions={ showCaptions }
				/>
			</figure>
		);
	}

	wp.blocks.registerBlockType("fb-video-block/fb-video", {
		title:		"Facebook Video",
		icon:		"media-video",
		category:	"embed",
		attributes:	{
						href: {
							type:		"url",
						},
						width: {
							type:		"integer",
							default:	450,
						},
						allowfullscreen: {
							type:		"boolean",
							default:	false,
						},
						autoplay: {
							type:		"boolean",
							default:	false,
						},
						showText: {
							type:		"boolean",
							default:	false,
						},
						showCaptions: {
							type:		"boolean",
							default:	false,
						},
					},
		edit:		editBlock,
		save:		saveBlock,
	});

})(window.wp);
