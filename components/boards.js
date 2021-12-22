import Default from "./default";
import PH from "./ph";

const boards = ({ boards }) => {
  return (
    <div>
      {boards.map((i) => {
        switch (i.type) {
          case "DEFAULT":
            return <Default key={i.b_id} board={i} />;
          case "PH":
            return <PH key={i.b_id} board={i} />;
        }
      })}
    </div>
  );
};

export default boards;
