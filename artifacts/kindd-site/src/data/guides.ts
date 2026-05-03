export interface GuideLink {
  label: string;
  url: string;
}

export interface Guide {
  name: string;
  description: string;
  lastUpdated: string;
  links: GuideLink[];
}

export interface Cluster {
  name: string;
  desc: string;
  guides: Guide[];
}

export const clusters: Cluster[] = [
  {
    name: "Money and Work",
    desc: "Tax, income, super, consumer rights.",
    guides: [
      {
        name: "Tax Basics",
        description:
          "Covers how the Australian tax system works, when and how to lodge a tax return, and what deductions you may be entitled to. Good first stop if you have never lodged before or are unsure where to start.",
        lastUpdated: "May 2025",
        links: [
          { label: "ATO — Lodge your tax return", url: "https://www.ato.gov.au/individuals-and-families/lodging-your-tax-return" },
          { label: "ATO — Tax rates and income thresholds", url: "https://www.ato.gov.au/rates/individual-income-tax-rates" },
          { label: "ATO — myTax", url: "https://www.ato.gov.au/online-services/mytax" },
        ],
      },
      {
        name: "Side Income and Gig Work",
        description:
          "Explains how income from platforms like Uber, Airtasker, or selling goods online is treated for tax. Covers GST thresholds, record-keeping, and what to declare.",
        lastUpdated: "May 2025",
        links: [
          { label: "ATO — Sharing economy and gig work", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/the-sharing-economy-and-tax" },
          { label: "ATO — GST for small business", url: "https://www.ato.gov.au/business/gst" },
        ],
      },
      {
        name: "Money and Super",
        description:
          "Covers superannuation basics — how it accumulates, how to find lost super, and what happens when you change jobs. Also includes links to financial hardship support.",
        lastUpdated: "May 2025",
        links: [
          { label: "ATO — Super for individuals", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families" },
          { label: "ATO — Find your lost super", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/find-lost-super" },
          { label: "MoneySmart — Superannuation", url: "https://moneysmart.gov.au/grow-your-super" },
        ],
      },
      {
        name: "Consumer Rights",
        description:
          "Outlines your rights when buying goods or services — refunds, warranties, and what to do if a business does not cooperate. Covers the Australian Consumer Law.",
        lastUpdated: "May 2025",
        links: [
          { label: "ACCC — Consumer rights", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
          { label: "ACCC — Complaints and returns", url: "https://www.accc.gov.au/consumers/complaints-and-returns" },
        ],
      },
    ],
  },
  {
    name: "Home and Renting",
    desc: "Where you live, who you live near, what it costs.",
    guides: [
      {
        name: "Renting and Tenancy",
        description:
          "Covers your rights as a tenant — bond, repairs, entry by the landlord, rent increases, and how to dispute an unfair eviction. Links to your state's tenancy authority.",
        lastUpdated: "May 2025",
        links: [
          { label: "NSW Fair Trading — Tenancy", url: "https://www.fairtrading.nsw.gov.au/housing-and-property/renting" },
          { label: "Consumer Affairs Victoria — Renting", url: "https://www.consumer.vic.gov.au/housing/renting" },
          { label: "Tenants Queensland", url: "https://tenantsqld.org.au" },
        ],
      },
      {
        name: "Neighbours and Community",
        description:
          "What to do about noise, fences, overhanging trees, and disputes with neighbours. Covers mediation options before escalating to a tribunal.",
        lastUpdated: "May 2025",
        links: [
          { label: "NSW Fair Trading — Neighbour disputes", url: "https://www.fairtrading.nsw.gov.au/housing-and-property/building-and-renovating/resolving-building-disputes/neighbour-disputes" },
          { label: "Community Justice Centres — NSW", url: "https://cjc.nsw.gov.au" },
        ],
      },
      {
        name: "Council and Local Government",
        description:
          "How local councils work, what they are responsible for, how to report issues like potholes or illegal dumping, and how to have your say on local decisions.",
        lastUpdated: "May 2025",
        links: [
          { label: "Australian Local Government Association", url: "https://www.alga.com.au/about-local-government/what-is-local-government" },
          { label: "DLGSC — Find your council (WA)", url: "https://www.dlgsc.wa.gov.au/local-government/local-governments" },
        ],
      },
      {
        name: "Utilities and Cost of Living",
        description:
          "How to compare electricity and gas providers, what to do if you cannot pay a bill, and what hardship programs energy retailers must offer under the law.",
        lastUpdated: "May 2025",
        links: [
          { label: "AER — Energy Made Easy", url: "https://www.energymadeeasy.gov.au" },
          { label: "ACCC — Cost of living resources", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees/cost-of-living" },
          { label: "MoneySmart — Dealing with debt", url: "https://moneysmart.gov.au/debt" },
        ],
      },
    ],
  },
  {
    name: "Health and Family",
    desc: "Bodies, minds, kids, carers.",
    guides: [
      {
        name: "Health and Medicare",
        description:
          "How Medicare works, what it covers, how to get a Medicare card, bulk billing, and what to do if you need care but are unsure of costs.",
        lastUpdated: "May 2025",
        links: [
          { label: "Services Australia — Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
          { label: "Healthdirect — Find a GP", url: "https://www.healthdirect.gov.au/australian-health-services" },
          { label: "Services Australia — Enrol in Medicare", url: "https://www.servicesaustralia.gov.au/how-to-enrol-in-medicare" },
        ],
      },
      {
        name: "Mental Health and Wellbeing",
        description:
          "Covers free and low-cost mental health services in Australia, including the Better Access scheme for subsidised psychology sessions, crisis lines, and online tools.",
        lastUpdated: "May 2025",
        links: [
          { label: "Beyond Blue", url: "https://www.beyondblue.org.au" },
          { label: "Head to Health", url: "https://www.headtohealth.gov.au" },
          { label: "Lifeline — 13 11 14", url: "https://www.lifeline.org.au" },
        ],
      },
      {
        name: "Kids and Families",
        description:
          "Child Care Subsidy, Family Tax Benefit, parenting payments, and where to find free or low-cost activities and support for families.",
        lastUpdated: "May 2025",
        links: [
          { label: "Services Australia — Family payments", url: "https://www.servicesaustralia.gov.au/families" },
          { label: "Services Australia — Child Care Subsidy", url: "https://www.servicesaustralia.gov.au/child-care-subsidy" },
          { label: "Raising Children Network", url: "https://raisingchildren.net.au" },
        ],
      },
      {
        name: "Disability and Carer Support",
        description:
          "An overview of the NDIS, Carer Payment, Carer Allowance, and how to access disability support services. Includes links to advocacy organisations.",
        lastUpdated: "May 2025",
        links: [
          { label: "NDIS — How to access the scheme", url: "https://www.ndis.gov.au/applying-access-ndis/how-apply" },
          { label: "Services Australia — Carer Payment", url: "https://www.servicesaustralia.gov.au/carer-payment" },
          { label: "Carers Australia", url: "https://www.carersaustralia.com.au" },
        ],
      },
    ],
  },
  {
    name: "Civic and Legal",
    desc: "Voting, legal basics, safety.",
    guides: [
      {
        name: "Voting and Civic Life",
        description:
          "How to enrol to vote, how preferential voting works, and what your civic responsibilities are as an Australian resident or citizen.",
        lastUpdated: "May 2025",
        links: [
          { label: "AEC — Enrol to vote", url: "https://www.aec.gov.au/enrol" },
          { label: "AEC — How to vote", url: "https://www.aec.gov.au/Voting" },
        ],
      },
      {
        name: "Legal Basics",
        description:
          "Free and low-cost legal help in Australia — community legal centres, Legal Aid, and what to expect if you receive a letter from a court or debt collector.",
        lastUpdated: "May 2025",
        links: [
          { label: "Law Access NSW", url: "https://www.legalaid.nsw.gov.au/lawaccess" },
          { label: "Find a Community Legal Centre", url: "https://clcs.org.au/find-a-clc" },
          { label: "ASIC — Dealing with debt collectors", url: "https://moneysmart.gov.au/debt/debt-collectors" },
        ],
      },
      {
        name: "Safety and Family Violence",
        description:
          "Immediate safety resources, what counts as family violence under Australian law, and how to access emergency support, housing, and legal protection orders.",
        lastUpdated: "May 2025",
        links: [
          { label: "1800RESPECT — 1800 737 732", url: "https://www.1800respect.org.au" },
          { label: "Safe Steps — Victoria", url: "https://www.safesteps.org.au" },
          { label: "Commonwealth — Family safety resources", url: "https://www.ag.gov.au/families-and-marriage/families/family-violence" },
        ],
      },
    ],
  },
  {
    name: "New to Australia",
    desc: "If you arrived recently, start here.",
    guides: [
      {
        name: "Settling In",
        description:
          "An overview for people new to Australia — getting a Tax File Number, opening a bank account, understanding the healthcare system, and finding community support.",
        lastUpdated: "May 2025",
        links: [
          { label: "ATO — Apply for a TFN", url: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn" },
          { label: "Services Australia — New arrivals", url: "https://www.servicesaustralia.gov.au/new-migrants" },
        ],
      },
      {
        name: "Health",
        description:
          "Medicare eligibility for new arrivals, reciprocal health agreements, and how to find GPs, hospitals, and interpreting services.",
        lastUpdated: "May 2025",
        links: [
          { label: "Services Australia — Medicare for new arrivals", url: "https://www.servicesaustralia.gov.au/enrolling-medicare" },
          { label: "Healthdirect — Find a health service", url: "https://www.healthdirect.gov.au/australian-health-services" },
        ],
      },
      {
        name: "Banking",
        description:
          "How to open a bank account in Australia, what ID you need, and the difference between a savings account and a transaction account.",
        lastUpdated: "May 2025",
        links: [
          { label: "MoneySmart — Banking basics", url: "https://moneysmart.gov.au/banking" },
          { label: "ASIC — Choosing a bank account", url: "https://moneysmart.gov.au/banking/bank-accounts" },
        ],
      },
      {
        name: "Schools",
        description:
          "How to enrol a child in school, what types of schools exist, and what financial support is available for families with school-age children.",
        lastUpdated: "May 2025",
        links: [
          { label: "Australian Curriculum — About schooling", url: "https://www.australiancurriculum.edu.au" },
          { label: "Services Australia — School enrolment support", url: "https://www.servicesaustralia.gov.au/families" },
        ],
      },
      {
        name: "Community",
        description:
          "Finding multicultural community organisations, settlement services, language support, and social connection for people new to Australia.",
        lastUpdated: "May 2025",
        links: [
          { label: "Settlement Services International", url: "https://www.ssi.org.au" },
          { label: "FECCA — Federation of Ethnic Communities", url: "https://fecca.org.au" },
        ],
      },
      {
        name: "Qualifications",
        description:
          "How to get overseas qualifications recognised in Australia, which bodies assess which professions, and pathways for skilled migrants.",
        lastUpdated: "May 2025",
        links: [
          { label: "NOOSR — Overseas qualifications", url: "https://www.education.gov.au/overseas-qualifications-unit" },
          { label: "AQF — Australian qualifications framework", url: "https://www.aqf.edu.au" },
        ],
      },
    ],
  },
];
