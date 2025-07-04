"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code, Globe, Terminal, Cpu } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function Skills() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver({ threshold: 0.1 })

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "C++", level: 80 },
        { name: "C", level: 75 },
        { name: "MySQL", level: 80 },
      ],
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: [
        { name: "Django", level: 85 },
        { name: "React", level: 80 },
        { name: "React Native", level: 75 },
        { name: "HTML/CSS", level: 90 },
        { name: "Full Stack", level: 85 },
      ],
    },
    {
      title: "Cybersecurity Tools",
      icon: Terminal,
      skills: [
        { name: "Nmap", level: 80 },
        { name: "Burp Suite", level: 75 },
        { name: "Metasploit", level: 70 },
        { name: "Network Security", level: 80 },
        { name: "Web App Security", level: 85 },
      ],
    },
    {
      title: "Frameworks & Tools",
      icon: Cpu,
      skills: [
        { name: "Pandas", level: 80 },
        { name: "NumPy", level: 75 },
        { name: "PyTorch", level: 70 },
        { name: "VS Code", level: 95 },
        { name: "PyCharm", level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-slate-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Here are the technologies and tools I've been learning and working with
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-teal-400/10 transition-all duration-700 hover:-translate-y-4 hover:scale-105 ${
                cardsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
              }`}
              style={{
                transitionDelay: cardsVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-teal-400/20 rounded-lg transition-all duration-300 hover:bg-teal-400/30 hover:scale-110">
                    <category.icon className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`transition-all duration-500 ${
                        cardsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`}
                      style={{
                        transitionDelay: cardsVisible ? `${index * 200 + skillIndex * 100}ms` : "0ms",
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                        <span className="text-sm text-slate-400">{skill.level}%</span>
                      </div>
                      <Progress
                        value={cardsVisible ? skill.level : 0}
                        className="h-2 bg-slate-600 transition-all duration-1500 ease-out [&>div]:bg-teal-400"
                        style={{
                          transitionDelay: cardsVisible ? `${index * 200 + skillIndex * 150}ms` : "0ms",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
