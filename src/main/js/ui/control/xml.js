Z8.define('org.zenframework.z8.template.controls.xml', {
	extend: 'Z8.form.field.TextArea',
	
	initComponent: function() {
		this.callParent();
		this.codeMirror = null;
		this.textArea = null;
	},

	completeRender: function() {
		this.callParent();

        textArea = this.selectNode("textarea");

        codeMirror = CodeMirror(function (elt) {
            textArea.parentNode.replaceChild(elt, textArea);
        }, {
            value: textArea.title,
            mode: "xml",
            htmlMode: true,
            lineNumbers: true
        });
	},

	setValue: function(value) {
		if (typeof codeMirror !== 'undefined') {
			if (!codeMirror.getValue()) {
				if (this.record) {
					codeMirror.setValue(this.record.data.xml ? this.record.data.xml : '');
				}
			} else if (codeMirror.getValue() !=  value) {
				this.callParent(codeMirror.getValue());
				if (this.record) {
					this.record.data.xml = codeMirror.getValue();
				}
                codeMirror.setValue(value);
			}
		}
	}

});