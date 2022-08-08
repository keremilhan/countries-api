import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'

function CountriesTable({data}) {
  return (
      <Table striped bordered hover variant="dark" className='mt-5 align-middle'>
        <thead className="text-center fs-4">
          <tr>
            <th>Country Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody className="text-center table-group-divider">
          {data?.map((country, index) => {
              return (
                <tr key={index}>
                  <td >{country.name}</td>
                  <td>{country.capital ? country.capital : "No Capital Info"}</td>
                  <td>{country.region}</td>
                  <td>
                    <Image thumbnail={true} width={300} src={country.flag} alt={country.name} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
  );
}

export default CountriesTable;