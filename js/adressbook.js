function onClickAddContact()
{
		$('#js-contact-form input[type=text]').val(null);
		$('#js-contact-form').data('mode','add').show(400);
		//quand on clique sur "ajouter..." le formulaire s'affiche
}

function onClickSaveContact()
{
	var contact;
	var adressBook;

	contact = createContact
	(
		$('#Title').val(),
		$('#firstName').val(),
		$('#lastName').val(),
		$('#Phone').val()
	);

	adressBook = loadAdressBook();

    if($('#js-contact-form').data('mode') == 'edit')
    {
        var index = $('#js-contact-details a').data('index');
        adressBook[index] = contact;
    }
    else
    {
	    adressBook.push(contact);//ajouter un élément à la fin d'un tableau
    }

	saveAdressBook(adressBook);


    $.event.trigger('refresh-adress-book');

	$('#js-contact-form').hide(400);//à l'envois le formulaire se cache

	return false;//pour ne pas soumettre le formulaire
}

function createContact(Title,firstName,lastName,Phone)
{
	var contact = {};

	switch(Title)
	{
		case 'Madam':
		contact.Title = 'Mme.';
		break;

		case 'Miss':
		contact.Title = 'Mlle.';
		break;

		case 'Mister':
		contact.Title = 'M.';
		break;
	}

	contact.firstName = firstName;
	contact.lastName = lastName.toUpperCase();//convertion du nom en majuscule
	contact.Phone = Phone;

	return contact;
}

function saveAdressBook(adressBook)
{
	saveDataToDomStorage("carnet", adressBook);
	//on sauvegarde la variable sous le nom qu'on choisi, ici "carnet"
}

function loadAdressBook()
{
	var adressBook;

	adressBook = loadDataFromDomStorage("carnet");
	//on récupère les données du "carnet"

	if(adressBook == null)//si les données du carnet sont vide
	{
		adressBook = new Array();//on créé un tableau
	}
	return adressBook;
}

function onRefreshAdressBook()
{
	var adressBook;

	adressBook = loadAdressBook();
    $('#js-adress-book').empty();

	for(var index = 0; index < adressBook.length; index++)
	{
        var hyperlink = adressBook[index].firstName +
            ' ' + adressBook[index].lastName;

        $('#js-adress-book').append
        (
            $('<li>').append
                (
                '<a data-index="'+index+'" href="#">' +
                    hyperlink +'</a>'
                )
        );
	}

}

function onClickClearAdressBook()
{
	saveAdressBook(new Array());//sauvegarde d'un carnet d'adresse vide en ecrasant un carnet d'adresse existant
	$('#js-contact-details').hide();

    $.event.trigger('refresh-adress-book');

}

function onClickShowContactDetails()
{
	var adressBook;
	var contact;
	var index;

	adressBook = loadAdressBook();

	index = $(this).data('index');//this represente l'hyperlien qui a été selectionné

	contact = adressBook[index];//contact récupère les données du tableau par l'index

	$('#js-contact-details').empty().append
        (
            '<h3>'+ contact.Title +' '+ contact.firstName +' '+ contact.lastName +'</h3><p>'+contact.Phone+'</p><a data-index="'+index+'" href="#">Editer un contact</a>'
        );
	//sur la balise <aside> on veut que s'affiche les résultats et on inscrit dans aside les informations qu'on veut avoir

	$('#js-contact-details').show();

}

function onClickEditContact()
{
    var contact;
    var addressBook = loadAdressBook();
    var index;

    index = $(this).data('index');

    contact = addressBook[index];

    switch(contact.Title)
    {
        case 'Mme.':
            $('#Title').val('Madam');
            break;

        case 'Mlle.':
            $('#Title').val('Miss');
            break;

        case 'M.':
            $('#Title').val('Mister');
            break;
    }

    $('#firstName').val(contact.firstName);
    $('#lastName').val(contact.lastName);
    $('#Phone').val(contact.Phone);


    $('#js-contact-form').data('mode','edit').show();
}