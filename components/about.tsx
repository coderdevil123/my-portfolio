"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, GraduationCap, Heart } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: imageRef, isVisible: imageVisible } = useIntersectionObserver({ threshold: 0.3 })
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section id="about" className="py-20 bg-slate-800" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get to know more about my background, interests, and aspirations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-200 ${
              imageVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-90"
            }`}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-teal-400/30 shadow-2xl hover:shadow-teal-400/20 transition-all duration-500">
                <img src="/images/profile-photo.png" alt="Shubhang Mishra" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-500 transition-all duration-300 hover:scale-110">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div
            ref={contentRef}
            className={`space-y-6 transition-all duration-1000 ease-out delay-400 ${
              contentVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-90"
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Shubhang Mishra</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                I'm a versatile full-stack web developer and dedicated cybersecurity student with hands-on expertise in
                building responsive, scalable applications. Currently pursuing B.Tech in Computer Science and
                Engineering with specialization in Cybersecurity, I combine secure coding practices with modern
                development technologies to create robust, secure systems.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: GraduationCap,
                  title: "Education",
                  details: ["B.Tech CSE (Cybersecurity)", "Sikkim Manipal Institute of Technology", "CGPA: 9.1/10"],
                },
                {
                  icon: MapPin,
                  title: "Location",
                  details: ["Patiala, Punjab", "India"],
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className={`border-l-4 border-l-teal-400 bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                    contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: contentVisible ? `${600 + index * 100}ms` : "0ms" }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        {item.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-slate-300">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card
              className={`border-l-4 border-l-teal-400 bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: contentVisible ? "800ms" : "0ms" }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-teal-400 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-2">Interests & Hobbies</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Cybersecurity",
                        "Full-Stack Development",
                        "Cricket",
                        "Skating",
                        "Cloud Computing",
                        "Network Security",
                      ].map((interest, index) => (
                        <span
                          key={interest}
                          className={`px-3 py-1 bg-teal-400/20 text-teal-300 rounded-full text-sm font-medium hover:bg-teal-400/30 transition-all duration-300 hover:scale-110 ${
                            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                          style={{
                            transitionDelay: contentVisible ? `${900 + index * 100}ms` : "0ms",
                            transitionDuration: "500ms",
                          }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
