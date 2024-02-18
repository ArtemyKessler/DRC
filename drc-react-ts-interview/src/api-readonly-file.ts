export type User = {
  id: number
  firstname: string
  lastname: string
  country: string
}

export async function fetchApiUsers(): Promise<User[]> {
  await sleep(200)
  return Promise.resolve([
    {id: 1, firstname: 'Mike', lastname: 'Horn', country: 'Switzerland'},
    {id: 2, firstname: 'Mat', lastname: 'Fraser', country: 'United States'},
    {id: 3, firstname: 'Anna', lastname: 'Smith', country: 'United Kingdom'},
    {id: 4, firstname: 'Carlos', lastname: 'Rodriguez', country: 'Spain'},
    {id: 5, firstname: 'Yuki', lastname: 'Tanaka', country: 'Japan'},
    {id: 6, firstname: 'Mia', lastname: 'Johnson', country: 'Canada'},
    {id: 7, firstname: 'Ahmed', lastname: 'Ali', country: 'Egypt'},
    {id: 8, firstname: 'Luisa', lastname: 'Gomez', country: 'Mexico'},
    {id: 9, firstname: 'Hiroshi', lastname: 'Sato', country: 'Japan'},
    {id: 10, firstname: 'Isabella', lastname: 'Fernandez', country: 'Argentina'},
    {id: 11, firstname: 'Nina', lastname: 'Ivanova', country: 'Ukraine'},
    {id: 12, firstname: 'Chen', lastname: 'Li', country: 'China'},
    {id: 13, firstname: 'Elena', lastname: 'Popescu', country: 'Romania'},
    {id: 14, firstname: 'Gabriel', lastname: 'Silva', country: 'Brazil'},
    {id: 15, firstname: 'Aisha', lastname: 'Khan', country: 'Pakistan'},
    {id: 16, firstname: 'Oliver', lastname: 'Davis', country: 'Australia'},
    {id: 17, firstname: 'Marta', lastname: 'Lopez', country: 'Spain'},
    {id: 18, firstname: 'Ravi', lastname: 'Patel', country: 'India'},
    {id: 19, firstname: 'Sophie', lastname: 'Andersen', country: 'Denmark'},
    {id: 20, firstname: 'Juan', lastname: 'Martinez', country: 'Colombia'},
    {id: 21, firstname: 'Sara', lastname: 'Miller', country: 'United States'},
    {id: 22, firstname: 'Khaled', lastname: 'Al-Farsi', country: 'Saudi Arabia'},
    {id: 23, firstname: 'Eva', lastname: 'Bergman', country: 'Sweden'},
    {id: 24, firstname: 'Alexei', lastname: 'Ivanov', country: 'Russia'},
    {id: 25, firstname: 'Ananya', lastname: 'Rao', country: 'India'},
    {id: 26, firstname: 'Lucas', lastname: 'Mendoza', country: 'Mexico'},
    {id: 27, firstname: 'Emily', lastname: 'Chen', country: 'Canada'},
    {id: 28, firstname: 'Mohammed', lastname: 'Khan', country: 'Pakistan'},
    {id: 29, firstname: 'Leila', lastname: 'Nasser', country: 'Egypt'},
    {id: 30, firstname: 'Max', lastname: 'Fischer', country: 'Germany'},
    {id: 31, firstname: 'Aya', lastname: 'Yamamoto', country: 'Japan'},
    {id: 32, firstname: 'Miguel', lastname: 'Garcia', country: 'Spain'},
    {id: 33, firstname: 'Isabel', lastname: 'Lopez', country: 'Argentina'},
    {id: 34, firstname: 'Dmitri', lastname: 'Ivanov', country: 'Russia'},
    {id: 35, firstname: 'Nina', lastname: 'Wang', country: 'China'},
    {id: 36, firstname: 'Diego', lastname: 'Martinez', country: 'Mexico'},
    {id: 37, firstname: 'Yuki', lastname: 'Suzuki', country: 'Japan'},

  ])
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
