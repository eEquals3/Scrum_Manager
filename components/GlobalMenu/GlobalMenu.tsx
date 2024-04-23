import {memo} from "react";
import "./GlobalMenu.css"
import Link from "next/link";
import {COMMAND_ROUTE, SPRINTS_ROUTE, TASK_ROUTE} from "../../app/constants/routes";


const GlobalMenu = () => {
  return(
      <menu>
          <Link href={COMMAND_ROUTE}> команды </Link>
          <Link href={SPRINTS_ROUTE}> спринты </Link>
          <Link href={TASK_ROUTE}> задачи </Link>
      </menu>
  )
}

export default memo(GlobalMenu);
