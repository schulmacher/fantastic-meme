# Ülesanne 1: Laius-Esmalt Otsing (Breadth-First Search, BFS) Implementatsioon

- Rakenda laius-esmalt otsingu algoritm (BFS) vabalt valitud
  programmeerimiskeeles.
- Näita, kuidas algoritm töötab, kasutades konkreetset graafi näidet.

```sh
node src/solutions_6/01_bfs.js
```

# Ülesanne 2: Sügavus-Esmalt Otsing (Depth-First Search, DFS) Implementatsioon

- Rakenda sügavus-esmalt otsingu algoritm (DFS) vabalt valitud programmeerimiskeeles.

```sh
node src/solutions_6/02_dfs.js
```

- Analüüsi selle algoritmi aja- ja ruumikomplekssust.

Ajaline keerukus on O(n), kuna peab kõik läbi käima. Ruumiline keerukus on keeruline... O(log n) kuna antud juhul on tegemist binaarpuuga ning algoritm on rekursiivne. Tegelikut rekursiivse algorütmi ruumiline keerukus võrdeline puu sügavusega, kuna iga "return" ehk rekrusioon kasutab mälu.

# Ülesanne 3: Dijkstra Algoritmi Teoreetiline Analüüs

- Kirjelda Dijkstra algoritmi ja selle kasutamist lühima tee leidmiseks graafides.

Algoritmi vaatab igat punkti ette antud punkti ümber, salvestab punktide vahelised pikkused ning jätkab kõige lühemast. Eeltoodud protsess kordub, kuniks on leitud soovitud punkt.

- Arutle, millistes olukordades on Dijkstra algoritm eriti efektiivne ja millistes olukordades see võib ebaefektiivne olla.

Djikstra on kõige tõhusam lühima tee leidmiseks. Kuid implementatsioon võib kujuneda keerukaks, kui on mitu mitte summeeritavad mõõdet; [näiteks](https://github.com/schulmacher/airoutes/blob/master/src/actions/findShortestRoute.ts#L40-L50) lennutee eelistamine, mis on sammudelt lühem, kuid meetrites pikem.

Ebaeffektiivne võib ta olla siis, kui graaf on väga lai, aga mitte sügav, kuna algoritm on peaaegu BFS.

# Ülesanne 4: Bellman-Fordi Algoritmi Teoreetiline Analüüs

- Kirjelda Bellman-Fordi algoritmi ja selle erinevust Dijkstra algoritmist.

Bellman on aeglasem, kuid suudab tuvastada negatiivseid raskuseid.

- Arutle, kuidas Bellman-Fordi algoritm suudab tuvastada negatiivseid tsükleid graafides ja milline on selle praktiline tähtsus.

Algoritm salvestab igal sammul uue masiivi pikkustest punktideni. Kui uues pikkuste massiivis on mõni cäärtus lühem kui eelnevas masiivis siis on tuvastatud negatiivne tee.

# Ülesanne 5: Graafide Värvimise Probleem

Probleem on NP-complete

- Kirjelda graafide värvimise probleemi olemust ja selle tähtsust
  arvutiteaduses.

Graafide värvimise probleem väljendub selles, et iga graafi tipp peab olema eri värvi oma naabrist.

Näiteks sudoku või kaardi värvimine demonsteerib antud probleemi.

- Arutle, kuidas graafide värvimist saab kasutada ressursside jaotamise ja
  konfliktide lahendamise probleemides.

1. Uus "node" iga resurssi kasutaja kohta
2. Liida kokku (loo edge) "node"-d mis tahavad samal ajal resurssi kasutada
3. Määra värv igale node-le nii, et naabrid poleks sama värvi
4. Värv näitab, milline resurss on kasutajale määratud

# Boonusülesanne (2 punkti): P vs NP Probleemi Ülevaade

- Kirjelda P vs NP probleemi olemust ja selle tähtsust arvutiteaduses.

P on suhteliselt lihtsad. NP probleemid on väga keerulised. NP probleemi lahendust saab kergesti tõestada, kuid lahenuse leidmine on keeruline.

- Arutle, miks on P vs NP probleemi lahendamine oluline ja millised võiksid olla selle lahendamise tagajärjed.

Kui leida viis, et lahendada NP probleem nii, et ta oleks P probleem, siis see tähendaks, et ka ülejäänud NP probleemid oleksid tegelikult P probleemid.

Kui kõik NP probleemid oleksid tegelikult P siis võib internet katki minna. Nt kui suudaksime nt SHA-256 hashi kiiresti leida oleks hetkene krüptograafia mõttetu.
