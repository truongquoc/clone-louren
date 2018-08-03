CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker', 'justify'] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
    config.format_img = { element: 'img', name: 'Image Responsive', attributes: { 'class': 'img-responsive' } };
    config.stylesSet = [
        { name: 'Responsible Image', element: 'img', styles: {'margin': 'auto'}, attributes: { 'class': 'img-responsive' } }
    ];

    config.height = '500px';

    config.disableObjectResizing = false;
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre';

    config.extraPlugins = 'oembed,widget,widgetselection,clipboard,lineutils,dialog,dialogui,notification,toolbar,button,justify,image2,liststyle';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.filebrowserBrowseUrl = "/public/vendors/ckeditor/ckfinder/ckfinder.html";

    config.filebrowserImageBrowseUrl = "/public/vendors/ckeditor/ckfinder/ckfinder.html?type=Images";

    config.filebrowserFlashBrowseUrl = "/public/vendors/ckeditor/ckfinder/ckfinder.html?type=Flash";

    config.filebrowserUploadUrl = "/public/vendors/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files";

    config.filebrowserImageUploadUrl = "/public/vendors/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images";

    config.filebrowserFlashUploadUrl = "/public/vendors/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash";

};
