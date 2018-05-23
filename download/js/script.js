jQuery(function($) {
	// Open an Image
	$(":file").change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
		}
		$('#container').addClass("container-bordered");
	});

	// Add new pin and drag inside container
	$('#add').click(function() {
		$('<div class="drag"/>')
			.appendTo( container )
			.css({
				top: 100,
				left: 800
			});
	});
	$( document ).on("drag",".drag",function( ev, dd ){
		$( this ).css({
			top: dd.offsetY,
			left: dd.offsetX
		});
	});

	// Limit pin only dragged inside container
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

	// Upload image button
	$('#upload-image').click(function() {
		$('#upload-img').click();
	});

	//Convert image to png
	$('#btnSave').click(function() {
		html2canvas($('#container'), {
			onrendered: function (canvas) {
				var a = document.createElement('a');
				// If you want to convert to jpg, just change the image/png to image/jpeg and download.png to download.jpg
				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
				a.download = 'download.png';
				a.click();
			}
		});
	});
});

function imageIsLoaded(e) {
	$('#myImg').attr('src', e.target.result);
};
