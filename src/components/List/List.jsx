"use client";

import styles from "./List.module.css";

import React from "react";

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li className="list" key={item.id}>
          <img src={item.icon} alt={item.name} />
          <span>{item.name}</span>
          <span>1,934: {item.likes}</span>
          <span>작업물 보기: {item.jackupmul}</span>
        </li>
      ))}
    </ul>
  );
}

export default List;
