import React, { useState, useEffect } from "react";

const initialFormState = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
};

function validarNome(nome: string) {
  if (nome.length < 3) {
    return "Digite um nome válido com pelo menos 3 caracteres";
  }

  if (nome.length > 32) {
    return "O nome precisa ter até 32 caracteres";
  }

  return null;
}

function validarEmail(email: string) {
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    return "Este email é inválido";
  }

  return null;
}

function validarTelefone(telefone: string) {
  if (telefone.length === 0) {
    return null;
  }

  if (!telefone.match(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)) {
    return "O número de telefone é inválido";
  }

  return null;
}

function validarAssunto(assunto: string) {

  if (assunto.length < 5) {
    return "Digite um assunto válido com pelo menos 5 caracteres";
  }

  if (assunto.length > 50) {
    return "O assunto precisa ter até 50 caracteres";
  }

  return null;
}

function validarMensagem(message: string) {

  if (message.length > 256) {
    return "A mensagem precisa ter até 256 caracteres";
  }

  return null;
}

function ErrorMessage({ message }: { message: string | null }) {
  if (message === null) {
    return null;
  }

  return (
    <span className="error">
      {message}
      <style jsx>{`
        .error {
          color: #f11212;
          font-size: 10px;
        }
      `}</style>
    </span>
  );
}

export function ContactForm() {
  const [isDirty, setIsDirty] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const validNome = validarNome(formState.nome);
  const validEmail = validarEmail(formState.email);
  const validTelefone = validarTelefone(formState.telefone);
  const validAssunto = validarAssunto(formState.assunto);
  const validMensagem = validarMensagem(formState.mensagem);

  const isFormValid =
    validNome === null &&
    validEmail === null &&
    validTelefone === null &&
    validAssunto === null &&
    validMensagem === null;

  useEffect(() => {
    if (
      formState.nome.length > 0 ||
      formState.email.length > 0 ||
      formState.telefone.length > 0 ||
      formState.assunto.length > 0 ||
      formState.mensagem.length > 0
    ) {
      setIsDirty(true);
    }
  }, [formState.nome]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDirty(true);

    if (isFormValid) {
      const form = new FormData();
      form.append("name", formState.nome);
      form.append("email", formState.email);
      form.append("phone-number", formState.telefone);
      form.append("subject", formState.assunto);
      form.append("message", formState.mensagem);

      try {
        await fetch(
          "https://getform.io/f/6bed751f-698e-4705-91aa-90e06712ef83",
          {
            method: "POST",
            body: form,
          }
        );

        alert("Formulário enviado com sucesso!");
        setFormState(initialFormState);
      } catch (error) {
        console.log(error);
        alert("Houve um erro ao enviar o formulário");
      }
    }
  }

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Entre em contato com este viajante</h2>
      <form
        noValidate
        className="contact-form"
        method="post"
        onSubmit={onSubmit}
      >
        <div className="row">
          <div className="field-container">
            <label htmlFor="fullname">Nome completo</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="field"
              placeholder="Nome completo"
              value={formState.nome}
              onChange={(event) =>
                setFormState({ ...formState, nome: event.target.value })
              }
            />
            <ErrorMessage message={isDirty ? validNome : null} />
          </div>
        </div>
        <div className="row">
          <div className="field-container email-container">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              className="field"
              placeholder="Email"
              value={formState.email}
              onChange={(event) =>
                setFormState({ ...formState, email: event.target.value })
              }
            />
            <ErrorMessage message={isDirty ? validEmail : ""} />
          </div>
          <div className="field-container phone-number-container">
            <label htmlFor="phone-number">Celular</label>
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              className="field"
              placeholder="Celular (opcional)"
              value={formState.telefone}
              onChange={(event) =>
                setFormState({ ...formState, telefone: event.target.value })
              }
            />
            <ErrorMessage message={isDirty ? validTelefone : ""} />
          </div>
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="assunto">Assunto</label>
            <input
              name="assunto"
              id="assunto"
              className="field"
              placeholder="Assunto"
              value={formState.assunto}
              onChange={(event) =>
                setFormState({ ...formState, assunto: event.target.value })
              }
            />
            <ErrorMessage message={isDirty ? validAssunto : ""} />
          </div>
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              name="mensagem"
              id="mensagem"
              className="field"
              placeholder="Mensagem"
              rows={3}
              value={formState.mensagem}
              onChange={(event) =>
                setFormState({ ...formState, mensagem: event.target.value })
              }
            />
            <ErrorMessage message={isDirty ? validMensagem : ""} />
          </div>
        </div>
        <div className="row">
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </div>
      </form>
      <style jsx>{`
        .contact-form-container {
          margin: 12px;
          padding-top: 30px;
        }

        .contact-form {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
        }

        .form-title {
          text-align: center;
          font-size: 32px;
          color: #073551;
        }

        .field {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 12px 18px;
          outline: none;
          box-sizing: border-box;
        }

        .field-container {
          width: 100%;
        }

        .row:not(:first-child) {
          margin-top: 12px;
        }

        .field:focus {
          border-color: #009712;
        }

        .submit-button {
          width: 100%;
          background-color: #0386d5;
          padding: 12px 18px;
          color: #fff;
          border: none;
          border-radius: 4px;
          margin-top: 12px;
        }

        .submit-button:hover {
          opacity: 0.7;
          cursor: pointer;
        }

        #mensagem {
          resize: none;
        }

        @media (max-width: 600px) {
          .email-container {
            margin-bottom: 12px;
          }
        }

        @media (min-width: 600px) {
          .row {
            display: flex;
          }

          .email-container {
            margin-right: 12px;
            flex: 3;
          }

          .phone-number-container {
            flex: 2;
          }
        }
      `}</style>
    </div>
  );
}
