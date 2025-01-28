import {
  Dumbbell,
  DollarSign,
  Users,
  Star,
  Calendar,
  HeartPulse,
} from "lucide-react";

const benefits = [
  {
    icon: <Dumbbell className="w-12 h-12 text-primary" />,
    title: "State-of-the-Art Equipment",
    description:
      "Access the latest and most advanced fitness equipment for all your workout needs.",
  },
  {
    icon: <DollarSign className="w-12 h-12 text-primary" />,
    title: "Affordable Memberships",
    description:
      "Enjoy flexible and budget-friendly membership plans tailored to your fitness goals.",
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Expert Trainers",
    description:
      "Our certified trainers are here to guide and motivate you every step of the way.",
  },
  {
    icon: <Star className="w-12 h-12 text-primary" />,
    title: "Top-Rated Facilities",
    description:
      "Experience clean, modern, and well-maintained facilities designed for your comfort.",
  },
  {
    icon: <Calendar className="w-12 h-12 text-primary" />,
    title: "Flexible Class Schedules",
    description:
      "Choose from a variety of classes at convenient times to fit your busy lifestyle.",
  },
  {
    icon: <HeartPulse className="w-12 h-12 text-primary" />,
    title: "Holistic Wellness Programs",
    description:
      "Join our wellness programs that focus on both physical and mental health.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 snap-section flex items-center max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div>
          <h6 className="text-2xl font-semibold">Why Choose Us</h6>
          <hr className="w-28 mt-2 bg-blue-700 h-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-lg">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
