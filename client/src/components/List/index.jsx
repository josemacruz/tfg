import React, { useState, useMemo } from "react";
import SearchBox from "../SearchBox/index";
import './styles.scss';

const useSortableData = (datas, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...datas];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [datas, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { datas: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
	console.log(props)
  const { datas, requestSort, sortConfig } = useSortableData(props.datas);
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = datas.filter((data) => {
    return Object.keys(data).some((key) =>
      data[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <div className="headerList">
          <SearchBox searchHandler={searchHandler} />
          <button
            className="button"
            onClick={props.handleAdd}
          >
            AddIssue
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
							<button
                  type="button"
                  onClick={() => requestSort("first_name")}
                  className={getClassNamesFor("first_name")}
                >
                  Familia
                </button>
							</th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("first_name")}
                  className={getClassNamesFor("first_name")}
                >
                  Descripción
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("last_name")}
                  className={getClassNamesFor("last_name")}
                >
                  Criticidad
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("username")}
                  className={getClassNamesFor("username")}
                >
                  Estado
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  Fecha
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  Categoria
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((data) => (
                <tr key={data.id}>
                  <td>{data.family}</td>
                  <td>{data.description}</td>
                  <td>{data.criticality}</td>
                  <td>{data.status}</td>
                  <td>{data.dateCreated}</td>
                  <td>{data.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DirectoryTable;