import React from 'react'
import style from './index.module.css'

const Room = (state, actions) => room =>
  room.userIds.length < 100 ? (
    <li
      key={room.id}
      disabled={state.room.id === room.id}
      onClick={e => {
        actions.setRoom(room)
        state.user.subscribeToRoom(room.id, { newMessage: actions.addMessage })
      }}
    >
      <p>
        <svg>
          {room.name.match(state.user.id) ? (
            <use xlinkHref={'index.svg#members'} />
          ) : (
            <use xlinkHref={'index.svg#public'} />
          )}
        </svg>
        <span>{room.name.replace(state.user.id, '')}</span>
      </p>
    </li>
  ) : null

export const RoomList = ({ state, actions }) => (
  <ul className={style.component}>
    {state.rooms
      .filter(x => x.name.match(state.user.id))
      .map(Room(state, actions))}
    {state.rooms
      .filter(x => !x.name.match(state.user.id))
      .map(Room(state, actions))}
  </ul>
)
