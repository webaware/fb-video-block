(function (wp) {
  /**
  * declare the editor properties for the block
  * @param {Object} props
  * @return {Array}
  */
  function editBlock(_ref) {
    let {
      clientId,
      attributes,
      setAttributes
    } = _ref;
    const {
      href,
      width,
      allowfullscreen,
      autoplay,
      showText,
      showCaptions
    } = attributes;
    const {
      InspectorControls
    } = wp.editor;
    const {
      PanelBody,
      TextControl,
      ToggleControl
    } = wp.components;

    function getAdminBlockId() {
      return "fb-video-block-admin-" + clientId;
    }

    function getAdminBlock() {
      return document.getElementById(getAdminBlockId());
    }

    function updateHref(value) {
      const displayURL = getAdminBlock().querySelector("span.fb-video-block-url");
      setAttributes({
        href: value
      });

      if (displayURL) {
        displayURL.textContent = value;
      }
    }

    return [React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, {
      title: "Player settings",
      initialOpen: "true"
    }, React.createElement(TextControl, {
      type: "url",
      label: "Video URL",
      value: href,
      onChange: updateHref
    }), React.createElement(TextControl, {
      type: "number",
      label: "Width",
      value: width,
      min: "0",
      step: "1",
      onChange: value => setAttributes({
        width: value
      })
    }), React.createElement(ToggleControl, {
      label: "Allow full screen",
      checked: allowfullscreen,
      onChange: value => setAttributes({
        allowfullscreen: value
      })
    }), React.createElement(ToggleControl, {
      label: "Autoplay",
      checked: autoplay,
      onChange: value => setAttributes({
        autoplay: value
      })
    }), React.createElement(ToggleControl, {
      label: "Show Captions",
      checked: showCaptions,
      onChange: value => setAttributes({
        showCaptions: value
      })
    }), React.createElement(ToggleControl, {
      label: "Show Text",
      checked: showText,
      onChange: value => setAttributes({
        showText: value
      })
    }))), React.createElement("p", {
      key: "content",
      id: getAdminBlockId()
    }, React.createElement("i", {
      className: "dashicons dashicons-media-video",
      "aria-hidden": "true"
    }), React.createElement("span", null, "Facebook:"), React.createElement("span", {
      className: "fb-video-block-url"
    }, href || "not set"))];
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


  function saveBlock(_ref2) {
    let {
      className,
      attributes
    } = _ref2;
    const {
      href,
      width,
      allowfullscreen,
      autoplay,
      showText,
      showCaptions
    } = attributes;
    return React.createElement("figure", {
      key: "content",
      className: className
    }, React.createElement("div", {
      className: "fb-video",
      "data-href": href,
      "data-width": width,
      "data-allowfullscreen": allowfullscreen,
      "data-autoplay": autoplay,
      "data-show-text": showText,
      "data-show-captions": showCaptions
    }));
  }

  wp.blocks.registerBlockType("fb-video-block/fb-video", {
    title: "Facebook Video",
    icon: "media-video",
    category: "embed",
    attributes: {
      href: {
        type: "url"
      },
      width: {
        type: "integer",
        default: 450
      },
      allowfullscreen: {
        type: "boolean",
        default: false
      },
      autoplay: {
        type: "boolean",
        default: false
      },
      showText: {
        type: "boolean",
        default: false
      },
      showCaptions: {
        type: "boolean",
        default: false
      }
    },
    edit: editBlock,
    save: saveBlock
  });
})(window.wp);
