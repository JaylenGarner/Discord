import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../../store/server'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './DirectMessages.css'



const DirectMessages = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const directMessageServs = []
  let otherUser;
  const servers = Object.values(useSelector((state) => state.servers))
  let firstChannel;

  if (!user) {
    history.push(`/login`)
  }

  if (servers) {
  for (let i = 0; i < servers.length; i++) {
      let server = servers[i]
        if (server.public === false) {
          directMessageServs.push(server)
        }
  }
}

  const getOtherUser = (server) => {
    server.users.forEach((el) => {
      if (el.id !== user.id) otherUser = el;
    })
  }


  return (

    <nav className='dm-page-nav'>
      {user &&
      <div className='direct-message-nav-container'>
        <NavLink to={`/direct-messages/invite`} exact={true} activeClassName='active'>
        <button className='message-a-user-button'>Message a user</button>
      </NavLink>
      {directMessageServs.map((server) => {

          if (server) {
            getOtherUser(server)

            if (server.channels) {
              firstChannel = server.channels[0]
            }

            return (
              <div key={server.id} className=''>
                {firstChannel &&
                <NavLink to={`/direct-messages/${server.id}/${firstChannel.id}`} exact={true} className='dm-navlink'>
                  <div className='direct-message-nav-button'>
                    <div>
                      <img src={otherUser.image} className='dm-user-image'></img>
                    </div>
                    <span className='dm-user-name'>{otherUser.username}</span>
                  </div>
                </NavLink>}
               </div>
            )
          }
      })}

  </div>
      }
    </nav>
  )

}

export default DirectMessages;
