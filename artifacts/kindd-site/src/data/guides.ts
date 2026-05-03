export interface GuideLink {
  label: string;
  url: string;
}

export interface Guide {
  name: string;
  description: string;
  links: GuideLink[];
}

export interface Cluster {
  id: string;
  name: string;
  color: string;
  description: string;
  guides: Guide[];
}

export const clusters: Cluster[] = [
  {
    id: "money",
    name: "Money and Work",
    color: "#F59E0B",
    description: "Tax, superannuation, consumer rights, and income.",
    guides: [
      {
        name: "Tax Basics",
        description: "Covers income tax, how the PAYG system works, what a tax return is, and when you need to lodge one. Covers both employees and sole traders.",
        links: [
          { label: "ATO Lodge a Tax Return", url: "https://www.ato.gov.au/individuals-and-families/lodging-your-tax-return" },
          { label: "MyTax", url: "https://my.gov.au" },
        ],
      },
      {
        name: "Side Income and Gig Work",
        description: "If you earn money from Uber, Airtasker, Etsy, markets, or any platform, that income is taxable. Covers ABN requirements, declaring income, and GST thresholds.",
        links: [
          { label: "ATO Gig Economy", url: "https://www.ato.gov.au/businesses-and-organisations/gig-economy" },
          { label: "ABN Registration", url: "https://www.abr.gov.au" },
        ],
      },
      {
        name: "Money and Super",
        description: "Superannuation basics, how to find lost super, what your employer must pay, and how to check your balance. Covers MoneySmart tools.",
        links: [
          { label: "MoneySmart Super", url: "https://moneysmart.gov.au/superannuation" },
          { label: "ATO Super", url: "https://www.ato.gov.au/super" },
          { label: "ATO Lost Super", url: "https://www.ato.gov.au/calculators-and-tools/find-your-lost-super" },
        ],
      },
      {
        name: "Consumer Rights",
        description: "What you are entitled to when something you buy is broken, not fit for purpose, or not as described. Covers refunds, replacements, and your rights under Australian Consumer Law.",
        links: [
          { label: "ACCC", url: "https://www.accc.gov.au/consumers" },
          { label: "NSW Fair Trading", url: "https://www.fairtrading.nsw.gov.au" },
        ],
      },
    ],
  },
  {
    id: "home",
    name: "Home and Renting",
    color: "#6B8F71",
    description: "Tenancy rights, neighbours, councils, and utilities.",
    guides: [
      {
        name: "Renting and Tenancy",
        description: "Covers your rights as a tenant including bond, repairs, entry by the landlord, rent increases, and how to dispute an unfair eviction. Links to your state tenancy authority.",
        links: [
          { label: "NSW Fair Trading Tenancy", url: "https://www.fairtrading.nsw.gov.au/housing-and-property" },
          { label: "Consumer Affairs Victoria", url: "https://www.consumer.vic.gov.au/housing" },
          { label: "RTA Queensland", url: "https://www.rta.qld.gov.au" },
        ],
      },
      {
        name: "Neighbours and Community",
        description: "What to do about noise complaints, fences, trees, and disputes with neighbours. Covers mediation options and when to involve your council.",
        links: [
          { label: "Community Justice Centres NSW", url: "https://www.cjc.nsw.gov.au" },
          { label: "Dispute Settlement Centre VIC", url: "https://www.disputes.vic.gov.au" },
        ],
      },
      {
        name: "Council and Local Government",
        description: "What your council is responsible for, how to find yours, how to report local issues, and how to participate in council decisions.",
        links: [
          { label: "australia.gov.au/councils", url: "https://www.australia.gov.au/councils" },
        ],
      },
      {
        name: "Utilities and Cost of Living",
        description: "How to compare energy providers, what to do if you cannot pay a bill, hardship programs available from utilities, and telco complaints.",
        links: [
          { label: "Energy Made Easy", url: "https://www.energymadeeasy.gov.au" },
          { label: "Telecommunications Industry Ombudsman", url: "https://www.tio.com.au" },
        ],
      },
    ],
  },
  {
    id: "health",
    name: "Health and Family",
    color: "#C0635A",
    description: "Medicare, mental health, families, and disability support.",
    guides: [
      {
        name: "Health and Medicare",
        description: "How Medicare works, how to enrol, what is covered, what is not, and how to find a bulk-billing GP near you.",
        links: [
          { label: "Services Australia Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
          { label: "Healthdirect GP Finder", url: "https://www.healthdirect.gov.au/gp-and-health-services-finder" },
        ],
      },
      {
        name: "Mental Health and Wellbeing",
        description: "Free and low-cost mental health support in Australia. Covers GP Mental Health Plans, crisis lines, and community services.",
        links: [
          { label: "Beyond Blue", url: "https://www.beyondblue.org.au" },
          { label: "Lifeline", url: "https://www.lifeline.org.au" },
          { label: "Headspace", url: "https://www.headspace.org.au" },
        ],
      },
      {
        name: "Kids and Families",
        description: "Family payments, parental leave, child care subsidies, school enrolment, and where to find free activities for children.",
        links: [
          { label: "Services Australia Families", url: "https://www.servicesaustralia.gov.au/families" },
          { label: "Playgroup Australia", url: "https://www.playgroupaustralia.com.au" },
        ],
      },
      {
        name: "Disability and Carer Support",
        description: "NDIS eligibility, how to apply, what it funds, and support for carers including Carer Payment and Carer Allowance.",
        links: [
          { label: "NDIS", url: "https://www.ndis.gov.au" },
          { label: "Carers Australia", url: "https://www.carersaustralia.com.au" },
        ],
      },
    ],
  },
  {
    id: "civic",
    name: "Civic and Legal",
    color: "#4F6FA0",
    description: "Voting, legal help, safety, online rights, and fraud.",
    guides: [
      {
        name: "Voting and Civic Life",
        description: "Electoral roll enrolment, how federal and state elections work, compulsory voting rules, and how to vote if you are overseas.",
        links: [
          { label: "AEC", url: "https://www.aec.gov.au" },
          { label: "AEC Enrolment", url: "https://www.aec.gov.au/enrol" },
        ],
      },
      {
        name: "Legal Basics",
        description: "Free and low-cost legal help in Australia. Community legal centres, Legal Aid, and what to expect if you receive a letter from a court or debt collector.",
        links: [
          { label: "Law Access NSW", url: "https://www.lawaccess.nsw.gov.au" },
          { label: "Legal Aid NSW", url: "https://www.legalaid.nsw.gov.au" },
          { label: "Community Legal Centres", url: "https://clcs.org.au" },
        ],
      },
      {
        name: "Safety and Family Violence",
        description: "If you or someone you know is not safe at home. Covers what to do, who to call, and your legal options including AVOs.",
        links: [
          { label: "1800RESPECT", url: "https://www.1800respect.org.au" },
          { label: "Safe Steps VIC", url: "https://www.safesteps.org.au" },
        ],
      },
      {
        name: "Online Abuse and Your Rights",
        description: "If someone is harassing, threatening, or humiliating you online, you have legal options. The Online Safety Act 2021 gives the eSafety Commissioner power to have harmful content removed.",
        links: [
          { label: "eSafety Commissioner", url: "https://www.esafety.gov.au" },
          { label: "Report Cyberbullying", url: "https://www.esafety.gov.au/report" },
        ],
      },
      {
        name: "Cybercrime and Financial Fraud",
        description: "If your card was used without permission or you lost money to a scam, act in this order: contact your bank immediately, report to ReportCyber, contact IDCARE, lodge a police report for a reference number.",
        links: [
          { label: "ReportCyber", url: "https://www.cyber.gov.au/report" },
          { label: "IDCARE", url: "https://www.idcare.org" },
          { label: "AFCA", url: "https://www.afca.org.au" },
          { label: "Scamwatch", url: "https://www.scamwatch.gov.au" },
        ],
      },
    ],
  },
  {
    id: "new",
    name: "New to Australia",
    color: "#2A9D8F",
    description: "Settling in, banking, schools, community, and qualifications.",
    guides: [
      {
        name: "Settling In",
        description: "First steps after arriving. Medicare enrolment, bank account setup, TFN application, finding a GP, and connecting with local settlement services.",
        links: [
          { label: "Services Australia", url: "https://www.servicesaustralia.gov.au" },
          { label: "Settlement Services International", url: "https://www.ssi.org.au" },
        ],
      },
      {
        name: "Health",
        description: "How to get a Medicare card as a new arrival, what is covered, and how to find community health services near you.",
        links: [
          { label: "Services Australia Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
        ],
      },
      {
        name: "Banking",
        description: "How to open an Australian bank account, what ID you need, and what to look for in a transaction account.",
        links: [
          { label: "ASIC MoneySmart Banking", url: "https://moneysmart.gov.au/banking" },
        ],
      },
      {
        name: "Schools",
        description: "How to enrol your child in a government school, what documentation is needed, and how the Australian school year works.",
        links: [
          { label: "Australia.gov.au Education", url: "https://www.australia.gov.au/education" },
        ],
      },
      {
        name: "Community",
        description: "Finding community organisations, cultural groups, and settlement support in your area.",
        links: [
          { label: "Settling in Australia", url: "https://www.settlingaustralia.com.au" },
        ],
      },
      {
        name: "Qualifications",
        description: "How to get your overseas qualifications recognised in Australia for work and study.",
        links: [
          { label: "NOOSR", url: "https://noosr.education.gov.au" },
          { label: "VETASSESS", url: "https://www.vetassess.com.au" },
        ],
      },
    ],
  },
  {
    id: "business",
    name: "Business Setup",
    color: "#4A6580",
    description: "ABN, company registration, GST, and business names.",
    guides: [
      {
        name: "Business Structures Explained",
        description: "Sole trader, partnership, company, and trust. What each means for tax, liability, and setup cost. Not advice. A plain-language comparison to help you ask better questions.",
        links: [
          { label: "business.gov.au", url: "https://business.gov.au/registrations/register-a-business" },
        ],
      },
      {
        name: "Registering Your ABN",
        description: "Who needs an ABN, how to apply, and what to do if your application is rejected.",
        links: [
          { label: "ABN Registration", url: "https://www.abr.gov.au" },
        ],
      },
      {
        name: "Setting Up a Company via ASIC",
        description: "What ASIC does, what registering a company involves, annual fees, and reporting obligations.",
        links: [
          { label: "ASIC Register a Company", url: "https://asic.gov.au/for-business/registering-a-company" },
        ],
      },
      {
        name: "GST and BAS Basics",
        description: "When you must register for GST, how BAS works, and quarterly lodgement basics.",
        links: [
          { label: "ATO GST", url: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst" },
        ],
      },
      {
        name: "Business Name Registration",
        description: "How to register a business name, check availability, and renew annually.",
        links: [
          { label: "ASIC Business Names", url: "https://asic.gov.au/for-business/registering-a-business/business-names" },
        ],
      },
    ],
  },
  {
    id: "employment",
    name: "Employment and Workplace",
    color: "#7B5EA7",
    description: "Pay, contracts, rights, dismissal, and wage theft.",
    guides: [
      {
        name: "Job Types and Contracts",
        description: "Full-time, part-time, casual, fixed-term, and contractor. What each means for leave entitlements, tax, and super.",
        links: [
          { label: "Fair Work Types of Employees", url: "https://www.fairwork.gov.au/employment-conditions/types-of-employees" },
        ],
      },
      {
        name: "Your Pay and Entitlements",
        description: "National Minimum Wage, penalty rates, overtime, and leave. How to check if you are being paid correctly.",
        links: [
          { label: "Fair Work Pay Calculator", url: "https://calculate.fairwork.gov.au" },
        ],
      },
      {
        name: "Workplace Rights and Safety",
        description: "Your right to a safe workplace, how to report unsafe conditions, and what WorkSafe covers.",
        links: [
          { label: "Safe Work Australia", url: "https://www.safeworkaustralia.gov.au" },
          { label: "Fair Work", url: "https://www.fairwork.gov.au" },
        ],
      },
      {
        name: "Unfair Dismissal Basics",
        description: "What counts as unfair dismissal, the 21-day window to lodge a claim, and what the process looks like.",
        links: [
          { label: "Fair Work Commission", url: "https://www.fwc.gov.au" },
        ],
      },
      {
        name: "Wage Theft and Underpayment",
        description: "Underpaying a worker is a crime in Australia. If your employer is paying below the minimum wage, not paying penalty rates, or asking you to work off the clock, you can report it. Fair Work takes anonymous reports. You cannot be fired for reporting. Your visa status does not affect your workplace rights.",
        links: [
          { label: "Fair Work Anonymous Report", url: "https://www.fairwork.gov.au/about-us/contact-us" },
        ],
      },
    ],
  },
  {
    id: "consumer",
    name: "Consumer and Fair Trade",
    color: "#B5651D",
    description: "Refunds, scams, debt collectors, and product recalls.",
    guides: [
      {
        name: "Refunds and Warranties",
        description: "Under Australian Consumer Law you have automatic rights when something you buy fails. No receipt required for many claims. Covers refund, repair, and replacement rights.",
        links: [
          { label: "ACCC Consumer Rights", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
        ],
      },
      {
        name: "Dealing with Scams",
        description: "How to identify common scams, what to do if you have been targeted, and how to report.",
        links: [
          { label: "Scamwatch", url: "https://www.scamwatch.gov.au" },
          { label: "ACCC Little Black Book of Scams", url: "https://www.accc.gov.au/media-and-publications/publications/the-little-black-book-of-scams" },
        ],
      },
      {
        name: "Debt Collectors and Your Rights",
        description: "What a debt collector can and cannot do, your right to request verification, and how to dispute a debt.",
        links: [
          { label: "ACCC Debt Collection", url: "https://www.accc.gov.au" },
          { label: "ASIC MoneySmart", url: "https://moneysmart.gov.au" },
        ],
      },
      {
        name: "Product Recalls",
        description: "How to check if something you own has been recalled and what to do.",
        links: [
          { label: "Product Safety Australia", url: "https://www.productsafety.gov.au/recalls" },
        ],
      },
      {
        name: "Price Gouging",
        description: "When price increases become illegal, who regulates them, and how to report excessive pricing.",
        links: [
          { label: "ACCC", url: "https://www.accc.gov.au" },
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Education and Training",
    color: "#3A6B35",
    description: "TAFE, apprenticeships, skills recognition, and VET.",
    guides: [
      {
        name: "TAFE by State",
        description: "TAFE is Australia's national vocational education network. Covers how to find your nearest TAFE, how to enrol, and what courses are available.",
        links: [
          { label: "TAFE NSW", url: "https://www.tafensw.edu.au" },
          { label: "TAFE VIC", url: "https://www.tafe.vic.gov.au" },
          { label: "TAFE QLD", url: "https://www.tafeqld.edu.au" },
        ],
      },
      {
        name: "Apprenticeships and Traineeships",
        description: "How to find an apprenticeship, what an Australian Apprenticeship entails, and what financial support is available.",
        links: [
          { label: "Australian Apprenticeships", url: "https://www.australianapprenticeships.gov.au" },
        ],
      },
      {
        name: "Skills Recognition for Migrants",
        description: "How to get overseas qualifications assessed for use in Australia.",
        links: [
          { label: "VETASSESS", url: "https://www.vetassess.com.au" },
          { label: "Engineers Australia", url: "https://www.engineersaustralia.org.au/skills-assessment" },
        ],
      },
      {
        name: "Mature Age and Career Change",
        description: "Programs and support specifically for Australians over 45 re-entering the workforce or changing careers.",
        links: [
          { label: "Workforce Australia", url: "https://www.workforceaustralia.gov.au" },
        ],
      },
      {
        name: "VET Student Loans",
        description: "What VET Student Loans cover, which courses qualify, and how repayment works.",
        links: [
          { label: "VET Student Loans", url: "https://www.dese.gov.au/vet-student-loans" },
        ],
      },
    ],
  },
  {
    id: "govjobs",
    name: "Government Jobs",
    color: "#1E3A5F",
    description: "Federal and state public sector job boards.",
    guides: [
      {
        name: "APSJobs Federal",
        description: "The official federal government job board. All APS roles listed here.",
        links: [{ label: "APSJobs", url: "https://www.apsjobs.gov.au" }],
      },
      {
        name: "I Work for NSW",
        description: "NSW government job listings across all agencies.",
        links: [{ label: "iworkfor.nsw.gov.au", url: "https://iworkfor.nsw.gov.au" }],
      },
      {
        name: "Jobs Victoria",
        description: "Victorian government jobs across health, education, and public service.",
        links: [{ label: "jobs.vic.gov.au", url: "https://jobs.vic.gov.au" }],
      },
      {
        name: "Queensland Government Careers",
        description: "All Queensland Government roles across departments.",
        links: [{ label: "smartjobs.qld.gov.au", url: "https://smartjobs.qld.gov.au" }],
      },
      {
        name: "WA Government Jobs",
        description: "Western Australian public sector jobs.",
        links: [{ label: "jobs.wa.gov.au", url: "https://jobs.wa.gov.au" }],
      },
      {
        name: "SA Government Careers",
        description: "South Australian Government roles.",
        links: [{ label: "iworkfor.sa.gov.au", url: "https://iworkfor.sa.gov.au" }],
      },
    ],
  },
  {
    id: "students",
    name: "Students",
    color: "#E07A5F",
    description: "Student rights, wage theft, visas, and mental health.",
    guides: [
      {
        name: "Student Workplace Rights",
        description: "As a student worker you have the same rights as any other employee in Australia. Visa conditions do not change your minimum wage entitlements.",
        links: [
          { label: "Fair Work Students", url: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages/student-and-apprentice-pay" },
        ],
      },
      {
        name: "Underpayment and Wage Theft",
        description: "If you are being paid below the minimum wage, asked to work for free, or not receiving your super, that is wage theft. It is illegal. Report it anonymously.",
        links: [
          { label: "Fair Work Anonymous Report", url: "https://www.fairwork.gov.au/about-us/contact-us" },
        ],
      },
      {
        name: "International Student Work Rights",
        description: "Work hour limits on student visas, what happens if you breach them, and how to check your entitlements.",
        links: [
          { label: "Home Affairs Student Visa", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
        ],
      },
      {
        name: "Where to Report Exploitation",
        description: "Who to contact if you are being exploited as a student worker, including the national Student Visa and Temporary Graduate Visa program.",
        links: [
          { label: "Fair Work", url: "https://www.fairwork.gov.au" },
          { label: "Study Australia", url: "https://www.studyaustralia.gov.au" },
        ],
      },
      {
        name: "Mental Health Support for Students",
        description: "Free and low-cost mental health support specifically for students. University counselling, headspace, and beyond.",
        links: [
          { label: "Headspace", url: "https://www.headspace.org.au" },
          { label: "Beyond Blue Student Wellbeing", url: "https://www.beyondblue.org.au" },
        ],
      },
    ],
  },
  {
    id: "volunteering",
    name: "Volunteering",
    color: "#00843D",
    description: "Finding roles, rights, visa conditions, and career value.",
    guides: [
      {
        name: "Finding Volunteer Opportunities",
        description: "How to find volunteering roles in your area and why volunteering counts as experience for job applications and visa purposes.",
        links: [
          { label: "Volunteering Australia", url: "https://www.volunteeringaustralia.org" },
          { label: "Go Volunteer", url: "https://www.govolunteer.com.au" },
        ],
      },
      {
        name: "Volunteer Rights and Protections",
        description: "What protections volunteers have in Australia, insurance coverage, and what organisations are required to provide.",
        links: [
          { label: "Volunteering Australia Standards", url: "https://www.volunteeringaustralia.org/framework/national-standards" },
        ],
      },
      {
        name: "Volunteering and Visa Holders",
        description: "Whether you can volunteer on a student visa or temporary visa, and what conditions apply.",
        links: [
          { label: "Home Affairs", url: "https://www.homeaffairs.gov.au" },
        ],
      },
      {
        name: "Volunteering for Career Development",
        description: "How to use volunteering to build Australian work experience, references, and professional networks.",
        links: [
          { label: "Seek Volunteer", url: "https://www.volunteer.com.au" },
        ],
      },
    ],
  },
  {
    id: "citizenship",
    name: "Citizenship and Coming to Australia",
    color: "#C9A84C",
    description: "Eligibility, the test, applications, and what comes after.",
    guides: [
      {
        name: "Eligibility for Citizenship",
        description: "You generally need to have been a permanent resident for at least four years, including one year as a permanent resident immediately before applying. Good character requirement applies.",
        links: [
          { label: "Home Affairs Citizenship", url: "https://www.homeaffairs.gov.au/citizenship" },
        ],
      },
      {
        name: "The Citizenship Test",
        description: "The Australian Citizenship Test is 20 questions. You need 75 percent to pass. It covers Australian values, history, government, and rights and responsibilities.",
        links: [
          { label: "Citizenship Test Practice", url: "https://citizenshiptest.homeaffairs.gov.au" },
          { label: "Official Preparation Podcast", url: "https://www.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test" },
        ],
      },
      {
        name: "Applying via ImmiAccount",
        description: "You apply online through ImmiAccount. The application fee as of 2026 is $490 for adults. You will need identity documents, proof of residence, and passport photos.",
        links: [
          { label: "ImmiAccount", url: "https://immi.homeaffairs.gov.au/immiaccount" },
          { label: "DFAT Document Certification", url: "https://www.dfat.gov.au" },
        ],
      },
      {
        name: "The Citizenship Ceremony",
        description: "If approved you will be invited to an Australian Citizenship Ceremony. You will make the Australian Citizenship Pledge and receive your certificate. Ceremonies are run by local councils.",
        links: [
          { label: "Home Affairs Ceremony", url: "https://www.homeaffairs.gov.au/citizenship/ceremony" },
        ],
      },
    ],
  },
];
