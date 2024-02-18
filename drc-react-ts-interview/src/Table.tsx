import {ReactNode, useEffect, useMemo, useState} from 'react'
import {TableCell} from "./TableCell.tsx";

const availableLimits = [
  10,
  25,
  50,
  100,
  250,
  500,
  1000,
  2000
] as const;

export type BaseDataWithId = {
  id: number;
  [key: string]: string | number;
};

export type Column<Element> = {
  id: keyof Element;
  title: ReactNode;
  render: (_: keyof Element) => ReactNode;
};

// Define the type for the columns array
type ColumnsArray<Element> = Array<Column<Element>>;

// Define the type for the data array, ensuring each element matches the structure defined by your columns
type DataArray<Element> = Array<Element>;

export type ColId = string | number | symbol;

export type CellCoordinates = {
  rowId: number;
  colId: ColId;
};

interface ITableProps<T extends BaseDataWithId> {
  defaultLimit: typeof availableLimits[number];
  columns: ColumnsArray<T>;
  data: DataArray<T>;
}

const comparator = (first: number | string, second: number | string, isSortAsc: boolean) => {
  if (typeof first == "string" && typeof second == "string") {
    if (isSortAsc) {
      return first.toString().localeCompare(second.toString());
    } else {
      return second.toString().localeCompare(first.toString());
    }
  }
  if (typeof first == "number" && typeof second == "number") {
    if (isSortAsc) {
      return first - second;
    } else {
      return second - first;
    }
  }
  return 0;
}

const getArrow = (sortedCol: string | undefined, colId: string, isSortAsc: boolean) => {
  if (sortedCol === colId) {
    if (isSortAsc) {
      return "⬆️"
    } else {
      return "⬇️"
    }
  } else {
    return "";
  }
}

const inputRowStyles = {
  marginTop: "8px"
}

const inputLabelStyle = {
  marginRight: "4px"
};

export const Table = <T extends BaseDataWithId>({
  data,
  columns,
  defaultLimit = 25
}: ITableProps<T>) => {
  const [searchedId, setSearchedId] = useState<string | undefined>("");
  const [innerData, setInnerData] = useState<T[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | undefined>();
  const [currentCell, setCurrentCell] = useState<CellCoordinates | null>(null);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [isSortAsc, setIsSortAsc] = useState<boolean>(true);

  useEffect(() => {
    setInnerData(data)
  }, [data]);

  const handleToggleSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows.splice(selectedRows.findIndex(el => el === id), 1)
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

  const handleCellClick = (rowId: number, colId: ColId) => {
    setCurrentCell({ rowId, colId });
  }

  const updateData = <T extends BaseDataWithId>(obj: T[], rowIndex: number, colId: ColId, value: any): T[] => {
    const updatedObj = { ...obj[rowIndex], [colId]: value };
    return [...obj.slice(0, rowIndex), updatedObj, ...obj.slice(rowIndex + 1)];
  }

  const handleCellSave = (rowId: number, colId: ColId, inputValue: string) => {
    const rowIndex = innerData.findIndex(el => el.id === rowId);
    const newData = updateData(innerData, rowIndex, colId, inputValue);
    setInnerData(newData);
    setCurrentCell(null);
  }

  const slicedData = useMemo(() => {
    return innerData.slice(0, limit);
  }, [innerData, limit]);

  const sortedData = useMemo(() => {
    const newSortedData = [...slicedData];
    return newSortedData.sort((a, b) => {
        if (!sortedColumn) return 0
        return comparator(a[sortedColumn], b[sortedColumn], isSortAsc);
      });
  }, [slicedData, sortedColumn, isSortAsc]);

  const searchFilteredData = useMemo(() => {
    return sortedData.filter(_ => !searchedId || _.id === parseInt(searchedId))
  }, [sortedData, searchedId]);

  const handleDeleteSelected = () => {
    if (selectedRows.length)
      setInnerData([...innerData.filter(e => !selectedRows.includes(e.id))]);
  }

  const handleColumnClick = (colId: string) => {
    setSortedColumn(colId);
    if (sortedColumn === colId) {
      setIsSortAsc(state => !state);
    }
  }

  return (
    <div>
      <div style={inputRowStyles}>
        <label htmlFor="idSearchInput" style={inputLabelStyle}>
          Search:
        </label>
        <input id={"idSearchInput"} value={searchedId} onChange={e => setSearchedId(e.target.value)}/>
      </div>
      <div style={inputRowStyles}>
        <label htmlFor="sortByInput" style={inputLabelStyle}>
          Sort by:
        </label>
        <select id={"sortByInput"} value={sortedColumn} onChange={e => setSortedColumn(e.target.value)}>
          {columns.map(col =>
            <option value={col.id as string} key={col.id as string}>{col.title}</option>
          )}
        </select>
      </div>
      <div style={inputRowStyles}>
        <label htmlFor="limitInput" style={inputLabelStyle}>
          Limit displayed:
        </label>
        <select id={"limitInput"} value={limit} onChange={e => setLimit(parseInt(e.target.value))}>
          {availableLimits.map(el => {
            return (
                <option key={el} value={el}>{el}</option>
            );
          })}
        </select>
      </div>
      <div>

      </div>
      <br/>
      <table border={1}>
        <thead>
        <tr>
        <th>
            <div
                onClick={handleDeleteSelected}
                style={{ cursor: "pointer" }}
                title={"Delete unused"}
            >
              🗑️
            </div>
          </th>
          {columns.map(col =>
            <th key={col.id.toString()} >
              <div
                  onClick={() => handleColumnClick(col.id.toString())}
                  style={{ margin: "8px", width: col.id !== "id" ? "100px" : "35px", cursor: "pointer" }}
              >
                {col.title}
                <span style={{ minWidth: "20px", marginLeft: "4px", fontSize: "12px"  }}>
                  {getArrow(sortedColumn, col.id.toString(), isSortAsc)}
                </span>
              </div>
            </th>
          )}
        </tr>
        </thead>
        <tbody>
        {searchFilteredData
          .map(row =>
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  name={row.id.toString()}
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleToggleSelection(row.id)}
                />
              </td>
              {columns.map(col =>
                  <TableCell
                      key={col.id.toString()}
                      col={col}
                      row={row}
                      currentCell={currentCell}
                      handleCellClick={handleCellClick}
                      handleCellSave={handleCellSave}
                  />
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}