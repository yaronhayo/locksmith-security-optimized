import { Shield, Clock, DollarSign, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";

const BusinessLockChangeHero = () => {
  return (
    <section className="hero-gradient relative min-h-screen pt-20 pb-12 lg:pb-20">
      <div className="container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Commercial Lock Change Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Expert commercial lock replacement and security upgrade solutions for businesses. 
              We provide professional installation, master key systems, and high-security lock solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="text-lg">
                <a href="tel:5513037874" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  (551) 303-7874
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 text-white hover:bg-white/20">
                Schedule Service
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-secondary" />
                <span className="text-white">Same-Day Service</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-secondary" />
                <span className="text-white">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-secondary" />
                <span className="text-white">Competitive Rates</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Schedule Lock Change Service</h2>
                <p className="text-gray-600 mt-2">Professional commercial security solutions</p>
              </div>
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessLockChangeHero;