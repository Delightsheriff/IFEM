"use client";

import { Branch } from "@/interface/sanity";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

interface BranchesSectionProps {
  branches: Branch[];
}

export default function BranchesSection({ branches }: BranchesSectionProps) {
  if (!branches.length) return null;

  const hqBranch = branches.find((b) => b.type === "hq");
  const defaultValue = hqBranch?._id || branches[0]?._id;

  return (
    <section className="py-20 px-4 md:px-8 bg-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-forest font-semibold mb-4">
            Our Offices
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Locations Around the World
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Visit any of our offices for personalized support and guidance.
          </p>
        </div>

        <Tabs defaultValue={defaultValue} className="w-full">
          <div className="flex justify-start md:justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <TabsList
              variant="line"
              className="bg-transparent border-b border-sage/30 rounded-none p-0 inline-flex w-max md:w-auto"
            >
              {branches.map((branch) => (
                <TabsTrigger
                  key={branch._id}
                  value={branch._id}
                  className="px-6 py-3 text-base font-semibold text-charcoal data-[state=active]:text-forest data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-forest rounded-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    {branch.name}
                    {branch.type === "hq" && (
                      <span className="text-xs bg-terracotta/20 text-terracotta px-2 py-1 rounded font-bold">
                        HQ
                      </span>
                    )}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {branches.map((branch) => (
            <TabsContent
              key={branch._id}
              value={branch._id}
              className="mt-8 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Map or Placeholder */}
                {branch.mapEmbed ? (
                  <div
                    className="rounded-xl overflow-hidden h-80"
                    dangerouslySetInnerHTML={{ __html: branch.mapEmbed }}
                  />
                ) : (
                  <div className="bg-linear-to-br from-sage/20 to-forest/10 rounded-xl border-2 border-dashed border-sage/30 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-sage/40 mx-auto mb-3" />
                      <p className="text-gray font-medium">
                        {branch.city}, {branch.country}
                      </p>
                      <p className="text-sm text-gray/70 mt-1">Map view</p>
                    </div>
                  </div>
                )}

                {/* Branch Info */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-charcoal mb-2">
                      {branch.name}
                    </h3>
                    {branch.type === "hq" && (
                      <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-bold rounded">
                        HEAD OFFICE
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-forest shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray uppercase tracking-wider mb-1">
                          Address
                        </p>
                        <p className="text-charcoal font-medium leading-relaxed break-words">
                          {branch.address}
                          <br />
                          {branch.city}, {branch.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Phone className="w-5 h-5 text-forest shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, "")}`}
                          className="text-forest hover:text-forest/80 font-medium transition-colors truncate block"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Mail className="w-5 h-5 text-forest shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${branch.email}`}
                          className="text-forest hover:text-forest/80 font-medium transition-colors break-all block"
                        >
                          {branch.email}
                        </a>
                      </div>
                    </div>

                    {branch.hours && (
                      <div className="flex gap-4">
                        <Clock className="w-5 h-5 text-forest shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray uppercase tracking-wider mb-1">
                            Hours
                          </p>
                          <p className="text-charcoal leading-relaxed">
                            {branch.hours}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {branch.directionsUrl && (
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors font-semibold w-fit"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
