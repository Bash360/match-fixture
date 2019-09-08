const teams = [
  {
    name: 'BOURNEMOUTH',
    teamCode: 'BM',
    logo: 'BOURNEMOUTH.jpg',
    country: 'England',
    city: 'Bournemouth, Dorset',
    founded: '10-07-1899',
    headCoach: 'E. Howe',
    stadiumName: 'Vitality Stadium',
    stadiumAddress: `
    Dean Court, Kings Park
BH7 7AF
Bournemouth, Dorset
    `,
    stadiumCapacity: 12000,
  },
  {
    name: 'MANCHESTER CITY',
    teamCode: 'MC',
    logo: 'mancity.jpg',
    country: 'England',
    city: 'Manchester',
    founded: '10-07-1880',
    headCoach: 'Guardiola',
    stadiumName: 'Etihad Stadium',
    stadiumAddress: `
   Rowsley Street
M11 3FF
Manchester
    `,
    stadiumCapacity: 55097,
  },
  {
    name: 'NEWCASTLE UNITED',
    teamCode: 'NU',
    logo: 'NEWCASTLEUNITED.jpg',
    country: 'England',
    city: 'Newcastle upon Tyne',
    founded: '10-07-1892',
    headCoach: 'S. Bruce',
    stadiumName: 'St. James Park',
    stadiumAddress: `
  St. James' Park
NE1 4ST
Newcastle upon Tyne
    `,
    stadiumCapacity: 52389,
  },
  {
    name: 'SHEFFIELD UNITED',
    teamCode: 'Sheff',
    logo: 'SHEFFIELDUNITED.jpg',
    country: 'England',
    city: 'Sheffield',
    founded: '10-07-1889',
    headCoach: 'C. Wilder',
    stadiumName: 'Bramall Lane',
    stadiumAddress: `
  Bramall Lane
S2 4SU
Sheffield
    `,
    stadiumCapacity: 32702,
  },
  {
    name: 'TOTTENHAM HOTSPUR',
    teamCode: 'TOTTENHAM',
    logo: 'TOTTENHAM.jpg',
    country: 'England',
    city: 'London',
    founded: '10-07-1882',
    headCoach: 'M. Pochettino',
    stadiumName: 'Tottenham Hotspur Stadium',
    stadiumAddress: `
 Bill Nicholson Way, 748 High Road
N17 OAP
London
    `,
    stadiumCapacity: 62062,
  },
  {
    name: 'WEST HAM UNITED ',
    teamCode: 'westham',
    logo: 'westham.jpg',
    country: 'England',
    city: 'London',
    founded: '10-07-1895',
    headCoach: 'M. Pellegrini',
    stadiumName: 'London Stadium',
    stadiumAddress: `
Green Street
E13 9AZ
London
    `,
    stadiumCapacity: 60000,
  },
  {
    name: 'ASTON VILLA',
    teamCode: 'avfc',
    logo: 'ASTON-VILLA.jpg',
    country: 'England',
    city: 'Birmingham',
    founded: '10-07-1874',
    headCoach: 'D. Smith',
    stadiumName: 'Villa Park',
    stadiumAddress: `
Trinity Road
B6 6HE
Birmingham
    `,
    stadiumCapacity: 42788,
  },
  {
    name: 'BURNLEY',
    teamCode: 'burnley',
    logo: 'burnley.jpg',
    country: 'England',
    city: 'Burnley',
    founded: '10-07-1882',
    headCoach: 'S. Dyche',
    stadiumName: 'Turf Moo',
    stadiumAddress: `
Harry Potts Way
BB10 4BX
Burnley, Lancashire
    `,
    stadiumCapacity: 22546,
  },
  {
    name: 'CRYSTAL PALACE',
    teamCode: 'burnley',
    logo: 'burnley.jpg',
    country: 'England',
    city: 'London',
    founded: '10-07-1905',
    headCoach: 'R. Hodgson',
    stadiumName: 'Selhurst Park',
    stadiumAddress: `
Selhurst Park
SE25 6PU
London
    `,
    stadiumCapacity: 26309,
  },
  {
    name: 'LEICESTER CITY',
    teamCode: 'LEICESTER',
    logo: 'LEICESTER.jpg',
    country: 'England',
    city: 'Leicester, Leicestershire',
    founded: '10-07-1884',
    headCoach: 'B. Rodgers',
    stadiumName: 'King Power Stadium',
    stadiumAddress: `
Filbert Way
LE2 7FL
Leicester
    `,
    stadiumCapacity: 32262,
  },
  {
    name: 'ARSENAL',
    teamCode: 'ars',
    logo: 'ARSENA.jpg',
    country: 'England',
    city: 'London',
    founded: '10-07-1886',
    headCoach: 'B. Rodgers',
    stadiumName: 'Emirates Stadium',
    stadiumAddress: `
Highbury House, 75 Drayton Park
N5 1BU
London
    `,
    stadiumCapacity: 60355,
  },
  {
    name: 'MANCHESTER UNITED',
    teamCode: 'manu',
    logo: 'manu.jpg',
    country: 'England',
    city: 'Manchester',
    founded: '10-07-1886',
    headCoach: 'O. Solskjær',
    stadiumName: 'Old Trafford',
    stadiumAddress: `
Sir Matt Busby Way
M16 0RA
Manchester
    `,
    stadiumCapacity: 76212,
  },
  {
    name: 'NORWICH CITY',
    teamCode: 'NORWICH',
    logo: 'NORWICH.jpg',
    country: 'England',
    city: 'Norwich, Norfolk',
    founded: '10-07-1886',
    headCoach: 'D. Farke',
    stadiumName: 'Carrow Road',
    stadiumAddress: `
Carrow Road
NR1 1JE
Norwich, Norfolk
    `,
    stadiumCapacity: 27244,
  },
  {
    name: 'SOUTHAMPTON',
    teamCode: 'SOUTHAMPTON',
    logo: 'SOUTHAMPTON.jpg',
    country: 'England',
    city: 'Southampton, Hampshire',
    founded: '10-07-1885',
    headCoach: 'R. Hasenhüttl',
    stadiumName: 'St. Marys Stadium',
    stadiumAddress: `
Britannia Road
S014 5FP
Southampton, Hampshire
    `,
    stadiumCapacity: 32689,
  },
  {
    name: 'WATFORD',
    teamCode: 'WATFORD',
    logo: 'WATFORD.jpg',
    country: 'England',
    city: 'Watford',
    founded: '10-07-1881',
    headCoach: 'Javi Gracia',
    stadiumName: 'Vicarage Road',
    stadiumAddress: `
Vicarage Road
WD18 0ER
Watford
    `,
    stadiumCapacity: 21577,
  },
  {
    name: 'WOLVERHAMPTON WANDERERS',
    teamCode: 'WOLVERHAMPTON',
    logo: 'WOLVERHAMPTON.jpg',
    country: 'England',
    city: 'Wolverhampton, West Midlands',
    founded: '10-07-1877',
    headCoach: 'Nuno Espírito Santo',
    stadiumName: 'Molineux Stadium',
    stadiumAddress: `
Waterloo Road
WV1 4QR
Wolverhampton
    `,
    stadiumCapacity: 31700,
  },
  {
    name: 'Crystal Palace',
    teamCode: 'Crystal',
    logo: 'Crystal.jpg',
    country: 'England',
    city: 'london',
    founded: '10-07-1905',
    headCoach: 'Roy Hodgson',
    stadiumName: 'Selhurst Park',
    stadiumAddress: `
Hyde Park, London
    `,
    stadiumCapacity: 25486,
  },
  {
    name: 'BRIGHTON & HOVE ALBION',
    teamCode: 'BRIGHTON',
    logo: 'BRIGHTON.jpg',
    country: 'England',
    city: 'Falmer, East Sussex',
    founded: '10-07-1877',
    headCoach: 'G. Potter',
    stadiumName: 'The American Express Community Stadium',
    stadiumAddress: `
Village Way
BN1 9BL
Brighton, East Sussex
    `,
    stadiumCapacity: 30750,
  },
  {
    name: 'CHELSEA',
    teamCode: 'CHELSEA',
    logo: 'CHELSEA.jpg',
    country: 'England',
    city: 'London',
    founded: '10-07-1877',
    headCoach: 'F. Lampard',
    stadiumName: 'Stamford Bridge',
    stadiumAddress: `
Fulham Road
SW6 1HS
London
    `,
    stadiumCapacity: 41841,
  },
  {
    name: 'EVERTON',
    teamCode: 'EVERTON',
    logo: 'EVERTON.jpg',
    country: 'England',
    city: 'Liverpool',
    founded: '10-07-1877',
    headCoach: 'Marco Silva',
    stadiumName: 'Goodison Park',
    stadiumAddress: `
Goodison Road
L4 4EL
Liverpool
    `,
    stadiumCapacity: 40569,
  },
  {
    name: 'LIVERPOOL',
    teamCode: 'LIVERPOOL',
    logo: 'LIVERPOOL.jpg',
    country: 'England',
    city: 'Liverpool',
    founded: '10-07-1892',
    headCoach: 'Marco Silva',
    stadiumName: 'Anfield',
    stadiumAddress: `
Anfield Road
L4 0TH
Liverpool
    `,
    stadiumCapacity: 55212,
  },
  {
    name: '	Blackburn Rovers ',
    teamCode: '	Rovers',
    logo: '	Rovers.jpg',
    country: 'England',
    city: ' Blackburn,',
    founded: '10-07-1875',
    headCoach: '	Tony Mowbray',
    stadiumName: '	Ewood Park, Blackburn',
    stadiumAddress: `
Ewood Park, Blackbur
    `,
    stadiumCapacity: 55212,
  },
];
export default teams;
