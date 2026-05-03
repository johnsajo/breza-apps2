export const DEMO_RESPONSES: Record<string, object[]> = {
  critique: [
    {
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
    {
      isDemo: true,
      gutReaction:
        "The headline is doing the work of three things and succeeding at none of them. There is a genuine idea buried here — I can sense it — but it is surrounded by so much scaffolding that it cannot breathe.",
      whatIsWorking: [
        "The opening sentence earns attention. It creates a small tension that the reader wants resolved.",
        "The subheading is doing its job. It is specific where the headline is vague, which is the right relationship.",
        "The social proof section is well-placed and credible. The specific numbers help.",
      ],
      whatIsNotWorking: [
        "The hero copy is trying to be a tagline, a value proposition, and a call to action simultaneously. Pick one job and do it properly.",
        "The CTA is weak. 'Get started' says nothing about what happens next. What does the user actually get?",
        "The third paragraph reads like a legal disclaimer trying to disguise itself as a benefit. It is undoing the trust the second paragraph built.",
      ],
      theBigProblem:
        "This page is written by someone who knows the product very well. That is its undoing. The reader does not share that knowledge, and the copy assumes they do. Every sentence needs to be rewritten for someone who has never heard of you.",
      specificFixes: [
        "Rewrite the hero headline as one specific promise. Under twelve words.",
        "Replace 'Get started' with the actual outcome. 'See your first result in under two minutes' is better.",
        "Cut the third paragraph entirely. Test the page without it first. If conversions improve, it was always the problem.",
        "Add a single sentence under the CTA button that removes the main objection. What is the one thing stopping someone from clicking?",
      ],
      theOneThing:
        "Read the page aloud to someone who does not know your product. Every time they look confused, you have found your next rewrite.",
    },
    {
      isDemo: true,
      gutReaction:
        "This poster is confident in its awkwardness, which is interesting. It is refusing to behave, which creates energy. But there is a difference between rule-breaking and rule-ignoring, and right now this is hovering uncomfortably between them.",
      whatIsWorking: [
        "The type hierarchy is doing something unexpected and it is mostly earning it. The eye lands in the right place eventually.",
        "The negative space in the bottom third is bold. Most event posters fill every square centimetre. This one does not.",
        "The date treatment is clean and easy to find, which is the most important job of any event poster.",
      ],
      whatIsNotWorking: [
        "The main image and the headline are fighting each other. They are both trying to be the first thing you look at.",
        "The colour palette has four distinct values where two would work harder. Something needs to be cut.",
        "At A3 size this works. Reduced to Instagram square it will fall apart. The design has not been tested at the right output sizes.",
      ],
      theBigProblem:
        "The concept is there but the execution lacks hierarchy. A good poster tells you one thing at a time. This one tells you several things at once and hopes you follow. The reader will not do that work for you.",
      specificFixes: [
        "Choose one dominant element — image or headline — and let the other support it. They cannot be equal.",
        "Reduce the palette to two colours plus black. Every additional colour needs a specific job.",
        "Test at 80x80px. If the name of the event is still readable, the poster works. If not, the headline treatment needs rethinking.",
        "Add 15mm of breathing room around every edge. The current bleed is doing nothing for it.",
      ],
      theOneThing:
        "Decide whether this is a typographic poster or an image-led poster. It is currently trying to be both, which means it is fully committing to neither.",
    },
  ],

  brief: [
    {
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
    {
      isDemo: true,
      whatTheySaid:
        "We feel like our brand has outgrown itself. We started as a startup and now we're a proper company. I think we need a rebrand but I'm not sure what that means exactly. We want to look more grown-up without losing what made us us.",
      whatTheyActuallyWant:
        "Permission to evolve without losing identity equity. Grown-up means they want to attract enterprise clients and justify higher prices. What made us us is code for: do not touch the culture. They are afraid of losing existing customers while chasing new ones.",
      whatTheyDidntSayButExpect: [
        "A clear rationale they can present to the board. They need someone else to make the case for the investment.",
        "Staged implementation. They cannot afford to change everything at once.",
        "Involvement in the process. They will want to co-author the brand story, not just receive it.",
        "Something their team will actually use. Brand guidelines that get ignored are worthless.",
      ],
      lazyExecutionsToAvoid: [
        "A wordmark update presented as a rebrand. That is a logo refresh, not a strategic brand decision.",
        "Trend-driven design choices. Whatever looks current in 2024 will look dated by the time they implement it.",
        "A brand document that lives in a PDF. Build a system the team can actually operate.",
        "Interviewing only the founders. Talk to the newest employees and the longest-serving clients.",
      ],
      theLine:
        "This is a confidence brief, not a design brief. They know who they are. They need permission to say it louder.",
    },
    {
      isDemo: true,
      whatTheySaid:
        "We want to do something for TikTok. Something that feels authentic, not like an ad. Can you make us go viral? Our audience is 18-25 and we sell activewear.",
      whatTheyActuallyWant:
        "Reach and brand awareness among a demographic they cannot currently access through their existing channels. Authentic is code for cheap and human. Viral is not a brief, it is an outcome — they do not understand yet that they are asking you to create luck.",
      whatTheyDidntSayButExpect: [
        "Multiple options, not one video. If the first does not land, they will want backups immediately.",
        "Talent they do not have to find themselves. They want you to own the end-to-end.",
        "A content calendar disguised as a strategy. They will want this to become a retainer.",
        "Metrics. They will ask what success looks like before and after. Have a number ready.",
      ],
      lazyExecutionsToAvoid: [
        "A polished produced video. TikTok punishes over-production. The algorithm rewards native-feeling content.",
        "Trying to recreate someone else's viral moment. By the time you copy the trend it is already over.",
        "Influencer casting based on follower count alone. Engagement rate and audience trust matter more.",
        "A one-size-fits-all script. The best TikTok content is designed for a specific moment in a specific person's day.",
      ],
      theLine:
        "Stop trying to make an ad that does not look like an ad. Make something a person would actually want to watch, then put the brand in it honestly.",
    },
  ],

  bridge: [
    {
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
    {
      isDemo: true,
      thingOne: "the ocean tide",
      thingTwo: "a spreadsheet",
      connections: [
        {
          angle: "Hidden Order",
          metaphor:
            "The tide looks chaotic from the shore but is entirely predictable from space. A spreadsheet looks like control but hides the mess behind the formula. Both are systems that only reveal their logic to the people patient enough to learn it.",
          theLine: "Everything is a pattern once you step far enough back.",
          startHere:
            "A data or analytics brand. The visual tension between chaos-that-is-order and order-that-is-chaos. The selling point is not the tool — it is what you see when you finally understand the rhythm.",
        },
        {
          angle: "The Endless Return",
          metaphor:
            "Tides come back. Rows accumulate. Neither is finished — they just continue. There is something quietly relentless about both. The tide does not care if you have checked it today. The spreadsheet does not care if you have not opened it in a month.",
          theLine: "It does not wait for you.",
          startHere:
            "A productivity or financial tracking tool that builds on the theme of systems that keep running whether you engage or not. Slightly urgent, slightly beautiful.",
        },
        {
          angle: "Depth You Cannot See From the Surface",
          metaphor:
            "You look at the tide and see water. You look at a spreadsheet and see numbers. What you are not seeing is the pressure system over the Pacific or the seventeen dependencies locked inside cell C14. Both are instruments that reward the person willing to go beneath.",
          theLine: "What is obvious is never the whole thing.",
          startHere:
            "Consultancy or research brand. The work is to see what others miss. The craft is not the output — it is the willingness to go deeper than anyone asked.",
        },
      ],
    },
    {
      isDemo: true,
      thingOne: "a hospital waiting room",
      thingTwo: "jazz improvisation",
      connections: [
        {
          angle: "Holding the Unresolved",
          metaphor:
            "In both spaces, you do not know how it ends. The waiting room suspends time. The improvisation suspends resolution. Both require you to be present inside an unfinished thing. Most people are not trained to do that. The ones who are do something remarkable with the discomfort.",
          theLine: "Not every silence needs to be filled.",
          startHere:
            "A mindfulness or mental health platform. The design language of quiet unresolution. Something that does not rush toward an answer because the waiting is also part of the work.",
        },
        {
          angle: "The Expert Reading the Room",
          metaphor:
            "A good jazz musician reads the band and adjusts in real time. A good triage nurse reads the room and adjusts in real time. Both are operating at the edge of their training, using instinct sharpened by repetition. The skill is not the technique — it is knowing when to break from it.",
          theLine: "Expertise is knowing which rule to break.",
          startHere:
            "Healthcare or professional services brand that wants to push back against protocol-as-performance. The real craft is always judgment, not compliance.",
        },
        {
          angle: "Strangers Held Together by Circumstance",
          metaphor:
            "Waiting rooms collect people who would never otherwise share a space. Jazz audiences are the same — strangers unified for one hour by something invisible. Both are temporary communities built around a shared uncertainty.",
          theLine: "We are here together, briefly, for no planned reason.",
          startHere:
            "Community or civic brand. The beauty of accidental congregation. What happens when you are forced to share space with someone you did not choose.",
        },
      ],
    },
  ],

  translate: [
    {
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
    {
      isDemo: true,
      whatTheySaid: "It needs to pop more.",
      whatTheyProbablyMean:
        "The design is not generating an emotional reaction fast enough. They want stronger contrast, a bigger colour moment, or a more commanding layout. Pop is almost always a request for contrast — visual, tonal, or both.",
      whatTheyAreActuallyAfraidOf:
        "Being ignored. In a crowded feed, shelf, or inbox, invisible is the only failure state that matters. They are not critiquing the craft — they are expressing fear of irrelevance.",
      diagnosticQuestions: [
        "Where will this be seen first — physical or digital? The answer changes what pop means.",
        "What is sitting next to this in the real environment? What does it need to stand out from specifically?",
        "Is the problem the design not popping, or the content not being interesting enough to earn attention?",
        "Show me something in a completely different category that you feel pops. What is it doing?",
      ],
      executionDirections: [
        "Identify the single element that should command attention first. Give it more size, contrast, or space than feels comfortable.",
        "Test the piece at thumbnail size. If it does not read at 100px wide, the pop is not structural — it is decorative.",
        "Introduce one unexpected element: an unusual crop, a colour that should not work, a type size that feels too big. Then justify its presence.",
        "Check the value structure. Pop almost always lives in light-against-dark or saturated-against-neutral contrast.",
      ],
    },
    {
      isDemo: true,
      whatTheySaid: "Can we make it feel a bit more modern?",
      whatTheyProbablyMean:
        "The design feels dated, safe, or generic in a way that positions the brand behind its competitors. Modern is rarely about trend — it usually means cleaner, more confident, and less apologetic. They want the work to feel like it knows where it is.",
      whatTheyAreActuallyAfraidOf:
        "Looking like the old version of an industry that has moved on. There is often a specific competitor in their head — a brand that got a refresh and suddenly looked like the future. They want that, without admitting they are chasing it.",
      diagnosticQuestions: [
        "Which recent brand refresh or launch made you think we were behind? Be honest.",
        "Is modern a visual thing, or is it also in the language and tone?",
        "Are we modernising for new customers or for existing ones who are drifting?",
        "What from the current version do you want to keep? That answer will tell me what modern means for this brand specifically.",
      ],
      executionDirections: [
        "Audit the typeface first. Dated typography is the fastest way to look like the last decade. One contemporary font family resolves most modernising problems.",
        "Flatten the visual hierarchy. Modern layouts use fewer levels of emphasis. If everything is important, nothing is.",
        "Remove decorative elements that are not doing structural work. Gradients, shadows, outlines used as ornamentation — all of these are dating the work.",
        "Let the photography or illustration do more work. Modern brands often use a strong visual system so the layout can be quieter.",
      ],
    },
  ],

  jury: [
    {
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
    {
      isDemo: true,
      concept:
        "Mobile app onboarding screen with the headline: You already know what you spend. You just don't want to see it.",
      jurors: [
        {
          role: "Senior Creative Director",
          reaction:
            "This is uncomfortable in the right way. It is calling out the user's avoidance behaviour in the first five seconds of the relationship. That is a high-risk move. It will either create immediate trust or immediate rejection. The craft is in making sure it reads as empathetic rather than accusatory.",
          whyItMightFail:
            "If the visual tone is cold or clinical, the line will feel like an attack. The design has to be warm enough to absorb the provocation.",
          whyItMightLand:
            "Most fintech onboarding pretends money is exciting. This one is honest about what it actually is. That honesty is the product differentiator, not a headline.",
        },
        {
          role: "The Actual Target Audience",
          reaction:
            "Honestly, yes. I do not open my banking app for exactly this reason. If the app follows through on that tone, I would actually use it.",
          whyItMightFail:
            "The moment it becomes nagging or moralising, I delete it. The app earns the right to say this exactly once. After that, it better just help.",
          whyItMightLand:
            "It is the first time a money app has spoken to me like an adult about the actual problem instead of pretending I am one smart decision away from being a millionaire.",
        },
        {
          role: "Compliance and Legal",
          reaction:
            "The passive-aggressive framing concerns me slightly. We need to check this against our tone-of-voice policy and make sure we are not inadvertently creating a negative brand association at the most critical drop-off point.",
          whyItMightFail:
            "If a regulator or consumer advocacy group picks this up as an example of shaming language, we have a PR problem.",
          whyItMightLand:
            "If we can defend it as empathetic realism — and the user testing backs it up — this is the kind of onboarding that gets written about.",
        },
      ],
      overallVerdict:
        "This concept earns its discomfort. The risk is in the execution and the follow-through — the rest of the app has to be as honest as this headline or the trust built in the first screen is immediately destroyed. Do not use this as a headline and then pivot to generic fintech copy.",
    },
    {
      isDemo: true,
      concept:
        "Print campaign for an aged care facility. The line: The hardest conversation you've ever had. We've had it too.",
      jurors: [
        {
          role: "Senior Creative Director",
          reaction:
            "This is doing something rare in this category — it is acknowledging the emotional reality of the decision instead of papering over it with lifestyle photography and gentle serif fonts. The line earns genuine empathy. My concern is whether the brand can deliver on the intimacy it is promising.",
          whyItMightFail:
            "If the facility itself does not back this up with a genuinely compassionate intake process, the campaign creates expectations that destroy trust.",
          whyItMightLand:
            "It is the first piece of communication that says we understand. In a category where everyone is competing on amenities and activities, leading with emotional intelligence is a genuine differentiator.",
        },
        {
          role: "The Actual Target Audience",
          reaction:
            "My family had this conversation last year and I do not think any of us were prepared for how difficult it was. If a facility led with this, I would stop and read everything. That is not a small thing.",
          whyItMightFail:
            "If the photography or layout does not match the gravity of the line, it will feel like exploitation. The visual execution has to earn the emotional weight of the copy.",
          whyItMightLand:
            "It is the only ad in this category that has ever felt like it was written by someone who has actually been in the room.",
        },
        {
          role: "Brand Strategist",
          reaction:
            "Strong. Distinctive. But I want to stress-test the word hardest. For some audiences that will feel like permission — finally, someone said it. For others it may feel presumptuous. The line assumes a universality of experience that may not hold across all demographics.",
          whyItMightFail:
            "If the line triggers guilt rather than relief, it becomes a barrier rather than an invitation.",
          whyItMightLand:
            "The category is full of denial. This is the only brand positioning itself on the side of reality. That is a long-term equity play, not just a campaign.",
        },
      ],
      overallVerdict:
        "This is brave work for a category that almost never takes risks. The headline is strong enough to carry the campaign if the execution backs it up with equal honesty. Do not soften it in production. The instinct to add warmth through visuals is correct — but do not add warmth through copy.",
    },
  ],

  colour: [
    {
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
    {
      isDemo: true,
      palettes: [
        {
          name: "Midnight Precision",
          rationale:
            "Built for a fintech that earns trust through clarity. Dark and structured, it communicates competence without coldness. The electric blue accent is used sparingly to signal action.",
          colours: [
            { role: "primary", hex: "#0A0F1E", name: "Depth", usage: "Navigation, headers, anchoring elements" },
            { role: "secondary", hex: "#1C2540", name: "Ink", usage: "Cards, secondary UI surfaces" },
            { role: "accent", hex: "#3D8BFF", name: "Electric", usage: "CTAs, links, interactive states" },
            { role: "background", hex: "#F4F6FA", name: "Ice", usage: "Main light-mode background" },
            { role: "surface", hex: "#EAEEF6", name: "Frost", usage: "Panels, input backgrounds, dividers" },
            { role: "text", hex: "#0A0F1E", name: "Depth", usage: "All body copy" },
          ],
          pairingLogic:
            "High contrast split: deep navy for structure, near-white for space, single electric accent for every action moment. Keeps the eye moving with minimal visual noise.",
          bestFor: "App UI, dashboard, onboarding flow",
          avoidUsing: "Do not introduce warm colours. This palette only works as a cold, precise system.",
          emotionalSignal: "Controlled, intelligent, modern, trustworthy",
        },
        {
          name: "Open Transaction",
          rationale:
            "For the fintech that wants to feel more human than the banks but still serious. Warm without being casual. Structured without being corporate.",
          colours: [
            { role: "primary", hex: "#1A2E1A", name: "Forest Ink", usage: "Key headings, core navigation" },
            { role: "secondary", hex: "#4A6741", name: "Hedge", usage: "Supporting text, secondary actions" },
            { role: "accent", hex: "#8ACF6E", name: "Yield", usage: "Success states, progress indicators, CTAs" },
            { role: "background", hex: "#FAFEF7", name: "Celery White", usage: "Main background" },
            { role: "surface", hex: "#EFF7EA", name: "Spring", usage: "Cards, table rows, input fields" },
            { role: "text", hex: "#0E1A0E", name: "Deep Forest", usage: "All body copy" },
          ],
          pairingLogic:
            "Green as the financial colour of growth rather than money. Warm and natural rather than clinical. The accent carries the optimistic energy of the brand.",
          bestFor: "Marketing website, investor materials, consumer app",
          avoidUsing: "Keep red for error states only. Any decorative use of red will trigger loss-aversion associations.",
          emotionalSignal: "Optimistic, honest, growth-oriented, approachable",
        },
        {
          name: "Signal Clear",
          rationale:
            "Strictly functional. This is for the fintech product that wants to disappear into the transaction — where the brand never gets in the way of the job.",
          colours: [
            { role: "primary", hex: "#111111", name: "Near Black", usage: "All primary type and structure" },
            { role: "secondary", hex: "#555555", name: "Mid Grey", usage: "Secondary type, inactive elements" },
            { role: "accent", hex: "#FF6B2B", name: "Signal", usage: "Single action colour — one CTA per screen maximum" },
            { role: "background", hex: "#FFFFFF", name: "White", usage: "All surfaces" },
            { role: "surface", hex: "#F5F5F5", name: "Off White", usage: "Cards, dividers, table rows" },
            { role: "text", hex: "#111111", name: "Near Black", usage: "All body copy" },
          ],
          pairingLogic:
            "Maximum restraint. The orange accent has one job only: tell the user what to do next. Anything that dilutes that function should be removed.",
          bestFor: "Transaction confirmation flows, receipt design, minimal app UI",
          avoidUsing: "Do not use the accent colour for decoration. Once it loses its singular job, the entire system loses its clarity.",
          emotionalSignal: "Efficient, clear, frictionless, decisive",
        },
      ],
    },
    {
      isDemo: true,
      palettes: [
        {
          name: "The Reading Room",
          rationale:
            "For a bookshop café that wants to feel like somewhere you stay for two hours by accident. Warm light, old paper, good coffee. Nothing is trying too hard.",
          colours: [
            { role: "primary", hex: "#2C1810", name: "Dark Roast", usage: "Headings, signage, strong anchors" },
            { role: "secondary", hex: "#6B3D2E", name: "Worn Leather", usage: "Secondary text, decorative elements" },
            { role: "accent", hex: "#D4A853", name: "Amber", usage: "Highlights, price tags, featured items" },
            { role: "background", hex: "#F9F4EC", name: "Old Paper", usage: "Menus, website background, packaging" },
            { role: "surface", hex: "#EDE4D3", name: "Warm Parchment", usage: "Cards, interior surfaces, secondary backgrounds" },
            { role: "text", hex: "#1A0F08", name: "Ink", usage: "All body copy" },
          ],
          pairingLogic:
            "Monochromatic warm browns with a single gold accent. Every colour is the colour of something you want to spend time near.",
          bestFor: "In-store signage, menus, café packaging, social media templates",
          avoidUsing: "No cool tones. No white. The warmth of the palette is the entire point.",
          emotionalSignal: "Slow, considered, literary, unpretentious",
        },
        {
          name: "New Shelf",
          rationale:
            "For the bookshop that curates fearlessly and stocks things you have not heard of. Independent, direct, confident. This palette says the shop has opinions.",
          colours: [
            { role: "primary", hex: "#0D1117", name: "Printer Black", usage: "Dominant text and structure" },
            { role: "secondary", hex: "#2A2A3A", name: "Slate Night", usage: "Secondary structure, navigation" },
            { role: "accent", hex: "#E8334A", name: "First Edition", usage: "Featured titles, promotions, call-outs" },
            { role: "background", hex: "#F8F8F6", name: "Uncoated", usage: "Main background — as close to uncoated stock as screens allow" },
            { role: "surface", hex: "#EDEDE8", name: "Grey Stock", usage: "Cards, table rows, secondary surfaces" },
            { role: "text", hex: "#0D1117", name: "Printer Black", usage: "All body copy" },
          ],
          pairingLogic:
            "Near-monochrome with a single strong red to signal editorial conviction. The palette belongs on a masthead or a magazine cover as much as a café wall.",
          bestFor: "Website, event posters, staff picks displays",
          avoidUsing: "Do not dilute the red with warm tones. It works as a single decisive signal, not as part of a warm palette.",
          emotionalSignal: "Opinionated, editorial, independent, confident",
        },
        {
          name: "Between Pages",
          rationale:
            "For the bookshop that serves equally as a community space. Soft enough to welcome, structured enough to be taken seriously. Neither purely café nor purely bookshop.",
          colours: [
            { role: "primary", hex: "#2E3A4E", name: "Dusk Blue", usage: "Core text, primary navigation" },
            { role: "secondary", hex: "#5C7A8A", name: "Rain", usage: "Supporting text, subdued UI elements" },
            { role: "accent", hex: "#C4854A", name: "Terracotta", usage: "Warm accent for warmth and approachability — events, CTAs" },
            { role: "background", hex: "#F7F5F0", name: "Bone", usage: "Main background" },
            { role: "surface", hex: "#ECE8DF", name: "Warm Linen", usage: "Cards, menus, secondary surfaces" },
            { role: "text", hex: "#1C2530", name: "Deep Slate", usage: "All body copy" },
          ],
          pairingLogic:
            "Cool structured anchor with a warm terracotta accent. The combination signals that this is a place for thinking and for people simultaneously.",
          bestFor: "Brand identity system, website, event promotion",
          avoidUsing: "Do not increase the saturation of either family. The restraint is the character.",
          emotionalSignal: "Welcoming, thoughtful, communal, unhurried",
        },
      ],
    },
  ],

  wordmark: [
    {
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
    {
      isDemo: true,
      concepts: [
        {
          conceptName: "The Brief",
          font: "Libre Baskerville",
          weight: "700",
          letterSpacing: "0.04em",
          caseStyle: "uppercase",
          textColour: "#0D1B2A",
          backgroundColour: "#FAFAF8",
          reasoning:
            "A bold legal serif in uppercase suggests authority and permanence. Libre Baskerville carries the weight of formal documentation without the stuffiness of older legal typefaces. Tracked out, it reads well at all sizes.",
          personality: "Authoritative, trustworthy, precise",
        },
        {
          conceptName: "The Partnership",
          font: "Playfair Display",
          weight: "400",
          letterSpacing: "-0.02em",
          caseStyle: "titlecase",
          textColour: "#1C2B39",
          backgroundColour: "#F5EFE6",
          reasoning:
            "Playfair Display in regular weight with tight tracking reads as refined and personal. Law firms often over-rely on heavy type to signal authority — this one signals judgment instead. The warm ground softens without undermining.",
          personality: "Considered, distinguished, approachable for the category",
        },
        {
          conceptName: "The Signature",
          font: "EB Garamond",
          weight: "500",
          letterSpacing: "0.06em",
          caseStyle: "titlecase",
          textColour: "#2C1A0E",
          backgroundColour: "#FAF6EF",
          reasoning:
            "EB Garamond tracked out reads as old money and absolute confidence. There is no decoration because none is needed. The amp in the name does the visual work of the relationship without needing to be made obvious.",
          personality: "Established, restrained, generational",
        },
      ],
    },
    {
      isDemo: true,
      concepts: [
        {
          conceptName: "The Keg Room",
          font: "Space Grotesk",
          weight: "700",
          letterSpacing: "-0.02em",
          caseStyle: "lowercase",
          textColour: "#F2EAD0",
          backgroundColour: "#1A2B1E",
          reasoning:
            "Bold, condensed-feeling grotesque in dark bottle green. This reads as a label before it reads as a logo, which is exactly what a craft brewery wordmark should do. Lowercase keeps it from being taken too seriously.",
          personality: "Confident, unpretentious, would look right on a tap handle",
        },
        {
          conceptName: "The Tide Chart",
          font: "Josefin Sans",
          weight: "300",
          letterSpacing: "0.18em",
          caseStyle: "uppercase",
          textColour: "#2C4A5A",
          backgroundColour: "#EAF2F5",
          reasoning:
            "Thin, widely tracked sans in coastal blue-grey. Reads as a nautical chart or a maritime instrument. The negative space between letters creates the sense of open water without any illustration needed.",
          personality: "Considered, coastal, unhurried",
        },
        {
          conceptName: "The Last Round",
          font: "Fraunces",
          weight: "700",
          letterSpacing: "0.01em",
          caseStyle: "titlecase",
          textColour: "#F5A623",
          backgroundColour: "#1A1208",
          reasoning:
            "A variable optical-size serif in deep amber on near-black. Warm, late-evening energy. The kind of wordmark you see on a chalkboard above the tap list at 9pm. It earns the light without asking for it.",
          personality: "Warm, honest, last-light-of-the-day quality",
        },
      ],
    },
  ],

  library: [
    {
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
    {
      isDemo: true,
      discipline: "Brand Strategy",
      level: "Getting serious",
      books: [
        {
          title: "Building a StoryBrand",
          author: "Donald Miller",
          whyItMatters:
            "The clearest framework for making a brand message that actually communicates. Overused in some circles, which means most people have heard of it but fewer have actually applied it rigorously.",
          free: false,
        },
        {
          title: "Positioning: The Battle for Your Mind",
          author: "Al Ries and Jack Trout",
          whyItMatters:
            "The original text on owning a category. Older than most strategists' careers but still the foundational argument for why being first in the mind matters more than being first in the market.",
          free: false,
        },
        {
          title: "Obviously Awesome",
          author: "April Dunford",
          whyItMatters:
            "The best modern book on product positioning. Essential for anyone doing strategy for tech or B2B clients who need to articulate competitive context.",
          free: false,
        },
        {
          title: "The Brand Gap",
          author: "Marty Neumeier",
          whyItMatters:
            "Short, visual, and argues persuasively for the connection between brand strategy and design. Good for presenting the value of strategy to clients who only want to see visuals.",
          free: false,
        },
      ],
      youtubeChannels: [
        {
          name: "Simon Sinek",
          whyItMatters:
            "The Start With Why talk is essential viewing for any strategist. Beyond that, his thinking on trust and leadership is directly applicable to brand work.",
        },
        {
          name: "Dave Gerhardt (DGMG)",
          whyItMatters:
            "Practical B2B brand and marketing thinking from someone who has done the work at scale. Good counterweight to more theoretical strategy content.",
        },
      ],
      websites: [
        {
          name: "Brand New (Under Consideration)",
          url: "https://underconsideration.com/brandnew",
          whyItMatters:
            "The industry's closest thing to a real-time case study on brand positioning decisions. Reading the comment sections is as valuable as the articles.",
        },
        {
          name: "Strategy+Business",
          url: "https://strategy-business.com",
          whyItMatters:
            "High-quality strategic thinking from practitioners. Stronger on business context than most brand-specific resources.",
        },
        {
          name: "Distinctive Assets",
          url: "https://distinctiveassets.com.au",
          whyItMatters:
            "The applied research home of the Ehrenberg-Bass model. If you work with FMCG or consumer brands, this is required reading.",
        },
      ],
      freeCourses: [
        { name: "Brand Management: Aligning Business, Brand, and Behaviour", platform: "University of London / Coursera" },
        { name: "Marketing Analytics", platform: "University of Virginia / Coursera" },
        { name: "Digital Branding and Engagement", platform: "Curtin University / edX" },
      ],
      weekOnePlan:
        "Read Obviously Awesome in one sitting. Then write a one-page positioning document for a brand you use every day as if you were the strategist who created it. Do not look anything up. See how close your instincts are to the actual positioning. The gap between the two will tell you exactly what to work on.",
    },
    {
      isDemo: true,
      discipline: "Art Direction",
      level: "Ready to go deeper",
      books: [
        {
          title: "Making and Breaking the Grid",
          author: "Timothy Samara",
          whyItMatters:
            "The only book that teaches grid systems and then teaches you how to break them intelligently. Essential for anyone who wants to move beyond safe layouts.",
          free: false,
        },
        {
          title: "Thinking with Type",
          author: "Ellen Lupton",
          whyItMatters:
            "The definitive typographic reference for working art directors. Dense, practical, visually rigorous. Every page teaches something you will use this week.",
          free: false,
        },
        {
          title: "The Art Direction Handbook for Film",
          author: "Michael Rizzo",
          whyItMatters:
            "Not about advertising, which is exactly why it belongs in this list. Understanding how environments and visual storytelling work in film will change how you compose frames and direct photography.",
          free: false,
        },
        {
          title: "Interaction of Color",
          author: "Josef Albers",
          whyItMatters:
            "The most important book on colour perception ever written. At this stage of your practice, you should be working through the exercises, not just reading the text.",
          free: false,
        },
      ],
      youtubeChannels: [
        {
          name: "The Futur",
          whyItMatters:
            "Debates and frameworks on creative direction, client relationships, and building a practice. Chris Do and his guests talk about the work at a level most design channels avoid.",
        },
        {
          name: "Satori Graphics",
          whyItMatters:
            "High-quality visual breakdowns of design principles. Less theoretical than most, more useful for practical craft development.",
        },
      ],
      websites: [
        {
          name: "It's Nice That",
          url: "https://itsnicethat.com",
          whyItMatters:
            "The best daily digest of what is happening in visual culture. Use it to build visual intelligence, not inspiration folders.",
        },
        {
          name: "Fonts In Use",
          url: "https://fontsinuse.com",
          whyItMatters:
            "The most rigorous typography reference on the internet. Every entry documents typeface, usage context, and year. Essential for building typographic vocabulary.",
        },
        {
          name: "Walker Art Center Design",
          url: "https://walkerart.org/design",
          whyItMatters:
            "Institutional design at the highest level of ambition. The Walker approaches every project as a research problem first. Study the case studies carefully.",
        },
      ],
      freeCourses: [
        { name: "Graphic Design Specialization", platform: "CalArts / Coursera" },
        { name: "Introduction to Typography", platform: "California Institute of the Arts / Coursera" },
        { name: "Photo Editing with Photoshop", platform: "Adobe" },
      ],
      weekOnePlan:
        "Pick one ad or editorial spread that you consider close to perfect. Spend one hour deconstructing it: grid structure, typographic hierarchy, colour rationale, compositional decisions. Write two pages on what the art director chose and why. Then redesign it with one element changed. See what breaks when you move one piece.",
    },
  ],

  spark: [
    {
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
    {
      isDemo: true,
      directions: [
        {
          territory: "The Last Kilometre",
          oneSentence:
            "Nobody remembers the run. They remember the moment they did not stop.",
          startHere:
            "A campaign built entirely from the last 10% of the effort — the kilometre you considered not running, the rep you almost skipped. The product lives in that moment, not in the achievement at the end.",
          whyItHasntBeenDone:
            "Running shoe brands almost always celebrate the finish. The real insight is that the shoe matters most when you want to stop.",
          warning:
            "Do not make this about pain or suffering. That is the wrong emotional register. The tone is quiet defiance, not athletic extremity.",
        },
        {
          territory: "The Stranger Who Chose You",
          oneSentence:
            "Somewhere, someone who has never met you is running in the same shoe. That means something.",
          startHere:
            "A community-based campaign built around the shared decision. Not runners as a tribe with gear and rituals — runners as individuals who all, independently, made the same quiet choice. The connection is the decision, not the aesthetic.",
          whyItHasntBeenDone:
            "Community campaigns in running always look like a running club. This one is more like voting — the power of many private decisions pointing the same direction.",
          warning:
            "This lives or dies on the quality of the individuals you find. Diversity is essential, but not performed diversity. Real people with specific reasons.",
        },
        {
          territory: "The Wrong Shoes Moment",
          oneSentence:
            "Everyone has worn the wrong shoe for too long. That is how you know what the right one feels like.",
          startHere:
            "Testimonial campaign structured around the before — not the after. The focus is the realisation moment, not the product benefit. The product is only mentioned in the context of having been missing.",
          whyItHasntBeenDone:
            "Brands are afraid to remind customers that they were not always there. This one makes that the whole point.",
          warning:
            "The comparison must never feel like a attack on competitors. The previous shoe was fine — it was just not this one.",
        },
      ],
    },
    {
      isDemo: true,
      directions: [
        {
          territory: "The Admission",
          oneSentence:
            "We stopped building places to be together, then wondered why everyone was alone.",
          startHere:
            "A public health campaign that starts with structural honesty before offering a personal action. Not telling people to call a friend — acknowledging that the system reduced the number of places where friends are made.",
          whyItHasntBeenDone:
            "Government health campaigns are afraid of structural critique. It implies liability. This one requires a brave client.",
          warning:
            "Do not end with a phone number. End with a door. The response mechanism has to match the problem.",
        },
        {
          territory: "The Eleven O'Clock Feeling",
          oneSentence:
            "It hits at the same time every night. You know the one.",
          startHere:
            "A campaign built around the specific timing of loneliness — not the big moments, but the small predictable ones. The moment when you notice the house is quiet. The specific texture of a specific kind of alone.",
          whyItHasntBeenDone:
            "Loneliness campaigns either catastrophise the condition or reduce it to a helpline. Neither acknowledges the everyday texture of it.",
          warning:
            "This concept only works with precise, specific language. Generalising the insight will destroy it. Every execution needs a detail that makes someone say: yes, exactly that.",
        },
        {
          territory: "The Spare Seat",
          oneSentence:
            "Every city has a table with a spare seat. This campaign finds them.",
          startHere:
            "A physical and digital campaign that maps and activates existing community moments — the pub quiz with room for one more, the running group that does not quite fill the pavement. Not creating new things. Finding the ones already there.",
          whyItHasntBeenDone:
            "Most loneliness interventions create new structures. This one uses existing ones, which is harder to brief but cheaper to execute and more likely to persist.",
          warning:
            "The word community will kill this. Avoid it completely. The language should be specific: the quiz, the table, the lane. Never the community.",
        },
      ],
    },
  ],

  tone: [
    {
      isDemo: true,
      voiceArchetype: {
        name: "The Trusted Insider",
        description: "This is the friend who actually knows about sustainable living and is not precious about it. They share what works, admit what does not, and never make you feel bad for not doing more. The tone earns trust by being specific, never by being earnest.",
      },
      manifesto: "Say the true thing plainly, and trust the reader to be an adult.",
      characterTraits: ["Specific over general", "Confident without swagger", "Warm but not gushing", "Honest about trade-offs"],
      wordsToUse: ["built", "honest", "made", "real", "worth it", "consider", "actually", "lasts"],
      wordsToAvoid: ["sustainable", "eco-friendly", "journey", "curated", "elevate", "mindful"],
      doList: [
        "Lead with the practical benefit before the values pitch.",
        "Use the second person 'you' — write to one specific person, not a crowd.",
        "Give a specific detail where a vague claim would be tempting.",
        "Let a product do its own talking. Describe what it is before telling them what to feel about it.",
      ],
      dontList: [
        "Do not open with a values statement. Let the product open, then the values follow.",
        "Do not use sustainability language — it reads as marketing, not belief.",
        "Do not end sentences with exclamation marks. Confidence does not need them.",
      ],
      rewrites: [
        {
          label: "Product description",
          before: "Our eco-friendly linen duvet cover is crafted with sustainability in mind, elevating your bedroom with mindful design.",
          after: "100% European linen. Gets softer every wash. Built to last a decade, not a season.",
        },
        {
          label: "Error message",
          before: "Something went wrong. Please try again.",
          after: "That did not go through. Give it another go — or email us if it keeps happening.",
        },
        {
          label: "Call to action",
          before: "Shop our sustainable collection today!",
          after: "See what's in stock",
        },
      ],
    },
    {
      isDemo: true,
      voiceArchetype: {
        name: "The Direct Scientist",
        description: "This brand knows more about the subject than anyone in the room and has chosen not to make you feel small about it. Precise language. No hype. The credibility comes from specificity, not from authority. The tone says: we have done the work, here is what we found.",
      },
      manifesto: "If you cannot say it specifically, you do not know it well enough yet.",
      characterTraits: ["Evidence-first", "No hedging", "Plain language for complex ideas", "Respectful of the reader's intelligence"],
      wordsToUse: ["evidence", "tested", "shown", "specifically", "in practice", "the research", "measurable", "because"],
      wordsToAvoid: ["supercharge", "transform", "breakthrough", "cutting-edge", "revolutionary", "clinically-proven", "scientifically-formulated"],
      doList: [
        "Name the specific ingredient and the specific effect. Not 'supports gut health' — 'Lactobacillus rhamnosus, shown to reduce bloating in 8 weeks'.",
        "Acknowledge what the product does not do as well as what it does. Honesty about limitations builds more trust than omitting them.",
        "Write error messages and customer service copy with the same care as marketing copy. The voice should be identical.",
        "Use numbers when you have them. Percentages, timeframes, and doses are more persuasive than adjectives.",
      ],
      dontList: [
        "Do not make claims the evidence does not support. The trust you build on specificity is destroyed the moment you overreach.",
        "Do not use passive voice to avoid accountability. 'Studies suggest' is weaker than 'A 2022 trial showed'.",
        "Do not bury the caveat. If something works for most people but not everyone, say it early.",
      ],
      rewrites: [
        {
          label: "Product benefit",
          before: "Our revolutionary probiotic blend supercharges your gut microbiome for total digestive wellness.",
          after: "Contains Lactobacillus rhamnosus GG, one of the most studied probiotic strains. In clinical trials, consistent daily use reduced bloating and irregularity in 71% of participants over eight weeks.",
        },
        {
          label: "Homepage headline",
          before: "Transform your health from the inside out.",
          after: "The gut drives more of your health than most people realise. Here is what the evidence says about changing it.",
        },
        {
          label: "Out of stock message",
          before: "Sorry, this product is currently unavailable.",
          after: "Out of stock. We manufacture in small batches to maintain quality — next run ships in approximately three weeks. Add your email and we will let you know.",
        },
      ],
    },
    {
      isDemo: true,
      voiceArchetype: {
        name: "The Thoughtful Colleague",
        description: "This is the B2B software brand that has decided to stop sounding like a B2B software brand. It speaks like a smart person writing a very clear email, not like a press release. It assumes competence in the reader, earns its clarity through precision, and never mistakes enthusiasm for persuasion.",
      },
      manifesto: "Respect the person reading. Write like they are busy and intelligent, because they are.",
      characterTraits: ["Clear over clever", "Useful over impressive", "Honest about complexity", "Direct without being blunt"],
      wordsToUse: ["works", "helps", "specifically", "in practice", "the point is", "to be direct", "honestly", "it means"],
      wordsToAvoid: ["synergy", "leverage", "empower", "disrupt", "innovative", "seamless", "robust", "scalable", "end-to-end"],
      doList: [
        "Write product descriptions that explain what the feature actually does, not what it enables you to do theoretically.",
        "In error messages, state the problem and the fix. Never just the problem.",
        "On pricing pages, say the number clearly and explain what changes at each tier. Do not make people work for the information.",
        "Use 'we' and 'you' consistently. Never 'our users' or 'clients'.",
      ],
      dontList: [
        "Do not start a sentence with 'Empower your team to...' — it has been written by every B2B company since 2010.",
        "Do not use the word 'journey' to describe using software. Using software is not a journey.",
        "Do not write landing page copy that assumes the reader will scroll. State the value proposition in the first two sentences.",
      ],
      rewrites: [
        {
          label: "Feature description",
          before: "Empower your team with seamless collaboration tools that drive synergistic outcomes across your entire organisation.",
          after: "Everyone on your team sees the same information, updated in real time. No version conflicts. No emailing files back and forth.",
        },
        {
          label: "Pricing page intro",
          before: "Choose the plan that's right for your organisation's unique journey.",
          after: "Three plans. The main difference is how many users you need and whether you want API access. If you are not sure, start with Growth.",
        },
        {
          label: "Onboarding email",
          before: "Welcome to the family! We're so excited to have you on board as you begin your transformative journey with us.",
          after: "You are in. It takes about ten minutes to set up your first project. Here is how to do that.",
        },
      ],
    },
  ],

  trophy: [
    {
      culturalContext: "The 1990s outdoor renaissance happened as post-Cold War optimism collided with rising brand literacy. Audiences were learning to decode advertising for the first time — they knew they were being sold to, and they respected brands that respected that knowledge. The political poster tradition of the 1970s had trained cities to read a single image with a single idea. That literacy made creative ambition possible.",
      landmarkPieces: [
        { name: "The Economist Poster Series", year: "1988", why: "Proved outdoor could treat its audience as participants rather than targets, turning the city into a game played back." },
        { name: "Nike 'Just Do It' Billboards", year: "1993", why: "Removed the product almost entirely and replaced it with a worldview, proving aspiration needs no demonstration at all." },
        { name: "Wonderbra 'Hello Boys'", year: "1994", why: "Demonstrated that a single image with a single line, placed correctly, generates more earned media than the entire media buy." },
      ],
      winningPattern: "The winners stopped explaining the product and started expressing a point of view. Every piece assumed the audience was more intelligent than they were being treated.",
      correctedBy: "The next era recognised that wit without warmth was cleverness performing as advertising. The 2000s reintroduced genuine feeling — not intelligence, but resonance.",
      whatToSteal: "The bet on intelligence. 1990s outdoor won by removing half the words they thought they needed. Take your current headline and cut it by two-thirds. If the idea collapses without the words, it was never an outdoor idea — it was a print ad pretending to be one.",
    },
    {
      culturalContext: "Digital advertising in the 2010s was shaped by smartphone ubiquity colliding with post-GFC scepticism. Audiences who had survived financial collapse were allergic to aspiration and responded to participation, honesty, and brands willing to admit their own absurdity. The platforms rewarded content that generated conversation over content that broadcast, which inverted the entire creative logic of the industry.",
      landmarkPieces: [
        { name: "Old Spice 'The Man Your Man Could Smell Like'", year: "2010", why: "Collapsed the wall between commercial and entertainment, then invited the internet to live inside the joke with real-time responses." },
        { name: "Always 'Like a Girl'", year: "2014", why: "Showed that purpose advertising could generate genuine emotion rather than borrow it wholesale from a charity model." },
        { name: "Dove 'Real Beauty'", year: "2004", why: "The blueprint every brand in this era was consciously or unconsciously following — whether they knew it or not." },
      ],
      winningPattern: "The work that won treated the audience as co-authors. The message only existed when someone chose to pass it on. Reach became a byproduct of resonance rather than a budget line.",
      correctedBy: "By 2018 the model had been corrupted by imitation. Every brand had a purpose campaign. The next era rebuilt credibility through specificity — doing less, but meaning it.",
      whatToSteal: "The participation mechanic. The defining work of this era only existed once an audience engaged with it. Before you brief your next campaign, ask whether the idea is complete without anyone responding to it. If it is, you are broadcasting. The era you are studying was not.",
    },
    {
      culturalContext: "Work that unsettles juries usually arrives ahead of cultural permission. These are the pieces where the room goes quiet, the arguments run for an hour, and the final vote is uncomfortably close. They win because one or two jurors are willing to defend discomfort as evidence of honesty. The work is almost always about a subject that polite advertising had previously refused to touch directly.",
      landmarkPieces: [
        { name: "Benetton HIV/AIDS Campaign", year: "1992", why: "Put a dying man's final moments on a billboard and dared the world to look away. The industry wanted to. Juries could not." },
        { name: "This Girl Can", year: "2015", why: "Broke every rule of aspirational fitness advertising by showing real women sweating and jiggling. Won because the jury recognised the alternative was a lie." },
        { name: "Fearless Girl", year: "2017", why: "The jury argument was never about the craft — it was about whether a financial services firm had earned the right to speak this way. The award was given before that was resolved." },
      ],
      winningPattern: "Every uncomfortable winner refused the dominant aesthetic of its category. It looked like something you would not expect from that client in that medium at that moment.",
      correctedBy: "The next era became suspicious of discomfort as a creative strategy. Being provocative because you are brave is a different thing from being provocative because you are trying to appear brave.",
      whatToSteal: "The category refusal. Before you show your work to anyone, identify the one visual or tonal convention that every other brand in your sector uses without thinking. Describe your work as if that convention does not exist. See what survives. The pieces that made juries uncomfortable all started with that question.",
    },
  ],

  insight: [
    {
      verdict: "FELT",
      insightStatement: "When a queue feels disrespectful, people stop weighing whether the wait was worth it — they start deciding whether the brand was.",
      followUpQuestion: "",
    },
    {
      verdict: "OBSERVED",
      insightStatement: "",
      followUpQuestion: "You watched someone else experience this. Tell me about the moment they realised it was a problem — not just an inconvenience, but something that changed how they felt about the brand.",
    },
    {
      verdict: "ASSUMED",
      insightStatement: "",
      followUpQuestion: "You arrived at this conclusion, but who told it to you first? Where did the idea that this was a problem actually come from — was it research, a conversation, or a belief you already held?",
    },
  ],

  insightFollowup: [
    {
      verdict: "FELT",
      insightStatement: "The moment you're kept waiting by something that could have been different, you don't just lose patience — you lose a small piece of trust that you never consciously chose to give.",
      followUpQuestion: "",
    },
    {
      verdict: "OBSERVED",
      insightStatement: "",
      followUpQuestion: "You're still standing slightly outside the experience. What would have to be true for this to be something you felt personally — not something you understood intellectually?",
    },
  ],

  lineage: [
    {
      oldest: { year: "1960", name: "Dove 'Real Women' Print Ads", why: "The first major brand to use non-professional, unretouched imagery as the core creative strategy rather than the exception." },
      famous: { year: "2013", name: "Dove 'Real Beauty Sketches'", why: "The version most people in marketing cite when they want to justify authentic-looking production values." },
      uncomfortable: { year: "2021", name: "Every DTC brand's UGC-style paid creative", why: "Shaky phone footage, 'organic' testimonials, lo-fi editing — the aesthetic has become the most overproduced format in digital advertising." },
    },
    {
      oldest: { year: "1886", name: "Coca-Cola Script Logotype", why: "The first brand to demonstrate that a typeface alone, applied consistently enough, becomes more recognisable than any symbol it could have commissioned." },
      famous: { year: "1994", name: "FedEx Wordmark (Lindon Leader)", why: "The piece every designer knows by name — the hidden arrow made purely typographic thinking feel like craft rather than a limitation." },
      uncomfortable: { year: "2023", name: "The wave of sans-serif corporate rebrands", why: "Your client has seen them all. They will ask what makes yours different. Have the answer before they do." },
    },
    {
      oldest: { year: "1950s", name: "Direct Mail 'Reply By' Deadline", why: "The original urgency device — postmarked deadlines created genuine scarcity because physical delivery made the constraint real." },
      famous: { year: "2012", name: "Amazon Lightning Deals", why: "Took deadline urgency from an occasional tactic to a permanent platform feature, training a generation to treat the countdown as a trust signal." },
      uncomfortable: { year: "2020", name: "Shopify Countdown Timer Apps", why: "The clock on your product page. The question is whether your scarcity is real — because your audience has been trained to open a private window and check." },
    },
  ],
};

export function getDemoResponse(key: string, index: number): object | undefined {
  const arr = DEMO_RESPONSES[key];
  if (!arr || arr.length === 0) return undefined;
  return arr[index % arr.length];
}

export function getDemoCount(key: string): number {
  return DEMO_RESPONSES[key]?.length ?? 0;
}
