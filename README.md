Min lösning till kursmoment 07/10 i Javascript1 på BTH.

Projektidé och upplägg
--------------------------------------------------------------------

Du har blivit kontaktad av ett företag som mäter intelligens, de vill ha din hjälp att skapa ett testverktyg för att räkna ut hur intelligent en person är. Det handlar om att en testperson skall utföra ett antal övningar och det sammanlagda resultatet från övningarna blir intelligensen hos testpersonen. 

Du är tveksam till deras affärsidé, men du accepterar uppdraget som innebär att du skall bygga ett par mindre program som du sätter samman till ett större test-program. Det handlar om JavaScript (HTML, CSS), och det är ju din grej. Du tänker efter och det känns som du har en hel del kod som du kan återanvända.



Bedömning och betygsättning
--------------------------------------------------------------------

När du lämnat in projektet bedöms det tillsammans med dina tidigare redovisade kursmoment och du får ett slutbetyg på kursen. Läs om [grunderna för bedömning och betygsättning](https://dbwebb.se/kurser/faq/bedomning-och-betygsattning).

Projektspecifikation
--------------------------------------------------------------------

Utveckla och leverera projektet enligt specifikationen från kunden (se längre ned i dokumentet). Saknas info i specen så kan du själv välja väg, dokumentera dina val i redovisningstexten.

De tre första kraven är obligatoriska och måste lösas för att få godkänt på uppgiften. De tre sista kraven är optionella krav. Lös de optionella kraven för att samla poäng och därmed nå högre betyg.

Varje krav ger max 10 poäng, totalt är det 60 poäng.

### Krav 1, 2, 3: Grunden

Enligt specifikationen från kunden (se nedan) -- gör ett komplett testverktyg som består av deltest 1, 2 och ett av deltesten 3, 4 eller 5.

Spara din kod i samma struktur som din *sandbox*. Spara filerna i katalogen `me/kmom10/intelligence`.

Strukturera din kod i en eller flera JavaScript-moduler. Den huvudsakliga modulen skall heta `Test`.

Varje del-test skall ha en funktion som heter `Test.reset()`. Det är en fusk-funktion som låter användaren göra om del-testet för att få bättre resultat.

Tipsfrågor och eventuell konfiguration görs via JavaScript-objekt. Antingen direkt i modulen, eller som argument som skickas till modulen.

Kommentera din kod med JSDoc kommentarer, efter bästa förmåga och se till att koden validerar.

### Krav 4, 5, 6: Optionellt

Välj att göra ett eller två ytterligare del-testar. Välj de som du ännu inte gjort av deltest 3, 4 och 5.

Varje deltest är här värt 15 poäng styck.

Specification från kunden
--------------------------------------------------------------------

Så här är tanken att testverktyget skall fungera. Det är en halvt flummig specifikation från kunden, men du gör ditt bästa för att tolka den. Du har ju trots allt en hel del koll på hur man löser sådana här saker.

### Idé om testverktyget

Testpersonen öppnar webbsidan i sin webbläsare. Det kommer upp ett välkomstmeddelande som hälsar välkommen till testverktyget och förklarar idén och vad som skall göras. När testpersonen är klar så skall hen klicka på en länk för att starta testet.

Hela testet skall köras i en enda HTML-sida, utan omladdningar. Varje test skall alltså dynamiskt bygga om sidans innehåll.

### Deltest 1: Tipsfrågor

Första delen av testet är valfritt antal 1X2-frågor. Som en tipspromenad. Frågan visas upp i webbsidan. Testpersonen svarar på frågan (genom att till exempel klicka på svarsalternativen) och får därefter direkt se det rätta svaret. Sedan kan testpersonen välja att gå vidare till nästa fråga.

Du väljer att ta med 5 tipsfrågor, bara för att visa hur det fungerar.

Testpersonen samlar poäng i varje deltest. Här är förslaget att rätt svar ger tre poäng per fråga och fel ger 0 poäng.

### Deltest 2: Fizzbuzz

På detta testet så visar du upp en sekvens av spelet FizzBuzz. Testpersonen skall gissa på nästa siffra i sekvensen genom att klicka på en av flera alternativa svar (länkar eller knappar).

När testpersonen klickat på svaret så visas det rätta svaret tillsammans med en länk till nästa test.

Rätt klick ger tre poäng och fel ger 0 poäng.

Startvärdet för FizzBuzz-sekvensens skall slumpas fram så det inte är samma varje gång.

### Deltest 3: Minne

Detta är ett litet minnes-test som kollar hur bra bildminne man har.

Testpersonen kommer till testet och får en förklarande text. Därefter klickar man på en länk för att starta testet. 

Testet börjar med att 9 flaggor visas under 5 sekunder. Därefter döljs de. Du visar nu upp en numrerad lista men namnen på de nio flaggorna. Testpersonen skall nu klicka på rätt ruta där motsvarande flagga ligger, i rätt ordning. När testpersonen gissar så skall flaggan vändas upp.

Du behöver inte ha nio flaggor, du kan återanvända dem så att samma flagga förekommer flera gånger.

Testpersonen får fortsätta så länge hen gissar rätt. När alla flaggorna visas så är testet över, eller när testpersonen gissar fel.

Rätt klick ger ett poäng styck.

Efter avklarat test kan testpersonen klicka på en länk för att gå vidare till nästa test.

### Deltest 4: Visuell förmåga och läsförståelse

Detta testet kombinerar läsförståelse med visuell förmåga. 

Testet börjar med en text som förklarar vad det går ut på. Sedan klickar testpersonen på en länk för att starta testet.

Testet innebär att du skall rita ut 10 unika objekt. Objekt kan vara en kvadrat, en cirkel, en triangel eller en rektangel. Objektet har en färg. Samtidigt får testpersonen en numrerad lista med 10 alternativ som säger i vilken ordning som de olika objekten skall klickas på. Så här kan alternativen på listan se ut.

1. Den röda cirkeln.
2. Den vita trekanten.
3. Den svarta cirkeln.

Testpersonen måste klicka på rätt objekt i rätt ordning. Om hen klickar fel så fortsätter testet med nästa alternativ på listan. 

Rätt klick ger ett poäng och fel ger 0 poäng.

Testet sker under tidspress. Testet skall utföras på max 15 sekunder. Därefter visas resultatet och en länk som tar testpersonen vidare till nästa test.

### Deltest 5: Uppfattningsförmåga

Testet börjar med en text som förklarar vad det går ut på. Det finns en länk som spelaren kan klicka på för att starta testet.

I testet visas ett objekt under 1 sekund. Testpersonen skall välja att klicka på objektet eller ej. När objektet försvinner så är det en paus på en sekund, sedan visas nästa objekt. Allt som allt visas tio objekt. Objekten är samma som i övningen ovan.

Testpersonen skall få instruktioner att klicka på alla objekt som:

1. Har en annan färg än röd.
2. Har en annan form än kvadrat.
3. Är röd och kvadrat.

Rätt klick ger ett poäng och fel ger 0 poäng.

När testet är klart så visas resultatet tillsammans med en länk till nästa test.

### Formel för att beräkna intelligensen

Den är så hemlig så att du inte får se den. Kunden har bett dig att göra en egen formel så länge, du väljer att göra så här. 

* Varje fråga/övning ger poäng. 
* Total max intelligens är x (du väljer själv) poäng. 

Specen innehåller grova förslag till poängsättningen, men du kan justera den precis som du vill.

### Slutet

När testet är slut så visas en siffra upp som motsvarar intelligensen, tillsammans med siffran för maximal intelligens.
