"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: projectsRef, isVisible: projectsVisible } = useIntersectionObserver({ threshold: 0.1 })

  const projects = [
    {
      title: "Spacefy: Smart Parking Management System",
      description:
        "A comprehensive smart parking management and optimization system built with Django backend for managing parking data, payments, and authentication. Features real-time parking location tracking and mobile-friendly interface.",
      image: "/images/spacefy-project.png",
      technologies: ["Django", "React Native", "Google Maps API", "Python", "Payment Integration", "Authentication"],
      githubUrl: "https://github.com/coderdevil123/spacefy",
      demoUrl: "#",
      featured: true,
    },
    {
      title: "Cybersecurity Vulnerability Scanner",
      description:
        "A comprehensive security scanning tool built with Python for identifying web application vulnerabilities. Implements various security testing techniques and generates detailed reports.",
      image: "/images/cybersecurity-scanner.png",
      technologies: ["Python", "Nmap", "Burp Suite", "Network Security", "Web Security"],
      githubUrl: "https://github.com/coderdevil123",
      demoUrl: "#",
      featured: true,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-slate-800" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on during my learning journey
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group cursor-pointer bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-all duration-1000 ease-out hover:shadow-xl hover:shadow-teal-400/20 hover:-translate-y-6 hover:scale-105 ${
                project.featured ? "ring-2 ring-teal-400/30" : ""
              } ${
                projectsVisible
                  ? "opacity-100 translate-y-0 scale-100 rotate-0"
                  : "opacity-0 translate-y-16 scale-90 rotate-1"
              }`}
              style={{
                transitionDelay: projectsVisible ? `${index * 300}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden">
                {project.featured && (
                  <Badge
                    className={`absolute top-4 left-4 z-10 bg-teal-600 hover:bg-teal-500 transition-all duration-500 ${
                      projectsVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                    style={{ transitionDelay: projectsVisible ? `${index * 300 + 200}ms` : "0ms" }}
                  >
                    Featured
                  </Badge>
                )}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div
                    className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-all duration-500 ${
                      hoveredProject === index ? "opacity-100 backdrop-blur-sm" : "opacity-0"
                    }`}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                      className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-slate-800 hover:bg-slate-700 text-white border-slate-600"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                      className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-slate-800 hover:bg-slate-700 text-white border-slate-600"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className={`text-xs bg-slate-600/50 text-slate-200 hover:bg-teal-400/20 hover:text-teal-300 transition-all duration-300 hover:scale-110 border-slate-500 ${
                        projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: projectsVisible ? `${index * 300 + techIndex * 50}ms` : "0ms",
                        transitionDuration: "400ms",
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div
                  className={`flex gap-2 transition-all duration-500 ${
                    projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: projectsVisible ? `${index * 300 + 400}ms` : "0ms" }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-slate-600 text-slate-800 bg-slate-200 hover:bg-slate-100 hover:text-slate-900"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-teal-600 hover:bg-teal-500 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    asChild
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
