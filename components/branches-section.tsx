"use client";

import { Branch } from "@/interface/sanity";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

interface BranchesSectionProps {
  branches: Branch[];
}

export default function BranchesSection({ branches }: BranchesSectionProps) {
  if (!branches.length) return null;

  const hqBranch = branches.find((b) => b.type === "hq");
  const defaultValue = hqBranch?._id || branches[0]?._id;

  return (
    <section id="branches" className="py-20 px-4 md:px-8 bg-[#fafaf7]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionEyebrow align="center" tone="forest" className="mb-4">
            Our Offices
          </SectionEyebrow>
          <h2
            className="font-sans font-extrabold tracking-tight text-[#111111] mb-4"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Locations Around the World
          </h2>
          <p
            className="text-[#7a7a7a] max-w-2xl mx-auto"
            style={{ fontSize: "var(--text-lead)" }}
          >
            Visit any of our offices for personalized support and guidance.
          </p>
        </div>

        <Tabs defaultValue={defaultValue} className="w-full">
          <div className="flex justify-start md:justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <TabsList
              variant="line"
              className="bg-transparent border-b border-[#e2e2de] rounded-none p-0 inline-flex w-max md:w-auto"
            >
              {branches.map((branch) => (
                <TabsTrigger
                  key={branch._id}
                  value={branch._id}
                  className="px-6 py-3 text-base font-semibold text-[#7a7a7a] data-[state=active]:text-[#1a5c34] data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-[#1a5c34] rounded-none whitespace-nowrap transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {branch.name}
                    {branch.type === "hq" && <Badge variant="hq" size="md">HQ</Badge>}
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
                  <div className="bg-[#e8f3ec] rounded-xl border-2 border-dashed border-[#1a5c34]/20 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#1a5c34]/30 mx-auto mb-3" />
                      <p className="text-[#7a7a7a] font-medium">
                        {branch.city}, {branch.country}
                      </p>
                      <p className="text-sm text-[#7a7a7a]/70 mt-1">Map view</p>
                    </div>
                  </div>
                )}

                {/* Branch Info */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="font-sans text-3xl font-extrabold tracking-tight text-[#111111] mb-2">
                      {branch.name}
                    </h3>
                    {branch.type === "hq" && (
                      <Badge variant="hq" size="lg">Head Office</Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-[#1a5c34] shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#7a7a7a] uppercase tracking-wider mb-1">
                          Address
                        </p>
                        <p className="text-[#111111] font-medium leading-relaxed wrap-break-words">
                          {branch.address}
                          <br />
                          {branch.city}, {branch.country}
                        </p>
                      </div>
                    </div>

                    {(branch.phones?.length || branch.phone) && (
                      <div className="flex gap-4">
                        <Phone className="w-5 h-5 text-[#1a5c34] shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#7a7a7a] uppercase tracking-wider mb-1">
                            Phone
                          </p>
                          {branch.phones && branch.phones.length > 0 ? (
                            <div className="space-y-1">
                              {branch.phones.map((p, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase tracking-widest text-[#7a7a7a]/60 font-semibold w-20 shrink-0">
                                    {p.label}
                                  </span>
                                  <a
                                    href={`tel:${p.number.replace(/\s/g, "")}`}
                                    className="text-[#1a5c34] hover:text-[#154a2a] font-medium transition-colors truncate"
                                  >
                                    {p.number}
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : branch.phone ? (
                            <a
                              href={`tel:${branch.phone.replace(/\s/g, "")}`}
                              className="text-[#1a5c34] hover:text-[#154a2a] font-medium transition-colors truncate block"
                            >
                              {branch.phone}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Mail className="w-5 h-5 text-[#1a5c34] shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#7a7a7a] uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${branch.email}`}
                          className="text-[#1a5c34] hover:text-[#154a2a] font-medium transition-colors break-all block"
                        >
                          {branch.email}
                        </a>
                      </div>
                    </div>

                    {branch.hours && (
                      <div className="flex gap-4">
                        <Clock className="w-5 h-5 text-[#1a5c34] shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#7a7a7a] uppercase tracking-wider mb-1">
                            Hours
                          </p>
                          <p className="text-[#111111] leading-relaxed">
                            {branch.hours}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {branch.directionsUrl && (
                    <Button asChild variant="primary" size="md" className="w-fit">
                      <a
                        href={branch.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                        <ArrowRight aria-hidden="true" />
                      </a>
                    </Button>
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
