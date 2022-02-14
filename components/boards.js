import Old from "./old";
import PH from "./default";

const boards = ({ boards }) => {
  return (
    <div>
      {boards.map((i) => {
        switch (i.type) {
          case "OLD":
            return <Old key={i.b_id} board={i} />;
          case "DEFAULT":
            return <PH key={i.b_id} board={i} />;
        }
      })}
    </div>
  );
};

export default boards;
