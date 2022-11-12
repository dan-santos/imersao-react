import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    }
  };
}

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Frost", url: "https://youtube.com" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form onSubmit={(e) => {
          e.preventDefault();

          supabase.from("video").insert({
            title: formCadastro.values.titulo,
            url: formCadastro.values.url,
            thumb: getThumbnail(formCadastro.values.url),
            playlist: "jogos"
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })

          setFormVisivel(false);
          formCadastro.clearForm();
        }}>
          <div>
            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
              x
            </button>
            <input name="titulo" placeholder="Título do vídeo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange} />
            <input name="url" placeholder="URL" value={formCadastro.values.url} onChange={formCadastro.handleChange} />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  )
}