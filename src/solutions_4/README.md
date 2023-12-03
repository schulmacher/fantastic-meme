## Ülesanne 1: Räsimine

> 1. Kirjuta selgitus räsimise (hashing) kontseptsioonist - põhiidee ja eesmärk.

Räsimise eesmärk on kiire ligipääs elementidele. Seevastu on väikeste andmehulkade puhul on massiividel parem jõudlus isegi lineaarotsingu puhul. Hashmapidest on programaatiliselt kergem ka väärtustele ligi pääseda,
nt `hashmap->'my_key'` vs `find(my_array, v => v.key = "my_key")`.

Räsimäppi sisestamisel transformeeritakse võti (`key = 10`) räsifunktsiooni (nt jäägi `10 % 13 = 3`) abil ning salvestatakse key räsitabeli massiivi saadud räsi/indeksi kohale. Hashmapist väärtuse leidmiseks räsistatakse `key` samamoodi kui salvestamisel ning leitakse väärtus räsitabelist saadud räsiindeksi abil.

> 2. Kirjelda hea räsifunktsiooni omadusi ja selgita, miks need on olulised.

- Kiire - muidu võiks lihtsalt kasutada lineaarotsingut massividel.
- Loob minimaalselt duplikatsioone/kokkupõrkeid ning lahendab kokkupõrkeid nii, et tulemus ei pärsiks ränikaardi jõudlust.

> 3. Selgita kokkupõrgete lahendamise tehnikaid, eriti eraldi aheldamist (separate
>    chaining) ja avatud aadressimist (open addressing).

Separate chaining puhul koosneb ränitabel/massiiv linked listidest, kuhu aina lisatakse juurde kokkupõrkunud key-de väärtused. Seejuures võib ränitabel olla fikseeritud suurusega, kuna väärtuseid hoitakse aina kasvavas linkedis.

Open addressing salvestab key-d otse ränitabelisse. Ränikonflikti ilmumisel proovitakse saadud räni kuidagi muuta, et leida talle vaba koht räsitabelis.

### Eraldi aheldamine (separate chaining)

Vaatleme lihtsat räsifunktsiooni `k % 3` ja masiivi `[3,5,6,7]`.
Eraldi aheldamise puhul kokkupõrkuvad väärtused lisatakse sama räsistatud indeksi kohale linked listi abil.

```
[
    0: [3, 6]
    1: [7]
    2: [5]
]
```

#### Hea

- Lihtne implementatsioon
- Hash tabel ei saa kunagi täis, kuna kasutatakse linked listi

#### Halb

- Halvimal juhul on otsing O(n), kuna kui paljude võtmete räsid kattuvad siis läheb "kett" pikaks
- Lisa ruum linkimiseks linked listis
- Cache pole hea, kuna linked listi väärtused asuvad suvalises kohas mälus, mitte järjestikku

### Avatud adressimist (open addressing)

Vaatleme lihtsat räsifunktsiooni `k % 3` ja masiivi `[3,6]`.
Avatud adressimine kas suurendab (linear-, quadratic probing) räni väärtust või rakendab kokkupõrkunud räsile uut räsi funktsiooni (double hashing).

Näiteks kui lisame alguses elemendi `3`, mille räsi on `3 % 3 = 0`.

```
[
    0: [3]
]
```

Seejärel proovides lisada elemendi `6 % 3 = 0` tekib konflikt. Lineaarse probingu puhul lisame hashile alati +1 kuniks leiame vaba koha. Lineaarse probingu puhul võib juhtuda, et sarnastest muutujatest tekivad grupid, mis segavad teisi ränisid. Seega vaba koha leidmine ja olemas oleva otsimine võtab rohkem aega.

```
[
    0: [3]
    1: [6]
]
```

Quadratic probing puhul suurendame saadud räni ekspodentsiaalselt iga konfliktu puhul
`(hash + i^2)`.

- `3 % 3 = 0` => `[0: 3]`
- `6 % 3 = 0` juba olemas
  - `0 + 1^2 = 1` => `[0: 3, 1: 6]`,
- `9 % 3 = 0` juba olemas
  - `0 + 1^2 = 1` juba olemas
  - `0 + 2^2 = 4` => `[0: 3, 1: 6, ..., 4: 9]`

#### Double hashing

Kui esimese hash fn räniga on konflikt siis võtame kasutusele
teise räni fn (`hash1(x) + hash2(x)`). Kui ka siis tekib konflikt
siis jätkame teise räni kasutamist, mida korrutame lineaarselt kasvava arvuga.
Ehk me lisame alati esimesele räni fn-i tulemile mingi offseti, mida me kordistame kuniks on leitud vaba koht.

#### Kokkuvõte

Linear probing on lihtne arvutada ning on hea cache jõudlusega, kuid sarnaste väärtuste ränid satuvad hunnikutsse üks teise järel, mis kõigutab kogu ränifunktsiooni ulatust. Quadratic probing nõuab rohkem arvutusi, kuid konfliktis ränid ei satu nii üksteise järele.

