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
  icon: string;
  guides: Guide[];
}

export const clusters: Cluster[] = [
  {
    name: "Money and Work",
    desc: "Tax, income, super, consumer rights.",
    icon: "money",
    guides: [
      {
        name: "Tax Basics",
        description: "How the Australian tax system works, when and how to lodge a tax return, and what deductions you may be entitled to. Good first stop if you have never lodged before or are unsure where to start.",
        lastUpdated: "May 2026",
        links: [
          { label: "ATO — Lodge your tax return", url: "https://www.ato.gov.au/individuals-and-families/lodging-your-tax-return" },
          { label: "ATO — Income tax rates", url: "https://www.ato.gov.au/rates/individual-income-tax-rates" },
          { label: "ATO — myTax", url: "https://www.ato.gov.au/online-services/mytax" },
        ],
      },
      {
        name: "Side Income and Gig Work",
        description: "How income from platforms like Uber, Airtasker, or selling goods online is treated for tax. Covers GST thresholds, record-keeping, and what to declare.",
        lastUpdated: "May 2026",
        links: [
          { label: "ATO — Sharing economy and gig work", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/the-sharing-economy-and-tax" },
          { label: "ATO — GST for small business", url: "https://www.ato.gov.au/business/gst" },
        ],
      },
      {
        name: "Money and Super",
        description: "Superannuation basics — how it accumulates, how to find lost super, and what happens when you change jobs. Also includes links to financial hardship support.",
        lastUpdated: "May 2026",
        links: [
          { label: "ATO — Super for individuals", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families" },
          { label: "ATO — Find your lost super", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/find-lost-super" },
          { label: "MoneySmart — Superannuation", url: "https://moneysmart.gov.au/grow-your-super" },
        ],
      },
      {
        name: "Consumer Rights",
        description: "Your rights when buying goods or services — refunds, warranties, and what to do if a business does not cooperate. Covers the Australian Consumer Law.",
        lastUpdated: "May 2026",
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
    icon: "home",
    guides: [
      {
        name: "Renting and Tenancy",
        description: "Your rights as a tenant — bond, repairs, entry by the landlord, rent increases, and how to dispute an unfair eviction. Links to your state's tenancy authority.",
        lastUpdated: "May 2026",
        links: [
          { label: "NSW Fair Trading — Tenancy", url: "https://www.fairtrading.nsw.gov.au/housing-and-property/renting" },
          { label: "Consumer Affairs Victoria — Renting", url: "https://www.consumer.vic.gov.au/housing/renting" },
          { label: "Tenants Queensland", url: "https://tenantsqld.org.au" },
        ],
      },
      {
        name: "Neighbours and Community",
        description: "What to do about noise, fences, overhanging trees, and disputes with neighbours. Covers mediation options before escalating to a tribunal.",
        lastUpdated: "May 2026",
        links: [
          { label: "NSW Fair Trading — Neighbour disputes", url: "https://www.fairtrading.nsw.gov.au/housing-and-property/building-and-renovating/resolving-building-disputes/neighbour-disputes" },
          { label: "Community Justice Centres NSW", url: "https://cjc.nsw.gov.au" },
        ],
      },
      {
        name: "Council and Local Government",
        description: "How local councils work, what they are responsible for, how to report issues like potholes or illegal dumping, and how to have your say on local decisions.",
        lastUpdated: "May 2026",
        links: [
          { label: "ALGA — What is local government", url: "https://www.alga.com.au/about-local-government/what-is-local-government" },
          { label: "DLGSC — Find your council (WA)", url: "https://www.dlgsc.wa.gov.au/local-government/local-governments" },
        ],
      },
      {
        name: "Utilities and Cost of Living",
        description: "How to compare electricity and gas providers, what to do if you cannot pay a bill, and what hardship programs energy retailers must offer under the law.",
        lastUpdated: "May 2026",
        links: [
          { label: "AER — Energy Made Easy", url: "https://www.energymadeeasy.gov.au" },
          { label: "MoneySmart — Dealing with debt", url: "https://moneysmart.gov.au/debt" },
        ],
      },
    ],
  },
  {
    name: "Health and Family",
    desc: "Bodies, minds, kids, carers.",
    icon: "health",
    guides: [
      {
        name: "Health and Medicare",
        description: "How Medicare works, what it covers, how to get a Medicare card, bulk billing, and what to do if you need care but are unsure of costs.",
        lastUpdated: "May 2026",
        links: [
          { label: "Services Australia — Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
          { label: "Healthdirect — Find a GP", url: "https://www.healthdirect.gov.au/australian-health-services" },
          { label: "Services Australia — Enrol in Medicare", url: "https://www.servicesaustralia.gov.au/how-to-enrol-in-medicare" },
        ],
      },
      {
        name: "Mental Health and Wellbeing",
        description: "Free and low-cost mental health services in Australia, including the Better Access scheme for subsidised psychology sessions, crisis lines, and online tools.",
        lastUpdated: "May 2026",
        links: [
          { label: "Beyond Blue", url: "https://www.beyondblue.org.au" },
          { label: "Head to Health", url: "https://www.headtohealth.gov.au" },
          { label: "Lifeline — 13 11 14", url: "https://www.lifeline.org.au" },
        ],
      },
      {
        name: "Kids and Families",
        description: "Child Care Subsidy, Family Tax Benefit, parenting payments, and where to find free or low-cost activities and support for families.",
        lastUpdated: "May 2026",
        links: [
          { label: "Services Australia — Family payments", url: "https://www.servicesaustralia.gov.au/families" },
          { label: "Services Australia — Child Care Subsidy", url: "https://www.servicesaustralia.gov.au/child-care-subsidy" },
          { label: "Raising Children Network", url: "https://raisingchildren.net.au" },
        ],
      },
      {
        name: "Disability and Carer Support",
        description: "An overview of the NDIS, Carer Payment, Carer Allowance, and how to access disability support services. Includes links to advocacy organisations.",
        lastUpdated: "May 2026",
        links: [
          { label: "NDIS — How to access", url: "https://www.ndis.gov.au/applying-access-ndis/how-apply" },
          { label: "Services Australia — Carer Payment", url: "https://www.servicesaustralia.gov.au/carer-payment" },
          { label: "Carers Australia", url: "https://www.carersaustralia.com.au" },
        ],
      },
    ],
  },
  {
    name: "Civic and Legal",
    desc: "Voting, legal basics, safety, and your rights online.",
    icon: "civic",
    guides: [
      {
        name: "Voting and Civic Life",
        description: "How to enrol to vote, how preferential voting works, and what your civic responsibilities are as an Australian resident or citizen.",
        lastUpdated: "May 2026",
        links: [
          { label: "AEC — Enrol to vote", url: "https://www.aec.gov.au/enrol" },
          { label: "AEC — How to vote", url: "https://www.aec.gov.au/Voting" },
        ],
      },
      {
        name: "Legal Basics",
        description: "Free and low-cost legal help in Australia — community legal centres, Legal Aid, and what to expect if you receive a letter from a court or debt collector.",
        lastUpdated: "May 2026",
        links: [
          { label: "Law Access NSW", url: "https://www.legalaid.nsw.gov.au/lawaccess" },
          { label: "Find a Community Legal Centre", url: "https://clcs.org.au/find-a-clc" },
          { label: "MoneySmart — Debt collectors", url: "https://moneysmart.gov.au/debt/debt-collectors" },
        ],
      },
      {
        name: "Safety and Family Violence",
        description: "Immediate safety resources, what counts as family violence under Australian law, and how to access emergency support, housing, and legal protection orders.",
        lastUpdated: "May 2026",
        links: [
          { label: "1800RESPECT — 1800 737 732", url: "https://www.1800respect.org.au" },
          { label: "Safe Steps — Victoria", url: "https://www.safesteps.org.au" },
          { label: "AG — Family safety resources", url: "https://www.ag.gov.au/families-and-marriage/families/family-violence" },
        ],
      },
      {
        name: "Online Abuse and Your Rights",
        description: "If someone is harassing, threatening, or humiliating you online, you have legal recourse in Australia. The Online Safety Act 2021 gives the eSafety Commissioner power to have harmful content removed. Report directly at esafety.gov.au. For serious threats, contact police.",
        lastUpdated: "May 2026",
        links: [
          { label: "eSafety Commissioner", url: "https://www.esafety.gov.au" },
          { label: "1800RESPECT", url: "https://www.1800respect.org.au" },
          { label: "Report to police", url: "https://www.police.gov.au" },
        ],
      },
      {
        name: "Cybercrime and Financial Fraud",
        description: "If your credit card was used without your permission or you lost money to a scam, act in this order: contact your bank immediately and request a fraud hold; report to ReportCyber at cyber.gov.au/report; contact IDCARE at idcare.org; and lodge a report with local police for a reference number. You may be entitled to a chargeback. Do not delay.",
        lastUpdated: "May 2026",
        links: [
          { label: "ReportCyber — cyber.gov.au/report", url: "https://www.cyber.gov.au/report" },
          { label: "IDCARE — idcare.org", url: "https://www.idcare.org" },
          { label: "Scamwatch — ACCC", url: "https://www.scamwatch.gov.au" },
        ],
      },
    ],
  },
  {
    name: "New to Australia",
    desc: "If you arrived recently, start here.",
    icon: "compass",
    guides: [
      {
        name: "Settling In",
        description: "Getting a Tax File Number, opening a bank account, understanding the healthcare system, and finding community support for people new to Australia.",
        lastUpdated: "May 2026",
        links: [
          { label: "ATO — Apply for a TFN", url: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn" },
          { label: "Services Australia — New arrivals", url: "https://www.servicesaustralia.gov.au/new-migrants" },
        ],
      },
      {
        name: "Health",
        description: "Medicare eligibility for new arrivals, reciprocal health agreements, and how to find GPs, hospitals, and interpreting services.",
        lastUpdated: "May 2026",
        links: [
          { label: "Services Australia — Medicare for new arrivals", url: "https://www.servicesaustralia.gov.au/enrolling-medicare" },
          { label: "Healthdirect — Find a health service", url: "https://www.healthdirect.gov.au/australian-health-services" },
        ],
      },
      {
        name: "Banking",
        description: "How to open a bank account in Australia, what ID you need, and the difference between a savings account and a transaction account.",
        lastUpdated: "May 2026",
        links: [
          { label: "MoneySmart — Banking basics", url: "https://moneysmart.gov.au/banking" },
          { label: "ASIC — Choosing a bank account", url: "https://moneysmart.gov.au/banking/bank-accounts" },
        ],
      },
      {
        name: "Schools",
        description: "How to enrol a child in school, what types of schools exist, and what financial support is available for families with school-age children.",
        lastUpdated: "May 2026",
        links: [
          { label: "Australian Curriculum", url: "https://www.australiancurriculum.edu.au" },
          { label: "Services Australia — School enrolment support", url: "https://www.servicesaustralia.gov.au/families" },
        ],
      },
      {
        name: "Community",
        description: "Finding multicultural community organisations, settlement services, language support, and social connection for people new to Australia.",
        lastUpdated: "May 2026",
        links: [
          { label: "Settlement Services International", url: "https://www.ssi.org.au" },
          { label: "FECCA — Federation of Ethnic Communities", url: "https://fecca.org.au" },
        ],
      },
      {
        name: "Qualifications",
        description: "How to get overseas qualifications recognised in Australia, which bodies assess which professions, and pathways for skilled migrants.",
        lastUpdated: "May 2026",
        links: [
          { label: "NOOSR — Overseas qualifications", url: "https://www.education.gov.au/overseas-qualifications-unit" },
          { label: "AQF — Australian qualifications framework", url: "https://www.aqf.edu.au" },
        ],
      },
    ],
  },
  {
    name: "Business Setup",
    desc: "Sole trader, company, ABN, ASIC, GST. What to register and when.",
    icon: "briefcase",
    guides: [
      {
        name: "Business Structures Explained",
        description: "The main business structures in Australia — sole trader, partnership, company, and trust. What each means for your personal liability and tax obligations before you register anything.",
        lastUpdated: "May 2026",
        links: [
          { label: "business.gov.au — Business structures", url: "https://business.gov.au/registrations/register-a-business" },
          { label: "ATO — Business structures", url: "https://www.ato.gov.au/business/starting-and-closing-a-business/before-you-start/business-structures" },
        ],
      },
      {
        name: "Registering Your ABN",
        description: "What an Australian Business Number is, who needs one, and how to apply through the Australian Business Register. Free to apply. Usually granted immediately.",
        lastUpdated: "May 2026",
        links: [
          { label: "ABR — Apply for an ABN", url: "https://www.abr.gov.au/business-super-funds-charities/applying-abn" },
          { label: "ATO — ABN eligibility", url: "https://www.ato.gov.au/business/registering-for-taxes/registering-for-an-abn" },
        ],
      },
      {
        name: "Setting Up a Company via ASIC",
        description: "How to register a company through ASIC, what documents you need, what ongoing obligations a company director has, and what it costs annually.",
        lastUpdated: "May 2026",
        links: [
          { label: "ASIC — Register a company", url: "https://asic.gov.au/for-business/registering-a-company" },
          { label: "ASIC — Company director obligations", url: "https://asic.gov.au/for-business/running-a-company/company-officeholders" },
        ],
      },
      {
        name: "GST and BAS Basics",
        description: "When you need to register for GST (once turnover exceeds $75,000), what a Business Activity Statement is, and how often you lodge. The ATO has a free tool to help.",
        lastUpdated: "May 2026",
        links: [
          { label: "ATO — GST", url: "https://www.ato.gov.au/business/gst" },
          { label: "ATO — Business activity statements", url: "https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas" },
        ],
      },
      {
        name: "Business Name Registration",
        description: "The difference between a trading name, a business name, and a company name. How to register a business name via ASIC and what it costs per year.",
        lastUpdated: "May 2026",
        links: [
          { label: "ASIC — Register a business name", url: "https://asic.gov.au/for-business/registering-a-business-name" },
          { label: "business.gov.au — Business names", url: "https://business.gov.au/registrations/register-a-business-name" },
        ],
      },
    ],
  },
  {
    name: "Employment and Workplace",
    desc: "Fair Work, job types, pay rates, your rights at work.",
    icon: "employment",
    guides: [
      {
        name: "Job Types and Contracts",
        description: "The difference between full-time, part-time, casual, and fixed-term employment in Australia, and what each means for your entitlements and notice periods.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Employment types", url: "https://www.fairwork.gov.au/employment-conditions/types-of-employees" },
          { label: "Fair Work — Contracts", url: "https://www.fairwork.gov.au/employment-conditions/contracts" },
        ],
      },
      {
        name: "Your Pay and Entitlements",
        description: "The National Minimum Wage, penalty rates, leave entitlements, and how to use the Pay and Conditions Tool to check what you should be earning.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Minimum wage", url: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages" },
          { label: "Fair Work — Pay and Conditions Tool", url: "https://calculate.fairwork.gov.au" },
        ],
      },
      {
        name: "Workplace Rights and Safety",
        description: "Your right to a safe workplace, how to report safety issues, and what WorkSafe and Safe Work Australia are responsible for in your state.",
        lastUpdated: "May 2026",
        links: [
          { label: "Safe Work Australia", url: "https://www.safeworkaustralia.gov.au" },
          { label: "Fair Work — Workplace rights", url: "https://www.fairwork.gov.au/workplace-rights" },
        ],
      },
      {
        name: "Unfair Dismissal Basics",
        description: "What counts as unfair dismissal, who is eligible to apply, the 21-day deadline to lodge a claim, and what the Fair Work Commission process looks like.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work Commission — Unfair dismissal", url: "https://www.fwc.gov.au/termination-of-employment/unfair-dismissal" },
          { label: "Fair Work — Dismissal basics", url: "https://www.fairwork.gov.au/ending-employment/unfair-dismissal" },
        ],
      },
      {
        name: "Wage Theft and Underpayment",
        description: "Underpaying a worker is not a grey area — it is a crime in Australia. If your employer is paying below minimum wage, not paying penalty rates, or asking you to work off the clock, you can report it. Fair Work takes anonymous reports. You cannot be fired for reporting.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Pay complaints", url: "https://www.fairwork.gov.au/pay-and-wages/pay-problems" },
          { label: "Fair Work — Anonymous tip-off", url: "https://www.fairwork.gov.au/about-us/contact-us" },
        ],
      },
    ],
  },
  {
    name: "Consumer and Fair Trade",
    desc: "Refunds, scams, debt collectors, product recalls.",
    icon: "shield",
    guides: [
      {
        name: "Refunds and Warranties",
        description: "Under the Australian Consumer Law you have automatic guarantees on goods and services. Businesses cannot refuse a refund for a major fault, regardless of their store policy.",
        lastUpdated: "May 2026",
        links: [
          { label: "ACCC — Consumer guarantees", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
          { label: "ACCC — Warranties and refunds", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees/warranties" },
        ],
      },
      {
        name: "Dealing with Scams",
        description: "How to recognise common scams targeting Australians, how to report them to Scamwatch, and what to do if you have already lost money.",
        lastUpdated: "May 2026",
        links: [
          { label: "Scamwatch — Report a scam", url: "https://www.scamwatch.gov.au/report-a-scam" },
          { label: "ACCC — Scams", url: "https://www.accc.gov.au/consumers/scams" },
        ],
      },
      {
        name: "Debt Collectors and Your Rights",
        description: "What a debt collector can and cannot do under Australian law, how often they can contact you, and how to dispute a debt you do not believe you owe.",
        lastUpdated: "May 2026",
        links: [
          { label: "MoneySmart — Debt collectors", url: "https://moneysmart.gov.au/debt/debt-collectors" },
          { label: "ACCC — Debt collection practices", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees/debt-collection" },
        ],
      },
      {
        name: "Product Recalls",
        description: "How to check if a product you own has been recalled and how to report an unsafe product to the ACCC's Product Safety Australia.",
        lastUpdated: "May 2026",
        links: [
          { label: "Product Safety Australia — Recalls", url: "https://www.productsafety.gov.au/recalls" },
          { label: "ACCC — Report an unsafe product", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees/product-safety" },
        ],
      },
      {
        name: "Price Gouging",
        description: "When a business charges prices that are unconscionable during an emergency or shortage, the ACCC has powers to act. What to report and how.",
        lastUpdated: "May 2026",
        links: [
          { label: "ACCC — Price gouging", url: "https://www.accc.gov.au/consumers/prices-and-price-rises" },
          { label: "ACCC — Make a complaint", url: "https://www.accc.gov.au/contact-us/contact-the-accc/report-a-consumer-issue" },
        ],
      },
    ],
  },
  {
    name: "Education and Training",
    desc: "TAFE, apprenticeships, skills recognition, mature age options.",
    icon: "graduation",
    guides: [
      {
        name: "TAFE by State",
        description: "TAFE delivers government-subsidised vocational training in every state. Fees and course availability vary. Each state has its own TAFE provider and eligibility rules for concessions.",
        lastUpdated: "May 2026",
        links: [
          { label: "TAFE NSW", url: "https://www.tafensw.edu.au" },
          { label: "TAFE Victoria", url: "https://www.tafe.vic.gov.au" },
          { label: "TAFE Queensland", url: "https://tafeqld.edu.au" },
        ],
      },
      {
        name: "Apprenticeships and Traineeships",
        description: "How apprenticeships and traineeships work in Australia, who is eligible, what pay applies, and which government subsidies are available for employers and apprentices.",
        lastUpdated: "May 2026",
        links: [
          { label: "Australian Apprenticeships", url: "https://www.australianapprenticeships.gov.au" },
          { label: "Fair Work — Apprentice pay rates", url: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages/apprentice-pay-rates" },
        ],
      },
      {
        name: "Skills Recognition for Migrants",
        description: "How to get overseas qualifications and work experience recognised in Australia. Different professions use different assessment bodies. Start with the general framework.",
        lastUpdated: "May 2026",
        links: [
          { label: "NOOSR — Overseas qualifications", url: "https://www.education.gov.au/overseas-qualifications-unit" },
          { label: "Skills Shortage List", url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list" },
        ],
      },
      {
        name: "Mature Age and Career Change",
        description: "Programs and subsidies for Australians over 45 looking to retrain or change careers, including wage subsidies available to employers who hire mature age workers.",
        lastUpdated: "May 2026",
        links: [
          { label: "Services Australia — Employment assistance", url: "https://www.servicesaustralia.gov.au/employment-services" },
          { label: "National Careers Institute", url: "https://www.nationalcareers.edu.au" },
        ],
      },
      {
        name: "VET Student Loans",
        description: "VET Student Loans help eligible students pay tuition fees for approved higher-level vocational courses. Not all courses qualify. Check eligibility before enrolling.",
        lastUpdated: "May 2026",
        links: [
          { label: "VET Student Loans — education.gov.au", url: "https://www.education.gov.au/vet-student-loans" },
          { label: "StudyAssist — VET information", url: "https://www.studyassist.gov.au" },
        ],
      },
    ],
  },
  {
    name: "Government Jobs",
    desc: "The job boards most people do not know exist.",
    icon: "building",
    guides: [
      {
        name: "APSJobs (Federal)",
        description: "The central job board for Australian Public Service positions across all federal agencies. Roles range from entry-level to senior executive. Most applications are via APSJobs portal.",
        lastUpdated: "May 2026",
        links: [
          { label: "APSJobs", url: "https://www.apsjobs.gov.au" },
          { label: "APS — Working in the APS", url: "https://www.aps.gov.au/working-in-the-aps" },
        ],
      },
      {
        name: "I Work for NSW",
        description: "The official job portal for NSW Government roles including health, education, transport, and the public service. Some agencies post separately so check both.",
        lastUpdated: "May 2026",
        links: [
          { label: "I Work for NSW", url: "https://iworkfor.nsw.gov.au" },
        ],
      },
      {
        name: "Jobs Victoria",
        description: "Victorian Government jobs portal covering the public service, health, education, and specialist agencies including Victoria Police and the courts.",
        lastUpdated: "May 2026",
        links: [
          { label: "Jobs Victoria", url: "https://www.jobs.vic.gov.au" },
        ],
      },
      {
        name: "Queensland Government Careers",
        description: "Smart Jobs and Careers is the Queensland Government's job portal. Covers the Queensland Public Service, Queensland Health, and Queensland Education.",
        lastUpdated: "May 2026",
        links: [
          { label: "Smart Jobs and Careers", url: "https://smartjobs.qld.gov.au" },
        ],
      },
      {
        name: "WA Government Jobs",
        description: "Jobs WA is the official portal for Western Australian Government positions across the public sector, health, education, and emergency services.",
        lastUpdated: "May 2026",
        links: [
          { label: "Jobs WA", url: "https://www.jobs.wa.gov.au" },
        ],
      },
      {
        name: "SA Government Careers",
        description: "The South Australian Government's career portal covering the public service, SA Health, and Department for Education. Uses the iRecruitment platform.",
        lastUpdated: "May 2026",
        links: [
          { label: "SA Government Careers", url: "https://www.sagovcareers.sa.gov.au" },
        ],
      },
    ],
  },
  {
    name: "Students",
    desc: "Your rights as a student worker. Exploitation is not normal.",
    icon: "book",
    guides: [
      {
        name: "Student Workplace Rights",
        description: "Student workers — including international students and those on working holiday visas — have the same minimum wage and penalty rate protections as any other worker in Australia. Your visa does not reduce your rights.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Young workers", url: "https://www.fairwork.gov.au/find-help-for/young-workers-and-students" },
          { label: "Fair Work — Pay check tool", url: "https://calculate.fairwork.gov.au" },
        ],
      },
      {
        name: "Underpayment and Wage Theft",
        description: "Underpaying a worker is not a grey area. It is a crime in Australia. If your employer is paying you below the minimum wage, not paying penalty rates, or asking you to work off the clock, you can report it. Fair Work takes anonymous reports. You cannot be fired for reporting. Your visa status does not affect your workplace rights.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Pay complaints", url: "https://www.fairwork.gov.au/pay-and-wages/pay-problems" },
          { label: "Fair Work — Anonymous tip-off", url: "https://www.fairwork.gov.au/about-us/contact-us" },
        ],
      },
      {
        name: "International Student Work Rights",
        description: "International students on a student visa can generally work up to 48 hours per fortnight while their course is in session. During breaks you may work unlimited hours. Check your visa conditions via VEVO.",
        lastUpdated: "May 2026",
        links: [
          { label: "Home Affairs — Student visa work rights", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/temporary-relaxation-of-working-hours-for-student-visa-holders" },
          { label: "VEVO — Check visa conditions", url: "https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online" },
        ],
      },
      {
        name: "Where to Report Exploitation",
        description: "If you have been exploited, underpaid, or threatened at work, multiple agencies can help. You do not need to be a permanent resident to make a report. Anonymity is available.",
        lastUpdated: "May 2026",
        links: [
          { label: "Fair Work — Make a complaint", url: "https://www.fairwork.gov.au/about-us/contact-us/call-us" },
          { label: "Wage Theft — Victoria Police", url: "https://www.police.vic.gov.au/wage-theft" },
        ],
      },
      {
        name: "Mental Health Support for Students",
        description: "University and TAFE counselling services, national crisis lines, and headspace centres — free and low-cost mental health support specifically for students.",
        lastUpdated: "May 2026",
        links: [
          { label: "headspace — Find a centre", url: "https://headspace.org.au/headspace-centres" },
          { label: "Beyond Blue", url: "https://www.beyondblue.org.au" },
          { label: "Lifeline — 13 11 14", url: "https://www.lifeline.org.au" },
        ],
      },
    ],
  },
];
