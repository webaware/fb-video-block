
(function(wp) {

	var el = wp.element.createElement;

	/**
	* declare the editor properties for the block
	* @param {Object} props
	* @return {Array}
	*
	* target:

		<div class="fb-video"
		 data-href="https://www.facebook.com/EXAMPLE/videos/XXXXXXXXXXXXXXXXX/"
		 data-width="450"
		 data-allowfullscreen="true"
		 data-autoplay="true"
		 data-show-captions="false"></div>

	*/
	function editBlock(props) {
		var attrs			= props.attributes;
		var components		= wp.components;
		var TextControl		= components.TextControl;
		var ToggleControl	= components.ToggleControl;

		return [
			el(wp.editor.InspectorControls, { key: "inspector" },
				el(components.PanelBody, { title: 'Player settings', initialOpen: true },
					el(TextControl, {
						type:		"url",
						label:		"Video URL",
						value:		attrs.href,
						onChange:	function(value) { props.setAttributes({ href: value }); },
					}),
					el(TextControl, {
						type:		"number",
						label:		"Width",
						value:		attrs.width,
						min:		0,
						step:		1,
						onChange:	function(value) { props.setAttributes({ width: value }); },
					}),
					el(ToggleControl, {
						label:		"Allow full screen",
						checked:	attrs.allowfullscreen,
						onChange:	function(value) { props.setAttributes({ allowfullscreen: value }); },
					}),
					el(ToggleControl, {
						label:		"Autoplay",
						checked:	attrs.autoplay,
						onChange:	function(value) { props.setAttributes({ autoplay: value }); },
					}),
					el(ToggleControl, {
						label:		"Show Captions",
						checked:	attrs.showCaptions,
						onChange:	function(value) { props.setAttributes({ showCaptions: value }); },
					}),
					el(ToggleControl, {
						label:		"Show Text",
						checked:	attrs.showText,
						onChange:	function(value) { props.setAttributes({ showText: value }); },
					})
				)
			),
			el('figure', {
					key: "fb-video-block",
					className: props.className,
				},
				el('div', {
					className:					"fb-video",
					"data-href":				attrs.href,
					"data-width":				attrs.width,
					"data-allowfullscreen":		attrs.allowfullscreen,
					"data-autoplay":			attrs.autoplay,
					"data-show-text":			attrs.showText,
					"data-show-captions":		attrs.showCaptions,
				})
			),
		];
	}


	/**
	* render the block HTML for the page/post
	* @param {Object} props
	* @return {String}
	*/
	function saveBlock(props) {
		var attrs = props.attributes;

		return el('figure', {
				className: props.className,
			},
			el('div', {
				className:					"fb-video",
				"data-href":				attrs.href,
				"data-width":				attrs.width,
				"data-allowfullscreen":		attrs.allowfullscreen,
				"data-autoplay":			attrs.autoplay,
				"data-show-text":			attrs.showText,
				"data-show-captions":		attrs.showCaptions,
			})
		);
	}

	wp.blocks.registerBlockType('fb-video-block/fb-video', {
		title:		'Facebook Video',
		icon:		'media-video',
		category:	'embed',
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
