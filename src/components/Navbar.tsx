import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Github, Linkedin, Mail, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  language: "pt" | "en";
  onLanguageToggle: () => void;
}

const navItems = (language: "pt" | "en") => [
  { name: language === "pt" ? "Home" : "Home", href: "home" },
  { name: language === "pt" ? "Sobre" : "About", href: "about" },
  { name: language === "pt" ? "Qualidades" : "Strengths", href: "qualities" },
  { name: language === "pt" ? "Skills" : "Skills", href: "skills" },
  { name: language === "pt" ? "Projetos" : "Projects", href: "projects" },
  { name: language === "pt" ? "Experiência" : "Experience", href: "experience" },
  { name: language === "pt" ? "Formação" : "Education", href: "education" },
  { name: language === "pt" ? "Contato" : "Contact", href: "contact" },
];

export function Navbar({ language, onLanguageToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = navItems(language).map(item => item.href);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active if top is within viewport top area or covers most of screen
          return (rect.top <= 150 && rect.bottom >= 150);
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-border py-3 shadow-sm" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container px-6 mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 font-display font-bold text-xl cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-bold text-lg">AJ</span>
            </div>
            <span className="text-foreground">Assunção Costa</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems(language).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === item.href 
                    ? "text-primary font-semibold bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="default" 
              className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => scrollToSection('contact')}
            >
              {language === "pt" ? "Contratar" : "Hire Me"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-4 font-semibold border-border/40"
              onClick={onLanguageToggle}
            >
              <Globe2 className="w-4 h-4 mr-2" /> {language === "pt" ? "EN" : "PT"}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="xl:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 bg-background border-b border-border z-40 overflow-hidden xl:hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-2">
              {navItems(language).map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "text-left text-lg font-medium py-3 px-4 rounded-lg transition-colors",
                    activeSection === item.href 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <Button className="w-full" size="lg" onClick={() => scrollToSection('contact')}>
                {language === "pt" ? "Fale Comigo" : "Contact Me"}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={onLanguageToggle}
              >
                <Globe2 className="w-4 h-4 mr-2" /> {language === "pt" ? "Switch to English" : "Mudar para Português"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
