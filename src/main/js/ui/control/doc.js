Z8.define('org.zenframework.z8.template.controls.doc', {
	extend: 'Z8.form.field.File',

	initComponent: function() {
		this.callParent();
		this.audioUrl = null;
	},

	htmlMarkup: function() {
		let markup = this.callParent();
            
		let player = {
				tag: 'audio',
				id: 'audio-player',
				controls: 'controls',
				cls: 'doc-audio'
		};
		
		markup['cn'].add(player);
		
		return markup;
	},
	
	completeRender: function() {
		this.callParent();
		
		let audio = this.audio = this.selectNode('audio.doc-audio');
		
		DOM.addCls(this.audio, 'display-none');
	},
	
	setValue: function (value, displayValue)  {
		this.callParent(value, displayValue);

		this.setSource(value);
	},
	
	setSource: function(audioUrl) {
		if(audioUrl != this.audioUrl) {
			this.audioUrl = audioUrl;
			
			if(this.audio) {
				if(audioUrl && this.getValue()[0]) {
					this.audio.src = `${this.getValue()[0].path}?&id=${this.getValue()[0].id}&session=${Application.session}`;
					DOM.removeCls(this.audio, 'display-none');
				} else {
					DOM.addCls(this.audio, 'display-none');
				}
			}
		}
	}
});