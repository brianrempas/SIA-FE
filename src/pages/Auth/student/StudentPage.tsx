import StudentTable from "./StudentTable"
import StudentForm from "./StudentForm";
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setStudentData } from '../../../reducers/AllDataSlice'
import { createAny, getAny, updateAny, deleteAny } from '../../../services/api'
import { selectStudentData } from '../../../reducers/AllDataSlice';

export default function StudentPage() {

    const dispatch = useAppDispatch()
    const studentData = useAppSelector(selectStudentData)
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFucmVtcGFzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5OTY3MjQ3fQ.87G1ceVjFiFnxMw9vi-SXSExmnobsuPpaphl2zbAtRU';
  
    async function submitSignup(n:any) {
        const fetch = await createAny( n, token, 'http://localhost:3000/api/student' )
        refreshTable()

        switch(fetch.status) {
            case 201:
                console.log(fetch)
                break;
            case 200:
                console.log(fetch) 
                break;
            case 400:
                console.log(fetch)
                break;
            default:
                throw new Error(fetch.data.message);
        }
    }

    async function submitUpdate(data: any) {
        const fetch = await updateAny( data, token, 'http://localhost:3000/api/student' )
        refreshTable()
    
        switch(fetch.status) {
            case 201:
                console.log(fetch)
                break;
            case 200:
                console.log(fetch) 
                break;
            case 400:
                console.log(fetch)
                break;
            default:
                throw new Error(fetch.data.message);
        }
      }
    
      async function submitDelete(inputId: number) {
        console.log(inputId)
        const fetch = await deleteAny( inputId, token, 'http://localhost:3000/api/student' )
        refreshTable()
    
          switch(fetch.status) {
              case 201:
                  console.log(fetch)
                  break;
              case 200:
                  console.log(fetch) 
                  break;
              case 400:
                  console.log(fetch)
                  break;
              default:
                  throw new Error(fetch.data.message);
          }
      }

    async function refreshTable(){
        const fetchUser = await getAny( token, 'http://localhost:3000/api/student')
        dispatch(setStudentData({ studentData: fetchUser.data.result }));
    }

    return (
        <>
            <h1>Student Page</h1>
            <StudentForm modal='CU' toggleSubmit={submitSignup} />
            <StudentTable data={studentData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
        </>
    )
}
