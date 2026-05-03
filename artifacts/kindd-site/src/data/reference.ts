export interface HolidayEntry {
  date: string;
  name: string;
}

export interface RefTileData {
  id: string;
  title: string;
  stripe: string;
  description: string;
  content: string;
  source?: string;
}

export const referenceTiles: RefTileData[] = [
  {
    id: "glance",
    title: "Australia at a Glance",
    stripe: "#F59E0B",
    description: "Official name, capital, population, and government structure.",
    content: "Official name: Commonwealth of Australia. Capital: Canberra. Population: approximately 27 million (ABS 2024). Currency: Australian dollar (AUD). Government: Federal parliamentary constitutional monarchy. Head of State: King Charles III. Head of Government: Prime Minister.",
    source: "Source: australia.gov.au",
  },
  {
    id: "states",
    title: "States and Territories",
    stripe: "#2A9D8F",
    description: "Six states, two self-governing territories, and seven external territories.",
    content: "Six states: New South Wales, Victoria, Queensland, South Australia, Western Australia, Tasmania. Two self-governing territories: Australian Capital Territory, Northern Territory. Seven external territories: Christmas Island, Cocos (Keeling) Islands, Norfolk Island, Jervis Bay Territory, Ashmore and Cartier Islands, Coral Sea Islands, Heard Island and McDonald Islands. Most Australians cannot name all seven external territories.",
    source: "Source: australia.gov.au",
  },
  {
    id: "anthem",
    title: "National Anthem",
    stripe: "#6B8F71",
    description: "Advance Australia Fair. Adopted 1984. Modified January 2021.",
    content: `The word "young" was changed to "one" in the first verse to better reflect Australia's Indigenous history.\n\nVerse one:\nAustralians all let us rejoice,\nFor we are one and free,\nWith golden soil and wealth for toil,\nOur home is girt by sea,\nOur land abounds in nature's gifts,\nOf beauty rich and rare,\nIn history's page let every stage,\nAdvance Australia Fair,\nIn joyful strains then let us sing,\nAdvance Australia Fair.\n\nVerse two:\nBeneath our radiant Southern Cross,\nWe'll toil with hearts and hands,\nTo make this Commonwealth of ours,\nRenowned of all the lands,\nFor those who've come across the seas,\nWe've boundless plains to share,\nWith courage let us all combine,\nTo advance Australia Fair,\nIn joyful strains then let us sing,\nAdvance Australia Fair.`,
    source: "Source: pmc.gov.au",
  },
  {
    id: "values",
    title: "Australian Values",
    stripe: "#4F6FA0",
    description: "The values assessed during the citizenship process.",
    content: "The Australian values include respect for the equal worth, dignity and freedom of the individual, freedom of speech and association, freedom of religion and a secular government, support for parliamentary democracy and the rule of law, equality under the law, equality of men and women, equality of opportunity, peacefulness, and a spirit of egalitarianism that embraces mutual respect, tolerance, fair play, and compassion for those in need.",
    source: "Source: homeaffairs.gov.au",
  },
  {
    id: "timezones",
    title: "Time Zones",
    stripe: "#B5651D",
    description: "Australia spans five main time zones.",
    content: "AEST UTC+10: NSW, VIC, QLD, TAS, ACT. AEDT UTC+11: NSW, VIC, TAS, ACT during daylight saving. ACST UTC+9:30: SA, NT. ACDT UTC+10:30: SA during daylight saving. AWST UTC+8: WA. No daylight saving in WA, QLD, or NT. Lord Howe Island: UTC+10:30 winter, UTC+11 summer.",
    source: "Source: bom.gov.au",
  },
  {
    id: "daylightsaving",
    title: "Daylight Saving",
    stripe: "#E07A5F",
    description: "Not observed in all states.",
    content: "Runs first Sunday October to first Sunday April. Clocks forward one hour in October. Back one hour in April. States that observe: NSW, VIC, SA, TAS, ACT. States that do not: QLD, WA, NT. Queensland held referendums in 1992 and 2010 and voted no both times.",
    source: "Source: australia.gov.au",
  },
];
