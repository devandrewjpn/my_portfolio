import React from 'react'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Services from './components/services/Services'
import Portfolio from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const response = await fetch(
            "https://portfolioapi.devandrew.com.br/projects/",
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              },
              mode: 'no-cors'
            }
          );
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
    
      fetchProjects();
}, []);

  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App