Open addressingu puhul võib juhtuda, et räni table saab täis... antud juhul peame tekitama uue räni tabeli mis on suurem ning kopeerima üle väärtused - separate chaining puhul seda ei juhtu, kuna elemendid on seotud linked listi abil. Open addressingu jõudleb paremini, kuna kõik väärtused asuvad samas masiivis, seevastu separate chaining puhul asetsevad väärtused suvalises kohas mälus linked listi tõttu. Chainingut peaksime eelistama siis, kui me ei tea, kui tihti ja kui palju andmeid eemaldatakse/lisatakse. Open addressingi eelistada siis, kui teame kui tihti hashmap-iga interakteeritakse ja palju on konflikte.

## Ülesanne 2: Indeksi Kaardistamise (Index Mapping) Rakendamine ja Analüüs

> 1. Rakenda Index Mapping algoritmi (triviaalne räsimine) kasutades massiive
>    või järjendeid/liste.

```sh
node src/solutions_4/01-trivial-hashing.js
```

> 2. Analüüsi oma rakenduse aja- ja ruumikomplekssust.

Lisamine on O(1) ja peak/vaatamine/leidmine on O(1).

Ruumikompleksus on O(n), kus n on tabeli suurus.

> 3. Aruta, kuidas indeksi kaardistamist massiividega saab rakendada reaalses
>    maailmas.

Näiteks kuude kohta, kus iga kuu numbri kohta salvestame kas kuu on paaritu või mitte.

Või siis iga suvalise andmehulga puhul, kui me suudab siduda väärtuseid otse masiivi indeksitega. Näiteks võtame lennujaamade nimed. Määrame igale lennujaamele ID, mis on võrdne massivi indeksiga, kuhu nimi on salvestatud. Edasipidi koodis kasutame lennujaama nime asemel indeksit kuniks, on vaja nime, mida saame leida kiirelt indeksi abil massiivist. Muidugi lihtsalt stringi võiks funktsioonides niisama indeksi abil edasi kanda, kuid kui peale nime on muid detaile siis parem on siduda indeksi abil kui igas kohas detailidest koopiat hoida.

## Ülesanne 3: Separate Chaining Kokkupõrgete Lahendamiseks

> 1. Rakenda separate chainigut kasutades linked-liste.

```sh
node src/solutions_4/02-separate-chaining.js
```

> 2. Võrdle separate chaningu (SC) efektiivsust open addressing (OA) meetodiga ajalise ja
>    ruumilise komplekssuse mões.

SC puhul peame talletama eraldi mälu listi linkimiseks ning kuna nad ei asu hashi tabeliga samas mälu asukohas on ka otsing aeglasem. Seevastu OA on hash tabeli massiiv peab alati olema suurem tegelikust väärtuste arvust, et vältida lisamisel tekkivat ülerõhku juhul kui massiiv on täis ja peab uut räsitabelit tekitama hakkama. Seega kasutab OA rohekem mälu. SC puhul on ruumiline kompleksus O(n).

Mõlemal SC kui ka OA juhul on lugemine ja kirjutamine O(1), konstantse, ajalise keerukusega, kuid see konstatsus suureneb tabeli suurenemisel. Nt kui SC puhul jaotame kõik väärtused (nt kokku 49) võrdselt räni tabelisse suurusega 7 laiali on kasutegur = 49/7 (võtmete arv/hash tabeli suurus) = 7 ning tegelik ajaline keerukus O(1 + 7), kuna on vaja maksimaalselt teha 7 võrdlust, et leida väärtust linked listist.

OA hash tabeli suurus peab olema suurem või võrdne juba sisestatud väärtuste arvuga, vastasel juhul on ränitabeli massiiv täis ning uusi elemente juurde lisada ei saa. Kui kogu tabeli suurus on 30 ning juba sisestatud elemente on 10 siis koormustegur on `1 / (30 / 10) = 0.33`, mida vähem täis on ränitabel seda väiksem on koormustegur.

> 3. Aruta separate chaning kasutamise plusse ja miinuseid räsitabelites.

Miinuseks ongi see, et räni tabeli suurus ise ei kasva ja sama räniga väärtuseid hoitakse linked listi näol. Seetõttu kui on palju sama räniga elemente siis on halvimal juhul elemendi leidmine võrde lineaarse otsingu ajalise keerukuesega O(n).

Plussiks on see, et me seda on lihtne implmenteerida ning tabelit lihtsam hallata, kuna ta ei saa kunagi täis.

## Ülesanne 4: Open Addressing Tehnikate Uurimine

> 1. Kirjuta lühike ülevaade avatud aadressimise (OA) meetodist kokkupõrgete
>    lahendamisel räsimises.

OA üritab räni konflikte lahendada kas räni inkremeteerimise või topelt ränimise kaudu.

> 2. Võrdle (teooria) kolme tehnikat: lineaarne otsing (linear probing), ruuduline
>    otsing (quadratic probing) ja topelträsimine (double hashing).

Lineaarne otsing lisab räni tulemile arvu, mis suureneb lineaarselt, kuniks leidub ränitabelis tühi koht. Kuna konfliktis olevad elemendid satuvad potentsiaalselt üksteise järele siis potentsiaalselt tekivad hunnikud/klastrid.

