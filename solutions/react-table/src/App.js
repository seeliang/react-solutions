import {useMemo} from 'react';
import './App.css';
import { useTable } from 'react-table';

const data = [{"firstName":"north","lastName":"expression","age":12,"visits":46,"progress":46,"status":"single"},{"firstName":"things","lastName":"home","age":24,"visits":52,"progress":93,"status":"single"},{"firstName":"thunder","lastName":"note","age":0,"visits":91,"progress":85,"status":"relationship"},{"firstName":"pot","lastName":"texture","age":22,"visits":29,"progress":0,"status":"single"},{"firstName":"stone","lastName":"knot","age":10,"visits":88,"progress":13,"status":"single"},{"firstName":"part","lastName":"location","age":1,"visits":49,"progress":9,"status":"complicated"},{"firstName":"transportation","lastName":"sky","age":19,"visits":43,"progress":76,"status":"relationship"},{"firstName":"war","lastName":"grape","age":4,"visits":6,"progress":36,"status":"single"},{"firstName":"drain","lastName":"thought","age":6,"visits":14,"progress":11,"status":"single"},{"firstName":"snakes","lastName":"cry","age":19,"visits":97,"progress":10,"status":"single"},{"firstName":"phone","lastName":"thanks","age":27,"visits":3,"progress":68,"status":"complicated"},{"firstName":"steel","lastName":"emphasis","age":26,"visits":19,"progress":52,"status":"complicated"},{"firstName":"route","lastName":"legs","age":12,"visits":93,"progress":21,"status":"relationship"},{"firstName":"sisters","lastName":"yoke","age":11,"visits":6,"progress":59,"status":"relationship"},{"firstName":"independence","lastName":"slip","age":26,"visits":13,"progress":65,"status":"complicated"},{"firstName":"kiss","lastName":"mine","age":23,"visits":56,"progress":14,"status":"complicated"},{"firstName":"computer","lastName":"attempt","age":29,"visits":74,"progress":2,"status":"relationship"},{"firstName":"father","lastName":"leather","age":7,"visits":64,"progress":63,"status":"single"},{"firstName":"rod","lastName":"operation","age":20,"visits":65,"progress":42,"status":"complicated"},{"firstName":"visitor","lastName":"celery","age":27,"visits":8,"progress":24,"status":"complicated"}] 


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = useMemo(
    () => [
     
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
    ],
    []
  );

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
