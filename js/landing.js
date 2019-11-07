window.onload = () => {
    $('#giveStartModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var type = button.data('type');
        var title = button.data('title');
        var modal = $(this)
        modal.find('.modal-header').addClass(type);
        modal.find('.modal-title').text(title);
    });

    $('#giveStartModal').on('hidden.bs.modal', function (event) {
        var modal = $(this)
        modal.find('.modal-header').removeClass('excellence team-work think-big innovation fun moral');
        modal.find('.modal-title').text('');
    });
}
