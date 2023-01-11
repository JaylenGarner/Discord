import React from 'react';
// import { loadServerThunk } from '../../store/server';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { loadServersThunk } from '../../store/server';

const ServerPage = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams()
    const user = useSelector((state) => state.session.user)
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    let resServer;
    let serverData;

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
            console.log(server)
            if (server.id == serverId) resServer = server
        });
    }

    if (!resServer) {
        return null
    } else {
        return (
            <div>
                <div>
                    <h1>{resServer.name}</h1>
                    <h2>Channels</h2>
                    {resServer.channels.map((channel) => {
                        if (!channel) {
                            return null
                        } else {
                            return (
                                <div key={channel.id}>
                                    <h3>{channel.name}</h3>
                                </div>
                            )
                        }
                    })}
                </div>
                <br></br>
                <div>
                    <button>Delete Server</button>
                    <button>Edit Server</button>
                </div>
            </div>
        )
    }
}


export default ServerPage;