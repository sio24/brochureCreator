$(".file").change(function(){
	if (this.files && this.files[0]){
		var reader = new FileReader();
		reader.onload = imageIsLoaded;
		reader.readAsDataURL(this.files[0]);
	}
});

.function imageIsLoaded(e){
	$('img').attr('src', e.target.result);
	$('img').fadeIn();
}