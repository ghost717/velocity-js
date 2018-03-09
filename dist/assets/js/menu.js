$(document).ready(function(){

	$(".menu-toggle").click(function(event) {
        $(this).toggleClass('toggled');
        $("#primary-menu").toggleClass('active');
    });

    $(".menu-item").click(function(event) {
        $(".menu-toggle").removeClass('toggled');
        $("#primary-menu").removeClass('active');
    });

});