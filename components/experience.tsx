"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function Experience() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver({ threshold: 0.1 })

  const experiences = [
    {
      title: "Cybersecurity Intern",
      company: "Shadow Fox",
      duration: "Apr 2025 - May 2025",
      location: "Remote",
      responsibilities: [
        "Analyzed log files for suspicious activities related to cybersecurity events",
        "Created detailed reports on current security threats and vulnerabilities",
        "Monitored network traffic for malicious or unauthorized activity",
        "Researched emerging trends in cybersecurity threats, risks, and countermeasures",
      ],
      skills: ["Log Analysis", "Threat Detection", "Network Monitoring", "Security Reporting"],
    },
  ]

  const certifications = [
    "Introduction to Cybersecurity - TryHackMe",
    "Computer Network and Network Security - IBM",
    "Introduction to Back-End Development - Meta",
  ]

  const achievements = [
    "InterCollege(ATHLIMA) Cricket Champion",
    "State Level Professional Skater",
    "District Level Cricketer",
    "MLSC Core Team Member (Cloud Computing)",
  ]

  return (
    <section id="experience" className="py-20 bg-slate-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Experience & Achievements</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            My professional experience, certifications, and notable achievements
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <h3
              className={`text-2xl font-semibold text-white mb-6 transition-all duration-800 ${
                contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Work Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-teal-400/10 transition-all duration-800 hover:-translate-y-2 hover:scale-105 ${
                    contentVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
                  }`}
                  style={{ transitionDelay: contentVisible ? "200ms" : "0ms" }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                        <div className="flex items-center gap-2 text-teal-400 font-medium">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Calendar className="h-4 w-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className={`text-slate-300 flex items-start transition-all duration-500 ${
                            contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                          }`}
                          style={{ transitionDelay: contentVisible ? `${400 + respIndex * 100}ms` : "0ms" }}
                        >
                          <span className="text-teal-400 mr-2">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className={`bg-teal-400/20 text-teal-300 border-teal-400/30 transition-all duration-400 hover:scale-110 ${
                            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                          style={{ transitionDelay: contentVisible ? `${800 + skillIndex * 100}ms` : "0ms" }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-8">
            {/* Certifications */}
            <Card
              className={`bg-slate-800/50 border-slate-700 hover:shadow-lg hover:shadow-teal-400/10 transition-all duration-800 hover:-translate-y-2 hover:scale-105 ${
                contentVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-90"
              }`}
              style={{ transitionDelay: contentVisible ? "400ms" : "0ms" }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Certifications</h3>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li
                      key={index}
                      className={`text-slate-300 flex items-start transition-all duration-500 ${
                        contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`}
                      style={{ transitionDelay: contentVisible ? `${600 + index * 100}ms` : "0ms" }}
                    >
                      <span className="text-teal-400 mr-2">✓</span>
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card
              className={`bg-slate-800/50 border-slate-700 hover:shadow-lg hover:shadow-teal-400/10 transition-all duration-800 hover:-translate-y-2 hover:scale-105 ${
                contentVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-90"
              }`}
              style={{ transitionDelay: contentVisible ? "600ms" : "0ms" }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className={`text-slate-300 flex items-start transition-all duration-500 ${
                        contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`}
                      style={{ transitionDelay: contentVisible ? `${800 + index * 100}ms` : "0ms" }}
                    >
                      <span className="text-teal-400 mr-2">🏆</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
