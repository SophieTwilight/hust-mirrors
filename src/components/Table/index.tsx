import React from 'react'
import styles from './index.module.css'
import { usePluginData } from '@docusaurus/useGlobalData'
import Link from '@docusaurus/Link';

type Status = {
  name: string,
  is_master: string,
  status: string,
  last_update: string,
  last_update_ts: number,
  last_started: string,
  last_started_ts: number,
  last_ended: string,
  last_ended_ts: number,
  next_schedule: string,
  next_schedule_ts: number,
  upstream: string,
  size: string,
}

type Props = {
  items: Status[],
  search?: string
}

function tsToStr(ts: number) {
  const date = new Date(ts * 1000);
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}



export default function Table({ items: srcItems, search }: Props) {

  const docPluginData = usePluginData("docusaurus-plugin-content-docs") as any;
  const alldocs: {
    id: string,
    path: string,
    sidebar: string
  }[] = docPluginData.versions[0].docs;


  let items = srcItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
  if (search) {
    items = items.filter(u => u.name.toLowerCase().indexOf(search.toLowerCase()) != -1)
  }


  const timezone = new Date().getTimezoneOffset() / -60;

  return (
    <table className={styles['container']}>
      <thead>
        <tr>
          <th className={styles['name']}>
            镜像名称
          </th>
          <th className={styles['last-update']}>
            上次更新 (UTC{timezone > 0 && '+'}{timezone})
          </th>
          <th className={styles['help']}>
            帮助
          </th>
        </tr>

      </thead>
      <tbody className={styles.tbody}>
        {items.map(u => (
          <tr key={u.name}>
            <th className={styles['name']}>
              {u.name.endsWith(".git") ?
                <span>{u.name}</span>
                : <Link to={`/${u.name}`}>
                  {u.name}
                </Link>}
            </th>
            <th className={styles['last-update']}>{tsToStr(u.last_update_ts)}</th>
            <th className={styles['help']}>
              {alldocs.find(v => v.id == u.name) &&
                <Link to={`/docs/${u.name}`}>
                  [ 帮助文档 ]
                </Link>
              }
              {
                u.name.endsWith(".git") &&
                <Link to={`/docs/about-git`}>
                  [ Git镜像 ]
                </Link>
              }


            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
