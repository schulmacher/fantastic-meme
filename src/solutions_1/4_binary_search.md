# 4. Binaarne otsingualgoritm

## Ülesanne

Looge (vabalt valitud) binaarne otsingualgoritm, mis leiab kindla täisarvu sorteeritud täisarvude loendist.

### Piirangud:

Teie algoritm peaks tagastama täisarvu indeksi, kui see on leitud, või sõnumi, mis väidab, et täisarvu loendis pole.

### Esitamiseks:

Kood binaarse otsingu algoritmi jaoks.
Lühike dokumentatsioon, mis selgitab teie teostust.

## Lahendus

Binaarse otsingu funktsioon eeldab, et massiiv on sorteeritud. Otsingut alustades salvestame 3 muutujat: algus-, kesk- ja lõpp-indeks. Need 3 muutujat tähistavad indekseid ette antud masiivis.

Loobime seni, kuni algusindeks on väiksem kui lõppindeks. Iga iteratsioon vaatame:

- Kas keskpunkti väärtus on võrdne otsitava väärtusega. Kui on siis tagastame keskindeksi tulemusena.
- Kui otsitav väärtus on kõrgem, kui keskpunktis asuv väärtus siis... määrame algpunktiks keskpunkti indeksi + 1, et järgmises iteratsioonis vaadelda keskpunktist lõppu poole jäävaid väärtuseid.
- Kui otsitav väärtus on madalam, kui keskpunktis asuv väärtus siis... määrame lõpp-punktiks keskpunkti indeksi - 1, et järgmises iteratsioonis vaadelda keskpunktist alguse poole jäävaid väärtuseid.

Kuna me iga iteratsioon kas tõstame algusindeksit või madaldame lõpuindeksit siis ühel hetkel saab lõppu indeksi väärtus madalamaks või võrdseks kui algusindeks - siis ka loopimine lõppeb.

Pärast iteratsiooni funktsioon vaatab, kas keskindeksil olev väärtus on võrdeline otsitud väärtusega, kui ei siis ei tagastatakse null väärtus. Kui keskpunkt on võrdne otsitavad väärtusega on halvim juhtum selleks, et leida otsitavat väärtus, kuna keskpunkt ei olnud iteratsiooni vältel juhuslikult see õige otsitav väärtus.
