# Movies - közös project

# Szerver
## mongoDB Atlas 
Userek adatai:
- keresztnév
- vezetéknév
- város
- születési év
- avatar kép
- email cím
- becenév
- jelszó - hash-elve
- ismerőseim (id-k listája)
- ismerős jelöltek listája (id-k listája)
- filmkategóriák (checkbox lista: akció, sci-fi, rajzfilm, dráma, romkom, ....) *
- kedvenc filmek * 
- kedvenc színészek *

Postok - filmekhez
	- adott filmhez hozzászólás/véleményezés lehetősége. 
		  amint egy filmhez megszületik az első hozzászólás, létrerhozni egy új documentumot, a hozzászólás tárolja el a user id, film id, a hozzászólás maga, dátum - objectIdból.
Postok - színészekhez (opcionális)
		- mint fent csak színészek ID-jával


# Angular
##	Regrisztrációs űrlap - lásd mongodb
	- keresés a kedvenc filmre, kedvenc színészre

## regisztrált userek közti keresés+ oldal
	megjelenik nem érzékeny adat: 
	- becenév
	- életkor
	- lakhely város
	- avatar kép
	- kedvenc filmek listája linkekkel
	- kedvenc színészek listája linkekkel
	- ismerőseim listája - linkek a profil oldalaikra
	- gomb - ismerősnek jelölés

## Admin oldal 
		- minden adat listázása, módosítani, törlni

## Profil oldal
		- jelszó módosítás
		- avatar kép csere
		- kedvenc filmek listája szerkesztés (bővítés, törlés)
		- email cím módosítás
		- regisztráció megszüntetése
		- ismerős kérés visszaigazolása, link a profiljára, kérés törlése
		- chat kezdeményezése lehetőség
	
## Chat - jobbra lent minden fölött látható és megmarad míg be nem zárod

## Film listázás
		- kategóriák szerint - egy sor egy kategória (felette cím) jobbra balra scrollozási lehetőség (csak az adott kategória filmjei közt) - szűrés után ömlesztve (film poszter alatta cím ami megjelenik, cím mellett zárójelben megjelenési év) 
	
	- kategória kiválasztás után listázás 10 évre lebontva ömlesztve

## Konkrét film (kiválasztás után) 
    - részletes infó poszterrel a filmről IMDb értékelés, hozzászólások megjelenítése (link a hozzászólást író profiljára) - hozzászólás írásának lehetősége.

## színészek listázása 
    ABC sorrendben (kép, név) katt után a részletes oldal (filografia - linkek a filmekre, (hozzászólás lehetősége - sokadik körös fejlesztés) )



# Munkák :

	- Szerver+teszt+mongoDB adatbázis+kapcsolat a IMDb-vel, chat backend - Kecs


	- Userekkel való munkák - chat - frontend, ismerős kezelés, login, regisztráció - Angyal Zoltán


	- Filmek, színészek listázása, szűrése, blog bejegyzések kezelése, (szövegformázási lehetőség) navbar, (material scss template) - Nálhi Zsolt

	