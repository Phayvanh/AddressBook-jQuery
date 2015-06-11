//code principal

$(function()
{
	$('#js-add-contact').on('click', onClickAddContact);
	$('#js-save-contact').on('click', onClickSaveContact);
	$('#js-clear-adress-book').on('click', onClickClearAdressBook);

    $(document).on('click', '#js-adress-book a', onClickShowContactDetails);//installation d'un gestionnaire d'évènement par anticipation

    $(document).on('click','#js-contact-details a', onClickEditContact);

    $(document).on('refresh-adress-book', onRefreshAdressBook);
    $.event.trigger('refresh-adress-book');


});

