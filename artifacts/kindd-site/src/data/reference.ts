export interface ReferenceTile {
  id: string;
  title: string;
  intro: string;
  alwaysVisible?: boolean;
  specialStyle?: string;
  content: string;
  source?: string;
}

export const referenceTiles: ReferenceTile[] = [
  {
    id: "at-a-glance",
    title: "Australia at a Glance",
    intro: "The official facts about Australia in one place.",
    content: `Official name: Commonwealth of Australia.
Capital: Canberra.
Population: approximately 27 million (ABS 2024).
Area: 7.692 million square kilometres.
Currency: Australian dollar (AUD).
Official language: None legislated. English is the de facto language.
Government: Federal parliamentary constitutional monarchy.
Head of State: King Charles III.
Governor-General: Appointed by the King on the advice of the Prime Minister.
Head of Government: Prime Minister.`,
    source: "australia.gov.au",
  },
  {
    id: "states-territories",
    title: "States and Territories",
    intro: "Six states, two self-governing territories, and seven external territories.",
    content: `Six states:
New South Wales (Sydney). Victoria (Melbourne). Queensland (Brisbane). South Australia (Adelaide). Western Australia (Perth). Tasmania (Hobart).

Two self-governing territories:
Australian Capital Territory (Canberra). Northern Territory (Darwin).

Seven external territories:
Christmas Island. Cocos (Keeling) Islands. Norfolk Island. Jervis Bay Territory. Ashmore and Cartier Islands. Coral Sea Islands. Heard Island and McDonald Islands.

Note: Most Australians cannot name all seven external territories. Now you can.`,
    source: "australia.gov.au",
  },
  {
    id: "national-anthem",
    title: "National Anthem",
    intro: "Advance Australia Fair. Adopted 1984. Modified January 2021.",
    content: `Full title: Advance Australia Fair.
Adopted: 1984.
Modified: January 2021. The word "young" in the first verse was changed to "one" to better reflect Australia's Indigenous history.

Verse one:
Australians all let us rejoice,
For we are one and free,
With golden soil and wealth for toil,
Our home is girt by sea,
Our land abounds in nature's gifts,
Of beauty rich and rare,
In history's page let every stage,
Advance Australia Fair,
In joyful strains then let us sing,
Advance Australia Fair.

Verse two:
Beneath our radiant southern cross,
We'll toil with hearts and hands,
To make this Commonwealth of ours,
Renowned of all the lands,
For those who've come across the seas,
We've boundless plains to share,
With courage let us all combine,
To advance Australia Fair,
In joyful strains then let us sing,
Advance Australia Fair.`,
    source: "pmc.gov.au",
  },
  {
    id: "australian-values",
    title: "Australian Values",
    intro: "Sourced directly from homeaffairs.gov.au.",
    content: `The Australian values include:

Respect for the equal worth, dignity and freedom of the individual.
Freedom of speech and association.
Freedom of religion and a secular government.
Support for parliamentary democracy and the rule of law.
Equality under the law.
Equality of men and women.
Equality of opportunity.
Peacefulness.
A spirit of egalitarianism that embraces mutual respect, tolerance, fair play, and compassion for those in need.`,
    source: "homeaffairs.gov.au/about-us/our-portfolios/multicultural-affairs/about-australian-citizenship/australians-values",
  },
  {
    id: "time-zones",
    title: "Time Zones",
    intro: "Australia has five main time zones.",
    content: `AEST — Australian Eastern Standard Time. UTC+10.
States: NSW, VIC, QLD, TAS, ACT.

AEDT — Australian Eastern Daylight Time. UTC+11.
States: NSW, VIC, TAS, ACT (during daylight saving).

ACST — Australian Central Standard Time. UTC+9:30.
States: SA, NT.

ACDT — Australian Central Daylight Time. UTC+10:30.
States: SA (during daylight saving).

AWST — Australian Western Standard Time. UTC+8.
States: WA.

No daylight saving in WA, QLD, or NT.
Lord Howe Island observes UTC+10:30 in winter and UTC+11 in summer.`,
    source: "australia.gov.au",
  },
  {
    id: "daylight-saving",
    title: "Daylight Saving",
    intro: "Not every state observes it.",
    content: `Daylight saving runs from the first Sunday in October to the first Sunday in April.

Clocks go forward one hour in October. Back one hour in April.

States that observe it: NSW, VIC, SA, TAS, ACT.
States that do not: QLD, WA, NT.

QLD held referendums in 1992 and 2010 and voted no both times.`,
    source: "australia.gov.au",
  },
  {
    id: "emergency-numbers",
    title: "Emergency Numbers",
    intro: "Save these. Share these.",
    alwaysVisible: true,
    specialStyle: "signal-green",
    content: `000 — Police, fire, ambulance. Use from any phone.
112 — Emergency from a mobile with no signal. Connects to 000.
13 11 14 — Lifeline. Crisis support. 24 hours.
1800 737 732 — 1800RESPECT. Family violence and sexual assault.
131 114 — Poisons Information Centre. 24 hours.
132 500 — State Emergency Service. Floods, storms.
131 444 — Police Assistance Line. Non-emergency.
1300 22 4636 — Beyond Blue. Mental health support.
1800 551 800 — Kids Helpline. 5 to 25 years old.`,
  },
  {
    id: "public-holidays",
    title: "Public Holidays 2026",
    intro: "National holidays plus state variations.",
    content: `National public holidays (all states and territories):
New Year's Day — 1 January
Australia Day — 26 January
Good Friday — 3 April
Easter Saturday — 4 April
Easter Sunday — 5 April
Easter Monday — 6 April
Anzac Day — 25 April
Christmas Day — 25 December
Boxing Day — 26 December

Additional state holidays (selected):
NSW: Bank Holiday (first Monday August)
VIC: Melbourne Cup Day (first Tuesday November)
QLD: Royal Queensland Show / Ekka (Brisbane area, August)
SA: Adelaide Cup (second Monday May), Proclamation Day (26 Dec, observed separately)
WA: Western Australia Day (first Monday June)
TAS: Eight Hours Day / Labour Day (second Monday March), Hobart Regatta (second Monday February, south only)
ACT: Canberra Day (second Monday March), Family & Community Day / AFL Grand Final Friday
NT: May Day (first Monday May), Picnic Day (first Monday August)`,
    source: "fairwork.gov.au/leave/public-holidays",
  },
];
