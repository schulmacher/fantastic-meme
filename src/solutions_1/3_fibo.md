# Rekursiivne Fibonacci funktsioon

## Ülesanne

Kirjutage funktsioon, mis, olles antud täisarv n, tagastab n-nda Fibonacci numbri, kasutades rekursiivset meetodit.

### Piirangud:

Eeldage, et n on mittenegatiivne täisarv.

### Esitamiseks:

Kood rekursiivse Fibonacci funktsiooni jaoks.
Väike dokumentatsioon, mis selgitab teie rekursiivset lähenemist.

## Lahendus

Rekursiivne fibo ploki arvutamine. Fibo numbrid kohtadel 0 (n2) ja 1 (n1) on ette antud. Funktsioon võtab sisse n2, n1, hetkel arvutavata ja soovitud fibonacci numbri asukoha ning arvutab n (n2 + n1). Järgmiseks kutsub fn ennast välja parameetritega n2 = n1, n1 = n, hetkel arvutatav asukoha + 1 ja soovitud asukoha. Rekursioon jätkub, kuniks soovitud asukoht on võrdne hetkel arvutatava asukohaga.
