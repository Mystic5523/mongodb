$('#clearButton').click(function () {
    $('#articles').html('')
});

$('#scrapeButton').click(function () {
    location.href = '/scrape'
    console.log('clicked')
})
$('#savedButton').click(function () {
    console.log('clicked')
    location.href = '/saved'

})

$('.viewArticleButton').click(function () {
    console.log('clicked')
    window.location.href = `/article/${$(this).attr('data-id')}`
});



$('.deleteButton').click(function () {
    console.log('clicked')
    let articleId = $(this).data('id');
    $.ajax({
        url: '/delete/' + articleId,
        type: 'PUT',
        success: function (response) {
            window.location.href = '/saved';
        },
        error: function (error) {

        }
    });

});

$('.saveButton').click(function () {
    let articleId = $(this).data('id');
    $.ajax({
        url: '/save/' + articleId,
        type: 'GET',
        success: function (response) {
            window.location.href = '/';
        },
        error: function (error) {

        }
    });
});

$('.commentButton').click(function (e) {
    e.preventDefault()
    let text = $('#commentText').val();
    let articleId = $(this).attr('data-id');
    $.ajax({
        url: '/comment/' + articleId,
        type: 'POST',
        data: {
            comment: text
        },
        success: function (response) {
            window.location.reload();
        },
        error: function (error) {
            console.log(error)
        }
    });
});

$('.del').click(function (e) {
    console.log('clicked')
    let articleId = $(this).data('id');
    $.ajax({
        url: '/comment/' + articleId,
        type: 'PUT',
        success: function (response) {
            window.location.reload();
        },
        error: function (error) {
        }
    });

});