Ruuduline otsing lisab räni tulemile arvu, mis suureneb ekspodentsiaalselt (i^2), kuniks leidub ränitabelis tühi koht.

Topelträsimine kasutab kahte räni funtsiooni, kui esimese räni koht on võetud siis lisatakse ränile teise räni funktsiooni tulem, mida oma korda korrutatakse lineaarselt suureneva arvuga `nt (hash1(10) + i * hash2(10)) % tabeli suurus`.

> 3. Aruta, millistes olukordades iga tehnika oleks kõige efektiivsem.

Linear probing oleks hea juhul kui me teame millised ja kui palju key-si põrkuvad kokku. Saaksime arendada ränifunktsiooni, mis ränistaks elemendid nii, et nad sattuvad loogiliselt üksteise järele. Et iga intervalli tagant algab uus ränigrupp. Näiteks `[01, 02, 03, 31, 32, 33, 33, 61, 62, 63]`, kus esimene grupp asub algab 0 indeksist, kolmas grupp 3 indeksist jne. See tagab, et sarnase räni väärtused on samas järjekorras ning otsimiseks kulub vähem aega.

Quadratic probing eemaldab sellised lineaarsed gruppid. Võibolla tasub kasutada siis, kui me teame, et konflikte on vähe, et otsides on ikkagi väärtused suht lähestikku.

Topelträsimine sobiks siis, kui me ei tea palju konflikte täpselt on, kuna topelträsimise puhul leiame suht kiiresti/efektiivselt vaba koha räsitabelis.

## Ülesanne 5: Topelt Räsimise (Double hashing) Rakendamine

> 1. Rakenda topelt räsimise algoritm ja aruta, kuidas see aitab ületada ühekordse
>    räsimise piiranguid.

Alles sain aru, et rakendamine pole koodi kirjutamine?

```
tabeli suurus = 7
hash1(k) = k % 7
hash2(k) = 3 - k % 3
double_hash(k, i) = hash1(k) + i * hash2(k) % 7
```

| x   | hash1 | hash2                | double_hash(x, 1)    | double_hash(x, 2)        |
| --- | ----- | -------------------- | -------------------- | ------------------------ |
| 7   | **0** |                      |                      |                          |
| 14  | 0     | 3 - (14 % 3) = **1** |                      |                          |
| 21  | 0     | 3 - (21 % 3) = **3** |                      |                          |
| 3   | 3     | 3 - (3 % 3) = 3      | (3 + 1 \* 3) % 7 = 1 | (3 + 2 \* 3) % 7 = **2** |

Või siiski... peab rakenduse looma vaadeldes järgmise punkti päringut.

```
node src/solutions_4/03-double-hashing.js
```

> 2. Analüüsi oma rakenduse aja- ja ruumikomplekssust.

Näiteks lisamisel tehakse rohkem kui 30 operatsiooni ehk lineaar otsing on väiksemate andememahtude puhul tõhusam. Kuna tegelikult on maksimaalne ajakompleksus konstante siis võib öelda, et ajakompleksus on O(1), kuna me ei saa öelda, et ajakompleksus on nt O(30 + 1 / (sisestatud elementide arv / tabeli suurus)).

Ruumi kasutus pärast loomist on O(tabeli suurus). Lisamisel ja otsimisel hoiame mõnda muutujat mälus, seega on ruumikompleksus O(1).

> 3. Paku välja stsenaarium, kus topelt räsimine oleks eriti efektiivne.

Tundub, et topel räsimine on väga hea konfliktide vältimiseks. Eriti efektiivne on ta siis, kui on palju selliseid võtmeid, mille ränid kattuvad, kuna suudab vähimate sammudega lieda vaba koha ränitabelis.

## Boonusülesanne: Koormustegur ja Rehashing (Double hashing vs Rehashing)

> 1. Selgita, mis on räsitabeli koormustegur ja miks see on oluline.

Koormustegur näitab kui täis on räsitabel, kus tegelikke väärtuseid hoitakse. Kui koormustegur kasvab üle määratud piiri (nt 0.69) siis luuakse uus suurem räsitabel. Arvutatakse järgmiselt: `1 / (tabeli suurus / sisestatud elementide arv)`.

> 2. Rakenda lihtsat Rehashingu protsessi ja aruta, kuidas see aitab säilitada
>    efektiivset räsitabelit.

Rehashingu toimib siis, kui koormustegur ületab seatud piiri. Vajalik on ta, kuna suuremasse tabelisse mahub rohekem väärtused, kuid vana ränifn-i ulatus ei küündi uutesse kõrgustesse.

```sh
node src/solutions_4/04-rehashing.js
```

> 3. Analüüsi Rehashingu mõju räsitabeli jõudlusele

Rehashing loob uue ränitabeli ning arvutab kõikidele juba olemas olevatele liikmetele uue räni, et uue neid tabeliga siduda. Rehashimisel peame tegema O(n) operatsioone, et uus tabel luua ja O(n + kasutegur) operatsioone, et väärtuseid uuesti hashida.
