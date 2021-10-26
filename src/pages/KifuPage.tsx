import { createRef, useEffect, useMemo } from "react";
import { SVGBoard } from "wgo";

type Props = {
  boardSize?: number;
  width?: number;
  height?: number;
  coordinates?: boolean;
};
const KifuPage = (props: Props) => {
  const {
    boardSize = 19,
    width = 500,
    height = 500,
    coordinates = true,
  } = props;
  const board = useMemo(
    () =>
      new SVGBoard(document.createElement("div"), {
        size: boardSize,
        width: width,
        height: height,
        coordinates: coordinates,
      }),
    [boardSize, coordinates, height, width]
  );

  const boardRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const boardElement = board.element;
    const currentRef = boardRef.current;
    currentRef?.appendChild(boardElement);

    return () => {
      currentRef?.removeChild(boardElement);
    };
  }, [boardRef, board]);

  return <div ref={boardRef} />;
};

export default KifuPage;
