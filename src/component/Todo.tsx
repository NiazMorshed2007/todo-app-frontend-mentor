import React, { FC, useState } from "react";
import { BsCircle, MdOutlineClear, BsCheckCircle } from "react-icons/all";

interface Props {
  name: string;
  status: string;
  handleDlt: () => void;
  handleStatus: () => void;
}

const Todo: FC<Props> = (props) => {
  const { name, status, handleDlt, handleStatus } = props;
  const [showComp, setShowComp] = useState<boolean>(false);
  return (
    <div className="single-todo">
      <div
        onClick={handleStatus}
        onMouseOver={() => setShowComp(true)}
        onMouseLeave={() => setShowComp(false)}
        className="task-icon"
      >
        {status === "todo" ? (
          showComp ? (
            <BsCheckCircle className="completed" />
          ) : (
            <BsCircle />
          )
        ) : (
          <BsCheckCircle className="completed" />
        )}
      </div>
      {status === "completed" ? <del>{name}</del> : <p>{name}</p>}
      <div onClick={handleDlt} className="del">
        <MdOutlineClear />
      </div>
    </div>
  );
};

export default Todo;
