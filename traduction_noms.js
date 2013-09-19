//Mode de priorité et Triangle d'exposition
document.getElementById('id_nom_vitesse').innerHTML=chrome.i18n.getMessage("Vitesse");
document.getElementById('id_nom_ouverture').innerHTML=chrome.i18n.getMessage("Ouverture");
document.getElementById('id_nom_ISO').innerHTML=chrome.i18n.getMessage("ISO");

//Noms des onglets du tableau de réglage
document.getElementById('onglet_reglages').innerHTML=chrome.i18n.getMessage("Reglages");
document.getElementById('onglet_apn').innerHTML=chrome.i18n.getMessage("APN");
document.getElementById('onglet_objectif').innerHTML=chrome.i18n.getMessage("Objectif");
document.getElementById('onglet_distance').innerHTML=chrome.i18n.getMessage("Distances");
document.getElementById('onglet_luminosite').innerHTML=chrome.i18n.getMessage("Luminosite");
document.getElementById('onglet_3D').innerHTML=chrome.i18n.getMessage("3D");
document.getElementById('onglet_viseur').innerHTML=chrome.i18n.getMessage("Viseur");
document.getElementById('onglet_divers').innerHTML=chrome.i18n.getMessage("Divers");


//Onglet de réglages
document.getElementById('id_nom_mode').innerHTML=chrome.i18n.getMessage("PrioOuv");

//Onglet de réglage de l'APN
document.getElementById('apn_capteur').innerHTML=chrome.i18n.getMessage("capteur");
document.getElementById('apn_definition').innerHTML=chrome.i18n.getMessage("definition");
document.getElementById('apn_dynamique').innerHTML=chrome.i18n.getMessage("dynamique");

//Onglet de réglage de l'objectif
document.getElementById('id_nom_obj_pre_def').innerHTML=chrome.i18n.getMessage("ObjPreDef");
document.getElementById('obj_long_focale').innerHTML=chrome.i18n.getMessage("Longueur_focale");

document.getElementById('nom_N_min').innerHTML=chrome.i18n.getMessage("OuvMin");

document.getElementById('nom_anti_vibration').innerHTML=chrome.i18n.getMessage("Anti_vibration");
document.getElementById('liste_anti_vibration').options[0].text=chrome.i18n.getMessage("Oui");
document.getElementById('liste_anti_vibration').options[1].text=chrome.i18n.getMessage("Non");
document.getElementById('nom_resolution').innerHTML=chrome.i18n.getMessage("Resolution");
document.getElementById('nom_aberrations_chromatiques').innerHTML=chrome.i18n.getMessage("Aberrations_chromatiques");



//Onglet de réglage des distances
document.getElementById('id_explication_distances').innerHTML=chrome.i18n.getMessage("Explication_distances");

//Onglet de réglage de la luminosité
document.getElementById('nom_conditions_luminosite').innerHTML=chrome.i18n.getMessage("CondLum");

document.getElementById('liste_scene').options[0].text=chrome.i18n.getMessage("NuitNoire");
document.getElementById('liste_scene').options[1].text=chrome.i18n.getMessage("PleineLune");
document.getElementById('liste_scene').options[2].text=chrome.i18n.getMessage("VilleNuit");
document.getElementById('liste_scene').options[3].text=chrome.i18n.getMessage("Eglise");
document.getElementById('liste_scene').options[4].text=chrome.i18n.getMessage("Interieur");
document.getElementById('liste_scene').options[5].text=chrome.i18n.getMessage("LasVegasNuit");
document.getElementById('liste_scene').options[6].text=chrome.i18n.getMessage("Nuageux");
document.getElementById('liste_scene').options[7].text=chrome.i18n.getMessage("CoucherSoleil");
document.getElementById('liste_scene').options[8].text=chrome.i18n.getMessage("CielVoile");
document.getElementById('liste_scene').options[9].text=chrome.i18n.getMessage("GrandSoleil");
document.getElementById('liste_scene').options[10].text=chrome.i18n.getMessage("MerNeige");

//Onglet 3D
document.getElementById('nom_champ_vision').innerHTML=chrome.i18n.getMessage("ChampsVision");
document.getElementById('nom_flou_av').innerHTML=chrome.i18n.getMessage("FlouAvant");
document.getElementById('nom_flou_ar').innerHTML=chrome.i18n.getMessage("FlouArriere");
document.getElementById('nom_visee_rflex').innerHTML=chrome.i18n.getMessage("ViseeReflex");


//Onglet de réglages Divers
document.getElementById('nom_cdc').innerHTML=chrome.i18n.getMessage("Cdc");
document.getElementById('liste_cdc').options[0].text=chrome.i18n.getMessage("Laxiste");
document.getElementById('liste_cdc').options[1].text=chrome.i18n.getMessage("Normal");
document.getElementById('liste_cdc').options[2].text=chrome.i18n.getMessage("Severe");