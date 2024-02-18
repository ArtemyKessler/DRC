import {BaseDataWithId, CellCoordinates, ColId, Column} from "./Table.tsx";
import {memo, useState} from "react";

interface CellProps<T> {
    currentCell: CellCoordinates | null;
    handleCellClick: (rowId: number, colId: ColId) => void,
    handleCellSave: (rowId: number, colId: ColId, val: string) => void,
    col: Column<T>;
    row: T;

}

const genericMemo: <T>(component: T) => T = memo

const _TableCell = <T extends BaseDataWithId>({
  handleCellSave,
  handleCellClick,
  currentCell,
  col,
  row
}: CellProps<T>) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleCellChange = (newVal: string) => {
        setInputValue(newVal);
    }

    const cellClick = () => {
        setInputValue(row[col.id].toString());
        handleCellClick(row.id, col.id);
    }

    return (
        <td key={col.id as string}>
            {
                (currentCell?.colId === col.id && currentCell.rowId === row.id) && col.id !== "id"
                    ?
                    <div>
                        <input
                            style={{maxWidth: "60px"}}
                            type="text"
                            value={inputValue || ""}
                            onChange={(e) => handleCellChange(e.target.value)}
                        />
                        <button
                            onClick={() => handleCellSave(row.id, col.id, inputValue)}
                        >
                            Save
                        </button>
                    </div>
                    :
                    <div style={{ marginLeft: "2px" }} onClick={() => cellClick()}>
                        {col.render(row[col.id])}
                    </div>
            }
        </td>
    );
}

export const TableCell = genericMemo(_TableCell);
