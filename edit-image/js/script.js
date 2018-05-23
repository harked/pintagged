jQuery(function($) {
	// Upload image button
	$('#upload-image').click(function() {
		$('#upload-img').click();
	});

	// Display Image after select box
	$(":file").change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
		}
		$('#container-img').addClass("container-bordered");
	});

	// Add new draggable pin inside container 
	$('#add').click(function() {
		$('<div class="drag"/>').appendTo('#container-img')
			.css({ top: 5, left: 5 }).draggable({ containment: "#container-img", scroll: false });
	});

	$('#remove').click(function() {
		$('div:last-child', '#container-img').remove();
	});

	$('#clear').click(function() {
		$('#img-out').empty();
	});

	//Convert to Image DOM
	$("#btnSave").click(function() {
		html2canvas($("#container-img"), {
			onrendered: function(canvas) {
				theCanvas = canvas;
				$("#img-out").append(canvas);
				confirm('Mau di download ??');
				var a = document.createElement('a');
				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
				a.download = 'download.png';
				alert("Berhasil di download...")
			}
		});
	});
});

function imageIsLoaded(e) {
	$('#myImg').attr('src', e.target.result);
};