import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp, Menu, X, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const clusters = [
  {
    name: "Money and Work",
    desc: "Tax, income, super, consumer rights.",
    guides: ["Tax Basics", "Side Income and Gig Work", "Money and Super", "Consumer Rights"],
  },
  {
    name: "Home and Renting",
    desc: "Where you live, who you live near, what it costs.",
    guides: ["Renting and Tenancy", "Neighbours and Community", "Council and Local Government", "Utilities and Cost of Living"],
  },
  {
    name: "Health and Family",
    desc: "Bodies, minds, kids, carers.",
    guides: ["Health and Medicare", "Mental Health and Wellbeing", "Kids and Families", "Disability and Carer Support"],
  },
  {
    name: "Civic and Legal",
    desc: "Voting, legal basics, safety.",
    guides: ["Voting and Civic Life", "Legal Basics", "Safety and Family Violence"],
  },
  {
    name: "New to Australia",
    desc: "If you arrived recently, start here.",
    guides: ["Settling In", "Health", "Banking", "Schools", "Community", "Qualifications"],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] w-full font-sans text-foreground bg-background">
      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity"
            data-testid="link-home-logo"
          >
            kindd
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollTo("home")} className="hover:opacity-70 transition-opacity">
              Home
            </button>
            <button onClick={() => scrollTo("guides")} className="hover:opacity-70 transition-opacity">
              Guides
            </button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:opacity-70 transition-opacity">
              How KINDD Works
            </button>
            <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
              About Breza + You
            </a>
            <a href="mailto:connect@tbcworldwide.com" className="hover:opacity-70 transition-opacity">
              Contact
            </a>
            <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 transition-opacity">
              Part of Breza + You
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 text-lg">
                <button onClick={() => scrollTo("home")} className="text-left py-2">Home</button>
                <button onClick={() => scrollTo("guides")} className="text-left py-2">Guides</button>
                <button onClick={() => scrollTo("how-it-works")} className="text-left py-2">How KINDD Works</button>
                <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="py-2">About Breza + You</a>
                <a href="mailto:connect@tbcworldwide.com" className="py-2">Contact</a>
                <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="py-2 text-accent">Part of Breza + You</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SECTION 1 - HERO */}
      <section
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-start pt-32 px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-[#FCEEE8] z-[-2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-[-1]" />
        
        <div className="max-w-3xl mx-auto text-center mt-20 flex flex-col items-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-primary">kindd</h1>
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-primary leading-tight">
            You are one of our kind.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            A plain-language guide to Australian life. Sourced from government. Updated monthly. Always free.
          </p>
          <button
            onClick={() => scrollTo("guides")}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-ring transition-colors"
            data-testid="btn-hero-cta"
          >
            Browse the guides.
          </button>
        </div>

        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <ChevronDown className="h-8 w-8 text-muted-foreground animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 2 - THE PREMISE */}
      <section id="about" className="py-32 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-medium text-primary mb-12">Why KINDD exists.</h2>
          <div className="space-y-8 text-lg text-muted-foreground max-w-[680px] mx-auto leading-relaxed">
            <p>
              Adult life in Australia comes with no manual. There are forms to fill. Bodies to call. Rights you have but were never told about. Money you might be owed. Doors you did not know to knock on.
            </p>
            <p>
              KINDD points you to the right door. Sixteen plain-language guides covering tax, renting, health, family, neighbours, money, voting, and the rest of it. We do not give advice. We tell you where to go and what to ask when you get there.
            </p>
            <p>
              Every word here came from a government source. Every link goes back to one. Updated monthly. Free forever. No account. No catch.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - THE SIXTEEN GUIDES */}
      <section id="guides" className="py-32 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-primary mb-4">Sixteen guides. One small world.</h2>
            <p className="text-xl text-muted-foreground">Pick a cluster. Pick a guide. Get the right link, the right script, the right next step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusters.map((cluster, i) => (
              <div key={i} className="bg-background rounded-xl p-8 border border-accent/30 shadow-sm">
                <h3 className="text-xl font-medium text-primary mb-2">{cluster.name}</h3>
                <p className="text-sm text-muted-foreground mb-8">{cluster.desc}</p>
                
                <div className="space-y-4">
                  {cluster.guides.map((guide) => {
                    const id = `${cluster.name}-${guide}`;
                    const isOpen = openGuide === id;
                    
                    return (
                      <div key={guide} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                        <button
                          onClick={() => setOpenGuide(isOpen ? null : id)}
                          className="flex items-center justify-between w-full text-left text-ring font-medium hover:opacity-80 transition-opacity"
                        >
                          <span>{guide}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  Guide content coming. Will include plain-language overview, what to expect, and direct links to official government sources.
                                </p>
                                <p className="text-xs font-mono text-muted-foreground">
                                  Last updated: May 2026. Always check the official source for current information.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                  <a href="#" className="inline-block px-4 py-2 border border-ring text-ring rounded hover:bg-ring hover:text-primary-foreground transition-colors text-sm font-medium">
                                    Visit ato.gov.au
                                  </a>
                                  <a href="#" className="inline-block px-4 py-2 border border-ring text-ring rounded hover:bg-ring hover:text-primary-foreground transition-colors text-sm font-medium">
                                    Visit servicesaustralia.gov.au
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - HOW KINDD WORKS */}
      <section id="how-it-works" className="py-32 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-medium text-primary text-center mb-16">Three things to know before you start.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="pt-8 border-t border-accent/50">
              <h3 className="text-xl font-medium text-primary mb-4">Free forever.</h3>
              <p className="text-muted-foreground leading-relaxed">
                No login. No account. No tier. Cookies clear, you start fresh. That is the whole arrangement.
              </p>
            </div>
            <div className="pt-8 border-t border-accent/50">
              <h3 className="text-xl font-medium text-primary mb-4">Government sources only.</h3>
              <p className="text-muted-foreground leading-relaxed">
                ATO, Services Australia, Fair Trading, Healthdirect, Scamwatch, every state tribunal. Linked at the end of every guide. Last updated date shown.
              </p>
            </div>
            <div className="pt-8 border-t border-accent/50">
              <h3 className="text-xl font-medium text-primary mb-4">Directions, not advice.</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are not lawyers, accountants, or doctors. We are the person who knows which door to knock on. Once you find the door, the experts on the other side take it from there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - WHO KINDD IS FOR */}
      <section id="who" className="py-32 px-6 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-medium text-primary mb-16">For the people no one wrote a manual for.</h2>
          
          <div className="space-y-12 text-lg md:text-xl max-w-[680px] mx-auto">
            <p className="text-muted-foreground">For the freelancer who just got their first invoice and does not know what to do with it.</p>
            <p className="text-muted-foreground">For the renter staring at a leaky ceiling and a quiet landlord.</p>
            <p className="text-muted-foreground">For the parent looking for somewhere free for the kids on Saturday.</p>
            <p className="text-muted-foreground">For the new citizen working out how Medicare actually works.</p>
            <p className="text-muted-foreground">For the small business owner who got a Centrelink letter and panicked.</p>
            <p className="text-muted-foreground">For the tradie whose neighbour just took down a shared fence without asking.</p>
            <p className="text-muted-foreground">For anyone who has ever Googled something at 11pm and ended up on a forum from 2014.</p>
            <div className="pt-8 space-y-4">
              <p className="text-primary font-medium text-xl md:text-2xl">KINDD is for them.</p>
              <p className="text-primary font-medium text-xl md:text-2xl">KINDD is for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - ALWAYS FREE */}
      <section id="always-free" className="py-32 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium text-primary mb-8">It costs nothing. It will always cost nothing.</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            KINDD is free because some things should be open. Tax. Tenancy. Health. Mental health. The basics of being an adult here. None of that should sit behind a paywall. No tier. No upgrade. No premium. Just the guides.
          </p>
          <button
            onClick={() => scrollTo("guides")}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-ring transition-colors"
          >
            Start with a guide.
          </button>
        </div>
      </section>

      {/* SECTION 7 - DISCLAIMER */}
      <section id="disclaimer" className="py-24 px-6 bg-card">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-xl font-medium text-primary mb-8">Before you use KINDD.</h2>
          <div className="space-y-6 font-mono text-sm text-muted-foreground leading-relaxed">
            <p>Information here was last updated this month. Always check the official government website linked at the end of each guide for the most current details.</p>
            <p>KINDD is not a substitute for professional advice. For tax, see a registered tax agent. For legal matters, see a lawyer or your local community legal centre. For medical concerns, see a doctor.</p>
            <p>KINDD points you to the right place. The experts there take it from there.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8 - FOOTER */}
      <footer className="bg-[#0F172A] text-[#FAF6E8] pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="text-4xl font-bold tracking-tighter">kindd</div>
            <div className="text-xl text-[#B8D4E8]">You are one of our kind.</div>
          </div>
          
          <div className="space-y-8 mb-16">
            <div className="text-sm text-[#6B6B5E] leading-relaxed">
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">compyr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">alertss</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">turnd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">yourrr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">novlit</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">sharpend</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">moodframe</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">the outside eye</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">rostrr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">platd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">sortd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">earnt</a>
            </div>
            
            <div className="text-sm text-[#6B6B5E] leading-relaxed">
              <a href="https://tbcworldwide.com" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">tbcworldwide.com</a> <span className="mx-2">·</span>
              <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">brezaplusyou.com.au</a> <span className="mx-2">·</span>
              <a href="https://taracollective.org" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">taracollective.org</a> <span className="mx-2">·</span>
              <a href="https://celes13.com" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">celes13.com</a>
            </div>
            
            <div>
              <a href="mailto:connect@tbcworldwide.com" className="text-sm text-[#B8D4E8] hover:opacity-80 transition-opacity">
                connect@tbcworldwide.com
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-[#6B6B5E]/30 pt-8">
            <div className="flex items-center gap-4 text-[#FAF6E8]/40">
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
            
            <div className="text-xs text-[#6B6B5E] text-right space-y-2">
              <p>
                Part of <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">Breza + You</a>. Tech Division of TBC Worldwide. Free because some things should be.
              </p>
              <p>© 2026 KINDD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* GO TO TOP ARROW */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("home")}
            className="fixed bottom-8 right-8 p-3 bg-background border border-accent/50 rounded-full shadow-sm text-primary hover:bg-card transition-colors z-50"
            data-testid="btn-to-top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}