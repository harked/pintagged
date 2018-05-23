jQuery(function($) {
	//Open an Image
	$(":file").change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
		}
		$('#container').addClass("container-bordered");
	});

	// Add new pin, drag around canvas
	$('#add').click(function() {
		$('<div class="drag"/>')
			.appendTo( container )
			.css({
				top: 100,
				left: 800
			});
	});
	$( document ).on("drag",".drag",function( ev, dd ) {
		$( this ).css({
			top: dd.offsetY,
			left: dd.offsetX
		});
	});

	// Limited drag only around container
	var $div = $('#container');
	$('.drag')
		.drag("start",function( ev, dd ){
			dd.limit = $div.offset();
			dd.limit.bottom = dd.limit.top + $div.outerHeight() - $( this ).outerHeight();
			dd.limit.right = dd.limit.left + $div.outerWidth() - $( this ).outerWidth();
		})
		.drag(function( ev, dd ){
			$( this ).css({
				top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
				left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
			});
		});

	//Upload Button
	$('#upload-image').click(function() {
		$('#upload-img').click();
	});

	//Convert to Image
	$("#btnSave").click(function() {
			html2canvas($("#container"), {
					onrendered: function(canvas) {
							theCanvas = canvas;
							document.body.appendChild(canvas);

							Canvas2Image.saveAsPNG(canvas);
							$("#img-out").append(canvas);
							// Clean up
							document.body.removeChild(canvas);
					}
			});
	});
});

function imageIsLoaded(e) {
	$('#myImg').attr('src', e.target.result);
};
