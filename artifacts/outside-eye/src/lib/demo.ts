export const DEMO_RESPONSES: Record<string, object> = {
  critique: {
    isDemo: true,
    gutReaction:
      "The bones are here. The mark has personality and the wordmark choice suggests someone has thought about craft. But the execution is letting the concept down. It reads as promising, not finished.",
    whatIsWorking: [
      "The abbreviated letterform creates genuine distinction. Not many local coffee marks have the confidence to reduce.",
      "The weight contrast between primary and secondary type feels considered. It earns the hierarchy.",
      "The colour story is coherent. Warm, earthy, not trying to be a third-wave minimalist cliche.",
    ],
    whatIsNotWorking: [
      "The spacing around the mark is uneven. Left side feels tighter than right. That kind of inconsistency reads as unfinished at scale.",
      "The tagline is working too hard. It says what the logo already shows. Cut it or replace it with something earned.",
      "On a dark background the mark loses structural integrity. The thin stroke weights disappear completely.",
    ],
    theBigProblem:
      "This mark is designed for one context and one context only. Before it goes anywhere, it needs to survive a white background, a dark background, an embossed stamp, and a 16px favicon. Right now it only survives the first one.",
    specificFixes: [
      "Add 8px minimum clear space on all sides. Make it a rule, not a suggestion.",
      "Drop the tagline from the primary lockup. Let it breathe.",
      "Create a single-colour version and test it at 40px wide. That is your real stress test.",
      "Push the stroke weight on the letterform up one level. It will feel heavier in preview, but correct at print.",
    ],
    theOneThing:
      "Build the single-colour knockout version before you show this to anyone. That version will tell you everything the polished comp is hiding.",
  },

  brief: {
    isDemo: true,
    whatTheySaid:
      "Hi mate, I need a Facebook ad for my plumbing business. Something that looks professional but also friendly. Maybe with a before and after? Let me know what you think.",
    whatTheyActuallyWant:
      "They want to feel confident showing this to their mates and existing customers. Professional is code for not embarrassing. Friendly is code for not corporate. The before and after is a borrowed idea they have seen work elsewhere, not a brief in itself.",
    whatTheyDidntSayButExpect: [
      "Their phone number visible. Probably their logo too. They will ask why it is not there.",
      "Something that works on mobile. They are likely running this from their personal phone.",
      "Fast turnaround. Tradie clients often treat digital work as low-effort. Budget expectations may not match scope.",
      "An option to tweak the headline. They will want to change the wording once they see it.",
    ],
    lazyExecutionsToAvoid: [
      "Generic tools stock photo. Find a real pipe or use their actual work if they can send photos.",
      "Blue and white colour scheme because it screams plumbing. Find a fresher angle.",
      "Headline that says something like Plumbing You Can Trust. No one has ever been persuaded by that.",
      "Cramming in a full list of services. This is one ad, one message, one job.",
    ],
    theLine:
      "This is a trust ad, not an information ad. Make them feel safe choosing someone local they have never met.",
  },

  bridge: {
    isDemo: true,
    thingOne: "a worn leather tool bag",
    thingTwo: "the first day of school",
    connections: [
      {
        angle: "Initiation",
        metaphor:
          "Both are objects of becoming. The tool bag carries what you need to prove yourself. The school bag carries what someone else thinks you need. One is inherited knowledge. One is earned knowledge.",
        theLine: "What we carry before we know what we are.",
        startHere:
          "A campaign built around the moment you pick your own tools for the first time. Not assigned to you. Chosen by you.",
      },
      {
        angle: "The Weight of Expectation",
        metaphor:
          "A new school bag is stiff, awkward, and slightly wrong. A worn tool bag has been broken in by years of real use. The stiffness of the new versus the softness of the mastered. Every expert was once someone with a bag that did not fit yet.",
        theLine: "Everyone starts stiff.",
        startHere:
          "Mentorship or training brand. The visual contrast of the too-new versus the just-right. Aspirational without being patronising.",
      },
      {
        angle: "Ritual",
        metaphor:
          "Packing the night before. The particular order things go in. The item that always lives in the same pocket. Both objects are about ritual preparation for a day that matters. Neither is just storage.",
        theLine: "The night-before feeling never goes away.",
        startHere:
          "Trade services or education brand built on the idea that the best practitioners still feel the nerves. Still prep the bag the night before.",
      },
    ],
  },

  translate: {
    isDemo: true,
    whatTheySaid: "Can you make it feel more premium?",
    whatTheyProbablyMean:
      "The current version feels visually busy, cheap, or generic. They want more white space, better typography, or a calmer colour palette. Premium is almost always a code word for restraint.",
    whatTheyAreActuallyAfraidOf:
      "That their brand will not be taken seriously by the customers they are trying to attract. This is an identity fear, not a design feedback. They want the work to make them look like they belong in a higher tier.",
    diagnosticQuestions: [
      "When you say premium, is there a brand you have in mind that feels right to you?",
      "Is it the colour, the typography, or the layout that feels off right now?",
      "Who are the three competitors you respect most in this space? What do they look like?",
      "What is the one thing you do not want this to look like?",
    ],
    executionDirections: [
      "Reduce the colour palette to two or three. Remove anything that is competing for attention.",
      "Increase the white space around key elements by at least 50 percent.",
      "Replace any system fonts with a considered serif or geometric sans. One typeface, two weights.",
      "Check every element on the page and ask: is this doing a job? If not, remove it.",
    ],
  },

  jury: {
    isDemo: true,
    concept:
      "Billboard for a cycling gear brand that reads: Your commute is lying to you.",
    jurors: [
      {
        role: "Senior Creative Director",
        reaction:
          "Smart headline. Earns the look twice. The tension between the accusation and the category is doing real work. My concern is the second read. What exactly is the lie? The brand needs to be strong enough to answer that question without a body copy crutch.",
        whyItMightFail:
          "It is clever without being useful. If the visual does not explain the lie, people will move on before they connect the dots.",
        whyItMightLand:
          "It respects the audience. It assumes they have had the thought before. That creates recognition, which creates preference.",
      },
      {
        role: "The Actual Target Audience",
        reaction:
          "That is exactly what I think every Monday. If the follow-through is good, I am stopping on this one.",
        whyItMightFail:
          "If the product turns out to be expensive and hard to justify, the headline sets up a promise the price point cannot keep.",
        whyItMightLand:
          "It talks to me like I have already made the decision in my head. That feels true. And a bit dangerous. In a good way.",
      },
      {
        role: "The Client's CFO",
        reaction:
          "Interesting. Cannot quite see the ROI angle yet. How does this drive conversion versus just brand awareness?",
        whyItMightFail:
          "If we cannot measure the response, the board will struggle to approve follow-up spend.",
        whyItMightLand:
          "If we pair it with a clear call to action somewhere in the ecosystem, this kind of brand heat can do the work that performance channels cannot.",
      },
    ],
    overallVerdict:
      "This concept has genuine standout. The risk is execution timidity. The headline is bold enough to demand a visual that matches it. Do not let a cautious art director flatten this. Go further than you think is safe.",
  },

  colour: {
    isDemo: true,
    palettes: [
      {
        name: "Honest Earth",
        rationale:
          "Grounded in the materials themselves. Raw linen, unbleached cotton, terracotta. This palette communicates durability and authenticity without performing sustainability.",
        colours: [
          { role: "primary", hex: "#3D2B1F", name: "Dark Soil", usage: "Headlines, key UI elements, strong text" },
          { role: "secondary", hex: "#8B6B4A", name: "Clay", usage: "Secondary text, icons, borders" },
          { role: "accent", hex: "#C4884F", name: "Terracotta", usage: "CTAs, highlights, active states" },
          { role: "background", hex: "#FAF7F2", name: "Unbleached", usage: "Page background, large surfaces" },
          { role: "surface", hex: "#F0EAE0", name: "Raw Linen", usage: "Cards, input fields, secondary surfaces" },
          { role: "text", hex: "#2A1F16", name: "Deep Earth", usage: "All body copy" },
        ],
        pairingLogic:
          "Analogous warm palette. Each step closer to the accent adds energy. The cool off-white prevents the palette feeling heavy.",
        bestFor: "Print collateral, packaging, product photography backgrounds",
        avoidUsing: "Do not pair with cool blues or bright greens. This palette cannot share space without losing its warmth.",
        emotionalSignal: "Trustworthy, handmade, considered, anti-trend",
      },
      {
        name: "New Build",
        rationale:
          "For the young renter who wants their flat to feel like a decision, not a default. Confident colour pops against a neutral base.",
        colours: [
          { role: "primary", hex: "#1A1A2E", name: "Deep Night", usage: "Navigation, key text, anchoring elements" },
          { role: "secondary", hex: "#4A4A6A", name: "Dusk", usage: "Supporting text, inactive states" },
          { role: "accent", hex: "#7EB8A4", name: "Sage Teal", usage: "CTAs, highlights, featured products" },
          { role: "background", hex: "#FAFAFA", name: "Paper White", usage: "Main background" },
          { role: "surface", hex: "#F2F2F7", name: "Off White", usage: "Cards, product tiles" },
          { role: "text", hex: "#1A1A2E", name: "Deep Night", usage: "All body copy" },
        ],
        pairingLogic:
          "Dark anchor with a single muted teal accent. Clean enough to let photography lead. Sophisticated without trying too hard.",
        bestFor: "Website, app UI, social media templates",
        avoidUsing: "Avoid adding warm tones. This palette works because it stays cool and confident.",
        emotionalSignal: "Modern, calm, considered, slightly editorial",
      },
      {
        name: "Market Day",
        rationale:
          "Vibrant enough to compete in a physical retail environment. Draws from Australian farmers market aesthetics without being nostalgic.",
        colours: [
          { role: "primary", hex: "#2D5A27", name: "Deep Sage", usage: "Headlines, packaging structure" },
          { role: "secondary", hex: "#6B8F4E", name: "Leaf", usage: "Supporting text, secondary UI" },
          { role: "accent", hex: "#E8C547", name: "Harvest", usage: "Price points, labels, standout moments" },
          { role: "background", hex: "#FEF9EC", name: "Cream", usage: "Background, large surfaces" },
          { role: "surface", hex: "#F5EDD4", name: "Warm Cream", usage: "Product cards, section backgrounds" },
          { role: "text", hex: "#1C3518", name: "Forest", usage: "All body copy" },
        ],
        pairingLogic:
          "Green family with a warm yellow accent. Reads as fresh and local. The yellow earns its space as a single accent, not a co-equal.",
        bestFor: "Packaging, point of sale, brand identity system",
        avoidUsing: "Do not add red or orange. The warmth is already doing its job.",
        emotionalSignal: "Abundant, fresh, local, trustworthy",
      },
    ],
  },

  wordmark: {
    isDemo: true,
    concepts: [
      {
        conceptName: "The Foundation",
        font: "DM Serif Display",
        weight: "400",
        letterSpacing: "-0.01em",
        caseStyle: "titlecase",
        textColour: "#1A1A1A",
        backgroundColour: "#FAF8F4",
        reasoning:
          "DM Serif Display carries quiet authority. It says this brand has history, even if it was founded last year. The tight tracking brings formality without rigidity. The off-white ground keeps it warm.",
        personality: "Reliable, established, specialist",
      },
      {
        conceptName: "The Stamp",
        font: "Space Grotesk",
        weight: "700",
        letterSpacing: "0.08em",
        caseStyle: "uppercase",
        textColour: "#FFFFFF",
        backgroundColour: "#2D2D2D",
        reasoning:
          "Heavy, uppercase, widely tracked. This is the brand as statement, not suggestion. Reads on a hi-vis vest, a van door, or a tool shed wall. Unambiguous.",
        personality: "Direct, confident, trade-grade",
      },
      {
        conceptName: "The Craftsperson",
        font: "Cormorant Garamond",
        weight: "600",
        letterSpacing: "0.02em",
        caseStyle: "lowercase",
        textColour: "#3D2B1F",
        backgroundColour: "#FDF6EC",
        reasoning:
          "Cormorant Garamond in lowercase with light tracking reads as handmade and intentional. There is an intimacy to lowercase wordmarks. This one says the work comes from someone who cares about the details.",
        personality: "Artisanal, warm, considered",
      },
    ],
  },

  library: {
    isDemo: true,
    discipline: "Copywriting",
    level: "Just starting",
    books: [
      {
        title: "Hey Whipple, Squeeze This",
        author: "Luke Sullivan",
        whyItMatters:
          "The best entry point into advertising writing. Direct, honest, and still current despite being around for decades. Read it before anything else.",
        free: false,
      },
      {
        title: "Ogilvy on Advertising",
        author: "David Ogilvy",
        whyItMatters:
          "Not everything here applies today. But the thinking behind the thinking does. Ogilvy understood that copy serves a sales function and never lets you forget it.",
        free: false,
      },
      {
        title: "The Copywriter's Handbook",
        author: "Robert W. Bly",
        whyItMatters:
          "Unglamorous and comprehensive. The craft side of the discipline. Read it with a highlighter and return to it constantly.",
        free: false,
      },
      {
        title: "Everybody Writes",
        author: "Ann Handley",
        whyItMatters:
          "The most practical modern guide for writing across digital channels. Particularly good for anyone writing web copy or brand content.",
        free: false,
      },
    ],
    youtubeChannels: [
      {
        name: "Harry Dry (Marketing Examples)",
        whyItMatters:
          "Short, specific breakdowns of real copy. No padding. Every video teaches one thing clearly. Start with his headline videos.",
      },
      {
        name: "Alex Hormozi",
        whyItMatters:
          "Blunt thinking on value, offers, and persuasion. Not copywriting in the traditional sense but essential for understanding what makes something worth reading.",
      },
    ],
    websites: [
      {
        name: "Marketing Examples",
        url: "https://marketingexamples.com",
        whyItMatters:
          "Real examples, real analysis. Not theoretical. Consistently the best free resource on what works and why.",
      },
      {
        name: "Copyhackers",
        url: "https://copyhackers.com",
        whyItMatters:
          "Evidence-based copywriting. Particularly strong on conversion copy and the difference between features and benefits.",
      },
      {
        name: "The Drum",
        url: "https://thedrum.com",
        whyItMatters:
          "Industry news and case studies. Useful for understanding how campaigns are framed and what is being recognised as effective.",
      },
    ],
    freeCourses: [
      { name: "Google Digital Garage: Fundamentals of Digital Marketing", platform: "Google" },
      { name: "HubSpot Content Marketing Certification", platform: "HubSpot Academy" },
      { name: "Copyblogger's Copywriting 101", platform: "Copyblogger" },
    ],
    weekOnePlan:
      "Read the first three chapters of Hey Whipple. Then go to Marketing Examples and spend one hour reading breakdowns of real headlines. Write ten headlines for something you use every day. Do not publish them. Just write them. Do this again tomorrow.",
  },

  spark: {
    isDemo: true,
    directions: [
      {
        territory: "The Inheritance",
        oneSentence:
          "Superannuation is not your money. It is your future self's money. And your future self is trying to reach you.",
        startHere:
          "A campaign told from the perspective of your 68-year-old self writing back. Not sentimental. Urgent. Specific. With details only you would know.",
        whyItHasntBeenDone:
          "Financial services brands are terrified of admitting the future self exists. It makes the negligence feel personal.",
        warning:
          "This concept dies if the execution gets sentimental. It works only if it stays slightly uncomfortable.",
      },
      {
        territory: "The Game They Did Not Explain",
        oneSentence:
          "Every other generation was taught the rules. You were handed a controller with no manual.",
        startHere:
          "Lean into the information gap as a creative mechanic. Not patronising explainers, but the actual anger of discovering something important that nobody told you. Use that energy.",
        whyItHasntBeenDone:
          "Brands are afraid to acknowledge that the system failed young people. This one leans into it.",
        warning:
          "Do not let this become a lecture. The tone is conspiratorial, not educational. You are on their side, not correcting them.",
      },
      {
        territory: "The Compound Effect, Visualised",
        oneSentence: "Show the actual maths. Most people have never seen it. It is genuinely surprising.",
        startHere:
          "A simple, single-screen experience where you enter your age and current super balance and watch the number grow in real time. No explanation needed. The number does the work.",
        whyItHasntBeenDone:
          "Calculators are everywhere. None of them are built to be emotionally affecting. They are built to be accurate. These are different goals.",
        warning:
          "The numbers only land if the interface is beautiful. A bad calculator proves the opposite point.",
      },
    ],
  },
};
