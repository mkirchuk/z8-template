Z8.define('org.zenframework.z8.template.controls.youtube', {
	extend: 'Z8.form.field.Text',

    //origin: 'http://localhost', If you are using the IFrame API, which means you are setting the enablejsapi parameter value to 1, you should always specify your domain as the origin parameter value.
    playerCssName: 'youtube-video',
	ratio: 9/16,
	playerMarginTop: '15px',
	allowFullscreen: true,
	showForeignRelated: false,
	autoPlay: false,
	youtubeButton: true,
	
	initComponent: function() {
		this.callParent();
		this.videoId = null;
	},

	htmlMarkup: function() {
		let markup = this.callParent();
            
		let player = {
				tag: 'iframe',
				width: '100%',
				cls: this.playerCssName
		};
		
		if(this.allowFullscreen) {
			player['allowfullscreen'] = true;
		}
		
		markup['cn'].add(player);
		
		return markup;
	},
	
	completeRender: function() {
		this.callParent();
		
		let iframe = this.iframe = this.selectNode('iframe.' + this.playerCssName);
		this.iframe.style.marginTop = this.playerMarginTop;
		
		this.adjustPlayerSize();
		
		let self = this;
		
		window.addEventListener('resize', function() {
			self.adjustPlayerSize();
		});
		
		DOM.addCls(this.iframe, 'display-none');
	},
	
	setValue: function(value) {
		this.callParent(value);
		
		let videoId = this.getVideoId(value);
		
		this.setSource(videoId)
	},
	
	setSource: function(videoId) {
		if(videoId != this.videoId) {
			this.videoId = videoId;
			
			if(this.iframe) {
				if(videoId) {
					this.iframe.src = videoId ? 'https://www.youtube.com/embed/' + videoId +
							'?&rel=' + (this.showForeignRelated ? 1 : 0) +
							'&fs=' + (this.allowFullscreen ? 1 : 0) +
							'&autoplay=' + (this.autoPlay ? 1 : 0) +
							'&modestbranding=' + (!this.youtubeButton ? 1 : 0): '';
					DOM.removeCls(this.iframe, 'display-none');
				} else {
					DOM.addCls(this.iframe, 'display-none');
				}
			}
		}
	},
	
	getVideoId: function(value) {
		var expression = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		var regex = new RegExp(expression);
		
		if(value && value.match(regex)) {
			var match = value.match(regex);
    		return (match&&match[7].length==11)? match[7] : false;
		}
		
		return '';
	},
	
	validate: function() {
		let url = this.getValue();
		this.setValid(!!this.getVideoId(url));
	},

    adjustPlayerSize: function() {
        this.iframe.height = this.iframe.clientWidth * this.ratio;
    }
});