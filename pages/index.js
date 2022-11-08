import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estiloHome = { 
        display: "flex",
        flexDirection: "column",
        flex: 1,
    };

    return (
        <>
            <CSSReset/>
            <div style={estiloHome}>
                <Menu/>
                <Header></Header>
                <Timeline playlists={config.playlists}>
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

function Timeline(props) {
    const playlistNames = Object.keys(props.playlists);
    // statement -> for normal
    // retorno por expressao -> map
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.map((video) => {
                                    return (
                                        <a href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}