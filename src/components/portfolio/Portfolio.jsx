import React, { useState } from 'react'
import './portfolio.css'
import { motion } from 'framer-motion'
import { showFromTopVariants } from '../motion/variants'
import { useEffect } from 'react'

const Portfolio = () => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_LIST_PROJECTS);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id='portfolio'>
      <motion.h5 variants={showFromTopVariants(200)} initial="hidden" whileInView="visible" viewport={{ once: true }}>My recent Work</motion.h5>
      <motion.h2 variants={showFromTopVariants(200, 0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Portfolio</motion.h2>

      <div className="container portfolio__container">
        {projects.map((project) => (
          <motion.div key={project.id} variants={showFromTopVariants(200, 0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <article className='portfolio__item'>
              <div className='portfolio__item-image'>
                <img src={project.imgUrl} alt="" />
              </div>
              <h3>{project.title}</h3>
              <div className="portfolio__item-cta">
                {project.github !== '' ? <a href={project.github} className='btn' rel='noreferrer' target='_blank'>Github</a> : ''}
                {project.demo !== '' ? <a href={project.demo} className='btn btn-primary' rel='noreferrer' target='_blank'>Live Demo</a> : ''}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio