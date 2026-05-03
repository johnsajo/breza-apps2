export type ToolId =
  | "tax-bracket"
  | "day-rate"
  | "loan-repayment"
  | "solar-savings"
  | "business-structure"
  | "id-checker"
  | "passport"
  | "public-transport"
  | "parking-fine"
  | "wwc";

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    id: "tax-bracket",
    name: "Tax Bracket Estimator",
    description: "Enter your annual income. See which bracket you sit in and a rough estimate of what you owe.",
    icon: "tax",
  },
  {
    id: "day-rate",
    name: "Freelance Day Rate Calculator",
    description: "Work out what to charge. Enter your annual target and working pattern.",
    icon: "calculator",
  },
  {
    id: "loan-repayment",
    name: "Loan Repayment Estimator",
    description: "Enter a loan amount, rate, and term. See a rough monthly repayment.",
    icon: "loan",
  },
  {
    id: "solar-savings",
    name: "Solar Savings Estimator",
    description: "A rough guide only. Real quotes vary significantly.",
    icon: "solar",
  },
  {
    id: "business-structure",
    name: "Business Structure Comparison",
    description: "Not advice. A plain-language comparison to help you ask the right questions.",
    icon: "compare",
  },
  {
    id: "id-checker",
    name: "100 Points ID Checker",
    description: "Check if you have enough ID before you walk in the door.",
    icon: "id",
  },
  {
    id: "passport",
    name: "Passport Eligibility Checker",
    description: "New passport or renewal. Rough timeline only. Check DFAT for current processing times.",
    icon: "passport",
  },
  {
    id: "public-transport",
    name: "Public Transport Finder",
    description: "Not a live timetable. The right app and website for your state.",
    icon: "transport",
  },
  {
    id: "parking-fine",
    name: "Parking Fine Finder",
    description: "Where to pay your fine. State by state.",
    icon: "parking",
  },
  {
    id: "wwc",
    name: "Working With Children Check Finder",
    description: "Who needs one, how to get it, what it costs. By state.",
    icon: "children",
  },
];

export const DISCLAIMER = "This tool gives you an estimate only. It is not financial, legal, or tax advice. For accurate figures, speak to a registered professional or use the official government tool linked below.";

export const TAX_BRACKETS_RESIDENT = [
  { min: 0, max: 18200, rate: 0, label: "Tax-free threshold" },
  { min: 18201, max: 45000, rate: 0.19, label: "19%" },
  { min: 45001, max: 120000, rate: 0.325, label: "32.5%" },
  { min: 120001, max: 180000, rate: 0.37, label: "37%" },
  { min: 180001, max: Infinity, rate: 0.45, label: "45%" },
];

export const TAX_BRACKETS_NON_RESIDENT = [
  { min: 0, max: 120000, rate: 0.325, label: "32.5%" },
  { min: 120001, max: 180000, rate: 0.37, label: "37%" },
  { min: 180001, max: Infinity, rate: 0.45, label: "45%" },
];

export const MEDICARE_LEVY = 0.02;

export const PUBLIC_TRANSPORT_DATA: Record<string, { card: string; website: string; topUp: string }> = {
  NSW: { card: "Opal", website: "transportnsw.info", topUp: "Opal app, convenience stores, station top-up machines" },
  VIC: { card: "myki", website: "ptv.vic.gov.au", topUp: "myki app, 7-Eleven, station top-up machines" },
  QLD: { card: "go card", website: "translink.com.au", topUp: "TransLink app, convenience stores, station machines" },
  WA: { card: "SmartRider", website: "transperth.wa.gov.au", topUp: "Transperth InfoCentres, online" },
  SA: { card: "Metrocard", website: "adelaidemetro.com.au", topUp: "Adelaide Metro InfoCentres, online" },
  TAS: { card: "Greencard", website: "metrotas.com.au", topUp: "Metro Tasmania offices, online" },
  ACT: { card: "MyWay", website: "transport.act.gov.au", topUp: "MyWay app, participating retailers" },
  NT: { card: "No card system", website: "darwinbus.com.au", topUp: "Pay driver with exact change" },
};

