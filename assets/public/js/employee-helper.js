function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("inputGroupFile01").files[0]);
  oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
  };
}

$('input[type="file"]').change(function (e) {
  var fileName = e.target.files[0].name;
  $(".custom-file-label").html(fileName);
});
