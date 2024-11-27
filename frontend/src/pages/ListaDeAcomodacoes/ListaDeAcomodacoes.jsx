import axios from "axios";
import React, { useEffect, useState } from "react";
import Acomodacao from "src/components/Acomodacao";
import Titulo from "src/components/Titulo/Titulo";
import $ from "./ListaDeAcomodacoes.module.sass";
import Text from "src/components/Text/Text";

const ListaDeAcomodacoesLoader = (setter, loading) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(baseUrl);
  axios
    .get("http://localhost:3333/quartos/listarQuartos/list")
    .then((response) => {
      setter(response.data);
      loading(true)
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status !== 404) {
        throw new Error(error);
      }
    });
};

const ListaDeAcomodacoes = () => {
  const [lista, setLista] = useState([]);
  const [removeLoading, setremoveLoading] = useState(false);

  useEffect(() => {
    ListaDeAcomodacoesLoader(setLista, setremoveLoading);
  }, []);

  return (
    <>
      <Titulo links={["Lista de Acomodações"]} />

      <div className={$.containerAcomodacoes}>
        {!removeLoading && (
          <div>
            <Text type="Title" color="red">Loading...</Text>
          </div>
        )}
        {lista.length > 0 &&
          lista.map((a) => {
            return (
              <Acomodacao.Root>
                <Acomodacao.Imagem img={a.image} />
                <Acomodacao.Info.Root>
                  <Acomodacao.Info.Descricao
                    titulo={a.nome}
                    text={a.descricao}
                  />
                  <Acomodacao.Info.Amenidades amenidades={a.amenidades} />
                  <Acomodacao.Button text={"Mais informações"} />
                </Acomodacao.Info.Root>
              </Acomodacao.Root>
            );
          })}
      </div>
    </>
  );
};

export default ListaDeAcomodacoes;
