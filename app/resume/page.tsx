
import React from 'react';
import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import Tag from '../../components/Tag';
import { FileDown, MapPin, Mail, Phone } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="pt-40 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
            <Reveal>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 font-bold block mb-6">Curriculum Vitae</span>
                <h1 className="text-6xl font-semibold tracking-tighter text-slate-900 mb-6">陈绮玥</h1>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-500 text-xs font-medium uppercase tracking-widest">
                  <span className="flex items-center"><MapPin size={14} className="mr-2 text-blue-600" /> Sydney, Australia</span>
                  <span className="flex items-center"><Phone size={14} className="mr-2 text-blue-600" /> +86 15052585358</span>
                  <span className="flex items-center"><Mail size={14} className="mr-2 text-blue-600" /> 1014850831@qq.com</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a 
                href="/陈绮玥简历.pdf" 
                className="flex items-center px-8 py-3.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105"
              >
                <FileDown size={16} className="mr-2" /> Download PDF
              </a>
            </Reveal>
          </div>

          <div className="space-y-32">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">About</h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-xl text-slate-700 leading-relaxed italic">
                  Computer Science student with strong programming skills and practical experience in full-stack development, machine learning, and distributed systems. Passionate about building innovative software solutions and continuously learning new technologies.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">Education</h2>
              </div>
              <div className="md:col-span-3 space-y-16">
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Master of Computer Science</h3>
                    <span className="font-mono text-[10px] text-slate-300">2025.02 — 2026.06</span>
                  </div>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4">University of Sydney</p>
                  <p className="text-slate-500 text-xs mb-3">Sydney, Australia</p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1">
                    <li>• Relevant Courses: Machine Learning & Data Mining, Data Science Principles, Enterprise Software Architecture, Model-Based Software Engineering, Web Application Development</li>
                  </ul>
                </div>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Bachelor of Computer Science and Technology</h3>
                    <span className="font-mono text-[10px] text-slate-300">2020.09 — 2024.06</span>
                  </div>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4">Nanjing Normal University</p>
                  <p className="text-slate-500 text-xs mb-3">Nanjing, China | GPA: 3.48 (Top 25%) | Average Score: 86.01/100</p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1">
                    <li>• Relevant Courses: Machine Learning (96), Java Programming (92), Operating Systems Principles (91), Software Engineering (90), Data Structures (86)</li>
                    <li>• Honors: Outstanding Graduate (2024), First-class Scholarship, Excellent Thesis</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">Experience</h2>
              </div>
              <div className="md:col-span-3 space-y-16">
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Java Technology Specialist</h3>
                    <span className="font-mono text-[10px] text-slate-300">2022.07 — 2022.09</span>
                  </div>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-6">江苏瑞云工业互联网有限公司 (Jiangsu Ruiyun Industrial Internet Co., Ltd.)</p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-2">
                    <li>• Assisted in software function design and implementation under department leadership, ensuring timely and high-quality project completion</li>
                    <li>• Participated in the development and maintenance of smart agriculture and smart farming online monitoring platforms</li>
                    <li>• Integrated IoT technology by connecting various sensor devices to collect real-time data on key environmental parameters such as temperature in farming environments</li>
                    <li>• Responsible for daily bug fixes and optimization to ensure platform stability</li>
                    <li>• Created and maintained design and development process documentation for project handover and maintenance</li>
                  </ul>
                </div>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Product Manager Assistant</h3>
                    <span className="font-mono text-[10px] text-slate-300">2021.06 — 2021.07</span>
                  </div>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-6">瑞丰信息技术 (Ruifeng Information Technology)</p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-2">
                    <li>• Collected smart agriculture-related literature and completed competitive product research and analysis under project manager guidance</li>
                    <li>• Provided comparative product design concepts and solutions</li>
                    <li>• Assisted product manager in completing process and prototype design, UI design for smart irrigation platform</li>
                    <li>• Organized and analyzed requirements, and compiled requirement documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">Projects</h2>
              </div>
              <div className="md:col-span-3 space-y-16">
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">HSC Power AI Learning Platform</h3>
                    <span className="font-mono text-[10px] text-slate-300">2025.10 — 2025.11</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag label="React" />
                    <Tag label="Node.js" />
                    <Tag label="Supabase" />
                    <Tag label="OpenAI" />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm mb-3">
                    A full-stack learning system for students, teachers, parents, and administrators, providing personalized learning plans, AI question generation, automatic grading, and learning feedback.
                  </p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1 list-disc list-inside">
                    <li>Built with React 19 + Vite frontend, Node.js/Express REST API, Supabase for database and authentication</li>
                    <li>Integrated OpenAI to build multi-agent AI workflow (subject recognition → learning plan → question generation → grading)</li>
                  </ul>
                </div>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Distributed E-commerce Microservices Platform</h3>
                    <span className="font-mono text-[10px] text-slate-300">2025.09 — 2025.11</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag label="Java" />
                    <Tag label="Spring Boot" />
                    <Tag label="gRPC" />
                    <Tag label="RabbitMQ" />
                    <Tag label="Docker" />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm mb-3">
                    Designed four microservices (Store/Bank/DeliveryCo/Email) based on Spring Boot, providing RESTful API + gRPC service interfaces.
                  </p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1 list-disc list-inside">
                    <li>Built Saga distributed transaction covering payment, inventory, and delivery processes with compensation logic and eventual consistency</li>
                    <li>Used RabbitMQ for reliable asynchronous messaging (persistence, Ack, retry, idempotent consumption)</li>
                    <li>Deployed cross-service containerization using Docker Compose</li>
                  </ul>
                </div>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Reinforcement Learning Network Attack-Defense Training</h3>
                    <span className="font-mono text-[10px] text-slate-300">2023.10 — 2024.04</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag label="Python" />
                    <Tag label="PyTorch" />
                    <Tag label="Reinforcement Learning" />
                    <Tag label="Deep Q-Learning" />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm mb-3">
                    Research and implementation of adaptive control methods for network attack-defense training based on reinforcement learning.
                  </p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1 list-disc list-inside">
                    <li>Built reinforcement learning framework to simulate network attack-defense environments using Markov Decision Process</li>
                    <li>Designed network attack-defense state, action, and reward mechanisms based on NASim</li>
                    <li>Implemented Deep Q-Learning algorithm using PyTorch with experience replay and target network techniques</li>
                  </ul>
                </div>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">Financial Product Subscription Prediction (LightGBM)</h3>
                    <span className="font-mono text-[10px] text-slate-300">2022.09 — 2022.12</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag label="Python" />
                    <Tag label="Machine Learning" />
                    <Tag label="LightGBM" />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm mb-3">
                    Deep analysis of bank user data using machine learning algorithms to predict customer potential financial product subscription intentions.
                  </p>
                  <ul className="text-slate-600 leading-relaxed text-sm space-y-1 list-disc list-inside">
                    <li>Achieved 98% accuracy through feature engineering and algorithm parameter optimization</li>
                    <li>Compared with Decision Tree, SVM, Adaboost and other classic models, verifying LightGBM advantages</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">Skills</h2>
              </div>
              <div className="md:col-span-3">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Programming Languages</h3>
                    <p className="text-slate-600 text-sm">C/C++, Java, Python, JavaScript/TypeScript</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Frameworks & Technologies</h3>
                    <p className="text-slate-600 text-sm">Spring Boot, React, Node.js, Vue.js, Express, Hibernate, Struts, MongoDB, MySQL, Docker</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Languages</h3>
                    <p className="text-slate-600 text-sm">English: CET-4 (610), CET-6 (524), IELTS (7.0) - Strong reading, writing, listening, and speaking abilities</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
