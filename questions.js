// Question pool per topic
// Each topic has ~8-10 questions, quiz shows 4 at a time
// On redo: picks a new set (some overlap is natural and intentional)

const QUESTIONS = {

  'deriv-def': [
    {
      q: 'Vad betyder f\'(x) = 0 i en punkt?',
      options: [
        'Funktionen korsar x-axeln',
        'Tangenten är vågrät (platt)',
        'Funktionen har värdet 0'
      ],
      correct: 1,
      feedback: 'Derivatan = 0 betyder att lutningen på tangenten är 0, dvs tangenten är vågrät. Det säger inget om funktionens värde.'
    },
    {
      q: 'Om f\'(2) = −3, vad gäller om funktionen vid x = 2?',
      options: [
        'Funktionen ökar',
        'Funktionen minskar',
        'Funktionsvärdet är −3'
      ],
      correct: 1,
      feedback: 'Negativ derivata → funktionen minskar i den punkten. Derivatan berättar om förändringen, inte om funktionsvärdet.'
    },
    {
      q: 'Derivatan av en konstant funktion f(x) = 5 är:',
      options: ['5', '0', '1'],
      correct: 1,
      feedback: 'En konstant förändras inte alls → derivatan är 0. Platt linje = noll lutning.'
    },
    {
      q: 'Vad beskriver derivatan geometriskt?',
      options: [
        'Arean under grafen',
        'Lutningen på tangenten i en punkt',
        'Avståndet till origo'
      ],
      correct: 1,
      feedback: 'Derivatan = tangentens lutning. Det är den geometriska tolkningen.'
    },
    {
      q: 'Om f\'(x) > 0 på ett intervall, vad gäller?',
      options: [
        'f(x) > 0 på intervallet',
        'f(x) är växande på intervallet',
        'f(x) har en maxpunkt på intervallet'
      ],
      correct: 1,
      feedback: 'Positiv derivata = funktionen växer (lutar uppåt). Det säger inget om funktionens tecken.'
    },
    {
      q: 'Grafen av f(x) lutar brant nedåt i x = 4. Vilket stämmer?',
      options: [
        'f\'(4) är ett stort positivt tal',
        'f\'(4) är ett negativt tal med stort belopp',
        'f\'(4) = 0'
      ],
      correct: 1,
      feedback: 'Brant nedåt = stor negativ lutning → f\'(4) har stort negativt värde.'
    },
    {
      q: 'Vad är f\'(x) om f(x) = 3?',
      options: ['3', '0', 'Odefinierad'],
      correct: 1,
      feedback: 'f(x) = 3 är en konstant. Konstanter ändras inte → derivatan = 0.'
    },
    {
      q: 'Tangenten till f(x) i x = 1 är vågrät. Vad vet du?',
      options: [
        'f(1) = 0',
        'f\'(1) = 0',
        'f\'(1) = 1'
      ],
      correct: 1,
      feedback: 'Vågrät tangent → lutningen = 0 → f\'(1) = 0.'
    },
    {
      q: 'f\'(x) byter tecken från − till + i x = 3. Vad händer?',
      options: [
        'Funktionen har en maxpunkt',
        'Funktionen har en minpunkt',
        'Funktionen korsar x-axeln'
      ],
      correct: 1,
      feedback: 'Minus till plus = funktionen slutar minska och börjar öka → minpunkt.'
    }
  ],

  'deriv-power': [
    {
      q: 'Derivatan av f(x) = 5x<sup>3</sup> är:',
      options: ['5x<sup>2</sup>', '15x<sup>2</sup>', '3x<sup>2</sup>'],
      correct: 1,
      feedback: '5·3·x<sup>3−1</sup> = 15x<sup>2</sup>. Flytta ner 3:an, multiplicera med koefficienten, minska exponenten.'
    },
    {
      q: 'f(x) = x<sup>3</sup> − 6x + 2. Vad är f\'(x)?',
      options: [
        '3x<sup>2</sup> − 6',
        '3x<sup>2</sup> − 6x',
        'x<sup>2</sup> − 6'
      ],
      correct: 0,
      feedback: 'x<sup>3</sup> → 3x<sup>2</sup>, −6x → −6, och konstanten 2 → 0. Svar: 3x<sup>2</sup> − 6.'
    },
    {
      q: 'Tangentens ekvation i x = a ges av:',
      options: [
        'y = f(a) · x + f\'(a)',
        'y = f\'(x)(x − a)',
        'y = f\'(a)(x − a) + f(a)'
      ],
      correct: 2,
      feedback: 'Tangentformeln: y = f\'(a)(x − a) + f(a). Du behöver både funktionsvärdet f(a) och derivatans värde f\'(a).'
    },
    {
      q: 'f(x) = 4x<sup>2</sup> − x. Tangentens lutning i x = 2?',
      options: ['14', '15', '16'],
      correct: 1,
      feedback: 'f\'(x) = 8x − 1. f\'(2) = 16 − 1 = 15.'
    },
    {
      q: 'Derivatan av f(x) = 7x är:',
      options: ['7', '7x', '0'],
      correct: 0,
      feedback: '7x = 7x<sup>1</sup> → 7·1·x<sup>0</sup> = 7. (x<sup>0</sup> = 1)'
    },
    {
      q: 'Derivatan av f(x) = x<sup>4</sup> − 2x<sup>3</sup> + x är:',
      options: [
        '4x<sup>3</sup> − 6x<sup>2</sup> + 1',
        '4x<sup>3</sup> − 6x<sup>2</sup>',
        '4x<sup>4</sup> − 6x<sup>3</sup> + 1'
      ],
      correct: 0,
      feedback: 'Term för term: x<sup>4</sup> → 4x<sup>3</sup>, −2x<sup>3</sup> → −6x<sup>2</sup>, x → 1.'
    },
    {
      q: 'f(x) = x<sup>2</sup> + 3x. Vad är f\'(−1)?',
      options: ['1', '−2', '−1'],
      correct: 0,
      feedback: 'f\'(x) = 2x + 3. f\'(−1) = 2·(−1) + 3 = −2 + 3 = 1.'
    },
    {
      q: 'f(x) = 2x<sup>2</sup> − 4x + 1. Tangenten i x = 1 har lutning:',
      options: ['0', '4', '−1'],
      correct: 0,
      feedback: 'f\'(x) = 4x − 4. f\'(1) = 4 − 4 = 0. Vågrät tangent!'
    },
    {
      q: 'Derivatan av f(x) = −3x<sup>5</sup> är:',
      options: [
        '−15x<sup>4</sup>',
        '−15x<sup>5</sup>',
        '15x<sup>4</sup>'
      ],
      correct: 0,
      feedback: '−3·5·x<sup>4</sup> = −15x<sup>4</sup>. Minustecknet följer med.'
    },
    {
      q: 'f(x) = x<sup>2</sup>. Tangenten i x = 3 har ekvationen:',
      options: [
        'y = 6x − 9',
        'y = 6x − 3',
        'y = 3x − 9'
      ],
      correct: 0,
      feedback: 'f\'(x) = 2x, f\'(3) = 6, f(3) = 9. y = 6(x−3) + 9 = 6x − 18 + 9 = 6x − 9.'
    }
  ],

  'deriv-exp': [
    {
      q: 'Derivatan av f(x) = e<sup>x</sup> är:',
      options: ['x · e<sup>x−1</sup>', 'e<sup>x</sup>', '1'],
      correct: 1,
      feedback: 'e<sup>x</sup> är sin egen derivata — det är hela poängen med talet e!'
    },
    {
      q: 'Derivatan av f(x) = 3e<sup>−2x</sup> är:',
      options: ['3e<sup>−2x</sup>', '−2e<sup>−2x</sup>', '−6e<sup>−2x</sup>'],
      correct: 2,
      feedback: 'Kex-regeln: 3 · (−2) · e<sup>−2x</sup> = −6e<sup>−2x</sup>. Multiplicera koefficienten med k.'
    },
    {
      q: 'Derivatan av f(x) = 2<sup>x</sup> är:',
      options: [
        'x · 2<sup>x−1</sup>',
        '2<sup>x</sup> · ln(2)',
        '2<sup>x</sup>'
      ],
      correct: 1,
      feedback: 'Annan bas än e: f\'(x) = a<sup>x</sup> · ln(a). Här: 2<sup>x</sup> · ln(2).'
    },
    {
      q: 'Lös e<sup>3x</sup> = 20. Vad blir x?',
      options: ['ln(20) / 3', '20 / 3', '3 · ln(20)'],
      correct: 0,
      feedback: 'Ta ln av båda led: 3x = ln(20), så x = ln(20)/3 ≈ 1,00.'
    },
    {
      q: 'Derivatan av f(x) = e<sup>5x</sup> är:',
      options: ['e<sup>5x</sup>', '5e<sup>5x</sup>', '5e<sup>5</sup>'],
      correct: 1,
      feedback: 'Kex-regeln: k = 5, så f\'(x) = 5e<sup>5x</sup>.'
    },
    {
      q: 'Vad är ln(e<sup>4</sup>)?',
      options: ['e<sup>4</sup>', '4', '4e'],
      correct: 1,
      feedback: 'ln och e tar ut varandra: ln(e<sup>4</sup>) = 4.'
    },
    {
      q: 'Lös e<sup>x</sup> = 1. Vad är x?',
      options: ['1', '0', 'e'],
      correct: 1,
      feedback: 'e<sup>0</sup> = 1, alltså x = 0. (Alla tal upphöjt till 0 = 1)'
    },
    {
      q: 'Derivatan av f(x) = 10 · e<sup>−x</sup> är:',
      options: [
        '10 · e<sup>−x</sup>',
        '−10 · e<sup>−x</sup>',
        '−10 · e<sup>x</sup>'
      ],
      correct: 1,
      feedback: 'C·k·e<sup>kx</sup> = 10·(−1)·e<sup>−x</sup> = −10e<sup>−x</sup>.'
    },
    {
      q: 'Vilken funktion har egenskapen f\'(x) = f(x)?',
      options: ['f(x) = x', 'f(x) = e<sup>x</sup>', 'f(x) = ln(x)'],
      correct: 1,
      feedback: 'e<sup>x</sup> är den enda funktionen (förutom 0) som är sin egen derivata.'
    },
    {
      q: 'Derivatan av f(x) = 3<sup>x</sup> är:',
      options: [
        '3<sup>x</sup>',
        'x · 3<sup>x−1</sup>',
        '3<sup>x</sup> · ln(3)'
      ],
      correct: 2,
      feedback: 'Regeln: a<sup>x</sup> → a<sup>x</sup> · ln(a). Här: 3<sup>x</sup> · ln(3). OBS: potensregeln gäller INTE här (variabeln sitter i exponenten).'
    }
  ],

  'deriv-extreme': [
    {
      q: 'Om f\'(x) går från positiv till negativ i x = a, vad har vi?',
      options: ['En maxpunkt', 'En minpunkt', 'En inflexionspunkt'],
      correct: 0,
      feedback: 'Funktionen växer (f\' > 0) och sen avtar (f\' < 0) → den vänder i en topp = maxpunkt.'
    },
    {
      q: 'f(x) = x<sup>2</sup> − 4x + 1. Var har f en extrempunkt?',
      options: ['x = 4', 'x = 2', 'x = 1'],
      correct: 1,
      feedback: 'f\'(x) = 2x − 4 = 0 → x = 2. Eftersom f\'\'(x) = 2 > 0 är det en minpunkt.'
    },
    {
      q: 'Vad är en inflexionspunkt?',
      options: [
        'Där f(x) = 0',
        'Där f\'(x) = 0',
        'Där f\'\'(x) = 0 och byter tecken'
      ],
      correct: 2,
      feedback: 'Inflexionspunkt = där grafen byter krökning. Kräver att f\'\'(x) = 0 OCH byter tecken.'
    },
    {
      q: 'Första steget för att hitta extrempunkter?',
      options: [
        'Sätt f(x) = 0',
        'Sätt f\'(x) = 0',
        'Beräkna f\'\'(x)'
      ],
      correct: 1,
      feedback: 'Steg 1: Derivera och sätt f\'(x) = 0. Det ger kandidaterna. Sen kolla om f\' byter tecken.'
    },
    {
      q: 'f\'(x) = 3x<sup>2</sup> − 12. Var är extrempunkterna?',
      options: [
        'x = ±4',
        'x = ±2',
        'x = 0'
      ],
      correct: 1,
      feedback: '3x<sup>2</sup> − 12 = 0 → x<sup>2</sup> = 4 → x = ±2.'
    },
    {
      q: 'f(x) = −x<sup>2</sup> + 6x. Vad för typ av extrempunkt har f?',
      options: [
        'Minpunkt (skåla uppåt)',
        'Maxpunkt (skåla nedåt)',
        'Ingen extrempunkt'
      ],
      correct: 1,
      feedback: 'f\'(x) = −2x + 6 = 0 → x = 3. f\'\'(x) = −2 < 0 → maxpunkt. (Parabeln öppnar nedåt.)'
    },
    {
      q: 'Största och minsta värdet av f(x) = x<sup>2</sup> på [−1, 3] hittas genom att:',
      options: [
        'Bara kolla f\'(x) = 0',
        'Jämföra f(−1), f(3) och alla f(x₀) där f\'(x₀) = 0',
        'Derivera två gånger'
      ],
      correct: 1,
      feedback: 'På slutet intervall: kolla ändpunkterna OCH alla kritiska punkter (f\' = 0). Jämför alla funktionsvärden.'
    },
    {
      q: 'f\'\'(x) > 0 på ett intervall. Vad gäller om grafen?',
      options: [
        'Grafen är konkav (skåla nedåt)',
        'Grafen är konvex/kupig uppåt (skåla uppåt)',
        'Grafen är en rät linje'
      ],
      correct: 1,
      feedback: 'f\'\' > 0 → krökning uppåt ("glad mun"). f\'\' < 0 → krökning nedåt ("sur mun").'
    }
  ],

  'int-concept': [
    {
      q: 'En funktion ligger helt under x-axeln från x = 1 till x = 5. Integralen blir:',
      options: ['Negativ', 'Positiv', 'Noll'],
      correct: 0,
      feedback: 'Under x-axeln → negativt bidrag. Hela grafen är under, så integralen blir negativ.'
    },
    {
      q: 'En graf har lika mycket area ovanför som under x-axeln. Integralen blir:',
      options: [
        'Positiv (area är alltid positiv)',
        'Noll (de tar ut varandra)',
        'Det beror på funktionen'
      ],
      correct: 1,
      feedback: 'Positiv area + lika stor negativ area = 0. Integralen mäter nettot.'
    },
    {
      q: 'Vad är skillnaden mellan "integral" och "area"?',
      options: [
        'De är samma sak',
        'Integralen kan bli negativ, arean är alltid positiv',
        'Area gäller bara rektanglar'
      ],
      correct: 1,
      feedback: 'Integralen räknar med tecken (+ ovan, − under x-axeln). Arean = absolutbeloppet, alltid ≥ 0.'
    },
    {
      q: 'f(x) > 0 på hela [a, b]. Vad gäller?',
      options: [
        'Integralen = 0',
        'Integralen = arean (båda positiva)',
        'Integralen < 0'
      ],
      correct: 1,
      feedback: 'Grafen ligger ovanför x-axeln hela vägen → integralen är positiv och lika med arean.'
    },
    {
      q: 'Integralen av f(x) från a till b är −7. Arean mellan grafen och x-axeln är:',
      options: [
        '−7',
        '7',
        'Kan inte avgöras'
      ],
      correct: 1,
      feedback: 'Area = |integral| om grafen inte byter sida. Här: |−7| = 7. (Om grafen byter sida behöver man dela upp.)'
    },
    {
      q: 'Tänk på integralen som en summa. Vad "summerar" man?',
      options: [
        'Alla x-värden',
        'Arean av oändligt många smala remsor under grafen',
        'Derivatans värden'
      ],
      correct: 1,
      feedback: 'Integralen summerar area av tunna remsor f(x)·dx. Därför ser integraltecknet ut som ett S (Summa).'
    },
    {
      q: 'f(x) = 0 på [2, 5]. Vad är ∫₂⁵ f(x) dx?',
      options: ['0', '3', 'Odefinierad'],
      correct: 0,
      feedback: 'Funktionen = 0 överallt → ingen area → integralen = 0.'
    },
    {
      q: 'Grafen av f(x) ligger ovanför x-axeln på [0, 3] och under på [3, 5]. Integralen ∫₀⁵ f(x) dx:',
      options: [
        'Är alltid positiv',
        'Kan vara positiv, negativ eller noll beroende på hur mycket som är ovan/under',
        'Är alltid negativ'
      ],
      correct: 1,
      feedback: 'Det beror på hur stora de positiva och negativa delarna är. De kan ta ut varandra helt (=0), eller den ena kan dominera.'
    }
  ],

  'int-notation': [
    {
      q: 'I ∫₂⁷ 3x<sup>2</sup> dx, vad är den övre gränsen?',
      options: ['2', '7', '3x<sup>2</sup>'],
      correct: 1,
      feedback: 'Övre gränsen skrivs längst upp på integraltecknet. Här: 7.'
    },
    {
      q: 'Vad kallas f(x) i ∫ₐᵇ f(x) dx?',
      options: ['Derivatan', 'Integranden', 'Primitiven'],
      correct: 1,
      feedback: 'Funktionen inne i integralen kallas integranden.'
    },
    {
      q: 'Varför skriver man "dx" i slutet?',
      options: [
        'Det är bara tradition, behövs inte',
        'Det anger vilken variabel man integrerar med avseende på',
        'Det står för derivatan'
      ],
      correct: 1,
      feedback: 'dx talar om att x är integrationsvariabeln.'
    },
    {
      q: 'I ∫₁⁴ (x + 2) dx, vad är integranden?',
      options: ['1 och 4', 'x + 2', 'dx'],
      correct: 1,
      feedback: 'Integranden = funktionen man integrerar = x + 2.'
    },
    {
      q: 'Vad representerar integraltecknet ∫?',
      options: [
        'Bokstaven I (för integral)',
        'Ett utdraget S (för summa)',
        'Bokstaven f (för funktion)'
      ],
      correct: 1,
      feedback: '∫ är ett utdraget S från latinets "summa" — integralen summerar oändligt många tunna remsor.'
    },
    {
      q: '∫₃³ f(x) dx = ? (samma övre och undre gräns)',
      options: ['f(3)', '0', 'Odefinierad'],
      correct: 1,
      feedback: 'Om övre och undre gränsen är samma → intervallbredden = 0 → integralen = 0.'
    },
    {
      q: 'Undre gränsen i ∫₅¹⁰ 2x dx är:',
      options: ['10', '5', '2x'],
      correct: 1,
      feedback: 'Undre gränsen skrivs längst ner på integraltecknet. Här: 5.'
    },
    {
      q: 'Vad händer om man byter övre och undre gräns?',
      options: [
        'Samma värde',
        'Integralen byter tecken',
        'Integralen blir 0'
      ],
      correct: 1,
      feedback: '∫ₐᵇ f(x)dx = −∫ᵇₐ f(x)dx. Byter du gränserna → byter tecknet.'
    }
  ],

  'int-estimate': [
    {
      q: 'En graf bildar en triangel med bas 4 och höjd 6 ovanför x-axeln. Integralen ≈',
      options: ['24', '12', '10'],
      correct: 1,
      feedback: 'Triangelns area = bas × höjd / 2 = 4 × 6 / 2 = 12.'
    },
    {
      q: 'Du räknar 8 rutor ovanför och 3 rutor under x-axeln. Varje ruta = 1×1. Integralen ≈',
      options: ['11', '5', '8'],
      correct: 1,
      feedback: '8 (ovan) − 3 (under) = 5. Under x-axeln räknas negativt!'
    },
    {
      q: 'En halvcirkel med radie 3 ligger ovanför x-axeln. Integralen ≈',
      options: ['9π', '9π/2 ≈ 14,1', '3π'],
      correct: 1,
      feedback: 'Halvcirkelns area = πr²/2 = π·9/2 = 9π/2 ≈ 14,1.'
    },
    {
      q: 'En rektangel med bredd 5 och höjd 3 under x-axeln. Integralen ≈',
      options: ['15', '−15', '−8'],
      correct: 1,
      feedback: 'Area = 5 × 3 = 15, men den ligger under x-axeln → integralen = −15.'
    },
    {
      q: 'Rutorna i ett diagram har storlek 2×1 (bredd 2, höjd 1). Du räknar 6 rutor ovanför. Integralen ≈',
      options: ['6', '12', '3'],
      correct: 1,
      feedback: 'Varje ruta har area 2 × 1 = 2. Sex rutor: 6 × 2 = 12. Kolla alltid skalan!'
    },
    {
      q: 'En graf ser ut som en halvcirkel med radie 2 under x-axeln. Integralen ≈',
      options: [
        '−2π ≈ −6,3',
        '2π ≈ 6,3',
        '−4π ≈ −12,6'
      ],
      correct: 0,
      feedback: 'Halvcirkelns area = πr²/2 = π·4/2 = 2π. Under x-axeln → negativt: −2π ≈ −6,3.'
    },
    {
      q: 'Vilken strategi ger bäst uppskattning av en integral från en graf?',
      options: [
        'Gissa ett tal',
        'Dela upp i kända geometriska former och räkna areorna',
        'Mät med linjal'
      ],
      correct: 1,
      feedback: 'Identifiera trianglar, rektanglar, halvcirklar etc. och använd deras arealformler. Glöm inte tecken!'
    },
    {
      q: '3 rutor ovan, 3 rutor under x-axeln (1×1-rutor). Integralen ≈',
      options: ['0', '6', '3'],
      correct: 0,
      feedback: '3 − 3 = 0. Lika mycket ovan som under → de tar ut varandra.'
    }
  ],

  'int-antideriv': [
    {
      q: 'Primitiva funktionen till f(x) = 6x<sup>2</sup> är:',
      options: [
        '2x<sup>3</sup> + C',
        '3x<sup>3</sup> + C',
        '12x + C'
      ],
      correct: 0,
      feedback: '6 · x<sup>3</sup>/3 = 2x<sup>3</sup> + C. Höj exponenten (2→3), dela med nya exponenten (3).'
    },
    {
      q: '∫ 5 dx = ?',
      options: ['5', '5x + C', '0 + C'],
      correct: 1,
      feedback: 'En konstant integreras till konstant × x. ∫ 5 dx = 5x + C.'
    },
    {
      q: 'Varför behövs +C vid obestämd integral?',
      options: [
        'Det är bara konvention',
        'Många funktioner har samma derivata (de skiljer sig med en konstant)',
        'C står för "correct"'
      ],
      correct: 1,
      feedback: 'x<sup>2</sup> + 1 och x<sup>2</sup> + 99 har båda derivatan 2x. Konstanten försvinner vid derivering, så vi lägger till C.'
    },
    {
      q: 'Primitiva funktionen till f(x) = e<sup>2x</sup> är:',
      options: [
        '2e<sup>2x</sup> + C',
        'e<sup>2x</sup>/2 + C',
        'e<sup>2x</sup> + C'
      ],
      correct: 1,
      feedback: '∫ e<sup>kx</sup> dx = e<sup>kx</sup>/k + C. Här: e<sup>2x</sup>/2 + C.'
    },
    {
      q: 'Primitiva funktionen till f(x) = x<sup>4</sup> är:',
      options: [
        'x<sup>5</sup>/5 + C',
        '4x<sup>3</sup> + C',
        'x<sup>5</sup> + C'
      ],
      correct: 0,
      feedback: 'Höj exponenten (4→5), dela med nya (5): x<sup>5</sup>/5 + C.'
    },
    {
      q: 'Primitiva funktionen till f(x) = 1 (dvs. f(x) = x<sup>0</sup>) är:',
      options: ['0 + C', 'x + C', 'ln(x) + C'],
      correct: 1,
      feedback: '∫ 1 dx = ∫ x<sup>0</sup> dx = x<sup>1</sup>/1 + C = x + C.'
    },
    {
      q: 'F(x) = x<sup>3</sup> + C och F(2) = 10. Vad är C?',
      options: ['2', '10', '2'],
      correct: 0,
      feedback: 'F(2) = 8 + C = 10 → C = 2.'
    },
    {
      q: 'Hur kontrollerar du att din primitiva funktion F(x) är korrekt?',
      options: [
        'Integrera F(x) igen',
        'Derivera F(x) — ska ge tillbaka f(x)',
        'Sätt x = 0'
      ],
      correct: 1,
      feedback: 'Derivering och integrering är varandras omvändningar. F\'(x) ska ge tillbaka f(x).'
    },
    {
      q: '∫ (3x<sup>2</sup> + 2x − 1) dx = ?',
      options: [
        'x<sup>3</sup> + x<sup>2</sup> − x + C',
        '6x + 2 + C',
        '3x<sup>3</sup> + 2x<sup>2</sup> − x + C'
      ],
      correct: 0,
      feedback: 'Term för term: 3x<sup>2</sup> → x<sup>3</sup>, 2x → x<sup>2</sup>, −1 → −x. Plus C!'
    }
  ],

  'int-definite': [
    {
      q: '∫₀² 3x<sup>2</sup> dx = ?',
      options: ['6', '8', '12'],
      correct: 1,
      feedback: '[x<sup>3</sup>]₀² = 2<sup>3</sup> − 0<sup>3</sup> = 8 − 0 = 8.'
    },
    {
      q: '∫₁⁴ 2x dx = ?',
      options: ['15', '16', '8'],
      correct: 0,
      feedback: '[x<sup>2</sup>]₁⁴ = 4<sup>2</sup> − 1<sup>2</sup> = 16 − 1 = 15.'
    },
    {
      q: 'Vilket steg kommer efter [F(x)]ₐᵇ?',
      options: [
        'Derivera igen',
        'Beräkna F(b) − F(a)',
        'Multiplicera med (b − a)'
      ],
      correct: 1,
      feedback: 'Nästa steg: sätt in övre gränsen b, sedan undre gränsen a, och subtrahera: F(b) − F(a).'
    },
    {
      q: '∫₋₁¹ x<sup>2</sup> dx = ?',
      options: ['0', '2/3', '1'],
      correct: 1,
      feedback: '[x<sup>3</sup>/3]₋₁¹ = 1/3 − (−1/3) = 2/3. Minus och minus blir plus!'
    },
    {
      q: '∫₀³ 4 dx = ?',
      options: ['4', '12', '0'],
      correct: 1,
      feedback: 'Primitiv: 4x. [4x]₀³ = 4·3 − 4·0 = 12.'
    },
    {
      q: '∫₁² x<sup>3</sup> dx = ?',
      options: ['15/4', '4', '7/4'],
      correct: 0,
      feedback: '[x<sup>4</sup>/4]₁² = 16/4 − 1/4 = 15/4 = 3,75.'
    },
    {
      q: '∫₀¹ e<sup>x</sup> dx = ?',
      options: ['e − 1 ≈ 1,72', '1', 'e ≈ 2,72'],
      correct: 0,
      feedback: '[e<sup>x</sup>]₀¹ = e<sup>1</sup> − e<sup>0</sup> = e − 1 ≈ 1,72.'
    },
    {
      q: '∫₂² f(x) dx = ? (samma gränser)',
      options: ['f(2)', '0', '2·f(2)'],
      correct: 1,
      feedback: 'Samma övre och undre gräns → intervallbredden = 0 → integralen = 0. Alltid.'
    },
    {
      q: '∫₀² (x<sup>2</sup> + 1) dx = ?',
      options: ['14/3', '4', '10/3'],
      correct: 0,
      feedback: '[x<sup>3</sup>/3 + x]₀² = (8/3 + 2) − 0 = 8/3 + 6/3 = 14/3 ≈ 4,67.'
    },
    {
      q: 'Du ska beräkna ∫₋₂³ (3x<sup>2</sup> + 1)dx. Primitiven i hakparentes skrivs:',
      options: [
        '[3x<sup>3</sup> + x]₋₂³',
        '[x<sup>3</sup> + x]₋₂³',
        '[6x + 1]₋₂³'
      ],
      correct: 1,
      feedback: 'Primitiv av 3x<sup>2</sup> = x<sup>3</sup> (3/3 = 1). Primitiv av 1 = x. Alltså [x<sup>3</sup> + x].'
    }
  ],

  'int-area': [
    {
      q: 'f(x) = x<sup>2</sup> − 4 på [−2, 2] ligger under x-axeln. Arean:',
      options: [
        '∫₋₂² (x<sup>2</sup> − 4) dx direkt',
        '|∫₋₂² (x<sup>2</sup> − 4) dx| (absolutbelopp)',
        '0 (symmetri)'
      ],
      correct: 1,
      feedback: 'Under x-axeln → integralen negativ. Area = absolutbeloppet.'
    },
    {
      q: 'Arean mellan f(x) och g(x) beräknas:',
      options: [
        '∫ f(x) dx + ∫ g(x) dx',
        '∫ f(x) · g(x) dx',
        '∫ |f(x) − g(x)| dx'
      ],
      correct: 2,
      feedback: 'Arean = integralen av avståndet = ∫ |f(x) − g(x)| dx.'
    },
    {
      q: 'f(x) = x<sup>3</sup> korsar x-axeln vid 0. Area på [−1, 1]?',
      options: [
        '∫₋₁¹ x<sup>3</sup> dx (= 0, arean = 0)',
        '|∫₋₁⁰ x<sup>3</sup> dx| + ∫₀¹ x<sup>3</sup> dx',
        '∫₋₁¹ x<sup>3</sup> dx = stor positiv'
      ],
      correct: 1,
      feedback: 'Dela upp vid nollstället! Negativ del → absolutbelopp. Positiv del → som den är. Addera.'
    },
    {
      q: 'Varför måste man hitta nollställen innan man beräknar area?',
      options: [
        'Det behöver man inte',
        'För att veta var grafen byter sida om x-axeln (så man kan ta absolutbelopp rätt)',
        'För att kontrollera att funktionen existerar'
      ],
      correct: 1,
      feedback: 'Om grafen byter sida tar positiv och negativ area ut varandra i integralen. Dela upp vid nollställena!'
    },
    {
      q: 'f(x) ≥ g(x) på [a, b]. Arean mellan kurvorna = ?',
      options: [
        '∫ₐᵇ [g(x) − f(x)] dx',
        '∫ₐᵇ [f(x) − g(x)] dx',
        '∫ₐᵇ f(x) dx − ∫ₐᵇ g(x) dx + C'
      ],
      correct: 1,
      feedback: 'Den övre funktionen minus den undre: ∫ₐᵇ [f(x) − g(x)] dx. Inget +C vid bestämd integral!'
    },
    {
      q: 'Integralen ∫₀⁴ f(x) dx = 3 och f(x) ≥ 0 på [0,4]. Arean = ?',
      options: ['3', '−3', '|3| = 3 (men man måste ta absolutbelopp)'],
      correct: 0,
      feedback: 'f(x) ≥ 0 → integralen = arean direkt. Inget krångel med absolutbelopp behövs.'
    },
    {
      q: 'f(x) = −x på [0, 3]. Integralen = −9/2. Arean = ?',
      options: [
        '−9/2',
        '9/2',
        '0'
      ],
      correct: 1,
      feedback: 'Arean = |−9/2| = 9/2. Arean är alltid positiv.'
    },
    {
      q: 'Area mellan y = x och y = x<sup>2</sup> på [0, 1]. Vilken ligger överst?',
      options: [
        'y = x<sup>2</sup> (x<sup>2</sup> > x på [0,1])',
        'y = x (x > x<sup>2</sup> på [0,1])',
        'De är lika'
      ],
      correct: 1,
      feedback: 'Testa: vid x = 0,5 → x = 0,5 men x<sup>2</sup> = 0,25. Alltså x > x<sup>2</sup> på (0,1). Arean = ∫₀¹ (x − x<sup>2</sup>) dx.'
    }
  ]
};

// Number of questions to show per quiz
const QUIZ_SIZE = 4;

// Pick n questions from array, with some shuffle
// Allows natural overlap between rounds (~50%)
function pickQuestions(topicId, n) {
  const pool = QUESTIONS[topicId];
  if (!pool) return [];

  // Use a seeded-ish approach: shuffle pool, take first n
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, pool.length));
}
