import { Link } from "react-router-dom";
import React from 'react'

const PublicPage = () => {
    const content =(
        <section className="public">
        <header>
            <h1>Welcome to <span className="nowrap">Sidhya Repair</span></h1>
        </header>
        <main className="public_main">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, molestiae.</p>
            <address className="public_addr">
                Sidhya Repair <br />
                700059 Ranipark Kolkata <br />
                1221 city codebr <br />
                10 no room <br />
                <a href="tel:+9749571885">9749571885</a>
            </address>
            <br />
            <p>Owner: Asutosh sidhya</p>
        </main>
        <footer>
            <Link to='/login' >Employee Login</Link>
        </footer>
    </section>
    )
  return content
  
}

export default PublicPage
