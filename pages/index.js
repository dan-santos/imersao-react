import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const estiloHome = { 
        display: "flex",
        flexDirection: "column",
        flex: 1,
    };
    
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    // O useEffect eh utilizado para gerar uma ação após algo que foge ao nosso controle acontece
    // Essa ação que faremos dentro dele, comumente chamamos de efeito colateral
    // O useEffect também é um hook, mas que será executado por algo que não depende da ação do usuário
    // Eh tipo um webhook, que espera uma resposta de uma api previamente chamada
    React.useEffect(() => {
      service.getAllVideos()
        .then((res) => {
          const data = res.data;
          const novasPlaylists = { ...playlists };
          data.forEach((video) => {
            if (!novasPlaylists[video.playlist]) {
              novasPlaylists[video.playlist] = [];
            }
            novasPlaylists[video.playlist].push(video);
          })
          // O react sempre supoe que estamos passado um novo dado, e nao um dado igual ao anterior
          // por esse motivo, por mais que estejamos efetivamente mudando o array de playlists
          // precisamos mandar uma copia dele a cada useEffect, senao as mudanças serão ignoradas
          setPlaylists(novasPlaylists);
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

    return (
        <>
          <div style={estiloHome}>
              {/* Prop drilling */}
              <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
              <Header></Header>
              <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                  Conteúdo
              </Timeline>
          </div>
        </>
    )
}

export default HomePage;

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .info-header {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    background-color: ${({ theme }) => theme.backgroundLevel1};
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="info-header">
                <img src={`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    // statement -> for normal
    // retorno por expressao -> map
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}