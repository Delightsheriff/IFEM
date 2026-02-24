import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { getTeamMembers } from "@/sanity/sanity";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function About() {
  const teamMembers = await getTeamMembers();
  return (
    <PageContentWrapper>
      {/* About & Services Section */}
      <section className="py-16 md:py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-8 text-center">
              What Makes Us Different?
            </h2>
            <p className="text-lg text-charcoal leading-relaxed mb-6">
              We bring our students closer to their dreams and help them achieve
              them. We have well-trained and experienced counselors who
              prioritize your needs and are result-oriented.
            </p>
            <p className="text-lg text-charcoal leading-relaxed">
              Our team of counselors will work with you closely to ensure you
              have a seamless process from start to finish. We understand how
              challenging it can be to make the right decisions around overseas
              studies, which is why we provide personalized guidance at every
              stage. We make our process completely transparent-UK admission and
              visa processing comes free of charge with no hidden charges.
            </p>
          </div>

          {/* Services Grid */}
          <div className="bg-forest text-white rounded-2xl p-12">
            <h3 className="font-serif text-3xl font-bold mb-8 text-center">
              Our Comprehensive Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Counseling & Preparation
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Career Counselling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Interview Preparations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Visa Counselling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Medical Appointment Booking</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Processing & Support
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Admission Processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Biometric Appointment Reservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Flight Booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Funding Solutions</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-8 pt-8 border-t border-white/20">
              We bridge the gap between you and your chosen institution, helping
              you obtain faster responses from the institution as your
              authorised representative.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 md:py-28 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <p className="text-terracotta text-sm uppercase tracking-widest font-semibold mb-4">
                Meet the Team
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
                Our People
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl overflow-hidden border border-sage/30 hover:border-forest/30 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden bg-sage/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-charcoal text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-forest font-medium text-sm mb-4">
                      {member.title}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 text-sm">
                      {member.email && (
                        <p className="text-gray">{member.email}</p>
                      )}
                      {member.phone && (
                        <p className="text-gray">{member.phone}</p>
                      )}
                    </div>

                    {/* Social Links */}
                    {member.email && (
                      <div className="flex gap-3 justify-center pt-3 border-t border-sage/20">
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-full bg-cream hover:bg-forest hover:text-white flex items-center justify-center transition-all"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 bg-forest text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-sage/10 -z-10" />

        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of students who have successfully achieved their
            educational dreams with our guidance and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-forest font-semibold rounded-lg hover:bg-cream transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/guides"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </PageContentWrapper>
  );
}
