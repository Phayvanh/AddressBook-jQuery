function saveDataToDomStorage(name, data)
{//sauvegarde de donnée dans la mémoire du navigateur
	var jsonData;

	jsonData = JSON.stringify(data);//converti une donnée complexe en donnée simple, en chaîne de caractère au format JSON

	//setItem sert à écrire/stocker dans le DOM Storage de la chaîne de caractère JSON
	window.localStorage.setItem(name,jsonData);

}

function loadDataFromDomStorage(name)
{
	var jsonData;

	jsonData = window.localStorage.getItem(name);//on charge les données qu'on veut convertir grâce à "getItem"

	return JSON.parse(jsonData);//on utilise "parse" pour convertir la donnée voulu et on retourne le résultat

}