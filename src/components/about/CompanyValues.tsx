
import { motion } from "framer-motion";
import { Heart, Shield, Clock, CheckCircle, Award, Users, Lock, Star } from "lucide-react";

const values = [
  { name: "Integrity", icon: Heart, color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Security", icon: Shield, color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Reliability", icon: Clock, color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Quality", icon: CheckCircle, color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Excellence", icon: Award, color: "bg-secondary/10 text-secondary border-secondary/20" },
  { name: "Trust", icon: Users, color: "bg-secondary/10 text-secondary border-secondary/20" },
  { name: "Innovation", icon: Star, color: "bg-secondary/10 text-secondary border-secondary/20" },
  { name: "Protection", icon: Lock, color: "bg-secondary/10 text-secondary border-secondary/20" }
];

const CompanyValues = () => {
  return (
    <section>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary relative inline-block mb-1">
          Our Core Values
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-secondary to-secondary/60 mx-auto mb-6"></div>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          These principles guide everything we do as we work to secure your homes, businesses, and vehicles.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center border mb-3`}>
              <value.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{value.name}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-100 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-700 italic">
          "At Locksmith & Security LLC, we understand that security is about more than just locks and keys—it's about providing peace of mind. 
          Our core values drive everything we do and shape how we serve our community."
        </p>
      </motion.div>
    </section>
  );
};

export default CompanyValues;