export const PARKING_FINES_DATA: Record<string, { authority: string; payUrl: string; disputeNote: string }> = {
  NSW: { authority: "Revenue NSW", payUrl: "revenue.nsw.gov.au", disputeNote: "Request internal review within 28 days online or by post." },
  VIC: { authority: "Fines Victoria", payUrl: "fines.vic.gov.au", disputeNote: "Apply to have the fine reviewed by Fines Victoria within 30 days." },
  QLD: { authority: "State Penalties Enforcement Registry (SPER)", payUrl: "sper.qld.gov.au", disputeNote: "Dispute via Magistrates Court within the timeframe on the infringement notice." },
  WA: { authority: "Fines Enforcement Registry", payUrl: "wa.gov.au/organisation/fines-enforcement-registry", disputeNote: "Lodge a request for withdrawal with the issuing agency." },
  SA: { authority: "Expiation Notice Branch", payUrl: "sa.gov.au/topics/driving-and-transport", disputeNote: "Apply for an expiation fee reduction or elect to be prosecuted in court." },
  TAS: { authority: "Department of Justice", payUrl: "justice.tas.gov.au", disputeNote: "Elect court hearing within 28 days if you wish to dispute." },
  ACT: { authority: "Access Canberra", payUrl: "accesscanberra.act.gov.au", disputeNote: "Apply for internal review within 28 days of the infringement." },
  NT: { authority: "Fines Recovery Unit", payUrl: "nt.gov.au", disputeNote: "Dispute via the Local Court within the period specified on the notice." },
};

export const WWC_DATA: Record<string, { who: string; how: string; cost: string; validity: string; url: string }> = {
  NSW: { who: "Anyone who works or volunteers with children in paid or unpaid roles", how: "Apply online via the Office of the Children's Guardian", cost: "Paid workers: $80. Volunteers: free.", validity: "5 years", url: "kidsguardian.nsw.gov.au/working-with-children/working-with-children-check" },
  VIC: { who: "Anyone who works with children in child-related work", how: "Apply online via Working with Children Check Victoria", cost: "Paid workers: $128.40. Volunteers: free.", validity: "5 years", url: "workingwithchildren.vic.gov.au" },
  QLD: { who: "Anyone who is regulated under the Blue Card system", how: "Apply online via Blue Card Services", cost: "Paid workers: $118.00. Volunteers: free.", validity: "3 years", url: "qld.gov.au/law/laws-regulated-industries-and-accountability/queensland-laws-and-regulations/regulated-industries-and-licensing/blue-card-services" },
  WA: { who: "Anyone working or volunteering with children in regulated services", how: "Apply online via the Department of Communities", cost: "Paid workers: $68. Volunteers: free.", validity: "3 years", url: "workingwithchildren.wa.gov.au" },
  SA: { who: "Anyone working or volunteering with children in prescribed positions", how: "Apply via the Department of Human Services", cost: "Paid workers: $104.50. Volunteers: free.", validity: "5 years", url: "screening.sa.gov.au/types-of-check/working-with-children-check" },
  TAS: { who: "Anyone working or volunteering with children in regulated activities", how: "Apply via the Registration to Work with Vulnerable People scheme", cost: "$137.85 for all (volunteer reduction available)", validity: "3 years", url: "justice.tas.gov.au/working_with_children" },
  ACT: { who: "Anyone in a working with vulnerable people role", how: "Apply via the Working with Vulnerable People (WWVP) Registration", cost: "Paid workers: $88. Volunteers: $11.", validity: "3 years", url: "accesscanberra.act.gov.au/s/article/Working-with-Vulnerable-People-Registration" },
  NT: { who: "Anyone in child-related employment", how: "Apply via Ochre Card — NT Government", cost: "Paid workers: $98. Volunteers: free.", validity: "2 years", url: "dcdd.nt.gov.au/safe/working-with-children" },
};
