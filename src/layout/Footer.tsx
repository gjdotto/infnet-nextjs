import React from "react";

export function Footer() {
  return (
    <div className="footer">
      <section>
        <h2>Todos os direitos reservados ©</h2>
      </section>
      
      <style jsx>{`
        .footer {
          padding: 32px 0;
          display: flex;
          align-items: center;
          justify-content: center;          
          color: #064d78;
        }

        .footer-links {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item a {
          color: #000;
          font-size: 12px;
        }

        .item:not(first-child) {
          margin-left: 15px;
        }
      `}</style>
    </div>
  );
}
