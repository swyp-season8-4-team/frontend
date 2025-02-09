interface HexagonProps {
  content: string;
  bgColor?: string;
}

function Hexagon() {
  return <div></div>;
}

function HexagonGrid() {
  return (
    <div className="wrap">
      <div className="hex">
        <div className="hex-inner">
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
}

export default HexagonGrid;
